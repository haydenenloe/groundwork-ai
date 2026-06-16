'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroFX() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!root || !canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      w = root.clientWidth
      h = root.clientHeight
      canvas.width = Math.max(1, w * DPR)
      canvas.height = Math.max(1, h * DPR)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()

    const count = Math.max(14, Math.min(34, Math.floor(w / 42)))
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }))

    const onMove = (e: globalThis.PointerEvent) => {
      const r = root.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
        mouse.x = x
        mouse.y = y
        if (!reduced) setSpot({ x, y })
      } else {
        mouse.x = -9999
        mouse.y = -9999
        setSpot(null)
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', resize)

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130 && dist > 0.01) {
            n.x += (dx / dist) * 0.4
            n.y += (dy / dist) * 0.4
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(59,91,219,${0.13 * (1 - d / 120)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(59,91,219,0.4)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {spot && (
        <div
          className="absolute rounded-full"
          style={{
            left: spot.x,
            top: spot.y,
            width: 480,
            height: 480,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(59,91,219,0.12) 0%, rgba(255,176,102,0.07) 38%, transparent 70%)',
            transition: 'left 0.12s ease-out, top 0.12s ease-out',
          }}
        />
      )}
    </div>
  )
}
