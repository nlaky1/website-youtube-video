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
  Scale, 
  Cpu, 
  CheckCircle2,
  ChevronRight,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  Building2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Soluqube vs Maxio: The Contract Auditor Alternative for ASC 606 & GAAP | Soluqube",
  description: "Compare Soluqube and Maxio (formerly SaaSOptics / Chargify). Why CFOs and controllers choose Soluqube's deterministic integer (BigInt) contract-to-ledger audit engine over invoice-based billing tools.",
  alternates: {
    canonical: "https://soluqube.com/soluqube-vs-maxio",
  },
};

export default function SoluqubeVsMaxioPage() {
  const comparisonRows = [
    {
      feature: "Primary Architecture & Category",
      maxio: "Subscription Billing, Invoicing & Financial Operations",
      soluqube: "Deterministic Revenue Recognition & Contract-to-Ledger Auditor",
      advantage: "Soluqube audits contracts; Maxio bills credit cards",
    },
    {
      feature: "Primary Source of Truth",
      maxio: "CRM Quotes & Billing Line Items (Salesforce / HubSpot)",
      soluqube: "Signed Legal Agreement (Physical PDF Text & OCR Layer)",
      advantage: "Soluqube catches unbilled contract amendments & clauses",
    },
    {
      feature: "Contract Ingestion & Verification",
      maxio: "Manual deal desk data entry or CPQ sync",
      soluqube: "Automated OCR with Spatial Bounding-Box Grounding ([x0, y0, x1, y1])",
      advantage: "Every Performance Obligation links to exact PDF clause",
    },
    {
      feature: "Math Precision Engine",
      maxio: "Not published",
      soluqube: "Integer (BigInt) Micro-Cent Fixed-Point DAG Engine",
      advantage: "Guaranteed $0.000000 rounding drift across 36-month schedules",
    },
    {
      feature: "Statutory Accounting Scope",
      maxio: "US GAAP (ASC 606) & IFRS 15 only",
      soluqube: "Dual Standard: US GAAP (ASC 606) + Ind AS 115 (MCA Schedule III)",
      advantage: "Dedicated 18% GST (CGST/SGST/IGST) statutory isolation",
    },
    {
      feature: "Audit Defensibility & Workpapers",
      maxio: "Static reports & CSV exports (manual auditor vouching)",
      soluqube: "Audit-ready evidence packages with SHA-256 integrity hashes",
      advantage: "One-click audit-ready evidence package generation",
    },
    {
      feature: "Internal Controls (SOX 404)",
      maxio: "Standard user permissions (RBAC)",
      soluqube: "Maker-Checker Dual Control with Submitter Lockout & Schedule Freeze",
      advantage: "Prevents restatements and unapproved schedule tampering",
    },
    {
      feature: "Pricing Model",
      maxio: "Billing volume tax (% of MRR / GMV) starting at $15k–$40k+/yr",
      soluqube: "Predictable flat tiers ($499 single audit or predictable monthly)",
      advantage: "Zero tax on your top-line revenue growth",
    },
    {
      feature: "Time to Value & Onboarding",
      maxio: "60 to 120 days implementation & ERP consultants",
      soluqube: "< 10 seconds per contract drop (Instant Verification)",
      advantage: "Instant audit readiness without ripping out existing billing stack",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="border-b border-slate-200 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900">Soluqube</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/asc-606" className="hover:text-slate-900">ASC 606 Solutions</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-semibold">Soluqube vs Maxio</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-mono font-bold border border-indigo-200">
            <Scale className="w-3.5 h-3.5 text-indigo-600" />
            <span>Competitive Architectural Teardown</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl">
            Soluqube vs. Maxio: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
              Contract Auditor vs. Invoice Billing
            </span>
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Maxio (formerly Chargify + SaaSOptics) manages subscriptions and charges credit cards. 
            Soluqube is your <strong>contract-to-ledger audit governor</strong>: reading executed legal PDFs, 
            eliminating IEEE-754 cent drift with integer (BigInt) math, and producing audit-ready evidence packages in seconds.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition shadow-sm"
            >
              <span>Test 3-Contract Drift Audit ($0)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition"
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Book 15-Min Technical Walkthrough</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CORE SUMMARY CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MAXIO CARD */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">The Billing Engine</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">Invoice Focused</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Maxio (Chargify + SaaSOptics)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Designed as an end-to-end billing tool that connects to Stripe and sends customer invoices. Calculates revenue recognition based on whatever sales reps or deal desks type into the CRM.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">●</span>
                <span>Takes 60–120 days for implementation & data migration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">●</span>
                <span>Charges a &quot;billing volume tax&quot; on your top-line revenue</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">●</span>
                <span>Blind to physical contract PDF clauses and handwritten amendments</span>
              </li>
            </ul>
          </div>

          {/* SOLUQUBE CARD */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">The Contract Auditor</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">Zero Drift</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Soluqube</h3>
            <p className="text-indigo-200 text-sm leading-relaxed">
              The contract-to-ledger revenue subledger. Ingests raw signed legal PDFs, maps performance obligations to spatial coordinates, guarantees zero penny drift via integer (BigInt) math, and delivers audit-ready evidence packages.
            </p>
            <ul className="space-y-2 text-xs text-indigo-200 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Instant drop-and-audit verification in &lt; 10 seconds</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Predictable flat-fee pricing ($499 self-serve or monthly tiers)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Dual-GAAP: ASC 606 (USD) + Ind AS 115 with 18% statutory GST quarantine</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURE COMPARISON TABLE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Detailed Architectural Comparison
            </h2>
            <p className="text-slate-600 text-sm">
              How Soluqube and Maxio compare across data ingestion, mathematical precision, audit defensibility, and deployment speed.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4 px-6 font-bold text-slate-900 w-1/4">Evaluation Criteria</th>
                  <th className="py-4 px-6 font-bold text-slate-600 w-1/3">Maxio (Chargify + SaaSOptics)</th>
                  <th className="py-4 px-6 font-bold text-indigo-700 w-1/3 bg-indigo-50/50">Soluqube</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      <div>{row.feature}</div>
                      <div className="text-[11px] font-mono text-emerald-600 font-normal mt-0.5">{row.advantage}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono text-xs leading-relaxed">
                      {row.maxio}
                    </td>
                    <td className="py-4 px-6 text-slate-900 font-mono text-xs font-semibold bg-indigo-50/30 leading-relaxed">
                      {row.soluqube}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* THE 4 GAPS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          The 4 Critical Gaps Soluqube Solves
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-mono">1</span>
              <span>The &quot;Contract-to-Quote&quot; Blindspot</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Maxio only knows what is configured in Salesforce CPQ or typed into invoice line items. If a bespoke PDF amendment promises customized delivery SLAs, termination for convenience, or ramp pricing, billing tools recognize restatable revenue. Soluqube reads the signed PDF text directly and pins obligations to spatial coordinates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-mono">2</span>
              <span>Zero IEEE-754 Floating-Point Drift</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Multi-year SaaS contracts split across 36 ratable periods create recurring fractional pennies (e.g. $100,000 / 36 = $2,777.7777...). Standard databases accumulate cent drift that requires manual plug journal entries at close. Soluqube&apos;s integer (BigInt) DAG absorbs remainder fractions deterministically so ending deferred revenue amortizes to exactly $0.00.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-mono">3</span>
              <span>Statutory Indian GAAP (Ind AS 115) & 18% GST</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Maxio is tailored exclusively for Western tax frameworks. Companies with Indian engineering centers or cross-border entities struggle to separate 18% GST (CGST/SGST vs IGST) under MCA Schedule III. Soluqube isolates statutory taxes onto segregated liability accounts while preserving US GAAP amortization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-mono">4</span>
              <span>No 4-Month Onboarding or Revenue Volume Tax</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Maxio charges based on your growing billing volume (punishing you for growing top-line revenue) and requires $5k–$15k in setup fees with 8–12 weeks of data migration. Soluqube operates alongside your existing billing system as an instant contract auditor—delivering results in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO USE TOGETHER CALLOUT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-bold">Already Using Maxio or Stripe Billing?</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              You don&apos;t have to replace your billing stack. You can keep Maxio or Stripe to bill your customers and charge cards, and use Soluqube as your <strong>contract-to-ledger audit governor</strong> so your external auditor has full evidence when reviewing your revenue schedules.
            </p>
          </div>
          <Link
            href="/audit"
            className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs transition whitespace-nowrap"
          >
            Run Free 3-Contract Audit
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4 text-center text-xs font-mono text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Soluqube Inc. Deterministic ASC 606 & Ind AS 115 Revenue Engine.</p>
          <div className="flex gap-4">
            <Link href="/asc-606" className="hover:text-slate-900">ASC 606 Guide</Link>
            <Link href="/asc-606-vs-ind-as-115" className="hover:text-slate-900">Dual Standard</Link>
            <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
