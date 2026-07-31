'use client'

import { useEffect, useRef, useState } from 'react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const STORAGE_KEY = 'gw-discovery-chat-v3'
const ATTACH_PREFIX = '[Attached: '

type Stage = 'intro' | 'company' | 'chat'
type ClientContext = { company: string } | null

const GREETING =
  "Hi, I'm Hayden's discovery assistant. My job is to understand your business and where the repetitive, frustrating work is, so that when you and Hayden talk, he shows up with specifics instead of generalities. This takes 10-15 minutes, and there are no wrong answers.\n\nOne tip before we start: real examples beat descriptions. If you have documents you work with (forms, templates, SOPs, reports, even screenshots of your software), attach them any time with the paperclip button.\n\nTo start, who am I speaking with, and what's the name of your company?"

const clientGreeting = (company: string) =>
  `Hi, I'm Hayden's discovery assistant. My job is to get the full picture of how things work at ${company}, so the plan Hayden puts together actually fits. This takes 10-15 minutes, and there are no wrong answers.\n\nOne tip before we start: real examples beat descriptions. If you have documents you work with (forms, templates, SOPs, reports, even screenshots of your software), attach them any time with the paperclip button.\n\nTo start, who am I speaking with, and what do you do at ${company}?`

/** Renders an [Attached: name] message as a compact chip instead of the full extracted text. */
function attachmentName(content: string): string | null {
  if (!content.startsWith(ATTACH_PREFIX)) return null
  const end = content.indexOf(']')
  if (end === -1) return null
  return content.slice(ATTACH_PREFIX.length, end)
}

