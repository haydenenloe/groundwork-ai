// Vercel serverless function — Cal.com booking → Firecrawl → Claude → Notion
// URL: https://groundwork-ai.dev/api/cal-webhook

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = '8b56a719-4baa-4c68-a080-666548fdb0ee';

async function scrape(url) {
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true, waitFor: 2000 }),
    });
    const data = await res.json();
    return data.data?.markdown || data.markdown || '';
  } catch { return ''; }
}

async function enrichWithClaude(company, name, website, content) {
  const prompt = `Analyze this company website and extract business intelligence for a sales call prep brief. Return ONLY valid JSON with:
- industry, company_size, business_model, pricing_model, funding_stage (strings)
- tech_stack, pain_points (string arrays)
- is_hiring (boolean)
- ai_opportunity (2-3 sentences on how Groundwork AI could help)
- call_prep_tips (array of 3 specific talking points for the sales call)
- summary (2-3 sentence overview)

Company: ${company} | Contact: ${name} | Website: ${website}
Content: ${content.substring(0, 6000)}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 1200, messages: [{ role: 'user', content: prompt }] }),
  });
  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  try { return JSON.parse(text); }
  catch { const m = text.match(/\{[\s\S]*\}/); return m ? JSON.parse(m[0]) : null; }
}

async function createNotionLead({ name, email, company, website, startTime, e }) {
  const meetingDate = startTime ? new Date(startTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'TBD';
  const blocks = [
    { object: 'block', type: 'callout', callout: { icon: { type: 'emoji', emoji: '📅' }, rich_text: [{ type: 'text', text: { content: `Meeting: ${meetingDate} | ${name} | ${email || 'No email'}` } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🏢 Overview' } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: e?.summary || 'No website provided.' } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '📞 Call Prep Tips' } }] } },
    ...(e?.call_prep_tips || ['Ask about current workflows', 'Find the biggest bottleneck', 'Lead with ROI']).map(t => ({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: t } }] } })),
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🤖 AI Opportunity' } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: e?.ai_opportunity || 'Not analyzed.' } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '📊 Intel' } }] } },
    ...['industry','company_size','business_model','funding_stage'].map(k => ({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: `${k.replace('_',' ')}: ${e?.[k] || 'Unknown'}` } }] } })),
    ...(e?.pain_points?.length ? [
      { object: 'block', type: 'divider', divider: {} },
      { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '😤 Pain Points' } }] } },
      ...e.pain_points.map(p => ({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: p } }] } })),
    ] : []),
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `🔗 ${website || 'No website'} | ✉️ ${email || 'N/A'} | Source: Cal.com` } }] } },
  ];

  await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${NOTION_API_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
    body: JSON.stringify({ parent: { database_id: NOTION_DB_ID }, properties: { Name: { title: [{ type: 'text', text: { content: company || name || 'Unknown' } }] } }, children: blocks }),
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  res.status(200).json({ ok: true });

  try {
    const payload = req.body?.payload || req.body;
    const attendee = payload?.attendees?.[0] || {};
    const responses = payload?.responses || {};
    const name = attendee.name || responses.name?.value || 'Unknown';
    const email = attendee.email || responses.email?.value || '';
    const company = responses.company?.value || (name + "'s Company");
    const website = responses.website?.value || '';
    const startTime = payload?.startTime || new Date().toISOString();

    let e = null;
    if (website) {
      const [main, about] = await Promise.all([scrape(website), scrape(website.replace(/\/+$/, '') + '/about')]);
      e = await enrichWithClaude(company, name, website, main + '\n\n' + about);
    }
    await createNotionLead({ name, email, company, website, startTime, e });
  } catch (err) {
    console.error('cal-webhook error:', err.message);
  }
};
