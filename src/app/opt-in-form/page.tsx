import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmsOptInForm from '@/components/SmsOptInForm'

export const metadata: Metadata = {
  title: 'Get AI Ops Insights From Groundwork AI',
  description: 'Subscribe to occasional SMS updates from Groundwork AI about AI agents, ops automation, and insights from real client builds.',
}

export default function OptInFormPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <section className="relative max-w-3xl mx-auto px-6 py-20 md:py-28">
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
              style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#3B5BDB' }}
            >
              SMS Updates
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5" style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}>
              Get AI Ops Insights From Groundwork AI
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#6F665A' }}>
              Sign up to receive occasional text messages from Groundwork AI about AI agents, ops automation, and insights from real client builds. We send when we have something genuinely useful — never spam, easy to opt out anytime.
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 space-y-8"
            style={{ background: '#FFFFFF', border: '1px solid #E7E0D3' }}
          >
            <SmsOptInForm />

            <div className="pt-6 border-t space-y-3 text-sm leading-relaxed" style={{ borderColor: '#E7E0D3', color: '#6F665A' }}>
              <p>Message and data rates may apply</p>
              <p>Message frequency varies (typically 2-4 messages per month)</p>
              <p>Reply HELP for help. Reply STOP to opt out at any time.</p>
              <p>
                Read our{' '}
                <a href="/privacy" className="underline" style={{ color: '#3B5BDB' }}>
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="underline" style={{ color: '#3B5BDB' }}>
                  Terms of Service
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
