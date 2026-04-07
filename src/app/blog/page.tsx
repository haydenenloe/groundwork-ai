import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Groundwork AI',
  description: 'Insights on AI operations, automation, and building production AI systems for B2B companies.',
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16 grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-20">

          {/* Header */}
          <div className="mb-16">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
              style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}
            >
              The Groundwork Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#DCE3EF' }}>
              No fluff. Just <span className="grad-text">operational AI</span>.
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#8892A4' }}>
              Practical guides for operations-heavy businesses building AI systems that actually run.
            </p>
          </div>

          {/* Post list */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                className="block group card-hover rounded-2xl p-8"
                style={{ background: 'rgba(30,45,71,0.4)', border: '1px solid rgba(75,127,255,0.12)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-sm ml-auto" style={{ color: '#8892A4' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h2
                  className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors"
                  style={{ color: '#DCE3EF' }}
                >
                  {post.title}
                </h2>
                <p className="mb-4 leading-relaxed" style={{ color: '#8892A4' }}>
                  {post.summary}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#4B7FFF' }}>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span className="group-hover:underline">Read post →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="text-sm mb-4" style={{ color: '#8892A4' }}>
              Not sure where your AI journey starts?
            </p>
            <a
              href="/quiz"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-colors"
              style={{ background: '#4B7FFF' }}
            >
              Take the Free AI Readiness Quiz →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
