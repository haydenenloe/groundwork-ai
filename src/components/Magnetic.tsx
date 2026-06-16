'use client'

import { useRef, type ReactNode, type PointerEvent } from 'react'

export default function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${mx * 0.25}px, ${my * 0.4}px)`
  }

  function reset() {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{ display: 'inline-block', transition: 'transform 0.25s ease-out' }}
    >
      {children}
    </span>
  )
}
