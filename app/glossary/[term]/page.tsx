import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";
import { GLOSSARY_TERMS, getGlossaryTerm, type GlossaryTerm } from "@/data/glossary";

interface Props {
  params: { term: string };
}

const SITE = "https://soluqube.com";

/** Brand suffix only when the full title stays within 60 characters. */
function pageTitle(t: GlossaryTerm): string {
  const branded = `${t.title} | Soluqube`;
  return branded.length <= 60 ? branded : t.title;
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getGlossaryTerm(params.term);
  if (!t) return { title: "Term not found", robots: { index: false } };
  const url = `${SITE}/glossary/${t.slug}`;
  const title = pageTitle(t);
  return {
    title: { absolute: title },
    description: t.description,
    alternates: { canonical: url },
    openGraph: { title, description: t.description, url, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }], type: "article", siteName: "Soluqube" },
    twitter: { card: "summary", title, description: t.description },
  };
}

export default function GlossaryTermPage({ params }: Props) {
  const t = getGlossaryTerm(params.term);
  if (!t) notFound();

  const url = `${SITE}/glossary/${t.slug}`;
  const related = t.related
    .map((slug) => getGlossaryTerm(slug))
    .filter((r): r is GlossaryTerm => Boolean(r));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${url}#term`,
        name: t.term,
        description: t.definition,
        url,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          "@id": `${SITE}/glossary#set`,
          name: "Soluqube Revenue Recognition Glossary",
          url: `${SITE}/glossary`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: SITE },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE}/glossary` },
          { "@type": "ListItem", position: 3, name: t.term, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/glossary" className="hover:text-slate-900">Glossary</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700">{t.term}</span>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.term}</h1>
          <p
            className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 text-slate-800 leading-relaxed"
            data-ai-answer="direct"
          >
            {t.definition}
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Standard references</h2>
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
          <h2 className="text-xl font-bold text-slate-900">Worked example</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 text-sm sm:text-base">
            <p className="text-slate-700">{t.example.scenario}</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 marker:text-emerald-600">
              {t.example.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <p className="font-semibold text-slate-900 border-t border-slate-100 pt-3">Result: {t.example.result}</p>
            <p className="text-xs text-slate-500">Illustrative figures for explanation only, not taken from a real contract.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Common mistakes</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700 marker:text-emerald-600">
            {t.mistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>

        {t.soluqubeNote && (
          <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
            <h2 className="font-bold text-slate-900 mb-1">How Soluqube handles this</h2>
            <p>{t.soluqubeNote}</p>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Related terms</h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/glossary/${r.slug}`}
                  className="inline-block px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm text-slate-800 hover:border-emerald-400"
                >
                  {r.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Further reading</h2>
          <ul className="space-y-2 text-sm">
            {t.further.map((f) => (
              <li key={f.href}>
                <Link href={f.href} className="text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-900">
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-2xl bg-slate-900 text-white p-6 space-y-2">
          <p className="font-bold">Defending an SSP allocation this quarter?</p>
          <p className="text-sm text-slate-300">
            Send three contracts. You confirm the obligations and prices; you get back the relative-SSP allocation, a schedule
            that ties to the cent, and a hashed workpaper you can re-run.
          </p>
          <Link href="/design-partners" className="inline-block mt-2 px-4 py-2 rounded-full bg-white text-slate-950 text-sm font-bold">
            Become a design partner
          </Link>
        </aside>
      </main>

      <ResourceFooter />
    </div>
  );
}
