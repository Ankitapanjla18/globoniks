import type { Metadata } from "next";
import { projects, liveProjects } from "@/data/projects";
import { ProjectFilter } from "@/components/sections/ProjectFilter";

export const metadata: Metadata = {
  title: "Our work",
  description: `Software we have built: ${liveProjects
    .map((p) => p.title)
    .join(", ")} and more. Web, mobile and custom systems from Globoniks, Mohali.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndex() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <h1 className="mb-6 font-heading text-5xl font-black tracking-tight text-foreground md:text-6xl">
            Our <span className="text-indigo-600">work.</span>
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground">
            {liveProjects.length} of these are live and running right now — open
            them and judge the work for yourself.
          </p>
        </div>

        <ProjectFilter projects={projects} />
      </div>
    </div>
  );
}
