/**
 * Services. Copy is migrated from the existing pages -- nothing invented.
 * Same rule as the other data files: unknown facts are omitted, not guessed.
 */

export type Service = {
  slug: string;
  title: string;
  /** Card + meta description source. */
  description: string;
  /** Lead paragraph on the detail page. */
  detail: string;
};

export const services: Service[] = [
  {
    slug: "mern-stack",
    title: "MERN Stack Development",
    description:
      "End-to-end full-stack development using MongoDB, Express, React, and Node.js for high-performance enterprise applications.",
    detail:
      "We build full-stack web applications on MongoDB, Express, React and Node.js — from architecture and data modelling through deployment. The same stack powers our own live products, so the patterns we use are ones we run in production ourselves.",
  },
  {
    slug: "mobile-app",
    title: "Mobile App Development",
    description:
      "Cross-platform and native mobile solutions using React Native, designed for global reach and flawless user experience.",
    detail:
      "Cross-platform mobile applications built with React Native: one codebase, native feel, app-store deployment handled. Suited to products that need to reach both Android and iOS without doubling the engineering budget.",
  },
  {
    slug: "custom-software",
    title: "Custom Software Architecture",
    description:
      "Complex system design, microservices, and specialized software tailored to the strict operational requirements of your business.",
    detail:
      "For systems an off-the-shelf product cannot cover: complex domain workflows, integrations, and services designed around your actual operations. We handle system design, build, and the documentation that lets your team own it afterwards.",
  },
  {
    slug: "maintenance",
    title: "Maintenance & Support",
    description:
      "Dedicated engineering support, infrastructure scaling, and code auditing to keep your stack healthy and secure.",
    detail:
      "Ongoing engineering for software you already run: dependency and security updates, performance work, infrastructure scaling, and code audits. For products we built and for codebases we inherit.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
