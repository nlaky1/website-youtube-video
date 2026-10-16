import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Soluqube vs Leapfin: B2B Contract Revenue",
  description: "Leapfin streams high-volume transactions. Soluqube works from B2B contracts: SSP allocation, schedules that tie to the cent, clause evidence.",
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-leapfin',
  },
  openGraph: {
    title: "Soluqube vs Leapfin: B2B Contract Revenue | Soluqube",
    description: "Leapfin streams high-volume transactions. Soluqube works from B2B contracts: SSP allocation, schedules that tie to the cent, clause evidence.",
    url: 'https://soluqube.com/soluqube-vs-leapfin',
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Soluqube vs Leapfin: B2B Contract Revenue | Soluqube",
    description: "Leapfin streams high-volume transactions. Soluqube works from B2B contracts: SSP allocation, schedules that tie to the cent, clause evidence.",
  },
};

export default function SoluqubeVsLeapfinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
