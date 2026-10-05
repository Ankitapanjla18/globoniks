import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

/*
 * Shared building blocks for inner pages, so every page speaks the same
 * visual language as the landing page: mono eyebrow, serif headline with an
 * italic violet accent, hairline rules, violet checks, one closing call to
 * action. Added in the 2026-10-04 consistency audit -- before it, each
 * inner page carried its own copy of the pre-redesign styles.
 */

/** Top of an inner page. `back` renders a breadcrumb-style return link. */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lead,
  back,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Optional italic violet tail of the headline. */
  accent?: string;
  lead?: React.ReactNode;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="reveal mb-16 max-w-3xl md:mb-20">
      {back && (
        <nav aria-label="Breadcrumb" className="mb-8" style={{ "--i": 0 } as React.CSSProperties}>
          <Link
            href={back.href}
            className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5" />
            {back.label}
          </Link>
        </nav>
      )}
      {eyebrow && (
        <p className="eyebrow mb-6" style={{ "--i": 0 } as React.CSSProperties}>
          {eyebrow}
        </p>
      )}
      <h1
        className="reveal-lcp font-heading text-[2.6rem] leading-[1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="ink">{accent}</span>
          </>
        )}
      </h1>
      {lead && (
        <div
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {lead}
        </div>
      )}
      {children && <div style={{ "--i": 3 } as React.CSSProperties}>{children}</div>}
    </header>
  );
}

/** Eyebrow + serif h2, used to open each section of an inner page. */
export function SectionTitle({
  eyebrow,
  id,
  children,
  className = "",
}: {
  eyebrow?: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-8 max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="font-heading text-3xl leading-[1.05] tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
    </div>
  );
}

/** A list with violet checks. */
export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground">
          <Check className="mt-1 h-4 w-4 shrink-0 text-violet-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The closing call to action. One per page. */
export function CtaPanel({
  title,
  accent,
  body,
  primary = { href: "/contact/", label: "Start a project" },
  secondary,
}: {
  title: string;
  accent?: string;
  body: React.ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section data-reveal="" className="mt-24 rounded-3xl border rule bg-card/60 p-8 text-center md:p-14">
      <h2 className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="ink">{accent}</span>
          </>
        )}
      </h2>
      <div className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{body}</div>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={primary.href} className="brand-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
          {primary.label}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        {secondary && (
          <Link href={secondary.href} className="ghost-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  );
}

/** Text link in the accent colour, with an arrow. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center text-sm font-medium text-violet-400 transition-colors hover:text-violet-300 ${className}`}
    >
      {children}
      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
