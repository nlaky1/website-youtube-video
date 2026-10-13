import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluqube vs. Leapfin | Contract Audit Subledger vs. Transaction Data Pipeline',
  description: 'Compare Soluqube vs. Leapfin for revenue accounting. Soluqube ingests raw PDF customer contracts with sub-millimeter visual grounding and 128-bit micro-cent math, eliminating high-volume B2C pipeline complexity for B2B contracts.',
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-leapfin',
  },
  openGraph: {
    title: 'Soluqube vs. Leapfin | Contract Intelligence vs Transaction Streaming',
    description: 'Deterministic contract audits vs. high-volume billing event pipelines. Compare pricing, Dual-GAAP scope, and Big 4 audit defensibility.',
    url: 'https://soluqube.com/soluqube-vs-leapfin',
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluqube vs. Leapfin: Revenue Subledger Architecture Comparison',
    description: 'Direct contract PDF grounding, 128-bit micro-cent precision, and Dual-GAAP Ind AS 115 isolation.',
  },
};

export default function SoluqubeVsLeapfinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
