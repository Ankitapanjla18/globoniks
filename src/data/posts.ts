/**
 * Blog posts.
 *
 * IMPORTANT: the blog's authenticity is an open question in NEEDS-INPUT.md
 * (section 1.1) -- the one existing article body is written as first-person
 * Globoniks experience with an unverified byline. Only the post that actually
 * has a body is `published`; the other three were title/excerpt stubs whose
 * URLs used to serve a copy of the same unrelated article, so they are kept
 * here unpublished rather than shipped as duplicate fabricated pages.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  category: string;
  /** Only published posts get a URL, appear in the index and the sitemap. */
  published: boolean;
};

export const posts: Post[] = [
  {
    slug: "abandoning-redux-for-zustand",
    title: "Why we abandoned Redux for Zustand in our latest Enterprise App",
    excerpt:
      "A deep dive into state management architecture. We compare Redux boilerplate against Zustand's simplicity on a large tracking dashboard.",
    date: "Oct 12, 2024",
    isoDate: "2024-10-12",
    readTime: "8 min read",
    category: "Architecture",
    published: true,
  },
  {
    slug: "resilient-microservices",
    title: "Building resilient microservices with Node.js and Redis",
    excerpt:
      "Event-driven architecture isn't just a buzzword. Learn how we use Redis streams to decouple Express microservices and improve resilience.",
    date: "Sep 28, 2024",
    isoDate: "2024-09-28",
    readTime: "12 min read",
    category: "Backend",
    published: false, // no article body exists
  },
  {
    slug: "react-native-king",
    title: "Is React Native still the king of Cross-Platform?",
    excerpt:
      "Flutter is great, but React Native's ecosystem remains unparalleled for teams transitioning from web to mobile. Here's our definitive framework analysis.",
    date: "Sep 15, 2024",
    isoDate: "2024-09-15",
    readTime: "6 min read",
    category: "Mobile",
    published: false, // no article body exists
  },
  {
    slug: "senior-engineering-interviews",
    title: "The Junior Developer's guide to passing Senior Engineering Interviews",
    excerpt:
      "Stop grinding LeetCode and start designing scalable systems. Our mentorship directors break down what technical recruiters actually look for.",
    date: "Aug 30, 2024",
    isoDate: "2024-08-30",
    readTime: "10 min read",
    category: "Mentorship",
    published: false, // no article body exists
  },
];

export const publishedPosts = posts.filter((p) => p.published);

export function getPost(slug: string): Post | undefined {
  return publishedPosts.find((p) => p.slug === slug);
}
