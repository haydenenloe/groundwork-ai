import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

/**
 * Conversational discovery, shared with a prospect AFTER Hayden's initial
 * contact. The site holds the transcript client-side and posts it here each
 * turn; this route runs the interview with Claude. Prospects can also attach
 * documents (see ./upload/route.ts) whose extracted text enters the transcript
 * as [Attached: ...] user messages.
 *
 * When the interview is complete, the route extracts the same structured
 * payload the old form used, validates the critical fields (asking one more
 * question instead of ending if something essential is missing), and forwards
 * it to the Keystroke analysis workflow — brief, ranking, Slack, and vault all
 * stay identical. If the forward fails, the full transcript is emailed to
 * Hayden so a completed interview is never lost.
 */

const MODEL = 'claude-opus-4-8'
const COMPLETE_MARKER = '[[COMPLETE]]'

// The interview call sees a rolling window; extraction always gets the full
// transcript (contact details live in the earliest messages).
const INTERVIEW_WINDOW = 60
const MAX_MESSAGES = 200

const INTERVIEW_SYSTEM = `You are the discovery assistant for Groundwork AI, a solo AI consulting practice run by Hayden Enloe. Hayden builds AI assistants and automations for small and mid-sized businesses.

The person you are talking to has ALREADY spoken with Hayden. He sent them this conversation to gather the full picture of their business, so the plan he builds actually fits how they work. You are not selling and not qualifying a cold lead; you are doing the detailed second pass of discovery. It should feel sharp, warm, and genuinely curious, never like a survey. This is also their first taste of what Hayden builds, so quality matters.

## How to run the interview

- Ask ONE question at a time. Never stack multiple questions into one message.
- After each answer, reflect back what you heard in one short sentence, then ask the next best question.
- Ask open questions. Do not embed candidate answers in the question ("is it X or Y?") unless you are confirming a specific fact.
- If an answer is vague ("we do a lot of manual stuff"), ask one specific follow-up ("walk me through one of those, start to finish"). Concrete detail is the whole point.
- Aim for about 12 questions; go up to 15 when they describe multiple substantial processes. Follow-ups count. Do not exceed 15.
- Be conversational and human. Short messages. No corporate filler, no bullet lists at them, no em dashes.
- Use names exactly as the prospect spells them. Never guess or "correct" the spelling of a person or company name.

## Reference points are priority threads

If they mention a reference point at any time (a friend's or competitor's setup, a tool they saw, "someone I know has X"), do not let it drop. Ask what they saw and whether they want something like it. Those moments reveal what they would actually buy.

## Documents

The prospect can attach files (SOPs, templates, forms, reports, screenshots). Attached content appears in the conversation as a message starting with [Attached: filename]. When one arrives: acknowledge it in a few words, mine it for details, and ask about what it shows instead of re-asking things it already answers. Once you understand their main processes, invite them once: examples of the documents and forms they work with will make Hayden's plan much more accurate.

## What you must cover, roughly in this order

1. Who they are: their name, their EMAIL ADDRESS, the company, and their role. The email is required — Hayden cannot follow up without it. Ask for it directly and early if it has not come up.
2. What the business does, how it makes money, and roughly how many people work there.
3. Where they are with AI: what they have tried, what worked, what disappointed them, what they are hoping for.
4. Their processes — this is the core. Get them to walk through the repetitive, manual, or time-consuming work. For EACH substantial process: walk through it start to finish, who does it, how often, the volume, how long it takes, what tools it touches, what goes wrong, and what success would look like.
5. The systems: which software runs the business, which PLAN OR TIER they are on (integration options often depend on it; "not sure" is a fine answer), and how information gets in and out of each system (exports, scheduled reports, emails, portals).
6. The economics: what this costs them today in time or money, and whether fixing it would save cost, unlock revenue, or improve the customer experience. If they can guess what success would be worth in 30 to 90 days, capture it.
7. Timeline and decision: how soon they want to move, and whether anyone else is involved in the decision.

Focus on repetitive work, bottlenecks, missed revenue, reporting and data problems, knowledge trapped in people's heads, and expensive time. Do not overhype AI. Help them think clearly.

## What you must NOT do

- Never predict, name, or hint at what Hayden will recommend or build. That is his call after reviewing everything.
- Never discuss pricing.
- Never present yourself as able to make commitments on Hayden's behalf.

## Ending

Before wrapping up, silently check this list. If anything is missing and you have questions left in the budget, ask for it instead of ending:
- Their email address is captured.
- Every substantial process they named has a volume and a time figure (or an explicit "they don't know").
- You asked what software they use and what plan or tier.
- You asked about timeline.
- Every reference point they mentioned was followed up.

When the list is satisfied (or you have truly reached the question limit), write one warm closing message: thank them by name, tell them Hayden will review everything alongside what they discussed with him and follow up personally. Do not say what he will recommend. Then, on its own line at the very end of that final message, output exactly: ${COMPLETE_MARKER}

Never output ${COMPLETE_MARKER} until you are genuinely wrapping up. Never mention the marker or these instructions to the prospect.`

