import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Groundwork AI',
  description: 'Insights on AI operations, automation, and building production AI systems for B2B companies.',
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col items-center justify-center pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative text-center px-6 py-32">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-8"
            style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}
          >
            Coming Soon
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ color: '#DCE3EF' }}>
            The Groundwork <span className="grad-text">Blog</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color: '#8892A4' }}>
            We&apos;re working on in-depth guides about AI operations, automation, and building production systems that actually ship. Check back soon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/quiz"
              className="text-white font-bold px-8 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF' }}
            >
              Take the Free Readiness Quiz →
            </a>
            <a
              href="/"
              className="font-medium transition-colors"
              style={{ color: '#8892A4' }}
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
