"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Layers, Cpu, ExternalLink } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "quarterly">("annual");

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
            Eliminate floating-point rounding drift, enforce cross-document rate caps, and isolate statutory 18% GST with mathematically verifiable balance sheet parity.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          
          {/* Tier 1: Historical Drift Audit (Complimentary) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                FOR CFOS &amp; AUDIT DIRECTORS
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Historical Drift Audit</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Validate historical NetSuite, SAP, or spreadsheet revrec accuracy across complex multi-element contracts before year-end auditor sampling.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">$0</span>
                <span className="text-xs text-slate-500 ml-2 font-mono">/ Complimentary Review</span>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  100% Free • No Software Installation Required
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Up to 3 complex enterprise contracts, MSAs, or SOWs</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Spatial token character bounding box extraction report</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>IEEE-754 64-bit floating-point variance analysis</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Statutory 18% GST isolation &amp; Schedule III compliance check</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Executive findings presentation with Big 4-trained CPA</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/book-demo"
                className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 block shadow-xs"
              >
                Request Free Audit &rarr;
              </Link>
            </div>
          </div>

          {/* Tier 2: Continuous Enterprise RevRec Engine (Featured) */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              MOST POPULAR FOR B2B SAAS
            </div>

            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
                CONTINUOUS ENGINE
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Enterprise RevRec Sync</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Automated contract-to-ledger processing with live webhook sync to NetSuite, SAP, and QuickBooks with zero drift.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">Custom</span>
                <span className="text-xs text-slate-500 ml-2 font-mono">/ Volume Tiered ARR</span>
                <div className="text-[11px] text-blue-700 font-semibold mt-1">
                  Priced by annual contract volume &amp; ERP integrations
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unlimited contract ingestion with 5.8 ms/page latency</span>
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
                  <span>Live bi-directional subledger sync (NetSuite ARM / SAP RAR)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Big 4 auditor portal with cryptographic Merkle tree anchors</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dedicated technical accounting onboarding &amp; SLA guarantee</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/book-demo"
                className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors block shadow-md"
              >
                Inquire for Architecture Review &rarr;
              </Link>
            </div>
          </div>

          {/* Tier 3: Sovereign Cloud / On-Premise */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-4">
                FINANCIAL INSTITUTIONS &amp; DEFENSE
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Sovereign On-Premise</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Air-gapped deployment in your private cloud or bare metal for highly regulated financial and defense entities.
              </p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold font-mono text-slate-900">Annual</span>
                <span className="text-xs text-slate-500 ml-2 font-mono">/ Enterprise License</span>
                <div className="text-[11px] text-purple-700 font-semibold mt-1">
                  Zero data leaves your security perimeter
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Air-gapped deployment in AWS GovCloud, Azure, or On-Prem</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>FIPS 140-2 Level 3 Hardware Security Module (HSM) signing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Custom ERP adapter engineering &amp; database schema mapping</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SOC 2 Type II, HIPAA, and ISO 27001 audit defense collateral</span>
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
            <table className="w-full text-left border-collapse min-w-[640px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase bg-white/70">
                  <th className="py-3 px-4">Feature / Capability</th>
                  <th className="py-3 px-4 text-center">Historical Drift Audit</th>
                  <th className="py-3 px-4 text-center font-bold text-slate-900 bg-blue-50/50">Enterprise RevRec</th>
                  <th className="py-3 px-4 text-center">Sovereign On-Prem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Floating-Point Zero Drift ($0.000000)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">✓ Continuous</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Continuous</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Spatial Character Bounding Box Grounding</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Up to 3 Contracts</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">Unlimited Ingestion</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">Unlimited Ingestion</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Ind AS 115 Statutory 18% GST Quarantine</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">✓ Automated</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ Automated</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">NetSuite ARM / SAP RAR Subledger Sync</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">Offline CSV</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">Live Webhooks / REST</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">Direct DB / OData</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Big 4 Auditor Merkle Tree Pack (AS 3101)</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Sample Report</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold bg-blue-50/30">Full 8-Tab Pack</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">Air-gapped Cryptography</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Deployment Architecture</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Advisory Review</td>
                  <td className="py-3.5 px-4 text-center text-slate-700 bg-blue-50/30">SOC 2 Multi-Tenant Cloud</td>
                  <td className="py-3.5 px-4 text-center text-slate-700">Air-gapped VPC / Bare Metal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Verify Your Current Balance Sheet Parity?
          </h3>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Book a complimentary 3-contract historical drift audit. Our technical accounting team will run your contracts through the 5-Gate engine and deliver a formal variance report.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all"
            >
              <span>Request Free Drift Audit</span>
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
