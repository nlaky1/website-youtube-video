import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, STRINGS, isLocale, localeUrl } from "@/lib/i18n";
import { alternativesSlugs, getLocalizedAlternativesPage } from "@/lib/i18n-data";
import { CHECKED_ON } from "@/data/alternatives";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const s = STRINGS[params.lang];
  return localizedMetadata({ lang: params.lang, path: "/alternatives", title: s.alt.indexTitle + " | Soluqube", description: s.alt.indexDesc, available: LOCALES });
}

export default function AlternativesIndex({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const s = STRINGS[lang];
  const pages = alternativesSlugs(lang).map((slug) => getLocalizedAlternativesPage(lang, slug)!);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: s.alt.h1,
        itemListElement: pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: s.alt.h1For(p.page.subjectName), url: localeUrl(lang, `/alternatives/${p.page.slug}`) })),
      },
    ],
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path="/alternatives" available={LOCALES} />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{s.alt.h1}</h1>
          <p className="text-slate-700 leading-relaxed">{s.alt.intro}</p>
          <p className="text-xs text-slate-500">{s.alt.checked(CHECKED_ON)}</p>
        </header>
        <ul className="grid sm:grid-cols-2 gap-3">
          {pages.map((p) => (
            <li key={p.page.slug}>
              <Link href={`/${lang}/alternatives/${p.page.slug}`} className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-400">
                <span className="font-semibold text-slate-900">{s.alt.h1For(p.page.subjectName)}</span>
                <span className="block text-sm text-slate-600 mt-1 line-clamp-3">{p.page.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
