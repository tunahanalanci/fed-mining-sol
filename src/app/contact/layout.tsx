import type { Metadata } from "next";

const SITE_URL = "https://fedmining.com";

export const metadata: Metadata = {
  title: "Contact – Get a Quote for Drifter Spare Parts",
  description:
    "Contact FED Mining Solutions & Parts for pricing and availability on Sandvik and Epiroc drifter spare parts. WhatsApp 24/7, email, and online quote form. Fast response, worldwide shipping from Turkey.",
  keywords: [
    "contact FED Mining",
    "drifter parts quote",
    "rock drill parts price",
    "mining parts Turkey contact",
    "Sandvik parts order Turkey",
    "Epiroc parts supplier contact",
    "drifter spare parts WhatsApp",
    "FED Mining iletişim",
    "madencilik parça teklif",
  ],
  openGraph: {
    title: "Get a Quote | FED Mining Drifter Spare Parts – Turkey",
    description:
      "Request pricing for Sandvik & Epiroc drifter spare parts. WhatsApp 24/7, fast quotes, worldwide shipping from Turkey.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact FED Mining Solutions & Parts",
  description:
    "Get in touch with FED Mining for drifter spare parts pricing, availability and custom quotes.",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "FED Mining Solutions & Parts",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+90-506-120-8706",
        contactType: "sales",
        availableLanguage: ["English", "Turkish"],
        areaServed: "Worldwide",
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        email: "info@fedmining.com",
        contactType: "customer support",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
