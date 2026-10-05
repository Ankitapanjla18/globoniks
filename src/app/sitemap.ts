import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { tracks } from "@/data/mentorship";
import { offers } from "@/data/offers";

/**
 * Native App Router sitemap (served at /sitemap.xml). Replaces next-sitemap,
 * which was installed but never ran: no postbuild hook, and it writes into
 * public/, which didn't exist. Every URL here is enumerated from the same
 * data files that gate the routes, so the sitemap cannot list a page that
 * 404s or miss one that exists.
 *
 * `lastModified` is the last git commit touching the files a route is built
 * from. The earlier version stamped every URL with the build time, which
 * tells a crawler that all 30 pages change on every deploy -- a signal it
 * learns to ignore. `priority` is omitted: Google states it does not use it.
 * Falls back to the build time when git history is unavailable (a shallow
 * clone on the host, say).
 */
const buildTime = new Date();

function lastCommit(...paths: string[]): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- ${paths.map((p) => JSON.stringify(p)).join(" ")}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : buildTime;
  } catch {
    return buildTime;
  }
}

/** Shared chrome that changes what every page shows. */
const LAYOUT = ["src/app/layout.tsx", "src/lib/site.ts", "src/components/layout"];

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: { path: string; sources: string[] }[] = [
    { path: "/", sources: ["src/app/page.tsx", "src/components/sections", "src/data/projects.ts"] },
    { path: "/services/", sources: ["src/app/services/page.tsx", "src/data/services.ts", "src/data/capabilities.ts"] },
    { path: "/how-we-work/", sources: ["src/app/how-we-work/page.tsx"] },
    { path: "/projects/", sources: ["src/app/projects/page.tsx", "src/data/projects.ts"] },
    { path: "/about/", sources: ["src/app/about/page.tsx"] },
    { path: "/contact/", sources: ["src/app/contact/page.tsx"] },
    { path: "/mentorship/", sources: ["src/app/mentorship/page.tsx", "src/data/mentorship.ts"] },
  ];

  const servicesModified = lastCommit("src/app/services/[service]", "src/data/services.ts", "src/data/projects.ts", ...LAYOUT);
  const projectsModified = lastCommit("src/app/projects/[slug]", "src/data/projects.ts", "src/data/services.ts", ...LAYOUT);
  const offersModified = lastCommit("src/app/build/[offer]", "src/data/offers.ts", "src/data/process.ts", ...LAYOUT);
  const tracksModified = lastCommit("src/app/mentorship/[track]", "src/data/mentorship.ts", ...LAYOUT);

  return [
    ...statics.map((s) => ({
      url: `${SITE_URL}${s.path}`,
      lastModified: lastCommit(...s.sources, ...LAYOUT),
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
      lastModified: servicesModified,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}/`,
      lastModified: projectsModified,
    })),
    ...offers.map((o) => ({
      url: `${SITE_URL}/build/${o.slug}/`,
      lastModified: offersModified,
    })),
    ...tracks.map((t) => ({
      url: `${SITE_URL}/mentorship/${t.slug}/`,
      lastModified: tracksModified,
    })),
  ];
}
