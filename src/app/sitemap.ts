import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { tracks } from "@/data/mentorship";

/**
 * Native App Router sitemap (served at /sitemap.xml). Replaces next-sitemap,
 * which was installed but never ran: no postbuild hook, and it writes into
 * public/, which didn't exist. Every URL here is enumerated from the same
 * data files that gate the routes, so the sitemap cannot list a page that
 * 404s or miss one that exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const statics = [
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/mentorship", priority: 0.7 },
  ];

  return [
    ...statics.map((s) => ({
      url: `${SITE_URL}${s.path}`,
      lastModified,
      priority: s.priority,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified,
      priority: 0.7,
    })),
    ...tracks.map((t) => ({
      url: `${SITE_URL}/mentorship/${t.slug}`,
      lastModified,
      priority: 0.6,
    })),
  ];
}
