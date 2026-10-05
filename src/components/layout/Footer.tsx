import Link from "next/link";
import Image from "next/image";
import { ADDRESS_LINES, BUSINESS, ISO } from "@/lib/site";
import { services } from "@/data/services";
import { tracks } from "@/data/mentorship";

/*
 * Footer: a closing statement, then the index. Link columns are generated
 * from the same data files as the routes, so a renamed service cannot leave
 * a stale footer link behind. Credentials sit in the mono instrument voice.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const company = [
    { name: "About", href: "/about/" },
    { name: "How we work", href: "/how-we-work/" },
    { name: "Work", href: "/projects/" },
    { name: "Contact", href: "/contact/" },
  ];

  return (
    <footer className="mt-20 border-t rule">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 text-foreground">
              <Image
                src="/logo.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 [filter:drop-shadow(0_0_10px_rgba(139,92,246,0.55))]"
              />
              <span className="font-heading text-[1.65rem] leading-none tracking-tight">Globoniks</span>
            </Link>
            <p className="mt-6 max-w-sm font-heading text-3xl leading-[1.05] tracking-tight text-foreground">
              Software you can open, <span className="ink">not slides you have to trust.</span>
            </p>
            <ul className="mt-8 space-y-1 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="inline-block py-1.5 transition-colors hover:text-foreground">
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS.telephone.replace(/[^+\d]/g, "")}`}
                  className="inline-block py-1.5 transition-colors hover:text-foreground"
                >
                  {BUSINESS.telephone}
                </a>
              </li>
            </ul>
            <address className="mt-4 font-mono text-[11px] not-italic leading-relaxed text-muted-foreground">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow mb-5">Services</h2>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5">Mentorship</h2>
              <ul className="space-y-3">
                {tracks.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/mentorship/${t.slug}/`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {t.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/mentorship/apply/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Apply
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5">Company</h2>
              <ul className="space-y-3">
                {company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t rule pt-6 font-mono text-[11px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {currentYear} {BUSINESS.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              {ISO.standard} · Cert. {ISO.certNumber} ·{" "}
              <a
                href={ISO.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
              >
                verify with {ISO.registrarShort}
              </a>
            </span>
            <span aria-hidden="true" className="text-violet-500">·</span>
            <span>GSTIN {BUSINESS.gstin}</span>
          </p>
          {/* Privacy Policy and Terms links removed: both routes 404. The
              pages need real legal copy, not boilerplate. See NEEDS-INPUT.md. */}
        </div>
      </div>
    </footer>
  );
}
