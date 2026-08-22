"use client";

import { ProjectCard } from "@/components/cards/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedProjectsSection() {
  const projects = [
    {
      title: "EduMapping System",
      description: "A placement management platform for colleges and universities, covering the full lifecycle from job posting through candidate selection.",
      thumbnail: "edumapping-thumb.jpg",
      tags: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
      slug: "edumapping",
      enterprise: true,
    },
    {
      title: "Pharma Supply Chain",
      description: "Real-time tracking application strictly compliant with global pharma regulations, integrating IoT sensors and a unified dashboard.",
      thumbnail: "pharma-thumb.jpg",
      tags: ["React Native", "Express", "MongoDB"],
      slug: "pharma-supply",
      enterprise: true,
    },
    {
      title: "Artisan Marketplace",
      description: "A multi-vendor e-commerce platform for handcrafted goods, with vendor management, commission handling and integrated payments.",
      thumbnail: "artisan-thumb.jpg",
      tags: ["MERN Stack", "Stripe", "Redis"],
      slug: "artisan-marketplace",
      enterprise: false,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4 text-foreground">
              Work that speaks <span className="text-indigo-600">volumes.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We don&apos;t just build apps; we engineer resilient systems architecture. 
              Here are a few projects that define our engineering standards.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/projects"
              className="inline-flex items-center text-indigo-500 font-semibold hover:text-indigo-400 transition-colors"
            >
              View all projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
