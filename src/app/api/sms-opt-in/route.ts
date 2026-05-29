import { NextRequest, NextResponse } from 'next/server'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidPhone(phone: string) {
  const normalized = phone.replace(/[\s().-]/g, '')
  return /^\+?1?\d{10}$/.test(normalized)
}

export async function POST(req: NextRequest) {
  try {
    const { name = '', phone, consent } = await req.json()

    if (!phone || typeof phone !== 'string' || !isValidPhone(phone)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid US phone number.' }, { status: 400 })
    }

    if (consent !== true) {
      return NextResponse.json({ ok: false, error: 'Consent is required to subscribe.' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json({ ok: false, error: 'Form destination is not configured.' }, { status: 500 })
    }

    const submittedAt = new Date().toISOString()
    const cleanName = escapeHtml(String(name || 'Not provided').trim() || 'Not provided')
    const cleanPhone = escapeHtml(phone.trim())
    const consentText = 'I authorize Groundwork AI to send automated text messages to the phone number provided about its services and updates. Message and data rates may apply. Message frequency varies. Text HELP for help or STOP to opt out at any time. Consent is not a condition of any purchase. See our Privacy Policy.'

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Groundwork AI <hello@groundwork-ai.dev>',
        to: 'hayden.enloe@groundwork-ai.dev',
        subject: 'New SMS Opt-In Submission',
        html: `<div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#0C1525;color:#DCE3EF;padding:32px;border-radius:12px;">
          <h2 style="color:#4B7FFF;margin-top:0;">New SMS Opt-In Submission</h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:8px 0;color:#8892A4;width:140px;">Name</td><td style="padding:8px 0;">${cleanName}</td></tr>
            <tr><td style="padding:8px 0;color:#8892A4;">Phone</td><td style="padding:8px 0;">${cleanPhone}</td></tr>
            <tr><td style="padding:8px 0;color:#8892A4;">Submitted</td><td style="padding:8px 0;">${submittedAt}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#162035;border-radius:8px;border-left:3px solid #4B7FFF;">
            <p style="color:#8892A4;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Consent text accepted</p>
            <p style="color:#DCE3EF;margin:0;line-height:1.6;">${escapeHtml(consentText)}</p>
          </div>
        </div>`,
      }),
    })

    if (!emailRes.ok) {
      const detail = await emailRes.text()
      console.error('Resend SMS opt-in error:', detail)
      return NextResponse.json({ ok: false, error: 'Could not submit the form. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('SMS opt-in route error:', err)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
