import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Starfield } from "@/components/sections/Starfield";
import { StructuredData } from "@/components/seo/StructuredData";
import { VisitSource } from "@/components/seo/VisitSource";
import { ScrollReveal } from "@/components/seo/ScrollReveal";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SITE_URL, BUSINESS, organizationSchema, websiteSchema } from "@/lib/site";

const HOME_TITLE = "Globoniks — custom software development company, Mohali";
const HOME_DESCRIPTION =
  "Software development company in Mohali, Punjab. Globoniks builds web applications, mobile apps and custom software for businesses, plus tech mentorship.";

/*
 * Type system (redesign, 2026-10-04). Three voices:
 * - Instrument Serif for display: one weight, upright and italic. Headlines
 *   read as set type rather than shouted sans. `font-synthesis: none` in
 *   globals.css stops browsers faking a bold the face does not have.
 * - Geist (variable, local) for everything you read.
 * - Geist Mono (variable, local) for the instrument layer: eyebrows,
 *   hostnames, numbers, status -- the "readout" of a studio that ships.
 * Brand colours are unchanged: black field, violet accent.
 */
const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    // Per-page titles land as "<page> | Globoniks"; pages set them through
    // pageMetadata() in src/lib/site.ts so canonical, OG and Twitter agree.
    template: "%s | Globoniks",
  },
  description: HOME_DESCRIPTION,
  applicationName: "Globoniks",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Globoniks",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    // Real 1200x630 PNG. The archived site pointed og:image at an SVG logo,
    // which no major platform renders -- every share was a blank card.
    // Regenerate with: python scripts/generate-og-card.py
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "Globoniks — web, mobile and custom software development, Mohali, Punjab, India",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og-card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  other: {
    // Real office coordinates. The previous site shipped 39.50;-98.35, the
    // geographic centre of the continental US, with geo.region "US".
    "geo.region": "IN-PB",
    "geo.placename": BUSINESS.locality,
    "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Deliberately no maximumScale / userScalable: blocking pinch-zoom is a
  // WCAG 2.1 failure (1.4.4 Resize Text).
  themeColor: "#8b5cf6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        {/* Organization and WebSite nodes on every page; page-level nodes
            (Service, CreativeWork, FAQPage ...) reference them by @id. */}
        <StructuredData data={organizationSchema()} />
        <StructuredData data={websiteSchema()} />
        <VisitSource />
        {/* Dark only. The brand was designed on black and the starfield is
            meaningless on white; the light tokens in globals.css stay for a
            deliberate toggle later, never for a system preference. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Starfield />
          <div className="grain" aria-hidden="true" />
          <div className="relative z-[1] flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <MobileActionBar />
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  );
}
