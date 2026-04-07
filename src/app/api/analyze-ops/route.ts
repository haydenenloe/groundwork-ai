import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are an AI operations consultant. Analyze the provided business documents and workflow descriptions to produce an AI Operations Snapshot.

Output:

1. EXECUTIVE SUMMARY
2-3 sentences on overall AI readiness and biggest opportunity.

2. TOP 3 AUTOMATION OPPORTUNITIES
For each:
- Name
- How it works today
- What AI could do
- Time saved per week (estimate)
- Complexity: Low / Medium / High
- ROI Score: 1-10

3. QUICK WINS (implementable in 30 days with existing tools)

4. NEXT STEPS
What a full AI Operations Audit would uncover that this snapshot cannot.

Be specific and practical. No vague recommendations.`

async function extractText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase()

  if (ext === 'txt' || ext === 'md') {
    return await file.text()
  }

  if (ext === 'pdf') {
    // pdf-parse expects a Buffer
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const data = await pdfParse(buffer)
    return data.text
  }

  if (ext === 'docx') {
    const mammoth = await import('mammoth')
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  return `[Unsupported file type: ${file.name}]`
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    const workflow = (formData.get('workflow') as string | null) ?? ''

    if (files.length === 0 && !workflow.trim()) {
      return NextResponse.json(
        { error: 'Provide at least one document or workflow description.' },
        { status: 400 }
      )
    }

    // Extract text from each uploaded file
    const documentTexts: string[] = []
    for (const file of files) {
      try {
        const text = await extractText(file)
        if (text.trim()) {
          documentTexts.push(`=== ${file.name} ===\n${text.trim()}`)
        }
      } catch (err) {
        console.error(`Failed to parse ${file.name}:`, err)
        documentTexts.push(`=== ${file.name} ===\n[Could not extract text from this file]`)
      }
    }

    // Build user message
    const parts: string[] = []

    if (documentTexts.length > 0) {
      parts.push('UPLOADED DOCUMENTS:\n\n' + documentTexts.join('\n\n'))
    }

    if (workflow.trim()) {
      parts.push('WORKFLOW DESCRIPTION FROM CLIENT:\n\n' + workflow.trim())
    }

    const userMessage = parts.join('\n\n---\n\n')

    // Call Anthropic
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not configured.' }, { status: 500 })
    }

    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })

    const report = message.content
      .filter(block => block.type === 'text')
      .map(block => (block as { type: 'text'; text: string }).text)
      .join('\n')

    return NextResponse.json({ report })
  } catch (err: unknown) {
    console.error('analyze-ops error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
