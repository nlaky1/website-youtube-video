import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soluqube | Deterministic Contract-to-Ledger Revenue Recognition Engine",
  description: "Zero floating-point calculation drift. Spatial token character grounding. Automated 18% GST isolation for ASC 606 & Ind AS 115 statutory compliance. Patent Priority Application No. 202621096305.",
  keywords: "ASC 606, Ind AS 115, revenue recognition, contract to ledger, zero drift, statutory audit defense, GST isolation, Merkle tree, Big 4 audit, revenue accounting automation",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body suppressHydrationWarning={true} className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
