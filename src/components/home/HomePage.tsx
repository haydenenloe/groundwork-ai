import type { ReactNode } from "react"
import HomeEffects from "./HomeEffects"
import { bookingAnchor, priceContent } from "@/lib/gw-config"
import { homeFontClassName } from "@/lib/fonts"
import "./home.css"

function cn(...names: Array<string | false | null | undefined>) {
  return names
    .filter((name): name is string => Boolean(name))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => (name.startsWith("gw-") ? name : `gw-${name}`))
    .join(" ")
}

function LogoMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect y="20" width="32" height="8" rx="2" fill="#3B5BDB" />
      <rect y="11" width="22" height="8" rx="2" fill="#3B5BDB" opacity=".75" />
      <rect y="2" width="13" height="8" rx="2" fill="#3B5BDB" opacity=".45" />
    </svg>
  )
}

function Wordmark({ size }: { size: number }) {
  return (
    <>
      <LogoMark size={size} />
      <span className={cn("wm")}>
        Groundwork <b>AI</b>
      </span>
    </>
  )
}

function BookLink({ className, children }: { className: string; children: ReactNode }) {
  return (
    <a className={className} {...bookingAnchor()}>
      {children}
    </a>
  )
}

const MARQUEE = [
  "Spreadsheet → database migrations",
  "Systems-of-record sync",
  "Exception queues with human review",
  "Billing & settlement reconciliation",
  "Document intake & extraction",
  "Operations dashboards",
  "Internal knowledge search",
  "Evals & test harnesses",
]

const INCLUDED = [
  ["Two-week embedded diagnostic", "Folded into month one. No separate audit fee."],
  ["Written acceptance criteria", 'Agreed in week one. They define "live."'],
  ["First production system in 30 days", "Built, tested on your data, deployed in your accounts."],
  ["30 days of hypercare", "Bugs and in-scope adjustments after the first ship."],
  ["Weekly ship note", "What shipped, what's next, what's blocked."],
  ["Monthly metric review", "The number we agreed to move, before and after."],
  ["Hands-on team training", "Your people learn the systems they touch."],
  ["AI use policy & eval harness", "Left in your accounts, yours to keep."],
] as const

const FAQS: Array<{ q: string; a?: string; open?: boolean }> = [
  {
    q: "How is this different from an AI automation agency?",
    a: "Agencies sell workflows, usually built in no-code tools and often running in their accounts. Groundwork installs production software: a data foundation, the business logic, AI where it earns its place, and the tests and monitoring to keep it reliable. It runs in your accounts and keeps working whether or not we keep working together.",
    open: true,
  },
  {
    q: 'What exactly counts as "live in 30 days"?',
    a: 'In week one we write acceptance criteria together: what the system does, on what data, and how we\'ll know it works. "Live" means it meets those criteria in your production environment. If it doesn\'t within 30 days, I keep working at no extra fee until it does.',
  },
  { q: "How does pricing work?" },
  {
    q: "Why a retainer instead of a fixed-price project?",
    a: "When you're replacing a real production process, the full scope rarely fits in a spec written up front. A retainer lets the first system ship fast and the next one start right away. If you do have one clearly defined workflow, a fixed-scope Build Sprint is an option.",
  },
  {
    q: "Do we need to be technical?",
    a: "No. You need someone who knows the process and will review the output. I handle the engineering and train your team on the parts they touch.",
  },
  {
    q: "Is our data safe?",
    a: "Systems run in your accounts under your permissions. Client data doesn't go into AI tools without your approval, every build ships with a written security boundary, and you get an AI use policy your team can actually follow.",
  },
  {
    q: "What happens after the first 90 days?",
    a: "You can keep the build lane running month to month for the next system. You can also step down to a lighter maintenance plan or stop. Everything built stays yours either way.",
  },
]

