import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="py-10" style={{ background: '#FBF9F5', borderTop: '1px solid #E7E0D3' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Logo size={22} />
          <span className="font-semibold" style={{ color: '#221D17' }}>
            Groundwork <span style={{ color: '#3B5BDB' }}>AI</span>
          </span>
        </div>
        <div className="flex gap-6 text-sm" style={{ color: '#6F665A' }}>
          <a href="/#how" className="transition-opacity hover:opacity-60">How it works</a>
          <a href="/#work" className="transition-opacity hover:opacity-60">Work</a>
          <a href="/#pricing" className="transition-opacity hover:opacity-60">Pricing</a>
          <a href="/blog" className="transition-opacity hover:opacity-60">Blog</a>
          <a href="/#book" className="transition-opacity hover:opacity-60">Book a call</a>
        </div>
        <p className="text-xs" style={{ color: '#6F665A' }}>&copy; 2026 Groundwork AI</p>
      </div>
    </footer>
  )
}
