import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { clientLabel, getProject, projects, whiteLabelLabel, type Prose } from "@/data/projects";
import { breadcrumbSchema } from "@/lib/site";

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
  return {
    title: `${project.title} — case study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.title} — case study | Globoniks`,
      description: project.summary,
      url: `/projects/${project.slug}/`,
    },
  };
}

function Section({ heading, body }: { heading: string; body: Prose }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <>
      <h2 className="mb-4 mt-12 font-heading text-2xl font-bold text-foreground">
        {heading}
      </h2>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 40)}>{text}</p>
      ))}
    </>
  );
}

export default function ProjectDetail({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const client = clientLabel(project.client);
  const host = project.liveUrl
    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
    : null;

  return (
    <div className="min-h-screen pb-24 pt-32">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our work", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-12">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to our work
          </Link>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <h1 className="mb-6 font-heading text-4xl font-black tracking-tight text-foreground md:text-5xl">
              {project.title}
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground dark:prose-invert">
              <p className="lead text-xl font-medium text-foreground">
                {project.overview ?? project.summary}
              </p>

              {/*
                Sections render only when the content exists. A project with no
                written challenge or outcome shows a short honest page rather
                than the generic "we re-architected the monolith into
                microservices" copy that every case study used to share.
              */}
              {project.challenge && (
                <Section heading="The problem" body={project.challenge} />
              )}
              {project.approach && (
                <Section heading="What we built" body={project.approach} />
              )}
              {project.outcome && (
                <Section heading="Outcome" body={project.outcome} />
              )}
            </div>

            {project.whiteLabel && (
              <aside
                aria-labelledby="white-label"
                className="mt-12 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-8"
              >
                <h2
                  id="white-label"
                  className="mb-4 font-heading text-2xl font-bold text-foreground"
                >
                  {project.whiteLabel.stage === "offered"
                    ? `Available as a white-label platform for ${project.whiteLabel.audience}`
                    : `Planned as a white-label platform for ${project.whiteLabel.audience}`}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {project.whiteLabel.pitch}
                </p>
                {project.whiteLabel.modules && project.whiteLabel.modules.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Included modules">
                    {project.whiteLabel.modules.map((m) => (
                      <li key={m}>
                        <Badge
                          variant="outline"
                          className="border-border bg-muted/50 text-xs text-muted-foreground"
                        >
                          {m}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/contact/"
                  className="mt-6 inline-flex items-center font-semibold text-violet-500 transition-colors hover:text-violet-400"
                >
                  {project.whiteLabel.stage === "offered"
                    ? "Talk to us about a white-label deployment"
                    : "Register interest"}
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </aside>
            )}

            {project.quote && (
              <figure className="mt-12 rounded-2xl border border-border bg-muted/20 p-8">
                <blockquote className="text-lg leading-relaxed text-foreground">
                  &ldquo;{project.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {project.quote.name}
                  </span>
                  , {project.quote.role}, {project.quote.company}
                </figcaption>
              </figure>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 rounded-2xl border border-border bg-muted/20 p-8">
              {project.logo && (
                <div className="mb-6 flex items-center justify-center rounded-xl border border-border bg-muted/20 p-5">
                  <Image
                    src={project.logo.src}
                    alt={project.logo.alt}
                    width={140}
                    height={70}
                    unoptimized
                    className="max-h-16 w-auto"
                  />
                </div>
              )}
              <h2 className="mb-6 border-b border-border pb-4 font-heading text-lg font-bold text-foreground">
                Project overview
              </h2>

              <dl className="space-y-6">
                {client && (
                  <div>
                    <dt className="mb-2 text-sm font-medium text-muted-foreground">
                      Client
                    </dt>
                    <dd className="font-medium text-foreground">{client}</dd>
                  </div>
                )}

                {project.stack.length > 0 && (
                <div>
                  <dt className="mb-2 text-sm font-medium text-muted-foreground">
                    Stack
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border border-border bg-background text-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </dd>
                </div>
                )}

                {/* Timeline is omitted unless known. It used to read
                    "4 Months" on all four case studies. */}
                {project.timeline && (
                  <div>
                    <dt className="mb-2 text-sm font-medium text-muted-foreground">
                      Timeline
                    </dt>
                    <dd className="font-medium text-foreground">
                      {project.timeline}
                    </dd>
                  </div>
                )}

                {project.liveUrl && (
                  <div>
                    <dt className="mb-2 text-sm font-medium text-muted-foreground">
                      Live site
                    </dt>
                    <dd>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-medium text-violet-500 transition-colors hover:text-violet-400"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
                        {host}
                      </a>
                    </dd>
                  </div>
                )}

                {project.whiteLabel && (
                  <div>
                    <dt className="mb-2 text-sm font-medium text-muted-foreground">
                      Offered as
                    </dt>
                    <dd className="font-medium text-foreground">
                      {whiteLabelLabel(project.whiteLabel.stage)} · for{" "}
                      {project.whiteLabel.audience}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>

        {/* Case studies had no conversion path at all before this. */}
        <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center lg:p-12">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
            {project.whiteLabel?.stage === "offered"
              ? "Want this running under your own name?"
              : "Have a project like this?"}
          </h2>
          <p className="mb-8 text-muted-foreground">
            Describe it to us — your message lands directly with a founder.
          </p>
          <Link
            href="/contact/"
            className="brand-cta inline-flex rounded-full px-8 py-4 text-base font-semibold"
          >
            {project.whiteLabel?.stage === "offered"
              ? "Ask about a white-label deployment"
              : "Talk to us"}
          </Link>
        </div>
      </div>
    </div>
  );
}
