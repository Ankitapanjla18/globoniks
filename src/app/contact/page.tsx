import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  ADDRESS_LINES,
  BUSINESS,
  MAPS_DIRECTIONS_URL,
  organizationSchema,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Globoniks what you're building. Office in Sector 68, Mohali, Punjab — info@globoniks.com or +91-9988-909-556. You'll hear back from a founder.",
  alternates: { canonical: "/contact/" },
};

/*
 * Calmer contact page (owner feedback 2026-08-30: the old one felt pushy).
 * One short form, one primary action, plain-language alternatives, no
 * budget gate and no "quote" framing. The form still composes into the
 * visitor's own email or WhatsApp app -- there is no backend yet
 * (NEEDS-INPUT 3.2).
 */
export default function ContactPage() {
  const waDigits = BUSINESS.telephone.replace(/[^\d]/g, "");
  const telHref = `tel:${BUSINESS.telephone.replace(/[^+\d]/g, "")}`;
  const label =
    "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData data={organizationSchema()} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <h1 className="mb-5 font-heading text-4xl font-black tracking-tight text-foreground lg:text-5xl">
              Tell us what you&apos;re <span className="text-violet-600">building.</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A few lines is enough. You&apos;ll hear back from Ankita — not a
              sales team — and the first conversation is just that: a
              conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <aside className="space-y-10 lg:col-span-5 lg:pl-6">
              <div>
                <h2 className={label}>Prefer to just message?</h2>
                <ul className="space-y-2 text-foreground">
                  <li>
                    <a
                      href={`https://wa.me/${waDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-violet-400"
                    >
                      WhatsApp · {BUSINESS.telephone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-violet-400">
                      {BUSINESS.email}
                    </a>
                  </li>
                  <li>
                    <a href={telHref} className="transition-colors hover:text-violet-400">
                      Call · {BUSINESS.telephone}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className={label}>Office</h2>
                <address className="not-italic leading-relaxed text-muted-foreground">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-violet-500 transition-colors hover:text-violet-400"
                >
                  Get directions
                </a>
              </div>

              <div>
                <h2 className={label}>Registered</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {/* ISO claim retained pending certificate number and
                      issuing registrar. See NEEDS-INPUT.md. */}
                  ISO 9001:2015 Certified Company
                  <br />
                  GSTIN {BUSINESS.gstin}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
