import type { Metadata } from "next";

const SITE_URL = "https://fedmining.com";

export const metadata: Metadata = {
  title: "Hydraulic Drifter Models – Sandvik & Epiroc Rock Drills",
  description:
    "Complete lineup of Sandvik (HL700, HL1000, HLX5, RD525, HL500, RD314) and Epiroc / Atlas Copco (COP1838, COP2560, COP4050, COP1638, MD20) hydraulic drifters. Specifications, compatible rigs, and OEM-matched spare parts. 400h overhaul warranty.",
  keywords: [
    "Sandvik HL700 drifter",
    "Sandvik HL1000 drifter",
    "Sandvik HLX5",
    "Sandvik RD525",
    "Epiroc COP1838",
    "Epiroc COP2560",
    "Epiroc COP4050",
    "Atlas Copco COP1838",
    "hydraulic rock drill",
    "underground drifter",
    "surface drifter",
    "mining rock drill Turkey",
    "Boomer drifter parts",
    "ROC D7 parts",
    "DT821 drifter",
    "DD422i drifter parts",
  ],
  openGraph: {
    title: "Hydraulic Drifter Models – Sandvik & Epiroc | FED Mining Turkey",
    description:
      "Sandvik HL & RD series + Epiroc COP series drifters. Full specs, compatible rigs, and OEM spare parts with 400h warranty.",
    url: `${SITE_URL}/drifters`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/drifters`,
  },
};

const drifterListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hydraulic Drifter Models – FED Mining",
  description:
    "Sandvik and Epiroc hydraulic drifter models for which FED Mining supplies OEM-compatible spare parts",
  url: `${SITE_URL}/drifters`,
  numberOfItems: 22,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Sandvik HL700" },
    { "@type": "ListItem", position: 2, name: "Sandvik HL1000" },
    { "@type": "ListItem", position: 3, name: "Sandvik HLX5" },
    { "@type": "ListItem", position: 4, name: "Sandvik RD525" },
    { "@type": "ListItem", position: 5, name: "Sandvik HL500" },
    { "@type": "ListItem", position: 6, name: "Sandvik RD314" },
    { "@type": "ListItem", position: 7, name: "Epiroc COP1838" },
    { "@type": "ListItem", position: 8, name: "Epiroc COP2560" },
    { "@type": "ListItem", position: 9, name: "Epiroc COP4050" },
    { "@type": "ListItem", position: 10, name: "Epiroc COP1638" },
    { "@type": "ListItem", position: 11, name: "Epiroc COP3060" },
    { "@type": "ListItem", position: 12, name: "Epiroc MD20" },
  ],
};

export default function DriftersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(drifterListSchema) }}
      />
      {children}
    </>
  );
}
