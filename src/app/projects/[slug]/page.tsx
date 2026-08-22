import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { clientLabel, getProject, projects } from "@/data/projects";

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
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — case study | Globoniks`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <>
      <h2 className="mb-4 mt-12 font-heading text-2xl font-bold text-foreground">
        {heading}
      </h2>
      <p>{body}</p>
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
    <div className="min-h-screen bg-background pb-24 pt-32">
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
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
