// Vercel serverless function — relays Cal.com webhooks to n8n on the Mac Mini
// Deploy URL: https://groundwork-ai.dev/api/cal-webhook
// Point Cal.com webhook here, this forwards to n8n via Tailscale

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

  if (!N8N_WEBHOOK_URL) {
    console.error('N8N_WEBHOOK_URL env var not set');
    return res.status(500).json({ error: 'Webhook relay not configured' });
  }

  try {
    const body = req.body;

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log('n8n response:', response.status, text);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Relay error:', err.message);
    // Return 200 to Cal.com so it doesn't retry — we don't want to lose the event
    return res.status(200).json({ ok: true, note: 'relay_error_logged' });
  }
}
