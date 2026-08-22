import { BlogCard } from "@/components/cards/BlogCard";

export default function BlogIndex() {
  const posts = [
    {
      title: "Why we abandoned Redux for Zustand in our latest Enterprise App",
      excerpt: "A deep dive into state management architecture. We compare Redux boilerplate against Zustand's simplicity when scaling a 100k+ MAU tracking dashboard.",
      thumbnail: "zustand-guide.jpg",
      date: "Oct 12, 2024",
      readTime: "8 min read",
      slug: "abandoning-redux-for-zustand",
      category: "Architecture",
    },
    {
      title: "Building resilient microservices with Node.js and Redis",
      excerpt: "Event-driven architecture isn't just a buzzword. Learn how we utilize Redis streams to decouple our Express microservices and achieve 99.99% uptime.",
      thumbnail: "microservices-redis.jpg",
      date: "Sep 28, 2024",
      readTime: "12 min read",
      slug: "resilient-microservices",
      category: "Backend",
    },
    {
      title: "Is React Native still the king of Cross-Platform?",
      excerpt: "Flutter is great, but React Native's ecosystem remains unparalleled for teams transitioning from web to mobile. Here's our definitive framework analysis.",
      thumbnail: "react-native-2024.jpg",
      date: "Sep 15, 2024",
      readTime: "6 min read",
      slug: "react-native-king",
      category: "Mobile",
    },
    {
      title: "The Junior Developer's guide to passing Senior Engineering Interviews",
      excerpt: "Stop grinding LeetCode and start designing scalable systems. Our mentorship directors break down what technical recruiters actually look for.",
      thumbnail: "interview-guide.jpg",
      date: "Aug 30, 2024",
      readTime: "10 min read",
      slug: "senior-engineering-interviews",
      category: "Mentorship",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6">
            Engineering <span className="text-indigo-600">Insights.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Deep-dive technical articles written by our core engineers. We explore system architecture, modern web frameworks, and advanced development practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="mt-20 border border-border bg-card rounded-2xl p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Subscribe to our engineering newsletter</h3>
          <p className="text-muted-foreground mb-6">Receive one high-quality technical article per month. No spam, just code.</p>
          {/* NEWSLETTER: no mailing-list provider is wired up yet. See NEEDS-INPUT.md. */}
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" method="post" action="/blog">
            <input 
              type="email" 
              placeholder="developer@example.com" 
              className="flex-grow h-12 rounded-md border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" 
              required
            />
            <button type="submit" className="amber-cta px-6 py-2 rounded-md font-semibold h-12 flex-shrink-0">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
