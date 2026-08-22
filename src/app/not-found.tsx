import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
      <p className="text-sm font-semibold uppercase tracking-wider text-violet-500 mb-4">
        404
      </p>
      <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-6">
        This page doesn&apos;t exist.
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-10">
        The link may be outdated. Everything we&apos;ve built lives on the work
        page, and everything we offer is under services.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="brand-cta px-6 py-3 rounded-full text-sm font-semibold"
        >
          Back to home
        </Link>
        <Link
          href="/projects"
          className="px-6 py-3 rounded-full text-sm font-semibold border border-border text-foreground hover:bg-muted transition-colors"
        >
          See our work
        </Link>
      </div>
    </div>
  );
}
