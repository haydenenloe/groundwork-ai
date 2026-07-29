'use client'

import { useEffect, useRef, useState } from 'react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const STORAGE_KEY = 'gw-discovery-chat-v1'

const GREETING =
  "Hi, I'm Hayden's discovery assistant. Before we build anything, I want to understand your business and where AI could actually help. This takes about ten minutes, and there are no wrong answers.\n\nTo start, who am I speaking with, and what's the name of your company?"

export default function DiscoveryChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const restored = useRef(false)

  // Restore an in-progress conversation so a refresh does not lose it.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as { messages: ChatMessage[]; done: boolean }
        if (Array.isArray(saved.messages) && saved.messages.length > 1) {
          setMessages(saved.messages)
          setDone(Boolean(saved.done))
        }
      }
    } catch {
      // ignore unreadable drafts
    }
    restored.current = true
  }, [])

  useEffect(() => {
    if (!restored.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, done }))
    } catch {
      // storage full or blocked
    }
  }, [messages, done])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const autosize = () => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  const send = async () => {
    const text = input.trim()
    if (!text || sending || done) return

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setErrorMsg('')
    setSending(true)
    if (taRef.current) taRef.current.style.height = 'auto'

    try {
      const res = await fetch('/api/discovery-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Request failed')

      setMessages([...next, { role: 'assistant', content: data.reply }])
      if (data.done) setDone(true)
    } catch {
      setErrorMsg('Something glitched on my end. Try sending that again.')
      setMessages(next)
    } finally {
      setSending(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex flex-col" style={{ height: 'min(70vh, 640px)' }}>
      {/* transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-1 py-2 space-y-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[85%] whitespace-pre-wrap leading-relaxed"
              style={
                m.role === 'user'
                  ? {
                      background: '#3B5BDB',
                      color: '#FFFFFF',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '11px 15px',
                      fontSize: '15px',
                    }
                  : {
                      background: '#F6F3ED',
                      color: '#221D17',
                      border: '1px solid #EDE7DB',
                      borderRadius: '16px 16px 16px 4px',
                      padding: '11px 15px',
                      fontSize: '15px',
                    }
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div
              className="flex items-center gap-1.5"
              style={{ background: '#F6F3ED', border: '1px solid #EDE7DB', borderRadius: '16px 16px 16px 4px', padding: '14px 16px' }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
              <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
      </div>

      {/* composer / done state */}
      {done ? (
        <div
          className="mt-4 rounded-2xl px-5 py-5 text-center"
          style={{ background: 'rgba(59,91,219,0.06)', border: '1px solid rgba(59,91,219,0.2)' }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: 'rgba(59,91,219,0.12)', border: '1px solid rgba(59,91,219,0.28)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5 9-9" stroke="#3B5BDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm" style={{ color: '#6F665A' }}>
            All set. Hayden is reviewing your answers and will come back with where AI can make the biggest
            difference before you meet.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <div
            className="flex items-end gap-2 rounded-2xl px-3 py-2"
            style={{ background: '#FFFFFF', border: '1px solid #E7E0D3' }}
          >
            <textarea
              ref={taRef}
              rows={1}
              value={input}
              onChange={e => {
                setInput(e.target.value)
                autosize()
              }}
              onKeyDown={handleKey}
              placeholder="Type your answer…"
              disabled={sending}
              className="flex-1 resize-none bg-transparent outline-none py-2 px-1"
              style={{ color: '#221D17', fontSize: '15px', maxHeight: '160px', lineHeight: 1.5 }}
            />
            <button
              type="button"
              onClick={send}
              disabled={sending || !input.trim()}
              aria-label="Send"
              className="shrink-0 rounded-xl transition-opacity"
              style={{
                background: '#3B5BDB',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: sending || !input.trim() ? 0.4 : 1,
                cursor: sending || !input.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12l16-8-6 8 6 8-16-8z" fill="#FFFFFF" />
              </svg>
            </button>
          </div>
          {errorMsg && (
            <p className="text-sm mt-2 px-1" style={{ color: '#FF6B6B' }}>
              {errorMsg}
            </p>
          )}
          <p className="text-xs mt-2 px-1" style={{ color: '#9A9184' }}>
            Enter to send, Shift+Enter for a new line. About 10 questions, roughly 10 minutes.
          </p>
        </div>
      )}
    </div>
  )
}
