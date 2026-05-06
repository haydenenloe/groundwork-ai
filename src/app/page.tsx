import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ApplyForm from '@/components/ApplyForm'

export default function Home() {
  return (
    <>
      <Nav />

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] mb-8" style={{ color: '#DCE3EF' }}>
            Your most expensive manual process,{' '}
            <br className="hidden md:block" />
            <span className="grad-text">automated in 30 days.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed mb-12" style={{ color: '#8892A4' }}>
            I find the workflow costing your team the most time and build the AI system that handles it. $2,500. It works or I keep building.
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

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>How it works</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#DCE3EF' }}>
              Three steps. One outcome.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                n: '1',
                title: 'Find',
                body: 'I spend 2 weeks with your team. A few conversations to identify the single highest-leverage process to automate.',
              },
              {
                n: '2',
                title: 'Build',
                body: 'I build the AI system that handles it. Integrated into your existing tools. You see it working before you pay for anything beyond the audit.',
              },
              {
                n: '3',
                title: 'Run',
                body: 'Once it works, we expand. Most clients want 2-3 more systems built over the next quarter. That is the retainer — I become your embedded AI operator.',
              },
            ].map((step) => (
              <div key={step.n} className="border rounded-2xl p-8 flex flex-col gap-5 card-hover" style={{ background: '#162035', borderColor: '#1E2D47' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-white text-xl" style={{ background: '#4B7FFF' }}>
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: '#DCE3EF' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BEFORE / AFTER ========== */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>What this looks like</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Real workflows. Real time recovered.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              {
                title: 'Lead Follow-Up',
                before: 'Leads sit for 24-72 hours. Reps manually check the CRM, write follow-ups, update status.',
                after: 'Every lead gets a response in minutes. CRM updates itself. Reps close deals instead of doing admin.',
              },
              {
                title: 'Client Onboarding',
                before: 'Someone emails the intake form. Waits. Chases. Copies data into the system by hand.',
                after: 'Signing a contract triggers everything automatically. Intake collected, project created, kickoff scheduled.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#162035', border: '1px solid #1E2D47' }}
              >
                {/* Title row */}
                <div className="px-6 pt-5 pb-4 text-center border-b" style={{ borderColor: '#1E2D47' }}>
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: 'rgba(75,127,255,0.1)', color: '#4B7FFF' }}
                  >
                    {card.title}
                  </span>
                </div>

                {/* Before / After columns */}
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="px-5 py-5 border-r" style={{ borderColor: '#1E2D47' }}>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#4A5568' }}
                    >
                      Before
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                      {card.before}
                    </p>
                  </div>

                  {/* After */}
                  <div
                    className="px-5 py-5 rounded-r-lg"
                    style={{ background: 'rgba(75,127,255,0.06)' }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#4B7FFF' }}
                    >
                      After
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#DCE3EF' }}>
                      {card.after}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-28 md:py-36" style={{ background: '#0C1525' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>Pricing</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#DCE3EF' }}>
              One offer. Flat fee. It works.
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="border rounded-2xl p-10 flex flex-col gap-6" style={{ background: '#162035', borderColor: 'rgba(75,127,255,0.3)' }}>
              <div className="flex items-start justify-between">
                <h3 className="font-black text-2xl" style={{ color: '#DCE3EF' }}>30-Day AI Sprint</h3>
                <span className="font-black text-2xl" style={{ color: '#DCE3EF' }}>$2,500</span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                We find your biggest manual bottleneck, build the AI system that eliminates it, and make sure it is running in production. Keep working until it works.
              </p>

              <div className="border-t pt-5 space-y-3" style={{ borderColor: '#1E2D47' }}>
                {[
                  '2-week discovery',
                  'AI system built and deployed',
                  'Your team trained to use it',
                  '30-day support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: '#DCE3EF' }}>
                    <span style={{ color: '#4B7FFF' }}>→</span>
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="#book"
                className="block text-center text-white font-bold text-base py-4 rounded-xl transition-colors"
                style={{ background: '#4B7FFF', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
              >
                Book a Discovery Call →
              </a>
            </div>

            <p className="text-center text-sm mt-6" style={{ color: '#4A5568' }}>
              Already know you want ongoing help? Retainers start at $5K/month.
            </p>
          </div>
        </div>
      </section>

      {/* ========== BOOK ========== */}
      <section id="book" className="py-28 md:py-36 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 hero-glow pointer-events-none opacity-60" />
        <div className="relative max-w-3xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4B7FFF' }}>Ready to get started?</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Book a Free Discovery Call
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#8892A4' }}>
              30 minutes. I will tell you exactly what I would build for your business and what it would save you. No pitch, just a diagnosis.
            </p>
          </div>

          <ApplyForm />
        </div>
      </section>

      <Footer />
    </>
  )
}
