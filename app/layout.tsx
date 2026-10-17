import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsClicks from "@/components/analytics-clicks";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://soluqube.com"),
  title: {
    default: "Soluqube | Defensible SSP Allocation for ASC 606",
    template: "%s | Soluqube",
  },
  description:
    "Auditor questioning an SSP allocation? Soluqube produces the allocation, a schedule that ties to the cent and a hashed workpaper. ASC 606 & Ind AS 115.",
  keywords: [
    "ASC 606 revenue recognition software",
    "Ind AS 115 automated compliance",
    "contract to ledger revenue engine",
    "audit readiness revenue recognition",
    "B2B SaaS revenue waterfall engine",
    "SSP allocation audit defense",
    "NetSuite ARM SAP RAR schedule export",
    "MCA Schedule III GST isolation",
    "relative SSP allocation ASC 606-10-32-31",
    "audit-ready evidence pack",
    "deterministic contract clause parsing",
    "Zuora RevPro alternative",
    "revenue accounting automation",
  ],
  authors: [{ name: "Soluqube", url: "https://soluqube.com" }],
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
    title: "Soluqube | Defensible SSP Allocation for ASC 606",
    description:
      "Deterministic SSP allocation, a full-term schedule that ties to the cent, and a hashed evidence workpaper your auditor can re-perform. ASC 606 and Ind AS 115.",
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
    title: "Soluqube | Defensible SSP Allocation for ASC 606",
    description:
      "Deterministic SSP allocation, schedules that tie to the cent, clause evidence per obligation (page, verbatim excerpt and, on uploaded PDFs, a highlight on the cited line), and hashed evidence workpapers.",
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
        "https://www.crunchbase.com/organization/soluqube",
        "https://www.linkedin.com/company/soluqube",
        "https://www.saashub.com/soluqube"
      ],
      description:
        "Soluqube is a revenue allocation and schedule engine for ASC 606 and Ind AS 115: relative-SSP allocation that ties to the cent, with clause evidence for each performance obligation.",
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
        name: "Free 3-Contract Audit-Defense Workpaper",
      },
      featureList: [
        "Clause Evidence per Obligation (page, verbatim excerpt, highlight on the cited line in uploaded text PDFs)",
        "Integer (BigInt) Fixed-Point Parity (10^6 scale, rounded to cents, terminal-period remainder absorption)",
        "Dual Standard ASC 606 & Ind AS 115 Amortization Schedules",
        "Statutory 18% GST Isolation for INR Contracts (Ind AS 115)",
        "ERP-Ready Schedule Export for NetSuite ARM & SAP RAR (Excel + CSV)",
        "Audit-Ready Evidence Package Generator (5-Sheet Excel & JSON)",
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-61QYXZFGCG"} />
        <AnalyticsClicks />
      </body>
    </html>
  );
}
