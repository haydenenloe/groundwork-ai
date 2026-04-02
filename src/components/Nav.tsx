'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      id="nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Logo size={28} />
          <span className="font-bold text-lg tracking-tight" style={{ color: '#DCE3EF' }}>
            Groundwork <span style={{ color: '#4B7FFF' }}>AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#8892A4' }}>
          <a href="/#services" className="hover:text-body transition-colors">Services</a>
          <a href="/#capabilities" className="hover:text-body transition-colors">What We Build</a>
          <a href="/#process" className="hover:text-body transition-colors">Process</a>
          <a href="/#quiz" className="hover:text-body transition-colors">Readiness Quiz</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/#quiz" className="text-sm font-medium transition-colors px-4 py-2" style={{ color: '#8892A4' }}>
            Take the Quiz
          </a>
          <a
            href="/#audit"
            className="text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            style={{ background: '#4B7FFF' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#7AA3FF')}
            onMouseLeave={e => (e.currentTarget.style.background = '#4B7FFF')}
          >
            Book an Audit
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 transition-colors"
          style={{ color: '#8892A4' }}
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="19" y2="6"/>
            <line x1="3" y1="11" x2="19" y2="11"/>
            <line x1="3" y1="16" x2="19" y2="16"/>
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-3 text-sm font-medium" style={{ background: '#0C1525', borderColor: '#1E2D47', color: '#8892A4' }}>
          <a href="/#services" className="block py-1 hover:text-body" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="/#capabilities" className="block py-1 hover:text-body" onClick={() => setMenuOpen(false)}>What We Build</a>
          <a href="/#process" className="block py-1 hover:text-body" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="/#quiz" className="block py-1 hover:text-body" onClick={() => setMenuOpen(false)}>Readiness Quiz</a>
          <a
            href="/#audit"
            className="block mt-3 text-white font-semibold px-5 py-3 rounded-lg text-center"
            style={{ background: '#4B7FFF' }}
            onClick={() => setMenuOpen(false)}
          >
            Book an Audit ($2,500)
          </a>
        </div>
      )}
    </header>
  )
}
