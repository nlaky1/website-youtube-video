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

export default function SoluqubeVsLeapfinPage() {
  const [contractCount, setContractCount] = useState<number>(10);

  // Price comparison math
  const soluqubePayAsYouGo = contractCount * 499;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://soluqube.com/soluqube-vs-leapfin#article",
        "headline": "Soluqube vs Leapfin: Contract Audit Engine vs Transaction Data Subledger",
        "description": "Technical comparison between Soluqube and Leapfin. Soluqube specializes in B2B enterprise contract ingestion, visual PDF clause grounding, and integer (BigInt) micro-cent math, while Leapfin (acquired by Airwallex in June 2026) focuses on high-volume B2C payment pipelines.",
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
        "mainEntityOfPage": "https://soluqube.com/soluqube-vs-leapfin"
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
              Architecture Teardown
            </span>
            <Link
              href="/book-demo"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black transition-all shadow-sm"
            >
              Book a walkthrough
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
            Architectural Teardown: Leapfin vs. Soluqube
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Soluqube vs. Leapfin: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Contract Audit Intelligence vs. Transaction Streaming
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Leapfin was built to solve payment event pipelines for high-volume B2C apps. Soluqube is engineered for B2B finance leaders who need to audit unstructured, bespoke legal contracts with clause evidence (page + excerpt) per obligation and integer (BigInt) math that ties to the cent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Source Ingestion</div>
              <div className="text-base font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Signed Contract Terms
              </div>
              <p className="text-xs text-slate-500 mt-1">Starts from signed MSAs, SOWs and Order Forms; you confirm obligations and prices.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Clause Verification</div>
              <div className="text-base font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Clause Evidence References
              </div>
              <p className="text-xs text-slate-500 mt-1">Page and excerpt of the clause behind each obligation.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Precision & Compliance</div>
              <div className="text-base font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                Dual-GAAP & Merkle Proof
              </div>
              <p className="text-xs text-slate-500 mt-1">ASC 606 + Ind AS 115 with SHA-256 sealed workpapers.</p>
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
            Comparing transactional data ingestion against deterministic legal contract subledgers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 font-semibold">Capability</th>
                <th className="py-4 px-6 font-semibold text-slate-300">Leapfin</th>
                <th className="py-4 px-6 font-semibold text-cyan-400">Soluqube</th>
                <th className="py-4 px-6 font-semibold text-slate-300">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-4 px-6 font-medium text-white">Primary Focus</td>
                <td className="py-4 px-6">High-volume transaction event streaming</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">B2B Complex Contract Document Audits</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Different focus: Soluqube starts from the contract</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Contract PDF Ingestion</td>
                <td className="py-4 px-6 text-rose-400">❌ No (Relies on upstream CRM/Billing)</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">✅ Contract upload; you confirm obligations and prices</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Soluqube verifies signed paper vs. CRM</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Visual Clause Grounding</td>
                <td className="py-4 px-6 text-rose-400">❌ No clause evidence from contract PDFs</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">✅ Clause evidence (page + excerpt)</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Each obligation traceable to its clause</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Calculation Precision</td>
                <td className="py-4 px-6">Not published</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">Integer (BigInt), 10^6 scale, rounded to cents</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">Ties to the cent (terminal-period absorption)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Dual-GAAP (ASC 606 + Ind AS 115)</td>
                <td className="py-4 px-6 text-rose-400">❌ No Indian GAAP support</td>
                <td className="py-4 px-6 text-emerald-400">✅ Native Dual Standard & 18% GST</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">MCA Schedule III statutory isolation</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Implementation Overhead</td>
                <td className="py-4 px-6">6 to 12 Weeks (Data pipeline engineering)</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">Free 3-contract workpaper in 48 hours</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">No data pipeline to build</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-white">Published Pricing</td>
                <td className="py-4 px-6">Enterprise sales (pricing not published)</td>
                <td className="py-4 px-6 text-cyan-300 font-medium">$499/contract or $999/mo continuous</td>
                <td className="py-4 px-6 text-emerald-400 font-medium">No sales procurement roadblocks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Cost Calculator */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Per-Contract Pricing vs. Heavy Data Pipeline
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Compare annual spend for Leapfin annual enterprise contracts versus Soluqube per-contract workbooks.
          </p>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Number of Enterprise Contracts / Year: <span className="text-cyan-400 font-bold">{contractCount}</span>
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
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Leapfin (Annual Contract)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-300">
                  Not published
                </div>
                <div className="text-xs text-rose-400 mt-1">Lengthy setup & pipeline fees</div>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-1">Soluqube (Per Contract)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
                  ${soluqubePayAsYouGo.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  Leapfin does not publish pricing; compare against your own quote.
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
              When should a company choose Soluqube over Leapfin?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              If your business handles custom B2B enterprise software contracts (MSAs, SOWs) with bespoke termination rights, multi-element POB allocations, or cross-border Indian entities, Soluqube is built to work from those contract terms and produce allocations and schedules that tie to the cent. Leapfin is better suited for consumer brands aggregating millions of micro-transactions from Stripe or Shopify.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
            <h3 className="text-lg font-semibold text-white mb-2">
              How does Soluqube ensure cryptographic audit defensibility?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every audit pack generated by Soluqube carries a SHA-256 integrity hash over the obligations, clause excerpts and resulting amortization schedule, so an auditor can re-run it and confirm the numbers have not changed since close.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-slate-900/60">
          <h3 className="text-2xl font-bold text-white mb-3">
            Deterministic Revenue Recognition for Enterprise Contracts
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Upload your signed customer agreements. Confirm the obligations and stated prices; get clause references and integer (BigInt) schedules that tie to the cent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-lg"
            >
              Book a walkthrough
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
