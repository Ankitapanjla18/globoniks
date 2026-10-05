import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  slug: string;
}

export function ServiceCard({ icon, title, description, slug }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}/`}
      className="group block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border rule bg-card/60 p-8 transition-colors hover:border-violet-500/40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-600/20"
        />
        <div className="relative mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </div>

        <h3 className="relative font-heading text-3xl leading-[1.05] tracking-tight text-foreground transition-colors group-hover:text-violet-300">
          {title}
        </h3>

        <p className="relative mt-4 flex-grow text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          {description}
        </p>

        <span className="relative mt-7 inline-flex items-center border-t rule pt-4 text-sm font-medium text-foreground">
          Explore service
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
