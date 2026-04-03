'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Do I need technical staff to work with you?',
    a: 'No. We handle everything — scoping, building, integrating, and handing off. Your team needs to know how to use it, not build it.',
  },
  {
    q: 'How is this different from just using Zapier or Make?',
    a: "Zapier connects your existing tools. We build AI-powered systems that understand context, make decisions, and handle exceptions. It's the difference between a pipe and a brain.",
  },
  {
    q: 'What kinds of businesses do you work with?',
    a: "We've worked with HR tech companies, logistics operations, cybersecurity firms, and more. If your team has workflows they repeat every day, we can automate them. Industry doesn't matter — repetitive work does.",
  },
  {
    q: 'How long does an implementation take?',
    a: 'Most projects run 4-12 weeks from audit to handoff. Simple automations can be live in 2 weeks. Complex multi-system builds take longer. We scope it precisely during the audit.',
  },
  {
    q: "What if my team resists the change?",
    a: "We design for adoption, not just function. Your team is trained, the handoff is documented, and we stay on during the transition. Most teams are relieved, not resistant — it means less manual work for them.",
  },
  {
    q: 'What exactly does the $2,500 audit include?',
    a: "Three weeks of workflow discovery — usually 3-4 conversations with your team — followed by an 8-page prioritized roadmap with cost estimates, timelines, and a live walkthrough. It's a standalone deliverable with no obligation to continue.",
  },
]

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all duration-200"
            style={{
              border: isOpen ? '1px solid rgba(75,127,255,0.3)' : '1px solid #1E2D47',
              background: isOpen ? 'rgba(75,127,255,0.04)' : '#162035',
            }}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-semibold text-base pr-4" style={{ color: '#DCE3EF' }}>{item.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="flex-shrink-0 transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#4B7FFF' }}
              >
                <path d="M4 6.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className="overflow-hidden transition-all duration-200"
              style={{ maxHeight: isOpen ? '500px' : '0px' }}
            >
              <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                {item.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
