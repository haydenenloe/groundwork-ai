'use client'

import { FormEvent, useState } from 'react'

export default function SmsOptInForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const res = await fetch('/api/sms-opt-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, consent }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok || !data.ok) {
      setStatus('error')
      setMessage(data.error || 'Could not submit the form. Please try again.')
      return
    }

    setStatus('success')
    setMessage('You’re subscribed. Thanks for signing up.')
    setName('')
    setPhone('')
    setConsent(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold" style={{ color: '#DCE3EF' }}>
          Name <span style={{ color: '#8892A4' }}>(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl px-4 py-3 outline-none transition"
          style={{ background: 'rgba(12,21,37,0.8)', border: '1px solid rgba(75,127,255,0.18)', color: '#DCE3EF' }}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-semibold" style={{ color: '#DCE3EF' }}>
          Phone number <span style={{ color: '#4B7FFF' }}>*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+1 (555) 123-4567"
          className="w-full rounded-xl px-4 py-3 outline-none transition"
          style={{ background: 'rgba(12,21,37,0.8)', border: '1px solid rgba(75,127,255,0.18)', color: '#DCE3EF' }}
        />
      </div>

      <label className="flex gap-3 rounded-xl p-4 cursor-pointer" style={{ background: 'rgba(12,21,37,0.55)', border: '1px solid rgba(75,127,255,0.14)' }}>
        <input
          name="consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-[#4B7FFF]"
        />
        <span className="text-sm leading-relaxed" style={{ color: '#DCE3EF' }}>
          I authorize Groundwork AI to send automated text messages to the phone number provided about its services and updates. Message and data rates may apply. Message frequency varies. Text HELP for help or STOP to opt out at any time. Consent is not a condition of any purchase. See our{' '}
          <a href="https://groundwork-ai.dev/privacy" className="underline" style={{ color: '#4B7FFF' }}>
            Privacy Policy
          </a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl px-6 py-4 font-bold text-white transition disabled:opacity-60"
        style={{ background: '#4B7FFF' }}
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>

      {message && (
        <p
          className="rounded-xl px-4 py-3 text-sm"
          style={{
            background: status === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
            border: status === 'success' ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(239,68,68,0.25)',
            color: status === 'success' ? '#86efac' : '#fca5a5',
          }}
        >
          {message}
        </p>
      )}
    </form>
  )
}
