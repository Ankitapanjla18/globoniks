import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { BUSINESS, breadcrumbSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "How a project runs at Globoniks: a first conversation, a paid two-week discovery sprint with deliverables you keep, milestone builds with weekly demos, and support after launch. Direct access to the founder throughout.",
  alternates: { canonical: "/how-we-work/" },
};

/*
 * Written from confirmed facts: founder-led, Ankita runs client relations,
 * Saksham leads development, replies within one working day, IST office,
 * GST-registered. Two policy statements (ownership of deliverables, NDAs)
 * are sensible defaults flagged for the owner's confirmation in
 * NEEDS-INPUT -- no prices anywhere.
 */

const STAGES = [
  {
    name: "First conversation",
    when: "Free · 30 minutes",
    body: "You describe what you are building and where it stands; we ask the questions that decide the shape of the work. No proposal theatre — you leave knowing whether we are the right fit and what the next step costs.",
    receive: ["A straight answer on fit", "A recommended next step and its fixed price"],
  },
  {
    name: "Discovery sprint",
    when: "Two weeks · fixed price",
    body: "A short, paid engagement that turns an idea into a plan you can act on — with us or with anyone else. We interview the people involved, map the system, and settle the architecture before a line of production code is written. Larger companies use it as the low-risk first step; so should you.",
    receive: [
      "A written scope: what is in, what is out, and why",
      "An architecture outline and the stack we recommend",
      "A milestone plan with an estimate for the full build",
      "A risk list — the things most likely to bite, and how we would handle them",
      "Where it helps, a clickable prototype of the core flow",
    ],
  },
  {
    name: "Build",
    when: "Milestones · weekly demos",
    body: "Work ships in milestones you can open, not slide decks you have to trust. Every week you get a demo on a staging environment and a short written update. Testing and CI/CD are part of the baseline, never an upsell.",
    receive: [
      "A staging environment you can open at any time",
      "A weekly demo and written progress note",
      "Automated tests and a deployment pipeline from the first milestone",
    ],
  },
  {
    name: "Launch and handover",
    when: "Deployment · documentation",
    body: "We deploy, we document, and we hand over — the code, the infrastructure access, and the runbook your team needs to operate it. Nothing is held hostage.",
    receive: ["Production deployment", "Handover documentation and runbooks", "Source code and access, per the agreement"],
  },
  {
    name: "After launch",
    when: "Maintenance plans",
    body: "Software is not finished at launch. Maintenance plans cover dependency and security updates, performance work, scaling, and the small changes every live product needs — from the people who built it.",
    receive: ["Scheduled updates and monitoring", "A named engineer who knows the codebase", "Replies within one working day"],
  },
];

const MODELS = [
  { name: "Discovery sprint", body: "Two weeks, fixed price, deliverables you keep. The right first step for anything larger than a small site." },
  { name: "Fixed scope", body: "A defined build with milestones and a fixed price, quoted after discovery. Changes are priced, not absorbed silently." },
  { name: "Monthly retainer", body: "A set number of engineering days per month for products that keep evolving. Priorities re-set every month." },
  { name: "Maintenance plan", body: "Ongoing care for a live system — updates, monitoring, performance — with an agreed response window." },
  { name: "White-label instance", body: "Your own instance of a platform we already built and run, under your name. See our products." },
];

const FAQ = [
  {
    q: "Who will I actually talk to?",
    a: "Ankita, the founder, runs every client relationship; Saksham Panjla, who leads development, joins the engineering conversations. There is no account manager layer between you and the people doing the work.",
  },
  {
    q: "Do we need to be in India to work with you?",
    a: "No. We are based in Mohali, Punjab (IST, UTC+5:30) and schedule calls in your working hours. Written updates, demos on a staging environment and a shared channel keep the work visible across time zones.",
  },
  {
    q: "What does the discovery sprint cost?",
    a: "A fixed price, quoted after the first conversation once we know the scale of what you are building. The deliverables are yours whether or not you continue with us.",
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
    q: "How quickly do you reply?",
    a: "Within one working day, from a founder.",
  },
];

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

  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData data={faqSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How we work", path: "/how-we-work" },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            How we <span className="text-violet-600">work.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Small studio, direct access. {BUSINESS.legalName} is founder-led:
            Ankita runs every client relationship and Saksham Panjla leads
            development, so the person you talk to sits at the same table as
            the person building your system. Here is what a project looks like,
            stage by stage, and what you receive at each one.
          </p>
        </div>

        <section aria-labelledby="stages" className="mb-24">
          <h2 id="stages" className="sr-only">Stages</h2>
          <ol className="space-y-6 max-w-4xl">
            {STAGES.map((s, i) => (
              <li
                key={s.name}
                className="rounded-2xl border border-border bg-card p-6 md:p-8 md:grid md:grid-cols-[64px_1fr] md:gap-6"
              >
                <div className="mb-3 md:mb-0 font-heading text-3xl font-black text-violet-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className="font-heading text-2xl font-bold text-foreground">{s.name}</h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.when}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{s.body}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">You receive</p>
                  <ul className="space-y-1.5">
                    {s.receive.map((r) => (
                      <li key={r} className="flex items-start text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="models" className="mb-24">
          <h2 id="models" className="font-heading text-3xl font-black tracking-tight text-foreground mb-3">
            Ways to work with us
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Every engagement is priced per project and agreed in writing before
            it starts. The discovery sprint is the only thing with a standing
            price, and it is fixed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODELS.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{m.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="comms" className="mb-24 max-w-3xl">
          <h2 id="comms" className="font-heading text-3xl font-black tracking-tight text-foreground mb-3">
            Communication
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" /><span>A shared channel for the project — WhatsApp or email, whichever your team already lives in — plus video calls scheduled in your working hours.</span></li>
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" /><span>A weekly written update and a demo on the staging environment during the build.</span></li>
            <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-violet-500 mr-3 mt-0.5 flex-shrink-0" /><span>Replies within one working day, from a founder. We are in Mohali, Punjab (IST, UTC+5:30); {BUSINESS.legalName} is a GST-registered business ({BUSINESS.gstin}).</span></li>
          </ul>
        </section>

        <section aria-labelledby="faq" className="mb-20 max-w-3xl">
          <h2 id="faq" className="font-heading text-3xl font-black tracking-tight text-foreground mb-6">
            Questions we get asked
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {FAQ.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-semibold text-foreground mb-1.5">{f.q}</dt>
                <dd className="text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="max-w-3xl rounded-2xl border border-border bg-muted/30 p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
            Start with the conversation.
          </h2>
          <p className="text-muted-foreground mb-8">
            Thirty minutes, no preparation needed. Tell us what you are building.
          </p>
          <Link href="/contact/" className="brand-cta px-8 py-4 rounded-full text-base font-semibold inline-flex">
            Talk to us
          </Link>
        </div>
      </div>
    </div>
  );
}
