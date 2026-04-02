import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CalEmbed from '@/components/CalEmbed'

export default function Home() {
  return (
    <>
      <Nav />

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] mb-8" style={{ color: '#DCE3EF' }}>
            Build the AI Layer<br className="hidden md:block" />
            <span className="grad-text">Your Business Is Missing.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed mb-12" style={{ color: '#8892A4' }}>
            Groundwork AI helps B2B companies identify, build, and deploy AI systems that
            multiply operational output, not prototypes that never ship.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#quiz"
              className="w-full sm:w-auto text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
            >
              Take the Free Readiness Quiz →
            </a>
            <a
              href="#audit"
              className="w-full sm:w-auto border font-semibold text-base px-8 py-4 rounded-xl transition-colors"
              style={{ borderColor: '#1E2D47', background: 'rgba(12,21,37,0.6)', color: '#DCE3EF' }}
            >
              Book an AI Audit ($2,500)
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm" style={{ color: '#4A5568' }}>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#4B7FFF" strokeWidth="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Production systems, not slide decks</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#4B7FFF" strokeWidth="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Transparent, flat-fee pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM ========== */}
      <section className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>The problem</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Most AI initiatives die between<br className="hidden md:block" /> pilot and production.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#8892A4' }}>Sound familiar?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { emoji: '💸', title: 'The subscription graveyard', body: "You're paying for 8 AI tools that don't talk to each other. ChatGPT here, Notion AI there, some Zapier automations, but no central layer and no measurable ROI." },
              { emoji: '🚫', title: 'The pilot that never launched', body: "Your team ran a proof of concept. It worked in the demo. Then it sat in a repo for six months while everyone went back to their spreadsheets." },
              { emoji: '🤷', title: 'No one owns the AI layer', body: "Everybody's using AI their own way. There's no system, no standard, and no one accountable for making it actually work across the business." },
              { emoji: '⏳', title: "IT's backlog is 18 months deep", body: "You know where AI could help. Your ops team knows. But the engineering roadmap is full, and this keeps getting bumped in favor of product features." },
            ].map((card) => (
              <div key={card.title} className="border rounded-2xl p-6 card-hover" style={{ background: '#162035', borderColor: '#1E2D47' }}>
                <div className="text-2xl mb-3">{card.emoji}</div>
                <h3 className="font-bold mb-2" style={{ color: '#DCE3EF' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)' }}>
            <p className="font-semibold text-lg" style={{ color: '#DCE3EF' }}>
              We&apos;re not a big consulting firm with 40 slides and no execution.<br className="hidden md:block" />
              We&apos;re a specialized AI operations team that <em>builds the system</em> and hands it to your team running.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SERVICE LADDER ========== */}
      <section id="services" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>How it works</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Four tiers. One clear path.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#8892A4' }}>Start free. Every step delivers standalone value and makes the next one obvious.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tier 1 */}
            <div className="border rounded-2xl p-6 card-hover flex flex-col" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
              <div className="flex items-start justify-between mb-4">
                <span className="font-bold text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}>TIER 1</span>
                <span className="text-sm font-medium" style={{ color: '#8892A4' }}>Free</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>AI Readiness Quiz</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>5-minute assessment that scores your AI readiness across 10 dimensions and delivers a personalized roadmap.</p>
              <div className="mt-5 pt-5 border-t text-xs space-y-1.5" style={{ borderColor: '#1E2D47', color: '#4A5568' }}>
                {['10 qualification questions','Scored 0–100 with tiers','Personalized recommendations','CTA to book paid audit'].map(item => (
                  <div key={item} className="flex items-center gap-2"><span style={{ color: '#4B7FFF' }}>→</span> {item}</div>
                ))}
              </div>
              <a href="#quiz" className="mt-5 block text-center font-semibold text-sm py-2.5 rounded-lg transition-colors border" style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}>
                Take the Quiz →
              </a>
            </div>

            {/* Tier 2 */}
            <div className="border rounded-2xl p-6 card-hover flex flex-col relative overflow-hidden" style={{ background: '#0C1525', borderColor: 'rgba(75,127,255,0.3)' }}>
              <div className="absolute top-0 right-0 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-widest" style={{ background: '#4B7FFF' }}>MOST START HERE</div>
              <div className="flex items-start justify-between mb-4 mt-2">
                <span className="font-bold text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}>TIER 2</span>
                <span className="font-bold" style={{ color: '#DCE3EF' }}>$2,500</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>AI Operations Audit</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>A 3-week structured engagement: intake questionnaire, 4–6 stakeholder discovery sessions, full opportunity analysis, and a prioritized implementation roadmap with live walkthrough.</p>
              <div className="mt-5 pt-5 border-t text-xs space-y-1.5" style={{ borderColor: '#1E2D47', color: '#4A5568' }}>
                {['Intake questionnaire','4–6 discovery sessions','Full opportunity analysis','8-page prioritized roadmap','Live walkthrough session'].map(item => (
                  <div key={item} className="flex items-center gap-2"><span style={{ color: '#4B7FFF' }}>→</span> {item}</div>
                ))}
              </div>
              <a href="#audit" className="mt-5 block text-center text-white font-semibold text-sm py-2.5 rounded-lg transition-colors" style={{ background: '#4B7FFF' }}>
                Book an Audit →
              </a>
            </div>

            {/* Tier 3 */}
            <div className="border rounded-2xl p-6 card-hover flex flex-col" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
              <div className="flex items-start justify-between mb-4">
                <span className="font-bold text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}>TIER 3</span>
                <span className="text-sm font-medium" style={{ color: '#8892A4' }}>$15K–$75K</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>Implementation</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>We build the AI systems identified in your audit: production-grade, handed off working and integrated into your existing stack.</p>
              <div className="mt-5 pt-5 border-t text-xs space-y-1.5" style={{ borderColor: '#1E2D47', color: '#4A5568' }}>
                {['OpenClaw business deployment','Voice AI & call automation','Document processing','Custom AI agents','RAG knowledge systems','Workflow automation'].map(item => (
                  <div key={item} className="flex items-center gap-2"><span style={{ color: '#4B7FFF' }}>→</span> {item}</div>
                ))}
              </div>
              <a href="#capabilities" className="mt-5 block text-center font-semibold text-sm py-2.5 rounded-lg transition-colors border" style={{ borderColor: '#1E2D47', color: '#8892A4' }}>
                See What We Build →
              </a>
            </div>

            {/* Tier 4 */}
            <div className="border rounded-2xl p-6 card-hover flex flex-col" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
              <div className="flex items-start justify-between mb-4">
                <span className="font-bold text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}>TIER 4</span>
                <span className="text-sm font-medium" style={{ color: '#8892A4' }}>$1.5K–$5K/mo</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>Ongoing Retainer</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>Monthly partnership for system maintenance, monitoring, iteration, and support as your operations scale.</p>
              <div className="mt-5 pt-5 border-t text-xs space-y-1.5" style={{ borderColor: '#1E2D47', color: '#4A5568' }}>
                {['System monitoring & alerts','Monthly iteration sprints','Priority support SLA','Quarterly strategy review'].map(item => (
                  <div key={item} className="flex items-center gap-2"><span style={{ color: '#4B7FFF' }}>→</span> {item}</div>
                ))}
              </div>
              <a href="#audit" className="mt-5 block text-center font-semibold text-sm py-2.5 rounded-lg transition-colors border" style={{ borderColor: '#1E2D47', color: '#8892A4' }}>
                Ask About Retainers →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CAPABILITIES ========== */}
      <section id="capabilities" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>What we build</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Common things we build out.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#8892A4' }}>We pick the right tool for the job, not the trendy one.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <path d="M7 8s0-2 3-2 3 2 3 2v.5a3 3 0 01-3 3 3 3 0 01-3-3V8z" stroke="#4B7FFF" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M10 13.5V16" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Voice AI',
                body: 'Inbound and outbound call automation that qualifies leads, handles FAQs, books appointments, and escalates intelligently to humans.',
                stack: 'Vapi · Claude API · Twilio',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="2" width="14" height="16" rx="2" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <path d="M7 7h6M7 10h6M7 13h4" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Document Processing',
                body: 'Auto-extract, classify, and route contracts, invoices, intake forms, and reports, eliminating manual data entry at scale.',
                stack: 'Claude API · n8n · Airtable',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <path d="M7 10l2 2 4-4" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Custom AI Agents',
                body: 'Purpose-built agents that take actions, not just answers: CRM updates, email drafts, ticket routing, internal approvals, and more.',
                stack: 'Claude API · LangChain · n8n',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <ellipse cx="10" cy="7" rx="7" ry="4" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <path d="M3 7v6c0 2.2 3.1 4 7 4s7-1.8 7-4V7" stroke="#4B7FFF" strokeWidth="1.5"/>
                  </svg>
                ),
                title: 'RAG Knowledge Systems',
                body: 'Searchable AI over your internal docs, SOPs, support history, and knowledge base, so your team and customers always find the right answer.',
                stack: 'pgvector · Claude API · Supabase',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="5" width="5" height="4" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <rect x="13" y="5" width="5" height="4" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <rect x="7.5" y="11" width="5" height="4" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <path d="M7 7h1M12 7h1M10 11V9M7 9H13" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Workflow Automation',
                body: 'Connect your entire stack and eliminate the repetitive work between tools, from CRM handoffs to onboarding sequences to reporting pipelines.',
                stack: 'n8n · Make.com · Zapier',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#4B7FFF" strokeWidth="1.5"/>
                  </svg>
                ),
                title: 'OpenClaw Deployment',
                body: "We install, configure, and verticalize OpenClaw for your organization: a 24/7 AI assistant your team can message via Slack, WhatsApp, Telegram, or Discord, with custom skills built for your workflows.",
                stack: 'OpenClaw · Claude API · n8n',
              },
            ].map((cap) => (
              <div key={cap.title} className="border rounded-2xl p-7 card-hover" style={{ background: '#162035', borderColor: '#1E2D47' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(75,127,255,0.1)' }}>
                  {cap.icon}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>{cap.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8892A4' }}>{cap.body}</p>
                <div className="text-xs font-mono px-3 py-2 rounded-lg" style={{ background: '#070B14', color: '#4A5568' }}>{cap.stack}</div>
              </div>
            ))}
          </div>

          {/* Not sure CTA */}
          <div className="mt-8 flex justify-center">
            <div className="border rounded-2xl p-8 flex flex-col items-center text-center max-w-md w-full card-hover" style={{ background: '#162035', borderColor: 'rgba(75,127,255,0.3)' }}>
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>Not sure what you need?</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8892A4' }}>Take the free readiness quiz. We&apos;ll tell you exactly where AI will have the highest ROI in your business.</p>
              <a href="#quiz" className="border font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors" style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}>
                Take the Quiz →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHO IT'S FOR + PROCESS ========== */}
      <section id="process" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Who it's for */}
            <div>
              <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>Who this is for</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6" style={{ color: '#DCE3EF' }}>
                Built for B2B software companies that need it built, not advised.
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: '#8892A4' }}>
                You have a product, a team, operational bottlenecks, and a few AI subscriptions that aren&apos;t talking to each other. You need someone who ships.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'B2B SaaS or software company, 15–300 employees',
                  'Real operational bottlenecks eating hours every week',
                  'Budget for operations tooling ($10K–$200K/yr)',
                  'Leadership ready to move from evaluation to execution',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(75,127,255,0.2)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm" style={{ color: '#DCE3EF' }}>{item}</p>
                  </div>
                ))}
              </div>

              <div className="border rounded-xl p-4 text-sm" style={{ background: '#162035', borderColor: '#1E2D47', color: '#8892A4' }}>
                <strong style={{ color: '#4A5568' }}>Not a fit:</strong> Enterprise companies that need a 12-month SOW, or solo founders who need a Zapier tutorial. We work best with operators ready to build.
              </div>
            </div>

            {/* Right: 3-step process */}
            <div className="space-y-4">
              <p className="font-semibold text-sm uppercase tracking-widest mb-6" style={{ color: '#4B7FFF' }}>The process</p>
              {[
                { n: '1', title: 'Assess', body: "Start with the free quiz or a $2,500 AI Operations Audit. We map your workflows, identify the highest-ROI opportunities, and quantify the cost of inaction." },
                { n: '2', title: 'Build', body: "We build the implementation from the audit roadmap. Production system, integrated into your stack, your team trained to use it. Delivered in 4–12 weeks." },
                { n: '3', title: 'Run', body: "Optional monthly retainer to maintain, monitor, and iterate. As your business grows, the AI layer grows with it, no ripping and replacing." },
              ].map(step => (
                <div key={step.n} className="flex gap-5 border rounded-2xl p-6 card-hover" style={{ background: '#0C1525', borderColor: '#1E2D47' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-white text-lg" style={{ background: '#4B7FFF' }}>{step.n}</div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#DCE3EF' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUIZ CTA ========== */}
      <section id="quiz" className="py-28 md:py-36 relative overflow-hidden" style={{ background: '#0C1525' }}>
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-8" style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}>
            Free • 5 Minutes • Instant Results
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
            Find out where AI will multiply your operations.
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#8892A4' }}>
            Answer 10 questions. Get a personalized AI readiness score, a breakdown of your highest-impact opportunities, and a clear next step.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="/quiz"
              className="w-full sm:w-auto text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
            >
              Take the Quiz. It&apos;s Free →
            </a>
          </div>

          <p className="text-sm" style={{ color: '#4A5568' }}>
            Rather skip the quiz?{' '}
            <a href="#audit" className="font-medium hover:underline" style={{ color: '#4B7FFF' }}>Book an AI Audit directly →</a>
          </p>
        </div>
      </section>

      {/* ========== AUDIT CTA ========== */}
      <section id="audit" className="py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-8">
          <div className="border rounded-3xl p-10 md:p-14 text-center relative overflow-hidden" style={{ background: '#0C1525', borderColor: 'rgba(75,127,255,0.2)' }}>
            <div className="absolute inset-0 hero-glow pointer-events-none opacity-60" />
            <div className="relative">
              <p className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>Ready to get started?</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>Book your AI Operations Audit</h2>
              <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#8892A4' }}>
                A 3-week structured engagement: intake questionnaire, 4–6 stakeholder discovery sessions across your key business functions, a full opportunity analysis, and an 8-page roadmap with live walkthrough. Flat fee: $2,500.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-sm">
                {[
                  { title: 'Discovery Sessions', desc: '4–6 interviews across leadership, product, CS, and sales' },
                  { title: '8-Page Roadmap', desc: 'Workflows mapped, ROI quantified, priorities ranked' },
                  { title: 'Live Walkthrough', desc: 'We present the roadmap and answer every question' },
                ].map(item => (
                  <div key={item.title} className="rounded-xl p-4" style={{ background: '#162035' }}>
                    <div className="font-bold mb-1" style={{ color: '#DCE3EF' }}>{item.title}</div>
                    <div style={{ color: '#8892A4' }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden">
                <CalEmbed />
              </div>
              <p className="text-sm mt-4" style={{ color: '#4A5568' }}>Flat fee $2,500. Typically scheduled within 5 business days.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
