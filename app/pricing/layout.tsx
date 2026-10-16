import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Pilot Deployment Plans",
  description: "Soluqube pricing: a Free 3-Contract Audit-Defense Workpaper, then per-contract or continuous plans with schedule exports and hashed evidence packs.",
  alternates: {
    canonical: "https://soluqube.com/pricing",
  },
  openGraph: {
    title: "Soluqube Enterprise Pricing & Deployment Plans",
    description: "Deterministic ASC 606 & Ind AS 115 revenue recognition pricing for enterprise finance and accounting teams.",
    url: "https://soluqube.com/pricing",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
