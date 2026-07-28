import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "You're Measuring AI ROI Wrong. That's Why You Keep Underfunding It. | Groundwork AI",
  description: 'Most operations teams only count labor savings when they evaluate AI. That leaves 30–60% of the actual value unmeasured — and kills future investment before it starts.',
  openGraph: {
    title: "You're Measuring AI ROI Wrong. That's Why You Keep Underfunding It.",
    description: 'Most operations teams only count labor savings when they evaluate AI. That leaves 30–60% of the actual value unmeasured.',
    url: 'https://groundwork-ai.dev/blog/posts/measuring-ai-roi-wrong',
    type: 'article',
    publishedTime: '2026-07-28',
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
                AI Operations
              </span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#3B5BDB' }}
              >
                ROI
              </span>
              <span className="text-sm" style={{ color: '#6F665A' }}>July 28, 2026</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>·</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}
            >
              You&apos;re Measuring AI ROI Wrong.<br />
              That&apos;s Why You Keep Underfunding It.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#6F665A' }}>
              Most operations teams only count labor savings when they evaluate AI. That leaves 30–60% of the actual value unmeasured — and kills future investment before it starts.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#221D17', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              Here&apos;s a pattern we see constantly: a company builds an AI automation, it works, they measure the hours saved, the number looks modest, and leadership decides it&apos;s &ldquo;interesting but not transformative.&rdquo; The project gets quietly shelved. The person who championed it stops championing.
            </p>

            <p>
              The automation was doing its job. The measurement was broken.
            </p>

            <p>
              According to workflow automation research from i3solutions, enterprise teams miss 30–60% of actual automation value because they measure only labor savings. They count the easy number — hours multiplied by hourly cost — and ignore everything else that changed when the automation went live.
            </p>

            <p>
              That incomplete picture is costing you more than bad ROI reports. It&apos;s killing your own investment case.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              What labor savings actually miss
            </h2>

            <p>
              Labor savings are the floor, not the ceiling. If an automation saves someone three hours a week, that&apos;s the floor. Here&apos;s what usually doesn&apos;t make it into the calculation:
            </p>

            <p>
              <strong>Error reduction.</strong> Manual data entry has a well-documented error rate of around 1% per field. Doesn&apos;t sound like much until you think about what happens downstream: a wrong invoice amount, a misrouted support ticket, a customer record with the wrong contact. Each error costs someone time to catch and fix — usually more time than the original entry took. Automations that eliminate manual entry don&apos;t just save hours. They remove a whole error category.
            </p>

            <p>
              <strong>Cycle time compression.</strong> A process that used to take 48 hours because it had to wait on a person can now finish in 4 minutes. That speed change rarely shows up in labor savings math, but it shows up everywhere else: faster client turnaround, fewer bottlenecks, shorter cash conversion cycles. If you run a service business and invoices go out 3 days faster because your intake automation triggers billing automatically, that&apos;s real money — just not measured in hours.
            </p>

            <p>
              <strong>Capacity expansion without headcount.</strong> This one is the hardest to see because it&apos;s counterfactual. The automation didn&apos;t save you three hours — it let you handle 40% more volume without adding staff. You didn&apos;t need to hire the extra person. That&apos;s savings too, but it never appears in any spreadsheet because the hire never happened.
            </p>

            <p>
              <strong>Employee quality improvement.</strong> The people freed from repetitive work start doing better work. This is soft but real. A customer success manager who spends two fewer hours per week on data entry spends two more hours building relationships. Over a quarter, that compounds.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              How to measure it right
            </h2>

            <p>
              You don&apos;t need a complex framework. You need four numbers before you build anything, and the same four numbers 90 days later.
            </p>

            <p>
              <strong>Time per instance.</strong> How long does this process take, end to end, right now? Not just one person&apos;s contribution — the full cycle time from trigger to completion.
            </p>

            <p>
              <strong>Error rate.</strong> What percentage of instances have a mistake that requires rework? Even a rough estimate beats nothing.
            </p>

            <p>
              <strong>Volume.</strong> How many times does this happen per week? Per month? What&apos;s the growth trajectory?
            </p>

            <p>
              <strong>Downstream cost of delay.</strong> If this process takes longer than it should, what does that cost? Late invoices, slow onboarding, missed SLAs — pick the one that matters in your context.
            </p>

            <p>
              Measure those four things before the automation goes live. Then measure them again at 30, 60, and 90 days. The gap between before and after across all four is your actual ROI — not just the labor line.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              Why this matters for your budget
            </h2>

            <p>
              Only about 25% of AI initiatives deliver their expected ROI, according to IBM&apos;s CEO study. That&apos;s a damning stat until you realize it includes every organization measuring ROI the lazy way.
            </p>

            <p>
              If you measure only labor savings, your automation looks like a $4,500-a-year win. Measured fully — errors prevented, cycle time cut, capacity unlocked — it might be a $15,000–$20,000 annual impact. Same automation. Different measurement. Very different conversation with your finance team when you ask for budget to build the next one.
            </p>

            <p>
              The companies actually scaling AI right now are the ones who understood early that the ROI story has to be told right. Not inflated, not made up — just complete. Every category of value measured and documented.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              One thing to do this week
            </h2>

            <p>
              Go back to your last automation project. Pull up whatever you used to measure it. Count how many of the four categories you captured. If it was only labor savings, take 30 minutes and estimate the other three.
            </p>

            <p>
              Odds are good you&apos;ll find the project delivered more than you reported. That matters — because the person who gets credit for a $20K win gets budget to build the next one. The person who got credit for a $4,500 win is still waiting for approval.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#221D17' }}>
                Want to know what your operations are actually worth automating?
              </h3>
              <p className="mb-6" style={{ color: '#6F665A' }}>
                The free AI Readiness Quiz takes under 5 minutes and tells you which parts of your operation have the highest automation potential — so you&apos;re building the case around the right processes from the start.
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
