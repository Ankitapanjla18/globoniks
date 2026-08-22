/**
 * Mentorship tracks. Durations come from the track listing that was already
 * on the site (12/10/8 weeks) -- previously the detail pages contradicted it
 * by hardcoding "12 Weeks" for every track.
 */

export type Track = {
  slug: string;
  title: string;
  duration: string;
  description: string;
  tags: string[];
};

export const tracks: Track[] = [
  {
    slug: "mern-track",
    title: "MERN Stack Mastery",
    duration: "12 Weeks (Part-time)",
    description:
      "Go beyond basic tutorials. Learn testing, advanced state management, component architecture, and CI/CD pipelines in a production environment.",
    tags: ["React 18", "Next.js", "Node", "MongoDB", "Jest"],
  },
  {
    slug: "mobile-track",
    title: "Mobile Development",
    duration: "10 Weeks (Part-time)",
    description:
      "Build performant native-feeling apps. Master React Native CLI, complex animations, native modules, and app store deployment.",
    tags: ["React Native", "Expo", "Redux", "Swift/Java Basics"],
  },
  {
    slug: "leadership",
    title: "Leadership & Architecture",
    duration: "8 Weeks (Part-time)",
    description:
      "For mid-level engineers looking to step up. Learn system design, microservices, cloud infrastructure, and technical leadership.",
    tags: ["System Design", "AWS", "Docker", "Agile Management"],
  },
];

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}
