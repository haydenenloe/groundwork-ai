import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiscoveryForm from '@/components/DiscoveryForm'

export const metadata: Metadata = {
  title: 'Discovery — Groundwork AI',
  description:
    'Tell us about your business and the processes you run, and we will come back with where AI can make the biggest difference.',
  robots: { index: false, follow: false },
}

export default function DiscoveryPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <section className="relative max-w-3xl mx-auto px-6 py-20 md:py-24">
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
              style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#3B5BDB' }}
            >
              Discovery
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight mb-5"
              style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Let&apos;s find where AI can actually help
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#6F665A' }}>
              This is the conversation we would have on a discovery call, in a form. The more you tell me, the more
              specific I can be when we meet.
            </p>
          </div>

          <div
            className="rounded-2xl px-5 py-4 mb-8 text-sm leading-relaxed"
            style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.18)', color: '#6F665A' }}
          >
            <strong style={{ color: '#221D17' }}>Answer what you can.</strong> Five minutes gets us started. Twenty
            gets you a much sharper plan. Skip anything that does not apply, and do not worry about polish. Your
            progress saves automatically, so you can leave and come back.
          </div>

          <div className="rounded-2xl p-6 md:p-10" style={{ background: '#FFFFFF', border: '1px solid #E7E0D3' }}>
            <DiscoveryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
