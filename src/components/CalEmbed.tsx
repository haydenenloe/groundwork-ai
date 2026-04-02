'use client'

import { useEffect } from 'react'

export default function CalEmbed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.onload = () => {
      ;(window as any).Cal('init', { origin: 'https://cal.com' })
      ;(window as any).Cal('inline', {
        elementOrSelector: '#cal-booking-embed',
        calLink: 'haydenenloe/45-min-meeting',
        layout: 'month_view',
      })
      ;(window as any).Cal('ui', {
        styles: { branding: { brandColor: '#4B7FFF' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }
    document.head.appendChild(script)
  }, [])

  return <div id="cal-booking-embed" style={{ minWidth: '320px', height: '660px' }} />
}
