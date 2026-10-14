import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Check, ArrowRight, FileText, MessageSquare, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Partner Program: 60 Days Free",
  description:
    "10 design-partner seats: 60 days free on your real contracts. SSP allocation, a full-term schedule that ties to the cent, and a hashed evidence workpaper.",
  alternates: {
    canonical: "https://soluqube.com/design-partners",
  },
  openGraph: {
    title: "Soluqube Design Partner Program",
    description:
      "60 days free on your real contracts: SSP allocation, a schedule that ties to the cent, and a hashed evidence workpaper. 10 seats.",
    url: "https://soluqube.com/design-partners",
  },
};

const APPLY_URL = "https://soluqube.com/book-demo";

const whatYouGet = [
  "Relative-SSP allocation for every contract you send, with the SSP weights documented",
  "A full-term revenue schedule, computed in integer arithmetic at 10^6 scale and rounded to cents, with terminal-period absorption so deferred revenue ends at $0.00",
  "Clause evidence (page + excerpt) for each performance obligation",
  "An Excel / JSON evidence workpaper with a SHA-256 hash: same input, same output, re-runnable in front of your auditor",
  "Ind AS 115 treatment with 18% GST isolated for INR contracts",
  "48-hour turnaround per batch, set up personally by our founder, Nikhil",
];

const whatWeAsk = [
  "A 20-minute kickoff call and a 20-minute wrap-up call",
  "Honest feedback on what helped and what didn't",
  "A quote or your logo, only if it actually helped you",
  "A straight answer to: “What would you pay for this?”",
];

const whoItsFor = [
  {
    title: "Fractional-CFO & CPA firms",
    body: "You close the books for several SaaS clients and rebuild SSP allocations in spreadsheets every quarter.",
  },
  {
    title: "SaaS finance teams",
    body: "Your Controller or CFO defends multi-element contract allocations to an external auditor and wants the support in one workpaper.",
  },
];

const steps = [
  {
    title: "Apply & kickoff",
    body: "Book a 20-minute call. We agree which contracts to start with and how you want the output.",
  },
  {
    title: "Send contracts",
    body: "Send real contracts, redacted if you prefer. You confirm the obligations and stated prices; the engine does the allocation and schedule.",
  },
  {
    title: "Get the workpaper",
    body: "Within 48 hours per batch you receive the SSP allocation, the full-term schedule and the hashed evidence workpaper.",
  },
];

const faqs = [
  {
    q: "How do you handle confidentiality?",
    a: "You can redact names, counterparties and anything else that isn't needed for the allocation. We use your contracts only to produce your workpapers, and we delete them on request.",
  },
  {
    q: "What happens after 60 days?",
    a: "You decide. There is no automatic charge and no card on file. If it was useful, we talk about pricing; if not, you keep the workpapers we delivered.",
  },
  {
    q: "Which standards do you support?",
    a: "ASC 606 and Ind AS 115. For INR contracts under Ind AS 115, 18% GST is isolated before the net consideration is allocated and scheduled; US contracts carry no GST.",
  },
  {
    q: "What don't you do yet?",
    a: "There is no live ERP sync: you get Excel / JSON exports to review and post yourself. Contract-modification accounting (prospective vs cumulative catch-up) is on the roadmap, not built. Extraction is assisted, and you confirm obligations and prices manually.",
  },
];

export default function DesignPartnersPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Design Partner Program &bull; 10 Seats
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Defend Your SSP Allocations, Free for 60 Days
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Run your real contracts through Soluqube and get the allocation, a schedule that ties to the cent, and a hashed evidence workpaper.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={APPLY_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all"
            >
              <span>Apply as a design partner</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[11px] font-mono text-slate-500">
              10 seats for the first 10 firms &bull; 60 days free &bull; no automatic charge
            </span>
          </div>
        </div>

        {/* What you get / What we ask */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-20">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
              <FileText className="w-3.5 h-3.5" />
              WHAT YOU GET
            </div>
            <h2 className="text-xl font-bold text-slate-900">60 days on your real contracts</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              {whatYouGet.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              WHAT WE ASK
            </div>
            <h2 className="text-xl font-bold text-slate-900">About 40 minutes of your time</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              {whatWeAsk.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500 leading-relaxed">
              Contracts can be redacted. We delete them on request.
            </p>
          </div>
        </div>

        {/* Who it's for */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-slate-500" />
            Who it&apos;s for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whoItsFor.map((w) => (
              <div key={w.title} className="bg-slate-50 border border-slate-200/90 rounded-3xl p-7">
                <h3 className="text-lg font-bold text-slate-900">{w.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 mb-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8 flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-slate-500" />
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono text-sm font-bold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-base font-bold text-slate-900">{f.q}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            10 seats. 60 days. Your real contracts.
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Book a 20-minute kickoff and send your first batch. You get the workpaper within 48 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={APPLY_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all"
            >
              <span>Apply as a design partner</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-sm transition-all"
            >
              <span>See pricing</span>
            </Link>
          </div>
          <p className="mt-6 text-[11px] font-mono text-slate-400">Patent Pending (App. No. 202621096305)</p>
        </div>
      </main>
    </div>
  );
}
