import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://soluqube.com"),
  title: {
    default: "Soluqube | Deterministic ASC 606 & Ind AS 115 Revenue Recognition Engine",
    template: "%s | Soluqube Revenue Recognition",
  },
  description:
    "Deterministic contract-to-ledger revenue recognition engine. Eliminate manual spreadsheet rounding drift, enforce cross-document billing rate caps, and isolate statutory 18% GST under Ind AS 115 and ASC 606 with zero floating-point error. Patent Priority Application No. 202621096305.",
  keywords: [
    "ASC 606 revenue recognition software",
    "Ind AS 115 automated compliance",
    "contract to ledger revenue engine",
    "Big 4 audit readiness revenue recognition",
    "B2B SaaS revenue waterfall engine",
    "zero drift fixed point parity",
    "ERP revenue subledger sync NetSuite SAP",
    "MCA Schedule III GST isolation",
    "contract modification accounting ASC 606-10-25",
    "AS 3101 compliance pack",
    "deterministic contract clause parsing",
    "Zuora RevPro alternative",
    "revenue accounting automation",
  ],
  authors: [{ name: "Soluqube Engineering Team", url: "https://soluqube.com" }],
  creator: "Soluqube",
  publisher: "Soluqube",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://soluqube.com",
  },
  openGraph: {
    title: "Soluqube | Deterministic Contract-to-Ledger Revenue Recognition Engine",
    description:
      "Eliminate spreadsheet rounding drift, enforce cross-document rate caps, and isolate statutory 18% GST under Ind AS 115 & ASC 606 with zero floating-point error.",
    url: "https://soluqube.com",
    siteName: "Soluqube",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soluqube Deterministic Revenue Recognition Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluqube | Deterministic ASC 606 & Ind AS 115 Revenue Recognition",
    description:
      "Closed-form fixed-point arithmetic, spatial contract token grounding, and automated Big 4 audit readiness.",
    images: ["/og-image.jpg"],
    creator: "@soluqube",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://soluqube.com/#organization",
      name: "Soluqube",
      url: "https://soluqube.com",
      logo: {
        "@type": "ImageObject",
        url: "https://soluqube.com/icon.png",
      },
      sameAs: [
        "https://app.soluqube.com",
        "https://client.soluqube.com",
      ],
      description:
        "Deterministic contract-to-ledger revenue recognition engine with closed-form fixed-point parity and statutory audit defense.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://soluqube.com/#software",
      name: "Soluqube Revenue Recognition Engine",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Cloud, Linux, macOS, Windows",
      url: "https://soluqube.com",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Complimentary 3-Contract Historical Drift Audit",
      },
      featureList: [
        "Spatial Token Character Grounding (PyMuPDF Integer Grid)",
        "Closed-Form 128-Bit Fixed-Point Parity ($0.00 Mathematical Drift)",
        "Dual Standard ASC 606 & Ind AS 115 Amortization Schedules",
        "Statutory 18% GST Isolation under MCA Schedule III",
        "Cross-Document Precedence DAG Rate Cap Enforcement",
        "Oracle NetSuite ARM & SAP S/4HANA RAR Automated Subledger Sync",
        "Big 4 Audit Workpaper Generator (8-Tab Excel & AS 3101 JSON-LD)",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://soluqube.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Soluqube eliminate floating-point rounding drift in ASC 606 revenue schedules?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard ERPs and spreadsheets use IEEE-754 64-bit binary floating-point numbers where fractional cent residues compound over 36-month terms. Soluqube replaces binary floats with 128-bit fixed-point decimal arithmetic and terminal-period remainder absorption, guaranteeing exact balance sheet zero-drift ($0.000000).",
          },
        },
        {
          "@type": "Question",
          name: "How does Soluqube handle Indian GST isolation under Ind AS 115 and MCA Schedule III?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soluqube establishes an automated transaction firewall that quarantines 18% CGST, SGST, and IGST liabilities directly from gross contract bookings into segregated Schedule III balance sheet accounts before net consideration is amortized under Ind AS 115.",
          },
        },
        {
          "@type": "Question",
          name: "Can Soluqube sync with Oracle NetSuite and SAP S/4HANA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Soluqube connects directly with Oracle NetSuite ARM via SuiteTalk REST web services and SAP S/4HANA RAR via OData APIs to post journal entries with automated general ledger account mapping and zero reconciliation discrepancy.",
          },
        },
        {
          "@type": "Question",
          name: "What compliance deliverables does Soluqube provide for Big 4 audit readiness?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soluqube generates an 8-tab variance Excel workpaper with embedded contract clause formulas and an AS 3101 JSON-LD compliance pack containing SHA-256 clause hashes and cryptographic Merkle roots for auditor verification.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} ${mono.variable} bg-white text-slate-900 antialiased selection:bg-slate-900 selection:text-white min-h-screen`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
