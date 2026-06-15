'use client'

import { useState, useEffect } from 'react'

const ACCENT = '#3B5BDB'
const INK = '#221D17'
const MUTED = '#6F665A'

export default function NavLight() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(251,249,245,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid #E7E0D3' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold text-lg" style={{ color: INK }}>
          Groundwork <span style={{ color: ACCENT }}>AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: MUTED }}>
          <a href="/#how" className="transition-opacity hover:opacity-60">How it works</a>
          <a href="/#work" className="transition-opacity hover:opacity-60">Work</a>
          <a href="/#pricing" className="transition-opacity hover:opacity-60">Pricing</a>
          <a href="/blog" className="transition-opacity hover:opacity-60">Blog</a>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a href="/quiz" className="text-sm font-medium transition-opacity hover:opacity-60" style={{ color: MUTED }}>Assessment</a>
          <a
            href="/#book"
            className="text-white text-sm font-semibold px-4 py-2 rounded-full transition-transform hover:-translate-y-0.5"
            style={{ background: ACCENT }}
          >
            Book a call
          </a>
        </div>

        <button className="md:hidden p-1" aria-label="Open menu" onClick={() => setOpen(!open)} style={{ color: INK }}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="19" y2="6" />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="16" x2="19" y2="16" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 py-5 space-y-4 text-sm font-medium" style={{ background: '#FBF9F5', borderTop: '1px solid #E7E0D3', color: MUTED }}>
          <a href="/#how" className="block" onClick={() => setOpen(false)}>How it works</a>
          <a href="/#work" className="block" onClick={() => setOpen(false)}>Work</a>
          <a href="/#pricing" className="block" onClick={() => setOpen(false)}>Pricing</a>
          <a href="/blog" className="block" onClick={() => setOpen(false)}>Blog</a>
          <a href="/quiz" className="block" onClick={() => setOpen(false)}>Assessment</a>
          <a
            href="/#book"
            className="block text-white font-semibold px-4 py-2.5 rounded-full text-center"
            style={{ background: ACCENT }}
            onClick={() => setOpen(false)}
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  )
}
