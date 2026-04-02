import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Groundwork AI | AI Operations for B2B Companies',
  description: 'Groundwork AI helps B2B companies identify, build, and deploy AI systems that multiply operational output, starting with a structured AI Operations Assessment.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
