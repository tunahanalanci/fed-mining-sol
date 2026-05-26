import type { MetadataRoute } from "next";

const SITE_URL = "https://fedmining.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "en-US": SITE_URL,
          "tr-TR": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/parts`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/drifters`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Brand-filtered parts pages (high-value landing pages for search)
  const brandPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/parts?brand=Sandvik`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/parts?brand=Epiroc`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Category-specific parts pages
  const categories = [
    "Piston",
    "Seal+Kit",
    "Bushing",
    "Valve",
    "Accumulator",
    "Shank+Adapter",
    "Gear",
    "Hardware",
  ];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/parts?category=${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // Drifter model pages
  const drifterModels = [
    "HL700",
    "HL1000",
    "HLX5",
    "RD525",
    "HL500",
    "RD314",
    "COP1838",
    "COP2560",
    "COP4050",
    "COP1638",
    "COP3060",
    "MD20",
  ];
  const drifterPages: MetadataRoute.Sitemap = [
    ...drifterModels.slice(0, 6).map((m) => ({
      url: `${SITE_URL}/drifters?brand=sandvik&model=${m}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...drifterModels.slice(6).map((m) => ({
      url: `${SITE_URL}/drifters?brand=epiroc&model=${m}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    ...staticPages,
    ...brandPages,
    ...categoryPages,
    ...drifterPages,
  ];
}
