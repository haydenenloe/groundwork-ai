import { NextRequest, NextResponse } from 'next/server'

const DISCORD_CHANNEL_ID = '1486415426757070889' // #groundwork-ai

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, bottleneck } = await req.json()

    if (!name || !email || !company || !bottleneck) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const notionKey = process.env.NOTION_API_KEY!
    const resendKey = process.env.RESEND_API_KEY!
    const discordToken = process.env.DISCORD_BOT_TOKEN!
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    // ── 1. Create Notion page ──────────────────────────────────────────────
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: '8b56a719-4baa-4c68-a080-666548fdb0ee' },
        properties: {
          Name: { title: [{ text: { content: company } }] },
        },
        children: [
          { object: 'block', type: 'callout', callout: { rich_text: [{ type: 'text', text: { content: `📋 Audit Application | Contact: ${name} | Email: ${email}` } }], icon: { type: 'emoji', emoji: '📋' } } },
          { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: "What's eating their time" } }] } },
          { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: bottleneck } }] } },
          { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: `Source: Landing page audit application form | Submitted: ${date}` } }] } },
        ],
      }),
    })

    const notionPage = notionRes.ok ? await notionRes.json() : null
    const notionUrl = notionPage?.url || 'https://notion.so'

    // ── 2. Discord notification ────────────────────────────────────────────
    if (discordToken) {
      await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bot ${discordToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: '🎯 New Audit Application',
            color: 0x4B7FFF,
            fields: [
              { name: 'Company', value: company, inline: true },
              { name: 'Contact', value: name, inline: true },
              { name: 'Email', value: email, inline: false },
              { name: "What's eating their time", value: bottleneck, inline: false },
            ],
            footer: { text: `Submitted ${date}` },
            url: notionUrl,
          }],
        }),
      })
    }

    // ── 3. Notification email to Hayden ───────────────────────────────────
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Groundwork AI <hello@groundwork-ai.dev>',
        to: 'hayden.enloe@groundwork-ai.dev',
        subject: `New Audit Request: ${company}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0C1525;color:#DCE3EF;padding:32px;border-radius:12px;"><h2 style="color:#4B7FFF;margin-top:0;">New Audit Application</h2><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#8892A4;width:120px;">Name</td><td style="padding:8px 0;">${name}</td></tr><tr><td style="padding:8px 0;color:#8892A4;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#4B7FFF;">${email}</a></td></tr><tr><td style="padding:8px 0;color:#8892A4;">Company</td><td style="padding:8px 0;">${company}</td></tr></table><div style="margin-top:24px;padding:16px;background:#162035;border-radius:8px;border-left:3px solid #4B7FFF;"><p style="color:#8892A4;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">What's eating their time</p><p style="color:#DCE3EF;margin:0;line-height:1.6;">${bottleneck}</p></div><p style="color:#4A5568;font-size:12px;margin-top:24px;">Submitted: ${date} · <a href="${notionUrl}" style="color:#4B7FFF;">View in Notion</a></p></div>`,
      }),
    })

    // ── 4. Confirmation email to applicant ────────────────────────────────
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Hayden at Groundwork AI <hello@groundwork-ai.dev>',
        to: email,
        subject: "Got your request — we'll be in touch",
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333;padding:32px;"><p>Hi ${name},</p><p>Thanks for reaching out. We'll be in touch within 1 business day to schedule your AI Operations Audit.</p><p style="margin-top:32px;">— Hayden, Groundwork AI</p></div>`,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply route error:', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
