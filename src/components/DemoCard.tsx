import { PlayCircle } from 'lucide-react'

const SURFACE = '#FFFFFF'
const INK = '#221D17'
const MUTED = '#6F665A'
const LINE = '#E7E0D3'
const ACCENT = '#3B5BDB'

/**
 * Video demo card. Pass a Loom share ID to embed the recording;
 * without one it renders a "coming soon" placeholder so the section
 * can ship before the videos are recorded.
 */
export default function DemoCard({
  loomId,
  tag,
  title,
  blurb,
}: {
  loomId?: string
  tag: string
  title: string
  blurb: string
}) {
  return (
    <div
      className="card-hover rounded-2xl overflow-hidden h-full flex flex-col"
      style={{ background: SURFACE, border: `1px solid ${LINE}` }}
    >
      <div className="relative w-full" style={{ aspectRatio: '16 / 9', background: 'rgba(59,91,219,0.06)' }}>
        {loomId ? (
          <iframe
            src={`https://www.loom.com/embed/${loomId}?hideEmbedTopBar=true`}
            title={title}
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
            <PlayCircle size={38} style={{ color: ACCENT }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
              Demo video coming this week
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>{tag}</p>
        <h3 className="font-semibold mb-2" style={{ color: INK }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{blurb}</p>
      </div>
    </div>
  )
}
