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

export default function SoluqubeVsRightRevPage() {
  const [contractCount, setContractCount] = useState<number>(12);

  // Price comparison
  const soluqubePayAsYouGo = contractCount * 499;
  const rightrevEstimatedMin = 30000; // $30k+ annual contract + implementation

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://soluqube.com/soluqube-vs-rightrev#article",
        "headline": "Soluqube vs RightRev: Standalone Contract Subledger vs Salesforce CPQ Engine",
        "description": "Comprehensive architectural comparison between Soluqube and RightRev for ASC 606 & IFRS 15 revenue recognition. Learn how Soluqube eliminates Salesforce platform lock-in with raw PDF contract grounding and integer (BigInt) micro-cent math.",
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
        "mainEntityOfPage": "https://soluqube.com/soluqube-vs-rightrev"
      },
      {
        "@type": "FAQPage",
        "@id": "https://soluqube.com/soluqube-vs-rightrev#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need Salesforce CPQ or Salesforce Billing to use Soluqube?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. While RightRev is tightly coupled to the Salesforce ecosystem, Soluqube is a standalone revenue subledger that operates directly on signed customer contract PDFs (MSAs, SOWs, Order Forms). It integrates via API with HubSpot, NetSuite, QuickBooks, Stripe, or Salesforce without vendor lock-in."
            }
          },
          {
            "@type": "Question",
            "name": "How does Soluqube prevent revenue rounding errors compared to RightRev?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RightRev runs on the Salesforce platform; its arithmetic internals are not published. Soluqube uses integer (BigInt) arithmetic at 10^6 scale, rounded to cents, with terminal-period remainder absorption, so schedules tie to the contract value across all accounting periods."
            }
          },
          {
            "@type": "Question",
            "name": "Does RightRev support Indian GAAP (Ind AS 115) and statutory GST isolation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. RightRev is built strictly for US GAAP (ASC 606) and IFRS 15. Soluqube natively supports Dual-GAAP (ASC 606 + Ind AS 115) with automated 18% statutory GST balance sheet isolation and MCA Schedule III workpaper generation."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#07090E]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Soluqube
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/20">
              Competitive Breakdown
            </span>
            <Link
              href="/audit"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black transition-all shadow-sm"
            >
              Audit Contract ($499)
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/15 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-900/60 text-slate-300 mb-6">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            Architectural Teardown: RightRev vs. Soluqube
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Soluqube vs. RightRev: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Decoupling ASC 606 from Salesforce CPQ
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            RightRev binds your revenue accounting directly inside Salesforce CPQ. Soluqube gives finance teams a standalone, contract-grounded subledger with integer (BigInt) micro-cent precision, zero Salesforce dependency, and native Dual-GAAP (ASC 606 + Ind AS 115) compliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">CRM Flexibility</div>
              <div className="text-base font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Salesforce Lock-In
              </div>
              <p className="text-xs text-slate-500 mt-1">Works on raw PDFs from any CRM, CPQ, or deal desk.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Math Engine</div>
              <div className="text-base font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Integer Fixed Point
              </div>
              <p className="text-xs text-slate-500 mt-1">Absorbs micro-cent remainders with $0.00 periodic drift.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Regulatory Scope</div>
              <div className="text-base font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                Dual-GAAP & 18% GST
              </div>
              <p className="text-xs text-slate-500 mt-1">Simultaneous US GAAP and Indian MCA Schedule III ledgers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Architectural Capability Matrix
          </h2>
          <p className="text-sm text-slate-400">
            Comparing Salesforce ecosystem dependency against standalone deterministic contract subledgers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 font-semibold">Capability</th>
                <th className="py-4 px-6 font-semibold text-slate-300">RightRev</th>
                <th className="py-4 px-6 font-semibold text-cyan-400">Soluqube</th>
                <th className="py-4 px-6 font-semibold text-slate-300">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-4 px-6 font-medium text-white">Source of Truth</td>
                <td className="py-4 px-6">Salesforce CPQ Quote / Order lines</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">Executed Contract PDF (MSA/SOW)</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Audits signed legal paper vs CRM</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Salesforce Dependency</td>
                <td className="py-4 px-6 text-rose-400">100% Native (Hard dependency)</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">0% Lock-in (Standalone API)</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Operates on HubSpot, NetSuite, Stripe</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Calculation Precision</td>
                <td className="py-4 px-6">Apex / SOQL standard double float</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">Integer (BigInt) micro-cent fixed-point DAG</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Zero cumulative rounding variance</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Dual-GAAP (ASC 606 + Ind AS 115)</td>
                <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5"><XCircle className="w-4 h-4 text-rose-400" /> Not Supported</td>
                <td className="py-4 px-6 text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Native Dual-GAAP</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Mandatory for US-India cross-border</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Indian 18% GST Isolation</td>
                <td className="py-4 px-6 text-rose-400"><XCircle className="w-4 h-4 text-rose-400" /></td>
                <td className="py-4 px-6 text-emerald-400"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Schedule III ready</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Prevents illegal revenue inflation</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Contract Clause Grounding</td>
                <td className="py-4 px-6">Manual reference text field</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">Sub-millimeter [page, x, y] BBoxes</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Instant visual proof for external auditors</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Implementation Duration</td>
                <td className="py-4 px-6">8 to 16 Weeks (System integrator required)</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">Instant self-serve or 24 hours</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Zero professional service drag</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Pricing Model</td>
                <td className="py-4 px-6">$30,000–$60,000/yr + implementation fees</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">$499/audit or $999/mo continuous</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Predictable self-serve ROI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Cost Calculator */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Interactive Cost & Commitment Calculator
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Compare annual spend for RightRev enterprise contracts versus Soluqube self-serve contract audits.
          </p>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Number of Complex Customer Contracts / Year: <span className="text-cyan-400 font-bold">{contractCount}</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={contractCount}
              onChange={(e) => setContractCount(Number(e.target.value))}
              className="w-full accent-cyan-400 mb-8 cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">RightRev (Annual)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-300">
                  ${rightrevEstimatedMin.toLocaleString()}
                </div>
                <div className="text-xs text-rose-400 mt-1">Requires Salesforce CPQ + Setup</div>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-1">Soluqube (Pay-As-You-Go)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
                  ${soluqubePayAsYouGo.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  Save ${(rightrevEstimatedMin - soluqubePayAsYouGo).toLocaleString()} ({(100 - (soluqubePayAsYouGo / rightrevEstimatedMin * 100)).toFixed(0)}% savings)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
            <h3 className="text-lg font-semibold text-white mb-2">
              Why do finance teams decouple revenue recognition from Salesforce?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Salesforce is built for pipeline and CRM tracking, not rigorous subledger accounting. Coupling your revrec engine to Salesforce CPQ creates severe vendor lock-in, increases seat license costs for accounting personnel, and introduces data drift whenever sales teams modify quote stages without informing the deal desk. Soluqube acts as an independent auditor evaluating actual signed contracts.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
            <h3 className="text-lg font-semibold text-white mb-2">
              How does Soluqube handle mid-term contract modifications?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Under ASC 606-10-25-13, contract modifications must be evaluated for prospective versus cumulative catch-up accounting. Soluqube executes a Directed Acyclic Graph (DAG) that ingests the addendum PDF, links it to the original master agreement, recalculates Standalone Selling Prices, and outputs compliant journal entries without requiring manual spreadsheets.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
            <h3 className="text-lg font-semibold text-white mb-2">
              What workpapers does Soluqube export for external auditors?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Soluqube exports audit-ready evidence packages including the allocation and amortisation schedules, clause references back to the contract PDF, and a SHA-256 integrity hash over the schedule.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-slate-900/60">
          <h3 className="text-2xl font-bold text-white mb-3">
            Audit Your Complex Contracts with Zero Vendor Lock-In
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Upload your signed enterprise MSA or SOW. Confirm the performance obligations and stated prices, then get integer (BigInt) schedules that tie to the cent, with clause references.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-lg"
            >
              Start Instant Contract Audit ($499)
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/asc-606"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700"
            >
              Explore Interactive Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
