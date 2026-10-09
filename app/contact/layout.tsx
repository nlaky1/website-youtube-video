import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Engineering & Technical Desk",
  description: "Get in touch with the Soluqube accounting architecture and engineering team for ERP subledger integration and enterprise POC scoping.",
  alternates: {
    canonical: "https://soluqube.com/contact",
  },
  openGraph: {
    title: "Contact Soluqube Technical Desk",
    description: "Direct engagement intake for Chief Accounting Officers, Controllers, and Big 4 audit readiness teams.",
    url: "https://soluqube.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
