import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Layers, Cpu, ExternalLink } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Enterprise Deployment &amp; Audit Advisory Tiers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Institutional Pricing for Deterministic RevRec Precision
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Defend SSP allocations with a deterministic schedule that ties to the cent, enforce cross-document rate caps, and isolate statutory 18% GST on INR contracts.
          </p>
        </div>

        {/* 4 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
          
          {/* Tier 1: Free 3-Contract Audit-Defense Workpaper */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                PROOF OF VALUE
              </div>
              <h2 className="text-xl font-bold text-slate-900">Free 3-Contract Audit-Defense Workpaper</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Your three hardest multi-element contracts: the SSP allocation, a schedule that ties to the cent, and a hashed workpaper you can hand to your auditor.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">$0</span>
                <span className="text-xs text-slate-500 ml-1.5 font-mono">/ 3-Contract Sample</span>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  100% Free • No Software Installation
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Up to 3 complex enterprise contracts, MSAs, or SOWs</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Clause evidence references (page and excerpt) for each obligation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Allocation and schedule tie-out to the cent</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Statutory 18% GST isolation &amp; Schedule III check (INR contracts)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Executive findings presentation with a member of the Soluqube team</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/book-demo"
                className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 block shadow-xs"
              >
                Request Free Workpaper &rarr;
              </Link>
              <Link
                href="/design-partners"
                className="block mt-3 text-center text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Or apply as a design partner &rarr;
              </Link>
            </div>
          </div>

          {/* Tier 2: Self-Serve Single Contract Audit ($499) */}
          <div className="bg-white border border-slate-300 rounded-3xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
                INSTANT SELF-SERVE
              </div>
              <h2 className="text-xl font-bold text-slate-900">On-Demand Contract Audit</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Upload an MSA + SOW stack, confirm the obligations and prices, and get an integer (BigInt) amortization schedule and audit-ready evidence package.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">$499</span>
                <span className="text-xs text-slate-500 ml-1.5 font-mono">/ Contract Stack</span>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">
                  Zero Annual Lock-In • Corporate Card Ready
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full MSA + SOW + Amendment precedence DAG audit</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Complete 8-Tab audit-ready Excel workpaper (.xlsx)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Integer (BigInt) waterfall at 10^6 scale, rounded to cents (ties to $0.00 deferred)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Excel and CSV schedule exports</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SHA-256 hashed export with clause evidence (page + excerpt)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/audit"
                className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors block shadow-sm"
              >
                Start $499 Contract Audit &rarr;
              </Link>
            </div>
          </div>

          {/* Tier 3: Continuous Enterprise RevRec Engine ($999/mo - Featured) */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-7 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
              RECOMMENDED FOR B2B SAAS
            </div>

            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
                CONTINUOUS SUBLEDGER
              </div>
              <h2 className="text-xl font-bold text-slate-900">Continuous RevRec Engine</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Unlimited contract-to-schedule processing with ERP-ready exports for NetSuite, SAP, and QuickBooks. Live connectors are on the roadmap.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">$999</span>
                <span className="text-xs text-slate-500 ml-1.5 font-mono">/ month</span>
                <div className="text-[11px] text-blue-700 font-semibold mt-1">
                  Unlimited Contracts • Zero GMV Revenue Tax
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unlimited contracts with assisted extraction and manual confirmation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Continuous 5-Gate deterministic mathematical validation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Temporal Precedence DAG cross-document rate cap enforcement</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>ERP-ready schedule exports for NetSuite ARM / SAP RAR (live connectors on the roadmap)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SHA-256 hashed evidence packs to share with your auditor</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated technical accounting onboarding; custom terms and service levels available on request</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/book-demo"
                className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors block shadow-md"
              >
                Deploy Continuous Engine &rarr;
              </Link>
            </div>
          </div>

          {/* Tier 4: Sovereign Cloud / On-Premise */}
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-4">
                REGULATED &amp; DEFENSE
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sovereign On-Premise</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Air-gapped deployment in your private cloud or bare metal for regulated financial and defense entities.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">Custom</span>
                <span className="text-xs text-slate-500 ml-1.5 font-mono">/ Annual License</span>
                <div className="text-[11px] text-purple-700 font-semibold mt-1">
                  Zero data leaves your security perimeter
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Air-gapped deployment in AWS GovCloud, Azure, or On-Prem</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SHA-256 integrity hashes on all exports</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom ERP adapter engineering &amp; database schema mapping</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Security questionnaire and encryption-in-transit documentation on request</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>24/7 dedicated engineering support &amp; custom SLAs</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/contact"
                className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 block shadow-xs"
              >
                Contact Enterprise Security &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Feature Comparison Table for CFOs */}
        <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Detailed Capability Comparison Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase bg-white/70">
                  <th className="py-3 px-4">Feature / Capability</th>
                  <th className="py-3 px-4 text-center">Free Diagnostic ($0)</th>
                  <th className="py-3 px-4 text-center font-bold text-emerald-800 bg-emerald-50/40">Self-Serve Audit ($499)</th>
                  <th className="py-3 px-4 text-center font-bold text-slate-900 bg-blue-50/50">Continuous Engine ($999/mo)</th>
                  <th className="py-3 px-4 text-center">Sovereign On-Prem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Ties to the cent (terminal-period absorption)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-emerald-50/20">✓ Included</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">✓ Continuous</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Continuous</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Clause evidence references</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Up to 3 Contracts</td>
                  <td className="py-3.5 px-4 text-center text-emerald-700 font-semibold bg-emerald-50/20">Full Contract Stack</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">Unlimited Ingestion</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">Unlimited Ingestion</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Ind AS 115 Statutory 18% GST Quarantine (INR contracts)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-emerald-50/20">✓ Included</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">✓ Automated</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Automated</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">ERP-ready schedule export</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">Sample Schedule</td>
                  <td className="py-3.5 px-4 text-center text-emerald-700 font-semibold bg-emerald-50/20">Excel + CSV Export</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">Excel + CSV Export (Live Sync on Roadmap)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">Custom Adapter (Scoped per Engagement)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Auditor Merkle Tree Pack (JSON-LD)</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Sample Report</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-emerald-50/20">Full 8-Tab Pack</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">Full 8-Tab Pack</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">Air-gapped Cryptography</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Deployment Architecture</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Advisory Review</td>
                  <td className="py-3.5 px-4 text-center text-slate-700 bg-emerald-50/20">Instant Self-Serve</td>
                  <td className="py-3.5 px-4 text-center text-slate-700 bg-blue-50/30">Multi-Tenant Cloud (encrypted in transit)</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Air-gapped VPC / Bare Metal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Defend Your Next SSP Allocation?
          </h3>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Request a Free 3-Contract Audit-Defense Workpaper. We run your three hardest contracts through the 5-Gate engine and deliver the SSP allocation, the schedule that ties to the cent, and a hashed evidence workpaper.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all"
            >
              <span>Request Free Workpaper</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://app.soluqube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-sm transition-all"
            >
              <span>Explore Live Sandbox</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
