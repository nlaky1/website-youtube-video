import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Soluqube vs RightRev: ASC 606 Without CPQ Lock-In",
  description: "RightRev runs inside Salesforce CPQ. Soluqube is a standalone subledger: relative-SSP allocation, schedules that tie to the cent, Ind AS 115 support.",
  alternates: {
    canonical: 'https://soluqube.com/soluqube-vs-rightrev',
  },
  openGraph: {
    title: "Soluqube vs RightRev: ASC 606 Without CPQ Lock-In | Soluqube",
    description: "RightRev runs inside Salesforce CPQ. Soluqube is a standalone subledger: relative-SSP allocation, schedules that tie to the cent, Ind AS 115 support.",
    url: 'https://soluqube.com/soluqube-vs-rightrev',
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    siteName: 'Soluqube',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Soluqube vs RightRev: ASC 606 Without CPQ Lock-In | Soluqube",
    description: "RightRev runs inside Salesforce CPQ. Soluqube is a standalone subledger: relative-SSP allocation, schedules that tie to the cent, Ind AS 115 support.",
  },
};

export default function SoluqubeVsRightRevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
