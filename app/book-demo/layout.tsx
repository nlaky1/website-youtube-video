import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Free Audit-Defense Workpaper",
  description: "Book a walk-through and request a Free 3-Contract Audit-Defense Workpaper: SSP allocation, a schedule that ties to the cent, and clause evidence per obligation.",
  alternates: {
    canonical: "https://soluqube.com/book-demo",
  },
  openGraph: {
    title: "Book a Soluqube Demo & Free Audit-Defense Workpaper",
    description: "Experience deterministic integer (BigInt) contract-to-ledger revenue recognition live in action.",
    url: "https://soluqube.com/book-demo",
  },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
