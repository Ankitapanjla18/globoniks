/**
 * Single source of truth for business facts.
 *
 * Everything here is verified against the archived site and company records.
 * Nothing in this file may be a plausible-sounding guess: if a value is not
 * known, it belongs in NEEDS-INPUT.md, not here.
 */

/**
 * Canonical host. Checked against the live host on 2026-10-04: the apex
 * `globoniks.com` 301-redirects to `www.globoniks.com` (Cloudflare), so the
 * canonical must be the www host -- a canonical that points at a redirect
 * is a canonical search engines ignore. If the redirect is ever flipped to
 * www -> apex at the host, change this one constant; every canonical,
 * sitemap entry, Open Graph URL and schema @id derives from it.
 */
export const SITE_URL = "https://www.globoniks.com";

/**
 * Per-page metadata, so every page gets its own canonical, Open Graph and
 * Twitter card. Before this, static pages set only `title` and
 * `description` and inherited the homepage's og:url and og:title from the
 * root layout -- a share of /services previewed as the homepage.
 *
 * `title` is the page part only; the root layout's template appends
 * " | Globoniks". Keep it under ~48 characters so the full title fits in
 * a search result.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  /** Route path with leading and trailing slash, e.g. "/services/". */
  path: string;
  type?: "website" | "article";
}) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${BUSINESS.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, title: fullTitle, description, url },
    twitter: { card: "summary_large_image" as const, title: fullTitle, description },
  };
}

/**
 * Trims a description to fit a search snippet, cutting at a word boundary.
 * Case-study summaries are written for the page, where 190 characters
 * reads fine; a snippet shows about 155.
 */
export function snippet(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}

export const BUSINESS = {
  /** The brand, used in running copy. */
  name: "Globoniks",
  /**
   * The registered entity, name confirmed by the owner (2026-10-02). The
   * CIN and incorporation date are not supplied yet -- see NEEDS-INPUT.md
   * 2.0 -- so they are absent, not guessed.
   */
  legalName: "Globoniks Technologies Private Limited",
  /**
   * "globonics" is a common misspelling of the brand. It is declared here as a
   * schema.org alternateName, which is the supported way to associate a
   * misspelling with a business. The previous site instead shipped a hidden
   * display:none block repeating the misspelling, which is cloaking.
   */
  alternateNames: ["Globoniks", "globonics", "Globonics"],

  streetAddress: "361, Third Floor, Medallion 68, Sector 68",
  locality: "Mohali",
  /** Official name of the municipality; "Mohali" is the common name. */
  localityOfficial: "Sahibzada Ajit Singh Nagar",
  region: "Punjab",
  postalCode: "160062",
  country: "IN",

  latitude: 30.6831026,
  longitude: 76.7254957,

  telephone: "+91-9988-909-556",
  email: "info@globoniks.com",

  foundingYear: 2024,
  /**
   * Issued before incorporation. A private limited company is registered
   * for GST under its own PAN, so this number is expected to change -- see
   * NEEDS-INPUT.md 2.0. Until then copy attaches it to the brand, never to
   * `legalName`.
   */
  gstin: "03CZQPA4795R1ZJ",
} as const;

/**
 * ISO 9001:2015 certification. Verified against the certificate supplied by
 * the owner on 2026-08-30; until then the site carried the claim with no
 * evidence, which was the oldest open item in NEEDS-INPUT.
 *
 * Every value below is read off the certificate. `verifyUrl` is the
 * registrar's own validity checker, printed on the certificate -- a claim a
 * buyer can check beats one they have to trust.
 */
export const ISO = {
  standard: "ISO 9001:2015",
  system: "Quality Management System",
  certNumber: "305026031682Q",
  registrar: "QRO Certification LLP",
  registrarShort: "QRO",
  verifyUrl: "https://www.qrocert.org",
  certifiedOn: "2026-03-16",
  certifiedOnLabel: "16 March 2026",
  expiresOn: "2029-03-15",
  expiresOnLabel: "15 March 2029",
  /** Scope of activities, as worded on the certificate. */
  scope:
    "Providing digital marketing, web development, content development and creation, digital brand management & promotion, software and applications development.",
} as const;

