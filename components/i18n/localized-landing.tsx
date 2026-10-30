import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import LocalizedMarkdown from "@/components/i18n/localized-markdown";
import { SITE, isLocale, localeUrl } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n-data";
import { LANDING_PATHS, getLanding, landingLangs, landingShared, type LandingId } from "@/lib/i18n-pages";
import { faqGraph } from "@/lib/page-faqs";

const PATENT = "Patent Pending (App. No. 202621096305)";

/** Renders a translated stand-alone page; `children` (e.g. the calculator widget) goes between the lead and the body. */
export default function LocalizedLanding({ lang: rawLang, id, children }: { lang: string; id: LandingId; children?: React.ReactNode }) {
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang;
  const tr = getLanding(lang, id);
  if (!tr) notFound();
  const shared = landingShared(lang);
  const path = LANDING_PATHS[id];
  const url = localeUrl(lang, path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": tr.type === "website" ? "WebPage" : "TechArticle",
        "@id": `${url}#page`,
        headline: tr.h1,
        name: tr.title,
        description: tr.description,
        inLanguage: lang,
        url,
        mainEntityOfPage: url,
        publisher: { "@type": "Organization", name: "Soluqube", url: SITE },
        image: `${SITE}/og-image.jpg`,
      },
      ...faqGraph(url, tr.faqs),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: localeUrl(lang, "/") },
          { "@type": "ListItem", position: 2, name: tr.breadcrumb, item: url },
        ],
      },
    ],
  };
  const ctaLink = (href: string, label: string, primary: boolean) => {
    const cls = primary
      ? "inline-block px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-slate-100"
      : "inline-block px-5 py-2.5 rounded-full border border-slate-600 text-white text-sm font-semibold hover:bg-slate-800";
    return href.startsWith("https://") && !href.startsWith(SITE) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
    ) : (
      <Link href={localizeHref(lang, href)} className={cls}>{label}</Link>
    );
  };
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path={path} available={landingLangs(id)} />
      <header className="border-b border-slate-200 bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <Link href={`/${lang}`} className="hover:text-slate-900">Soluqube</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{tr.breadcrumb}</span>
          </nav>
          {tr.eyebrow && <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">{tr.eyebrow}</div>}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight max-w-4xl">{tr.h1}</h1>
          <div className="max-w-3xl space-y-3">
            <LocalizedMarkdown lang={lang}>{tr.lead}</LocalizedMarkdown>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        {children && (
          <section className="space-y-3">
            {children}
            <p className="text-xs text-slate-500">{shared.widgetNote}</p>
          </section>
        )}
        <article className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <LocalizedMarkdown lang={lang}>{tr.body}</LocalizedMarkdown>
        </article>
        {tr.faqs && tr.faqs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{shared.faqTitle}</h2>
            {tr.faqs.map((f) => (
              <div key={f.question} className="p-5 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-base font-bold text-slate-900">{f.question}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </section>
        )}
        <aside className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 space-y-3">
          <p className="text-xl font-bold">{tr.cta.title}</p>
          <p className="text-sm text-slate-300 max-w-2xl">{tr.cta.body}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            {ctaLink(tr.cta.href, tr.cta.label, true)}
            {tr.cta.secondaryHref && tr.cta.secondaryLabel && ctaLink(tr.cta.secondaryHref, tr.cta.secondaryLabel, false)}
          </div>
        </aside>
        <div className="text-xs text-slate-500 space-y-1">
          <p>{shared.scopeNote}</p>
          <p>
            <Link href={path} hrefLang="en" className="underline underline-offset-2 hover:text-slate-900">{shared.englishVersion}</Link>
            {" · "}
            <span className="font-mono">{PATENT}</span>
          </p>
        </div>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
