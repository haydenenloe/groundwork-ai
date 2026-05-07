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

      {/* ========== 3. MONTHLY OPERATING SYSTEM ========== */}
      <section id="how-it-works" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>How it works</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              A monthly cadence that runs whether<br className="hidden md:block" /> you think about it or not.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
              No ambiguity. No wondering what we are doing this month. Every client runs on the same four-week operating system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                week: 'Week 1',
                title: 'Review',
                body: 'We audit what is running, review performance against baseline, and align on priorities for the month. You know exactly what is working and what is next.',
              },
              {
                week: 'Week 2',
                title: 'Build',
                body: 'One or two new automations built and deployed. Integrated into your existing tools. Tested before your team sees it.',
              },
              {
                week: 'Week 3',
                title: 'Train',
                body: 'Your team learns the new system. We confirm adoption, gather feedback, and make adjustments. AI that your people actually use.',
              },
              {
                week: 'Week 4',
                title: 'Report',
                body: 'Impact measured and delivered. Hours reclaimed, costs avoided, and outcomes documented. Next month pre-planned so there is never a gap.',
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
            className="rounded-2xl p-8 text-center border max-w-3xl mx-auto"
            style={{ background: 'rgba(75,127,255,0.06)', borderColor: 'rgba(75,127,255,0.25)' }}
          >
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#DCE3EF' }}>
              This runs every month. The systems compound. What starts as one automation in month one becomes an operations layer by month six.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 4. THE 90-DAY ROADMAP ========== */}
      <section id="roadmap" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>The engagement</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              You will never wonder what comes next.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
              Within two weeks of starting, you have a prioritized 90-day roadmap. Every month after that is execution.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                step: '01',
                period: 'Week 1 to 2',
                title: 'Discovery',
                body: 'We assess your operations, map your workflows, and identify the six to twelve highest-ROI automation opportunities. Every initiative is ranked by impact, effort, and cost.',
              },
              {
                step: '02',
                period: 'Week 2',
                title: 'Roadmap Delivered',
                body: 'You receive a complete 90-day roadmap. Initiatives prioritized. Departments sequenced. Expected outcomes defined. Quick wins identified. No client should ever be figuring out what is next.',
              },
              {
                step: '03',
                period: 'Month 1 to 3',
                title: 'Execution',
                body: 'The monthly operating system runs against the roadmap. First automation live by day 30. Second by day 60. Full AI operations scorecard delivered at day 90.',
              },
              {
                step: '04',
                period: 'Quarter 2 and beyond',
                title: 'Expand',
                body: 'Roadmap refreshes each quarter. Scope expands as the systems compound. Momentum builds.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="border rounded-2xl p-7 flex flex-col gap-3 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-3xl" style={{ color: 'rgba(75,127,255,0.3)' }}>{item.step}</span>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4B7FFF' }}>{item.period}</span>
                </div>
                <h3 className="font-black text-lg" style={{ color: '#DCE3EF' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* What the roadmap includes */}
          <div
            className="border rounded-2xl p-8 max-w-3xl mx-auto"
            style={{ background: '#162035', borderColor: 'rgba(75,127,255,0.3)' }}
          >
            <h4 className="font-black text-lg mb-6" style={{ color: '#DCE3EF' }}>What the roadmap includes</h4>
            <div className="flex flex-col gap-3">
              {[
                '6 to 12 AI initiatives identified and prioritized',
                'Department activation sequence defined',
                'Expected outcomes for each phase',
                'Quick wins identified for early momentum',
                'Success metrics established before work begins',
                'Full build specs for month one',
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
      </section>

      {/* ========== 5. AI READINESS ASSESSMENT ========== */}
      <section id="assessment" className="py-28 md:py-36">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4B7FFF' }}>Not sure where to start</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6" style={{ color: '#DCE3EF' }}>
            Find out where AI will have the highest ROI in your business.
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#8892A4' }}>
            The free AI Readiness Assessment scores your operations across ten dimensions and tells you exactly where to focus first. Takes five minutes. Results are instant.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="/quiz"
              className="inline-block text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
            >
              Take the Free Assessment
            </a>
            <a
              href="#book"
              className="inline-block font-bold text-base px-8 py-4 rounded-xl border transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
            >
              Book a Discovery Call
            </a>
          </div>
          <p className="text-sm" style={{ color: '#4A5568' }}>
            Already know what you want to automate? Skip the assessment and book a call directly.
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
                <p className="font-black text-3xl" style={{ color: '#DCE3EF' }}>$2,500</p>
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

            {/* Card 2 — Standalone Build (highlighted) */}
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
                  FIXED PRICE
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl mb-2" style={{ color: '#DCE3EF' }}>Standalone Build</h3>
                <p className="font-black text-3xl" style={{ color: '#DCE3EF' }}>Starting at $5,000</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                Already know what you want automated? We scope it, build it, deploy it, and train your team. Fixed price. You own it when it is done.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  'Scoped before any work begins',
                  'Built into your existing stack',
                  'Deployed and tested in production',
                  'Team trained on day one',
                  '30 days of support included',
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

            {/* Card 3 — Monthly Retainer */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-5 card-hover"
              style={{ background: '#162035', borderColor: '#1E2D47' }}
            >
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
                <p className="font-black text-3xl" style={{ color: '#DCE3EF' }}>$5,000<span className="text-lg font-bold"> / month</span></p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                Your embedded AI operations team. New builds, maintenance, team training, and strategic advisory, all included. One flat monthly fee.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  'Monthly build sprint included',
                  'All maintenance and support',
                  'Team training every month',
                  'Strategy and advisory',
                  'Full transformation reporting',
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
                className="block text-center font-bold text-sm py-3 rounded-xl border transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
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
