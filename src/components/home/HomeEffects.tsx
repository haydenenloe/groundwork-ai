"use client"

import { useEffect } from "react"

/** Sticky nav border and scroll-reveal, matching the prototype script. */
export default function HomeEffects() {
  useEffect(() => {
    const root = document.getElementById("gw-home")
    const nav = document.getElementById("nav")
    if (!root || !nav) return

    const onScroll = () => {
      nav.classList.toggle("gw-scrolled", window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const targets = root.querySelectorAll(".gw-rv")
    let observer: IntersectionObserver | undefined
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("gw-in")
            observer?.unobserve(entry.target)
          })
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      )
      targets.forEach((el) => observer?.observe(el))
    } else {
      targets.forEach((el) => el.classList.add("gw-in"))
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer?.disconnect()
    }
  }, [])

  return null
}
