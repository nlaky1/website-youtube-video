import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Pilot Deployment Plans",
  description: "Soluqube pricing: a free 3-contract sample, a $475 audit workpaper, a $1,750 QoE deal pack, and $49/month tool access for accounting firms.",
  alternates: {
    canonical: "https://soluqube.com/pricing",
  },
  openGraph: {
    title: "Soluqube Pricing",
    description: "Free 3-contract sample, $475 audit workpaper, $1,750 QoE deal pack, $49/month firm tool access. SSP allocation that ties to the cent.",
    url: "https://soluqube.com/pricing",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
