import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY  = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL    = "haydenenloe@gmail.com";
const FROM_EMAIL      = "Groundwork AI <onboarding@resend.dev>";

serve(async (req) => {
  try {
    const payload = await req.json();
    // Support both direct record (from pg_net trigger) and wrapped { record: {...} } format
    const record  = payload.record ?? payload;

    const { name, email, company_name, score, tier, answers } = record;

    // Tier color
    const tierColor = score >= 80 ? "#4B7FFF"
      : score >= 59 ? "#4B7FFF"
      : score >= 36 ? "#F59E0B"
      : "#ef4444";

    // Format answers for display
    const answerRows = Object.entries(answers || {})
      .map(([key, val]: [string, any]) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #1E2D47;color:#8892A4;font-size:13px;text-transform:capitalize;">${key.replace(/_/g, " ")}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #1E2D47;color:#DCE3EF;font-size:13px;">${val.label} <span style="color:#4A5568;font-size:11px;">(${val.pts}pts)</span></td>
        </tr>`
      ).join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#070B14;font-family:Inter,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">

    <!-- Header -->
    <div style="margin-bottom:32px;">
      <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:8px;">
        <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="20" width="32" height="8" rx="2" fill="#4B7FFF"/>
          <rect x="0" y="11" width="22" height="8" rx="2" fill="#4B7FFF" opacity="0.72"/>
          <rect x="0" y="2"  width="13" height="8" rx="2" fill="#4B7FFF" opacity="0.44"/>
        </svg>
        <span style="font-weight:700;color:#DCE3EF;font-size:16px;">Groundwork <span style="color:#4B7FFF;">AI</span></span>
      </div>
      <p style="color:#4A5568;font-size:13px;margin:0;">Quiz lead notification</p>
    </div>

    <!-- Score card -->
    <div style="background:#0C1525;border:1px solid #1E2D47;border-radius:16px;padding:24px;margin-bottom:20px;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
        <div>
          <p style="color:#8892A4;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 6px;">New Lead</p>
          <h2 style="color:#DCE3EF;font-size:22px;font-weight:800;margin:0;">${name || "Anonymous"}</h2>
          ${company_name ? `<p style="color:#8892A4;font-size:14px;margin:4px 0 0;">${company_name}</p>` : ""}
          <a href="mailto:${email}" style="color:#4B7FFF;font-size:14px;text-decoration:none;">${email}</a>
        </div>
        <div style="text-align:center;background:#070B14;border:1px solid #1E2D47;border-radius:12px;padding:14px 20px;">
          <div style="font-size:36px;font-weight:900;color:${tierColor};line-height:1;">${score}</div>
          <div style="color:#4A5568;font-size:12px;font-weight:600;">/100</div>
          <div style="color:${tierColor};font-size:11px;font-weight:700;margin-top:4px;text-transform:uppercase;letter-spacing:0.05em;">${tier}</div>
        </div>
      </div>

      <!-- Quick actions -->
      <a href="https://calendly.com/hayden-enloe/15min" 
         style="display:inline-block;background:#4B7FFF;color:white;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;margin-right:10px;">
        Book a Call →
      </a>
      <a href="mailto:${email}?subject=Your Groundwork AI Readiness Score&body=Hi ${name || 'there'},%0A%0AThanks for taking the AI Readiness Quiz. Your score was ${score}/100 — ${tier}.%0A%0AI'd love to walk you through what this means for your business.%0A%0A— Hayden"
         style="display:inline-block;border:1px solid #1E2D47;color:#8892A4;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
        Reply by Email
      </a>
    </div>

    <!-- Answers table -->
    <div style="background:#0C1525;border:1px solid #1E2D47;border-radius:16px;overflow:hidden;margin-bottom:20px;">
      <div style="padding:16px 20px;border-bottom:1px solid #1E2D47;">
        <p style="color:#DCE3EF;font-weight:700;font-size:14px;margin:0;">Quiz Answers</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${answerRows}
      </table>
    </div>

    <!-- View in Supabase -->
    <div style="text-align:center;">
      <a href="https://supabase.com/dashboard/project/udwntkhjthmekpwqseqx/editor"
         style="color:#4A5568;font-size:12px;text-decoration:none;">
        View all leads in Supabase →
      </a>
    </div>

  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [NOTIFY_EMAIL],
        subject: `🎯 New quiz lead: ${name || email} — ${score}/100 (${tier})`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
