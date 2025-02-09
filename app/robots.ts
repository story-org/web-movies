export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
