import { Metadata } from 'next';
import { landingHreflang } from "@/lib/i18n-pages";

export const metadata: Metadata = {
  title: "Soluqube vs Trullion: ASC 606 and Ind AS 115",
  description: "Compare Soluqube and Trullion: per-contract pricing, integer arithmetic that ties to the cent, and Ind AS 115 GST isolation for INR contracts.",
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-trullion',
    languages: landingHreflang("/soluqube-vs-trullion"),
  },
  openGraph: {
    title: "Soluqube vs Trullion: ASC 606 and Ind AS 115 | Soluqube",
    description: "Compare Soluqube and Trullion: per-contract pricing, integer arithmetic that ties to the cent, and Ind AS 115 GST isolation for INR contracts.",
    url: 'https://soluqube.com/soluqube-vs-trullion',
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Soluqube vs Trullion: ASC 606 and Ind AS 115 | Soluqube",
    description: "Compare Soluqube and Trullion: per-contract pricing, integer arithmetic that ties to the cent, and Ind AS 115 GST isolation for INR contracts.",
  },
};

export default function SoluqubeVsTrullionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
