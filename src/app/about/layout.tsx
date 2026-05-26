import type { Metadata } from "next";

const SITE_URL = "https://fedmining.com";

export const metadata: Metadata = {
  title: "About FED Mining – Turkey's Drifter Spare Parts Specialist",
  description:
    "Learn about FED Mining Solutions & Parts – a Turkey-based manufacturer and exporter of hydraulic drifter spare parts for Sandvik and Epiroc rock drills. 30+ staff, operations in Turkey, Chile, and Ghana. 400h overhaul warranty, ISO-grade alloy steel.",
  keywords: [
    "FED Mining about",
    "mining parts manufacturer Turkey",
    "drifter parts exporter Turkey",
    "rock drill parts Turkey company",
    "Sandvik parts supplier Turkey",
    "Epiroc parts distributor Turkey",
    "mining equipment company Turkey",
    "FED Madencilik hakkında",
  ],
  openGraph: {
    title: "About FED Mining | Turkey's Drifter Spare Parts Specialist",
    description:
      "Turkey-based supplier of OEM-compatible drifter spare parts. 30+ staff, worldwide exports to Chile and Ghana. 400h warranty.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
