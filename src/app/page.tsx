import type { Metadata } from "next"
import HomePage from "@/components/home/HomePage"

export const metadata: Metadata = {
  title: "Groundwork AI | The 30-Day System Install",
  description:
    "Groundwork AI embeds a forward-deployed AI engineer in operations-heavy companies and installs a production back-office system, in accounts you own, live in 30 days.",
}

export default function Page() {
  return <HomePage />
}
