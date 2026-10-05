import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  ADDRESS_LINES,
  BUSINESS,
  ISO,
  MAPS_DIRECTIONS_URL,
  pageMetadata,
  webPageSchema,
} from "@/lib/site";
import { PageHeader } from "@/components/ui/page";

const PAGE = {
  title: "Contact — start a software project in Mohali",
  description:
    "Tell Globoniks what you're building. Sector 68, Mohali, Punjab · info@globoniks.com · +91-9988-909-556. The founder replies within one working day.",
  path: "/contact/",
};

export const metadata: Metadata = pageMetadata(PAGE);

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
    "eyebrow mb-3";

  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData
        data={webPageSchema({ type: "ContactPage", name: PAGE.title, ...PAGE })}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            eyebrow="Contact"
            title="Tell us what you're"
            accent="building."
            lead={
              <>
                A few lines is enough. You&apos;ll hear back from Ankita — not
                a sales team — within one working day, and the first
                conversation is just that: a conversation.{" "}
                <Link href="/how-we-work/" className="text-violet-400 transition-colors hover:text-violet-300">
                  Here is how a project runs.
                </Link>
              </>
            }
          />

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
                  className="mt-3 inline-flex text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Get directions
                </a>
              </div>

              <div>
                <h2 className={label}>Registered</h2>
                <div className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    <span className="text-foreground">
                      {ISO.standard} {ISO.system}
                    </span>
                    <br />
                    Certificate {ISO.certNumber}, issued by {ISO.registrar}
                    <br />
                    Valid to {ISO.expiresOnLabel} ·{" "}
                    <a
                      href={ISO.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 transition-colors hover:text-violet-300"
                    >
                      verify with {ISO.registrarShort}
                    </a>
                  </p>
                  <p>GSTIN {BUSINESS.gstin}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
