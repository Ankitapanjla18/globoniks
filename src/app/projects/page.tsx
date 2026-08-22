"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsIndex() {
  const [filter, setFilter] = useState<"all" | "enterprise" | "startup">("all");

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
    {
      title: "SaaS Direct Sales",
      description: "End-to-end multi-tenant architecture for a direct sales dashboard with complex real-time analytics and revenue projections.",
      thumbnail: "saas-thumb.jpg",
      tags: ["React", "Express", "AWS Lambda"],
      slug: "saas-direct-sales",
      enterprise: true,
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "enterprise") return p.enterprise;
    if (filter === "startup") return !p.enterprise;
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Our Engineering <span className="text-indigo-600">Portfolio.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Browse our technical case studies. From massive enterprise architectures to high-velocity startup MVPs, our code powers scalable solutions globally.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-border pb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${filter === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter("enterprise")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${filter === "enterprise" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Enterprise Scale
          </button>
          <button
            onClick={() => setFilter("startup")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${filter === "startup" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Startup Velocity
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
