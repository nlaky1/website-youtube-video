import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, STRINGS, formatDate, isLocale, localeUrl } from "@/lib/i18n";
import { blogSlugs, getLocalizedBlogPost } from "@/lib/i18n-data";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const s = STRINGS[params.lang];
  return localizedMetadata({ lang: params.lang, path: "/blog", title: s.blog.indexTitle, description: s.blog.indexDesc, available: LOCALES });
}

export default function BlogIndex({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const s = STRINGS[lang];
  const posts = blogSlugs(lang).map((slug) => getLocalizedBlogPost(lang, slug)!);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: s.blog.h1,
        itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: localeUrl(lang, `/blog/${p.slug}`) })),
      },
    ],
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path="/blog" available={LOCALES} />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{s.blog.h1}</h1>
          <p className="text-slate-700 leading-relaxed">{s.blog.intro}</p>
        </header>
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/${lang}/blog/${p.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-400 space-y-2">
                <div className="text-xs font-mono text-slate-500">
                  {formatDate(lang, p.publishedAt)} · {p.readTime}
                </div>
                <h2 className="text-lg font-bold text-slate-900">{p.title}</h2>
                <p className="text-sm text-slate-600">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
