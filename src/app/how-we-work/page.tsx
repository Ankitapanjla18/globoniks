import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { OfficeHours } from "@/components/sections/OfficeHours";
import { BUSINESS, ISO, TEAM, breadcrumbSchema, pageMetadata } from "@/lib/site";
import { STAGES } from "@/data/process";
import { getProject, liveSites } from "@/data/projects";

export const metadata: Metadata = pageMetadata({
  title: "How we work — with clients in India and abroad",
  description:
    "How a project runs at Globoniks, from first call to launch: fixed-price discovery, weekly demos, and how we handle time zones, contracts and IP abroad.",
  path: "/how-we-work/",
});

/*
 * Rewritten 2026-10-04 for clients outside India as well as inside. The
 * structure answers what an overseas buyer checks before a first call:
 * who we are and that we are real, how the work runs, how we communicate
 * across time zones, how contracts, payment and IP work, and what we have
 * actually learned from shipping.
 *
 * Facts come from src/lib/site.ts and src/data/*. Policy statements that
 * are sensible defaults rather than confirmed facts -- office hours,
 * invoicing currencies, payment terms, DPA on request -- are listed in
 * NEEDS-INPUT 2.1g/2.1j for the owner to confirm or correct. No prices.
 */

const MODELS = [
  { name: "Discovery sprint", body: "Two weeks, fixed price, deliverables you keep. The right first step for anything larger than a small site." },
  { name: "Fixed scope", body: "A defined build with milestones and a fixed price, quoted after discovery. Changes are priced, not absorbed silently." },
  { name: "Monthly retainer", body: "A set number of engineering days per month for products that keep evolving. Priorities re-set every month." },
  { name: "Maintenance plan", body: "Ongoing care for a live system — updates, monitoring, performance — with an agreed response window." },
  { name: "White-label instance", body: "Your own instance of a platform we already built and run, under your name. See our products." },
];

/** Working across borders: the practical answers, grouped. */
const ABROAD = [
  {
    title: "Communication",
    items: [
      "One shared channel per project — Slack, WhatsApp or email, whichever your team already lives in.",
      "A written update every week: what shipped, what is next, what we need from you. Readable in your morning, no call required.",
      "A demo on the staging environment every week; a video call whenever one is useful, scheduled in your hours.",
      "Replies within one working day, from Ankita, the founder — not a ticket queue.",
    ],
  },
  {
    title: "Contracts and payment",
    items: [
      `You contract with ${BUSINESS.legalName}, a company incorporated in India, under a written agreement that fixes scope, price, milestones and ownership before work starts.`,
      "Invoices in INR, USD, GBP or EUR, paid by international bank transfer; milestone billing, with nothing due until you accept a quote.",
      "The discovery sprint is always fixed-price, quoted after the first conversation. Larger builds are quoted after it.",
      "We are GST-registered; exports of services are invoiced accordingly, so overseas clients are not charged Indian GST.",
    ],
  },
  {
    title: "Ownership and confidentiality",
    items: [
      "NDAs: send yours or ask for ours before the first detailed conversation.",
      "For custom builds, the code, infrastructure access and documentation are yours on final payment, written into the agreement.",
      "For custom builds, your data can live in your own cloud account and region. We hold access only for as long as the work needs it.",
      "A data-processing agreement for EU and UK clients on request, aligned with GDPR.",
    ],
  },
  {
    title: "Engineering standards",
    items: [
      "A staging environment you can open at any time, from the first milestone.",
      "Automated tests and a deployment pipeline as the baseline, never an upsell.",
      "Server-rendered front ends where search matters; strict security headers; dependency updates under maintenance.",
      "Handover with runbooks, so a team you hire later can run it without us.",
    ],
  },
];

/**
 * What shipping has taught us. Each lesson names the project it came from,
 * so a prospect can open the product and check. Copy matches projects.ts.
 */
const LESSONS = [
  {
    slug: "homekrafted",
    lesson: "A storefront that search engines can read is not optional.",
    detail:
      "Homekrafted is server-rendered and incrementally regenerated: category and product pages arrive as complete HTML and stay fast while vendors change listings. A location picker shows only food that can actually reach the customer, while gifts ship nationwide — the business rule became the architecture.",
  },
  {
    slug: "tricitymatch",
    lesson: "When trust is the product, the verification pipeline is the build.",
    detail:
      "TricityMatch publishes no profile without a live selfie check and a human review, and flagged profiles go to people rather than an algorithm. Privacy is engineered rather than promised: numbers are never shared between members.",
  },
  {
    slug: "fuzzball-factory",
    lesson: "Tell the customer the wait before they pay, not after.",
    detail:
      "FuzzBall Factory separates ready-to-ship from made-to-order and shows the lead time on the product page, in the cart and at checkout. Custom commissions run as work orders with a quote, a deposit and progress photos — a process, not a chat thread.",
  },
  {
    slug: "pharma-supply",
    lesson: "Compliance has to be in the schema, not in a report.",
    detail:
      "The pharmaceutical supply-chain platform tracks every batch end to end and leaves an audit trail from quality control through packaging, so a compliance review queries records instead of reconstructing them.",
  },
  {
    slug: "globoniks-schools",
    lesson: "Build it once, multi-tenant, when every customer needs the same modules.",
    detail:
      "Globoniks Schools runs each school as its own tenant on shared infrastructure, with role-based access for admin, teachers, parents and students, installable on a phone as a progressive web app — no app-store release per school.",
  },
];

