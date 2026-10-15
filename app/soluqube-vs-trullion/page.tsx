"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle,
  AlertTriangle, 
  ExternalLink,
  Cpu,
  Layers,
  Globe2,
  DollarSign,
  Scale,
  Zap,
  Lock,
  ArrowRight
} from "lucide-react";

export default function SoluqubeVsTrullionPage() {
  const [contractCount, setContractCount] = useState<number>(10);

  // Price comparison math
  const soluqubePayAsYouGo = contractCount * 499;
  const soluqubeAnnualRetainer = 999 * 12; // $11,988/yr

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://soluqube.com/soluqube-vs-trullion#article",
        "headline": "Soluqube vs Trullion: Self-Serve Dual-GAAP Revenue Recognition Alternative",
        "description": "Comparison between Soluqube and Trullion for ASC 606 & Ind AS 115 revenue recognition. Learn why Soluqube's self-serve $499 audit model, integer (BigInt) micro-cent math, and statutory Indian GST isolation compare with enterprise contracts (pricing not published).",
        "author": {
          "@type": "Organization",
          "name": "Soluqube Systems",
          "url": "https://soluqube.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Soluqube Systems",
          "url": "https://soluqube.com"
        },
        "mainEntityOfPage": "https://soluqube.com/soluqube-vs-trullion"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Soluqube Engine</span>
            </Link>
            <div className="h-4 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs font-mono">
                SQ
              </div>
              <span className="font-bold text-slate-100 tracking-tight text-sm">
                Soluqube <span className="text-slate-400 font-mono text-xs font-normal">vs Trullion</span>
              </span>
            </div>
          </div>
          <Link
            href="/audit"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all shadow-sm"
          >
            Start $499 Contract Audit
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>EXECUTIVE COMPETITIVE ANALYSIS &bull; 2026 EDITION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Self-Serve Dual-GAAP Alternative to Trullion.
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Trullion sells <span className="text-rose-400 font-semibold">annual enterprise contracts</span> (pricing not published) through a sales-qualification process, and does not advertise <strong className="text-white">Indian GAAP (Ind AS 115)</strong> support or statutory GST isolation. Soluqube gives finance leaders instant, self-serve contract verification with integer (BigInt) micro-cent precision starting at <span className="text-emerald-400 font-semibold">$499 per audit</span>.
          </p>
        </div>

        {/* Quick Decision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg font-mono">
              Recommended for Agility & Cross-Border
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-base font-mono">
                SQ
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Soluqube Systems</h3>
                <p className="text-xs text-emerald-400 font-mono">Deterministic Contract-to-Ledger Engine</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant Self-Serve:</strong> $499 per contract audit or $999/mo flat. No mandatory 6-figure contracts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dual-GAAP Standard:</strong> Native ASC 606 (USD) + Ind AS 115 (INR) with automated 18% GST tax subledger isolation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Integer Arithmetic:</strong> BigInt at 10^6 scale, rounded to cents; the final period absorbs the remainder, so deferred revenue ends at $0.00.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Maker-Checker Review:</strong> Separate submit and approve steps in the review screen. Identity-bound approval is on the roadmap.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors gap-2"
              >
                <span>Try the Schedule Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-base font-mono">
                TR
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-200">Trullion</h3>
                <p className="text-xs text-slate-400 font-mono">Legacy Enterprise AI Accounting</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Enterprise Minimums:</strong> Annual commitment (pricing not published); multi-week sales process.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>No Ind AS 115 Advertised:</strong> ASC 606 & IFRS 15 per public materials; no Indian GST (CGST/SGST/IGST) isolation advertised.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Rounding Policy Not Published:</strong> No public documentation of how residual cents are allocated on odd multi-period splits.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>No On-Demand Self-Serve:</strong> Cannot audit a single contract without buying an enterprise platform seat.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              Direct Feature &amp; Capability Matrix
            </h2>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="p-3.5">Capability / Standard</th>
                  <th className="p-3.5 text-emerald-400 font-bold bg-emerald-950/20">Soluqube</th>
                  <th className="p-3.5 text-slate-300">Trullion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Pricing Model</td>
                  <td className="p-3.5 text-emerald-400 font-mono font-bold bg-emerald-950/20">$499 per audit / $999/mo SaaS</td>
                  <td className="p-3.5 text-slate-400 font-mono">Enterprise contract (pricing not published)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Time-to-Value</td>
                  <td className="p-3.5 text-emerald-400 font-mono font-bold bg-emerald-950/20">Same day (you confirm obligations &amp; prices)</td>
                  <td className="p-3.5 text-slate-400 font-mono">30–60 days implementation</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Indian GAAP (Ind AS 115) Support</td>
                  <td className="p-3.5 text-emerald-400 font-bold bg-emerald-950/20">Full Native Support &amp; Comparator</td>
                  <td className="p-3.5 text-rose-400 font-medium">None (US GAAP &amp; IFRS 15 only)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">18% Indian GST Isolation (CGST/SGST/IGST)</td>
                  <td className="p-3.5 text-emerald-400 font-bold bg-emerald-950/20">Automated Statutory Subledger Isolation</td>
                  <td className="p-3.5 text-rose-400 font-medium">None (Requires manual spreadsheets)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Mathematical Precision Engine</td>
                  <td className="p-3.5 text-emerald-400 font-mono font-bold bg-emerald-950/20">Integer (BigInt), rounded to cents (ties to the cent)</td>
                  <td className="p-3.5 text-slate-400 font-mono">Not published</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Terminal-Period Remainder Absorption</td>
                  <td className="p-3.5 text-emerald-400 font-bold bg-emerald-950/20">Final deferred balance ends at $0.00 / ₹0.00</td>
                  <td className="p-3.5 text-slate-400">Not published</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Audit Grounding &amp; Workpapers</td>
                  <td className="p-3.5 text-emerald-400 font-bold bg-emerald-950/20">Audit-ready evidence pack: clause evidence (page + excerpt) + SHA-256 hashes</td>
                  <td className="p-3.5 text-slate-300">Standard audit trail exports</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">SOX 404 Internal Controls</td>
                  <td className="p-3.5 text-emerald-400 font-bold bg-emerald-950/20">Maker-checker review (identity-bound approval on the roadmap)</td>
                  <td className="p-3.5 text-slate-300">Role-based access permissions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Calculator Comparison */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Cost Comparison Calculator</h3>
            <p className="text-xs text-slate-400">
              See what you spend with Soluqube versus Trullion based on the number of enterprise contracts you audit per year.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300">Enterprise Contracts Audited Annually:</span>
              <span className="text-emerald-400 font-bold text-sm">{contractCount} Contracts</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={contractCount}
              onChange={(e) => setContractCount(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-mono text-center">
            <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] uppercase text-emerald-400 block font-bold">Soluqube On-Demand</span>
              <span className="text-2xl font-black text-white">${soluqubePayAsYouGo.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 block">$499 per contract flat</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 block font-bold">Soluqube Growth SaaS</span>
              <span className="text-2xl font-black text-emerald-400">${soluqubeAnnualRetainer.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 block">$999/mo unlimited audits</span>
            </div>

            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/20 space-y-1">
              <span className="text-[10px] uppercase text-rose-400 block font-bold">Trullion Enterprise</span>
              <span className="text-2xl font-black text-rose-400">Not published</span>
              <span className="text-[10px] text-slate-400 block">Enterprise contract pricing</span>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Verify Your Contracts Without the Enterprise Lock-In?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Confirm the obligations and stated prices for a contract and get the SSP allocation, a full-term ASC 606 &amp; Ind AS 115 schedule that ties to the cent, and a hashed evidence workpaper.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/audit"
              className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
            >
              Start Instant Contract Audit ($499)
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs transition-colors"
            >
              Explore Live Engine Demo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
