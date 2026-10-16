import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import Navbar from "@/components/navbar";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  BookOpen, 
  ChevronRight,
  Cpu,
  Sparkles,
  Lock,
  Layers,
  HelpCircle,
  ExternalLink
} from "lucide-react";

interface Props {
  params: { slug: string };
}

const SITE = "https://soluqube.com";
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "October 8, 2026" -> "2026-10-08" (ISO 8601 date, no timezone shift). */
function toIsoDate(human: string): string {
  const m = human.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return human;
  const month = MONTHS.indexOf(m[1].toLowerCase()) + 1;
  if (month === 0) return human;
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

/** Rendered <title>: append the brand only when the result stays within 60 characters. */
function seoTitle(post: BlogPost): string {
  const branded = `${post.title} | Soluqube`;
  return branded.length <= 60 ? branded : post.title;
}

/**
 * Table of contents built from the H2s in the markdown, with ids from the same
 * slugger rehype-slug uses, so every TOC anchor resolves. Curated labels from
 * post.toc are kept if they match one-to-one with the headings.
 */
function buildToc(post: BlogPost): { id: string; label: string }[] {
  const slugger = new GithubSlugger();
  const headings: { depth: number; text: string; id: string }[] = [];
  let inFence = false;
  for (const line of post.content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[2].replace(/\*\*|__|`/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    headings.push({ depth: m[1].length, text, id: slugger.slug(text) });
  }
  const h2s = headings.filter((h) => h.depth === 2);
  const curated = post.toc && post.toc.length === h2s.length ? post.toc : null;
  return h2s.map((h, i) => ({ id: h.id, label: curated ? curated[i].label : h.text }));
}

const linkClass = "text-emerald-700 font-medium underline underline-offset-2 decoration-emerald-300 hover:text-emerald-900";

const markdownComponents: Components = {
  h2: ({ node, ...props }) => (
    <h2 {...props} className="text-xl sm:text-2xl font-bold text-slate-900 pt-6 border-b border-slate-200 pb-2 scroll-mt-24" />
  ),
  h3: ({ node, ...props }) => (
    <h3 {...props} className="text-lg font-bold text-slate-900 pt-2 scroll-mt-24" />
  ),
  p: ({ node, ...props }) => <p {...props} className="text-slate-700 leading-relaxed text-sm sm:text-base" />,
  ul: ({ node, ...props }) => <ul {...props} className="space-y-2 pl-5 list-disc marker:text-emerald-600" />,
  ol: ({ node, ...props }) => <ol {...props} className="space-y-2 pl-5 list-decimal marker:text-emerald-600" />,
  li: ({ node, ...props }) => <li {...props} className="text-slate-700 text-sm sm:text-base leading-relaxed" />,
  strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-slate-900" />,
  hr: () => <hr className="border-slate-200" />,
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="border-l-4 border-emerald-300 pl-4 text-slate-600 italic" />
  ),
  pre: ({ node, children }) => (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto my-4 shadow-sm">
      <pre>{children}</pre>
    </div>
  ),
  code: ({ node, className, children, ...props }) => (
    <code {...props} className={className}>
      {children}
    </code>
  ),
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table {...props} className="w-full text-left text-xs sm:text-sm border-collapse" />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th {...props} className="p-3 font-semibold text-slate-900 bg-slate-50 border-b border-slate-200 align-top" />
  ),
  td: ({ node, ...props }) => <td {...props} className="p-3 text-slate-700 border-b border-slate-100 align-top" />,
  a: ({ node, href = "", children, ...props }) => {
    const isFile = /\.(csv|json|pdf|xlsx|zip)(\?|#|$)/i.test(href); // downloads must be plain <a>, not client routing
    const internal = !isFile && (href.startsWith("/") || href.startsWith("#") || /^https:\/\/soluqube\.com(\/|$)/.test(href));
    if (internal) {
      const local = href.replace(/^https:\/\/soluqube\.com/, "") || "/";
      return (
        <Link href={local} className={linkClass}>
          {children}
        </Link>
      );
    }
    return (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {children}
      </a>
    );
  },
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article Not Found | Soluqube",
      description: "The requested technical accounting article does not exist.",
    };
  }

  const title = seoTitle(post);

  return {
    title: { absolute: title },
    description: post.subtitle,
    keywords: post.tags,
    alternates: {
      canonical: `https://soluqube.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.subtitle,
      url: `https://soluqube.com/blog/${post.slug}`,
      siteName: "Soluqube",
      type: "article",
      publishedTime: toIsoDate(post.publishedAt),
      modifiedTime: toIsoDate(post.updatedAt ?? post.publishedAt),
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.subtitle,
      images: ["/og-image.jpg"],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
  const toc = buildToc(post);

  // JSON-LD Schema.org Multi-Entity Graph (TechArticle, FAQPage, BreadcrumbList for GEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `https://soluqube.com/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.subtitle,
        "author": {
          "@type": "Organization",
          "name": "Soluqube Editorial",
          "url": SITE
        },
        "publisher": {
          "@type": "Organization",
          "name": "Soluqube",
          "url": "https://soluqube.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://soluqube.com/icon.png"
          }
        },
        "datePublished": toIsoDate(post.publishedAt),
        "dateModified": toIsoDate(post.updatedAt ?? post.publishedAt),
        "image": `${SITE}/og-image.jpg`,
        "mainEntityOfPage": `https://soluqube.com/blog/${post.slug}`,
        "keywords": post.tags.join(", ")
      },
      ...(post.faqs && post.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `https://soluqube.com/blog/${post.slug}#faq`,
        "mainEntity": post.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : []),
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Soluqube",
            "item": "https://soluqube.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://soluqube.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://soluqube.com/blog/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMBS & ARTICLE HEADER */}
      <header className="border-b border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition">Soluqube</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/blog" className="hover:text-slate-900 transition">Blog &amp; Knowledge Hub</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-emerald-700 truncate max-w-xs">{post.tags[0]}</span>
          </nav>

          {/* Tags & Read Time */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
              {post.tags[0]}
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
            <span className="text-xs font-mono text-slate-400">&bull;</span>
            <span className="text-xs font-mono text-slate-500">{post.publishedAt}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight max-w-5xl">
            {post.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-lg max-w-4xl leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-4 flex items-center gap-3 border-t border-slate-100 max-w-xl">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold font-mono flex items-center justify-center text-xs shadow-xs">
              {post.author.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
              <div className="text-[11px] text-slate-500">{post.author.role}</div>
            </div>
          </div>
        </div>
      </header>

      {/* ARTICLE BODY & SIDEBAR */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ARTICLE CONTENT (8 COLS) */}
          <article className="lg:col-span-8 space-y-8">
            {/* DEFINITION ANCHOR BLOCK (GEO / Answer Engine Scraping Target) */}
            <aside 
              className="p-6 rounded-2xl bg-white border-2 border-emerald-500/30 shadow-xs space-y-3"
              data-ai-entity="Soluqube"
              data-ai-answer="direct"
              aria-label="Executive AI Direct Answer"
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>DIRECT ANSWER FOR AI SEARCH &amp; EXECUTIVE AUDIT</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  Target: {post.targetQuery}
                </span>
              </div>
              <p className="text-sm font-mono text-slate-800 leading-relaxed font-medium">
                {post.definitionAnchor}
              </p>
              {post.engineVerified && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Computed by: Soluqube Engine</span>
                  <span className="text-emerald-700 font-semibold">Ties to the cent</span>
                </div>
              )}
            </aside>

            {/* MAIN ARTICLE BODY (Formatted Markdown/HTML rendering) */}
            <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed [&_:not(pre)>code]:bg-slate-100 [&_:not(pre)>code]:text-slate-800 [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded [&_:not(pre)>code]:text-[0.9em]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={markdownComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* TAGS FOOTER */}
            <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Accounting Tags:</span>
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* FAQ DIRECT ANSWER INDEX (High-Intent Prompt Interception for GEO) */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-900 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Frequently Asked Audit &amp; Technical Questions</span>
                </div>
                <div className="space-y-3">
                  {post.faqs.map((faq, idx) => (
                    <details 
                      key={idx} 
                      className="group p-4 rounded-xl bg-white border border-slate-200 shadow-2xs open:border-emerald-300 transition-all"
                      open
                    >
                      <summary className="font-bold text-slate-900 text-sm cursor-pointer list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-mono border-t border-slate-100 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* PREV / NEXT NAVIGATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition group"
                >
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-1 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Previous Technical Guide</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                    {prevPost.title}
                  </div>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition text-right group sm:col-start-2"
                >
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-1 flex items-center justify-end gap-1">
                    <span>Next Technical Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2">
                    {nextPost.title}
                  </div>
                </Link>
              ) : <div />}
            </div>
          </article>

          {/* STICKY TOC & TRIAL SIDEBAR (4 COLS) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* TABLE OF CONTENTS */}
              {toc.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>In This Guide</span>
                  </div>
                  <nav className="space-y-1.5 font-mono text-xs">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-slate-600 hover:text-slate-950 py-1 transition line-clamp-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* STICKY TRIAL CONVERSION WIDGET */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md space-y-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audit-Ready Evidence</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Launch Revenue Sandbox
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingest enterprise contracts and test fixed-point amortization math that ties to the cent.
                </p>
                <a
                  href="https://app.soluqube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <span>Launch Live Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Soluqube</span>
            <span>|</span>
            <span>Deterministic ASC 606 &amp; Ind AS 115 Subledger Engine</span>
          </div>
          <div className="flex items-center gap-5 text-slate-600">
            <span>&copy; {new Date().getFullYear()} Soluqube</span>
            <Link href="/" className="hover:text-slate-950">Home</Link>
            <Link href="/blog" className="text-slate-900 font-bold">Blog</Link>
            <Link href="/asc-606" className="hover:text-slate-950">ASC 606 Hub</Link>
            <Link href="/asc-606-vs-ind-as-115" className="hover:text-slate-950">Dual Standard</Link>
            <Link href="/glossary" className="hover:text-slate-950">Glossary</Link>
            <Link href="/alternatives" className="hover:text-slate-950">Alternatives</Link>
            <a href="https://www.crunchbase.com/organization/soluqube" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">Crunchbase</a>
            <a href="https://www.linkedin.com/company/soluqube" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950">LinkedIn</a>
            <Link href="/contact" className="hover:text-slate-950">Contact</Link>
            <Link href="/privacy" className="hover:text-slate-950">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-950">Terms</Link>
            <Link href="/security" className="hover:text-slate-950">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
