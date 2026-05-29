import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SMS Terms and Conditions | Groundwork AI',
  description: 'Groundwork AI SMS Terms and Conditions, including opt-out instructions, help information, carrier notices, and message frequency details.',
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <article className="relative max-w-3xl mx-auto px-6 py-20 md:py-28">
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
              style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}
            >
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              Groundwork AI SMS Terms and Conditions
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#8892A4' }}>
              <strong style={{ color: '#DCE3EF' }}>Effective Date:</strong> May 29, 2026
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 space-y-8 leading-relaxed"
            style={{ background: 'rgba(30,45,71,0.4)', border: '1px solid rgba(75,127,255,0.12)', color: '#8892A4' }}
          >
            <p>
              These terms and conditions apply to messages sent to and from Enloe Ventures LLC DBA Groundwork AI.
            </p>

            <ol className="list-decimal pl-6 space-y-5">
              <li>
                Groundwork AI may send SMS messages related to AI messaging services, including conversational responses, customer support communications, appointment or meeting reminders, service updates, and other operational messages sent on behalf of Groundwork AI or its client businesses after you have opted in to receive them.
              </li>
              <li>
                You can cancel the SMS service at any time. Just text &quot;STOP&quot;. After you send the SMS message &quot;STOP&quot; to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, send the SMS message &quot;START&quot; and we will start sending SMS messages to you again.
              </li>
              <li>
                If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at hayden.enloe@groundwork-ai.dev.
              </li>
              <li>
                Carriers are not liable for delayed or undelivered messages.
              </li>
              <li>
                As always, message and data rates may apply for any messages sent to you from us and to us from you. Message frequency varies. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.
              </li>
              <li>
                If you have any questions regarding privacy, please read our privacy policy: <a href="/privacy" className="underline" style={{ color: '#4B7FFF' }}>https://groundwork-ai.dev/privacy</a>
              </li>
            </ol>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
