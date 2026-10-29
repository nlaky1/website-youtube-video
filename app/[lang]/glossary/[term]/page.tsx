import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageFaqs from "@/components/page-faqs";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { faqGraph } from "@/lib/page-faqs";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, STRINGS, isLocale, localeUrl } from "@/lib/i18n";
import { getLocalizedGlossaryTerm, glossarySlugs, langsFor, localizeHref } from "@/lib/i18n-data";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((lang) => glossarySlugs(lang).map((term) => ({ lang, term })));
}

export function generateMetadata({ params }: { params: { lang: string; term: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const t = getLocalizedGlossaryTerm(params.lang, params.term);
  if (!t) return { title: "404", robots: { index: false } };
  const branded = `${t.title} | Soluqube`;
  return localizedMetadata({
    lang: params.lang,
    path: `/glossary/${t.slug}`,
    title: branded.length <= 60 ? branded : t.title,
    description: t.description,
    available: langsFor("glossary", t.slug),
    type: "article",
  });
}

export default function LocalizedGlossaryTerm({ params }: { params: { lang: string; term: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const t = getLocalizedGlossaryTerm(lang, params.term);
  if (!t) notFound();
  const s = STRINGS[lang];
  const path = `/glossary/${t.slug}`;
  const url = localeUrl(lang, path);
  const related = t.related.map((slug) => getLocalizedGlossaryTerm(lang, slug)).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${url}#term`,
        name: t.term,
        description: t.definition,
        url,
        inLanguage: lang,
        inDefinedTermSet: { "@type": "DefinedTermSet", "@id": `${localeUrl(lang, "/glossary")}#set`, name: s.glossary.setName, url: localeUrl(lang, "/glossary") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: localeUrl(lang, "/") },
          { "@type": "ListItem", position: 2, name: s.nav.glossary, item: localeUrl(lang, "/glossary") },
          { "@type": "ListItem", position: 3, name: t.term, item: url },
        ],
      },
      ...faqGraph(url, t.faqs),
    ],
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path={path} available={langsFor("glossary", t.slug)} />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-500">
          <Link href={`/${lang}`} className="hover:text-slate-900">{s.breadcrumbHome}</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/${lang}/glossary`} className="hover:text-slate-900">{s.nav.glossary}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700">{t.term}</span>
        </nav>
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.term}</h1>
          <p className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 text-slate-800 leading-relaxed" data-ai-answer="direct">
            {t.definition}
          </p>
        </header>
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.glossary.standardRefs}</h2>
          <ul className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 text-sm">
            {t.references.map((r, i) => (
              <li key={i} className="p-3 flex flex-col sm:flex-row sm:gap-4">
                <span className="font-mono font-semibold text-slate-900 sm:w-28 shrink-0">{r.standard}</span>
                <span className="text-slate-700">
                  {r.ref}
                  {r.note ? <span className="text-slate-500"> ({r.note})</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.glossary.workedExample}</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 text-sm sm:text-base">
            <p className="text-slate-700">{t.example.scenario}</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 marker:text-emerald-600">
              {t.example.steps.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ol>
            <p className="font-semibold text-slate-900 border-t border-slate-100 pt-3">{s.glossary.result}: {t.example.result}</p>
            <p className="text-xs text-slate-500">{s.glossary.illustrative}</p>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.glossary.mistakes}</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700 marker:text-emerald-600">
            {t.mistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>
        {t.soluqubeNote && (
          <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
            <h2 className="font-bold text-slate-900 mb-1">{s.glossary.howSoluqube}</h2>
            <p>{t.soluqubeNote}</p>
          </section>
        )}
        <PageFaqs faqs={t.faqs} />
        {related.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">{s.glossary.related}</h2>
            <ul className="flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${lang}/glossary/${r.slug}`} className="inline-block px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-800 hover:border-emerald-400">
                    {r.term}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.glossary.further}</h2>
          <ul className="space-y-2 text-sm">
            {t.further.map((f) => (
              <li key={f.href}>
                <Link href={localizeHref(lang, f.href)} className="text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-900">
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <aside className="rounded-2xl bg-slate-900 text-white p-6 space-y-2">
          <p className="font-bold">{s.glossary.ctaTitle}</p>
          <p className="text-sm text-slate-300">{s.glossary.ctaBody}</p>
          <Link href="/design-partners" className="inline-block mt-2 px-4 py-2 rounded-full bg-white text-slate-950 text-sm font-bold">
            {s.glossary.ctaBtn}
          </Link>
        </aside>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