export default function HomePage() {
  const price = priceContent()

  return (
    <div id="gw-home" className={`gw ${homeFontClassName}`}>
      <HomeEffects />
      <nav className={cn("nav")} id="nav">
        <div className={cn("wrap")}>
          <a className={cn("logo")} href="#top" aria-label="Groundwork AI home">
            <Wordmark size={26} />
          </a>
          <ul className={cn("nav-links")}>
            <li><a href="#install">The Install</a></li>
            <li><a href="#offer">Offer</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#fit">Who it&apos;s for</a></li>
            <li><a href="#founder">About</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <BookLink className={cn("btn btn-primary")}>
            <span>Book<span className={cn("long")}> a discovery</span> call</span>{" "}
            <span className={cn("arr")}>→</span>
          </BookLink>
        </div>
      </nav>

      <main id="top">
        <header className={cn("hero")}>
          <div className={cn("wrap")}>
            <div>
              <span className={cn("eyebrow")}>Forward-deployed AI implementation</span>
              <h1>Real AI systems, installed <em>inside</em> your operations.</h1>
              <p className={cn("lede")}>
                A forward-deployed engineer joins your team and builds the system with you.{" "}
                <b>Your first production back-office system is live in 30 days</b>, in accounts you own, tied to a number you already track.
              </p>
              <div className={cn("cta-row")}>
                <BookLink className={cn("btn btn-primary")}>
                  Book a discovery call <span className={cn("arr")}>→</span>
                </BookLink>
                <a className={cn("btn btn-ghost")} href="#install">
                  What a system install is <span className={cn("arr")}>→</span>
                </a>
              </div>
              <dl className={cn("meta")}>
                <div><dt>Practice</dt><dd>Embedded engineering</dd></div>
                <div><dt>First system</dt><dd>Live in 30 days</dd></div>
                <div><dt>Ownership</dt><dd>Your accounts, your code</dd></div>
              </dl>
            </div>
            <div className={cn("hero-right")} aria-label="Illustrative install tracker">
              <div className={cn("spec")}>
                <div className={cn("spec-top")}>
                  <div className={cn("dots")}><i /><i /><i /></div>
                  <span>System Install · Day 24 of 30</span>
                </div>
                <div className={cn("spec-body")}>
                  <h4>Order-to-invoice reconciliation</h4>
                  <div className={cn("sub")}>Runs in: client&apos;s Microsoft 365 + client-owned GitHub</div>
                  <div className={cn("weeks")}>
                    <div className={cn("on")} />
                    <div className={cn("on")} />
                    <div className={cn("on")} />
                    <div className={cn("on")} style={{ opacity: 0.45 }} />
                  </div>
                  <div className={cn("weeks-l")}>
                    <span>Diagnose</span><span>Foundation</span><span>AI slice</span><span>Go-live</span>
                  </div>
                  <ul className={cn("tests")}>
                    <li>
                      <span className={cn("ok")}>✓</span>
                      <span>Pulls daily records from 3 systems of record<br /><small>replaces 2 hrs of copy-paste</small></span>
                      <small>pass</small>
                    </li>
                    <li>
                      <span className={cn("ok")}>✓</span>
                      <span>Flags mismatches over $50 for review</span>
                      <small>pass</small>
                    </li>
                    <li>
                      <span className={cn("ok")}>✓</span>
                      <span>Every exception reaches a human before it ships</span>
                      <small>pass</small>
                    </li>
                    <li>
                      <span className={cn("ok")}>✓</span>
                      <span>Eval set: 200 historical records, 98% match</span>
                      <small>pass</small>
                    </li>
                    <li>
                      <span className={cn("pend")}>◌</span>
                      <span>Ops lead signs off on week-one output</span>
                      <small>day 28</small>
                    </li>
                  </ul>
                </div>
                <div className={cn("spec-foot")}>
                  <span>Acceptance criteria · 4 / 5</span>
                  <b>● On track for day 30</b>
                </div>
              </div>
              <div className={cn("spec-note")}>Illustrative example</div>
            </div>
          </div>
        </header>

        <div className={cn("strip")} aria-hidden="true">
          <div className={cn("strip-inner")}>
            {[0, 1].map((copy) =>
              MARQUEE.map((item) => <span key={`${copy}-${item}`}>{item}</span>),
            )}
          </div>
        </div>

        <section id="problem">
          <div className={cn("wrap")}>
            <div className={cn("sec-head split rv")}>
              <div>
                <span className={cn("eyebrow")}>The problem</span>
                <h2 style={{ marginTop: 20 }}>
                  Your operations run on spreadsheets, inboxes, and <em>one person</em> who knows how it all fits.
                </h2>
              </div>
              <p className={cn("lede")}>
                Most companies know AI could take over some of their back-office work. Usually nobody inside has the time or the engineering background to build it. Groundwork does that part.
              </p>
            </div>
            <div className={cn("ba rv")}>
              <div className={cn("ba-col")}>
                <span className={cn("num")}>i.</span>
                <h3>Pilots never reach production</h3>
                <p>Someone tried ChatGPT. A vendor ran a demo. Nothing ever got wired into the systems the business actually runs on.</p>
                <div className={cn("after")}><b>Instead</b>A system tested against your own data and accepted against written criteria before it goes live.</div>
              </div>
              <div className={cn("ba-col")}>
                <span className={cn("num")}>ii.</span>
                <h3>The hire is out of reach</h3>
                <p>A full-time AI engineer costs $15k–25k a month fully loaded, and you&apos;d have no way to tell a good one from a bad one in an interview.</p>
                <div className={cn("after")}><b>Instead</b>An engineer embedded on your team for a fraction of that, accountable to a number you already track.</div>
              </div>
              <div className={cn("ba-col")}>
                <span className={cn("num")}>iii.</span>
                <h3>The manual work compounds</h3>
                <p>Reconciling, re-entering data, chasing missing information, and building reports take the same hours every week, often from senior staff.</p>
                <div className={cn("after")}><b>Instead</b>The repetitive core moves into software that runs on its own, with people reviewing only the exceptions.</div>
              </div>
            </div>
            <div className={cn("not rv")}>
              <div className={cn("x")}>✕</div>
              <p>
                <b>Groundwork isn&apos;t an automation agency.</b> The work is production software, built end to end: the data foundation, the business logic, AI in the steps that need it, and tests that show the system works.
              </p>
            </div>
          </div>
        </section>

        <section className={cn("sys")} id="install">
          <div className={cn("wrap")}>
            <div className={cn("sys-grid")}>
              <div className={cn("sys-copy rv")}>
                <span className={cn("eyebrow")}>What a system install is</span>
                <h2 style={{ margin: "20px 0 28px" }}>
                  Most &quot;AI projects&quot; are really a <em>foundation</em> problem.
                </h2>
                <p>Going straight to an agent on top of messy spreadsheets is how AI projects fail. A system install starts where the work actually lives: your systems of record. It turns a fragile manual process into a structured pipeline, then adds AI to the specific steps where it does better than fixed rules.</p>
                <p>The result is documented, tested software running in your accounts. It keeps working if the engagement ends.</p>
                <p className={cn("small")}>Sometimes the right answer is &quot;not yet.&quot; If a process needs cleaning up before a model belongs anywhere near it, you&apos;ll hear that on the first call.</p>
              </div>
              <div className={cn("stack rv")} aria-label="Layers of a system install">
                <div className={cn("layer")}>
                  <span className={cn("lnum")}>01</span>
                  <div>
                    <h4>Foundation</h4>
                    <p>Pull clean data from the systems you already run (ERP, TMS, accounting, SharePoint, the spreadsheets) into one structured source.</p>
                  </div>
                </div>
                <div className={cn("layer")}>
                  <span className={cn("lnum")}>02</span>
                  <div>
                    <h4>Logic</h4>
                    <p>Rules, calculations, and handoffs written as code: the dependable, linear core of the process.</p>
                  </div>
                </div>
                <div className={cn("layer ai")}>
                  <span className={cn("tag")}>Where AI goes</span>
                  <span className={cn("lnum")}>03</span>
                  <div>
                    <h4>The AI slice</h4>
                    <p>Models handle the judgment-heavy parts: reading documents, classifying exceptions, drafting replies. Everything else stays as plain code.</p>
                  </div>
                </div>
                <div className={cn("layer")}>
                  <span className={cn("lnum")}>04</span>
                  <div>
                    <h4>Guardrails</h4>
                    <p>Human review on every exception, evaluation sets built from your own history, and monitoring so you know when something drifts.</p>
                  </div>
                </div>
                <div className={cn("layer own")}>
                  <span className={cn("lnum")}>05</span>
                  <div>
                    <h4>Owned by you</h4>
                    <p>Deployed in your cloud, your Microsoft or Google tenant, and a code repository your company owns. Your team can read, change, or move all of it.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn("compare rv")}>
              <h3>The third option between a freelancer and a full-time hire.</h3>
              <div className={cn("tbl-wrap")}>
                <table className={cn("tbl")}>
                  <thead>
                    <tr>
                      <th />
                      <th>Freelancer / automation agency</th>
                      <th className={cn("us")}>Groundwork</th>
                      <th>In-house AI hire</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>What you get</td>
                      <td data-l="Freelancer / agency">Workflows glued together in a no-code tool</td>
                      <td data-l="Groundwork" className={cn("us")}>A production system with data, logic, AI, and tests</td>
                      <td data-l="In-house hire">Whatever one person can build, eventually</td>
                    </tr>
                    <tr>
                      <td>Time to first value</td>
                      <td data-l="Freelancer / agency">Quick to set up; tends to break when inputs change</td>
                      <td data-l="Groundwork" className={cn("us")}>First system live in 30 days, guaranteed</td>
                      <td data-l="In-house hire">3–6 months to hire, then ramp-up</td>
                    </tr>
                    <tr>
                      <td>Who owns it</td>
                      <td data-l="Freelancer / agency">Often their accounts and subscriptions</td>
                      <td data-l="Groundwork" className={cn("us")}>Your accounts, your repository, documented</td>
                      <td data-l="In-house hire">You, if they document it before leaving</td>
                    </tr>
                    <tr>
                      <td>Monthly cost</td>
                      <td data-l="Freelancer / agency">Low upfront, plus repair work as needed</td>
                      {price.showPrice ? (
                        <td data-l="Groundwork" className={cn("us")}>
                          <span>{price.label}</span>, prepaid
                        </td>
                      ) : (
                        <td data-l="Groundwork" className={cn("us")}>{price.compareCell}</td>
                      )}
                      <td data-l="In-house hire">$15k–25k / month fully loaded</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className={cn("offer")} id="offer">
          <div className={cn("wrap")}>
            <div className={cn("sec-head split rv")}>
              <div>
                <span className={cn("eyebrow")}>The offer</span>
                <h2 style={{ marginTop: 20 }}>The 30-Day <em>System Install.</em></h2>
              </div>
              <p className={cn("lede")}>
                A monthly engagement with one main commitment: a production back-office system running in your business within the first month, with the same engineer staying on afterward.
              </p>
            </div>

            <div className={cn("offer-card rv")}>
              <div className={cn("oc-main")}>
                <h3>What&apos;s included</h3>
                <p>Embedded about two days a week. One continuous build lane: the first system ships in month one, the next one starts right after.</p>
                <ul className={cn("incl")}>
                  {INCLUDED.map(([title, detail]) => (
                    <li key={title}>
                      <span>
                        {title}
                        <small>{detail}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cn("oc-side")}>
                <div className={cn("price", !price.showPrice && "hidden")}>
                  <div className={cn("lbl")}>Investment</div>
                  {price.showPrice ? (
                    <div className={cn("amt")}>
                      {price.prefix ? <small className={cn("from")}>{price.prefix}</small> : null}
                      <span>{price.price}</span>
                      <small>{price.per}</small>
                    </div>
                  ) : (
                    <div className={cn("amt")}>{price.hiddenText}</div>
                  )}
                  <div className={cn("terms")}>{price.terms}</div>
                </div>
                <div className={cn("guar")}>
                  <div className={cn("lbl")}>◆ The guarantee</div>
                  <p>Your first system is live against the written acceptance criteria within 30 days, or work continues at no extra fee until it is.</p>
                  <small>Full terms in the Scope of Work.</small>
                </div>
                <BookLink className={cn("btn btn-primary")}>
                  Book a discovery call <span className={cn("arr")}>→</span>
                </BookLink>
                <div className={cn("cap")}><i />I take on one new install at a time</div>
              </div>
            </div>

            <div className={cn("paths rv")}>
              <div className={cn("pl")}>Other ways in</div>
              <div>
                <h4>AI Operations Audit</h4>
                <p>Not ready to commit? Two weeks of interviews and an ROI-ranked roadmap. Guaranteed to surface value worth 3× the fee, or it&apos;s refunded.</p>
              </div>
              <div>
                <h4>Build Sprint</h4>
                <p>One clearly defined workflow, fixed scope and fixed price, with a written delivery guarantee. It can roll into the Install afterward.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="process">
          <div className={cn("wrap")}>
            <div className={cn("sec-head split rv")}>
              <div>
                <span className={cn("eyebrow")}>How it works</span>
                <h2 style={{ marginTop: 20 }}>You see it working <em>before</em> you sign.</h2>
              </div>
              <p className={cn("lede")}>A 30-minute call, then a working demo built on your problem, then the install.</p>
            </div>
            <div className={cn("steps rv")}>
              <div className={cn("step")}>
                <div className={cn("dot")}>1</div>
                <div className={cn("when")}>Day 0 · 30 min</div>
                <h3>Discovery</h3>
                <p>Walk through one process that eats your team&apos;s week. I&apos;ll tell you what I would build and which number it should move. If it isn&apos;t worth building, I&apos;ll say so.</p>
              </div>
              <div className={cn("step")}>
                <div className={cn("dot")}>2</div>
                <div className={cn("when")}>2–3 days later</div>
                <h3>Working demo</h3>
                <p>A small, working version of the system on a sample of your real workflow, so you can judge it before committing to anything.</p>
              </div>
              <div className={cn("step key")}>
                <div className={cn("dot")}>3</div>
                <div className={cn("when")}>Days 1–30</div>
                <h3>The install</h3>
                <p>Scope of Work signed and first month prepaid, then work starts. Diagnose, build the foundation, add the AI slice, and go live against the acceptance criteria.</p>
              </div>
              <div className={cn("step")}>
                <div className={cn("dot")}>4</div>
                <div className={cn("when")}>Day 31 onward</div>
                <h3>Stay embedded</h3>
                <p>Hypercare on the first system, training for your team, and the next highest-value system in the build lane.</p>
              </div>
            </div>
            <p className={cn("rule rv")}>
              <b>Scope before price.</b> A vague &quot;we want an agent&quot; is usually four or five pieces underneath. You&apos;ll get an honest scope, with what&apos;s in and what&apos;s out written down, before anyone talks numbers.
            </p>
          </div>
        </section>

        <section className={cn("fit")} id="fit">
          <div className={cn("wrap")}>
            <div className={cn("sec-head split rv")}>
              <div>
                <span className={cn("eyebrow")}>Who it&apos;s for</span>
                <h2 style={{ marginTop: 20 }}>Built for <em>operations-heavy</em> mid-sized companies.</h2>
              </div>
              <p className={cn("lede")}>
                The kind of work matters more than the industry: high-volume, repetitive back-office processes that still run on spreadsheets, email, and pasted reports.
              </p>
            </div>
            <div className={cn("fit-card rv")}>
              <ul>
                <li>10 to 250 employees, with an owner or executive who runs the P&amp;L</li>
                <li>Daily operations depend on spreadsheets, email, and systems that don&apos;t share data</li>
                <li>Staff spend hours each week reconciling, re-entering, or compiling the same information</li>
                <li>There&apos;s a number you want to improve: hours spent, error rate, days to close, or utilization</li>
              </ul>
              <div className={cn("inds")}>
                <span className={cn("k")}>Where this shows up</span>
                <span className={cn("chip")}>Logistics &amp; transportation</span>
                <span className={cn("chip")}>Insurance operations</span>
                <span className={cn("chip")}>Staffing</span>
                <span className={cn("chip")}>Property management</span>
                <span className={cn("chip")}>Professional services</span>
                <span className={cn("chip")}>Distribution</span>
              </div>
            </div>
          </div>
        </section>

        <section id="founder">
          <div className={cn("wrap founder-grid")}>
            <div className={cn("portrait rv")}>
              {/* Prototype headshot slot. The current site photo is the approved portrait. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hayden.jpg"
                alt="Hayden Enloe, founder of Groundwork AI"
                width={533}
                height={800}
              />
              <div className={cn("cap2")}>
                <b>Hayden Enloe</b>
                <span>Founder · AI engineer · Utah</span>
              </div>
            </div>
            <div className={cn("founder-copy rv")}>
              <span className={cn("eyebrow")}>Why Groundwork</span>
              <h2>The person who scopes it is the person who <em>builds</em> it.</h2>
              <p>Groundwork AI is Hayden Enloe, an AI engineer with a Master&apos;s in Information Systems. The work is engineering first: data pipelines, systems of record, retrieval that gets measured, and test suites that prove a system works before it touches your customers or your books.</p>
              <p>Forward-deployed means embedded on your team, inside your tools: your Microsoft or Google tenant, your file shares, your repository. No account manager in between and no handoff to a junior team after the contract is signed.</p>
              <div className={cn("princ")}>
                <div>
                  <h4>An honest assessment</h4>
                  <p>If it isn&apos;t worth building, you&apos;ll hear that on the first call.</p>
                </div>
                <div>
                  <h4>You own everything</h4>
                  <p>Your accounts, your code, your data. Stop paying and it keeps running.</p>
                </div>
                <div>
                  <h4>Tested on your data</h4>
                  <p>Evaluation sets from your own history and human review on exceptions.</p>
                </div>
                <div>
                  <h4>Pushback when it&apos;s warranted</h4>
                  <p>If the requested project is the wrong first step, I&apos;ll say so and suggest an order that works.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cn("proof")} id="proof">
          <div className={cn("wrap")}>
            <div className={cn("sec-head rv")}>
              <span className={cn("eyebrow")}>In production</span>
              <h2>Systems in <em>production.</em></h2>
            </div>
            <div className={cn("proof-grid rv")}>
              <div className={cn("ph")}>
                <span className={cn("flag")}>Placeholder · awaiting client permission</span>
                <div className={cn("k")}>Case study · [Industry] · [Company size]</div>
                <h3>[System name]: [one-line outcome on a metric the client already tracks]</h3>
                <p>[Two to three sentences: the manual process before, what the installed system does now, and where it runs. Publish only with the client&apos;s written permission; otherwise keep it anonymous.]</p>
                <div className={cn("kpis")}>
                  <div className={cn("kpi")}><b>[—]</b><span>[Metric before → after]</span></div>
                  <div className={cn("kpi")}><b>[—]</b><span>[Hours back per week]</span></div>
                  <div className={cn("kpi")}><b>[—]</b><span>[Days to go-live]</span></div>
                </div>
              </div>
              <div className={cn("ph")}>
                <span className={cn("flag")}>Placeholder</span>
                <div className={cn("k")}>Walkthrough</div>
                <h3 style={{ fontSize: 22 }}>[3-minute screen recording of a live system]</h3>
                <p>Unscripted walkthrough by Hayden. Add once recorded.</p>
                <div className={cn("video")}><div><div className={cn("play")} />Video coming</div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className={cn("wrap faq-grid")}>
            <div className={cn("rv")}>
              <span className={cn("eyebrow")}>Questions</span>
              <h2 style={{ marginTop: 20 }}>Common <em>questions.</em></h2>
              <p className={cn("lede")} style={{ marginTop: 20 }}>Anything not covered here, ask on the call.</p>
            </div>
            <div className={cn("faq rv")}>
              {FAQS.map((item) => (
                <details key={item.q} open={item.open}>
                  <summary>{item.q}</summary>
                  <p>{item.q === "How does pricing work?" ? price.faq : item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={cn("final")} id="book">
          <div className={cn("wrap")}>
            <div className={cn("final-box rv")}>
              <div>
                <h2>Walk me through <em>one process.</em></h2>
                <p>A 30-minute call about the process that takes up the most of your team&apos;s week. If it&apos;s worth building, you&apos;ll see a working demo within 2–3 days.</p>
              </div>
              <div className={cn("final-side")}>
                <BookLink className={cn("btn")}>
                  Book a discovery call <span className={cn("arr")}>→</span>
                </BookLink>
                <small>30 minutes · Free · Demo within 2–3 days</small>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className={cn("wrap")}>
          <a className={cn("logo")} href="#top">
            <Wordmark size={20} />
          </a>
          <span className={cn("coords")}>Forward-deployed AI implementation · Utah</span>
          <span>
            <a href="mailto:hayden.enloe@groundwork-ai.dev">hayden.enloe@groundwork-ai.dev</a>
            {" · © 2026 Groundwork AI"}
          </span>
        </div>
      </footer>
    </div>
  )
}
