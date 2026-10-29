import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GithubSlugger from "github-slugger";
import LocalizedMarkdown from "@/components/i18n/localized-markdown";
import { LocaleFooter, LocaleHeader } from "@/components/i18n/locale-shell";
import { localizedMetadata } from "@/lib/i18n-meta";
import { LOCALES, SITE, STRINGS, formatDate, isLocale, localeUrl } from "@/lib/i18n";
import { blogSlugs, getLocalizedBlogPost, langsFor } from "@/lib/i18n-data";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.flatMap((lang) => blogSlugs(lang).map((slug) => ({ lang, slug })));
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function toIsoDate(human: string): string {
  const m = human.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return human;
  const month = MONTHS.indexOf(m[1].toLowerCase()) + 1;
  return month ? `${m[3]}-${String(month).padStart(2, "0")}-${m[2].padStart(2, "0")}` : human;
}

/** H2 headings of the translated article with ids from the same slugger rehype-slug uses. */
function buildToc(content: string): { id: string; label: string }[] {
  const slugger = new GithubSlugger();
  const out: { id: string; label: string }[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[2].replace(/\*\*|__|`/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    const id = slugger.slug(text);
    if (m[1].length === 2) out.push({ id, label: text });
  }
  return out;
}

export function generateMetadata({ params }: { params: { lang: string; slug: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const p = getLocalizedBlogPost(params.lang, params.slug);
  if (!p) return { title: "404", robots: { index: false } };
  const branded = `${p.title} | Soluqube`;
  const meta = localizedMetadata({
    lang: params.lang,
    path: `/blog/${p.slug}`,
    title: branded.length <= 60 ? branded : p.title,
    description: p.subtitle,
    available: langsFor("blog", p.slug),
    type: "article",
  });
  return meta;
}

export default function LocalizedBlogPost({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const post = getLocalizedBlogPost(lang, params.slug);
  if (!post) notFound();
  const s = STRINGS[lang];
  const path = `/blog/${post.slug}`;
  const url = localeUrl(lang, path);
  const slugs = blogSlugs(lang);
  const idx = slugs.indexOf(post.slug);
  const prev = idx > 0 ? getLocalizedBlogPost(lang, slugs[idx - 1]) : null;
  const next = idx < slugs.length - 1 ? getLocalizedBlogPost(lang, slugs[idx + 1]) : null;
  const toc = buildToc(post.content);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.subtitle,
        inLanguage: lang,
        author: { "@type": "Organization", name: "Soluqube Editorial", url: SITE },
        publisher: { "@type": "Organization", name: "Soluqube", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
        datePublished: toIsoDate(post.publishedAt),
        dateModified: toIsoDate(post.updatedAt ?? post.publishedAt),
        image: `${SITE}/og-image.jpg`,
        mainEntityOfPage: url,
        keywords: post.tags.join(", "),
      },
      ...(post.faqs && post.faqs.length
        ? [{ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Soluqube", item: localeUrl(lang, "/") },
          { "@type": "ListItem", position: 2, name: s.nav.blog, item: localeUrl(lang, "/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocaleHeader lang={lang} path={path} available={langsFor("blog", post.slug)} />
      <header className="border-b border-slate-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <Link href={`/${lang}`} className="hover:text-slate-900">Soluqube</Link>
            <span>/</span>
            <Link href={`/${lang}/blog`} className="hover:text-slate-900">{s.nav.blog}</Link>
            <span>/</span>
            <span className="text-emerald-700">{post.tags[0]}</span>
          </nav>
          <div className="text-xs font-mono text-slate-500">
            {s.blog.published} {formatDate(lang, post.publishedAt)} · {post.readTime}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight max-w-5xl">{post.title}</h1>
          <p className="text-slate-600 text-sm sm:text-lg max-w-4xl leading-relaxed">{post.subtitle}</p>
          <div className="pt-3 border-t border-slate-100 max-w-xl">
            <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
            <div className="text-[11px] text-slate-500">{s.blog.authorRole}</div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-8">
            <aside className="p-6 rounded-2xl bg-white border-2 border-emerald-500/30 space-y-3" data-ai-answer="direct" aria-label={s.blog.directAnswer}>
              <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">{s.blog.directAnswer}</div>
              <p className="text-sm font-mono text-slate-800 leading-relaxed font-medium">{post.definitionAnchor}</p>
              {post.engineVerified && (
                <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">{s.blog.computedBy}</div>
              )}
            </aside>
            <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed [&_:not(pre)>code]:bg-slate-100 [&_:not(pre)>code]:text-slate-800 [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded">
              <LocalizedMarkdown lang={lang}>{post.content}</LocalizedMarkdown>
            </div>
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-500 mr-2">{s.blog.tags}</span>
              {post.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-700">{tag}</span>
              ))}
            </div>
            {post.faqs && post.faqs.length > 0 && (
              <section className="pt-6 border-t border-slate-200 space-y-4">
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-wider">{s.blog.faq}</h2>
                <div className="space-y-3">
                  {post.faqs.map((f, i) => (
                    <details key={i} className="p-4 rounded-xl bg-white border border-slate-200" open>
                      <summary className="font-bold text-slate-900 text-sm cursor-pointer">{f.question}</summary>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {prev ? (
                <Link href={`/${lang}/blog/${prev.slug}`} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300">
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">← {s.blog.prev}</div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2">{prev.title}</div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/${lang}/blog/${next.slug}`} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-right sm:col-start-2">
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">{s.blog.next} →</div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2">{next.title}</div>
                </Link>
              ) : <div />}
            </div>
          </article>
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {toc.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-3">{s.blog.toc}</div>
                  <nav className="space-y-1.5 font-mono text-xs">
                    {toc.map((item) => (
                      <a key={item.id} href={`#${item.id}`} className="block text-slate-600 hover:text-slate-950 py-1 line-clamp-1">{item.label}</a>
                    ))}
                  </nav>
                </div>
              )}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                <h3 className="text-base font-bold">{s.blog.ctaTitle}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.blog.ctaBody}</p>
                <Link href="/design-partners" className="inline-block px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-bold">{s.blog.ctaBtn}</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <LocaleFooter lang={lang} />
    </div>
  );
}
