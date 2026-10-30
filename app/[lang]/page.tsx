import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, SITE, STRINGS, isLocale, localeUrl } from "@/lib/i18n";
import { LANDING_PATHS, getLanding, landingIds, landingShared } from "@/lib/i18n-pages";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const s = STRINGS[params.lang];
  return localizedMetadata({ lang: params.lang, path: "/", title: s.hub.title, description: s.hub.description, available: LOCALES });
}

export default function LangHubPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const s = STRINGS[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${localeUrl(lang, "/")}#page`, url: localeUrl(lang, "/"), name: s.hub.title, description: s.hub.description, inLanguage: lang, isPartOf: { "@id": `${SITE}/#organization` } },
    ],
  };
  const cards = [
    { href: `/${lang}/glossary`, title: s.hub.sections.glossary, body: s.hub.sectionsBody.glossary },
    { href: `/${lang}/blog`, title: s.hub.sections.blog, body: s.hub.sectionsBody.blog },
    { href: `/${lang}/alternatives`, title: s.hub.sections.alternatives, body: s.hub.sectionsBody.alternatives },
  ];
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path="/" available={LOCALES} />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{s.hub.h1}</h1>
          <p className="text-slate-700 leading-relaxed">{s.hub.sub}</p>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700 marker:text-emerald-600">
            {s.hub.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">{s.hub.limits}</p>
        </header>
        <section className="grid sm:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-400 space-y-2">
              <h2 className="font-bold text-slate-900">{c.title}</h2>
              <p className="text-sm text-slate-600">{c.body}</p>
            </Link>
          ))}
        </section>
        {landingIds(lang).length > 0 && (
          <section className="space-y-3">
            <h2 className="font-bold text-slate-900">{landingShared(lang).moreTitle}</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {landingIds(lang).map((id) => (
                <li key={id}>
                  <Link href={`/${lang}${LANDING_PATHS[id]}`} className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900">
                    {getLanding(lang, id)!.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <aside className="rounded-2xl bg-slate-900 text-white p-6 space-y-2">
          <p className="font-bold">{s.hub.ctaTitle}</p>
          <p className="text-sm text-slate-300">{s.hub.ctaBody}</p>
          <Link href="/design-partners" className="inline-block mt-2 px-4 py-2 rounded-full bg-white text-slate-950 text-sm font-bold">
            {s.hub.ctaBtn}
          </Link>
        </aside>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
