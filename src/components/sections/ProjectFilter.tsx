"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project } from "@/data/projects";

/**
 * Only the filter needs to be interactive. Keeping it in its own client
 * component lets /projects stay a Server Component, which is what allows that
 * route to export metadata at all -- the whole page was previously
 * "use client" for these three buttons.
 *
 * The filter is "all / live" rather than the previous "enterprise / startup",
 * which required guessing a category for each project. Whether a prospect can
 * click through and see the thing running is both verifiable and the thing
 * they actually care about.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [liveOnly, setLiveOnly] = useState(false);
  const liveCount = projects.filter((p) => p.liveUrl).length;
  const shown = liveOnly ? projects.filter((p) => p.liveUrl) : projects;

  const tab = (active: boolean) =>
    `px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
      active
        ? "bg-foreground text-background"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    }`;

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="mb-12 flex flex-wrap items-center gap-3 border-b border-border pb-6"
      >
        <button
          type="button"
          onClick={() => setLiveOnly(false)}
          aria-pressed={!liveOnly}
          className={tab(!liveOnly)}
        >
          All projects ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => setLiveOnly(true)}
          aria-pressed={liveOnly}
          className={tab(liveOnly)}
        >
          Live sites ({liveCount})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
