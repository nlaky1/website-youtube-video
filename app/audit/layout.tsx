import type { Metadata } from "next";

// /audit is a client component, so its metadata lives here (SEO audit 2026-10-15, C3).
export const metadata: Metadata = {
  title: { absolute: "ASC 606 Revenue Schedule Simulator | Soluqube" },
  description:
    "Enter a contract value and term and compare per-period rounding with an integer-cent ASC 606 schedule whose final period absorbs the remainder.",
  alternates: {
    canonical: "https://soluqube.com/audit",
  },
  openGraph: {
    title: "ASC 606 Revenue Schedule Simulator | Soluqube",
    description:
      "Compare per-period rounding with an integer-cent ASC 606 schedule whose final period absorbs the remainder, so it ties to the contract value.",
    url: "https://soluqube.com/audit",
    siteName: "Soluqube",
    type: "website",
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
