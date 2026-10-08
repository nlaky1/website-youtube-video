"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Layers, 
  Menu, 
  X, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  BookOpen,
  ChevronDown
} from "lucide-react";

interface NavbarProps {
  scrollToSection?: (id: string) => void;
  [key: string]: any;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [mobileBlogExpanded, setMobileBlogExpanded] = useState(true);

  const BLOG_LINKS = [
    {
      title: "ASC 606 vs Ind AS 115 Dual Standard",
      href: "/blog/asc-606-vs-ind-as-115-dual-standard-gst-compliance",
      desc: "Dual-ledger accounting isolating 18% Indian GST with US GAAP parity."
    },
    {
      title: "Eliminating IEEE-754 Floating-Point Drift",
      href: "/blog/eliminating-ieee-754-floating-point-rounding-drift-asc-606",
      desc: "128-bit scaled integer arithmetic and terminal remainder absorption."
    },
    {
      title: "Contract Modification Precedence DAG",
      href: "/blog/contract-modification-precedence-dag-asc-606-10-25-13",
      desc: "Deterministic routing between Catch-Up and Prospective reallocation."
    },
    {
      title: "PCAOB AS 3101 Big 4 Audit Workpapers",
      href: "/blog/pcaob-as-3101-audit-workpapers-merkle-proofs",
      desc: "SHA-256 Merkle proofs with coordinate PDF bounding-box grounding."
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & Patent Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm border border-slate-800 group-hover:bg-slate-800 transition-colors">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900">SOLUQUBE</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Patent App: 202621096305
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Institutional Nav Links + Blog Dropdown */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-slate-600">
          <Link href="/#architecture" className="hover:text-slate-950 transition-colors">
            Engine Architecture
          </Link>
          <Link href="/asc-606" className="hover:text-slate-950 transition-colors">
            ASC 606 Hub
          </Link>
          <Link href="/asc-606-vs-ind-as-115" className="hover:text-slate-950 transition-colors">
            Dual Standard (GST)
          </Link>

          {/* Desktop Blog Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setBlogDropdownOpen(true)}
            onMouseLeave={() => setBlogDropdownOpen(false)}
          >
            <Link 
              href="/blog" 
              className="flex items-center gap-1 hover:text-slate-950 transition-colors py-2"
            >
              <span>Blog &amp; Knowledge Hub</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${blogDropdownOpen ? "rotate-180 text-slate-900" : "text-slate-400"}`} />
            </Link>

            {blogDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-96 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between px-2 py-1 text-[11px] font-mono font-semibold uppercase text-slate-500">
                  <span>Technical Publications</span>
                  <Link href="/blog" className="text-emerald-700 hover:underline text-[11px] lowercase">
                    view all &rarr;
                  </Link>
                </div>
                <div className="space-y-1 mt-1">
                  {BLOG_LINKS.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block p-2 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <Link
                    href="/blog"
                    className="flex items-center justify-between text-xs font-semibold text-slate-900 hover:text-emerald-700 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition"
                  >
                    <span>Browse complete knowledge hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/#pilot" className="hover:text-slate-950 transition-colors">
            Pricing / Pilot
          </Link>
        </nav>

        {/* Right: Dual Action CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="https://client.soluqube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-600 hover:text-slate-950 px-2.5 py-1.5 transition-colors"
          >
            Client Portal
          </a>

          <a
            href="https://app.soluqube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all"
          >
            <span>Live Sandbox</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="/#audit-intake"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-xs hover:shadow transition-all"
          >
            <span>Book Historical Audit</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-6 space-y-4 text-sm font-medium">
          <div className="sm:hidden pb-2 border-b border-slate-100">
            <span className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Patent App: 202621096305
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Blog Feed</span>
            </Link>

            <Link
              href="/asc-606"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold"
            >
              <Layers className="w-4 h-4 text-slate-700" />
              <span>ASC 606 Hub</span>
            </Link>
          </div>

          {/* Mobile Blog Accordion */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 overflow-hidden">
            <button
              onClick={() => setMobileBlogExpanded(!mobileBlogExpanded)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-100 transition"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">Articles &amp; Compliance Guides</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  4 Guides
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${mobileBlogExpanded ? "rotate-180" : ""}`} />
            </button>

            {mobileBlogExpanded && (
              <div className="p-2 space-y-1 divide-y divide-slate-200/60 bg-white">
                {BLOG_LINKS.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="text-xs font-semibold text-slate-900 hover:text-emerald-700">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.desc}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/asc-606-vs-ind-as-115"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1 text-xs"
          >
            Dual Standard (GST) Hub
          </Link>
          <Link
            href="/#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1 text-xs"
          >
            Engine Architecture
          </Link>
          <Link
            href="/#pilot"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 hover:text-slate-950 py-1 text-xs"
          >
            Pricing / Pilot
          </Link>
          
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <a
              href="https://client.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <span>Client Advisory Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href="https://app.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <span>Launch Live Sandbox</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>

            <a
              href="/#audit-intake"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors"
            >
              <span>Book Historical Drift Audit</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
