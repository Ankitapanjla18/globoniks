import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          <div className="lg:w-5/12 space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight text-foreground mb-6">
                Let&apos;s talk <span className="text-amber-500">architecture.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you need a complex MERN stack application, a cross-platform mobile app, or a complete system rewrite, our engineers are ready to build it.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              <div>
                <h4 className="font-semibold text-foreground">HQ Address</h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  361, Third Floor, Medallion 68,<br/>
                  Sector 68, SAS Nagar,<br/>
                  Punjab 160062, India
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Direct Contact</h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Email: info@globoniks.com<br/>
                  Phone: +91-9988-909-556
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Company Credentials</h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  ISO 9001:2015 Certified Company<br/>
                  GSTIN: 03czqpa4795r1zj
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