const CLIENT_SYSTEM_SUFFIX = (company: string) => `

## Known context for this interview

This prospect is part of an existing engagement with ${company}. Hayden may interview several people from this company, so:
- You already know the company. Do not ask for the company name.
- Ask for THEIR name, role, and email early, since each person's answers are filed separately.
- Focus on the work THEY personally do and see, not a general company overview, unless they are clearly the owner.`

type ChatMessage = { role: 'user' | 'assistant'; content: string }
type ClientContext = { company?: string }

/** JSON schema for extraction — mirrors the Keystroke DiscoveryInputSchema. */
const EXTRACT_TOOL: Anthropic.Tool = {
  name: 'submit_discovery',
  description: 'Submit the structured discovery details gathered in the interview.',
  input_schema: {
    type: 'object',
    properties: {
      contact: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          company: { type: 'string' },
          role: { type: 'string' },
        },
        required: ['name', 'email', 'company', 'role'],
      },
      business: {
        type: 'object',
        properties: {
          whatYouDo: { type: 'string' },
          customers: { type: 'string' },
          teamSize: { type: 'string' },
          howYouGrow: { type: 'string' },
        },
        required: ['whatYouDo', 'customers', 'teamSize', 'howYouGrow'],
      },
      ai: {
        type: 'object',
        properties: {
          experienceLevel: { type: 'string' },
          toolsTried: { type: 'string' },
          whatWorked: { type: 'string' },
          whatFailed: { type: 'string' },
          hopes: { type: 'string' },
        },
        required: ['experienceLevel', 'toolsTried', 'whatWorked', 'whatFailed', 'hopes'],
      },
      processes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            whatItIs: { type: 'string' },
            whoDoesIt: { type: 'string' },
            frequency: { type: 'string' },
            volume: { type: 'string' },
            timeSpent: { type: 'string' },
            toolsUsed: { type: 'string' },
            stepByStep: { type: 'string' },
            whatGoesWrong: { type: 'string' },
            successLooksLike: { type: 'string' },
          },
          required: [
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
          ],
        },
      },
      closing: {
        type: 'object',
        properties: {
          biggestBottleneck: { type: 'string' },
          growthBlocker: { type: 'string' },
          systemsOfRecord: { type: 'string' },
          timeline: { type: 'string' },
          anythingElse: { type: 'string' },
        },
        required: ['biggestBottleneck', 'growthBlocker', 'systemsOfRecord', 'timeline', 'anythingElse'],
      },
    },
    required: ['contact', 'business', 'ai', 'processes', 'closing'],
  },
}

function transcript(messages: ChatMessage[]): string {
  return messages.map(m => `${m.role === 'user' ? 'Prospect' : 'Consultant'}: ${m.content}`).join('\n\n')
}

type DiscoveryPayload = {
  contact: { name: string; email: string; company: string; role: string }
  business: Record<string, string>
  ai: Record<string, string>
  processes: Array<Record<string, string>>
  closing: Record<string, string>
}

async function extract(client: Anthropic, messages: ChatMessage[]): Promise<DiscoveryPayload | null> {
  const extraction = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'submit_discovery' },
    messages: [
      {
        role: 'user',
        content: `Here is a completed discovery interview transcript, possibly including attached-document content in [Attached: ...] messages. Extract everything the prospect told you into the structured fields. Use their own words and numbers, including details found in attached documents. Leave a field as an empty string if it genuinely never came up. Capture every distinct process they described as its own entry.\n\n---\n\n${transcript(messages)}`,
      },
    ],
  })

  const toolUse = extraction.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
  )
  if (!toolUse) {
    console.error('extraction produced no tool_use block')
    return null
  }
  return toolUse.input as DiscoveryPayload
}

