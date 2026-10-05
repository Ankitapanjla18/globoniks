import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-32 text-center">
      <p className="eyebrow-accent mb-6">404 · Lost in space</p>
      <h1 className="font-heading text-[2.6rem] leading-[1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        This page <span className="ink">doesn&apos;t exist.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
        The link may be outdated. Everything we&apos;ve built lives on the work
        page, and everything we offer is under services.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="brand-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
          Back to home
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link href="/projects/" className="ghost-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
          See the work
        </Link>
      </div>
    </div>
  );
}
