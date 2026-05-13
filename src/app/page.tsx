import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ApplyForm from '@/components/ApplyForm'
import {
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

export default function Home() {
  return (
    <>
      <Nav />

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8"
            style={{ color: '#DCE3EF' }}
          >
            Your business should be<br className="hidden md:block" />
            <span className="grad-text"> running on AI by now.</span>
          </h1>
          <p
            className="max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed mb-12"
            style={{ color: '#8892A4' }}
          >
            We find what your team does manually that should be automated, build the systems that handle it, train your people to use them, and run a monthly cadence to keep it all improving. Your AI operations layer, installed and running.
          </p>
          <a
            href="#book"
            className="inline-block text-white font-bold text-base px-10 py-4 rounded-xl transition-colors mb-10"
            style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
          >
            Book a Discovery Call
          </a>
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm" style={{ color: '#8892A4' }}>
            <span>First automation live within 30 days</span>
            <span className="opacity-40 hidden sm:inline">·</span>
            <span>Guaranteed to work or we keep building</span>
            <span className="opacity-40 hidden sm:inline">·</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ========== 2. OUTCOMES ========== */}
      <section id="outcomes" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>The results</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Here is what changes after 90 days.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
              Every engagement is measured against a baseline. These are real outcomes from the workflows we automate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                stat: '15 hrs/week',
                title: 'Reclaimed from invoice processing',
                example: 'A company avoiding a $55,000 bookkeeper hire automated invoice intake, GL coding, and expense categorization.',
              },
              {
                stat: '8 minutes',
                title: 'Average lead response time',
                example: 'Inbound leads that previously waited 36 hours now receive a personalized, qualified response automatically.',
              },
              {
                stat: '3 hrs/week',
                title: 'Post-meeting admin eliminated',
                example: 'Every recorded call produces action items, CRM updates, and follow-up drafts without anyone touching a keyboard.',
              },
              {
                stat: '4 hrs saved',
                title: 'Every Friday, on every report',
                example: 'Weekly financial and operations reports that previously took a full afternoon now generate and deliver themselves Monday morning.',
              },
              {
                stat: '20 minutes',
                title: 'Client onboarding, start to finish',
                example: 'Signing a contract now triggers the entire onboarding sequence automatically. What took 4 hours of manual coordination runs itself.',
              },
              {
                stat: 'Zero',
                title: 'Action items dropped after meetings',
                example: 'Every commitment made in a recorded meeting gets logged, assigned, and followed up on. Nothing falls through the cracks.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="border rounded-2xl p-8 flex flex-col gap-4 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <p className="font-black text-4xl tracking-tight" style={{ color: '#4B7FFF' }}>{card.stat}</p>
                <h3 className="font-bold text-base" style={{ color: '#DCE3EF' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{card.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ASSESSMENT (TOP) ========== */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>Not sure where to start</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5" style={{ color: '#DCE3EF' }}>
            Find out where AI will have the highest ROI in your business.
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#8892A4' }}>
            The free AI Readiness Assessment scores your operations across ten dimensions and tells you exactly where to focus first. Takes five minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
            <a
              href="/quiz"
              className="inline-block text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
            >
              Take the Free Assessment
            </a>
            <a
              href="#book"
              className="inline-block font-bold text-base px-8 py-4 rounded-xl border transition-colors"
              style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
            >
              Book a Discovery Call
            </a>
          </div>
          <p className="text-sm" style={{ color: '#4A5568' }}>Already know what you want to automate? Skip the assessment and book a call directly.</p>
        </div>
      </section>

      {/* ========== 3. HOW WE WORK ========== */}
      <section id="services" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>How we work</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Three ways to work with us.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
              Every engagement is different. Choose the path that matches where you are.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Card 1: The Audit */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-4 card-hover"
              style={{ background: '#162035', borderColor: '#1E2D47' }}
            >
              <h3 className="font-black text-xl" style={{ color: '#DCE3EF' }}>The Audit</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>
                You are not sure where AI fits in your business. We spend two weeks with your team, map your operations, and hand you a prioritized roadmap with ROI estimates for every opportunity we find.
              </p>
              <a
                href="#audit"
                className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: '#4B7FFF' }}
              >
                See what the audit delivers <ArrowRight size={14} />
              </a>
            </div>

            {/* Card 2: Monthly Retainer */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-4 card-hover"
              style={{ background: '#162035', borderColor: '#1E2D47' }}
            >
              <h3 className="font-black text-xl" style={{ color: '#DCE3EF' }}>Monthly Retainer</h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>
                You want an embedded AI operations team. New automations every month, maintenance, team training, and strategic advisory. One flat monthly fee. Cancel anytime.
              </p>
              <a
                href="#retainer"
                className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: '#4B7FFF' }}
              >
                See how the retainer works <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========== 4. THE AUDIT ========== */}
      <section id="audit" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>The audit</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Find exactly where AI fits in your business.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
              For companies that want to identify the right problem before they start building. Two weeks of structured discovery with a clear deliverable at the end.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left column: How it works */}
            <div>
              <h4 className="font-black text-lg mb-8" style={{ color: '#DCE3EF' }}>How it works</h4>
              <div className="flex flex-col gap-8">
                {[
                  {
                    num: '1',
                    body: 'We schedule two to four discovery conversations with key people on your team. Operations, finance, sales, whoever owns the workflows that take the most time.',
                  },
                  {
                    num: '2',
                    body: 'We listen for patterns. Where is time going? What breaks repeatedly? What does the team wish ran automatically? We are looking for the highest-leverage place to start.',
                  },
                  {
                    num: '3',
                    body: 'We synthesize everything. Every opportunity ranked by impact, effort, and ROI. The most important ones get full build specifications.',
                  },
                  {
                    num: '4',
                    body: 'We deliver your AI Operations Roadmap and walk through it live. You leave knowing exactly what to build, in what order, and what each one is worth.',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                      style={{ background: 'rgba(75,127,255,0.12)', color: '#4B7FFF' }}
                    >
                      {step.num}
                    </div>
                    <p className="text-sm leading-relaxed pt-1" style={{ color: '#8892A4' }}>{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: What you receive */}
            <div>
              <h4 className="font-black text-lg mb-8" style={{ color: '#DCE3EF' }}>What you receive</h4>
              <div
                className="border rounded-2xl p-8 mb-6"
                style={{ background: '#162035', borderColor: 'rgba(75,127,255,0.3)' }}
              >
                <div className="flex flex-col gap-3">
                  {[
                    'Full AI Operations Roadmap (written, not a slide deck)',
                    'Every opportunity ranked by impact and ROI',
                    'Build specifications for the top three initiatives',
                    'Cost and timeline estimates for each',
                    'A clear recommendation on where to start',
                    '60-minute live walkthrough session with Q&A',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm" style={{ color: '#DCE3EF' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>
                        <ArrowRight size={14} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                If you move forward to a build or retainer after the audit, the $2,500 applies toward your first month.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========== 5. THE RETAINER ========== */}
      <section id="retainer" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>The retainer</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Your AI operations, running every month.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
              An embedded team that builds, maintains, trains, and reports. Every month. No wondering what we are doing. No drift.
            </p>
          </div>

          {/* Four-week cadence cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                week: 'Week 1',
                title: 'Review',
                body: 'We audit what is running, review performance against baseline, and align on priorities for the month. You know exactly what is working and what comes next.',
              },
              {
                week: 'Week 2',
                title: 'Build',
                body: 'New automations built and deployed. Integrated into your existing tools. Tested before your team sees them.',
              },
              {
                week: 'Week 3',
                title: 'Train',
                body: 'Your team learns what is new. We confirm adoption, collect feedback, and make adjustments. AI that your people actually use.',
              },
              {
                week: 'Week 4',
                title: 'Report',
                body: 'Impact measured and delivered. Hours reclaimed, costs avoided, outcomes documented. Next month pre-planned.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border rounded-2xl p-7 flex flex-col gap-3 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4B7FFF' }}>{item.week}</p>
                <h3 className="font-black text-xl" style={{ color: '#DCE3EF' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div
            className="rounded-2xl p-8 text-center border mb-12"
            style={{ background: 'rgba(75,127,255,0.06)', borderColor: 'rgba(75,127,255,0.25)' }}
          >
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#DCE3EF' }}>
              Every month builds on the last. What starts as one automation becomes an operations layer. The systems compound.
            </p>
          </div>

          {/* Two-column grid: included / doesn't change */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <h4 className="font-black text-lg mb-6" style={{ color: '#DCE3EF' }}>What is included</h4>
              <div className="flex flex-col gap-3">
                {[
                  'Monthly build sprint (one to two new automations)',
                  'All maintenance and bug fixes',
                  'Monthly team training session',
                  'Strategy and advisory',
                  'Monthly impact report',
                  'Cancel anytime',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>
                      <ArrowRight size={14} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-lg mb-6" style={{ color: '#DCE3EF' }}>What does not change</h4>
              <div className="flex flex-col gap-3">
                {[
                  'Flat monthly fee, no surprise invoices',
                  'Same contact person every month',
                  'Every system we build, you own',
                  'If something does not work, we fix it',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>
                      <ArrowRight size={14} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== 6. PRICING ========== */}
      <section id="pricing" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>Pricing</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#DCE3EF' }}>
              Clear pricing. No surprises.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Card 1 — AI Operations Audit */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-5 card-hover"
              style={{ background: '#162035', borderColor: '#1E2D47' }}
            >
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                  style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}
                >
                  ONE-TIME
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl mb-2" style={{ color: '#DCE3EF' }}>AI Operations Audit</h3>
                <p className="text-sm" style={{ color: '#8892A4' }}>Priced based on company size</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                For teams that want to find the right problem before they build. Two weeks of discovery, a full prioritized roadmap with ROI estimates, and a live walkthrough session.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  '2-week discovery process',
                  '4 to 6 interviews across your team',
                  'Prioritized opportunity matrix',
                  'Full AI Operations Roadmap',
                  'Live walkthrough and Q&A',
                  'Audit cost applied toward retainer if you continue',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>
                      <ArrowRight size={13} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="#book"
                className="block text-center font-bold text-sm py-3 rounded-xl border transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
              >
                Book a Discovery Call
              </a>
            </div>

            {/* Card 2 — Monthly Retainer (highlighted) */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-5 card-hover relative"
              style={{ background: '#162035', borderColor: 'rgba(75,127,255,0.5)', boxShadow: '0 0 40px rgba(75,127,255,0.12)' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white whitespace-nowrap"
                  style={{ background: '#4B7FFF' }}
                >
                  Most Popular
                </span>
              </div>
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                  style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}
                >
                  ONGOING
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl mb-2" style={{ color: '#DCE3EF' }}>Monthly Retainer</h3>
                <p className="text-sm" style={{ color: '#8892A4' }}>Priced based on scope</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                Your embedded AI operations team. New builds, maintenance, team training, and strategic advisory, all included. The audit can be bundled into your first month.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  'Monthly build sprint included',
                  'All maintenance and support',
                  'Team training every month',
                  'Strategy and advisory',
                  'Full transformation reporting',
                  'Audit included in first month if needed',
                  'Cancel anytime',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>
                      <ArrowRight size={13} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="#book"
                className="block text-center text-white font-bold text-sm py-3 rounded-xl transition-colors"
                style={{ background: '#4B7FFF', boxShadow: '0 8px 20px rgba(75,127,255,0.25)' }}
              >
                Book a Discovery Call
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========== 7. WHY IT IS WORTH IT ========== */}
      <section id="why" className="py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>The math</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Compare it to the alternative.
            </h2>
            <p className="text-lg" style={{ color: '#8892A4' }}>
              Most clients hire for the work they want automated. Here is what that costs versus building the system that handles it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                role: 'Bookkeeper or Accounts Payable Coordinator',
                cost: '$50,000 per year',
                body: 'Invoice processing, expense categorization, financial reporting, and payment tracking. The automation handles all of it, around the clock, without turnover.',
              },
              {
                role: 'Operations Coordinator',
                cost: '$55,000 per year',
                body: 'Intake routing, onboarding sequences, follow-up scheduling, and cross-tool data entry. The workflow system does what the coordinator did, without the management overhead.',
              },
              {
                role: 'Data Analyst',
                cost: '$75,000 per year',
                body: 'Weekly reporting, KPI tracking, dashboard maintenance, and data formatting. The automation pulls, formats, and delivers the report every Monday morning without anyone touching it.',
              },
            ].map((card) => (
              <div
                key={card.role}
                className="border rounded-2xl p-7 flex flex-col gap-4 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8892A4' }}>Role</p>
                  <h3 className="font-bold text-base mb-3" style={{ color: '#DCE3EF' }}>{card.role}</h3>
                  <p className="font-black text-2xl" style={{ color: '#4B7FFF' }}>{card.cost}</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{card.body}</p>
              </div>
            ))}
          </div>
          {/* Green callout */}
          <div
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.25)' }}
          >
            <p className="text-base md:text-lg leading-relaxed text-center" style={{ color: '#DCE3EF' }}>
              The monthly retainer is{' '}
              <span className="font-black" style={{ color: '#22c55e' }}>$60,000 per year</span>.
              It covers your entire AI operations layer, not one role. And every system we build is guaranteed to work or we keep building until it does.
            </p>
          </div>
        </div>
      </section>

      {/* ========== ASSESSMENT (BOTTOM) ========== */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>Not sure where to start</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5" style={{ color: '#DCE3EF' }}>
            Find out where AI will have the highest ROI in your business.
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#8892A4' }}>
            The free AI Readiness Assessment scores your operations across ten dimensions and tells you exactly where to focus first. Takes five minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
            <a
              href="/quiz"
              className="inline-block text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
            >
              Take the Free Assessment
            </a>
            <a
              href="#book"
              className="inline-block font-bold text-base px-8 py-4 rounded-xl border transition-colors"
              style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
            >
              Book a Discovery Call
            </a>
          </div>
          <p className="text-sm" style={{ color: '#4A5568' }}>Already know what you want to automate? Skip the assessment and book a call directly.</p>
        </div>
      </section>

      {/* ========== 8. BOOK A CALL ========== */}
      <section id="book" className="py-28 md:py-36 relative overflow-hidden" style={{ background: '#0C1525' }}>
        <div className="relative max-w-3xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Book a free discovery call.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#8892A4' }}>
              30 minutes. We will tell you exactly what we would build for your business and what it would save you. No pitch. Just a diagnosis.
            </p>
          </div>
          <ApplyForm />
          <p className="text-center text-sm mt-6" style={{ color: '#4A5568' }}>
            Typically responds within one business day.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
