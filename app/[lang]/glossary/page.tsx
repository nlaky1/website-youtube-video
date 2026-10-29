import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, SITE, STRINGS, isLocale, localeUrl } from "@/lib/i18n";
import { getLocalizedGlossaryTerm, glossarySlugs } from "@/lib/i18n-data";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const s = STRINGS[params.lang];
  return localizedMetadata({ lang: params.lang, path: "/glossary", title: s.glossary.indexTitle, description: s.glossary.indexDesc(glossarySlugs(params.lang).length), available: LOCALES });
}

export default function GlossaryIndex({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const s = STRINGS[lang];
  const terms = glossarySlugs(lang)
    .map((slug) => getLocalizedGlossaryTerm(lang, slug)!)
    .sort((a, b) => a.term.localeCompare(b.term, lang));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": `${localeUrl(lang, "/glossary")}#set`,
        name: s.glossary.setName,
        inLanguage: lang,
        url: localeUrl(lang, "/glossary"),
        hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, url: localeUrl(lang, `/glossary/${t.slug}`) })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: localeUrl(lang, "/") },
          { "@type": "ListItem", position: 2, name: s.nav.glossary, item: localeUrl(lang, "/glossary") },
        ],
      },
    ],
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path="/glossary" available={LOCALES} />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{s.glossary.h1}</h1>
          <p className="text-slate-700 leading-relaxed">{s.glossary.intro(terms.length)}</p>
        </header>
        <ul className="grid sm:grid-cols-2 gap-3">
          {terms.map((t) => (
            <li key={t.slug}>
              <Link href={`/${lang}/glossary/${t.slug}`} className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-400">
                <span className="font-semibold text-slate-900">{t.term}</span>
                <span className="block text-sm text-slate-600 mt-1 line-clamp-2">{t.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
