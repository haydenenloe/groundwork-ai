'use client'

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Option { label: string; pts: number }
interface Question { id: string; category: string; text: string; hint?: { label: string; href: string }; options: Option[] }
interface Tier { range: [number, number]; title: string; emoji: string; desc: string; ctaTitle: string; ctaDesc: string; ctaBtn: string; ctaHref: string; color: string }
interface Dimension { key: string; label: string }
interface Insight { icon: string; title: string; body: string }

// ─── DATA ────────────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 'company_size', category: 'Company Profile',
    text: 'How many full-time employees does your company have?',
    options: [
      { label: '1–10', pts: 2 },
      { label: '11–30', pts: 6 },
      { label: '31–100', pts: 9 },
      { label: '101–300', pts: 10 },
      { label: '300+', pts: 7 },
    ],
  },
  {
    id: 'ai_usage', category: 'Current AI Maturity',
    text: "How would you describe your team's current use of AI?",
    options: [
      { label: "We don't use AI tools", pts: 2 },
      { label: 'A few people use ChatGPT personally', pts: 5 },
      { label: "We have company AI subscriptions but no real strategy", pts: 7 },
      { label: "We have some automations running but it's fragmented", pts: 9 },
      { label: 'AI is integrated into several core workflows', pts: 10 },
    ],
  },
  {
    id: 'manual_burden', category: 'Operational Pain',
    text: 'How many hours per week does your team spend on repetitive manual tasks?',
    hint: { label: 'Not sure? See examples and how to estimate →', href: 'https://www.notion.so/How-to-Estimate-Hours-Spent-on-Repetitive-Tasks-329e2d28d80f81478fbddfefe6a92635' },
    options: [
      { label: 'Less than 5 hours', pts: 3 },
      { label: '5–15 hours', pts: 7 },
      { label: '15–30 hours', pts: 9 },
      { label: "More than 30 hours. It's a real problem.", pts: 10 },
    ],
  },
  {
    id: 'tech_capability', category: 'Technical Readiness',
    text: "What's your access to technical resources?",
    options: [
      { label: 'No engineering or dev resources at all', pts: 5 },
      { label: 'Some technical staff, but no AI/automation experience', pts: 7 },
      { label: "We have engineers, but their roadmap is full", pts: 9 },
      { label: 'Technical team available with some capacity', pts: 8 },
    ],
  },
  {
    id: 'bottleneck', category: 'Workflow Analysis',
    text: 'Which area causes the most operational friction in your business right now?',
    options: [
      { label: 'Customer support / ticket handling', pts: 10 },
      { label: 'Sales outreach / lead follow-up', pts: 10 },
      { label: 'Document processing / manual data entry', pts: 10 },
      { label: 'Onboarding (customers or employees)', pts: 10 },
      { label: 'Reporting, analytics, or knowledge sharing', pts: 10 },
    ],
  },
  {
    id: 'previous_attempts', category: 'AI History',
    text: 'Have you previously attempted any AI or automation projects?',
    options: [
      { label: 'Never tried', pts: 4 },
      { label: 'Researched it but never moved forward', pts: 6 },
      { label: "Started a project that stalled or didn't ship", pts: 9 },
      { label: 'Have some running but want to do more', pts: 10 },
      { label: 'Multiple successful implementations already', pts: 8 },
    ],
  },
  {
    id: 'ownership', category: 'Internal Buy-in',
    text: 'Who would champion an AI initiative at your company?',
    options: [
      { label: 'No clear owner right now', pts: 3 },
      { label: "Just me. I'd own it personally.", pts: 8 },
      { label: "We have an ops or technology lead who'd drive it", pts: 10 },
      { label: 'C-suite is already asking for it', pts: 10 },
    ],
  },
  {
    id: 'unstructured_data', category: 'Data Landscape',
    text: 'How often does your team process unstructured data: emails, PDFs, forms, documents?',
    options: [
      { label: 'Rarely. Most of our data is structured.', pts: 4 },
      { label: "Weekly. It comes up but isn't a daily problem.", pts: 7 },
      { label: "Daily. It's a consistent part of operations.", pts: 9 },
      { label: "Constantly. It's one of our biggest bottlenecks.", pts: 10 },
    ],
  },
  {
    id: 'budget', category: 'Investment Capacity',
    text: "What's your approximate annual budget for operational tools and software?",
    options: [
      { label: 'Under $10K/year', pts: 3 },
      { label: '$10K–$50K/year', pts: 7 },
      { label: '$50K–$200K/year', pts: 10 },
      { label: 'Over $200K/year', pts: 8 },
    ],
  },
  {
    id: 'timeline', category: 'Urgency',
    text: 'When are you looking to make progress on AI operations?',
    options: [
      { label: 'Just exploring, no timeline yet', pts: 3 },
      { label: 'Next 6–12 months', pts: 6 },
      { label: 'Next 1–3 months', pts: 9 },
      { label: "We needed this yesterday. It's urgent.", pts: 10 },
    ],
  },
]

