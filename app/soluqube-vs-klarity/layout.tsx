import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluqube vs. Klarity | Complete Revenue Subledger vs. Checklist Review',
  description: 'Compare Soluqube vs. Klarity. Soluqube provides complete integer (BigInt) deterministic subledger amortization schedules, Merkle-root audit proof, and dual-GAAP compliance, not just checklist extraction.',
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-klarity',
  },
  openGraph: {
    title: 'Soluqube vs. Klarity | Complete Revenue Subledger vs. Review Tool',
    description: 'Compare automated contract ingestion and deterministic ledger execution between Soluqube and Klarity.',
    url: 'https://soluqube.com/soluqube-vs-klarity',
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluqube vs. Klarity: Revenue Subledger Comparison',
    description: 'Full integer (BigInt) fixed-point math DAG subledger schedules with dual-GAAP ASC 606 & Ind AS 115 compliance.',
  },
};

export default function SoluqubeVsKlarityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
