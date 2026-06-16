import NavLight from '@/components/NavLight'
import Reveal from '@/components/Reveal'
import ApplyForm from '@/components/ApplyForm'
import HeroShowcase from '@/components/HeroShowcase'
import { ArrowRight, Check, MessageSquare, Mail, FileText } from 'lucide-react'

const PAPER = '#FBF9F5'
const SURFACE = '#FFFFFF'
const ALT = '#F3EFE7'
const INK = '#221D17'
const MUTED = '#6F665A'
const LINE = '#E7E0D3'
const ACCENT = '#3B5BDB'
const SERIF = "'Fraunces', Georgia, serif"

export default function Home() {
  return (
    <div style={{ background: PAPER, color: INK, minHeight: '100vh' }}>
      <NavLight />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* soft warm + accent glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 75% 0%, rgba(59,91,219,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 10% 10%, rgba(255,176,102,0.10) 0%, transparent 55%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm font-semibold mb-5" style={{ color: ACCENT }}>AI operations, built for small teams</p>
            <h1 className="font-medium tracking-tight mb-6" style={{ fontFamily: SERIF, fontSize: 'clamp(2.6rem, 6vw, 4.4rem)', lineHeight: 1.04, color: INK }}>
              Hand your team&rsquo;s busywork to AI.
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: MUTED }}>
              I find where your team&rsquo;s time disappears, build the AI systems that take that work over, and train your people to run them. It starts with a focused two-week audit.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#book"
                className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
                style={{ background: ACCENT, boxShadow: '0 10px 24px -8px rgba(59,91,219,0.5)' }}
              >
                Book a call <ArrowRight size={17} />
              </a>
              <a href="#how" className="font-medium transition-opacity hover:opacity-60" style={{ color: INK }}>
                See how it works
              </a>
            </div>
          </div>

          {/* Rotating product mockups */}
          <Reveal delay={120}>
            <HeroShowcase />
          </Reveal>
        </div>
      </section>

      {/* ========== PROBLEM ========== */}
      <section className="py-20 md:py-28" style={{ background: ALT }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>The problem</p>
              <h2 className="font-medium tracking-tight [text-wrap:balance]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Your team is too busy to get less busy.
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { t: 'Leads wait days', b: 'Inbound interest goes cold before anyone follows up.' },
              { t: 'Reports rebuilt weekly', b: 'The same spreadsheet gets assembled by hand every Friday.' },
              { t: 'Everything is manual', b: 'The CRM, the onboarding, the handoffs. All done by a person, if they remember.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 90}>
                <div className="rounded-2xl p-6 h-full" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                  <h3 className="font-semibold mb-2" style={{ color: INK }}>{c.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-lg leading-relaxed mt-10 max-w-3xl [text-wrap:balance]" style={{ color: MUTED }}>
              Everyone knows AI could handle this. No one has time to set it up. That is the whole job.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>How it works</p>
              <h2 className="font-medium tracking-tight" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Three steps to an AI operations layer.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Find it', b: 'A two-week audit across your team. You get a prioritized roadmap with the ROI of every opportunity, an AI use policy, and a live walkthrough.', tag: '$3,500 audit' },
              { n: '02', t: 'Build it', b: 'We build the highest-value systems and wire them into the tools you already use. The first one ships in your first month.', tag: null },
              { n: '03', t: 'Run it', b: 'A monthly cadence: new builds, team training, and improvements. Your operations layer compounds instead of going stale.', tag: 'from $3,000 / mo' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                  <span className="font-medium mb-5" style={{ fontFamily: SERIF, fontSize: '1.6rem', color: ACCENT }}>{s.n}</span>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: INK }}>{s.t}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>{s.b}</p>
                  {s.tag && (
                    <span className="inline-block mt-5 text-xs font-semibold px-3 py-1.5 rounded-full self-start" style={{ background: 'rgba(59,91,219,0.08)', color: ACCENT }}>{s.tag}</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RECENT WORK ========== */}
      <section id="work" className="py-24 md:py-32" style={{ background: ALT }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>Recent work</p>
              <h2 className="font-medium tracking-tight mb-4" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Real systems, already running.
              </h2>
              <p className="text-base" style={{ color: MUTED }}>A sample of recent builds. Named case studies and client results are on the way.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, tag: 'Marketing agency', t: 'Lead reactivation agent', b: 'Texts a company’s dormant leads, re-engages the ones worth pursuing, and books qualified meetings onto the sales calendar. A dead list turned back into booked calls.' },
              { icon: Mail, tag: 'Founder-led product company', t: 'Customer support agent', b: 'Drafts fast, on-brand replies to inbound emails. Questions get answered in minutes, and no lead slips through while the founder is heads-down.' },
              { icon: FileText, tag: 'B2B SaaS, ~50 people', t: 'AI Operations Audit', b: 'Twelve interviews, a prioritized roadmap with ROI estimates, an AI use policy, and a live executive readout. The blueprint for where AI pays off first.' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.t} delay={i * 110}>
                  <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(59,91,219,0.08)', color: ACCENT }}>
                      <Icon size={20} />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>{c.tag}</p>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: INK }}>{c.t}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.b}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
          <Reveal>
            <div
              className="w-40 h-40 md:w-52 md:h-52 rounded-3xl flex items-center justify-center mx-auto"
              style={{ background: ALT, border: `1px solid ${LINE}` }}
            >
              <span className="font-medium" style={{ fontFamily: SERIF, fontSize: '3rem', color: ACCENT }}>HE</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>Who is behind it</p>
              <h2 className="font-medium tracking-tight mb-5" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.1, color: INK }}>
                You work directly with the person building.
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
                <p>
                  Groundwork AI is Hayden Enloe. I hold a master&rsquo;s in Information Systems and I build practical AI automations for small and mid-sized teams. No account managers, no handoffs. The person who maps your operations is the person who builds the systems and trains your team to use them.
                </p>
                <p>
                  My approach is simple: an honest diagnosis instead of a sales pitch, the path that is actually right for you, and you own every system I build. The goal is to give your team back the hours it loses to work software should be doing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-24 md:py-32" style={{ background: ALT }}>
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>Pricing</p>
              <h2 className="font-medium tracking-tight" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Start with the audit. Build from there.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                kind: 'Start here', name: 'AI Operations Audit', price: '$3,500', unit: 'one-time',
                desc: 'Find the right problem before you build. Two weeks of discovery, a prioritized roadmap with ROI, and a live walkthrough.',
                items: ['Interviews across your team', 'Prioritized opportunity roadmap', 'AI use policy draft', 'Live walkthrough and Q&A', 'Applies toward your first retainer month'],
                featured: false,
              },
              {
                kind: 'The path', name: 'Monthly Retainer', price: 'from $3,000', unit: '/ month',
                desc: 'Your embedded AI operations team. New builds, maintenance, training, and advisory, every month.',
                items: ['One to two new builds a month', 'All maintenance and support', 'Hands-on team training', 'Monthly impact reporting', 'You own your systems. Cancel anytime'],
                featured: true,
              },
            ].map((p) => (
              <Reveal key={p.name}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ background: SURFACE, border: p.featured ? `2px solid ${ACCENT}` : `1px solid ${LINE}` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: ACCENT }}>{p.kind}</p>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>{p.name}</h3>
                  <p className="mb-4">
                    <span className="font-medium" style={{ fontFamily: SERIF, fontSize: '2.2rem', color: INK }}>{p.price}</span>
                    <span className="text-sm ml-1.5" style={{ color: MUTED }}>{p.unit}</span>
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>{p.desc}</p>
                  <div className="flex flex-col gap-2.5 flex-1">
                    {p.items.map((it) => (
                      <div key={it} className="flex items-start gap-2.5 text-sm" style={{ color: INK }}>
                        <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                        {it}
                      </div>
                    ))}
                  </div>
                  <a
                    href="#book"
                    className="mt-7 block text-center font-semibold py-3 rounded-full transition-transform hover:-translate-y-0.5"
                    style={p.featured
                      ? { background: ACCENT, color: '#fff', boxShadow: '0 10px 24px -10px rgba(59,91,219,0.5)' }
                      : { background: 'transparent', color: ACCENT, border: `1px solid ${ACCENT}` }}
                  >
                    Book a call
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="font-medium tracking-tight text-center mb-12" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
              Questions, answered.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {[
              { q: 'How fast will I see something working?', a: 'The audit takes two weeks. If you move to a retainer, the first working system ships inside your first month.' },
              { q: 'What if it does not work?', a: 'Every system is guaranteed. If a build does not do what we agreed, I keep working on it until it does. You own your systems and your data, so you are never locked in.' },
              { q: 'Do we need to be technical?', a: 'No. That is the point of hiring me. I handle the building and integration, and I train your team on the parts they touch.' },
              { q: 'Is our data safe?', a: 'Yes. Client-owned data never goes into AI tools without approval, anything client-facing is reviewed by a person, and the audit includes a written AI use policy.' },
              { q: 'What does the retainer actually include?', a: 'One to two new builds a month, all maintenance, hands-on training, monthly reporting, and advisory. One flat fee, cancel anytime.' },
            ].map((f) => (
              <Reveal key={f.q}>
                <details className="rounded-2xl px-6 py-1 group" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                  <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-semibold" style={{ color: INK }}>
                    {f.q}
                    <span className="transition-transform group-open:rotate-45 text-xl font-light flex-shrink-0" style={{ color: ACCENT }}>+</span>
                  </summary>
                  <p className="text-sm leading-relaxed pb-5" style={{ color: MUTED }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOOK ========== */}
      <section id="book" className="py-24 md:py-32" style={{ background: ALT }}>
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-medium tracking-tight mb-4" style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.08, color: INK }}>
                Book a call.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
                Tell me what is eating your team&rsquo;s time. I will tell you what I would build and what it would save you. No pitch, just a diagnosis.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-3xl p-6 md:p-8" style={{ background: SURFACE, border: `1px solid ${LINE}`, boxShadow: '0 30px 60px -30px rgba(34,29,23,0.2)' }}>
              <ApplyForm />
            </div>
            <p className="text-center text-sm mt-5" style={{ color: MUTED }}>
              Not ready to talk?{' '}
              <a href="/quiz" className="font-semibold underline-offset-2 hover:underline" style={{ color: ACCENT }}>Take the 5-minute AI Readiness Assessment</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-10" style={{ background: PAPER, borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <span className="font-semibold" style={{ color: INK }}>Groundwork <span style={{ color: ACCENT }}>AI</span></span>
          <div className="flex gap-6 text-sm" style={{ color: MUTED }}>
            <a href="#how" className="hover:opacity-60">How it works</a>
            <a href="#work" className="hover:opacity-60">Work</a>
            <a href="#pricing" className="hover:opacity-60">Pricing</a>
            <a href="/blog" className="hover:opacity-60">Blog</a>
            <a href="#book" className="hover:opacity-60">Book a call</a>
          </div>
          <p className="text-xs" style={{ color: MUTED }}>&copy; 2026 Groundwork AI</p>
        </div>
      </footer>
    </div>
  )
}
