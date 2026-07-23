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

type Payload = Record<string, unknown>

const str = (v: unknown): string => (typeof v === 'string' ? v.slice(0, 8000) : '')

/** Coerce the browser payload into exactly the shape the webhook validates. */
function normalize(body: Payload) {
  const out: Record<string, unknown> = {}

  for (const g of GROUPS) {
    const raw = body[g]
    const src = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
    const group: Record<string, string> = {}
    for (const [k, v] of Object.entries(src)) group[k] = str(v)
    out[g] = group
  }

  const rawProcs = Array.isArray(body.processes) ? body.processes.slice(0, 25) : []
  out.processes = rawProcs.map(p => {
    const src = p && typeof p === 'object' ? (p as Record<string, unknown>) : {}
    const entry: Record<string, string> = {}
    for (const k of PROCESS_KEYS) entry[k] = str(src[k])
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
    const body = (await req.json()) as Payload
    const payload = normalize(body)
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
