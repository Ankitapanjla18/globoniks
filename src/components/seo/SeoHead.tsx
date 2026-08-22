interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

export function SeoHead({
  title,
  description,
  canonicalUrl = "https://globoniks.com",
  ogType = "website",
  ogImage = "https://globoniks.com/og-image.jpg"
}: SeoHeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Globoniks" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@globoniks" />
      <meta name="twitter:creator" content="@globoniks" />
    </>
  );
}
