import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluqube vs. RightRev | Standalone ASC 606 Subledger vs. Salesforce CPQ Lock-In',
  description: 'Compare Soluqube vs. RightRev for ASC 606 and IFRS 15 revenue recognition. Soluqube ingests raw PDF customer contracts, provides 128-bit micro-cent precision, and operates across any CRM or ERP with zero Salesforce lock-in.',
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-rightrev',
  },
  openGraph: {
    title: 'Soluqube vs. RightRev | Standalone Contract Subledger vs. Salesforce Native Engine',
    description: 'Decouple ASC 606 revenue recognition from Salesforce CPQ. Deterministic 128-bit math, Ind AS 115 Dual-GAAP, and raw contract PDF grounding.',
    url: 'https://soluqube.com/soluqube-vs-rightrev',
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluqube vs. RightRev: Revenue Recognition Engine Comparison',
    description: 'Eliminate Salesforce CPQ lock-in and floating-point revenue drift with Soluqube deterministic contract audits.',
  },
};

export default function SoluqubeVsRightRevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
