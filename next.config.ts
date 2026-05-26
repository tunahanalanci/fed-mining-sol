import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security and SEO headers for all pages
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Canonical language hint
          { key: "Content-Language", value: "en, tr" },
          // Security headers (also help with trust signals)
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Serve llms.txt with proper content type
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 86400,
  },

  // Compression
  compress: true,

  // Power header (optional, some prefer to remove)
  poweredByHeader: false,
};

export default nextConfig;