const FAQ = [
  {
    q: "Who will I actually talk to?",
    a: "Ankita, the founder, runs every client relationship; Saksham Panjla, who leads development, joins the engineering conversations; Kapila, our second director, runs operations. There is no account manager layer between you and the people doing the work.",
  },
  {
    q: "Do we need to be in India to work with you?",
    a: "No. We are based in Mohali, Punjab (IST, UTC+5:30) and schedule calls in your working hours. A weekly written update, demos on a staging environment and a shared channel keep the work visible across time zones, and most of our communication is asynchronous by design.",
  },
  {
    q: "How do you handle time zones?",
    a: "Our working day is 10:00 to 19:00 IST. That overlaps a UK or European morning fully. North American mornings fall after our working day, so we take those calls in our evening. Calls go in your hours; everything else — updates, demos, the staging environment — waits for you in writing.",
  },
  {
    q: "What does the discovery sprint cost?",
    a: "A fixed price, quoted after the first conversation once we know the scale of what you are building. The deliverables are yours whether or not you continue with us.",
  },
  {
    q: "How do you invoice overseas clients?",
    a: `Invoices are issued by ${BUSINESS.legalName} in INR, USD, GBP or EUR and paid by international bank transfer, per milestone. Exports of services are invoiced without Indian GST.`,
  },
  {
    q: "Who owns the code?",
    a: "For custom builds, ownership of the deliverables is written into the agreement before work starts — normally the code is yours on final payment. For white-label products, you get your own instance and your data; the platform itself stays ours.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes — send yours, or ask for ours, before the first detailed conversation.",
  },
  {
    q: "What about data protection?",
    a: "For custom builds, your data can live in your own cloud account and region. For EU and UK clients we sign a data-processing agreement aligned with GDPR on request.",
  },
  {
    q: "Are you certified or formally registered?",
    a: `Yes. Globoniks is incorporated in India as ${BUSINESS.legalName}. Globoniks holds ${ISO.standard} ${ISO.system} certification from ${ISO.registrar}, certificate ${ISO.certNumber}, issued ${ISO.certifiedOnLabel} and valid to ${ISO.expiresOnLabel}; its validity can be checked with the registrar directly. The certified scope covers software and applications development, web development, digital marketing, and content and brand work. Globoniks is also GST-registered, GSTIN ${BUSINESS.gstin}.`,
  },
  {
    q: "Can we visit?",
    a: `Yes. The office is at ${BUSINESS.streetAddress}, ${BUSINESS.locality}, ${BUSINESS.region}, India, a short drive from Chandigarh International Airport. Tell us when you are coming.`,
  },
];

