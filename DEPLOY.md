# Deploy Groundwork AI — Quick Instructions

## Option A: Vercel (Recommended — free, fast, custom domain)

1. **Login to Vercel CLI** (one-time):
   ```bash
   export PATH="/opt/homebrew/bin:/opt/homebrew/Cellar/node@22/22.22.0_1/bin:$PATH"
   vercel login
   ```
   Follow the browser prompt to authenticate.

2. **Deploy:**
   ```bash
   cd /Users/haydenenloe/.openclaw/workspace/groundwork-ai
   vercel --yes
   ```
   First deploy will ask a few setup questions — accept all defaults.

3. **Add custom domain** (after buying):
   ```bash
   vercel domains add getgroundwork.ai
   ```

## Option B: Netlify Drop (zero CLI required)

1. Go to https://app.netlify.com/drop
2. Drag the entire `/groundwork-ai/` folder onto the page
3. Done — you get a live URL instantly
4. Add custom domain in Netlify settings

## Recommended Domain

**`getgroundwork.ai`** — Available, clean, no hyphens, .ai TLD adds credibility

Buy at: https://www.namecheap.com or directly through Cloudflare Registrar (cheaper renewals)

Other available options (as of March 2026):
- `groundworkops.ai` — more descriptive
- `groundwork-ai.co` — hyphenated, less ideal

**Taken:** groundworkai.com (Cloudflare), groundworkai.co (GoDaddy), groundwork.ai, groundworkops.com

## Email Setup (after domain)

Set up `hello@getgroundwork.ai` via:
- **Cloudflare Email Routing** (free, forwards to Gmail) — easiest
- **Google Workspace** ($6/mo) — if you want full Gmail with your domain

Update the `mailto:` link in index.html once you have the domain.
