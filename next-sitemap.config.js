/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // eslint-disable-next-line n/no-process-env
    siteUrl: process.env.SITE_URL || "https://uyellitout.com",
    generateRobotsTxt: true, // (optional)
    // ...other options
};