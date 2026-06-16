'use client'

import { useEffect, useRef, useState } from 'react'

const SEQ = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']
const LABELS = ['Email', 'Invoice', 'Follow-up', 'Report', 'Data entry', 'CRM update', 'Reminder', 'Quote', 'Status update']

interface Task { id: number; left: number; label: string; dur: number }

export default function BusyworkGame() {
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(30)
  const [phase, setPhase] = useState<'play' | 'over'>('play')
  const idRef = useRef(0)

  function launch() {
    setScore(0)
    setTime(30)
    setTasks([])
    setPhase('play')
    setOpen(true)
  }
  function close() {
    setOpen(false)
    setTasks([])
  }

  // Konami trigger
  useEffect(() => {
    let idx = 0
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === SEQ[idx]) {
        idx++
        if (idx === SEQ.length) {
          idx = 0
          launch()
        }
      } else {
        idx = k === SEQ[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // timer + spawner while playing
  useEffect(() => {
    if (!open || phase !== 'play') return
    const timer = setInterval(() => setTime((t) => (t <= 1 ? 0 : t - 1)), 1000)
    const spawner = setInterval(() => {
      const id = ++idRef.current
      setTasks((prev) => [
        ...prev,
        { id, left: 6 + Math.random() * 82, label: LABELS[Math.floor(Math.random() * LABELS.length)], dur: 3200 + Math.random() * 1400 },
      ])
    }, 620)
    return () => {
      clearInterval(timer)
      clearInterval(spawner)
    }
  }, [open, phase])

  useEffect(() => {
    if (open && phase === 'play' && time === 0) {
      setPhase('over')
      setTasks([])
    }
  }, [time, open, phase])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Automate the busywork mini game"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(34,29,23,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden flex flex-col"
        style={{ background: '#FBF9F5', border: '1px solid #E7E0D3', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.45)', height: 'min(78vh, 600px)' }}
      >
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #E7E0D3' }}>
          <span className="font-medium text-sm" style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}>Automate the busywork</span>
          <div className="flex items-center gap-4 text-sm" style={{ color: '#6F665A' }}>
            <span>Score <b style={{ color: '#3B5BDB' }}>{score}</b></span>
            <span style={{ minWidth: 28, textAlign: 'right' }}>{time}s</span>
            <button onClick={close} aria-label="Close game" className="leading-none" style={{ color: '#6F665A', fontSize: 18 }}>&times;</button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {phase === 'play' &&
            tasks.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTasks((prev) => prev.filter((x) => x.id !== t.id))
                  setScore((s) => s + 1)
                }}
                onAnimationEnd={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
                className="absolute px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  left: `${t.left}%`,
                  top: '-10%',
                  background: '#FFFFFF',
                  border: '1px solid #E7E0D3',
                  color: '#221D17',
                  boxShadow: '0 4px 12px rgba(34,29,23,0.08)',
                  animation: `gw-fall ${t.dur}ms linear forwards`,
                  cursor: 'pointer',
                }}
              >
                {t.label}
              </button>
            ))}

          {phase === 'play' && (
            <p className="absolute bottom-3 inset-x-0 text-center text-xs px-6" style={{ color: '#8A8170' }}>
              Click the tasks to automate them before they pile up
            </p>
          )}

          {phase === 'over' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <p className="text-sm font-semibold mb-2" style={{ color: '#3B5BDB' }}>Time</p>
              <h3 className="mb-3" style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '2rem', color: '#221D17' }}>You automated {score} tasks.</h3>
              <p className="text-sm leading-relaxed mb-7 max-w-xs" style={{ color: '#6F665A' }}>
                That was you clicking. Imagine it running on its own, every day, while your team does the work that matters.
              </p>
              <div className="flex gap-3">
                <button onClick={launch} className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: '#FFFFFF', border: '1px solid #E7E0D3', color: '#221D17' }}>Play again</button>
                <a href="#book" onClick={close} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: '#3B5BDB' }}>Book a call</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