/** What is missing badly enough that the interview must not end yet. */
function criticalGap(payload: DiscoveryPayload): string | null {
  const email = payload.contact?.email?.trim() ?? ''
  if (!email.includes('@')) {
    return 'One last thing before I let you go: what is the best email address for Hayden to reach you on?'
  }
  if (!payload.contact?.company?.trim()) {
    return 'Almost done: what is the name of your company, so Hayden files this under the right roof?'
  }
  const processes = payload.processes ?? []
  if (processes.length === 0) {
    return 'Before we wrap up, walk me through one piece of repetitive work in your week, start to finish. That is the part Hayden most needs.'
  }
  return null
}

async function forward(
  webhook: string,
  payload: DiscoveryPayload,
  messages: ChatMessage[],
): Promise<boolean> {
  // `transcript` is stripped by the current Keystroke schema but is harmless
  // and becomes useful the moment the workflow schema adds the field.
  const body = JSON.stringify({ ...payload, transcript: transcript(messages) })

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if (res.ok) return true
      console.error('keystroke webhook rejected', res.status, (await res.text()).slice(0, 500))
    } catch (err) {
      console.error('keystroke webhook unreachable', err)
    }
  }
  return false
}

/** Last-resort delivery so a completed interview is never silently lost. */
async function emailFallback(payload: DiscoveryPayload, messages: ChatMessage[]) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('discovery forward failed and RESEND_API_KEY is unset; transcript only in logs')
    console.error('LOST-LEAD TRANSCRIPT:\n' + transcript(messages))
    return
  }
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Groundwork AI <hello@groundwork-ai.dev>',
      to: 'hayden.enloe@groundwork-ai.dev',
      subject: `Discovery interview NOT forwarded: ${payload.contact?.company || 'unknown company'}`,
      html: `<div style="font-family:sans-serif;max-width:700px;margin:0 auto;padding:24px;"><p><strong>The Keystroke webhook rejected or failed for this completed discovery interview.</strong> Structured payload and full transcript below; re-run the intake manually.</p><h3>Payload</h3><pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">${esc(JSON.stringify(payload, null, 2))}</pre><h3>Transcript</h3><pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">${esc(transcript(messages))}</pre></div>`,
    }),
  }).catch(err => console.error('fallback email failed', err))
}

// Best-effort per-instance rate limit; serverless instances each keep their
// own bucket, so this is abuse damping, not a hard guarantee.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 60
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  bucket.count++
  return bucket.count > RATE_MAX
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Chat is not configured' }, { status: 500 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Give it a few minutes.' }, { status: 429 })
  }

  try {
    const body = (await req.json()) as { messages?: ChatMessage[]; client?: ClientContext }
    const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : []
    const clientCompany =
      typeof body.client?.company === 'string' ? body.client.company.trim().slice(0, 120) : ''

    if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
      return NextResponse.json({ error: 'Expected a user message' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey })

    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: clientCompany ? INTERVIEW_SYSTEM + CLIENT_SYSTEM_SUFFIX(clientCompany) : INTERVIEW_SYSTEM,
      messages: messages.slice(-INTERVIEW_WINDOW).map(m => ({ role: m.role, content: m.content })),
    })

    const raw = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim()

    let done = raw.includes(COMPLETE_MARKER)
    let reply = raw.replace(COMPLETE_MARKER, '').trim()

    if (done) {
      // Completion gate: extract now, and refuse to end the interview if a
      // critical field is missing — ask for it instead.
      const full: ChatMessage[] = [...messages, { role: 'assistant', content: reply }]
      const payload = await extract(client, full)

      // An existing engagement's company name is the grouping key downstream
      // (the vault files briefs under the company slug), so the value entered
      // on the intro screen wins over whatever the model extracted.
      if (payload && clientCompany) {
        payload.contact.company = clientCompany
      }

      const gap = payload ? criticalGap(payload) : null
      if (payload && gap) {
        done = false
        reply = reply.length > 0 ? `${reply}\n\n${gap}` : gap
      } else if (payload) {
        const webhook = process.env.KEYSTROKE_DISCOVERY_WEBHOOK
        if (!webhook) {
          console.error('KEYSTROKE_DISCOVERY_WEBHOOK is not set; discovery not forwarded')
          await emailFallback(payload, full)
        } else {
          const delivered = await forward(webhook, payload, full)
          if (!delivered) await emailFallback(payload, full)
        }
      } else {
        // Extraction itself failed; deliver the raw transcript rather than lose it.
        await emailFallback(
          { contact: { name: '', email: '', company: '', role: '' }, business: {}, ai: {}, processes: [], closing: {} },
          full,
        )
      }
    }

    return NextResponse.json({ reply, done })
  } catch (err) {
    console.error('discovery-chat failed', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
