import { NextRequest, NextResponse } from 'next/server'

/**
 * Forwards a discovery submission to the Keystroke webhook, which runs the
 * analysis workflow and posts the brief to Slack.
 *
 * The webhook URL carries its own token, so it lives in an env var
 * (KEYSTROKE_DISCOVERY_WEBHOOK) and never reaches the browser.
 */

const GROUPS = ['contact', 'business', 'ai', 'closing'] as const

const PROCESS_KEYS = [
  'name',
  'whatItIs',
  'whoDoesIt',
  'frequency',
  'volume',
  'timeSpent',
  'toolsUsed',
  'stepByStep',
  'whatGoesWrong',
  'successLooksLike',
] as const

const MAX_FILES_PER_PROCESS = 8
const MAX_FILE_BYTES = 10 * 1024 * 1024
const MAX_EXTRACTED_CHARS_PER_FILE = 30_000

const TEXT_EXTENSIONS = new Set(['txt', 'md', 'csv', 'json', 'rtf'])

type Payload = Record<string, unknown>

const str = (v: unknown): string => (typeof v === 'string' ? v.slice(0, 8000) : '')
const longStr = (v: unknown): string => (typeof v === 'string' ? v.slice(0, 120_000) : '')

async function extractText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (TEXT_EXTENSIONS.has(ext)) {
    return await file.text()
  }

  if (ext === 'pdf') {
    // pdf-parse expects a Buffer
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)
    return data.text
  }

  if (ext === 'docx') {
    const mammoth = await import('mammoth')
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  return `[Unsupported file type. Uploaded for awareness, but text could not be extracted: ${file.name}]`
}

async function processUploadedDocuments(files: File[]): Promise<string> {
  const documents: string[] = []

  for (const file of files.slice(0, MAX_FILES_PER_PROCESS)) {
    if (file.size > MAX_FILE_BYTES) {
      documents.push(`=== ${file.name} ===\n[Skipped: file is larger than 10 MB]`)
      continue
    }

    try {
      const text = (await extractText(file)).trim().slice(0, MAX_EXTRACTED_CHARS_PER_FILE)
      documents.push(
        `=== ${file.name} (${Math.round(file.size / 1024)} KB) ===\n${text || '[No readable text extracted]'}`,
      )
    } catch (err) {
      console.error(`Failed to parse discovery upload ${file.name}:`, err)
      documents.push(`=== ${file.name} ===\n[Could not extract text from this file]`)
    }
  }

  return documents.join('\n\n')
}

async function readPayload(req: NextRequest): Promise<{ body: Payload; processDocuments: Record<number, string> }> {
  const contentType = req.headers.get('content-type') ?? ''

  if (!contentType.includes('multipart/form-data')) {
    return { body: (await req.json()) as Payload, processDocuments: {} }
  }

  const formData = await req.formData()
  const rawPayload = formData.get('payload')
  const body = typeof rawPayload === 'string' ? (JSON.parse(rawPayload) as Payload) : {}
  const processDocuments: Record<number, string> = {}

  for (let i = 0; i < 25; i++) {
    const files = formData.getAll(`processFiles:${i}`).filter((v): v is File => v instanceof File)
    if (files.length > 0) {
      processDocuments[i] = await processUploadedDocuments(files)
    }
  }

  return { body, processDocuments }
}

/** Coerce the browser payload into exactly the shape the webhook validates. */
function normalize(body: Payload, processDocuments: Record<number, string>) {
  const out: Record<string, unknown> = {}

  for (const g of GROUPS) {
    const raw = body[g]
    const src = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
    const group: Record<string, string> = {}
    for (const [k, v] of Object.entries(src)) group[k] = str(v)
    out[g] = group
  }

  const rawProcs = Array.isArray(body.processes) ? body.processes.slice(0, 25) : []
  out.processes = rawProcs.map((p, index) => {
    const src = p && typeof p === 'object' ? (p as Record<string, unknown>) : {}
    const entry: Record<string, string> = {}
    for (const k of PROCESS_KEYS) entry[k] = str(src[k])
    if (processDocuments[index]) entry.uploadedDocuments = longStr(processDocuments[index])
    return entry
  })

  return out
}

export async function POST(req: NextRequest) {
  const webhook = process.env.KEYSTROKE_DISCOVERY_WEBHOOK

  if (!webhook) {
    console.error('KEYSTROKE_DISCOVERY_WEBHOOK is not set')
    return NextResponse.json({ ok: false, error: 'Discovery intake is not configured' }, { status: 500 })
  }

  try {
    const { body, processDocuments } = await readPayload(req)
    const payload = normalize(body, processDocuments)
    const contact = payload.contact as Record<string, string>

    if (!contact.email || !contact.company) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('keystroke webhook rejected', upstream.status, detail.slice(0, 500))
      return NextResponse.json({ ok: false, error: 'Could not submit right now' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('discovery submit failed', err)
    return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
  }
}
