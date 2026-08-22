import { liveProjects } from "@/data/projects";

/**
 * Previously listed all four projects generically, including two under NDA
 * with no client name attached to "trust" ("Pharma Enterprise", "SaaS Direct
 * Sales" are project labels, not client names, so they proved nothing). Now
 * shows only the projects a visitor can click through and verify themselves.
 */
export function SocialProofBar() {
  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
          Live products we&apos;ve built
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          {liveProjects.map((project) => (
            <a
              key={project.slug}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-border bg-card shadow-sm text-foreground font-medium text-sm sm:text-base hover:border-violet-500/30 transition-colors"
            >
              {project.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
