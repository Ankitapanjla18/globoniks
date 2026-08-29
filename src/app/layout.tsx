import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Starfield } from "@/components/sections/Starfield";
import { SITE_URL, BUSINESS } from "@/lib/site";

// The old site used Inter alone -- headings included (weight 800/900). The
// interim Bricolage Grotesque heading face is removed for fidelity.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Globoniks — Software Development Studio in Mohali",
    // Per-page titles land as "<page> | Globoniks". Phase 2 adds them.
    template: "%s | Globoniks",
  },
  description:
    "Globoniks is a software development studio in Mohali, Punjab. We build web applications, mobile apps and custom software for businesses, and run a tech mentorship programme.",
  applicationName: "Globoniks",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Globoniks",
    title: "Globoniks — Software Development Studio in Mohali",
    description:
      "We build web applications, mobile apps and custom software for businesses. Based in Mohali, Punjab, India.",
    url: SITE_URL,
    // Real 1200x630 PNG. The archived site pointed og:image at an SVG logo,
    // which no major platform renders -- every share was a blank card.
    // Regenerate with: python scripts/generate-og-card.py
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "Globoniks - web, mobile and custom software development, Mohali, Punjab, India",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Globoniks — Software Development Studio in Mohali",
    description:
      "We build web applications, mobile apps and custom software for businesses. Based in Mohali, Punjab, India.",
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
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Starfield />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
