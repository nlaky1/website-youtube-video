import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  FileCheck2, 
  FileText, 
  ExternalLink, 
  Scale, 
  Cpu, 
  CheckCircle2,
  ChevronRight,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "ASC 606 vs Ind AS 115 Dual Standard Amortization & 18% GST Isolation | Soluqube",
  description: "Cross-border dual-ledger compliance engine isolating 18% Indian GST under MCA Schedule III while maintaining US GAAP ASC 606 parity.",
  alternates: {
    canonical: "https://soluqube.com/asc-606-vs-ind-as-115",
  },
};

export default function DualStandardHubPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900">Soluqube</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/blog" className="hover:text-slate-900">Knowledge Hub</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">ASC 606 vs Ind AS 115</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cross-Border Compliance Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl">
            ASC 606 vs Ind AS 115 Dual Standard Accounting
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Automating the separation of statutory 18% Indian GST (CGST/SGST/IGST) liabilities into segregated MCA Schedule III balance sheet accounts while maintaining GAAP-compliant US revenue amortization schedules.
          </p>
        </div>
      </section>

      {/* CONTENT & TECHNICAL GUIDE LINK */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Key Dual-Standard Accounting Principles</h3>
            <Link
              href="/blog/asc-606-vs-ind-as-115-dual-standard-gst-compliance"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Read Full Publication</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">1. Statutory 18% GST Balance Sheet Firewall</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under Ind AS 115 and MCA Schedule III, gross billings containing 18% GST cannot be recorded in deferred revenue. Soluqube automatically calculates Net Consideration = Gross / 1.18 at contract inception.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">2. Multi-Currency Dual General Ledger Sync</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Posts parallel journal entries to US GAAP USD Ledgers and Indian MCA INR Ledgers with automated foreign currency translation and zero reconciliation discrepancies.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-bold">Simulate Dual-Standard Amortization Live</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Launch the interactive dual-ledger calculator on the Soluqube sandbox.
            </p>
          </div>
          <a
            href="https://app.soluqube.com/asc-606-vs-ind-as-115"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition whitespace-nowrap flex items-center gap-2"
          >
            <span>Open Dual Standard Sandbox</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Soluqube Technologies Inc. &bull; Patent App: 202621096305
      </footer>
    </div>
  );
}
