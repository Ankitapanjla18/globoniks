"use client";

import { ProjectCard } from "@/components/cards/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

// Leads with the live, clickable projects -- something a visitor can verify
// themselves beats a description of a project they can't see.
const featured = projects.filter((p) => p.liveUrl).slice(0, 3);

export function FeaturedProjectsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4 text-foreground">
              Work that speaks <span className="text-violet-600">volumes.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We don&apos;t just build apps; we engineer resilient systems architecture.
              Here are a few projects that define our engineering standards.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/projects"
              className="inline-flex items-center text-violet-500 font-semibold hover:text-violet-400 transition-colors"
            >
              View all projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
