import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-serif",
})

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const homeFontClassName = `${sans.variable} ${serif.variable} ${mono.variable}`
