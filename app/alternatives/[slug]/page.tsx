import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";
import {
  ALTERNATIVES_PAGES,
  CHECKED_ON,
  CHECKED_ON_ISO,
  VENDORS,
  getAlternativesPage,
  type AlternativesPage,
  type Source,
} from "@/data/alternatives";

interface Props {
  params: { slug: string };
}

const SITE = "https://soluqube.com";

function pageTitle(p: AlternativesPage): string {
  const branded = `${p.title} | Soluqube`;
  return branded.length <= 60 ? branded : p.title;
}

export async function generateStaticParams() {
  return ALTERNATIVES_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getAlternativesPage(params.slug);
  if (!p) return { title: "Page not found", robots: { index: false } };
  const url = `${SITE}/alternatives/${p.slug}`;
  const title = pageTitle(p);
  return {
    title: { absolute: title },
    description: p.description,
    alternates: { canonical: url },
    openGraph: { title, description: p.description, url, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }], type: "article", siteName: "Soluqube" },
    twitter: { card: "summary", title, description: p.description },
  };
}

export default function AlternativesDetailPage({ params }: Props) {
  const p = getAlternativesPage(params.slug);
  if (!p) notFound();

  const url = `${SITE}/alternatives/${p.slug}`;
  const subject = VENDORS[p.subject];
  const picks = p.picks.map((pick) => ({ ...pick, profile: VENDORS[pick.vendor] })).filter((x) => x.profile);

  // Every source used on this page, de-duplicated.
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const v of [subject, ...picks.map((x) => x.profile)]) {
    for (const s of v.sources) {
      if (!seen.has(s.url)) {
        seen.add(s.url);
        sources.push(s);
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
        dateModified: CHECKED_ON_ISO,
        author: { "@type": "Organization", name: "Soluqube Editorial", url: SITE },
        publisher: { "@type": "Organization", name: "Soluqube", url: SITE },
        mainEntityOfPage: url,
        citation: sources.map((s) => s.url),
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        name: `${p.subjectName} alternatives`,
        itemListElement: picks.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.profile.name })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: SITE },
          { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE}/alternatives` },
          { "@type": "ListItem", position: 3, name: `${p.subjectName} alternatives`, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/alternatives" className="hover:text-slate-900">Alternatives</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700">{p.subjectName}</span>
        </nav>

        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{p.subjectName} alternatives</h1>
          <p className="text-slate-700 leading-relaxed">{p.intro}</p>
          <p className="text-xs text-slate-500">
            Facts checked against each vendor&apos;s own public pages on {CHECKED_ON}. Soluqube is one of the options listed,
            so read this keeping that in mind; sources are at the bottom of the page.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">What {p.subjectName} is good at</h2>
          <p className="text-sm text-slate-700">{subject.whatItIs} Built for: {subject.whoFor}</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 marker:text-emerald-600">
            {subject.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Why teams look for {p.subjectName} alternatives</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 marker:text-emerald-600">
            {p.whyLook.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">At a glance</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900 border-b border-slate-200">Product</th>
                  <th className="p-3 font-semibold text-slate-900 border-b border-slate-200">Standards named</th>
                  <th className="p-3 font-semibold text-slate-900 border-b border-slate-200">SSP</th>
                  <th className="p-3 font-semibold text-slate-900 border-b border-slate-200">Pricing</th>
                </tr>
              </thead>
              <tbody>
                {[subject, ...picks.map((x) => x.profile)].map((v) => (
                  <tr key={v.key} className="align-top">
                    <td className="p-3 border-b border-slate-100 font-medium text-slate-900">
                      {v.name}
                      {v.key === subject.key ? <span className="text-slate-500 font-normal"> (current)</span> : null}
                    </td>
                    <td className="p-3 border-b border-slate-100 text-slate-700">{v.standards}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-700">{v.ssp}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-700">{v.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            &quot;Not mentioned&quot; means the vendor pages we read did not say it, not that the product lacks it.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">{picks.length} alternatives to {p.subjectName}</h2>
          {picks.map((x, i) => (
            <article key={x.vendor} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <h3 className="text-lg font-bold text-slate-900">
                {i + 1}. {x.profile.name}
              </h3>
              <p className="text-sm text-slate-700">{x.profile.whatItIs}</p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Who it&apos;s for: </span>
                {x.profile.whoFor}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">As a {p.subjectName} alternative: </span>
                {x.fit}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Strengths</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 marker:text-emerald-600">
                    {x.profile.strengths.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1">Limits</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 marker:text-slate-400">
                    {x.profile.limits.map((s, j) => (
                      <li key={j}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Pricing: {x.profile.pricing}
                {x.vendor === "soluqube" && p.versusPage ? (
                  <>
                    {" "}
                    Head-to-head:{" "}
                    <Link href={p.versusPage} className="text-emerald-700 underline underline-offset-2">
                      Soluqube vs {p.subjectName}
                    </Link>
                    .
                  </>
                ) : null}
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">How to choose</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 marker:text-emerald-600">
            {p.howToChoose.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="text-sm text-slate-700">
            Whichever you shortlist, re-perform one allocation yourself. The{" "}
            <Link href="/tools/ssp-allocation-calculator" className="text-emerald-700 underline underline-offset-2">
              SSP allocation calculator
            </Link>{" "}
            and the glossary entries on the{" "}
            <Link href="/glossary/relative-ssp-method" className="text-emerald-700 underline underline-offset-2">
              relative SSP method
            </Link>{" "}
            and{" "}
            <Link href="/glossary/contract-modification" className="text-emerald-700 underline underline-offset-2">
              contract modifications
            </Link>{" "}
            show what to check.
            {p.relatedPost ? (
              <>
                {" "}Related reading:{" "}
                <Link href={p.relatedPost.href} className="text-emerald-700 underline underline-offset-2">
                  {p.relatedPost.label}
                </Link>
                .
              </>
            ) : null}
          </p>
        </section>

        <aside className="rounded-2xl bg-slate-900 text-white p-6 space-y-2">
          <p className="font-bold">Want to test Soluqube on your own contracts?</p>
          <p className="text-sm text-slate-300">
            Design partners get 60 days free on real contracts: the relative-SSP allocation, a schedule that ties to the cent,
            and a hashed workpaper. It does not replace billing or your ERP.
          </p>
          <Link href="/design-partners" className="inline-block mt-2 px-4 py-2 rounded-full bg-white text-slate-950 text-sm font-bold">
            See the design partner program
          </Link>
        </aside>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">Sources (checked {CHECKED_ON})</h2>
          <ul className="space-y-1 text-xs text-slate-600 break-words">
            {sources.map((s) => (
              <li key={s.url}>
                {s.label}:{" "}
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
                  {s.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <ResourceFooter />
    </div>
  );
}
