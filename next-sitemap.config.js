/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://globoniks.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // Exclude dynamic server sitemap if any
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://globoniks.com/sitemap.xml',
    ],
  },
}
