import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Can Run Your Processes. But Only If They\'re Written Down. | Groundwork AI',
  description: 'The bottleneck in most AI deployments isn\'t the technology — it\'s undocumented tribal knowledge sitting in people\'s heads. Here\'s how to fix that before you build anything.',
  openGraph: {
    title: 'AI Can Run Your Processes. But Only If They\'re Written Down.',
    description: 'The bottleneck in most AI deployments isn\'t the technology — it\'s undocumented tribal knowledge sitting in people\'s heads.',
    url: 'https://groundwork-ai.dev/blog/posts/document-before-you-automate',
    type: 'article',
    publishedTime: '2026-06-23',
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
              <span className="text-sm" style={{ color: '#8892A4' }}>June 23, 2026</span>
              <span className="text-sm" style={{ color: '#8892A4' }}>·</span>
              <span className="text-sm" style={{ color: '#8892A4' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#DCE3EF' }}
            >
              AI Can Run Your Processes.<br />
              But Only If They&apos;re Written Down.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#8892A4' }}>
              The bottleneck in most AI deployments isn&apos;t the technology. It&apos;s undocumented tribal knowledge sitting in people&apos;s heads. Here&apos;s how to fix that before you build anything.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#C4CDD9', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              Ask someone on your operations team how they handle a specific recurring task — onboarding a new vendor, processing a refund request, escalating a support ticket. They&apos;ll tell you. Clearly, confidently, in about two minutes.
            </p>

            <p>
              Then ask them to write it down.
            </p>

            <p>
              What comes back is usually a half-page of vague steps with phrases like &ldquo;check with Sarah&rdquo; and &ldquo;use your judgment here.&rdquo; The actual process — the one that runs every day — is living in their head, assembled from three years of trial and error and institutional memory.
            </p>

            <p>
              That&apos;s fine when a human is doing it. It&apos;s a dead end when you want AI to do it.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              AI agents don&apos;t read minds
            </h2>

            <p>
              AI agents can now execute complex, multi-step workflows with almost no latency. They can read emails, query databases, make API calls, write summaries, and route outputs — autonomously, around the clock. The technology is genuinely capable.
            </p>

            <p>
              But every task you hand to an AI agent needs to be specified. Not at a high level. In detail. What triggers it. What data it needs. What decisions it makes, and on what criteria. What happens when something is ambiguous. What the output looks like and where it goes.
            </p>

            <p>
              If you can&apos;t answer those questions in writing before you build, you&apos;re not ready to automate. You&apos;ll build something that handles the easy cases fine and falls apart on anything edge-case — which is exactly where errors are expensive.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              The documentation gap is the automation gap
            </h2>

            <p>
              Most operations teams vastly underestimate how undocumented their processes are. Not because they&apos;re disorganized — but because documentation has never mattered before. When the same three people always handle something, tribal knowledge works fine. Knowledge transfer happens through sitting next to someone for a week, not through written specs.
            </p>

            <p>
              AI changes this completely. You can&apos;t sit an AI agent next to someone for a week. It needs the spec.
            </p>

            <p>
              This is why so many AI automation projects underdeliver. The technology works. The documentation doesn&apos;t exist. So the automation handles 70% of cases well and silently mishandles the other 30% — which is often worse than no automation at all.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              What good process documentation actually looks like
            </h2>

            <p>
              It doesn&apos;t need to be long. It needs to be complete. For any process you want to automate, get answers to these five things before you write a single line of code:
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Trigger:</strong> What causes this process to start? An email arriving? A form submission? A calendar event? A time of day? Be exact.
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Inputs:</strong> What data does the process need to run? Where does each piece come from? What happens if a piece is missing?
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Decision rules:</strong> Where does the process branch? Write the actual rule — not &ldquo;use your judgment,&rdquo; but &ldquo;if X, do Y; if Z, do W; if neither, escalate to [person].&rdquo;
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Output:</strong> What does done look like? Where does the output go, in what format, and who (if anyone) gets notified?
            </p>

            <p>
              <strong style={{ color: '#DCE3EF' }}>Exceptions:</strong> What are the top three ways this goes wrong, and what happens when it does?
            </p>

            <p>
              If you can answer all five for a process, you can build a reliable automation around it. If you get stuck on any of them, that&apos;s the work to do first.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              A side benefit you didn&apos;t expect
            </h2>

            <p>
              Here&apos;s something that comes up constantly: the act of documenting a process for automation surfaces problems in the process itself.
            </p>

            <p>
              When you try to write down every step and every decision rule, you find steps that only exist because of a workaround from three years ago. You find decisions that &ldquo;use your judgment&rdquo; in ways that are actually inconsistent across team members. You find handoffs that slow things down for no real reason.
            </p>

            <p>
              Before you automate anything, you clean it up. The automation you build is faster because the process underneath it is better.
            </p>

            <p>
              This is one reason we tell clients not to automate anything they haven&apos;t documented first — not just because AI needs the spec, but because documentation forces clarity that makes the whole operation tighter.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              Where to start this week
            </h2>

            <p>
              Pick one process. The one that runs the most often, or costs the most time. Sit down with the person who owns it and walk through it step by step. You write it down while they talk — don&apos;t ask them to write it, they&apos;ll underspecify. Ask why at every step. Push until every decision has an explicit rule.
            </p>

            <p>
              By the end of an hour, you&apos;ll either have a solid spec for automation — or you&apos;ll have found the holes that need to be fixed first. Either outcome is valuable.
            </p>

            <p>
              Document it. Then build. In that order.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#DCE3EF' }}>
                Want to know which of your processes are ready to automate?
              </h3>
              <p className="mb-6" style={{ color: '#8892A4' }}>
                The free AI Readiness Quiz identifies your highest-leverage automation opportunities in under 5 minutes — so you know exactly where to start documenting.
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
