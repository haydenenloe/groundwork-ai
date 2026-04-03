'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ApplyForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    bottleneck: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.ok) {
        setState('success')
      } else {
        throw new Error(data.error || 'Something went wrong')
      }
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(75,127,255,0.15)', border: '1px solid rgba(75,127,255,0.3)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5 9-9" stroke="#4B7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#DCE3EF' }}>Request received.</h3>
        <p style={{ color: '#8892A4' }}>We&apos;ll be in touch within 1 business day.</p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    background: '#0C1525',
    border: '1px solid #1E2D47',
    color: '#DCE3EF',
    borderRadius: '10px',
    padding: '10px 14px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#DCE3EF',
  }

  return (
    <form onSubmit={handleSubmit} className="text-left" style={{ width: '100%' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle} htmlFor="apply-name">Full Name</label>
          <input
            id="apply-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            className="focus-blue-ring"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="apply-email">Work Email</label>
          <input
            id="apply-email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            className="focus-blue-ring"
          />
        </div>
      </div>

      <div className="mb-4">
        <label style={labelStyle} htmlFor="apply-company">Company Name</label>
        <input
          id="apply-company"
          name="company"
          type="text"
          required
          placeholder="Acme Corp"
          value={form.company}
          onChange={handleChange}
          style={inputStyle}
          className="focus-blue-ring"
        />
      </div>

      <div className="mb-6">
        <label style={labelStyle} htmlFor="apply-bottleneck">
          What&apos;s the biggest thing eating your team&apos;s time right now?
        </label>
        <textarea
          id="apply-bottleneck"
          name="bottleneck"
          rows={4}
          required
          placeholder="e.g. We manually update the CRM after every call, chase leads for 3 days before follow-up happens, and spend Friday afternoons rebuilding the same report..."
          value={form.bottleneck}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
          className="focus-blue-ring"
        />
      </div>

      {state === 'error' && (
        <p className="text-sm mb-4" style={{ color: '#FF6B6B' }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full font-bold text-white py-3.5 rounded-xl transition-opacity text-base"
        style={{
          background: '#4B7FFF',
          boxShadow: '0 10px 15px -3px rgba(75,127,255,0.25)',
          opacity: state === 'loading' ? 0.7 : 1,
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {state === 'loading' ? 'Sending...' : 'Request an Audit →'}
      </button>

      <style jsx>{`
        .focus-blue-ring:focus {
          border-color: #4B7FFF !important;
          box-shadow: 0 0 0 3px rgba(75, 127, 255, 0.15);
        }
        ::placeholder {
          color: #4A5568;
        }
      `}</style>
    </form>
  )
}
