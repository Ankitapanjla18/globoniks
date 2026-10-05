import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUSINESS, ISO, TEAM } from "@/lib/site";

/*
 * Who you deal with. The structure is the pitch: no account layer, named
 * people, a verifiable certificate. Facts only -- names and roles from
 * src/lib/site.ts, the certificate from the same file.
 */
export function FoundersBand() {
  return (
    <section className="border-t rule py-20 md:py-28" aria-labelledby="people-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal="" className="lg:col-span-7">
            <p className="eyebrow mb-5">Who you deal with</p>
            <h2 id="people-heading" className="font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              No account managers. <span className="ink">Three names.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {BUSINESS.legalName} is a deliberately small studio in{" "}
              {BUSINESS.locality}. Scope, architecture and delivery answer to
              the people below — the person you talk to sits at the same table
              as the person building your system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact/" className="brand-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
                Talk to Ankita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/about/" className="ghost-cta inline-flex items-center justify-center px-7 py-3.5 text-base font-medium">
                About the studio
              </Link>
            </div>
          </div>

          <div data-reveal="" className="lg:col-span-5">
            <ul className="divide-y divide-[hsl(var(--hairline))] border-y rule">
              {TEAM.map((person) => (
                <li key={person.name} className="flex items-center gap-5 py-5">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 font-heading text-lg text-violet-300"
                  >
                    {person.initials}
                  </span>
                  <span>
                    <span className="block font-heading text-2xl leading-tight text-foreground">{person.name}</span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {person.role}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <div>
                <dt className="text-violet-400">{ISO.standard}</dt>
                <dd className="mt-1 normal-case tracking-normal">
                  Cert. {ISO.certNumber} ·{" "}
                  <a
                    href={ISO.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
                  >
                    verify with {ISO.registrarShort}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-violet-400">Office</dt>
                <dd className="mt-1 normal-case tracking-normal">
                  Sector 68, {BUSINESS.locality}, {BUSINESS.region}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
