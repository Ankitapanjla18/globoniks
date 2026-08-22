import { ContactForm } from "@/components/forms/ContactForm";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  ADDRESS_LINES,
  BUSINESS,
  MAPS_DIRECTIONS_URL,
  organizationSchema,
} from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <StructuredData data={organizationSchema()} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          <div className="lg:w-5/12 space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight text-foreground mb-6">
                Let&apos;s talk <span className="text-purple-500">architecture.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you need a complex MERN stack application, a cross-platform mobile app, or a complete system rewrite, our engineers are ready to build it.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              <div>
                <h2 className="font-semibold text-foreground">Office</h2>
                <address className="text-muted-foreground mt-1 text-sm not-italic leading-relaxed">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                {/*
                  The archived site embedded a Google Map whose URL contained
                  fabricated tokens ("!1d3429.1234567890123", "4v1234567890123"),
                  so it rendered an error frame. A directions link built from the
                  real coordinates does the same job with none of the page weight
                  a third-party iframe adds to Core Web Vitals.
                */}
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors"
                >
                  Get directions to the Globoniks office
                </a>
              </div>

              <div>
                <h2 className="font-semibold text-foreground">Direct contact</h2>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {BUSINESS.email}
                  </a>
                  <br />
                  <a
                    href={`tel:${BUSINESS.telephone.replace(/[^+\d]/g, "")}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {BUSINESS.telephone}
                  </a>
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-foreground">Company credentials</h2>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {/* ISO claim retained pending certificate number and issuing
                      registrar. See NEEDS-INPUT.md. */}
                  ISO 9001:2015 Certified Company
                  <br />
                  GSTIN: {BUSINESS.gstin}
                </p>
              </div>
            </div>

          </div>

          <div className="lg:w-7/12">
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
