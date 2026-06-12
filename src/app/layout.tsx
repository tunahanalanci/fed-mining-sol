import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteBasket from "@/components/QuoteBasket";

const SITE_URL = "https://fedmining.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffc03d",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    template: "%s | FED Mining Solutions & Parts",
    default:
      "FED Mining Solutions & Parts | Drifter Spare Parts Supplier – Turkey",
  },

  description:
    "FED Mining Solutions and Parts – OEM-compatible spare parts for Sandvik (HL700, HL1000, HLX5) and Epiroc / Atlas Copco (COP1838, COP2560, COP4050) hydraulic drifters. 400-hour overhaul kits, pistons, seal kits, bushings. Worldwide shipping from Turkey. Trusted by mines in TR · CL · GH.",

  keywords: [
    // Core product terms
    "drifter spare parts",
    "rock drill spare parts",
    "hydraulic drifter parts",
    "mining drill parts Turkey",
    // Sandvik model-specific
    "Sandvik HL700 spare parts",
    "Sandvik HL1000 parts",
    "Sandvik HLX5 parts",
    "Sandvik RD525 parts",
    "Sandvik HL500 parts",
    "Sandvik RD314 parts",
    "Sandvik compatible drifter parts",
    "Tamrock spare parts",
    // Epiroc / Atlas Copco model-specific
    "Epiroc COP1838 spare parts",
    "Epiroc COP2560 parts",
    "Epiroc COP4050 parts",
    "Epiroc COP1638 parts",
    "Atlas Copco COP1838 parts",
    "Atlas Copco replacement parts",
    "Epiroc compatible parts Turkey",
    // Part category terms
    "drifter piston",
    "drifter seal kit",
    "400h overhaul kit",
    "rock drill bushing",
    "shank adapter T38 T45 T51",
    "drifter accumulator",
    "valve assembly rock drill",
    "drifter rebuild kit",
    "mining equipment spare parts",
    // Company / geo terms
    "mining parts supplier Turkey",
    "mining equipment Turkey",
    "FED Mining",
    "rock drill overhaul Turkey",
    "drifter repair parts worldwide shipping",
    // Turkish keywords
    "drifter yedek parça",
    "madencilik yedek parça Türkiye",
    "kaya delici parçaları",
    "hidrolik drifter bakım kiti",
  ],

  authors: [{ name: "FED Mining Solutions & Parts", url: SITE_URL }],
  creator: "FED Mining Solutions & Parts",
  publisher: "FED Mining Solutions & Parts",

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "tr_TR",
    url: SITE_URL,
    siteName: "FED Mining Solutions & Parts",
    title:
      "FED Mining Solutions & Parts | Drifter Spare Parts Supplier – Turkey",
    description:
      "OEM-compatible spare parts for Sandvik & Epiroc hydraulic drifters. 400h overhaul kits, pistons, seal kits, bushings. Worldwide shipping from Turkey.",
    // opengraph-image.tsx provides the OG image automatically via Next.js file convention
  },

  twitter: {
    card: "summary_large_image",
    title:
      "FED Mining Solutions & Parts | Drifter Spare Parts Supplier – Turkey",
    description:
      "OEM-compatible spare parts for Sandvik & Epiroc hydraulic drifters. 400h overhaul kits. Worldwide shipping from Turkey.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "tr-TR": "/",
    },
  },

  category: "industrial equipment",
};

/* ── JSON-LD Structured Data ── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "FED Mining Solutions & Parts",
  alternateName: ["FED Mining", "FED Madencilik"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    "FED Mining Solutions and Parts is a Turkey-based supplier of OEM-compatible hydraulic drifter spare parts for Sandvik (HL700, HL1000, HLX5) and Epiroc / Atlas Copco (COP1838, COP2560, COP4050) rock drills. We supply pistons, seal kits, bushings, accumulators, shank adapters and complete 400-hour overhaul kits with worldwide shipping.",
  foundingDate: "2015",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 30,
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
    addressRegion: "Turkey",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+90-506-120-8706",
      contactType: "sales",
      availableLanguage: ["English", "Turkish"],
      areaServed: "Worldwide",
    },
    {
      "@type": "ContactPoint",
      email: "info@fedmining.com",
      contactType: "customer service",
    },
  ],
  sameAs: [
    `https://wa.me/905061208706`,
  ],
  areaServed: [
    { "@type": "Country", name: "Turkey" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Ghana" },
    { "@type": "Country", name: "Worldwide" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mining Drifter Spare Parts Catalog",
    numberOfItems: 186,
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Sandvik Drifter Parts",
        description:
          "Compatible spare parts for Sandvik HL700, HL1000, HLX5, RD525, HL500, RD314",
      },
      {
        "@type": "OfferCatalog",
        name: "Epiroc / Atlas Copco Drifter Parts",
        description:
          "Compatible spare parts for Epiroc COP1838, COP2560, COP4050, COP1638, COP3060, MD20",
      },
    ],
  },
  knowsAbout: [
    "Hydraulic Drifter Repair",
    "Rock Drill Spare Parts",
    "Mining Equipment Maintenance",
    "Underground Mining",
    "Surface Drilling",
    "Sandvik HL Series",
    "Epiroc COP Series",
    "400h Overhaul Kits",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "FED Mining Solutions & Parts",
  description:
    "OEM-compatible drifter spare parts for Sandvik & Epiroc rock drills. Turkey-based supplier with worldwide shipping.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/parts?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["en-US", "tr-TR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <ClientProviders>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 104px)" }}>{children}</main>
          <Footer />
          <QuoteBasket />
        </ClientProviders>
      </body>
    </html>
  );
}
