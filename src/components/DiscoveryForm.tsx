'use client'

import { useEffect, useRef, useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type ProcessEntry = {
  name: string
  whatItIs: string
  whoDoesIt: string
  frequency: string
  volume: string
  timeSpent: string
  toolsUsed: string
  stepByStep: string
  whatGoesWrong: string
  successLooksLike: string
}

const emptyProcess = (): ProcessEntry => ({
  name: '',
  whatItIs: '',
  whoDoesIt: '',
  frequency: '',
  volume: '',
  timeSpent: '',
  toolsUsed: '',
  stepByStep: '',
  whatGoesWrong: '',
  successLooksLike: '',
})

const PROCESS_FIELDS: Array<{
  key: keyof ProcessEntry
  label: string
  hint?: string
  type: 'text' | 'textarea'
  placeholder?: string
}> = [
  { key: 'name', label: 'What do you call this process?', type: 'text', placeholder: 'Maintenance requests, Monthly owner reports…' },
  { key: 'whatItIs', label: 'What happens in it?', hint: 'In your own words, what is this process for?', type: 'textarea' },
  { key: 'whoDoesIt', label: 'Who handles it?', type: 'text', placeholder: 'Two office staff, mostly me…' },
  { key: 'frequency', label: 'How often does it happen?', type: 'text', placeholder: 'Daily, every time a customer calls, monthly…' },
  { key: 'volume', label: 'Roughly how many?', type: 'text', placeholder: 'About 250 a month, more in winter…' },
  { key: 'timeSpent', label: 'How much time does it take?', type: 'text', placeholder: '10 min each, or 4 days a month…' },
  { key: 'toolsUsed', label: 'What tools are involved?', type: 'text', placeholder: 'The software, spreadsheets, inboxes it touches' },
  {
    key: 'stepByStep',
    label: 'Walk us through it, start to finish',
    hint: 'Step by step, exactly how it works today. This is the single most useful thing you can give us.',
    type: 'textarea',
  },
  {
    key: 'whatGoesWrong',
    label: "What's most painful, or breaks most often?",
    hint: 'Where does it fall apart, and what does it cost you when it does?',
    type: 'textarea',
  },
  { key: 'successLooksLike', label: 'If this worked perfectly, what would change?', type: 'textarea' },
]

const AI_LEVELS = [
  "We haven't really used it at all",
  'A few people use ChatGPT or similar now and then',
  'We use AI tools regularly, but nothing runs on its own',
  "We've built some automations already",
  'We have automations running in production',
]

const STORAGE_KEY = 'gw-discovery-v1'

export default function DiscoveryForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [savedNote, setSavedNote] = useState('')
  const [contact, setContact] = useState({ name: '', email: '', company: '', role: '' })
  const [business, setBusiness] = useState({ whatYouDo: '', customers: '', teamSize: '', howYouGrow: '' })
  const [ai, setAi] = useState({ experienceLevel: '', toolsTried: '', whatWorked: '', whatFailed: '', hopes: '' })
  const [processes, setProcesses] = useState<ProcessEntry[]>([emptyProcess()])
  const [closing, setClosing] = useState({
    biggestBottleneck: '',
    growthBlocker: '',
    systemsOfRecord: '',
    timeline: 'Just exploring',
    anythingElse: '',
  })

  const restored = useRef(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Restore a partially completed form so people can leave and come back.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.contact) setContact(d.contact)
        if (d.business) setBusiness(d.business)
        if (d.ai) setAi(d.ai)
        if (Array.isArray(d.processes) && d.processes.length) setProcesses(d.processes)
        if (d.closing) setClosing(d.closing)
      }
    } catch {
      // ignore unreadable drafts
    }
    restored.current = true
  }, [])

  useEffect(() => {
    if (!restored.current || state === 'success') return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ contact, business, ai, processes, closing }))
        setSavedNote('Progress saved')
        setTimeout(() => setSavedNote(''), 1800)
      } catch {
        // storage full or blocked; drafts just won't persist
      }
    }, 700)
  }, [contact, business, ai, processes, closing, state])

  const updateProcess = (i: number, key: keyof ProcessEntry, value: string) => {
    setProcesses(prev => prev.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const filled = processes.filter(p => Object.values(p).some(v => v.trim() !== ''))

    try {
      const res = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, business, ai, processes: filled, closing }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Something went wrong')
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
      setState('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid #E7E0D3',
    color: '#221D17',
    borderRadius: '12px',
    padding: '11px 14px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }
  const areaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical', lineHeight: '1.6' }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#221D17',
  }
  const hintStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 400,
    color: '#6F665A',
    marginTop: '-2px',
    marginBottom: '6px',
    lineHeight: 1.5,
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(59,91,219,0.1)', border: '1px solid rgba(59,91,219,0.25)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5 9-9" stroke="#3B5BDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#221D17' }}>
          Got it. Thank you.
        </h3>
        <p className="max-w-md" style={{ color: '#6F665A' }}>
          I am reading through your answers now and putting together a view of where AI can make the biggest
          difference in your business. You will hear from me before we meet.
        </p>
      </div>
    )
  }

  const sectionHead = (step: string, title: string, sub: string) => (
    <div className="mb-6">
      <div
        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-3"
        style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#3B5BDB' }}
      >
        {step}
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#221D17', fontFamily: "'Fraunces', Georgia, serif" }}>
        {title}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: '#6F665A' }}>
        {sub}
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-8" style={{ width: '100%' }}>
      {/* ── 1. Business ─────────────────────────────────────────── */}
      <div>
        {sectionHead('Step 1', 'About your business', 'The big picture. Keep it brief.')}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label style={labelStyle}>Your name</label>
            <input type="text" required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} style={inputStyle} className="focus-blue-ring" />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} style={inputStyle} className="focus-blue-ring" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label style={labelStyle}>Company</label>
            <input type="text" required value={contact.company} onChange={e => setContact({ ...contact, company: e.target.value })} style={inputStyle} className="focus-blue-ring" />
          </div>
          <div>
            <label style={labelStyle}>Your role</label>
            <input type="text" placeholder="Owner, Operations Manager…" value={contact.role} onChange={e => setContact({ ...contact, role: e.target.value })} style={inputStyle} className="focus-blue-ring" />
          </div>
        </div>

        <div className="mb-4">
          <label style={labelStyle}>What does your business do?</label>
          <span style={hintStyle}>A few sentences. What you sell, and how you make money.</span>
          <textarea rows={3} required value={business.whatYouDo} onChange={e => setBusiness({ ...business, whatYouDo: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>Who are your customers?</label>
          <span style={hintStyle}>Who are they, and how do they find you?</span>
          <textarea rows={2} value={business.customers} onChange={e => setBusiness({ ...business, customers: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>How big is the team?</label>
            <input type="text" placeholder="9 total, 2 in the office…" value={business.teamSize} onChange={e => setBusiness({ ...business, teamSize: e.target.value })} style={inputStyle} className="focus-blue-ring" />
          </div>
          <div>
            <label style={labelStyle}>How do you grow today?</label>
            <input type="text" placeholder="Referrals, ads, outbound…" value={business.howYouGrow} onChange={e => setBusiness({ ...business, howYouGrow: e.target.value })} style={inputStyle} className="focus-blue-ring" />
          </div>
        </div>
      </div>

      {/* ── 2. AI maturity ──────────────────────────────────────── */}
      <div className="pt-8 border-t" style={{ borderColor: '#E7E0D3' }}>
        {sectionHead('Step 2', 'Where you are with AI', 'No wrong answers. This tells me where to start, not whether you are behind.')}

        <div className="mb-5">
          <label style={labelStyle}>How much has your team used AI so far?</label>
          <div className="space-y-2 mt-2">
            {AI_LEVELS.map(level => {
              const selected = ai.experienceLevel === level
              return (
                <label
                  key={level}
                  className="flex items-start gap-3 cursor-pointer transition-colors"
                  style={{
                    background: selected ? 'rgba(59,91,219,0.06)' : '#FFFFFF',
                    border: `1px solid ${selected ? '#3B5BDB' : '#E7E0D3'}`,
                    borderRadius: '12px',
                    padding: '11px 14px',
                    fontSize: '14px',
                    color: '#221D17',
                  }}
                >
                  <input
                    type="radio"
                    name="aiLevel"
                    required
                    checked={selected}
                    onChange={() => setAi({ ...ai, experienceLevel: level })}
                    style={{ marginTop: '3px', accentColor: '#3B5BDB' }}
                  />
                  <span>{level}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="mb-4">
          <label style={labelStyle}>Which AI tools have you tried?</label>
          <span style={hintStyle}>ChatGPT, Copilot, something built into your software, a vendor product. Whatever comes to mind.</span>
          <textarea rows={2} value={ai.toolsTried} onChange={e => setAi({ ...ai, toolsTried: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>What has actually worked well?</label>
          <textarea rows={2} value={ai.whatWorked} onChange={e => setAi({ ...ai, whatWorked: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>What disappointed you, or did not stick?</label>
          <span style={hintStyle}>Honest answers here save us both time. If something burned you, I want to know.</span>
          <textarea rows={2} value={ai.whatFailed} onChange={e => setAi({ ...ai, whatFailed: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div>
          <label style={labelStyle}>What do you hope AI could do for your business?</label>
          <span style={hintStyle}>Even if you are not sure it is possible. Especially then.</span>
          <textarea rows={2} value={ai.hopes} onChange={e => setAi({ ...ai, hopes: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
      </div>

      {/* ── 3. Processes ────────────────────────────────────────── */}
      <div className="pt-8 border-t" style={{ borderColor: '#E7E0D3' }}>
        {sectionHead(
          'Step 3',
          'Your processes',
          'This is the important part. Walk me through the work your business actually does day to day, one process at a time. Add as many as you want. The detail here is what lets me come back with something real.',
        )}

        <div className="space-y-4">
          {processes.map((proc, i) => (
            <div key={i} className="rounded-2xl p-5 md:p-6" style={{ background: '#FBF9F5', border: '1px solid #E7E0D3' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold" style={{ color: '#3B5BDB' }}>
                  Process {i + 1}
                </span>
                {processes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setProcesses(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-xs px-3 py-1 rounded-lg transition-colors"
                    style={{ border: '1px solid #E7E0D3', color: '#6F665A', background: '#FFFFFF' }}
                  >
                    Remove
                  </button>
                )}
              </div>

              {PROCESS_FIELDS.map(f => (
                <div key={f.key} className="mb-4 last:mb-0">
                  <label style={labelStyle}>{f.label}</label>
                  {f.hint && <span style={hintStyle}>{f.hint}</span>}
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={f.key === 'stepByStep' ? 4 : 2}
                      value={proc[f.key]}
                      onChange={e => updateProcess(i, f.key, e.target.value)}
                      style={areaStyle}
                      className="focus-blue-ring"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={proc[f.key]}
                      onChange={e => updateProcess(i, f.key, e.target.value)}
                      style={inputStyle}
                      className="focus-blue-ring"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setProcesses(prev => [...prev, emptyProcess()])}
          className="w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-colors"
          style={{ border: '1px dashed #3B5BDB', color: '#3B5BDB', background: 'transparent' }}
        >
          + Add another process
        </button>
      </div>

      {/* ── 4. Bigger picture ───────────────────────────────────── */}
      <div className="pt-8 border-t" style={{ borderColor: '#E7E0D3' }}>
        {sectionHead('Step 4', 'The bigger picture', 'A few last questions, then you are done.')}

        <div className="mb-4">
          <label style={labelStyle}>If you could remove one bottleneck tomorrow, what would it be?</label>
          <textarea rows={2} value={closing.biggestBottleneck} onChange={e => setClosing({ ...closing, biggestBottleneck: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>What is stopping you from handling more volume?</label>
          <span style={hintStyle}>If business doubled next month, what breaks first?</span>
          <textarea rows={2} value={closing.growthBlocker} onChange={e => setClosing({ ...closing, growthBlocker: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>What software runs your business?</label>
          <span style={hintStyle}>The systems you would be lost without.</span>
          <textarea rows={2} value={closing.systemsOfRecord} onChange={e => setClosing({ ...closing, systemsOfRecord: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>
        <div className="mb-4">
          <label style={labelStyle}>What is your timeline?</label>
          <select value={closing.timeline} onChange={e => setClosing({ ...closing, timeline: e.target.value })} style={inputStyle} className="focus-blue-ring">
            <option>Just exploring</option>
            <option>Next few months</option>
            <option>Next few weeks</option>
            <option>Urgent</option>
          </select>
        </div>
        <div className="mb-6">
          <label style={labelStyle}>Anything else I should know?</label>
          <textarea rows={2} value={closing.anythingElse} onChange={e => setClosing({ ...closing, anythingElse: e.target.value })} style={areaStyle} className="focus-blue-ring" />
        </div>

        {state === 'error' && (
          <p className="text-sm mb-4" style={{ color: '#FF6B6B' }}>
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full font-semibold text-white py-3.5 rounded-xl transition-opacity text-base"
          style={{
            background: '#3B5BDB',
            boxShadow: '0 10px 15px -3px rgba(59,91,219,0.25)',
            opacity: state === 'loading' ? 0.7 : 1,
            cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {state === 'loading' ? 'Sending…' : 'Send it over'}
        </button>

        <p className="text-center text-xs mt-3" style={{ color: '#6F665A', minHeight: '16px' }}>
          {savedNote}
        </p>
      </div>
    </form>
  )
}
