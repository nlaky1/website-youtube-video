import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Check, ArrowRight, ExternalLink } from "lucide-react";

const CALENDLY = "https://calendly.com/nikhil-soluqube/30min";

type Tier = {
  badge: string;
  name: string;
  blurb: string;
  price: string;
  unit: string;
  note?: string;
  features: string[];
  cta: string;
  href: string;
  external: boolean;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    badge: "PROOF OF VALUE",
    name: "Free 3-Contract Sample",
    blurb:
      "Your three hardest multi-element contracts: the SSP allocation, a schedule that ties to the cent, and a hashed workpaper you can hand to your auditor.",
    price: "$0",
    unit: "/ 3 contracts",
    note: "Free • No software installation",
    features: [
      "Up to 3 contracts, MSAs or SOWs",
      "Clause evidence (page and excerpt) for each obligation",
      "Allocation and schedule tie-out to the cent",
      "Statutory 18% GST isolation (INR contracts)",
      "Findings walkthrough with the founder",
    ],
    cta: "Request Free Workpaper",
    href: "/book-demo",
    external: false,
  },
  {
    badge: "US AUDIT & DILIGENCE",
    name: "Audit Workpaper",
    blurb:
      "For a client's audit or diligence request: the SSP allocation, full-term schedules and a hashed evidence workpaper across the contracts in scope.",
    price: "$475",
    unit: "/ client event",
    note: "Founding price for the first 10 customers • list $950",
    features: [
      "Up to 10 contracts per client event",
      "Delivered within 48 hours",
      "Handled under NDA",
      "5-sheet Excel workbook: Summary, Allocation, Schedule, Clause Evidence, Event Log",
      "SHA-256 hashed export with clause evidence (page and excerpt)",
    ],
    cta: "Book a 30-min call",
    href: CALENDLY,
    external: true,
    featured: true,
  },
  {
    badge: "QUALITY OF EARNINGS",
    name: "QoE Deal Pack",
    blurb:
      "For a quality-of-earnings or diligence review of a SaaS target: the same allocation, schedule and hashed workpaper across the target's contract stack.",
    price: "$1,750",
    unit: "/ deal",
    note: "Founding price for the first 10 customers • list $3,500",
    features: [
      "Up to 25 contracts per deal",
      "Delivered within 5 business days",
      "Relative-SSP allocation per obligation",
      "Full-term schedules that tie to the cent (terminal-period absorption)",
      "SHA-256 hashed evidence workbook per contract",
      "Handled under NDA",
    ],
    cta: "Book a 30-min call",
    href: CALENDLY,
    external: true,
  },
  {
    badge: "ACCOUNTING FIRMS",
    name: "Firm Tool Access",
    blurb:
      "For offshore and outsourced accounting firms doing ASC 606 work for US SaaS clients: run the allocation and schedule yourselves in the app.",
    price: "$49",
    unit: "/ month per firm",
    note: "Founding price for the first 10 customers • or $490 / year • list $99 / month",
    features: [
      "Upload USD or INR contract PDFs at app.soluqube.com",
      "You confirm the obligations and prices; the engine does the allocation and schedule",
      "Excel workbook and JSON exports with SHA-256 hashes",
      "Onboarding with the founder",
    ],
    cta: "Book a 30-min call",
    href: CALENDLY,
    external: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Founding Prices
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Pricing for Defensible Revenue Allocation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Defend SSP allocations with a deterministic schedule that ties to the cent, a SHA-256-hashed Excel workbook, and statutory 18% GST isolation on INR contracts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-20">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`bg-white rounded-3xl p-7 flex flex-col justify-between ${
                t.featured ? "border-2 border-slate-900 shadow-xl" : "border border-slate-200 shadow-sm"
              }`}
            >
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-50 text-slate-700 border border-slate-200 mb-4">
                  {t.badge}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{t.name}</h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.blurb}</p>

                <div className="my-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-extrabold font-mono text-slate-900">{t.price}</span>
                  <span className="text-xs text-slate-500 ml-1.5 font-mono">{t.unit}</span>
                  {t.note && <div className="text-[11px] text-emerald-700 font-semibold mt-1">{t.note}</div>}
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  {t.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                {t.external ? (
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold block shadow-sm transition-colors ${
                      t.featured ? "text-white bg-slate-900 hover:bg-slate-800" : "text-white bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    {t.cta} &rarr;
                  </a>
                ) : (
                  <Link
                    href={t.href}
                    className="w-full py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 block shadow-xs"
                  >
                    {t.cta} &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 max-w-3xl mx-auto -mt-12 mb-16">
          Prices in USD, excluding applicable taxes. Every engagement covers USD and INR contracts; invoices, scans without a text layer and contracts with redacted prices are refused; amendments are flagged for manual review and not accounted for. Mutual NDA on request.
        </p>

        {/* Bottom CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Defend Your Next SSP Allocation?
          </h3>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Request a Free 3-Contract Audit-Defense Workpaper. We run your three hardest contracts through the engine, with a reconciliation gate on every run (allocation and schedule tie to the contract price; deferred ends at $0.00), and deliver the SSP allocation, the schedule that ties to the cent, and a hashed evidence workpaper.
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