export default function DiscoveryChat() {
  const [stage, setStage] = useState<Stage>('intro')
  const [clientCtx, setClientCtx] = useState<ClientContext>(null)
  const [companyInput, setCompanyInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const restored = useRef(false)

  // Restore an in-progress conversation so a refresh does not lose it.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as {
          messages: ChatMessage[]
          done: boolean
          stage?: Stage
          client?: ClientContext
        }
        if (Array.isArray(saved.messages) && saved.stage === 'chat') {
          setMessages(saved.messages)
          setDone(Boolean(saved.done))
          setStage('chat')
          setClientCtx(saved.client ?? null)
        }
      }
    } catch {
      // ignore unreadable drafts
    }
    restored.current = true
  }, [])

  useEffect(() => {
    if (!restored.current || stage !== 'chat') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, done, stage, client: clientCtx }))
    } catch {
      // storage full or blocked
    }
  }, [messages, done, stage, clientCtx])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending, uploading])

  const autosize = () => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  /** Send the current transcript (ending in a user message) to the interview. */
  const advance = async (next: ChatMessage[]) => {
    setErrorMsg('')
    setSending(true)
    try {
      const res = await fetch('/api/discovery-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, client: clientCtx ?? undefined }),
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

  const send = async () => {
    const text = input.trim()
    if (!text || sending || uploading || done) return

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    if (taRef.current) taRef.current.style.height = 'auto'
    await advance(next)
  }

  const attach = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || sending || uploading || done) return
    const files = Array.from(fileList)
    setErrorMsg('')
    setUploading(true)
    try {
      const formData = new FormData()
      for (const f of files) formData.append('files', f)

      const res = await fetch('/api/discovery-chat/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Upload failed')

      const docs = data.documents as Array<{ name: string; content: string }>
      const next: ChatMessage[] = [
        ...messages,
        ...docs.map(d => ({
          role: 'user' as const,
          content: `${ATTACH_PREFIX}${d.name}]\n\n${d.content}`,
        })),
      ]
      setMessages(next)
      setUploading(false)
      // Let the assistant acknowledge and use the document right away.
      await advance(next)
    } catch {
      setErrorMsg("Couldn't process that file. PDF, DOCX, images, and text files work best.")
      setUploading(false)
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const startAsNew = () => {
    setClientCtx(null)
    setMessages([{ role: 'assistant', content: GREETING }])
    setStage('chat')
  }

  const startAsClient = () => {
    const company = companyInput.trim()
    if (!company) return
    setClientCtx({ company })
    setMessages([{ role: 'assistant', content: clientGreeting(company) }])
    setStage('chat')
  }

  if (stage === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-14">
        <h3 className="text-xl font-bold mb-2" style={{ color: '#221D17' }}>
          Quick question first
        </h3>
        <p className="mb-7" style={{ color: '#6F665A', fontSize: '15px' }}>
          Are you already working with Hayden?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setStage('company')}
            className="rounded-xl px-6 py-3 font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#3B5BDB', color: '#FFFFFF', fontSize: '15px' }}
          >
            Yes, we&apos;re working together
          </button>
          <button
            type="button"
            onClick={startAsNew}
            className="rounded-xl px-6 py-3 font-semibold transition-opacity hover:opacity-80"
            style={{ background: '#FFFFFF', color: '#221D17', border: '1px solid #E7E0D3', fontSize: '15px' }}
          >
            Not yet, just getting started
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'company') {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-14">
        <h3 className="text-xl font-bold mb-2" style={{ color: '#221D17' }}>
          Which company are you with?
        </h3>
        <p className="mb-7 max-w-md" style={{ color: '#6F665A', fontSize: '15px' }}>
          Your answers get grouped with your team&apos;s, so Hayden sees the full picture in one place.
        </p>
        <div className="flex w-full max-w-sm gap-2">
          <input
            type="text"
            value={companyInput}
            onChange={e => setCompanyInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') startAsClient()
            }}
            placeholder="Company name"
            autoFocus
            className="flex-1 rounded-xl px-4 py-3 outline-none"
            style={{ background: '#FFFFFF', border: '1px solid #E7E0D3', color: '#221D17', fontSize: '15px' }}
          />
          <button
            type="button"
            onClick={startAsClient}
            disabled={!companyInput.trim()}
            className="rounded-xl px-5 py-3 font-semibold transition-opacity"
            style={{
              background: '#3B5BDB',
              color: '#FFFFFF',
              fontSize: '15px',
              opacity: companyInput.trim() ? 1 : 0.4,
              cursor: companyInput.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Start
          </button>
        </div>
        <button
          type="button"
          onClick={() => setStage('intro')}
          className="mt-5 text-sm underline"
          style={{ color: '#9A9184' }}
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col" style={{ height: 'min(70vh, 640px)' }}>
      {/* transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-1 py-2 space-y-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        {messages.map((m, i) => {
          const attached = m.role === 'user' ? attachmentName(m.content) : null
          return (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {attached ? (
                <div
                  className="max-w-[85%] flex items-center gap-2"
                  style={{
                    background: 'rgba(59,91,219,0.08)',
                    border: '1px solid rgba(59,91,219,0.25)',
                    color: '#3B5BDB',
                    borderRadius: '12px',
                    padding: '9px 14px',
                    fontSize: '14px',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path
                      d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {attached}
                  </span>
                </div>
              ) : (
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
              )}
            </div>
          )
        })}

        {uploading && (
          <div className="flex justify-end">
            <div
              style={{
                background: 'rgba(59,91,219,0.06)',
                border: '1px solid rgba(59,91,219,0.2)',
                color: '#6F665A',
                borderRadius: '12px',
                padding: '9px 14px',
                fontSize: '14px',
              }}
            >
              Reading your file…
            </div>
          </div>
        )}

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
            All set. Hayden will review your answers alongside what you two discussed, and follow up
            with you personally.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <div
            className="flex items-end gap-2 rounded-2xl px-3 py-2"
            style={{ background: '#FFFFFF', border: '1px solid #E7E0D3' }}
          >
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.md,.csv,.json,.rtf,.png,.jpg,.jpeg,.gif,.webp"
              onChange={e => attach(e.target.files)}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={sending || uploading}
              aria-label="Attach a document"
              title="Attach a document (PDF, DOCX, image, or text)"
              className="shrink-0 rounded-xl transition-opacity"
              style={{
                background: 'transparent',
                border: '1px solid #E7E0D3',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: sending || uploading ? 0.4 : 1,
                cursor: sending || uploading ? 'not-allowed' : 'pointer',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                  stroke="#8A8171"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
              disabled={sending || uploading}
              className="flex-1 resize-none bg-transparent outline-none py-2 px-1"
              style={{ color: '#221D17', fontSize: '15px', maxHeight: '160px', lineHeight: 1.5 }}
            />
            <button
              type="button"
              onClick={send}
              disabled={sending || uploading || !input.trim()}
              aria-label="Send"
              className="shrink-0 rounded-xl transition-opacity"
              style={{
                background: '#3B5BDB',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: sending || uploading || !input.trim() ? 0.4 : 1,
                cursor: sending || uploading || !input.trim() ? 'not-allowed' : 'pointer',
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
            Enter to send, Shift+Enter for a new line. 10-15 questions, about 10 minutes. Attach
            files with the paperclip.
          </p>
        </div>
      )}
    </div>
  )
}
