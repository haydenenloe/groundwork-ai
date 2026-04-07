'use client'

import { useState, useRef, useCallback } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const MAX_FILES = 3
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ['.pdf', '.txt', '.md', '.docx']
const ACCEPTED_MIME = [
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

interface UploadedFile {
  file: File
  id: string
}

type AnalysisState = 'idle' | 'processing' | 'done' | 'error'

export default function SopAnalyzerPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [workflow, setWorkflow] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [state, setState] = useState<AnalysisState>('idle')
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming)
    const valid = arr.filter(f => {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase()
      return ACCEPTED_TYPES.includes(ext) && f.size <= MAX_FILE_SIZE
    })
    setFiles(prev => {
      const combined = [...prev]
      for (const f of valid) {
        if (combined.length >= MAX_FILES) break
        if (!combined.find(x => x.file.name === f.name)) {
          combined.push({ file: f, id: Math.random().toString(36).slice(2) })
        }
      }
      return combined
    })
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }, [addFiles])

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const handleSubmit = async () => {
    if (files.length === 0 && workflow.trim().length === 0) {
      setError('Upload at least one document or describe your workflows.')
      return
    }

    // TODO: Add Stripe payment gate here before calling the API
    // e.g. redirect to Stripe Checkout for $500, then call analyze-ops with session_id

    setState('processing')
    setError('')

    const formData = new FormData()
    files.forEach(({ file }) => formData.append('files', file))
    formData.append('workflow', workflow)

    try {
      const res = await fetch('/api/analyze-ops', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Request failed (${res.status})`)
      }

      const data = await res.json()
      setResult(data.report)
      setState('done')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(msg)
      setState('error')
    }
  }

  const reset = () => {
    setFiles([])
    setWorkflow('')
    setResult('')
    setError('')
    setState('idle')
  }

  return (
    <>
      <Nav />

      {/* ========== HERO ========== */}
      <section className="relative pt-32 pb-16 overflow-hidden grid-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
            style={{ background: 'rgba(75,127,255,0.1)', border: '1px solid rgba(75,127,255,0.2)', color: '#4B7FFF' }}
          >
            Automated · Delivered in 24 Hours · $500
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6" style={{ color: '#DCE3EF' }}>
            Get Your AI Operations Snapshot
          </h1>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#8892A4' }}>
            Upload your SOPs and process documents. Our AI identifies your top automation opportunities ranked by impact and ROI, with a full written report in 24 hours.
          </p>
        </div>
      </section>

      {/* ========== MAIN FORM ========== */}
      <section className="py-16 md:py-24" style={{ background: '#0C1525' }}>
        <div className="max-w-2xl mx-auto px-6">

          {state === 'idle' || state === 'error' ? (
            <div className="space-y-6">

              {/* Upload zone */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#DCE3EF' }}>
                  Upload Documents
                  <span className="ml-2 font-normal text-xs" style={{ color: '#4A5568' }}>PDF, TXT, MD, DOCX — max 3 files, 10MB each</span>
                </label>

                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-12 cursor-pointer transition-colors"
                  style={{
                    borderColor: dragOver ? '#4B7FFF' : '#1E2D47',
                    background: dragOver ? 'rgba(75,127,255,0.05)' : '#162035',
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED_TYPES.join(',')}
                    className="hidden"
                    onChange={e => e.target.files && addFiles(e.target.files)}
                  />
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-4">
                    <path d="M16 20V12M16 12l-4 4M16 12l4 4" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 22a6 6 0 01-.72-11.95A9 9 0 0124.08 14 5.5 5.5 0 0126 22" stroke="#4B7FFF" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#DCE3EF' }}>
                    Drag and drop, or click to browse
                  </p>
                  <p className="text-xs" style={{ color: '#4A5568' }}>SOPs, process docs, workflow guides</p>
                </div>

                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map(({ file, id }) => (
                      <div
                        key={id}
                        className="flex items-center justify-between rounded-xl px-4 py-3 border"
                        style={{ background: '#162035', borderColor: '#1E2D47' }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="1" width="12" height="14" rx="2" stroke="#4B7FFF" strokeWidth="1.3"/>
                            <path d="M5 5h6M5 8h6M5 11h4" stroke="#4B7FFF" strokeWidth="1.3" strokeLinecap="round"/>
                          </svg>
                          <span className="text-sm truncate" style={{ color: '#DCE3EF' }}>{file.name}</span>
                          <span className="text-xs flex-shrink-0" style={{ color: '#4A5568' }}>
                            {(file.size / 1024).toFixed(0)}KB
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(id)}
                          className="ml-3 flex-shrink-0 text-xs font-medium transition-colors"
                          style={{ color: '#4A5568' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#DCE3EF')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#4A5568')}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {files.length < MAX_FILES && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-medium transition-colors"
                        style={{ color: '#4B7FFF' }}
                      >
                        + Add another file ({MAX_FILES - files.length} remaining)
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Workflow description */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#DCE3EF' }}>
                  Describe Your Top 3 Most Time-Consuming Workflows
                  <span className="ml-2 font-normal text-xs" style={{ color: '#4A5568' }}>Optional</span>
                </label>
                <textarea
                  value={workflow}
                  onChange={e => setWorkflow(e.target.value.slice(0, 500))}
                  placeholder="e.g. We manually review and route 50+ support tickets daily, compile weekly sales reports from 3 different tools, and send onboarding emails by hand when a new client signs..."
                  rows={5}
                  className="w-full rounded-xl border px-4 py-3 text-sm leading-relaxed resize-none outline-none transition-colors"
                  style={{
                    background: '#162035',
                    borderColor: '#1E2D47',
                    color: '#DCE3EF',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#4B7FFF')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#1E2D47')}
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs" style={{ color: '#4A5568' }}>{workflow.length}/500</span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)', color: '#FCA5A5' }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={files.length === 0 && workflow.trim().length === 0}
                className="w-full font-bold text-base py-4 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#4B7FFF', color: '#fff', boxShadow: '0 10px 15px -3px rgba(75,127,255,0.2)' }}
              >
                Analyze My Operations ($500)
              </button>

              <p className="text-center text-xs" style={{ color: '#4A5568' }}>
                Results delivered as a written report within 24 hours. Payment processed securely via Stripe.
              </p>
            </div>
          ) : state === 'processing' ? (
            <div className="border rounded-2xl p-14 text-center" style={{ background: '#162035', borderColor: '#1E2D47' }}>
              {/* Animated spinner */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: '#1E2D47', borderTopColor: '#4B7FFF' }}
                />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>Analyzing your operations</h3>
              <p className="text-sm" style={{ color: '#8892A4' }}>
                Our AI is reviewing your documents and building your Operations Snapshot. This usually takes 30-60 seconds.
              </p>
            </div>
          ) : (
            /* Results */
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-black text-2xl" style={{ color: '#DCE3EF' }}>Your AI Operations Snapshot</h2>
                  <p className="text-sm mt-1" style={{ color: '#8892A4' }}>Based on the documents and workflows you provided</p>
                </div>
                <button
                  onClick={reset}
                  className="text-sm font-medium border px-4 py-2 rounded-lg transition-colors"
                  style={{ borderColor: '#1E2D47', color: '#8892A4' }}
                >
                  Start Over
                </button>
              </div>

              <div
                className="border rounded-2xl p-8 prose prose-invert max-w-none"
                style={{ background: '#162035', borderColor: '#1E2D47', color: '#DCE3EF' }}
              >
                <pre
                  className="whitespace-pre-wrap text-sm leading-relaxed font-sans"
                  style={{ color: '#DCE3EF' }}
                >
                  {result}
                </pre>
              </div>

              <div className="mt-8 border rounded-2xl p-7 text-center" style={{ background: '#0C1525', borderColor: 'rgba(75,127,255,0.2)' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#DCE3EF' }}>Want the full picture?</h3>
                <p className="text-sm mb-5" style={{ color: '#8892A4' }}>
                  The Full AI Audit goes deeper: 3 weeks of discovery interviews, a 7+ page roadmap, and a live walkthrough with exactly how to build everything identified here.
                </p>
                <a
                  href="/#audit"
                  className="inline-block font-bold text-sm px-8 py-3 rounded-xl transition-colors"
                  style={{ background: '#4B7FFF', color: '#fff' }}
                >
                  Book a Full AI Audit ($2,500) →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      {(state === 'idle' || state === 'error') && (
        <section className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-black text-2xl mb-8 text-center" style={{ color: '#DCE3EF' }}>How it works</h2>
            <div className="space-y-4">
              {[
                { n: '1', title: 'Upload your documents', body: 'SOPs, process guides, workflow docs — whatever describes how your team operates day to day.' },
                { n: '2', title: 'AI analyzes your operations', body: 'We run your materials through our analysis pipeline to identify automation opportunities ranked by impact and ROI.' },
                { n: '3', title: 'Receive your Snapshot', body: 'You get a clear, written report: executive summary, top 3 automation opportunities, quick wins, and concrete next steps.' },
              ].map(step => (
                <div key={step.n} className="flex gap-5 border rounded-2xl p-6 card-hover" style={{ background: '#162035', borderColor: '#1E2D47' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-white text-lg" style={{ background: '#4B7FFF' }}>{step.n}</div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#DCE3EF' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
