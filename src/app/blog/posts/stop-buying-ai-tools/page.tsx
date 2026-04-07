import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stop Buying AI Tools. Start Building AI Workflows. | Groundwork AI',
  description: 'Most companies have an AI budget but not an AI strategy. Here\'s the difference between tools that sit unused and workflows that actually cut costs.',
  openGraph: {
    title: 'Stop Buying AI Tools. Start Building AI Workflows.',
    description: 'Most companies have an AI budget but not an AI strategy.',
    url: 'https://groundwork-ai.dev/blog/stop-buying-ai-tools',
    type: 'article',
    publishedTime: '2026-04-07',
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
              <span className="text-sm" style={{ color: '#8892A4' }}>April 7, 2026</span>
              <span className="text-sm" style={{ color: '#8892A4' }}>·</span>
              <span className="text-sm" style={{ color: '#8892A4' }}>5 min read</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
              style={{ color: '#DCE3EF' }}
            >
              Stop Buying AI Tools.<br />
              Start Building AI Workflows.
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: '#8892A4' }}>
              Most companies have an AI budget. Almost none have an AI strategy. Here&apos;s what that distinction is costing them.
            </p>
          </header>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ background: 'rgba(75,127,255,0.15)' }} />

          {/* Post content */}
          <article className="prose-custom space-y-6" style={{ color: '#C4CDD9', lineHeight: '1.8', fontSize: '1.0625rem' }}>

            <p>
              Ask any operations manager what AI tools their company uses. You&apos;ll get a list. ChatGPT, Notion AI, a Zapier account someone set up last year, maybe a $300/month tool that three people tried once at an offsite.
            </p>

            <p>
              Then ask them what those tools have automated. Silence.
            </p>

            <p>
              That&apos;s the problem. Companies are buying AI tools the way they used to buy enterprise software — on the assumption that having access to the technology is the same as using it. It&apos;s not.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              Tools are passive. Workflows are active.
            </h2>

            <p>
              A tool sits there waiting for someone to open it. A workflow runs when the trigger fires — whether anyone is paying attention or not.
            </p>

            <p>
              The difference sounds obvious until you look at your own stack. Most AI subscriptions are tools. They require a human to initiate, prompt, and act on the output. That&apos;s not automation — that&apos;s assisted manual labor. Still valuable, but not what the ROI case is built on.
            </p>

            <p>
              A workflow is different. An email arrives → AI reads it, categorizes it, logs the key data to your CRM, and routes it to the right person. Nobody opened a tab. Nobody typed a prompt. The work just happened.
            </p>

            <p>
              That&apos;s what &ldquo;AI in operations&rdquo; actually means when it&apos;s working.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              Where to find your first workflow
            </h2>

            <p>
              Don&apos;t start with strategy. Start with a person.
            </p>

            <p>
              Pick someone on your team who does the same task every day or every week. Not a complex judgment call — a repeatable thing. Processing invoices. Summarizing call notes. Routing support tickets. Moving data from one system to another. Filling out a report from numbers that already exist somewhere.
            </p>

            <p>
              Shadow them for one hour. Write down every step. Pay close attention to the steps that are just moving information — reading something, then copying the relevant part somewhere else. That&apos;s your workflow candidate.
            </p>

            <p>
              The standard we use: if a reasonably smart person could do it in their first week on the job using only what&apos;s on their screen, AI can probably do it automatically.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              The math is simpler than you think
            </h2>

            <p>
              Take that repeatable task. Estimate the honest hours per week it costs. Multiply by 52. Multiply by the fully-loaded cost per hour for the person doing it (salary ÷ 2,000 is a decent ballpark).
            </p>

            <p>
              Three hours a week for a $60K employee: that&apos;s about $4,500 a year in labor cost on a single task. One workflow, built once, eliminates it. Build five workflows and you&apos;re looking at $20–25K in annual labor savings — before you count error reduction, faster turnaround, or the fact that the person now has time for work that actually requires their brain.
            </p>

            <p>
              Most of the workflows we build cost between $5K and $25K to implement. The payback period on the labor math alone is typically under 12 months. That&apos;s before you factor in the compounding — once a workflow exists, it scales without adding headcount.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              Why the tool-first approach fails
            </h2>

            <p>
              When companies buy tools first, they&apos;re betting that their employees will figure out how to apply them. Sometimes they do. More often, the tool gets used for a few weeks, the novelty wears off, and it goes dormant. The subscription keeps renewing.
            </p>

            <p>
              The workflow-first approach flips this. You identify the specific process, design the automation around it, and the system runs whether anyone thinks about it or not. Adoption isn&apos;t a change management problem — the workflow doesn&apos;t care if people remember to use it.
            </p>

            <p>
              This is why the companies actually getting ROI from AI right now aren&apos;t the ones with the most tools. They&apos;re the ones who picked three or four specific processes and built reliable automation around each one.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#DCE3EF' }}>
              What to do this week
            </h2>

            <p>
              Pick one person. One task. Write down every step. Ask: is each step moving information, or is it actual human judgment?
            </p>

            <p>
              The information-moving steps are your automation target. The judgment steps stay human — for now.
            </p>

            <p>
              Build the workflow. Run it for 30 days. Measure the hours saved. Then pick the next one.
            </p>

            <p>
              That&apos;s the whole strategy. It&apos;s not glamorous, but it compounds fast.
            </p>

            {/* CTA Section */}
            <div
              className="rounded-2xl p-8 mt-12"
              style={{ background: 'rgba(75,127,255,0.06)', border: '1px solid rgba(75,127,255,0.15)' }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: '#DCE3EF' }}>
                Not sure where your first workflow is?
              </h3>
              <p className="mb-6" style={{ color: '#8892A4' }}>
                The free AI Readiness Quiz helps you identify which parts of your operation are the most automatable — and gives you a prioritized starting point in under 5 minutes.
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
