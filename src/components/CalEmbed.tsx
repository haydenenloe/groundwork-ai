'use client'

import { useEffect } from 'react'

export default function CalEmbed() {
  useEffect(() => {
    // Cal.com's official initialization pattern — sets up a queue stub BEFORE
    // the script loads, so calls are buffered and replayed once ready.
    ;(function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => { a.q.push(ar) }
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          const s = document.createElement('script')
          s.src = A
          document.head.appendChild(s)
          cal.loaded = true
        }
        if (args[0] === L) {
          const api: any = (...a: any[]) => p(api, a)
          const ns = args[1]
          api.q = api.q || []
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api
            p(cal.ns[ns], args)
            p(cal, [L, ns, args[2]])
          } else {
            p(cal, args)
          }
          return
        }
        p(cal, args)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    const Cal = (window as any).Cal
    Cal('init', { origin: 'https://cal.com' })
    Cal('inline', {
      elementOrSelector: '#cal-booking-embed',
      calLink: 'haydenenloe/45-min-meeting',
      layout: 'month_view',
    })
    Cal('ui', {
      styles: { branding: { brandColor: '#4B7FFF' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }, [])

  return <div id="cal-booking-embed" style={{ minWidth: '320px', height: '660px' }} />
}
