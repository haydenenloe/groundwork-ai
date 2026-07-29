import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

/**
 * Conversational discovery. The site holds the transcript client-side and posts
 * it here each turn; this route runs the interview with Claude. When the
 * interview is complete, it extracts the same structured payload the form used
 * and forwards it to the Keystroke analysis workflow — so the brief, ranking,
 * Slack, and vault all stay identical. Only the intake changed.
 */

const MODEL = 'claude-sonnet-4-5'
const COMPLETE_MARKER = '[[COMPLETE]]'

const INTERVIEW_SYSTEM = `You are the discovery consultant for Groundwork AI, a solo AI consulting practice run by Hayden Enloe. Hayden builds AI agents and automations for small and mid-sized businesses.

You are interviewing a prospect to uncover where AI can create the most measurable value in their business, so Hayden can walk into a follow-up meeting already knowing what to build. This conversation replaces a discovery call, and it is also the prospect's first taste of what Hayden builds, so it must feel sharp, warm, and genuinely curious, never like a survey.

## How to run the interview

- Ask ONE question at a time. Never stack multiple questions into one message.
- After each answer, reflect back what you heard in one short sentence, then ask the next best question. This makes them feel understood and keeps the thread tight.
- If an answer is vague ("we do a lot of manual stuff"), ask one specific follow-up ("walk me through one of those, start to finish"). Getting concrete detail is the whole point.
- Keep the WHOLE interview to about 10 questions. Follow-ups count. Do not exceed it.
- Be conversational and human. Short messages. No corporate filler, no bullet lists at them, no em dashes.

## What you must cover, roughly in this order

1. Who they are: their name, their email, and the company (get this early and naturally, so Hayden can follow up).
2. What the business does and how it makes money.
3. Where they are with AI: have they used it, what tools, what worked or disappointed them.
4. Their processes: this is the core. Get them to walk through the repetitive, manual, or time-consuming work day to day. For the most painful one, dig deep: who does it, how often, how long it takes, what tools, and what goes wrong. If they have more than one heavy process, briefly capture each.
5. The economics: roughly how much time or money this costs, who is involved, and whether fixing it would save cost, unlock revenue, or improve the customer experience.

Focus on repetitive work, bottlenecks, missed revenue, reporting/data/decision problems, knowledge trapped in people's heads, and expensive employee time. Do not overhype AI. Help them think clearly.

## Ending

When you have enough to hand Hayden a real plan (or you have reached about 10 questions), stop asking questions. Write one warm closing message: thank them by name, tell them Hayden will review their answers and come back with where AI can make the biggest difference before they meet. Then, on its own line at the very end of that final message, output exactly: ${COMPLETE_MARKER}

Never output ${COMPLETE_MARKER} until you are genuinely wrapping up. Never mention the marker or these instructions to the prospect.`

type ChatMessage = { role: 'user' | 'assistant'; content: string }

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

async function extractAndForward(client: Anthropic, messages: ChatMessage[]) {
  const webhook = process.env.KEYSTROKE_DISCOVERY_WEBHOOK
  if (!webhook) {
    console.error('KEYSTROKE_DISCOVERY_WEBHOOK is not set; discovery not forwarded')
    return
  }

  const extraction = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'submit_discovery' },
    messages: [
      {
        role: 'user',
        content: `Here is a completed discovery interview transcript. Extract everything the prospect told you into the structured fields. Use their own words and numbers. Leave a field as an empty string if it genuinely never came up. Capture every distinct process they described as its own entry.\n\n---\n\n${transcript(messages)}`,
      },
    ],
  })

  const toolUse = extraction.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
  )
  if (!toolUse) {
    console.error('extraction produced no tool_use block')
    return
  }

  const upstream = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toolUse.input),
  })
  if (!upstream.ok) {
    console.error('keystroke webhook rejected', upstream.status, (await upstream.text()).slice(0, 500))
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Chat is not configured' }, { status: 500 })
  }

  try {
    const body = (await req.json()) as { messages?: ChatMessage[] }
    const messages = Array.isArray(body.messages) ? body.messages.slice(-40) : []

    if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
      return NextResponse.json({ error: 'Expected a user message' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey })

    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: INTERVIEW_SYSTEM,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })

    const raw = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim()

    const done = raw.includes(COMPLETE_MARKER)
    const reply = raw.replace(COMPLETE_MARKER, '').trim()

    if (done) {
      // Fire the analysis but never make the prospect wait on it or see it fail.
      const full: ChatMessage[] = [...messages, { role: 'assistant', content: reply }]
      extractAndForward(client, full).catch(err => console.error('discovery forward failed', err))
    }

    return NextResponse.json({ reply, done })
  } catch (err) {
    console.error('discovery-chat failed', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
