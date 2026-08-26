/**
 * Single source of truth for business facts.
 *
 * Everything here is verified against the archived site and company records.
 * Nothing in this file may be a plausible-sounding guess: if a value is not
 * known, it belongs in NEEDS-INPUT.md, not here.
 */

export const SITE_URL = "https://globoniks.com";

export const BUSINESS = {
  legalName: "Globoniks",
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
  gstin: "03CZQPA4795R1ZJ",
} as const;

/**
 * The team. Names supplied by the owner (2026-08-27). Saksham's role, both
 * photos and LinkedIn URLs are still pending -- see NEEDS-INPUT.md 1.2 --
 * so those fields are simply absent until supplied.
 */
export const TEAM = [
  { name: "Ankita", role: "Founder & Director — Client Relations", initials: "A" },
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
 * Organization + LocalBusiness graph. Used on the home and contact pages.
 *
 * `sameAs` is deliberately absent: the archived site asserted LinkedIn,
 * X and GitHub profile URLs that have not been verified to exist. Claiming
 * unverified profiles in structured data is worse than omitting them.
 * See NEEDS-INPUT.md.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.alternateNames,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    foundingDate: String(BUSINESS.foundingYear),
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
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