const tiers: Tier[] = [
  {
    range: [0, 35], title: 'Laying the Foundation', emoji: '🧱',
    desc: "You're in the early stages of your AI journey. The good news: getting started is simpler than most expect. The right first move is identifying one high-friction workflow and building a focused proof of concept around it.",
    ctaTitle: 'Not sure where to start?',
    ctaDesc: 'Our AI Operations Audit maps your workflows and identifies the single highest-ROI opportunity to tackle first. We\'ll give you a concrete roadmap, not a pile of theory.',
    ctaBtn: 'Book an AI Audit ($2,500)', ctaHref: '/#audit', color: '#F59E0B',
  },
  {
    range: [36, 58], title: 'Building Readiness', emoji: '⚙️',
    desc: "You have the right conditions taking shape: real pain points, some internal buy-in, and a sense of what needs to change. A few gaps to close before full implementation makes sense, but you're closer than you think.",
    ctaTitle: 'Ready to identify your best opportunities?',
    ctaDesc: 'An AI Operations Audit will map your 2–3 highest-value workflows, quantify the cost of inaction, and give you a clear 30/60/90-day roadmap.',
    ctaBtn: 'Book an AI Audit ($2,500)', ctaHref: '/#audit', color: '#4B7FFF',
  },
  {
    range: [59, 79], title: 'AI-Ready', emoji: '🚀',
    desc: "Strong foundation. You have real pain, internal alignment, and the capacity to act. You're at the point where a focused audit translates directly into a implementation roadmap and deliver measurable ROI within 90 days.",
    ctaTitle: "You're ready. Let's map the build.",
    ctaDesc: "Book an AI Operations Audit. We'll turn your highest-friction workflows into a production implementation plan with timelines and cost estimates.",
    ctaBtn: 'Book an AI Audit ($2,500)', ctaHref: '/#audit', color: '#4B7FFF',
  },
  {
    range: [80, 100], title: 'AI-First', emoji: '⚡',
    desc: "You're already operating with an AI mindset. The gap isn't vision; it's execution bandwidth. You need a specialist who can move fast, build to production standards, and hand off systems that your team actually uses.",
    ctaTitle: "Skip the theory. Let's build.",
    ctaDesc: "Book a 15-minute call and we'll scope your first implementation directly. You know what you need. Let's talk specifics.",
    ctaBtn: "Book a Call. Let's Talk.", ctaHref: '/#audit', color: '#4B7FFF',
  },
]

const dimensions: Dimension[] = [
  { key: 'ai_usage', label: 'AI Maturity' },
  { key: 'manual_burden', label: 'Operational Pain' },
  { key: 'ownership', label: 'Internal Alignment' },
  { key: 'tech_capability', label: 'Technical Readiness' },
  { key: 'budget', label: 'Investment Capacity' },
  { key: 'timeline', label: 'Urgency' },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function calculateScore(answers: Record<string, Option>): number {
  const maxPts = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.pts)), 0)
  const earned = Object.values(answers).reduce((sum, a) => sum + a.pts, 0)
  return Math.round((earned / maxPts) * 100)
}

function getTier(score: number): Tier {
  return tiers.find(t => score >= t.range[0] && score <= t.range[1]) || tiers[tiers.length - 1]
}

