import type { MetadataRoute } from "next";

const SITE_URL = "https://fedmining.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/login/", "/register/"],
      },
      // Allow major AI/LLM crawlers to index everything public
      {
        userAgent: "GPTBot",
        allow: ["/", "/parts", "/drifters", "/about", "/contact"],
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/parts", "/drifters", "/about", "/contact"],
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/parts", "/drifters", "/about", "/contact"],
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
