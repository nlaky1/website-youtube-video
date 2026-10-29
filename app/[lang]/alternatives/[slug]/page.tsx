import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageFaqs from "@/components/page-faqs";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { faqGraph } from "@/lib/page-faqs";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, SITE, STRINGS, isLocale, localeUrl } from "@/lib/i18n";
import { alternativesSlugs, getLocalizedAlternativesPage, langsFor, localizeHref } from "@/lib/i18n-data";
import { CHECKED_ON, CHECKED_ON_ISO, type Source } from "@/data/alternatives";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((lang) => alternativesSlugs(lang).map((slug) => ({ lang, slug })));
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const d = getLocalizedAlternativesPage(params.lang, params.slug);
  if (!d) return { title: "404", robots: { index: false } };
  const branded = `${d.page.title} | Soluqube`;
  return localizedMetadata({
    lang: params.lang,
    path: `/alternatives/${d.page.slug}`,
    title: branded.length <= 60 ? branded : d.page.title,
    description: d.page.description,
    available: langsFor("alternatives", d.page.slug),
    type: "article",
  });
}

export default function LocalizedAlternativesPage({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = getLocalizedAlternativesPage(lang, params.slug);
  if (!d) notFound();
  const s = STRINGS[lang];
  const { page: p, subject, picks } = d;
  const path = `/alternatives/${p.slug}`;
  const url = localeUrl(lang, path);

  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const v of [subject, ...picks.map((x) => x.profile)]) {
    for (const src of v.sources) {
      if (!seen.has(src.url)) {
        seen.add(src.url);
        sources.push(src);
      }
    }
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: p.title,
        description: p.description,
        inLanguage: lang,
        datePublished: "2026-10-15",
        dateModified: CHECKED_ON_ISO,
        image: `${SITE}/og-image.jpg`,
        author: { "@type": "Organization", name: "Soluqube Editorial", url: SITE },
        publisher: { "@type": "Organization", name: "Soluqube", url: SITE },
        mainEntityOfPage: url,
        citation: sources.map((x) => x.url),
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        name: s.alt.h1For(p.subjectName),
        itemListElement: picks.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.profile.name })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: localeUrl(lang, "/") },
          { "@type": "ListItem", position: 2, name: s.nav.alternatives, item: localeUrl(lang, "/alternatives") },
          { "@type": "ListItem", position: 3, name: s.alt.h1For(p.subjectName), item: url },
        ],
      },
      ...faqGraph(url, p.faqs),
    ],
  };

  const th = "p-3 font-semibold text-slate-900 border-b border-slate-200";
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path={path} available={langsFor("alternatives", p.slug)} />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-500">
          <Link href={`/${lang}`} className="hover:text-slate-900">{s.breadcrumbHome}</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/${lang}/alternatives`} className="hover:text-slate-900">{s.nav.alternatives}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700">{p.subjectName}</span>
        </nav>
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{s.alt.h1For(p.subjectName)}</h1>
          <p className="text-slate-700 leading-relaxed">{p.intro}</p>
          <p className="text-xs text-slate-500">{s.alt.checked(CHECKED_ON)}</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.alt.goodAt(p.subjectName)}</h2>
          <p className="text-sm text-slate-700">{subject.whatItIs} {s.alt.builtFor} {subject.whoFor}</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 marker:text-emerald-600">
            {subject.strengths.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.alt.whyLook(p.subjectName)}</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 marker:text-emerald-600">
            {p.whyLook.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.alt.glance}</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className={th}>{s.alt.product}</th>
                  <th className={th}>{s.alt.standards}</th>
                  <th className={th}>{s.alt.ssp}</th>
                  <th className={th}>{s.alt.pricing}</th>
                </tr>
              </thead>
              <tbody>
                {[subject, ...picks.map((x) => x.profile)].map((v) => (
                  <tr key={v.key} className="align-top">
                    <td className="p-3 border-b border-slate-100 font-medium text-slate-900">
                      {v.name}
                      {v.key === subject.key ? <span className="text-slate-500 font-normal"> ({s.alt.current})</span> : null}
                    </td>
                    <td className="p-3 border-b border-slate-100 text-slate-700">{v.standards}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-700">{v.ssp}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-700">{v.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">{s.alt.notMentioned}</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">{s.alt.picks(picks.length, p.subjectName)}</h2>
          {picks.map((x, i) => (
            <article key={x.vendor} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">{i + 1}. {x.profile.name}</h3>
              <p className="text-sm text-slate-700">{x.profile.whatItIs}</p>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">{s.alt.whoFor} </span>{x.profile.whoFor}</p>
              <p className="text-sm text-slate-700"><span className="font-semibold text-slate-900">{s.alt.asAlt(p.subjectName)} </span>{x.fit}</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-slate-900 mb-1">{s.alt.strengths}</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 marker:text-emerald-600">
                    {x.profile.strengths.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">{s.alt.limits}</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 marker:text-slate-400">
                    {x.profile.limits.map((t, j) => (
                      <li key={j}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {s.alt.pricingLabel} {x.profile.pricing}
                {x.vendor === "soluqube" && p.versusPage ? (
                  <>
                    {" "}
                    <Link href={p.versusPage} className="text-emerald-700 underline underline-offset-2">
                      {s.alt.headToHead(p.subjectName)}
                    </Link>
                  </>
                ) : null}
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.alt.howToChoose}</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 marker:text-emerald-600">
            {p.howToChoose.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
          <p className="text-sm text-slate-700">
            {s.alt.chooseOutro}{" "}
            <Link href="/tools/ssp-allocation-calculator" className="text-emerald-700 underline underline-offset-2">{s.alt.calcLabel}</Link>
            {p.relatedPost ? (
              <>
                {" "}{s.alt.relatedReading}{" "}
                <Link href={localizeHref(lang, p.relatedPost.href)} className="text-emerald-700 underline underline-offset-2">
                  {d.relatedPostLabel ?? p.relatedPost.label}
                </Link>
              </>
            ) : null}
          </p>
        </section>

        <PageFaqs faqs={p.faqs} />

        <aside className="rounded-2xl bg-slate-900 text-white p-6 space-y-2">
          <p className="font-bold">{s.alt.ctaTitle}</p>
          <p className="text-sm text-slate-300">{s.alt.ctaBody}</p>
          <Link href="/design-partners" className="inline-block mt-2 px-4 py-2 rounded-full bg-white text-slate-950 text-sm font-bold">{s.alt.ctaBtn}</Link>
        </aside>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">{s.alt.sources(CHECKED_ON)}</h2>
          <ul className="space-y-1 text-xs text-slate-600 break-words">
            {sources.map((x) => (
              <li key={x.url}>
                {x.label}:{" "}
                <a href={x.url} target="_blank" rel={x.url === SITE || x.url.startsWith(`${SITE}/`) ? "noopener noreferrer" : "noopener noreferrer nofollow"} className="underline underline-offset-2">
                  {x.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
