"use client";

import React from "react";
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
  ArrowRight,
  Database,
  FileCheck
} from "lucide-react";

export default function SoluqubeVsKlarityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://soluqube.com/soluqube-vs-klarity#article",
        "headline": "Soluqube vs Klarity: Complete Revenue Subledger vs Checklist-Only Review",
        "description": "Comparison between Soluqube and Klarity for ASC 606 revenue accounting. Learn why Soluqube's full amortization DAG, integer (BigInt) micro-cent math, and ready-to-post journal vouchers solve the workflow gap that Klarity leaves behind.",
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
        "mainEntityOfPage": "https://soluqube.com/soluqube-vs-klarity"
      },
      {
        "@type": "FAQPage",
        "@id": "https://soluqube.com/soluqube-vs-klarity#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the primary difference between Soluqube and Klarity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Klarity is an AI contract review and metadata checklist tool that extracts terms for human verification, leaving the revenue calculation and waterfall generation to downstream ERPs like NetSuite. Soluqube is an end-to-end revenue subledger that extracts obligations, executes the integer (BigInt) amortization DAG, and outputs ready-to-post general ledger journal vouchers."
            }
          },
          {
            "@type": "Question",
            "name": "Can Klarity handle Dual-GAAP accounting under ASC 606 and Ind AS 115?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Klarity is strictly tailored to US GAAP (ASC 606). It does not provide dual-standard reconciliation or statutory Indian GST isolation required under Ind AS 115 and Schedule III of the Indian Companies Act 2013."
            }
          },
          {
            "@type": "Question",
            "name": "How does Soluqube ensure zero mathematical drift?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Soluqube utilizes integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption, eliminating IEEE-754 floating-point rounding drift so multi-period deferred revenue amortizes to exactly $0.00."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-slate-950">
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
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Soluqube Engine</span>
            </Link>
            <div className="h-4 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-xs font-mono">
                SQ
              </div>
              <span className="font-bold text-slate-100 tracking-tight text-sm">
                Soluqube <span className="text-slate-400 font-mono text-xs font-normal">vs Klarity</span>
              </span>
            </div>
          </div>
          <Link
            href="/audit"
            className="px-3.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-semibold transition-all shadow-sm"
          >
            Start $499 Contract Audit
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>ARCHITECTURE &amp; WORKFLOW COMPARISON &bull; 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Complete Revenue Subledger vs. Checklist-Only Review.
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Klarity uses AI to read Order Forms and populate human review checklists—but <strong className="text-white">stops short of calculating your revenue schedules</strong>, leaving you dependent on spreadsheets or complex ERP custom scripts. Soluqube is an <span className="text-purple-400 font-semibold">autonomous contract-to-ledger subledger</span>: it extracts POBs, runs the integer (BigInt) amortization DAG, and outputs ready-to-post journal vouchers.
          </p>
        </div>

        {/* Architectural Workflow Diagram */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
            Workflow Architecture: Where Klarity Ends vs Where Soluqube Delivers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Klarity Flow */}
            <div className="bg-slate-950/60 border border-rose-500/20 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 text-xs font-mono">KLARITY WORKFLOW</span>
                <span className="text-[10px] font-mono text-slate-500">Requires Downstream ERP</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  1. Ingest PDF Contract / Order Form
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  2. Extract Key Terms &amp; Populate Checklist Memo
                </div>
                <div className="p-2.5 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300">
                  ⚠️ 3. <strong>STOPS HERE.</strong> Accountant must manually transcribe terms into NetSuite or build Excel waterfalls.
                </div>
              </div>
            </div>

            {/* Soluqube Flow */}
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 text-xs font-mono">SOLUQUBE END-TO-END FLOW</span>
                <span className="text-[10px] font-mono text-emerald-400">Autonomous Subledger</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  1. Ingest PDF Contract with Spatial OCR BBoxes
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  2. Gate 1-5 Deterministic Relative SSP Allocation
                </div>
                <div className="p-2.5 rounded bg-purple-950/50 border border-purple-500/40 text-purple-200 font-bold">
                  ✅ 3. Executes Full 24/36-Month Amortization DAG &amp; Outputs Ready-to-Post General Ledger Exports
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              Technical Capability Comparison
            </h2>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="p-3.5">Capability</th>
                  <th className="p-3.5 text-purple-400 font-bold bg-purple-950/20">Soluqube</th>
                  <th className="p-3.5 text-slate-300">Klarity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">End-to-End Functionality</td>
                  <td className="p-3.5 text-purple-400 font-bold bg-purple-950/20">Complete Revenue Subledger + Audit Engine</td>
                  <td className="p-3.5 text-slate-400">Checklist &amp; Review Review Tool</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Revenue Waterfall Computation</td>
                  <td className="p-3.5 text-purple-400 font-bold bg-purple-950/20">Automated 1-to-N Month Amortization Schedules</td>
                  <td className="p-3.5 text-rose-400 font-medium">None (Delegated to external ERP / Excel)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Dual-GAAP (ASC 606 + Ind AS 115)</td>
                  <td className="p-3.5 text-purple-400 font-bold bg-purple-950/20">Native Side-by-Side Comparative Matrix</td>
                  <td className="p-3.5 text-rose-400 font-medium">None (US GAAP ASC 606 only)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Statutory 18% GST Isolation</td>
                  <td className="p-3.5 text-purple-400 font-bold bg-purple-950/20">Automated CGST/SGST/IGST Subledger Isolation</td>
                  <td className="p-3.5 text-rose-400 font-medium">No indirect tax isolation</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Mathematical Precision</td>
                  <td className="p-3.5 text-purple-400 font-mono font-bold bg-purple-950/20">Integer (BigInt) micro-cent fixed-point ($0.00 drift)</td>
                  <td className="p-3.5 text-slate-400 font-mono">Not published</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">General Ledger Journal Vouchers</td>
                  <td className="p-3.5 text-purple-400 font-bold bg-purple-950/20">Ready-to-Post CSV / Excel / JSON-LD</td>
                  <td className="p-3.5 text-slate-400">Accounting memos and checklist summaries</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-200">Pricing &amp; Contract Terms</td>
                  <td className="p-3.5 text-purple-400 font-mono font-bold bg-purple-950/20">$499 self-serve / $999/mo SaaS</td>
                  <td className="p-3.5 text-slate-400 font-mono">Enterprise quotes ($50k–$100k+/year)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Stop Generating Checklists. Start Generating Revenue Ledgers.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Soluqube doesn't just read your contract—it allocates Standalone Selling Prices, builds your multi-year revenue waterfall, and seals the audit trail with Merkle proofs.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/audit"
              className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-purple-500/20"
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
