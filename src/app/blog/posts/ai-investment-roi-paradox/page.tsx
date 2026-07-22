import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The More You Spend on AI, the Less You Get Back. Here\'s Why. | Groundwork AI',
  description: 'Deloitte just published data on a strange pattern: AI investment is rising, but ROI is elusive. The fix isn\'t more technology. It\'s a different deployment model.',
  openGraph: {
    title: 'The More You Spend on AI, the Less You Get Back. Here\'s Why.',
    description: 'Deloitte just published data on a strange pattern: AI investment is rising, but ROI is elusive. The fix isn\'t more technology.',
    url: 'https://groundwork-ai.dev/blog/ai-investment-roi-paradox',
    type: 'article',
    publishedTime: '2026-07-22',
  },
}

export default function BlogPost() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 py-20">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-12 transition-colors hover:opacity-80"
            style={{ color: '#3B5BDB' }}
          >
            ← All Posts
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#3B5BDB' }}
              >
                ROI
              </span>
              <span className="text-sm" style={{ color: '#6F665A' }}>July 22, 2026</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>·</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}
            >
              The More You Spend on AI,<br />
              the Less You Get Back.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#6F665A' }}>
              Deloitte just published data on a strange pattern: AI investment keeps climbing, but returns stay elusive. The fix isn&apos;t more technology. It&apos;s a completely different deployment model.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#221D17', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              There&apos;s a pattern showing up across industries right now that nobody wants to talk about: companies are spending more on AI than ever, and getting less back.
            </p>

            <p>
              Deloitte called it an ROI paradox. Rising budgets. Rising headcount for AI initiatives. And yet — elusive, inconsistent returns.
            </p>

            <p>
              If you&apos;ve approved AI spending in the last 18 months and the finance team is still waiting to see it in the numbers, this is probably why.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              Spending more isn&apos;t the same as deploying better
            </h2>

            <p>
              Here&apos;s what the budget usually goes toward: enterprise AI platform licenses, a handful of Copilot or ChatGPT Team seats, maybe a vendor who ran a workshop and sold you on a use-case roadmap.
            </p>

            <p>
              None of that is operational AI. It&apos;s AI access. There&apos;s a big difference.
            </p>

            <p>
              Operational AI means a specific process runs automatically because AI is doing part of it — reading an email and routing it, extracting data from a document and logging it, generating a report from numbers that already exist. The system works without a human opening a tab.
            </p>

            <p>
              What most companies have built is the opposite: AI tools that require a human to use them. That&apos;s still useful. But it&apos;s not what the ROI case was built on.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              Why broad deployment produces thin returns
            </h2>

            <p>
              The instinct when budget is available is to go wide — deploy AI across teams, get seats into everyone&apos;s hands, let people experiment. The logic is sound: more usage means more value.
            </p>

            <p>
              In practice, broad deployment produces a lot of marginal efficiency gains and almost no step-change improvements. Someone writes a better email 10% faster. Someone else summarizes a document instead of skimming it. Real gains, but they don&apos;t compound. They don&apos;t show up in headcount. They&apos;re almost impossible to measure.
            </p>

            <p>
              Narrow deployment — picking two or three specific operational processes and automating them end-to-end — produces returns you can actually point to. Hours saved per week. Error rate dropped. Turnaround time cut in half. That&apos;s measurable.
            </p>

            <p>
              The companies getting real ROI from AI right now aren&apos;t the ones with the most seats. They&apos;re the ones who took one messy operational process, figured out exactly which steps were just moving information, and built something that does those steps automatically.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The three questions that reframe the whole thing
            </h2>

            <p>
              Before the next budget cycle, ask these:
            </p>

            <p>
              <strong>What process, if it ran automatically, would visibly change our operation?</strong> Not&nbsp;&ldquo;be slightly more efficient.&rdquo; Actually change something — headcount, turnaround time, error volume. If you can&apos;t name a process that meets that bar, you&apos;re not ready to spend more.
            </p>

            <p>
              <strong>Are we buying AI access or AI outcomes?</strong> Platform licenses and tool seats are access. A workflow that runs 500 times a month without anyone touching it is an outcome. You can have both, but be honest about which is which and budget accordingly.
            </p>

            <p>
              <strong>Do we know what winning looks like in 90 days?</strong> The companies stuck in the ROI paradox are measuring the wrong things — executive sentiment surveys, adoption rates, anecdotal feedback. Real operational AI has measurable outputs: volume processed, time saved, errors caught. If your success metric is &ldquo;people are using it,&rdquo; you&apos;re measuring access, not outcomes.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              What breaking out of the paradox looks like
            </h2>

            <p>
              Pick your messiest, most manual process. The one where someone spends Friday afternoons copying data between systems, or where new hires spend their first two weeks learning some arcane handoff ritual.
            </p>

            <p>
              Map every step. Separate the information-moving from the actual judgment calls. The judgment stays human. The information-moving gets automated.
            </p>

            <p>
              Build that one thing. Make it reliable. Measure it for 60 days. Then use that measurement to justify the next one.
            </p>

            <p>
              That&apos;s a slower start than buying a platform license. But the compounding is real — once you have three or four of these running, the operational leverage is significant enough that the finance team stops asking questions.
            </p>

            <p>
              One well-built automation that saves 10 hours a week pays back faster than a $50K platform contract where half the seats go unused.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The honest version
            </h2>

            <p>
              The AI ROI paradox exists because most organizations are buying AI in ways that feel strategic but aren&apos;t operational. More spend, more seats, more vendors — but no specific process that runs differently because of it.
            </p>

            <p>
              Break out of that by getting specific. One process. One measurement. One thing that works before you add another.
            </p>

            <p>
              The paradox isn&apos;t a technology problem. It&apos;s a deployment one. And it has a straightforward fix.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#221D17' }}>
                Not sure which process to automate first?
              </h3>
              <p className="mb-6" style={{ color: '#6F665A' }}>
                The free AI Readiness Quiz takes 5 minutes and tells you which parts of your operation are the most automatable right now — ranked by ROI potential, not complexity.
              </p>
              <a
                href="/quiz"
                className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                style={{ background: '#3B5BDB' }}
              >
                Take the Free Readiness Quiz →
              </a>
            </div>

          </article>

          {/* Footer nav */}
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(75,127,255,0.1)' }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: '#3B5BDB' }}
            >
              ← Back to all posts
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