/**
 * The team. Names supplied by the owner (2026-08-27); Kapila added as the
 * second director on incorporation (2026-10-02), with operations as the
 * remit at the owner's "operations, or whatever feels right". Photos and
 * LinkedIn URLs are still pending -- see NEEDS-INPUT.md 1.2 -- so those
 * fields are simply absent until supplied.
 */
export const TEAM = [
  { name: "Ankita", role: "Founder & Director — Client Relations", initials: "A" },
  { name: "Kapila", role: "Director — Operations", initials: "K" },
  { name: "Saksham Panjla", role: "Lead Developer", initials: "SP" },
] as const;

export const ADDRESS_LINES = [
  BUSINESS.streetAddress,
  `${BUSINESS.localityOfficial} (${BUSINESS.locality}), ${BUSINESS.region} ${BUSINESS.postalCode}`,
  "India",
];

/**
 * Google Maps directions link for the office. This is a plain search URL
 * built from the real address, not an embed. The previous site used an
 * iframe whose embed token was fabricated ("!4v1234567890123"), so it
 * rendered an error frame.
 */
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.latitude},${BUSINESS.longitude}`;

/**
 * Cities the studio actually serves in person. Everything else is remote,
 * which `areaServed: "IN"` on the contact point already states.
 */
export const SERVICE_AREA = ["Mohali", "Chandigarh", "Panchkula", "Zirakpur"] as const;

/**
 * Organization + LocalBusiness graph. Rendered once on every page from the
 * root layout, so each page carries the entity that search engines and
 * answer engines attach the rest of the site's facts to.
 *
 * `sameAs` is deliberately absent: the archived site asserted LinkedIn,
 * X and GitHub profile URLs that have not been verified to exist. Claiming
 * unverified profiles in structured data is worse than omitting them.
 * See NEEDS-INPUT.md.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.alternateNames,
    description:
      "Software development company in Mohali, Punjab, building web applications, mobile apps, marketplaces, SaaS platforms and business systems, with a tech mentorship programme.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-card.png`,
    foundingDate: String(BUSINESS.foundingYear),
    areaServed: [
      ...SERVICE_AREA.map((city) => ({ "@type": "City", name: city })),
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Custom software development",
      "Web application development",
      "Mobile app development",
      "Multi-vendor marketplace platforms",
      "SaaS and multi-tenant platforms",
      "Next.js",
      "React",
      "React Native",
      "Node.js",
    ],
    member: TEAM.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.localityOfficial,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    founder: {
      "@type": "Person",
      name: "Ankita",
      jobTitle: "Founder & Director",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "pa"],
    },
    hasCertification: {
      "@type": "Certification",
      name: `${ISO.standard} ${ISO.system}`,
      certificationIdentification: ISO.certNumber,
      issuedBy: { "@type": "Organization", name: ISO.registrar },
      datePublished: ISO.certifiedOn,
      expires: ISO.expiresOn,
      certificationStatus: "CertificationActive",
      about: ISO.scope,
    },
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "GSTIN",
        value: BUSINESS.gstin,
      },
      {
        "@type": "PropertyValue",
        propertyID: `${ISO.standard} certificate number`,
        value: ISO.certNumber,
      },
    ],
  };
}

/** WebSite entity, rendered site-wide alongside the organization. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateNames,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

/**
 * A page-level entity (CollectionPage, AboutPage, ContactPage ...) that
 * ties the page to the organization and website nodes.
 */
export function webPageSchema({
  type,
  path,
  name,
  description,
  extra = {},
}: {
  type: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  path: string;
  name: string;
  description: string;
  extra?: Record<string, unknown>;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    ...extra,
  };
}

/** BreadcrumbList JSON-LD for detail pages (document section 3.2). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}/`,
    })),
  };
}
