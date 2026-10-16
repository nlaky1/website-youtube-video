import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Soluqube vs Klarity: Subledger vs Contract Review",
  description: "Klarity turns Order Forms into review checklists. Soluqube adds relative-SSP allocation, full-term schedules that tie to the cent and a hashed workpaper.",
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-klarity',
  },
  openGraph: {
    title: "Soluqube vs Klarity: Subledger vs Contract Review | Soluqube",
    description: "Klarity turns Order Forms into review checklists. Soluqube adds relative-SSP allocation, full-term schedules that tie to the cent and a hashed workpaper.",
    url: 'https://soluqube.com/soluqube-vs-klarity',
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Soluqube vs Klarity: Subledger vs Contract Review | Soluqube",
    description: "Klarity turns Order Forms into review checklists. Soluqube adds relative-SSP allocation, full-term schedules that tie to the cent and a hashed workpaper.",
  },
};

export default function SoluqubeVsKlarityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
