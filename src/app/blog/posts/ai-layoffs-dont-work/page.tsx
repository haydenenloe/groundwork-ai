import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cutting Headcount with AI Isn\'t a Strategy | Groundwork AI',
  description: 'A Gartner study found that 80% of companies used AI to cut staff — and none of it correlated to better ROI. Here\'s what the companies actually winning with AI are doing instead.',
  openGraph: {
    title: 'Cutting Headcount with AI Isn\'t a Strategy. Here\'s What Actually Works.',
    description: 'A Gartner study found that 80% of companies used AI to cut staff — and none of it correlated to better ROI.',
    url: 'https://groundwork-ai.dev/blog/ai-layoffs-dont-work',
    type: 'article',
    publishedTime: '2026-05-12',
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
              <span className="text-sm" style={{ color: '#6F665A' }}>May 12, 2026</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>·</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Cutting Headcount with AI Isn&apos;t a Strategy.<br />
              Here&apos;s What Actually Works.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#6F665A' }}>
              A Gartner study just confirmed what the numbers have been hinting at for two years: using AI to cut staff doesn&apos;t generate better returns. Here&apos;s what does.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#221D17', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              Gartner published a study this week that should make a lot of executives uncomfortable. Eighty percent of companies surveyed had reduced headcount using AI automation. And there was zero correlation between those layoffs and higher return on investment.
            </p>

            <p>
              Zero. Not weak correlation. Not mixed results. No relationship at all.
            </p>

            <p>
              If your AI strategy is &ldquo;cut costs by eliminating people,&rdquo; the data says that strategy isn&apos;t working. And if you look at how most of these implementations were actually built, it&apos;s not hard to see why.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              Headcount reduction is the wrong target
            </h2>

            <p>
              When a company decides to use AI to eliminate roles, they usually start by identifying who to cut and then work backwards to justify it. That&apos;s not AI strategy — that&apos;s cost-cutting with extra steps.
            </p>

            <p>
              The problem is that eliminating a person doesn&apos;t eliminate their work. It redistributes it. The tasks that person was doing either get absorbed by remaining staff (who are now stretched thin), get dropped entirely (which surfaces as errors six months later), or get handed to an AI system that wasn&apos;t actually designed to handle them end-to-end.
            </p>

            <p>
              None of those outcomes are clean. None of them look like ROI on a spreadsheet.
            </p>

            <p>
              The companies seeing real returns from AI aren&apos;t asking &ldquo;who can we cut?&rdquo; They&apos;re asking &ldquo;where is our operation leaking capacity?&rdquo; That&apos;s a completely different question, and it leads to completely different results.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The right framing: capacity, not headcount
            </h2>

            <p>
              Every operations-heavy business has the same problem hidden inside it. There are tasks that require judgment, relationships, and expertise — the stuff your best people do. And there are tasks that just require attention, time, and consistency — data entry, report generation, routing, status updates, formatting, logging.
            </p>

            <p>
              Right now, the same people doing both. Your account manager is writing emails to clients <em>and</em> manually copying deal notes into your CRM. Your operations lead is making real decisions <em>and</em> formatting the same weekly report she&apos;s formatted 80 times. Your support team is solving real problems <em>and</em> routing tickets that a basic ruleset could handle.
            </p>

            <p>
              AI doesn&apos;t need to replace anyone to create value. It needs to absorb the second category of work so the first category gets done better and faster.
            </p>

            <p>
              That&apos;s where ROI actually lives. Not in fewer people — in the same people doing more of the work that matters.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              What winning implementations look like
            </h2>

            <p>
              The businesses getting real returns from AI this year share a few patterns.
            </p>

            <p>
              First, they started with specific processes, not general capabilities. They didn&apos;t deploy a company-wide AI initiative — they automated invoice processing, or client onboarding intake, or weekly reporting. Specific, measurable, repeatable.
            </p>

            <p>
              Second, they measured actual output, not tool adoption. The question wasn&apos;t &ldquo;are people using the AI?&rdquo; It was &ldquo;how many invoices processed per day, and what&apos;s the error rate?&rdquo; Hard numbers on the process the AI touched.
            </p>

            <p>
              Third, they let the same team do more — they didn&apos;t immediately cut. When a workflow gets automated, the person who used to do it doesn&apos;t disappear from the org chart. They shift to work that was previously backlogged or neglected. Volume goes up. Quality improves. Customers notice. That&apos;s where revenue impact comes from, and it shows up in ways that are harder to attribute but very real.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The honest conversation to have internally
            </h2>

            <p>
              If your company is planning an AI rollout with headcount reduction as the primary metric, slow down and ask a harder question: are you trying to build a more capable operation, or are you trying to hit a cost number that&apos;s already been committed to on a slide deck?
            </p>

            <p>
              Those are different problems. AI can help with the first one. It&apos;s a bad solution for the second — and Gartner just put data behind that claim.
            </p>

            <p>
              The companies that will win over the next three years are building operations where AI handles the repeatable work and their people handle the judgment-intensive work. That combination scales. Cutting headcount and hoping the AI covers the gap does not.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              A practical starting point
            </h2>

            <p>
              Pick one process in your operation that happens on a regular schedule and requires no real judgment — just attention and accuracy. Calculate how many hours per week it consumes across your team. That&apos;s your baseline.
            </p>

            <p>
              Automate that process. Measure the hours recovered. Then ask what your team does with those hours.
            </p>

            <p>
              If the answer is &ldquo;more of the work we didn&apos;t have time for,&rdquo; you&apos;re building something real. That&apos;s how operational AI actually pays off.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#221D17' }}>
                Want to know where AI can actually move the needle in your operation?
              </h3>
              <p className="mb-6" style={{ color: '#6F665A' }}>
                The free AI Readiness Quiz takes 5 minutes and shows you which parts of your business are the highest-leverage automation targets — before you spend a dollar on implementation.
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
