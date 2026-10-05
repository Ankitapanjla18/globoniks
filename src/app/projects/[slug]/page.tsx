import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { clientLabel, getProject, projects, whiteLabelLabel, type Prose } from "@/data/projects";
import { services } from "@/data/services";
import { offerForProject } from "@/data/offers";
import { SITE_URL, breadcrumbSchema, pageMetadata, snippet } from "@/lib/site";
import { ArrowLink, CtaPanel, PageHeader } from "@/components/ui/page";

type Props = { params: { slug: string } };

/**
 * Without this, any slug rendered a 200 with content synthesised from the URL
 * string -- "/projects/total-nonsense" returned a full case study titled
 * "Total Nonsense Architecture". That was an unbounded duplicate-content
 * surface. Now only real projects exist and everything else 404s.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — case study`,
    description: snippet(project.summary),
    path: `/projects/${project.slug}/`,
    type: "article",
  });
}

/**
 * The project as a CreativeWork made by the organization. `url` is the case
 * study; the live product, when public, goes in `sameAs` so the two are
 * linked as the same thing rather than competing for the entity.
 */
function projectSchema(project: NonNullable<ReturnType<typeof getProject>>) {
  const url = `${SITE_URL}/projects/${project.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    url,
    description: project.summary,
    creator: { "@id": `${SITE_URL}/#organization` },
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    ...(project.stack.length > 0 ? { keywords: project.stack.join(", ") } : {}),
    ...(project.logo ? { image: `${SITE_URL}${project.logo.src}` } : {}),
    inLanguage: "en-IN",
  };
}

/**
 * One case-study section: mono label in the margin, paragraphs beside it.
 * (The page used Tailwind `prose` classes before, but the typography plugin
 * is not installed, so paragraphs ran together with no spacing.)
 */
