import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluqube vs. Trullion | Self-Serve Dual-GAAP ASC 606 & Ind AS 115 Alternative',
  description: 'Compare Soluqube vs. Trullion for revenue recognition. Soluqube offers self-serve $499 contract audits, 128-bit fixed-point math, Ind AS 115 GST statutory isolation, and raw PDF clause bounding boxes.',
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-trullion',
  },
  openGraph: {
    title: 'Soluqube vs. Trullion | Direct Revenue Accounting Engine Comparison',
    description: 'Self-serve dual-GAAP ASC 606 & Ind AS 115 revenue subledger with zero periodic rounding drift.',
    url: 'https://soluqube.com/soluqube-vs-trullion',
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluqube vs. Trullion: Autonomous Revenue Recognition',
    description: 'Deterministic 128-bit fixed-point math, Ind AS 115 GST tax isolation, and instant PDF contract audits.',
  },
};

export default function SoluqubeVsTrullionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
