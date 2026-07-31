import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiscoveryChat from '@/components/DiscoveryChat'

export const metadata: Metadata = {
  title: 'Discovery — Groundwork AI',
  description:
    'A short conversation about your business and where AI could help. Groundwork AI reviews it and comes back with a plan.',
  robots: { index: false, follow: false },
}

export default function DiscoveryPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <section className="relative max-w-2xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-8">
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
              Let&apos;s get the full picture
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#6F665A' }}>
              This conversation gives Hayden the full picture of your business and how you actually work, so he can be
              specific instead of general. Answer in your own words, and attach real documents where you can. The more
              you share, the better.
            </p>
          </div>

          <div className="rounded-2xl p-4 md:p-6" style={{ background: '#FFFFFF', border: '1px solid #E7E0D3' }}>
            <DiscoveryChat />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
