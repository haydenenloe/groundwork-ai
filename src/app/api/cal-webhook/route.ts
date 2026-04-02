import { NextRequest, NextResponse } from 'next/server'

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY!
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!
const NOTION_API_KEY = process.env.NOTION_API_KEY!
const NOTION_DB_ID = '8b56a719-4baa-4c68-a080-666548fdb0ee'

// ─── SCRAPE ──────────────────────────────────────────────────────────────────

async function scrape(url: string): Promise<string> {
  const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
  })

  if (!res.ok) throw new Error(`Firecrawl error ${res.status}`)
  const data = await res.json()
  return data?.data?.markdown || ''
}

// ─── ENRICH WITH CLAUDE ───────────────────────────────────────────────────────

async function enrichWithClaude(
  company: string,
  name: string,
  website: string,
  content: string
): Promise<any> {
  const prompt = `You are a B2B sales intelligence analyst. Analyze this company's website content and return a JSON object with the following fields:

- industry: string (e.g., "B2B SaaS", "Healthcare Tech", "Fintech")
- company_size: string (e.g., "11-50 employees", "51-200 employees")
- business_model: string (e.g., "SaaS subscription", "Professional services", "Marketplace")
- funding_stage: string (e.g., "Bootstrapped", "Seed", "Series A", "Series B+", "Unknown")
- tech_stack: string[] (technologies mentioned or inferred, max 8)
- pain_points: string[] (operational pain points this company likely has, 3-5 items)
- ai_opportunity: string (the single highest-ROI AI opportunity for this company, 2-3 sentences)
- call_prep_tips: string[] (exactly 3 specific tips for a discovery call with this company)
- summary: string (2-3 sentence company overview for context)

Company name: ${company}
Contact name: ${name}
Website: ${website}

Website content:
${content.slice(0, 8000)}

Return ONLY valid JSON. No markdown, no explanation.`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) throw new Error(`Anthropic error ${res.status}`)
  const data = await res.json()
  const text = data?.content?.[0]?.text || '{}'

  try {
    return JSON.parse(text)
  } catch {
    // Try to extract JSON from text
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    return {}
  }
}

// ─── CREATE NOTION LEAD ───────────────────────────────────────────────────────

async function createNotionLead(data: {
  name: string
  email: string
  company: string
  website: string
  startTime: string
  enriched: any
}): Promise<void> {
  const { name, email, company, website, startTime, enriched: e } = data

  const meetingDate = new Date(startTime).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  })

  // Build children blocks
  const children: any[] = [
    // Callout: meeting info
    {
      type: 'callout',
      callout: {
        rich_text: [{
          type: 'text',
          text: { content: `📅 Meeting: ${meetingDate}\n👤 ${name} (${email})\n🏢 ${company}${website ? `\n🌐 ${website}` : ''}` },
        }],
        icon: { emoji: '📋' },
        color: 'blue_background',
      },
    },
  ]

  // Company Overview
  if (e?.summary) {
    children.push({
      type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'Company Overview' } }] },
    })
    children.push({
      type: 'paragraph',
      paragraph: { rich_text: [{ type: 'text', text: { content: e.summary } }] },
    })
  }

  // Call Prep Tips
  if (e?.call_prep_tips?.length) {
    children.push({
      type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'Call Prep Tips' } }] },
    })
    for (const tip of e.call_prep_tips) {
      children.push({
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: tip } }] },
      })
    }
  }

  // AI Opportunity
  if (e?.ai_opportunity) {
    children.push({
      type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'AI Opportunity' } }] },
    })
    children.push({
      type: 'paragraph',
      paragraph: { rich_text: [{ type: 'text', text: { content: e.ai_opportunity } }] },
    })
  }

  // Business Intel
  const intelItems = [
    e?.industry && `Industry: ${e.industry}`,
    e?.company_size && `Size: ${e.company_size}`,
    e?.business_model && `Business Model: ${e.business_model}`,
    e?.funding_stage && `Funding Stage: ${e.funding_stage}`,
  ].filter(Boolean)

  if (intelItems.length) {
    children.push({
      type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'Business Intel' } }] },
    })
    for (const item of intelItems) {
      children.push({
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: item as string } }] },
      })
    }
  }

  // Pain Points
  if (e?.pain_points?.length) {
    children.push({
      type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'Pain Points' } }] },
    })
    for (const point of e.pain_points) {
      children.push({
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: point } }] },
      })
    }
  }

  // Tech Stack
  if (e?.tech_stack?.length) {
    children.push({
      type: 'heading_2',
      heading_2: { rich_text: [{ type: 'text', text: { content: 'Tech Stack' } }] },
    })
    for (const tech of e.tech_stack) {
      children.push({
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: tech } }] },
      })
    }
  }

  const payload = {
    parent: { database_id: NOTION_DB_ID },
    properties: {
      Name: { title: [{ text: { content: `${name} — ${company}` } }] },
      Email: { email },
      Company: { rich_text: [{ text: { content: company } }] },
      Website: website ? { url: website } : undefined,
      'Meeting Date': { date: { start: startTime } },
      Status: { select: { name: 'Booked' } },
    },
    children,
  }

  // Remove undefined properties
  Object.keys(payload.properties).forEach(key => {
    if ((payload.properties as any)[key] === undefined) {
      delete (payload.properties as any)[key]
    }
  })

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Notion error ${res.status}: ${body}`)
  }
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.json()
  const payload = body.payload || body

  const attendee = payload?.attendees?.[0] || {}
  const responses = payload?.responses || {}

  const name = attendee.name || responses.name?.value || 'Unknown'
  const email = attendee.email || responses.email?.value || ''
  const company = responses.company?.value || (name + "'s Company")
  const website = responses.website?.value || ''
  const startTime = payload?.startTime || new Date().toISOString()

  // Respond immediately — don't block the caller
  const response = NextResponse.json({ ok: true })

  // Run enrichment in the background (best-effort)
  ;(async () => {
    try {
      let enriched = null

      if (website) {
        const baseUrl = website.replace(/\/+$/, '')
        const [main, about] = await Promise.all([
          scrape(website),
          scrape(baseUrl + '/about'),
        ])
        enriched = await enrichWithClaude(company, name, website, main + '\n\n' + about)
      }

      await createNotionLead({ name, email, company, website, startTime, enriched })
    } catch (err: any) {
      console.error('cal-webhook enrichment error:', err.message)
    }
  })()

  return response
}