function generateInsights(score: number, answers: Record<string, Option>): Insight[] {
  const ins: Insight[] = []

  const bottleneck = answers['bottleneck']
  if (bottleneck) {
    const map: Record<string, Insight> = {
      'Customer support / ticket handling': { icon: '🎧', title: 'Your biggest opportunity: Support AI', body: 'AI ticket triage and deflection typically reduces support volume by 30–60% in B2B SaaS companies. This is one of the fastest-ROI implementations we do.' },
      'Sales outreach / lead follow-up': { icon: '📈', title: 'Your biggest opportunity: Sales Automation', body: 'Automated lead qualification, follow-up sequences, and CRM hygiene can give your sales team back 5–10 hours per week per rep.' },
      'Document processing / manual data entry': { icon: '📄', title: 'Your biggest opportunity: Document AI', body: "If your team is manually processing PDFs, contracts, or forms, that's one of the highest-ROI areas to automate. We've seen 80%+ time reduction in document workflows." },
      'Onboarding (customers or employees)': { icon: '🤝', title: 'Your biggest opportunity: Onboarding Automation', body: 'AI-powered onboarding workflows reduce time-to-value for new customers and cut onboarding costs significantly. Strong fit for your profile.' },
      'Reporting, analytics, or knowledge sharing': { icon: '📊', title: 'Your biggest opportunity: Knowledge Systems', body: 'A RAG knowledge system or automated reporting pipeline could save your team hours every week in manual research and data compilation.' },
    }
    if (map[bottleneck.label]) ins.push(map[bottleneck.label])
  }

  const prev = answers['previous_attempts']
  if (prev?.label.includes('stalled')) {
    ins.push({ icon: '🔄', title: "You've been here before", body: "Projects that stall usually do so for one of three reasons: unclear ownership, underestimated scope, or starting with the wrong use case. An audit fixes all three." })
  }

  const timeline = answers['timeline']
  if (timeline?.label.includes('yesterday')) {
    ins.push({ icon: '⚡', title: "High urgency. You're ready to move.", body: "Your urgency is a signal that there's real cost being incurred by the status quo. That's the best environment for a fast, high-ROI implementation." })
  }

  const tech = answers['tech_capability']
  if (tech?.label.includes('No engineering')) {
    ins.push({ icon: '🛠️', title: "No in-house engineers? Not a blocker.", body: "Most of our clients don't have AI engineering on staff. We build, deploy, and hand off a working system. Your team just needs to use it." })
  }

  if (score >= 65) {
    ins.push({ icon: '🤖', title: 'You might be a strong OpenClaw candidate', body: 'Given your profile, a company-wide OpenClaw deployment could give your team a 24/7 AI assistant accessible via Slack or WhatsApp, built around your specific workflows.' })
  }

  return ins.slice(0, 4)
}

