// Vercel serverless function — Cal.com booking → Firecrawl → Claude → Notion
// URL: https://groundwork-ai.dev/api/cal-webhook
// maxDuration: 60s (set in vercel.json)

export const maxDuration = 60;

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = '8b56a719-4baa-4c68-a080-666548fdb0ee';

async function scrape(url) {
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true, waitFor: 2000 }),
    });
    const data = await res.json();
    return data.data?.markdown || data.markdown || '';
  } catch {
    return '';
  }
}

async function enrichWithClaude(company, name, website, content) {
  const prompt = `Analyze this company website content and extract structured business intelligence for a sales call prep brief. Return ONLY a JSON object with these fields:

- industry (string)
- company_size (string: "1-10", "11-50", "51-200", "201-500", "500+", or "Unknown")
- business_model (string: "B2B", "B2C", "B2B2C", "Marketplace", or "Unknown")
- pricing_model (string: "Free", "Freemium", "Subscription", "One-time", "Usage-based", "Enterprise", "Unknown")
- tech_stack (array of strings)
- funding_stage (string: "Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B+", "Public", "Unknown")
- is_hiring (boolean)
- ai_opportunity (string - 2-3 sentences on SPECIFIC ways Groundwork AI could help replace manual workflows)
- pain_points (array of strings - likely operational bottlenecks)
- call_prep_tips (array of 3 specific talking points for the sales call)
- summary (string - 2-3 sentence company overview)

Company: ${company}
Contact: ${name}
Website: ${website}

Website content:
${content.substring(0, 7000)}

Return ONLY valid JSON.`;

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
  });

  const data = await res.json();
  const text = data.content?.[0]?.text || '';

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return null;
  }
}

async function createNotionLead({ name, email, company, website, startTime, enriched }) {
  const meetingDate = startTime
    ? new Date(startTime).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'TBD';

  const e = enriched || {};

  const blocks = [
    { object: 'block', type: 'callout', callout: { icon: { type: 'emoji', emoji: '📅' }, rich_text: [{ type: 'text', text: { content: `Meeting: ${meetingDate} | Contact: ${name} | Email: ${email || 'N/A'}` } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🏢 Company Overview' } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: e.summary || 'No summary available.' } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '📞 Call Prep Tips' } }] } },
    ...(e.call_prep_tips || ['Research their workflows', 'Ask about biggest bottleneck', 'Lead with ROI']).map(t => ({
      object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: t } }] }
    })),
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🤖 AI Opportunity' } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: e.ai_opportunity || 'Not analyzed.' } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '📊 Business Intelligence' } }] } },
    ...['Industry', 'Company Size', 'Business Model', 'Pricing Model', 'Funding Stage'].map(k => ({
      object: 'block', type: 'bulleted_list_item', bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: `${k}: ${e[k.toLowerCase().replace(' ', '_')] || 'Unknown'}` } }]
      }
    })),
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: `Is Hiring: ${e.is_hiring ? 'Yes' : 'No'}` } }] } },
  ];

  if ((e.pain_points || []).length > 0) {
    blocks.push({ object: 'block', type: 'divider', divider: {} });
    blocks.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '😤 Pain Points' } }] } });
    e.pain_points.forEach(p => blocks.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: p } }] } }));
  }

  if ((e.tech_stack || []).length > 0) {
    blocks.push({ object: 'block', type: 'divider', divider: {} });
    blocks.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🔧 Tech Stack' } }] } });
    e.tech_stack.forEach(t => blocks.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: t } }] } }));
  }

  blocks.push({ object: 'block', type: 'divider', divider: {} });
  blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `🔗 ${website || 'No website'}${email ? ` | ✉️ ${email}` : ''} | Source: Cal.com booking` } }] } });

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Name: { title: [{ type: 'text', text: { content: company || name || 'Unknown' } }] },
      },
      children: blocks,
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const body = req.body;
    const payload = body.payload || body;

    const attendee = (payload.attendees && payload.attendees[0]) || {};
    const responses = payload.responses || {};

    const name = attendee.name || responses.name?.value || 'Unknown';
    const email = attendee.email || responses.email?.value || '';
    const company = responses.company?.value || responses.organization?.value || (name + "'s Company");
    const website = responses.website?.value || responses.companyWebsite?.value || '';
    const startTime = payload.startTime || new Date().toISOString();

    // Immediately respond so Cal.com doesn't timeout
    res.status(200).json({ ok: true });

    // Run enrichment after responding
    let enriched = null;
    if (website) {
      const [mainContent, aboutContent] = await Promise.all([
        scrape(website),
        scrape(website.replace(/\/+$/, '') + '/about'),
      ]);
      const content = `# ${company} - Main Page\n\n${mainContent}\n\n---\n\n# About Page\n\n${aboutContent}`;
      enriched = await enrichWithClaude(company, name, website, content);
    }

    await createNotionLead({ name, email, company, website, startTime, enriched });
  } catch (err) {
    console.error('cal-webhook error:', err.message);
    if (!res.headersSent) res.status(200).json({ ok: true });
  }
}
