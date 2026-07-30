import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

/**
 * Document intake for the discovery chat. Accepts one or more files, extracts
 * readable text (directly for text formats, via pdf-parse/mammoth for
 * PDF/DOCX, via Claude vision for images and scanned PDFs), and returns the
 * extracted content. The client inserts it into the conversation as an
 * [Attached: ...] user message so the interview and the final extraction both
 * see it.
 */

const MODEL = 'claude-opus-4-8'
const MAX_FILES = 5
const MAX_FILE_BYTES = 10 * 1024 * 1024
const MAX_EXTRACTED_CHARS = 30_000

const TEXT_EXTENSIONS = new Set(['txt', 'md', 'csv', 'json', 'rtf'])
const IMAGE_MEDIA_TYPES: Record<string, 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp'> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
}

async function describeImage(client: Anthropic, file: File, ext: string): Promise<string> {
  const data = Buffer.from(await file.arrayBuffer()).toString('base64')
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: IMAGE_MEDIA_TYPES[ext], data } },
          {
            type: 'text',
            text: 'A business owner attached this image during a discovery interview about their operations. Transcribe all visible text exactly, then briefly describe anything else relevant to understanding how they work: form fields, software interfaces, workflow steps, table structure. Plain text only.',
          },
        ],
      },
    ],
  })
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map(b => b.text)
    .join('\n')
}

async function readPdfWithClaude(client: Anthropic, file: File): Promise<string> {
  const data = Buffer.from(await file.arrayBuffer()).toString('base64')
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data } },
          {
            type: 'text',
            text: 'A business owner attached this document during a discovery interview about their operations. Extract its full text and structure (headings, form fields, tables) as plain text.',
          },
        ],
      },
    ],
  })
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map(b => b.text)
    .join('\n')
}

async function extractText(client: Anthropic, file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (TEXT_EXTENSIONS.has(ext)) {
    return await file.text()
  }

  if (ext in IMAGE_MEDIA_TYPES) {
    return await describeImage(client, file, ext)
  }

  if (ext === 'pdf') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
      const buffer = Buffer.from(await file.arrayBuffer())
      const data = await pdfParse(buffer)
      // Scanned PDFs parse "successfully" with no text; fall back to vision.
      if (data.text.trim().length >= 50) return data.text
    } catch (err) {
      console.error(`pdf-parse failed for ${file.name}, falling back to Claude:`, err)
    }
    return await readPdfWithClaude(client, file)
  }

  if (ext === 'docx') {
    const mammoth = await import('mammoth')
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  return `[Unsupported file type: ${file.name}. Supported: PDF, DOCX, images (PNG/JPG/GIF/WebP), and plain text files.]`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Uploads are not configured' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const files = formData.getAll('files').filter((v): v is File => v instanceof File)

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files received' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey })
    const documents: Array<{ name: string; content: string }> = []

    for (const file of files.slice(0, MAX_FILES)) {
      if (file.size > MAX_FILE_BYTES) {
        documents.push({ name: file.name, content: '[Skipped: file is larger than 10 MB]' })
        continue
      }
      try {
        const text = (await extractText(client, file)).trim().slice(0, MAX_EXTRACTED_CHARS)
        documents.push({ name: file.name, content: text || '[No readable content extracted]' })
      } catch (err) {
        console.error(`Failed to process discovery upload ${file.name}:`, err)
        documents.push({ name: file.name, content: '[Could not extract content from this file]' })
      }
    }

    return NextResponse.json({ documents })
  } catch (err) {
    console.error('discovery upload failed', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
