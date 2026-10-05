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
  /**
   * What the track covers, one line each. Taken from the track's own
   * description -- until 2026-10-04 every track page rendered the same
   * hard-coded full-stack list, so the leadership and mobile tracks
   * promised state management and test suites they never mention.
   */
  outcomes: string[];
  tags: string[];
};

export const tracks: Track[] = [
  {
    slug: "fullstack-track",
    title: "Full-Stack Web Mastery",
    duration: "12 weeks, part-time",
    description:
      "Go beyond basic tutorials. Learn testing, advanced state management, component architecture, and CI/CD pipelines in a production environment.",
    outcomes: [
      "Testing: unit and integration tests that run on every change",
      "Advanced state management",
      "Component architecture for an application that keeps growing",
      "CI/CD pipelines that ship to a real environment",
    ],
    tags: ["React", "Next.js", "Node", "MongoDB", "Jest"],
  },
  {
    slug: "mobile-track",
    title: "Mobile Development",
    duration: "10 weeks, part-time",
    description:
      "Build performant native-feeling apps. Master React Native CLI, complex animations, native modules, and app store deployment.",
    outcomes: [
      "React Native CLI projects, set up and structured",
      "Complex animations that stay smooth",
      "Native modules, for when JavaScript is not enough",
      "App Store and Play Store deployment",
    ],
    tags: ["React Native", "Expo", "Redux", "Swift/Java Basics"],
  },
  {
    slug: "leadership",
    title: "Leadership & Architecture",
    duration: "8 weeks, part-time",
    description:
      "For mid-level engineers looking to step up. Learn system design, microservices, cloud infrastructure, and technical leadership.",
    outcomes: [
      "System design: from requirements to an architecture you can defend",
      "Microservices: when to split a system, and when not to",
      "Cloud infrastructure",
      "Technical leadership: reviews, decisions and the people side",
    ],
    tags: ["System Design", "AWS", "Docker", "Agile Management"],
  },
];

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}
