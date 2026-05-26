import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Your Operations Aren\'t AI-Ready. Here\'s How to Tell. | Groundwork AI',
  description: 'Most companies try to deploy AI before they know what they\'re automating. Here are the four signs your operations aren\'t ready — and what to fix first.',
  openGraph: {
    title: 'Your Operations Aren\'t AI-Ready. Here\'s How to Tell.',
    description: 'Most companies try to deploy AI before they know what they\'re automating. Here are the four signs your operations aren\'t ready.',
    url: 'https://groundwork-ai.dev/blog/your-operations-arent-ai-ready',
    type: 'article',
    publishedTime: '2026-05-26',
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
            style={{ color: '#4B7FFF' }}
          >
            ← All Posts
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}
              >
                AI Operations
              </span>
              <span className="text-sm" style={{ color: '#8892A4' }}>May 26, 2026</span>
              <span className="text-sm" style={{ color: '#8892A4' }}>·</span>
              <span className="text-sm" style={{ color: '#8892A4' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#DCE3EF' }}
            >
              Your Operations Aren&apos;t AI-Ready.<br />
              Here&apos;s How to Tell.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#8892A4' }}>
              Most companies try to deploy AI before they know what they&apos;re automating. That&apos;s not an AI problem — it&apos;s an operations problem. And it&apos;s fixable.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#C4CDD9', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              Most companies approaching AI automation have the same problem: they want to automate before they know what they&apos;re automating.
            </p>

            <p>
              That sounds obvious. But look at how most AI projects actually start. Someone sees a demo, gets excited, buys a platform, and then goes looking for problems to solve with it. Tool first, problem second.
            </p>

            <p>
              The companies seeing real returns from AI do it backwards. They start with the operational reality — where work actually gets stuck, where humans are doing things machines could do — and then they figure out what kind of AI solves it.
            </p>

            <p>
              That discipline starts with one honest question: are your operations AI-ready?
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              What &ldquo;AI-ready&rdquo; actually means
            </h2>

            <p>
              AI-ready doesn&apos;t mean you have fancy software or a data science team. It means three specific things.
            </p>

            <p>
              Your processes are documented at the step level, not the department level. Not &ldquo;we handle customer onboarding&rdquo; — that&apos;s a category. &ldquo;We receive a signed contract, then someone manually copies the data into our CRM, then someone else sends the welcome email, then someone sets up the account in the billing system&rdquo; — that&apos;s a process AI can actually touch.
            </p>

            <p>
              Your data flows have clear inputs and outputs. AI works best when it&apos;s reading something specific and writing something specific. If your process involves someone &ldquo;using their judgment&rdquo; to figure out what data means or where it goes, that&apos;s a human dependency. Not a blocker — just a step that needs to stay human for now.
            </p>

            <p>
              Your definitions are consistent. The same word means the same thing every time. A &ldquo;lead&rdquo; is the same thing in your CRM as it is in your sales team&apos;s language as it is in your reporting. Inconsistent definitions are the biggest hidden obstacle in AI deployment — the model learns the wrong thing and produces outputs nobody trusts.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              The four signs your operations aren&apos;t ready
            </h2>

            <p>
              <strong style={{ color: '#DCE3EF' }}>You have tribal knowledge that isn&apos;t documented.</strong> If the answer to &ldquo;how does this work?&rdquo; is &ldquo;ask Sarah,&rdquo; that process isn&apos;t automatable. Sarah is the system. AI can&apos;t replace a person who exists because no one wrote anything down.
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Your data lives in email threads or PDFs.</strong> If your process involves someone reading an email and typing information into a spreadsheet, you have a data flow problem, not an AI problem. The AI can eventually replace that human step — but first you need to admit the flow exists and map it out. Until you do, you&apos;re automating a mess.
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Your outputs are &ldquo;it depends.&rdquo;</strong> A good automation produces a predictable output given a predictable input. If your team&apos;s answer to &ldquo;what happens when X occurs?&rdquo; is frequently &ldquo;it depends on the situation,&rdquo; you&apos;re dealing with either undefined process or genuine judgment calls. Both need human attention before they need AI.
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Nobody agrees on what success looks like.</strong> AI projects stall when there&apos;s no clear definition of done. &ldquo;Automate our sales process&rdquo; is not a success criterion. &ldquo;Reduce time-to-quote from 48 hours to 4 hours&rdquo; is. If you can&apos;t put a number on it before you start, you won&apos;t be able to prove anything when it&apos;s running.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              What to fix before you deploy anything
            </h2>

            <p>
              Pick one department. Pick one process within that department. Write down every step, even the ones that feel too small to mention. Especially those.
            </p>

            <p>
              For each step, ask: is this step moving information, or is it creating new information? Moving information — reading something, then copying the relevant part somewhere else — is a prime automation target. Creating new information — writing analysis, making judgment calls, producing original decisions — stays human.
            </p>

            <p>
              Then look at your data. Is each step reading from a single defined source? Is it writing to a single defined destination? Or is it pulling from multiple places, or dumping results into whoever&apos;s email inbox is convenient that week?
            </p>

            <p>
              That map is your AI readiness picture. You don&apos;t need a consultant to run this exercise. You need two hours and honest answers from the people actually doing the work.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              The uncomfortable truth
            </h2>

            <p>
              Most businesses aren&apos;t AI-ready — not because they&apos;re behind, but because nobody asked these questions before the AI conversation started. The market has been selling AI solutions before anyone mapped the problems.
            </p>

            <p>
              IBM&apos;s 2025 study of 2,000 CEOs found only 25% of AI initiatives delivered expected ROI. That number doesn&apos;t mean AI doesn&apos;t work. It means three out of four companies skipped the ops work first.
            </p>

            <p>
              The companies that do this work up front will build AI systems that actually run. The ones that skip it will have expensive experiments that never quite scale — and a growing pile of SaaS subscriptions to show for it.
            </p>

            <p>
              It&apos;s not a glamorous starting point. But a well-documented process that&apos;s ready for automation is worth more than any platform you could buy today.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#DCE3EF' }}>
                Not sure if your operations are AI-ready?
              </h3>
              <p className="mb-6" style={{ color: '#8892A4' }}>
                The free AI Readiness Quiz takes about 5 minutes and gives you a specific breakdown of where you stand — including which processes are most worth automating first, and what&apos;s blocking you from getting there.
              </p>
              <a
                href="/quiz"
                className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                style={{ background: '#4B7FFF' }}
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
              style={{ color: '#4B7FFF' }}
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
