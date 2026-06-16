import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Your AI Automation Is Running. So Why Aren\'t You Saving Money? | Groundwork AI',
  description: 'Most businesses automate the wrong things — and measure the results wrong. Here\'s the real reason your AI isn\'t showing up in the numbers.',
  openGraph: {
    title: 'Your AI Automation Is Running. So Why Aren\'t You Saving Money?',
    description: 'Most businesses automate the wrong things — and measure the results wrong.',
    url: 'https://groundwork-ai.dev/blog/posts/ai-automation-roi-gap',
    type: 'article',
    publishedTime: '2026-05-19',
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
              <span className="text-sm" style={{ color: '#6F665A' }}>May 19, 2026</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>·</span>
              <span className="text-sm" style={{ color: '#6F665A' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Your AI Automation Is Running.<br />
              So Why Aren&apos;t You Saving Money?
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#6F665A' }}>
              Most businesses automate the wrong things — and then measure the results wrong. Here&apos;s the real reason your AI isn&apos;t showing up in the numbers.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#221D17', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              Something strange happens about six months into a business automation project. The workflows are live. The dashboards are green. The team says the tool is &ldquo;working.&rdquo; But when you look at the financials or the headcount or the throughput numbers, nothing has meaningfully changed.
            </p>

            <p>
              This isn&apos;t rare. It&apos;s the default outcome for most AI automation projects. And the reason almost always traces back to one of two problems: you automated the wrong step, or you&apos;re measuring the wrong thing.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The wrong step problem
            </h2>

            <p>
              Imagine a ten-step process. Each step takes roughly equal time. You automate step four. It now runs in seconds instead of fifteen minutes. The automation is technically a success.
            </p>

            <p>
              But the person doing this process is still doing the other nine steps. You saved them fifteen minutes in a two-hour process. They didn&apos;t get their afternoon back. They filled those fifteen minutes with something else. Nothing got faster on a timeline that actually matters to a customer or the business.
            </p>

            <p>
              This is the most common AI automation failure mode. Teams pick a step because it&apos;s technically easy to automate, not because it&apos;s the constraint. You get a working workflow that doesn&apos;t change anything.
            </p>

            <p>
              The fix is to start with the constraint, not the convenience. What&apos;s the step that, if it disappeared, would make everything downstream faster? Automate that first. If you&apos;re not sure, map the full process and find where work accumulates — where jobs pile up waiting for the next person to get to them. That backlog is your constraint. That&apos;s your target.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The wrong measurement problem
            </h2>

            <p>
              Most companies measure AI adoption, not AI impact. They track how many people are using the tool, how many workflows have run, how many hours the system has been active. These numbers go up. Everyone feels good. The ROI never materializes.
            </p>

            <p>
              Activity metrics tell you the automation is running. They don&apos;t tell you whether anything that matters changed.
            </p>

            <p>
              The right question is always: what business outcome were we trying to move? Then measure that — not the automation itself.
            </p>

            <p>
              If you automated invoice processing to close the books faster, measure days-to-close. If you automated customer onboarding to reduce churn in the first 30 days, measure 30-day retention. If you automated lead routing to get faster follow-up, measure time-to-first-contact. These are the numbers your finance team or your board actually cares about.
            </p>

            <p>
              If you can&apos;t name the business outcome before you build the automation, you probably shouldn&apos;t build it yet.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              The broken process problem (bonus)
            </h2>

            <p>
              There&apos;s a third failure mode nobody likes to talk about: automating a process that was already broken.
            </p>

            <p>
              Automation doesn&apos;t fix bad process design. It accelerates it. If your manual data entry was introducing errors at a rate of 3%, your automated data entry will introduce those same errors faster and at higher volume. You&apos;ve just made the problem more efficient.
            </p>

            <p>
              Before you automate anything, run it manually and deliberately for two weeks while you document every exception, every workaround, every time someone says &ldquo;oh, usually we handle it this way but sometimes it&apos;s different.&rdquo; Those edge cases are your automation risk surface. Either build for them or clean up the process first.
            </p>

            <p>
              The companies that get real ROI from AI automation are almost never the ones who moved fastest. They&apos;re the ones who spent two weeks understanding the process, automated the right step, and measured the business outcome — not the tool usage.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#221D17' }}>
              A quick diagnostic
            </h2>

            <p>
              If you have automation running and you&apos;re not seeing results, ask three questions:
            </p>

            <p>
              One — is the step we automated actually the constraint, or just the easiest step to touch? If it&apos;s not the constraint, find the real one.
            </p>

            <p>
              Two — what business outcome were we trying to move? Can we point to a number? If not, define it now and start measuring.
            </p>

            <p>
              Three — was the underlying process clean before we automated it? If there were lots of exceptions and workarounds, the automation is probably propagating those instead of eliminating them.
            </p>

            <p>
              Answer those three honestly and you&apos;ll know exactly where your ROI gap is.
            </p>

            <p>
              Most of the time, the automation itself is fine. The problem is everything around it.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#221D17' }}>
                Not sure which processes are actually worth automating?
              </h3>
              <p className="mb-6" style={{ color: '#6F665A' }}>
                The free AI Readiness Quiz helps you identify where automation will actually move the needle for your business — and where you&apos;d just be spinning wheels. Takes under 5 minutes.
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
