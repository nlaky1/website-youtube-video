import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, hreflangMap } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";
import { GLOSSARY_TERMS } from "@/data/glossary";

const SITE = "https://soluqube.com";

export const metadata: Metadata = {
  title: { absolute: "ASC 606 & IFRS 15 Revenue Glossary | Soluqube" },
  description:
    "40 revenue recognition terms under ASC 606, IFRS 15 and Ind AS 115, each with a direct definition, standard references and a worked numeric example.",
  alternates: { canonical: `${SITE}/glossary`, languages: hreflangMap("/glossary", LOCALES) },
  openGraph: {
    title: "ASC 606 & IFRS 15 Revenue Glossary",
    description:
      "40 revenue recognition terms with definitions, standard references and worked examples: SSP, performance obligations, contract balances and more.",
    url: `${SITE}/glossary`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    siteName: "Soluqube",
  },
};

export default function GlossaryIndexPage() {
  const terms = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": `${SITE}/glossary#set`,
        name: "Soluqube Revenue Recognition Glossary",
        url: `${SITE}/glossary`,
        hasDefinedTerm: terms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          url: `${SITE}/glossary/${t.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: SITE },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE}/glossary` },
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Revenue recognition glossary</h1>
          <p className="text-slate-700 leading-relaxed">
            {GLOSSARY_TERMS.length} terms from ASC 606, IFRS 15 and Ind AS 115. Each entry gives a direct definition, the
            paragraphs it comes from, an illustrative worked example with real arithmetic, and the mistakes auditors most often
            raise. For allocation questions, try the{" "}
            <Link href="/tools/ssp-allocation-calculator" className="text-emerald-700 underline underline-offset-2">
              SSP allocation calculator
            </Link>
            .
          </p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {terms.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/glossary/${t.slug}`}
                className="block h-full p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition"
              >
                <span className="block font-semibold text-slate-900">{t.term}</span>
                <span className="block mt-1 text-sm text-slate-600 line-clamp-2">{t.definition}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <ResourceFooter />
    </div>
  );
}
