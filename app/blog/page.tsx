import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { BLOG_POSTS } from "@/data/blogPosts";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  FileText,
  Search,
  CheckCircle2,
  Cpu,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "Soluqube Knowledge Hub & Technical Accounting Articles | ASC 606 & Ind AS 115",
  description: "In-depth technical guides on deterministic ASC 606 revenue recognition, Ind AS 115 dual-standard GST isolation, PCAOB AS 3101 audit defense, and fixed-point math.",
  keywords: [
    "ASC 606 blog",
    "Ind AS 115 technical guide",
    "revenue recognition audit workpapers",
    "contract modification DAG",
    "PCAOB AS 3101 compliance",
    "fixed point accounting math"
  ],
  alternates: {
    canonical: "https://soluqube.com/blog"
  },
  openGraph: {
    title: "Soluqube Technical Accounting & Compliance Knowledge Hub",
    description: "Engineering guides for Chief Accounting Officers, Controllers, and Big 4 auditors on deterministic contract-to-ledger revenue recognition.",
    url: "https://soluqube.com/blog",
    siteName: "Soluqube",
    type: "website"
  }
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5 text-slate-700" />
            <span>Deterministic Accounting Knowledge Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto">
            Technical Guides for <span className="text-slate-900 underline decoration-emerald-500 decoration-4 underline-offset-8">ASC 606</span> &amp; <span className="text-slate-900 underline decoration-emerald-500 decoration-4 underline-offset-8">Ind AS 115</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
            Rigorous engineering breakdowns on eliminating floating-point drift, automating contract modification DAGs, and generating PCAOB AS 3101 audit-ready workpapers.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* FEATURED ARTICLE HERO CARD */}
        {featuredPost && (
          <div className="relative group rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
                  Featured Publication
                </span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {featuredPost.readTime}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {featuredPost.publishedAt}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`} className="block group-hover:text-slate-700 transition">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                {featuredPost.subtitle}
              </p>

              {/* DEFINITION ANCHOR BLOCK */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
                <span className="text-emerald-700 font-bold uppercase tracking-wider block mb-1">
                  &bull; AI Definition Anchor / Key Compliance Principle:
                </span>
                {featuredPost.definitionAnchor}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full border border-slate-200 object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {featuredPost.author.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-sm"
                >
                  <span>Read Full Technical Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* RECENT ARTICLES GRID */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>All Compliance &amp; Architecture Guides</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {BLOG_POSTS.length} Technical Publications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all duration-200 p-6 group hover:-translate-y-1 shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="text-emerald-700 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">{post.tags[0]}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-500">
                    {post.publishedAt}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-slate-900 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* BOTTOM ENTERPRISE TRIAL CTA */}
        <section className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-4 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-mono font-bold border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PCAOB AS 3101 &bull; SOC 1 Type II Ready</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl mx-auto">
            Ready to eliminate spreadsheet rounding drift in your revenue subledger?
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Ingest complex multi-year enterprise contracts, extract spatial PDF clauses, and generate Big 4 audit defense workpapers in under 60 seconds.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition shadow-sm"
            >
              Launch Live Sandbox
            </a>
            <Link
              href="/asc-606"
              className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700 transition"
            >
              Explore ASC 606 Specs
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Soluqube</span>
            <span>|</span>
            <span>Deterministic Contract-to-Ledger Revenue Engine</span>
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