function Section({ label, body }: { label: string; body: Prose }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <section data-reveal="" className="grid grid-cols-1 gap-3 border-t rule py-10 md:grid-cols-[9rem_1fr] md:gap-10">
      <h2 className="eyebrow pt-1.5">{label}</h2>
      <div className="space-y-5 text-base leading-[1.75] text-muted-foreground md:text-[17px]">
        {paragraphs.map((text) => (
          <p key={text.slice(0, 40)}>{text}</p>
        ))}
      </div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
      <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

export default function ProjectDetail({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const client = clientLabel(project.client, project.ownBrand);
  const host = project.liveUrl
    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
    : null;
  // Services already cite this project as proof; link back so each case
  // study and the service it supports point at each other.
  const relatedServices = services.filter((s) => s.proofSlugs.includes(project.slug));
  // A "want something like this?" page that uses this project as its example.
  const offer = offerForProject(project.slug);
  const wl = project.whiteLabel;

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-40">
      <StructuredData data={projectSchema(project)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our work", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          back={{ href: "/projects/", label: "All work" }}
          eyebrow={project.ownBrand ? "Our own brand" : wl ? "Our platform" : "Case study"}
          title={project.title}
          lead={project.overview ?? project.summary}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-cta mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 font-mono text-xs"
            >
              <span className="live-dot" aria-hidden="true" />
              {host}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </PageHeader>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            {/*
              Sections render only when the content exists. A project with no
              written challenge or outcome shows a short honest page rather
              than the generic "we re-architected the monolith into
              microservices" copy that every case study used to share.
            */}
            {project.challenge && <Section label="The problem" body={project.challenge} />}
            {project.approach && <Section label="What we built" body={project.approach} />}
            {project.outcome && <Section label="Outcome" body={project.outcome} />}

            {wl && (
              <aside
                data-reveal=""
                aria-labelledby="white-label"
                className="mt-10 rounded-3xl border border-violet-500/30 bg-violet-500/[0.06] p-7 md:p-9"
              >
                <p className="eyebrow-accent mb-4">{whiteLabelLabel(wl.stage)}</p>
                <h2 id="white-label" className="font-heading text-3xl leading-[1.05] tracking-tight text-foreground">
                  {wl.stage === "offered" ? "Available" : "Planned"} as a white-label platform{" "}
                  <span className="ink">for {wl.audience}.</span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{wl.pitch}</p>
                {wl.modules && wl.modules.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Included modules">
                    {wl.modules.map((m) => (
                      <li key={m}>
                        <Badge
                          variant="outline"
                          className="border-[hsl(var(--hairline))] bg-transparent font-mono text-[11px] font-normal text-muted-foreground"
                        >
                          {m}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            )}

            {project.quote && (
              <figure data-reveal="" className="mt-10 border-l-2 border-violet-500/60 pl-6">
                <blockquote className="font-heading text-2xl leading-snug text-foreground md:text-3xl">
                  &ldquo;{project.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="text-foreground">{project.quote.name}</span> · {project.quote.role}, {project.quote.company}
                </figcaption>
              </figure>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-3xl border rule bg-card/60 p-6 lg:sticky lg:top-28">
              {project.logo && (
                <div className="mb-5 flex items-center justify-center rounded-2xl border rule bg-background/40 p-5">
                  <Image
                    src={project.logo.src}
                    alt={project.logo.alt}
                    width={140}
                    height={70}
                    unoptimized
                    className="max-h-14 w-auto"
                  />
                </div>
              )}
              <p className="eyebrow mb-1 !text-foreground">At a glance</p>
              <dl className="divide-y divide-[hsl(var(--hairline))]">
                {client && <Fact label={project.ownBrand ? "Brand" : "Client"}>{client}</Fact>}
                {project.stack.length > 0 && (
                  <Fact label="Stack">
                    <span className="font-mono text-xs leading-relaxed">{project.stack.join(" / ")}</span>
                  </Fact>
                )}
                {/* Timeline is omitted unless known. It used to read
                    "4 Months" on all four case studies. */}
                {project.timeline && <Fact label="Timeline">{project.timeline}</Fact>}
                {project.liveUrl && (
                  <Fact label="Live">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-violet-400 transition-colors hover:text-violet-300"
                    >
                      {host}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Fact>
                )}
                {wl && (
                  <Fact label="Offered as">
                    {whiteLabelLabel(wl.stage)} · for {wl.audience}
                  </Fact>
                )}
                {relatedServices.length > 0 && (
                  <Fact label={relatedServices.length === 1 ? "Service" : "Services"}>
                    <span className="flex flex-col gap-1.5">
                      {relatedServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}/`}
                          className="text-violet-400 transition-colors hover:text-violet-300"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </span>
                  </Fact>
                )}
              </dl>
              {offer && (
                <div className="mt-5 border-t rule pt-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Want {offer.want} {project.title}?
                  </p>
                  <ArrowLink href={`/build/${offer.slug}/`} className="mt-2">
                    What it takes
                  </ArrowLink>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Case studies had no conversion path at all before this. */}
        {offer ? (
          <CtaPanel
            title={`Want ${offer.want}`}
            accent={`${project.title}?`}
            body="What it takes from you, the complete steps, and what can be added — all on one page."
            primary={{ href: `/contact/?about=${offer.slug}`, label: "Start a project" }}
            secondary={{ href: `/build/${offer.slug}/`, label: "See what it takes" }}
          />
        ) : wl?.stage === "offered" ? (
          <CtaPanel
            title="Want this running"
            accent="under your own name?"
            body="Your own instance, your name and your data, deployed and supported by the team that built it."
            primary={{ href: "/contact/", label: "Ask about a white-label deployment" }}
          />
        ) : (
          <CtaPanel
            title="Have a project"
            accent="like this?"
            body="Describe it in a few lines. It lands directly with Ankita, the founder, and you hear back within one working day."
            secondary={{ href: "/how-we-work/", label: "How we work" }}
          />
        )}
      </div>
    </div>
  );
}
