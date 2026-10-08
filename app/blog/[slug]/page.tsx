import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { BLOG_POSTS } from "@/data/blogPosts";
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
  ExternalLink
} from "lucide-react";

interface Props {
  params: { slug: string };
}

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

  return {
    title: `${post.title} | Soluqube Technical Architecture`,
    description: post.subtitle,
    keywords: post.tags,
    alternates: {
      canonical: `https://soluqube.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url: `https://soluqube.com/blog/${post.slug}`,
      siteName: "Soluqube",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
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

  // JSON-LD Schema.org TechArticle Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.subtitle,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Soluqube Technologies Inc.",
      "url": "https://soluqube.com"
    },
    "datePublished": post.publishedAt,
    "mainEntityOfPage": `https://soluqube.com/blog/${post.slug}`,
    "keywords": post.tags.join(", ")
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
            <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Definition Anchor &bull; Core Standard Requirement</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-800 leading-relaxed">
                {post.definitionAnchor}
              </p>
            </div>

            {/* MAIN ARTICLE BODY (Formatted Markdown/HTML rendering) */}
            <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
              {post.content.split("\n\n").map((chunk, idx) => {
                const trimmed = chunk.trim();
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      id={trimmed.replace("## ", "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      className="text-xl sm:text-2xl font-bold text-slate-900 pt-6 border-b border-slate-200 pb-2"
                    >
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }

                if (trimmed.startsWith("```")) {
                  const codeContent = trimmed.replace(/^```[a-z]*\n/, "").replace(/\n```$/, "");
                  return (
                    <div key={idx} className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto my-4 shadow-sm">
                      <pre><code>{codeContent}</code></pre>
                    </div>
                  );
                }

                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n").map(li => li.replace(/^[\*\-]\s+/, ""));
                  return (
                    <ul key={idx} className="space-y-2 pl-4 list-disc marker:text-emerald-600">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-slate-700 text-sm">{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={idx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {trimmed}
                  </p>
                );
              })}
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
              {post.toc && post.toc.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>In This Guide</span>
                  </div>
                  <nav className="space-y-1.5 font-mono text-xs">
                    {post.toc.map((item) => (
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
                  <span>PCAOB AS 3101 Verified</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Launch Revenue Sandbox
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingest enterprise contracts and test fixed-point amortization math with zero drift.
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
          <div className="flex items-center gap-6 text-slate-600">
            <span>&copy; {new Date().getFullYear()} Soluqube Technologies Inc.</span>
            <Link href="/" className="hover:text-slate-950">Home</Link>
            <Link href="/blog" className="text-slate-900 font-bold">Blog</Link>
            <Link href="/asc-606" className="hover:text-slate-950">ASC 606 Hub</Link>
            <Link href="/asc-606-vs-ind-as-115" className="hover:text-slate-950">Dual Standard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
