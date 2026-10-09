import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | 3-Contract Historical Drift Audit",
  description: "Schedule a live architecture walk-through and request a complimentary 3-contract historical rounding drift audit with our technical accounting team.",
  alternates: {
    canonical: "https://soluqube.com/book-demo",
  },
  openGraph: {
    title: "Book Soluqube Demo & Historical Drift Audit",
    description: "Experience deterministic 128-bit contract-to-ledger revenue recognition live in action.",
    url: "https://soluqube.com/book-demo",
  },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
