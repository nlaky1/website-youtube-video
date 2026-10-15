import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Soluqube vs Trullion: ASC 606 and Ind AS 115",
  description: "Compare Soluqube and Trullion: self-serve pricing, integer arithmetic that ties to the cent, and Ind AS 115 GST isolation for INR contracts.",
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-trullion',
  },
  openGraph: {
    title: "Soluqube vs Trullion: ASC 606 and Ind AS 115 | Soluqube",
    description: "Compare Soluqube and Trullion: self-serve pricing, integer arithmetic that ties to the cent, and Ind AS 115 GST isolation for INR contracts.",
    url: 'https://soluqube.com/soluqube-vs-trullion',
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Soluqube vs Trullion: ASC 606 and Ind AS 115 | Soluqube",
    description: "Compare Soluqube and Trullion: self-serve pricing, integer arithmetic that ties to the cent, and Ind AS 115 GST isolation for INR contracts.",
  },
};

export default function SoluqubeVsTrullionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