function SectionHeading({ eyebrow, id, children }: { eyebrow: string; id: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

export default function HowWeWorkPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const live = liveSites.length;

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <StructuredData data={faqSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How we work", path: "/how-we-work" },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="reveal grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" style={{ "--i": 0 } as React.CSSProperties}>
            <p className="eyebrow mb-7">How we work · India and abroad</p>
            <h1 className="reveal-lcp font-heading text-[2.9rem] leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Small studio. Direct access. <span className="ink">Nothing you have to take on trust.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {BUSINESS.name} is founder-led: Ankita runs every client
              relationship and Saksham Panjla leads development, so the person
              you talk to sits at the same table as the person building your
              system. Here is how a project runs, how we work with clients in
              other countries, and what shipping has taught us.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t rule pt-6 sm:grid-cols-4">
              {[
                { k: "Founded", v: String(BUSINESS.foundingYear) },
                { k: "Live sites", v: String(live).padStart(2, "0") },
                { k: "Quality system", v: ISO.standard },
                { k: "Reply time", v: "≤ 1 working day" },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="eyebrow">{f.k}</dt>
                  <dd className="mt-1 font-heading text-2xl text-foreground">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:pt-6" style={{ "--i": 2 } as React.CSSProperties}>
            <OfficeHours />
          </div>
        </section>

        {/* Stages */}
        <section data-reveal="" aria-labelledby="stages" className="mt-28 md:mt-36">
          <SectionHeading eyebrow="A project, stage by stage" id="stages">
            Five stages. <span className="ink">What you receive at each.</span>
          </SectionHeading>
          <ol className="divide-y divide-[hsl(var(--hairline))] border-y rule">
            {STAGES.map((s, i) => (
              <li key={s.name} className="grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-400">
                    {String(i + 1).padStart(2, "0")} · {s.when}
                  </p>
                  <h3 className="mt-3 font-heading text-3xl leading-tight text-foreground">{s.name}</h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{s.body}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="eyebrow mb-3">You receive</p>
                  <ul className="space-y-2">
                    {s.receive.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Abroad */}
        <section data-reveal="" aria-labelledby="abroad" className="mt-28 md:mt-36">
          <SectionHeading eyebrow="Working with us from another country" id="abroad">
            Built to work with clients <span className="ink">we may never meet in person.</span>
          </SectionHeading>
          <p className="-mt-4 mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Most of our communication is written and asynchronous by design,
            which is what makes a time difference of four to thirteen hours workable.
            The practical answers, by topic:
          </p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {ABROAD.map((g, i) => (
              <div key={g.title} className="border-t rule pt-6">
                <h3 className="flex items-baseline gap-4 font-heading text-2xl leading-tight text-foreground md:text-3xl">
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {g.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons */}
        <section data-reveal="" aria-labelledby="lessons" className="mt-28 md:mt-36">
          <SectionHeading eyebrow="What shipping has taught us" id="lessons">
            Five lessons, <span className="ink">each with a case study.</span>
          </SectionHeading>
          <ol className="divide-y divide-[hsl(var(--hairline))] border-y rule">
            {LESSONS.map((l, i) => {
              const p = getProject(l.slug);
              if (!p) return null;
              const host = p.liveUrl ? new URL(p.liveUrl).hostname.replace(/^www\./, "") : null;
              return (
                <li key={l.slug} className="grid grid-cols-1 gap-5 py-8 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-5">
                    <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-heading text-3xl leading-[1.05] tracking-tight text-foreground">{l.lesson}</h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{l.detail}</p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
                      <Link href={`/projects/${p.slug}/`} className="text-violet-400 transition-colors hover:text-violet-300">
                        {p.title} case study
                      </Link>
                      {host && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                          <span className="live-dot" aria-hidden="true" />
                          {host}
                        </a>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Models */}
        <section data-reveal="" aria-labelledby="models" className="mt-28 md:mt-36">
          <SectionHeading eyebrow="Ways to work with us" id="models">
            Priced per project, <span className="ink">agreed in writing.</span>
          </SectionHeading>
          <p className="-mt-4 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every engagement is agreed before it starts. The discovery sprint
            is always fixed-price, quoted after the first conversation.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m, i) => (
              <div key={m.name} className="rounded-3xl border rule bg-card/60 p-6">
                <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* People + credentials */}
        <section data-reveal="" aria-labelledby="people" className="mt-28 md:mt-36">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Who signs, who answers" id="people">
                The whole <span className="ink">chain of command.</span>
              </SectionHeading>
              <ul className="-mt-4 divide-y divide-[hsl(var(--hairline))] border-y rule">
                {TEAM.map((person) => (
                  <li key={person.name} className="flex items-center gap-5 py-4">
                    <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 font-heading text-lg text-violet-300">
                      {person.initials}
                    </span>
                    <span>
                      <span className="block font-heading text-2xl leading-tight text-foreground">{person.name}</span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{person.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl border rule bg-card/60 p-6 sm:p-8">
                <p className="eyebrow mb-5 !text-foreground">On the record</p>
                <dl className="divide-y divide-[hsl(var(--hairline))] text-sm">
                  {[
                    { k: "Legal entity", v: `${BUSINESS.legalName}, incorporated in India` },
                    { k: "Office", v: `${BUSINESS.streetAddress}, ${BUSINESS.localityOfficial} (${BUSINESS.locality}), ${BUSINESS.region} ${BUSINESS.postalCode}, India` },
                    { k: ISO.standard, v: `${ISO.system}, certificate ${ISO.certNumber}, ${ISO.registrar}, valid to ${ISO.expiresOnLabel}` },
                    { k: "GSTIN", v: BUSINESS.gstin },
                    { k: "Hours", v: "10:00 – 19:00 IST, Monday to Friday" },
                  ].map((row) => (
                    <div key={row.k} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-6">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">{row.k}</dt>
                      <dd className="text-foreground sm:col-span-2">{row.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t rule pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  Certificate validity can be checked with the registrar at{" "}
                  <a href={ISO.verifyUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground">
                    {ISO.verifyUrl.replace("https://", "")}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section data-reveal="" aria-labelledby="faq" className="mt-28 max-w-3xl md:mt-36">
          <SectionHeading eyebrow="Questions we get asked" id="faq">
            Before the <span className="ink">first call.</span>
          </SectionHeading>
          <dl className="divide-y divide-[hsl(var(--hairline))] border-y rule">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-heading text-2xl leading-tight text-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section data-reveal="" className="mt-24 rounded-3xl border rule bg-card/60 p-8 text-center md:p-14">
          <h2 className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
            Start with <span className="ink">the conversation.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Thirty minutes, in your hours, no preparation needed. Tell us what
            you are building and where it stands.
          </p>
          <Link href="/contact/" className="brand-cta mt-8 inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
            Start a project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
