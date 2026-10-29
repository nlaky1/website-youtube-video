import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, hreflangMap } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";
import { ALTERNATIVES_PAGES, CHECKED_ON } from "@/data/alternatives";

const SITE = "https://soluqube.com";

export const metadata: Metadata = {
  title: { absolute: "Revenue Recognition Software Alternatives | Soluqube" },
  description:
    "Honest alternatives to Maxio, Zuora RevPro, Chargebee RevRec, NetSuite ARM, RightRev and more, with limits and pricing sourced from vendor sites.",
  alternates: { canonical: `${SITE}/alternatives`, languages: hreflangMap("/alternatives", LOCALES) },
  openGraph: {
    title: "Revenue Recognition Software Alternatives",
    description:
      "Alternatives to 10 revenue recognition and billing products, with who each fits, strengths, limits and published pricing.",
    url: `${SITE}/alternatives`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    siteName: "Soluqube",
  },
};

export default function AlternativesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Revenue recognition software alternatives",
        itemListElement: ALTERNATIVES_PAGES.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${p.subjectName} alternatives`,
          url: `${SITE}/alternatives/${p.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: SITE },
          { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE}/alternatives` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Revenue recognition software alternatives</h1>
          <p className="text-slate-700 leading-relaxed">
            Shortlists of alternatives to common billing and revenue recognition products. Each page says who an option suits,
            what it does well, where it is limited and what its pricing page shows. Facts come from vendors&apos; own pages,
            checked on {CHECKED_ON}. Soluqube appears on every list, with its own limits stated plainly.
          </p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALTERNATIVES_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/alternatives/${p.slug}`}
                className="block h-full p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition"
              >
                <span className="block font-semibold text-slate-900">{p.subjectName} alternatives</span>
                <span className="block mt-1 text-sm text-slate-600 line-clamp-2">{p.intro}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <ResourceFooter />
    </div>
  );
}
