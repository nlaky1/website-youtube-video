import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Soluqube | Deterministic Contract-to-Ledger Revenue Recognition",
  description: "Eliminate manual spreadsheet rounding drift, enforce cross-document billing rate caps, and isolate statutory 18% GST under Ind AS 115 and ASC 606 with zero floating-point error. Patent Priority Application No. 202621096305.",
  keywords: "ASC 606, Ind AS 115, revenue recognition, contract to ledger, zero drift, statutory audit defense, GST isolation, Merkle tree, Big 4 audit, revenue accounting automation",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={`${inter.className} ${mono.variable} bg-white text-slate-900 antialiased selection:bg-slate-900 selection:text-white min-h-screen`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
