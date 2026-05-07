import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ApplyForm from '@/components/ApplyForm'
import {
  DollarSign,
  BookOpen,
  FileText,
  Video,
  Users,
  Zap,
  Wrench,
  GraduationCap,
  Lightbulb,
  HammerIcon,
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
            Your team is doing work<br className="hidden md:block" />
            <span className="grad-text"> that should run itself.</span>
          </h1>
          <p
            className="max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed mb-12"
            style={{ color: '#8892A4' }}
          >
            I build AI systems that handle your most expensive manual processes — integrated into your existing tools, working in production, your team trained to use them.
          </p>
          <a
            href="#book"
            className="inline-block text-white font-bold text-base px-10 py-4 rounded-xl transition-colors"
            style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
          >
            Book a Free Discovery Call →
          </a>
        </div>
      </section>

      {/* ========== 2. TWO ENTRY POINTS ========== */}
      <section id="how-it-works" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#DCE3EF' }}>
              Two ways to start.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-5 card-hover"
              style={{ background: '#162035', borderColor: '#1E2D47' }}
            >
              <h3 className="font-bold text-xl" style={{ color: '#DCE3EF' }}>
                Already know your problem
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>
                Skip the audit. Tell me what you want automated and I will scope and build it. Fixed price. You own it when it is done.
              </p>
              <a
                href="#book"
                className="font-semibold text-sm transition-colors hover:opacity-80"
                style={{ color: '#4B7FFF' }}
              >
                Get a quote →
              </a>
            </div>
            {/* Card 2 */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-5 card-hover"
              style={{ background: '#162035', borderColor: '#1E2D47' }}
            >
              <h3 className="font-bold text-xl" style={{ color: '#DCE3EF' }}>
                Not sure where to start
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8892A4' }}>
                I spend 2 weeks with your team, find the single highest-ROI process to automate, and deliver a full roadmap with ROI estimates. $2,500 flat.
              </p>
              <a
                href="#book"
                className="font-semibold text-sm transition-colors hover:opacity-80"
                style={{ color: '#4B7FFF' }}
              >
                Book an audit →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. WHAT I BUILD ========== */}
      <section id="what-i-build" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              What gets automated.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#8892A4' }}>
              Every engagement targets one of these. Built once, running permanently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <DollarSign size={22} />,
                title: 'Financial Operations',
                body: 'Invoice processing, expense categorization, AR/billing automation, financial reporting. The work an accountant or bookkeeper does manually, handled automatically.',
              },
              {
                icon: <BookOpen size={22} />,
                title: 'Company Knowledge Base',
                body: 'All your internal documents, SOPs, contracts, and policies become searchable by AI. Anyone on your team asks a question in plain English and gets an accurate answer with a source.',
              },
              {
                icon: <FileText size={22} />,
                title: 'Document Processing',
                body: 'Contracts, invoices, intake forms, applications. AI reads, extracts key fields, routes to the right place, and files them. Manual data entry eliminated.',
              },
              {
                icon: <Video size={22} />,
                title: 'Meeting Intelligence',
                body: 'Every recorded meeting becomes action items, CRM updates, and follow-up drafts automatically. Nothing falls through the cracks after a call.',
              },
              {
                icon: <Users size={22} />,
                title: 'Lead and Pipeline Automation',
                body: 'Leads scored, routed, and followed up automatically. Only serious buyers reach your team. High-volume intake handled without headcount.',
              },
              {
                icon: <Zap size={22} />,
                title: 'Workflow Triggers',
                body: 'When a form is submitted, an email arrives, or a contract is signed — a chain of tasks fires automatically. No human coordinator needed.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="border rounded-2xl p-7 flex flex-col gap-4 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(75,127,255,0.12)', color: '#4B7FFF' }}
                >
                  {card.icon}
                </div>
                <h3 className="font-bold text-base" style={{ color: '#DCE3EF' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. THE RETAINER ========== */}
      <section id="retainer" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              The ongoing relationship.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#8892A4' }}>
              Most clients start with one build. Once it works, they want more. The retainer is how that works.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: <HammerIcon size={22} />,
                title: 'Build',
                body: 'New automations and systems every month, within the retainer scope.',
              },
              {
                icon: <Wrench size={22} />,
                title: 'Maintain',
                body: 'Everything stays running. When something breaks or needs tuning, it gets fixed.',
              },
              {
                icon: <GraduationCap size={22} />,
                title: 'Train',
                body: 'Your team learns to use and trust the systems. AI adoption that actually sticks.',
              },
              {
                icon: <Lightbulb size={22} />,
                title: 'Advise',
                body: 'Stay current as AI evolves. Know what to adopt and what to ignore.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border rounded-2xl p-7 flex flex-col gap-4 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(75,127,255,0.12)', color: '#4B7FFF' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-base" style={{ color: '#DCE3EF' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{item.body}</p>
              </div>
            ))}
          </div>
          {/* Callout */}
          <div
            className="rounded-2xl p-8 text-center border max-w-3xl mx-auto"
            style={{ background: 'rgba(75,127,255,0.08)', borderColor: 'rgba(75,127,255,0.25)' }}
          >
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#DCE3EF' }}>
              This is the Fractional AI Officer model. Not a vendor. Not a freelancer. An embedded operator responsible for your AI layer.{' '}
              <span className="font-bold" style={{ color: '#4B7FFF' }}>$5,000/month. Cancel anytime.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== 5. PRICING ========== */}
      <section id="pricing" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#DCE3EF' }}>
              Clear pricing. No surprises.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Audit */}
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
                <h3 className="font-black text-xl mb-1" style={{ color: '#DCE3EF' }}>AI Operations Audit</h3>
                <p className="font-black text-3xl" style={{ color: '#DCE3EF' }}>$2,500</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                For companies that want to find the right problem before they build. Two weeks of discovery, a full prioritized roadmap with ROI estimates, and a live walkthrough.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  '2-week discovery process',
                  '4-6 interviews across your team',
                  'Prioritized opportunity matrix',
                  'Full AI Operations Roadmap',
                  'Live walkthrough session',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>→</span>
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="#book"
                className="block text-center font-bold text-sm py-3 rounded-xl border transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
              >
                Book an Audit →
              </a>
            </div>

            {/* Card 2 — Module Build (highlighted) */}
            <div
              className="border rounded-2xl p-8 flex flex-col gap-5 card-hover relative"
              style={{ background: '#162035', borderColor: 'rgba(75,127,255,0.5)', boxShadow: '0 0 40px rgba(75,127,255,0.12)' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                  style={{ background: '#4B7FFF' }}
                >
                  Most Common
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
                <h3 className="font-black text-xl mb-1" style={{ color: '#DCE3EF' }}>Module Build</h3>
                <p className="font-black text-3xl" style={{ color: '#DCE3EF' }}>Starting at $5K</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                Already know what you want? Scoped, priced, built, and deployed. You own it when it is done.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  'Scoped before work begins',
                  'Built to your existing stack',
                  'Tested in production',
                  '30-day support included',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>→</span>
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="#book"
                className="block text-center text-white font-bold text-sm py-3 rounded-xl transition-colors"
                style={{ background: '#4B7FFF', boxShadow: '0 8px 20px rgba(75,127,255,0.25)' }}
              >
                Get a Quote →
              </a>
            </div>

            {/* Card 3 — Retainer */}
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
                <h3 className="font-black text-xl mb-1" style={{ color: '#DCE3EF' }}>Fractional AI Officer</h3>
                <p className="font-black text-3xl" style={{ color: '#DCE3EF' }}>$5,000<span className="text-lg font-bold">/mo</span></p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                Embedded AI operator. New builds, maintenance, team training, and strategy — all included. One flat monthly fee.
              </p>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  'Monthly build sprint',
                  'All maintenance and support',
                  'Team training sessions',
                  'Strategy and advisory',
                  'Cancel anytime',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: '#DCE3EF' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#4B7FFF' }}>→</span>
                    {item}
                  </div>
                ))}
              </div>
              <a
                href="#book"
                className="block text-center font-bold text-sm py-3 rounded-xl border transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: '#4B7FFF', color: '#4B7FFF' }}
              >
                Talk to Hayden →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. WHY IT IS WORTH IT ========== */}
      <section id="why" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Compare it to the alternative.
            </h2>
            <p className="text-lg" style={{ color: '#8892A4' }}>
              Most clients hire for the work they want automated. Here is what that costs.
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            {[
              {
                hire: 'Hire a bookkeeper',
                cost: '$50,000/year',
                note: 'The financial ops automation does what a bookkeeper does, 24/7, no turnover.',
              },
              {
                hire: 'Hire an operations coordinator',
                cost: '$55,000/year',
                note: 'The workflow system does what the coordinator does, without the management overhead.',
              },
              {
                hire: 'Hire a data analyst',
                cost: '$75,000/year',
                note: 'The reporting automation pulls and formats the numbers every week without anyone touching it.',
              },
            ].map((row) => (
              <div
                key={row.hire}
                className="border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-3 card-hover"
                style={{ background: '#162035', borderColor: '#1E2D47' }}
              >
                <div className="flex-1">
                  <span className="font-bold" style={{ color: '#DCE3EF' }}>{row.hire}: </span>
                  <span className="font-black" style={{ color: '#4B7FFF' }}>{row.cost}</span>
                </div>
                <p className="text-sm sm:max-w-sm" style={{ color: '#8892A4' }}>{row.note}</p>
              </div>
            ))}
          </div>
          {/* Green callout */}
          <div
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.25)' }}
          >
            <p className="text-base md:text-lg leading-relaxed text-center" style={{ color: '#DCE3EF' }}>
              The retainer is <span className="font-black" style={{ color: '#22c55e' }}>$60,000/year</span>. It covers your entire AI layer — not one role, but the operational output of several. And if something does not work, I keep building until it does.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 7. BOOK A CALL ========== */}
      <section id="book" className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-60" />
        <div className="relative max-w-3xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Book a free discovery call.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#8892A4' }}>
              30 minutes. I will tell you exactly what I would build for your business and what it would save you. No pitch — just a diagnosis.
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
