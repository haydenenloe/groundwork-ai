import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Groundwork AI',
  description: 'Groundwork AI Privacy Policy for SMS communications and personal information handling.',
}

export default function PrivacyPage() {
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
              Privacy Policy
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
              Groundwork AI (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) values your privacy. This Privacy Policy explains how we collect, use, and protect your personal information — particularly your phone number and SMS communication preferences.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>How We Use Your Information</h2>
              <p>
                Groundwork AI provides messaging services on behalf of our client businesses (&quot;Clients&quot;). When you opt in to receive communications from one of our Clients, your contact information is processed through our messaging platform to deliver those communications. We act solely as a service provider for our Clients and use your information only to facilitate the messages you have consented to receive.
              </p>
              <p>
                <strong style={{ color: '#DCE3EF' }}>We do not share opt-in data, consent records, or contact information with any third parties for marketing or any other purposes.</strong>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>Information We Collect</h2>
              <p>When you interact with one of our Clients through our messaging platform, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your phone number</li>
                <li>Your name (if provided)</li>
                <li>Your messaging consent records</li>
                <li>Messages you send and receive through our platform</li>
                <li>Timestamps and metadata related to your communications</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>How We Use Your Information</h2>
              <p>We use your information solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deliver SMS messages from our Clients that you have opted in to receive</li>
                <li>Maintain records of your consent and communication preferences</li>
                <li>Provide customer support related to messaging</li>
                <li>Comply with applicable laws, regulations, and mobile carrier requirements</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>SMS Opt-Out</h2>
              <p>
                You can opt out of SMS communications at any time by replying <strong style={{ color: '#DCE3EF' }}>STOP</strong> to any message. Once you opt out, you will receive a confirmation message and no further marketing messages will be sent to you. To re-subscribe, reply <strong style={{ color: '#DCE3EF' }}>START</strong>.
              </p>
              <p>
                You may also reply <strong style={{ color: '#DCE3EF' }}>HELP</strong> at any time to receive information about how to contact us.
              </p>
              <p>Message and data rates may apply. Frequency of messages varies by Client and conversation.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>Data Retention</h2>
              <p>
                We retain your information only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. Consent records are retained for the duration of our service relationship plus any period required by applicable regulations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction or deletion of your information</li>
                <li>Withdraw your consent at any time</li>
                <li>Lodge a complaint with a data protection authority</li>
              </ul>
              <p>To exercise any of these rights, contact us using the information below.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &quot;Effective Date&quot; at the top will reflect the most recent revision. Material changes will be communicated through reasonable means, such as a notice on our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: '#DCE3EF' }}>Contact</h2>
              <p>
                <strong style={{ color: '#DCE3EF' }}>Groundwork AI</strong><br />
                Email: hayden.enloe@groundwork-ai.dev<br />
                Website: https://groundwork-ai.dev
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