async function saveToSupabase(data: { name: string; email: string; company: string; score: number; tier: string; answers: Record<string, Option> }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return

  const payload = {
    name: data.name,
    email: data.email,
    company_name: data.company,
    score: data.score,
    tier: data.tier,
    answers: data.answers,
    created_at: new Date().toISOString(),
  }

  const res = await fetch(`${url}/rest/v1/quiz_leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(`Supabase error: ${res.status}`)
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

type Screen = 'intro' | 'question' | 'capture' | 'results'

export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Option>>({})
  const [captureData, setCaptureData] = useState({ name: '', email: '', company: '' })
  const [score, setScore] = useState(0)
  const [tier, setTier] = useState<Tier>(tiers[0])
  const [displayedScore, setDisplayedScore] = useState(0)
  const [ringOffset, setRingOffset] = useState(427)
  const [submitting, setSubmitting] = useState(false)

  // Animate score ring + number when results show
  useEffect(() => {
    if (screen !== 'results') return
    const circumference = 427
    const offset = circumference - (score / 100) * circumference
    const t = setTimeout(() => {
      setRingOffset(offset)
    }, 100)

    let current = 0
    const interval = setInterval(() => {
      current += 2
      if (current >= score) { current = score; clearInterval(interval) }
      setDisplayedScore(current)
    }, 20)

    return () => { clearTimeout(t); clearInterval(interval) }
  }, [screen, score])

  function startQuiz() {
    setCurrentQ(0)
    setAnswers({})
    setScreen('question')
    window.scrollTo(0, 0)
  }

  function selectOption(opt: Option) {
    const q = questions[currentQ]
    setAnswers(prev => ({ ...prev, [q.id]: opt }))
  }

  function goNext() {
    if (!answers[questions[currentQ].id]) return
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1)
      window.scrollTo(0, 0)
    } else {
      setScreen('capture')
      window.scrollTo(0, 0)
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setCurrentQ(q => q - 1)
      window.scrollTo(0, 0)
    }
  }

  async function submitCapture() {
    if (!captureData.email) return
    setSubmitting(true)

    const s = calculateScore(answers)
    const t = getTier(s)
    setScore(s)
    setTier(t)

    try {
      await saveToSupabase({ ...captureData, score: s, tier: t.title, answers })
    } catch (e) {
      console.warn('Supabase save failed:', e)
    }

    setScreen('results')
    setSubmitting(false)
    window.scrollTo(0, 0)
  }

  function downloadResults() {
    const t = getTier(score)
    const name = captureData.name || 'Your'

    const dimRows = dimensions.map(dim => {
      const q = questions.find(q => q.id === dim.key)
      const ans = answers[dim.key]
      if (!q || !ans) return ''
      const maxPts = Math.max(...q.options.map(o => o.pts))
      const pct = Math.round((ans.pts / maxPts) * 100)
      const color = pct >= 80 ? '#2563eb' : pct >= 50 ? '#d97706' : '#dc2626'
      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
            <span style="font-weight:600;">${dim.label}</span><span style="color:#718096;">${pct}%</span>
          </div>
          <div style="height:8px;background:#e2e8f0;border-radius:999px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${color};border-radius:999px;"></div>
          </div>
          <div style="font-size:12px;color:#718096;margin-top:3px;">${ans.label}</div>
        </div>`
    }).join('')

    const insights = generateInsights(score, answers)
    const insightRows = insights.map(ins => `
      <div style="display:flex;gap:12px;padding:12px;background:#f8f9fa;border-radius:8px;margin-bottom:8px;">
        <span style="font-size:20px;flex-shrink:0;">${ins.icon}</span>
        <div><div style="font-weight:600;font-size:13px;margin-bottom:2px;">${ins.title}</div>
        <div style="font-size:12px;color:#4a5568;line-height:1.5;">${ins.body}</div></div>
      </div>`).join('')

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <title>AI Readiness Results | ${name}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 680px; margin: 40px auto; padding: 0 24px; color: #0a0a0a; }
        h2 { font-size: 18px; font-weight: 700; margin: 32px 0 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .score-box { text-align:center; padding: 32px; background: #eff6ff; border-radius: 12px; margin-bottom: 24px; }
        .score-num { font-size: 72px; font-weight: 900; color: #2563eb; line-height: 1; }
        .tier { font-size: 22px; font-weight: 800; margin: 8px 0 4px; }
        .tier-desc { font-size: 14px; color: #4a5568; line-height: 1.6; max-width: 480px; margin: 0 auto; }
        .cta-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; margin-top: 24px; }
        .footer { margin-top: 40px; font-size: 12px; color: #a0aec0; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; }
      </style></head><body>
      <div style="margin-bottom:24px;">
        <div style="font-size:13px;color:#718096;">AI Readiness Assessment Results · ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        ${name ? `<div style="font-size:13px;color:#718096;">${name}${captureData.company ? ' · ' + captureData.company : ''}</div>` : ''}
      </div>
      <div class="score-box">
        <div class="score-num">${score}</div>
        <div style="font-size:13px;color:#718096;margin-bottom:8px;">/100</div>
        <div class="tier">${t.emoji} ${t.title}</div>
        <p class="tier-desc">${t.desc}</p>
      </div>
      <h2>Score Breakdown</h2>
      ${dimRows}
      <h2>Key Insights</h2>
      ${insightRows}
      <div class="cta-box">
        <div style="font-weight:800;font-size:16px;margin-bottom:6px;">${t.ctaTitle}</div>
        <p style="font-size:13px;color:#4a5568;margin:0 0 16px;line-height:1.6;">${t.ctaDesc}</p>
        <div style="font-size:13px;"><strong>Next step:</strong> <a href="${t.ctaHref}" style="color:#2563eb;">${t.ctaBtn}</a></div>
      </div>
      <div class="footer">Generated by Groundwork AI · groundwork-ai.dev</div>
    </body></html>`

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'groundwork-ai-readiness-results.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (screen !== 'question') return
      if (e.key === 'Enter' && answers[questions[currentQ].id]) goNext()
      if (e.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const q = questions[currentQ]
  const pct = Math.round(((currentQ + 1) / questions.length) * 100)

  return (
    <>
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md" style={{ background: 'rgba(7,11,20,0.8)', borderColor: '#1E2D47' }}>
        <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Logo size={22} />
            <span className="font-bold tracking-tight" style={{ color: '#DCE3EF' }}>
              Groundwork <span style={{ color: '#4B7FFF' }}>AI</span>
            </span>
          </a>
          <div className="text-sm" style={{ color: '#8892A4' }}>AI Readiness Quiz</div>
        </nav>
      </header>

      <main className="pt-14 min-h-screen flex flex-col grid-bg">

        {/* ── INTRO ── */}
        {screen === 'intro' && (
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="max-w-xl w-full text-center relative">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(75,127,255,0.15) 0%, transparent 65%)' }} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-8" style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}>
                  Free · 5 minutes · Instant results
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5" style={{ color: '#DCE3EF' }}>
                  How AI-ready is<br /><span className="grad-text">your business?</span>
                </h1>
                <p className="text-lg leading-relaxed mb-10" style={{ color: '#8892A4' }}>
                  10 questions. Get a personalized readiness score, your highest-ROI opportunities, and a clear recommended next step.
                </p>
                <div className="border rounded-2xl p-6 mb-8 text-left space-y-3" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
                  {[
                    'Scored across 10 readiness dimensions',
                    'Personalized recommendations based on your answers',
                    'No fluff. Specific, actionable output.',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm" style={{ color: '#DCE3EF' }}>
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center font-bold flex-shrink-0 text-xs" style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full text-white font-bold text-lg py-4 rounded-xl transition-colors"
                  style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
                >
                  Start the Quiz →
                </button>
                <p className="text-sm mt-4" style={{ color: '#4A5568' }}>Takes about 3–5 minutes. No commitment required.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── QUESTION ── */}
        {screen === 'question' && (
          <div className="flex-1 flex flex-col px-6 py-8">
            {/* Progress */}
            <div className="max-w-2xl mx-auto w-full mb-8">
              <div className="flex items-center justify-between text-sm mb-3" style={{ color: '#8892A4' }}>
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#162035' }}>
                <div className="progress-bar h-full rounded-full" style={{ width: `${pct}%`, background: '#4B7FFF' }} />
              </div>
            </div>

            {/* Question card */}
            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col slide-in" key={currentQ}>
              <div>
                <p className="font-semibold text-xs uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>{q.category}</p>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3" style={{ color: '#DCE3EF' }}>{q.text}</h2>
                {q.hint && (
                  <div className="mb-5">
                    <a href={q.hint.href} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ color: '#4B7FFF' }}>{q.hint.label}</a>
                  </div>
                )}
                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const selected = answers[q.id]?.label === opt.label
                    return (
                      <button
                        key={opt.label}
                        className={`option-btn w-full flex items-center gap-4 border rounded-xl px-5 py-4 text-left ${selected ? 'selected' : ''}`}
                        style={{ background: '#0C1525', borderColor: '#1E2D47' }}
                        onClick={() => selectOption(opt)}
                      >
                        <div className={`option-dot ${selected ? 'bg-blue border-blue' : ''}`} />
                        <span className="text-sm font-medium leading-tight" style={{ color: '#DCE3EF' }}>{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t" style={{ borderColor: '#1E2D47' }}>
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: '#8892A4', visibility: currentQ === 0 ? 'hidden' : 'visible' }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
                <button
                  onClick={goNext}
                  disabled={!answers[q.id]}
                  className="text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: '#4B7FFF' }}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CAPTURE ── */}
        {screen === 'capture' && (
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="max-w-lg w-full">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🎯</div>
                <h2 className="text-3xl font-black tracking-tight mb-3" style={{ color: '#DCE3EF' }}>Your results are ready.</h2>
                <p style={{ color: '#8892A4' }}>Enter your details to see your personalized AI readiness score and recommendations.</p>
              </div>
              <div className="border rounded-2xl p-8 space-y-4" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#DCE3EF' }}>Your name</label>
                  <input type="text" placeholder="Jane Smith" value={captureData.name} onChange={e => setCaptureData(d => ({ ...d, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#DCE3EF' }}>Work email</label>
                  <input type="email" placeholder="jane@company.com" value={captureData.email} onChange={e => setCaptureData(d => ({ ...d, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#DCE3EF' }}>Company name</label>
                  <input type="text" placeholder="Acme Corp" value={captureData.company} onChange={e => setCaptureData(d => ({ ...d, company: e.target.value }))} />
                </div>
                <button
                  onClick={submitCapture}
                  disabled={submitting || !captureData.email}
                  className="w-full text-white font-bold py-4 rounded-xl mt-2 transition-colors disabled:opacity-50"
                  style={{ background: '#4B7FFF' }}
                >
                  {submitting ? 'Calculating...' : 'See My Results →'}
                </button>
                <p className="text-xs text-center" style={{ color: '#4A5568' }}>No spam. We&apos;ll only reach out if it&apos;s relevant to your score.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {screen === 'results' && (
          <div className="flex-1 px-6 py-16">
            <div className="max-w-3xl mx-auto">

              {/* Score header */}
              <div className="text-center mb-12">
                <p className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>Your AI Readiness Score</p>

                {/* Score ring */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                    <circle cx="80" cy="80" r="68" fill="none" stroke="#162035" strokeWidth="12"/>
                    <circle
                      cx="80" cy="80" r="68" fill="none"
                      stroke={tier.color} strokeWidth="12"
                      strokeLinecap="round" strokeDasharray="427"
                      strokeDashoffset={ringOffset}
                      className="score-ring"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-5xl font-black" style={{ color: '#DCE3EF' }}>{displayedScore}</div>
                    <div className="text-sm" style={{ color: '#8892A4' }}>/100</div>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: '#DCE3EF' }}>{tier.emoji} {tier.title}</h2>
                <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#8892A4' }}>{tier.desc}</p>
              </div>

              {/* Score breakdown */}
              <div className="border rounded-2xl p-6 mb-8" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
                <h3 className="font-bold mb-5" style={{ color: '#DCE3EF' }}>Score Breakdown</h3>
                <div className="space-y-4">
                  {dimensions.map(dim => {
                    const dq = questions.find(q => q.id === dim.key)
                    const ans = answers[dim.key]
                    if (!dq || !ans) return null
                    const maxPts = Math.max(...dq.options.map(o => o.pts))
                    const dpct = Math.round((ans.pts / maxPts) * 100)
                    const barColor = dpct >= 80 ? '#4B7FFF' : dpct >= 50 ? '#F59E0B' : '#ef4444'
                    return (
                      <div key={dim.key}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium" style={{ color: '#DCE3EF' }}>{dim.label}</span>
                          <span style={{ color: '#8892A4' }}>{dpct}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#162035' }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${dpct}%`, background: barColor }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key insights */}
              <div className="mb-8">
                <h3 className="font-bold mb-4" style={{ color: '#DCE3EF' }}>Key Insights</h3>
                <div className="space-y-3">
                  {generateInsights(score, answers).map((ins, i) => (
                    <div key={i} className="flex items-start gap-3 border rounded-xl p-4" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
                      <span className="text-xl flex-shrink-0">{ins.icon}</span>
                      <div>
                        <div className="font-semibold text-sm mb-0.5" style={{ color: '#DCE3EF' }}>{ins.title}</div>
                        <div className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{ins.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)' }}>
                <h3 className="font-black text-2xl mb-3" style={{ color: '#DCE3EF' }}>{tier.ctaTitle}</h3>
                <p className="mb-6" style={{ color: '#8892A4' }}>{tier.ctaDesc}</p>
                <a
                  href={tier.ctaHref}
                  className="inline-block text-white font-bold px-10 py-4 rounded-xl transition-colors"
                  style={{ background: '#4B7FFF' }}
                >
                  {tier.ctaBtn}
                </a>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <a href="/" className="text-sm transition-colors hover:text-subtle" style={{ color: '#4A5568' }}>← Back to Groundwork AI</a>
                  <button
                    onClick={downloadResults}
                    className="text-sm transition-colors hover:text-subtle flex items-center gap-1.5"
                    style={{ color: '#4A5568' }}
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                      <path d="M8 1v9M4 6l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
