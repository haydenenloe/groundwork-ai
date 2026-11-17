/**
 * The one place to change the offer and the call-to-action.
 * Set `showPrice` to false to hide every price and show `priceHiddenText`.
 * Paste a Google Calendar appointment link into `bookingUrl`.
 * "#book" scrolls to the final section. http(s) URLs open in a new tab.
 */
export type GwConfig = {
  showPrice: boolean
  pricePrefix: string
  price: string
  pricePer: string
  priceTerms: string
  priceHiddenText: string
  bookingUrl: string
}

export const gwConfig: GwConfig = {
  showPrice: true,
  pricePrefix: "From",
  price: "$6,500",
  pricePer: "/mo",
  priceTerms: "Prepaid monthly · 90-day initial term · then month to month",
  priceHiddenText: "Scoped and priced on the discovery call",
  bookingUrl: "#book",
}

const HIDDEN_TERMS = "Prepaid monthly · 90-day initial term"
const HIDDEN_COMPARE = "A fraction of a hire, prepaid monthly"
const HIDDEN_FAQ =
  "The 30-Day System Install is a prepaid monthly retainer with a 90-day initial term, month to month after that. The diagnostic is included, so there is no separate audit fee. Pricing is scoped on the discovery call and always lands well below the $15,000–25,000 a month a full-time AI engineer costs."

export type PriceContent =
  | {
      showPrice: true
      prefix: string
      price: string
      per: string
      terms: string
      label: string
      faq: string
    }
  | {
      showPrice: false
      hiddenText: string
      terms: string
      compareCell: string
      faq: string
    }

export function priceContent(config: GwConfig = gwConfig): PriceContent {
  if (!config.showPrice) {
    return {
      showPrice: false,
      hiddenText: config.priceHiddenText,
      terms: HIDDEN_TERMS,
      compareCell: HIDDEN_COMPARE,
      faq: HIDDEN_FAQ,
    }
  }

  const pre = config.pricePrefix ? `${config.pricePrefix} ` : ""
  const label = `${pre}${config.price}${config.pricePer}`
  const labelLc = `${pre.toLowerCase()}${config.price}${config.pricePer}`

  return {
    showPrice: true,
    prefix: config.pricePrefix,
    price: config.price,
    per: config.pricePer,
    terms: config.priceTerms,
    label,
    faq: `The 30-Day System Install runs ${labelLc}, prepaid, with a 90-day initial term and month to month after that. The diagnostic is included, so there's no separate audit fee. For context, a full-time AI engineer costs $15,000–25,000 a month fully loaded.`,
  }
}

export function bookingAnchor(url: string = gwConfig.bookingUrl): {
  href: string
  target?: "_blank"
  rel?: "noopener"
} {
  const href = url || "#book"
  if (/^https?:/.test(href)) {
    return { href, target: "_blank", rel: "noopener" }
  }
  return { href }
}
