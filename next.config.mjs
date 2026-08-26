/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * Static export: every route is prerendered, so the site deploys to any
   * static host -- including the existing Render Static Site service (which
   * cannot run a Node server). `trailingSlash` makes each route a
   * directory with an index.html, which every static host serves without
   * needing pretty-URL support. Canonicals and the sitemap use the same
   * trailing-slash URLs so the served URL and the declared canonical match.
   */
  output: "export",
  trailingSlash: true,
  images: {
    // The image-optimizer endpoint needs a server; assets are pre-sized.
    unoptimized: true,
  },
};

export default nextConfig;
