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
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "ASC 606 Deterministic Revenue Recognition Engine | Soluqube",
  description: "Eliminate floating-point rounding drift, automate contract modification DAGs (ASC 606-10-25-13), and generate Big 4 audit workpapers with zero drift.",
  alternates: {
    canonical: "https://soluqube.com/asc-606",
  },
};

export default function ASC606HubPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900">Soluqube</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">ASC 606 Architecture Hub</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl">
            Deterministic ASC 606 Contract-to-Ledger Engine
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Eliminating IEEE-754 binary floating-point rounding discrepancies across multi-year SaaS contracts with closed-form 128-bit decimal parity and automated PCAOB AS 3101 Big 4 audit packages.
          </p>
        </div>
      </section>

      {/* CORE SPECIFICATIONS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              $0
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Mathematical Drift</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scaled integer arithmetic with terminal-period remainder absorption guarantees exact balance sheet zero-drift ($0.000000).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              DAG
            </div>
            <h3 className="text-base font-bold text-slate-900">ASC 606-10-25-13 Routing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deterministic graph evaluation routes mid-term contract amendments between Cumulative Catch-Up and Prospective reallocation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              PDF
            </div>
            <h3 className="text-base font-bold text-slate-900">Spatial Token Grounding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every extracted pricing term links to normalized pixel coordinates on signed PDFs for 1-click auditor verification.
            </p>
          </div>
        </div>

        {/* INTERACTIVE ENGINE CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-bold">Access the Live Engine &amp; Calculator</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Launch the interactive 128-bit calculation workspace on the Soluqube cloud app.
            </p>
          </div>
          <a
            href="https://app.soluqube.com/asc-606"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition whitespace-nowrap flex items-center gap-2"
          >
            <span>Open ASC 606 Sandbox</span>
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
