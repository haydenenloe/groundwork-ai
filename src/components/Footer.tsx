import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: '#1E2D47', background: '#0C1525' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size={22} />
          <span className="font-bold tracking-tight" style={{ color: '#DCE3EF' }}>
            Groundwork <span style={{ color: '#4B7FFF' }}>AI</span>
          </span>
        </div>

        <div className="flex gap-6 text-sm" style={{ color: '#4A5568' }}>
          <a href="/#services" className="hover:text-subtle transition-colors">Services</a>
          <a href="/#capabilities" className="hover:text-subtle transition-colors">What We Build</a>
          <a href="/#quiz" className="hover:text-subtle transition-colors">Quiz</a>
          <a href="/#audit" className="hover:text-subtle transition-colors">Book an Audit</a>
        </div>

        <p className="text-xs" style={{ color: '#4A5568' }}>© 2026 Groundwork AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
