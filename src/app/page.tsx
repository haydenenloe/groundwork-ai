import NavLight from '@/components/NavLight'
import Reveal from '@/components/Reveal'
import ApplyForm from '@/components/ApplyForm'
import HeroShowcase from '@/components/HeroShowcase'
import HeroFX from '@/components/HeroFX'
import Magnetic from '@/components/Magnetic'
import BusyworkGame from '@/components/BusyworkGame'
import Logo from '@/components/Logo'
import {
  ArrowRight, Check, MessageSquare, Mail, FileText, Gamepad2,
  Clock, RefreshCw, ClipboardList, ArrowUpRight,
} from 'lucide-react'

const PAPER = '#FBF9F5'
const SURFACE = '#FFFFFF'
const ALT = '#F3EFE7'
const INK = '#221D17'
const INK_DEEP = '#1C1712'
const MUTED = '#6F665A'
const LINE = '#E7E0D3'
const ACCENT = '#3B5BDB'
const SERIF = "'Fraunces', Georgia, serif"

/* Hand-drawn underline for the hero accent phrase */
function Swash() {
  return (
    <svg
      viewBox="0 0 220 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: 'absolute', left: 0, right: 0, bottom: '-0.12em', width: '100%', height: '0.22em' }}
    >
      <path
        d="M3 9 Q 55 2.5, 110 5.5 T 217 4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

const MARQUEE_ITEMS = [
  'Lead follow-up', 'Weekly reports', 'Missed calls', 'Invoice chasing',
  'Appointment reminders', 'Review requests', 'Data entry', 'Customer support email',
  'CRM updates', 'Onboarding handoffs',
]

export default function Home() {
  return (
    <div style={{ background: PAPER, color: INK, minHeight: '100vh' }}>
      <div className="grain" aria-hidden="true" />
      <NavLight />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="absolute inset-0 hero-glow" aria-hidden="true" />
        <HeroFX />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2.5 text-xs font-semibold px-3.5 py-2 rounded-full mb-7"
              style={{ background: SURFACE, border: `1px solid ${LINE}`, color: MUTED, boxShadow: '0 2px 10px -4px rgba(34,29,23,0.12)' }}
            >
              <span className="pulse-dot" />
              AI operations, built for small teams
            </span>
            <h1
              className="font-medium tracking-tight mb-7"
              style={{ fontFamily: SERIF, fontSize: 'clamp(2.6rem, 5.4vw, 4.1rem)', lineHeight: 1.05, color: INK }}
            >
              AI teammates that{' '}
              <span className="relative inline-block" style={{ fontStyle: 'italic', color: ACCENT, whiteSpace: 'nowrap' }}>
                own the work
                <Swash />
              </span>
              , not just help with it.
            </h1>
            <p className="text-lg leading-relaxed mb-9 max-w-md" style={{ color: MUTED }}>
              Most companies are stuck using AI as an assistant. We build the AI teammates that own a whole workflow, wired into your systems and kept running over time. We find where AI can help most, then build it out for you.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mb-10">
              <Magnetic>
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #2C46B8 100%)`,
                    boxShadow: '0 14px 30px -10px rgba(59,91,219,0.55), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  Book a call <ArrowRight size={17} />
                </a>
              </Magnetic>
              <a
                href="#how"
                className="group inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-70"
                style={{ color: INK }}
              >
                See how it works
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" style={{ color: ACCENT }} />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm" style={{ color: MUTED }}>
              {['First build live in month one', 'You own your systems', 'Founder-led'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Check size={14} style={{ color: ACCENT }} /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Rotating product mockups on a layered deck */}
          <Reveal delay={120}>
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl"
                aria-hidden="true"
                style={{ background: SURFACE, border: `1px solid ${LINE}`, transform: 'rotate(3.2deg) scale(0.97) translateY(10px)', opacity: 0.75 }}
              />
              <div
                className="absolute inset-0 rounded-3xl"
                aria-hidden="true"
                style={{ background: 'rgba(59,91,219,0.07)', border: '1px solid rgba(59,91,219,0.14)', transform: 'rotate(-2.6deg) scale(0.98) translateY(6px)' }}
              />
              <div className="relative">
                <HeroShowcase />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== BUSYWORK MARQUEE ========== */}
      <section className="py-6" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, background: SURFACE }}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: MUTED }}>
          The work our AI teammates take off your plate
        </p>
        <div className="marquee">
          <div className="marquee-track items-center">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${dup}-${item}`} className="flex items-center whitespace-nowrap">
                    <span className="font-medium text-lg md:text-xl px-2" style={{ fontFamily: SERIF, color: INK }}>{item}</span>
                    <span className="mx-4 w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT, opacity: 0.55 }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROBLEM ========== */}
      <section className="py-20 md:py-28" style={{ background: ALT }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-5">The problem</p>
              <h2 className="font-medium tracking-tight [text-wrap:balance]" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Your team is too busy to get less busy.
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Clock, t: 'Leads wait days', b: 'Inbound interest goes cold before anyone follows up.' },
              { icon: RefreshCw, t: 'Reports rebuilt weekly', b: 'The same spreadsheet gets assembled by hand every Friday.' },
              { icon: ClipboardList, t: 'Everything is manual', b: 'The CRM, the onboarding, the handoffs. All done by a person, if they remember.' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.t} delay={i * 90}>
                  <div className="card-hover rounded-2xl p-6 h-full" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(59,91,219,0.08)', color: ACCENT }}>
                      <Icon size={18} />
                    </span>
                    <h3 className="font-semibold mb-2" style={{ color: INK }}>{c.t}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.b}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal>
            <p
              className="text-xl md:text-2xl leading-snug mt-12 max-w-3xl pl-6 [text-wrap:balance]"
              style={{ fontFamily: SERIF, color: INK, borderLeft: `3px solid ${ACCENT}` }}
            >
              Everyone knows AI could handle this. No one has time to set it up.{' '}
              <span style={{ fontStyle: 'italic', color: ACCENT }}>That is the whole job.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="eyebrow eyebrow--center mb-5 justify-center">How it works</p>
              <h2 className="font-medium tracking-tight" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Three steps to an AI operations layer.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Find it', b: 'We figure out where AI can actually move the needle for your team, and which build is worth doing first.' },
              { n: '02', t: 'Build it', b: 'We build the highest-value systems and wire them into the tools you already use. The first one ships in your first month.' },
              { n: '03', t: 'Run it', b: 'A monthly cadence: new builds, team training, and improvements. Your operations layer compounds instead of going stale.' },
            ].map((s, i, arr) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="h-full flex flex-col">
                  {/* step marker + connector */}
                  <div className="hidden md:flex items-center mb-5" aria-hidden="true">
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0"
                      style={{ fontFamily: SERIF, fontSize: '1.05rem', background: SURFACE, border: `1.5px solid ${ACCENT}`, color: ACCENT, boxShadow: '0 4px 14px -6px rgba(59,91,219,0.35)' }}
                    >
                      {s.n}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="flex-1 ml-4 -mr-10" style={{ borderTop: `2px dashed rgba(59,91,219,0.3)` }} />
                    )}
                  </div>
                  <div className="card-hover rounded-2xl p-8 flex-1 flex flex-col" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                    <span className="md:hidden font-medium mb-4" style={{ fontFamily: SERIF, fontSize: '1.6rem', color: ACCENT }}>{s.n}</span>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: INK }}>{s.t}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>{s.b}</p>
                  </div>
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
              <p className="eyebrow eyebrow--center mb-5 justify-center">Recent work</p>
              <h2 className="font-medium tracking-tight mb-4" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Real systems, already running.
              </h2>
              <p className="text-base" style={{ color: MUTED }}>A sample of recent builds. Named case studies and client results are on the way.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare, tag: 'Marketing agency', t: 'Lead reactivation agent',
                b: 'Texts a company’s dormant leads, re-engages the ones worth pursuing, and books qualified meetings onto the sales calendar.',
                r: 'A dead list turned back into booked calls.',
              },
              {
                icon: Mail, tag: 'Founder-led product company', t: 'Customer support agent',
                b: 'Drafts fast, on-brand replies to inbound emails. Questions get answered in minutes, and no lead slips through while the founder is heads-down.',
                r: 'Replies in minutes instead of days.',
              },
              {
                icon: FileText, tag: 'B2B SaaS, ~50 people', t: 'AI Operations Audit',
                b: 'Twelve interviews, a prioritized roadmap with ROI estimates, an AI use policy, and a live executive readout.',
                r: 'The blueprint for where AI pays off first.',
              },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.t} delay={i * 110}>
                  <div className="card-hover rounded-2xl p-8 h-full flex flex-col relative overflow-hidden" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                    <span
                      className="absolute top-0 left-0 right-0 h-1"
                      aria-hidden="true"
                      style={{ background: `linear-gradient(90deg, ${ACCENT}, rgba(59,91,219,0.15))` }}
                    />
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(59,91,219,0.08)', color: ACCENT }}>
                      <Icon size={20} />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: MUTED }}>{c.tag}</p>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: INK }}>{c.t}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>{c.b}</p>
                    <p className="text-sm font-medium mt-5 pt-4 flex items-start gap-2" style={{ color: ACCENT, borderTop: `1px solid ${LINE}` }}>
                      <ArrowUpRight size={16} className="mt-0.5 flex-shrink-0" />
                      {c.r}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative mx-auto w-44 md:w-56">
              <div
                className="absolute inset-0 rounded-3xl"
                aria-hidden="true"
                style={{ background: 'rgba(59,91,219,0.1)', border: '1px solid rgba(59,91,219,0.2)', transform: 'rotate(-4deg) translate(-8px, 8px)' }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hayden.jpg"
                alt="Hayden Enloe, founder of Groundwork AI"
                className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl object-cover"
                style={{ border: `1px solid ${LINE}`, objectPosition: 'center top', boxShadow: '0 24px 48px -20px rgba(34,29,23,0.3)' }}
              />
              <span
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-3.5 py-2 rounded-full"
                style={{ background: SURFACE, border: `1px solid ${LINE}`, color: INK, boxShadow: '0 8px 20px -8px rgba(34,29,23,0.25)' }}
              >
                Hayden Enloe &middot; <span style={{ color: ACCENT }}>Founder</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="eyebrow mb-5">Who is behind it</p>
              <h2 className="font-medium tracking-tight mb-5" style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.1, color: INK }}>
                You get the founder in the room.
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
                <p>
                  Groundwork AI is led by Hayden Enloe, who holds a master&rsquo;s in Information Systems and builds practical AI automations for small and mid-sized teams. Work with Groundwork and you get a founder who stays close to the work: in your operations, accountable for what ships, and invested in seeing it pay off.
                </p>
                <p>
                  The approach is simple. An honest diagnosis instead of a sales pitch, the path that is actually right for you, and systems you own. The goal is to give your team back the hours it loses to work that software should be doing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-24 md:py-32" style={{ background: ALT }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="eyebrow eyebrow--center mb-5 justify-center">Ways to work together</p>
              <h2 className="font-medium tracking-tight" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Find what&rsquo;s worth building. Then build it.
              </h2>
              <p className="text-base leading-relaxed mt-5" style={{ color: MUTED }}>
                Every engagement is scoped to your size and your goals, so we land on pricing together on a quick call. Here is how we can work.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                kind: 'Diagnose', name: 'AI Operations Audit',
                desc: 'Not sure where AI fits? We map your workflows and find the highest-ROI place to start, before you build a thing.',
                items: ['Interviews across your team', 'Prioritized roadmap with ROI', 'AI use policy draft', 'Live walkthrough and Q&A'],
                featured: false,
              },
              {
                kind: 'Build', name: 'Build & Maintain',
                desc: 'Put one painful, repetitive workflow on autopilot. We build it, wire it into your tools, and keep it running and improving.',
                items: ['One high-value build', 'Wired into the tools you use', 'Ongoing maintenance and tuning', 'Live in weeks, not months'],
                featured: true,
              },
              {
                kind: 'Partner', name: 'Ongoing Partnership',
                desc: 'Your embedded AI operations partner: a growing team of AI teammates, plus training and strategy, that you can talk to directly.',
                items: ['New builds every month', 'Team training and strategy', 'AI teammates you can chat with', 'You own your systems. Cancel anytime'],
                featured: false,
              },
            ].map((p) => (
              <Reveal key={p.name} className="h-full">
                <div
                  className="card-hover relative rounded-2xl p-8 h-full flex flex-col"
                  style={{
                    background: SURFACE,
                    border: p.featured ? `2px solid ${ACCENT}` : `1px solid ${LINE}`,
                    boxShadow: p.featured ? '0 24px 56px -24px rgba(59,91,219,0.4)' : undefined,
                  }}
                >
                  {p.featured && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full text-white whitespace-nowrap"
                      style={{ background: ACCENT, boxShadow: '0 6px 16px -6px rgba(59,91,219,0.6)' }}
                    >
                      Most popular
                    </span>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: ACCENT }}>{p.kind}</p>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>{p.name}</h3>
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
                    className="mt-7 block text-center font-semibold py-3 rounded-full transition-all hover:-translate-y-0.5"
                    style={p.featured
                      ? { background: `linear-gradient(135deg, ${ACCENT} 0%, #2C46B8 100%)`, color: '#fff', boxShadow: '0 10px 24px -10px rgba(59,91,219,0.5)' }
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
            <div className="text-center mb-12">
              <p className="eyebrow eyebrow--center mb-5 justify-center">FAQ</p>
              <h2 className="font-medium tracking-tight" style={{ fontFamily: SERIF, fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, color: INK }}>
                Questions, answered.
              </h2>
            </div>
          </Reveal>
          <div className="flex flex-col gap-3">
            {[
              { q: 'How fast will I see something working?', a: 'The audit takes two weeks. If you move to a retainer, the first working system ships inside your first month.' },
              { q: 'What if it does not work?', a: 'Every system is guaranteed. If a build does not do what we agreed, we keep working on it until it does. You own your systems and your data, so you are never locked in.' },
              { q: 'Do we need to be technical?', a: 'No. That is the point of working with us. We handle the building and integration, and we train your team on the parts they touch.' },
              { q: 'Is our data safe?', a: 'Yes. Client-owned data never goes into AI tools without approval, anything client-facing is reviewed by a person, and the audit includes a written AI use policy.' },
              { q: 'What does the retainer actually include?', a: 'One to two new builds a month, all maintenance, hands-on training, monthly reporting, and advisory. One flat fee, cancel anytime.' },
            ].map((f) => (
              <Reveal key={f.q}>
                <details className="card-hover rounded-2xl px-6 py-1 group" style={{ background: SURFACE, border: `1px solid ${LINE}` }}>
                  <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-semibold" style={{ color: INK }}>
                    {f.q}
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-open:rotate-45 text-lg font-light flex-shrink-0"
                      style={{ background: 'rgba(59,91,219,0.08)', color: ACCENT }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-sm leading-relaxed pb-5 max-w-xl" style={{ color: MUTED }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOOK (dark closing) ========== */}
      <section
        id="book"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: INK_DEEP, color: PAPER }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(59,91,219,0.28) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-medium tracking-tight mb-5" style={{ fontFamily: SERIF, fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', lineHeight: 1.08, color: PAPER }}>
                Let&rsquo;s find the hours{' '}
                <span style={{ fontStyle: 'italic', color: '#8FA3EE' }}>you&rsquo;re losing.</span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(251,249,245,0.68)' }}>
                Tell us what is eating your team&rsquo;s time. We will tell you what we would build and what it would save you. No pitch, just a diagnosis.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-3xl p-6 md:p-8" style={{ background: SURFACE, color: INK, boxShadow: '0 40px 90px -40px rgba(0,0,0,0.6)' }}>
              <ApplyForm />
            </div>
            <p className="text-center text-sm mt-6" style={{ color: 'rgba(251,249,245,0.6)' }}>
              Not ready to talk?{' '}
              <a href="/quiz" className="font-semibold underline-offset-2 hover:underline" style={{ color: '#8FA3EE' }}>Take the 5-minute AI Readiness Assessment</a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== FOOTER (dark) ========== */}
      <footer className="py-12" style={{ background: INK_DEEP, borderTop: '1px solid rgba(251,249,245,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span id="gw-egg" className="flex items-center gap-2.5 font-semibold select-none" style={{ color: PAPER, cursor: 'pointer' }}>
              <Logo size={22} />
              <span>Groundwork <span style={{ color: '#8FA3EE' }}>AI</span></span>
            </span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm" style={{ color: 'rgba(251,249,245,0.6)' }}>
              <a href="#how" className="transition-colors hover:text-white">How it works</a>
              <a href="#work" className="transition-colors hover:text-white">Work</a>
              <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
              <a href="/blog" className="transition-colors hover:text-white">Blog</a>
              <a href="#book" className="transition-colors hover:text-white">Book a call</a>
              <button
                id="gw-play"
                type="button"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                style={{ color: 'inherit', cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit' }}
              >
                <Gamepad2 size={14} /> Play
              </button>
            </div>
            <p className="text-xs" style={{ color: 'rgba(251,249,245,0.4)' }}>&copy; 2026 Groundwork AI</p>
          </div>
        </div>
      </footer>

      <BusyworkGame />
    </div>
  )
}
