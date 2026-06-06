export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://helpcart.vercel.app/sitemap.xml",
  };
}