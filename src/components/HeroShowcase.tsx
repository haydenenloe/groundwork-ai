'use client'

import { useState, useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import { Check, MessageSquare, Mail, FileText, Clock, TrendingUp, PhoneMissed, Star, Receipt, CalendarClock } from 'lucide-react'

const SURFACE = '#FFFFFF'
const ALT = '#F3EFE7'
const INK = '#221D17'
const MUTED = '#6F665A'
const LINE = '#E7E0D3'
const ACCENT = '#3B5BDB'
const GREEN_BG = 'rgba(129,178,154,0.18)'
const GREEN_INK = '#3F6B53'

function Frame({ label, icon: Icon, children }: { label: string; icon: typeof Mail; children: ReactNode }) {
  return (
    <div
      className="rounded-3xl p-5 md:p-6 h-full flex flex-col"
      style={{ background: SURFACE, border: `1px solid ${LINE}`, boxShadow: '0 30px 60px -30px rgba(34,29,23,0.25)' }}
    >
      <div className="flex items-center gap-2 pb-4 mb-4" style={{ borderBottom: `1px solid ${LINE}` }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E07A5F' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E6B84F' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#81B29A' }} />
        <span className="ml-2 inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: MUTED }}>
          <Icon size={13} /> {label}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3 text-sm">{children}</div>
    </div>
  )
}

const Out = ({ children }: { children: ReactNode }) => (
  <div className="self-end max-w-[82%] px-4 py-2.5 rounded-2xl rounded-br-md text-white" style={{ background: ACCENT }}>{children}</div>
)
const In = ({ children }: { children: ReactNode }) => (
  <div className="self-start max-w-[82%] px-4 py-2.5 rounded-2xl rounded-bl-md" style={{ background: ALT, color: INK }}>{children}</div>
)
const Chip = ({ children }: { children: ReactNode }) => (
  <div className="self-center mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: GREEN_BG, color: GREEN_INK }}>
    <Check size={13} /> {children}
  </div>
)

const slides: ReactNode[] = [
  <Frame key="reactivation" label="Reactivation agent" icon={MessageSquare}>
    <Out>Hi Sarah, following up from a few months back. Still looking into options for your team?</Out>
    <In>Actually yes, the timing is better now.</In>
    <Out>Great. I have Thursday at 2pm or Friday at 10am open.</Out>
    <In>Thursday works.</In>
    <Chip>Meeting booked &middot; Thursday 2:00 PM</Chip>
  </Frame>,

  <Frame key="support" label="Support agent" icon={Mail}>
    <p className="text-xs" style={{ color: MUTED }}>New email &middot; Jordan M.</p>
    <In>Hey, can I change the shipping address on order #4821?</In>
    <div className="self-stretch px-4 py-3 rounded-2xl" style={{ background: ALT, color: INK, borderLeft: `3px solid ${ACCENT}` }}>
      <span className="block text-xs font-semibold mb-1" style={{ color: ACCENT }}>AI draft</span>
      Hi Jordan, done. Order #4821 now ships to your Denver address today, with tracking by 5pm. Anything else I can help with?
    </div>
    <Chip>Drafted in 4s &middot; ready to send</Chip>
  </Frame>,

  <Frame key="report" label="Report agent" icon={FileText}>
    <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: ALT, color: MUTED }}>
      <Clock size={12} /> Every Monday, 8:00 AM
    </span>
    <p className="font-semibold" style={{ color: INK }}>Weekly revenue report</p>
    <div className="flex flex-col">
      {[
        ['New leads', '42'],
        ['Booked calls', '11'],
        ['Pipeline added', '$86k'],
      ].map(([k, v], idx) => (
        <div key={k} className="flex items-center justify-between py-2" style={{ borderTop: idx === 0 ? 'none' : `1px solid ${LINE}` }}>
          <span style={{ color: MUTED }}>{k}</span>
          <span className="inline-flex items-center gap-1 font-semibold" style={{ color: INK }}>
            {v} <TrendingUp size={13} style={{ color: GREEN_INK }} />
          </span>
        </div>
      ))}
    </div>
    <Chip>Sent to #leadership</Chip>
  </Frame>,

  <Frame key="missed-call" label="Missed-call agent" icon={PhoneMissed}>
    <Out>Hi, this is Apex Plumbing. Sorry we missed your call! What can we help with?</Out>
    <In>Need someone to look at a leak under my sink.</In>
    <Out>We can come by today between 2 and 4. Want me to lock it in?</Out>
    <In>Yes please.</In>
    <Chip>Job booked &middot; today 2&ndash;4 PM</Chip>
  </Frame>,

  <Frame key="review" label="Review agent" icon={Star}>
    <Out>Thanks for choosing us, Maria! Would you mind leaving a quick review? It takes about 20 seconds.</Out>
    <In>Done. You guys were great!</In>
    <Chip>New 5-star review on Google</Chip>
  </Frame>,

  <Frame key="payments" label="Payments agent" icon={Receipt}>
    <Out>Hi Dan, a friendly reminder that invoice #1042 for $2,400 is 5 days past due. Here is a secure pay link.</Out>
    <In>Oops, paying now.</In>
    <Chip>Paid &middot; $2,400 collected</Chip>
  </Frame>,

  <Frame key="reminder" label="Reminder agent" icon={CalendarClock}>
    <Out>Reminder: your appointment with Bright Smile Dental is tomorrow at 3:00 PM. Reply C to confirm or R to reschedule.</Out>
    <In>C</In>
    <Out>You are confirmed. See you then!</Out>
    <Chip>Confirmed &middot; no-show avoided</Chip>
  </Frame>,
]

export default function HeroShowcase() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 4200)
    return () => clearInterval(id)
  }, [paused])

  const tiltRef = useRef<HTMLDivElement>(null)

  function tilt(e: PointerEvent<HTMLDivElement>) {
    const el = tiltRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`
  }
  function untilt() {
    if (tiltRef.current) tiltRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); untilt() }}>
      <div style={{ perspective: '1000px' }} onPointerMove={tilt} onPointerLeave={untilt}>
        <div ref={tiltRef} style={{ display: 'grid', transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              gridArea: '1 / 1',
              opacity: idx === i ? 1 : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: idx === i ? 'auto' : 'none',
            }}
            aria-hidden={idx !== i}
          >
            {slide}
          </div>
        ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Show example ${idx + 1}`}
            onClick={() => setI(idx)}
            style={{
              width: idx === i ? 22 : 8,
              height: 8,
              borderRadius: 99,
              background: idx === i ? ACCENT : '#D8D0C2',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
