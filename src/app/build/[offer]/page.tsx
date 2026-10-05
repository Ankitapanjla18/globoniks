import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { StructuredData } from "@/components/seo/StructuredData";
import { getOffer, offers } from "@/data/offers";
import { getProject } from "@/data/projects";
import { STAGES } from "@/data/process";
import { SITE_URL, breadcrumbSchema, pageMetadata } from "@/lib/site";

type Props = { params: { offer: string } };

/*
 * "Want something like this?" landing page. Reached mainly from a link on
 * the example product's own site, so it assumes the visitor has just seen
 * the product and answers, in order: what you are looking at, what it
 * would take from you, how it happens, what else can be added, and the
 * questions people ask before they get in touch. All copy comes from
 * src/data/offers.ts; the process from src/data/process.ts.
 */
export function generateStaticParams() {
  return offers.map((o) => ({ offer: o.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const offer = getOffer(params.offer);
  if (!offer) return {};
  return pageMetadata({
    title: offer.title,
    description: offer.description,
    path: `/build/${offer.slug}/`,
  });
}

function Heading({ eyebrow, children, id }: { eyebrow: string; children: React.ReactNode; id: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 id={id} className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

export default function OfferPage({ params }: Props) {
  const offer = getOffer(params.offer);
  if (!offer) notFound();
  const example = getProject(offer.exampleSlug);
  if (!example?.liveUrl) notFound();
  const host = new URL(example.liveUrl).hostname.replace(/^www\./, "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: offer.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.title,
    description: offer.description,
    url: `${SITE_URL}/build/${offer.slug}/`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    subjectOf: { "@id": `${SITE_URL}/projects/${example.slug}/#work` },
  };

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: offer.title, path: `/build/${offer.slug}` },
        ])}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="reveal grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" style={{ "--i": 0 } as React.CSSProperties}>
            <p className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="live-dot" aria-hidden="true" />
              <span>{host}</span>
              <span aria-hidden="true" className="text-violet-500">·</span>
              <span>Built and run by Globoniks</span>
            </p>
            <h1 className="reveal-lcp font-heading text-[2.9rem] leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Want {offer.want} <span className="ink">{example.title}?</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">{offer.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={`/contact/?about=${offer.slug}`} className="brand-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={example.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium"
              >
                Open {example.title}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <aside className="lg:col-span-5 lg:pt-4" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="rounded-3xl border rule bg-card/60 p-6 backdrop-blur-md sm:p-7">
              <p className="eyebrow mb-4 !text-foreground">This is for</p>
              <ul className="divide-y divide-[hsl(var(--hairline))]">
                {offer.audience.map((a) => (
                  <li key={a} className="flex items-start gap-3 py-3 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t rule pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                Small shops are usually quoted straight after the first conversation; larger builds start with a discovery sprint. Replies within one working day.
              </p>
            </div>
          </aside>
        </section>

        {/* Features */}
        <section data-reveal="" className="mt-28 md:mt-36" aria-labelledby="features-heading">
          <Heading eyebrow="What you are looking at" id="features-heading">
            Everything {example.title} <span className="ink">runs on.</span>
          </Heading>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {offer.features.map((g, i) => (
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

        {/* Requirements */}
        <section data-reveal="" className="mt-28 md:mt-36" aria-labelledby="needs-heading">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Heading eyebrow="What it takes from you" id="needs-heading">
                  Less than <span className="ink">you think.</span>
                </Heading>
                <p className="-mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                  Most of this you already have. The rest we set up together
                  before the build starts.
                </p>
              </div>
            </div>
            <ol className="lg:col-span-8">
              {offer.requirements.map((r, i) => (
                <li key={r.item} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t rule py-6 last:border-b md:grid-cols-[3rem_1fr] md:gap-x-8">
                  <span className="pt-1 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading text-2xl leading-tight text-foreground">{r.item}</h3>
                    {r.note && <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">{r.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Process */}
        <section data-reveal="" className="mt-28 md:mt-36" aria-labelledby="steps-heading">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Heading eyebrow="How it happens" id="steps-heading">
              The complete steps, <span className="ink">start to launch.</span>
            </Heading>
            <Link href="/how-we-work/" className="mb-10 inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300">
              How we work, in full
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => (
              <li key={s.name} className="flex flex-col rounded-3xl border rule bg-card/60 p-6">
                <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-violet-400">
                  {String(i + 1).padStart(2, "0")} · {s.when}
                </p>
                <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">{s.name}</h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <p className="mt-5 border-t rule pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">You receive</p>
                <ul className="mt-2 space-y-1.5">
                  {s.receive.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* Add-ons */}
        <section data-reveal="" className="mt-28 md:mt-36" aria-labelledby="addons-heading">
          <Heading eyebrow="What else can be added" id="addons-heading">
            Features shops across the web run — <span className="ink">built when you need them.</span>
          </Heading>
          <p className="-mt-4 mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            None of these is in {example.title} today, and none is needed to
            open. Items marked <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-400">shipped in</span> already
            run in a product we built; the rest we build to order.
          </p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {offer.addOns.map((group) => (
              <div key={group.title} className="border-t rule pt-6">
                <h3 className="font-heading text-2xl leading-tight text-foreground md:text-3xl">{group.title}</h3>
                <ul className="mt-5 divide-y divide-[hsl(var(--hairline))]">
                  {group.items.map((a) => {
                    const proof = a.proofSlug ? getProject(a.proofSlug) : undefined;
                    return (
                      <li key={a.name} className="py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-medium text-foreground">{a.name}</span>
                          {proof ? (
                            <Link
                              href={`/projects/${proof.slug}/`}
                              className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-400 transition-colors hover:text-violet-300"
                            >
                              Shipped in {proof.title}
                            </Link>
                          ) : (
                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">On request</span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.what}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section data-reveal="" className="mt-28 max-w-3xl md:mt-36" aria-labelledby="faq-heading">
          <Heading eyebrow="Before you write to us" id="faq-heading">
            Questions people <span className="ink">ask first.</span>
          </Heading>
          <dl className="divide-y divide-[hsl(var(--hairline))] border-y rule">
            {offer.faq.map((f) => (
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
            Tell us what <span className="ink">you make.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            A few lines about your products and where you sell today is enough.
            Ankita replies within one working day, and the first conversation
            is just that.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/contact/?about=${offer.slug}`} className="brand-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
              Start a project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href={`/projects/${example.slug}/`} className="ghost-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
              Read the {example.title} case study
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
