import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Marketplace & E-Commerce", href: "/services/marketplace-platforms" },
      { name: "SaaS & Multi-Tenant", href: "/services/saas-platforms" },
      { name: "Operations & Compliance", href: "/services/operations-compliance" },
      { name: "Mobile App Development", href: "/services/mobile-apps" },
      { name: "Maintenance & Support", href: "/services/maintenance" },
    ],
    mentorship: [
      { name: "Full-Stack Web Track", href: "/mentorship/fullstack-track" },
      { name: "Mobile Development Track", href: "/mentorship/mobile-track" },
      { name: "Leadership & Architecture", href: "/mentorship/leadership" },
      { name: "Apply Now", href: "/mentorship/apply" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Projects", href: "/projects" },
      { name: "Products", href: "/products" },
      { name: "Contact & Quote", href: "/contact" },
    ],
  };

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tighter text-foreground">
              <Image
                src="/logo.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 [filter:drop-shadow(0_0_8px_rgba(139,92,246,0.6))]"
              />
              GLOBONIKS
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              We build what others only pitch. Marketplaces, SaaS platforms and business systems — live in production — from Mohali, Punjab.
            </p>
            <div className="p-4 border border-border/60 rounded-xl bg-muted/20 backdrop-blur-sm max-w-xs space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-foreground/90">
                <svg className="w-4 h-4 text-violet-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>ISO 9001:2015 Certified Company</span>
              </div>
              <div className="text-[11px] text-muted-foreground pl-6 flex items-center space-x-1">
                <span>GSTIN:</span>
                <span className="font-mono text-foreground bg-muted-foreground/10 px-1.5 py-0.5 rounded text-[10px] tracking-wider font-semibold">03CZQPA4795R1ZJ</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:info@globoniks.com" className="hover:text-foreground transition-colors">
                info@globoniks.com
              </a>
              <br />
              <a href="tel:+919988909556" className="hover:text-foreground transition-colors">
                +91-9988-909-556
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Mentorship</h3>
            <ul className="space-y-3">
              {footerLinks.mentorship.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Globoniks. All rights reserved.
          </p>
          {/* Privacy Policy and Terms links removed: both routes 404. The
              pages need real legal copy, not boilerplate. See NEEDS-INPUT.md. */}
        </div>
      </div>
    </footer>
  );
}
