import type { Metadata } from "next";
import Link from "next/link";
import { projects, liveProjects, whiteLabelProjects } from "@/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProductRow } from "@/components/cards/ProductRow";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL, pageMetadata, webPageSchema } from "@/lib/site";

const PAGE = {
  title: "Our work — live products and case studies",
  // Capped to three live titles so the description stays under ~160 chars.
  description: `Software built by Globoniks: ${liveProjects
    .slice(0, 3)
    .map((p) => p.title)
    .join(", ")} and more — most live for you to open, plus platforms offered under your own name.`,
  path: "/projects/",
};

export const metadata: Metadata = pageMetadata(PAGE);

/**
 * One page, two strips: client projects (a card grid, logos where they
 * exist) and the studio's own products (single-column rows). Products
 * merged in here from a separate /products page at the owner's request --
 * a grid of logo-less product cards read thin on its own.
 *
 * A planned product (pharma) stays in the client strip, where its case
 * study belongs; its "White-label planned" pill and callout carry the
 * intent, and the products strip points at it. No row appears twice.
 */
export default function ProjectsIndex() {
  const offered = whiteLabelProjects.filter((p) => p.whiteLabel?.stage === "offered");
  const planned = whiteLabelProjects.filter((p) => p.whiteLabel?.stage === "planned");
  const clientProjects = projects.filter((p) => p.whiteLabel?.stage !== "offered");
  const liveClient = clientProjects.filter((p) => p.liveUrl && !p.demo).length;

  return (
    <div className="min-h-screen pb-24 pt-32">
      <StructuredData
        data={webPageSchema({
          type: "CollectionPage",
          name: PAGE.title,
          ...PAGE,
          extra: {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE_URL}/projects/${p.slug}/`,
                name: p.title,
              })),
            },
          },
        })}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <h1 className="mb-6 font-heading text-5xl tracking-tight text-foreground md:text-6xl">
            Our <span className="ink">work.</span>
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground">
            Systems we built for clients and a brand of our own — most of
            them live for you to open and judge — plus platforms offered
            under your name.
          </p>
        </div>

        <section id="client-projects" aria-labelledby="client-projects-heading">
          <div className="mb-10">
            <h2
              id="client-projects-heading"
              className="font-heading text-3xl tracking-tight text-foreground md:text-4xl"
            >
              Projects
            </h2>
            <p className="mt-2 text-muted-foreground">
              {liveClient} of {clientProjects.length} are live right now.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {clientProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section
          id="products"
          aria-labelledby="products-heading"
          className="mt-24 border-t border-border pt-16"
        >
          <div className="mb-10 max-w-3xl">
            <h2
              id="products-heading"
              className="font-heading text-3xl tracking-tight text-foreground md:text-4xl"
            >
              Our products, <span className="ink">under your name.</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Platforms we built and run, offered as your own instance — your
              name, your data, the team that built it behind you.
            </p>
          </div>
          <div className="space-y-4">
            {offered.map((p) => (
              <ProductRow key={p.slug} project={p} />
            ))}
          </div>
          {planned.length > 0 && (
            <p className="mt-6 text-sm text-muted-foreground">
              Planned next:{" "}
              {planned.map((p, i) => (
                <span key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}/`}
                    className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                  >
                    {p.title}
                  </Link>
                  {i < planned.length - 1 ? ", " : ""}
                </span>
              ))}{" "}
              — built for a client, and on our roadmap to offer more widely.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
