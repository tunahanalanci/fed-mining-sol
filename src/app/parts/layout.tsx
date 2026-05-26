import type { Metadata } from "next";

const SITE_URL = "https://fedmining.com";

export const metadata: Metadata = {
  title: "Spare Parts Catalog – Sandvik & Epiroc Drifter Parts",
  description:
    "Browse 186+ OEM-compatible drifter spare parts for Sandvik (HL700, HL1000, HLX5, RD525) and Epiroc / Atlas Copco (COP1838, COP2560, COP4050) rock drills. Pistons, seal kits, bushings, accumulators, shank adapters and 400h overhaul kits. Worldwide shipping from Turkey.",
  keywords: [
    "drifter spare parts catalog",
    "Sandvik HL700 piston",
    "Sandvik HL1000 seal kit",
    "Epiroc COP1838 parts",
    "COP2560 spare parts",
    "COP4050 parts",
    "HLX5 parts",
    "rock drill bushing",
    "drifter seal kit 400h",
    "shank adapter T38 T45 T51",
    "drifter accumulator",
    "mining parts Turkey",
    "hydraulic drifter overhaul kit",
    "rock drill piston replacement",
    "drifter yedek parça kataloğu",
  ],
  openGraph: {
    title: "Drifter Spare Parts Catalog | FED Mining – Turkey",
    description:
      "186+ OEM-compatible parts for Sandvik & Epiroc rock drills. Pistons, seal kits, bushings, overhaul kits. Fast worldwide shipping.",
    url: `${SITE_URL}/parts`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/parts`,
  },
};

const partsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Drifter Spare Parts Catalog – FED Mining",
  description:
    "186+ OEM-compatible hydraulic drifter spare parts for Sandvik and Epiroc / Atlas Copco rock drills. Available categories: Pistons, Seal Kits, Bushings, Valve Assemblies, Accumulators, Shank Adapters, Gears & Shafts, Hardware.",
  url: `${SITE_URL}/parts`,
  provider: {
    "@type": "Organization",
    name: "FED Mining Solutions & Parts",
    url: SITE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Spare Parts",
        item: `${SITE_URL}/parts`,
      },
    ],
  },
  about: [
    {
      "@type": "Product",
      name: "Sandvik HL700 Drifter Spare Parts",
      description:
        "OEM-compatible replacement parts for Sandvik HL700 hydraulic drifter used in DT821/DD series underground rigs",
      brand: { "@type": "Brand", name: "Sandvik" },
      offers: {
        "@type": "AggregateOffer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        seller: { "@type": "Organization", name: "FED Mining Solutions & Parts" },
      },
    },
    {
      "@type": "Product",
      name: "Epiroc COP1838 Drifter Spare Parts",
      description:
        "OEM-compatible replacement parts for Epiroc COP1838 hydraulic drifter used in Boomer / ROC D7 underground rigs",
      brand: { "@type": "Brand", name: "Epiroc" },
      offers: {
        "@type": "AggregateOffer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        seller: { "@type": "Organization", name: "FED Mining Solutions & Parts" },
      },
    },
    {
      "@type": "Product",
      name: "400-Hour Drifter Overhaul Kit",
      description:
        "Complete 400-hour scheduled maintenance overhaul kit for Sandvik and Epiroc hydraulic drifters. Includes all seals, pistons, and wear parts.",
      brand: { "@type": "Brand", name: "FED Mining" },
      offers: {
        "@type": "AggregateOffer",
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        seller: { "@type": "Organization", name: "FED Mining Solutions & Parts" },
      },
    },
  ],
};

export default function PartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partsPageSchema) }}
      />
      {children}
    </>
  );
}
