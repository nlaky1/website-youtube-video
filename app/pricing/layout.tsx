import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Pilot Deployment Plans",
  description: "Explore Soluqube deployment tiers: Complimentary 3-contract historical drift audit, enterprise subledger sync, and dedicated sovereign instances.",
  alternates: {
    canonical: "https://soluqube.com/pricing",
  },
  openGraph: {
    title: "Soluqube Enterprise Pricing & Deployment Plans",
    description: "Deterministic ASC 606 & Ind AS 115 revenue recognition pricing for enterprise finance and accounting teams.",
    url: "https://soluqube.com/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
