import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSP Allocation & Residual-Cent Calculator",
  description:
    "Free ASC 606 relative-SSP allocation calculator: see which obligation absorbs the residual cent and get a monthly schedule that ends at 0.00 deferred.",
  alternates: {
    canonical: "https://soluqube.com/tools/ssp-allocation-calculator",
  },
  openGraph: {
    title: "SSP Allocation & Residual-Cent Calculator | Soluqube",
    description:
      "Allocate a transaction price by relative SSP, see where the residual cent goes, and get a schedule that ties to the cent. Free, runs in your browser.",
    url: "https://soluqube.com/tools/ssp-allocation-calculator",
  },
};

export default function SspCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
