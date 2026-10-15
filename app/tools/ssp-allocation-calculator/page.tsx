import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { ArrowRight, Calculator, BookOpen } from "lucide-react";
import SspCalculator from "./Calculator";

const PAGE_URL = "https://soluqube.com/tools/ssp-allocation-calculator";
const SIGNUP_URL = "https://app.soluqube.com/signup";

const faqs = [
  {
    q: "What does this calculator do?",
    a: "It allocates a contract's transaction price to up to 10 performance obligations in proportion to their standalone selling prices (ASC 606-10-32-31), shows which obligation absorbs the residual cent, and builds a month-by-month recognition schedule that ends at 0.00 deferred.",
  },
  {
    q: "Why doesn't rounding each line add up to the contract price?",
    a: "Each line is rounded to the cent on its own. $100,000 split by SSPs of 30,000 / 30,000 / 120,000 gives 16,666.67 + 16,666.67 + 66,666.67 = 100,000.01. The same happens over time: $100,000 over 36 months rounded every month gives 100,000.08.",
  },
  {
    q: "Which obligation absorbs the residual cent?",
    a: "The last obligation in the list. Every other line is rounded to the cent and the last one receives the transaction price minus the others, so the allocation sums exactly. In the schedule, the final month of each ratable obligation absorbs its leftover cents. Use the arrow to change which obligation is last.",
  },
  {
    q: "Is this the residual approach to estimating SSP?",
    a: "No. The residual approach (ASC 606-10-32-34(c)) is a method for estimating an SSP that is highly variable or uncertain. The residual cent is a rounding rule applied after SSPs are set. This calculator takes your SSPs as given.",
  },
  {
    q: "How is GST handled for INR contracts?",
    a: "Choose INR and the price is treated as excluding GST. 18% GST is kept out of the transaction price as a liability, computed once on the total, and spread across the months with the final month absorbing the remainder, so the GST column ties to the total. USD contracts carry no GST.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. The calculation runs in your browser using the same integer arithmetic as the Soluqube engine. Nothing you type is sent to a server.",
  },
  {
    q: "What does this calculator not cover?",
    a: "Discounts or variable consideration allocated to specific obligations (ASC 606-10-32-36 to 32-41), different start months or terms per obligation, and contract modifications. It also does not estimate SSPs for you.",
  },
];

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SSP Allocation & Residual-Cent Calculator",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (runs in a web browser)",
  isAccessibleForFree: true,
  description:
    "Free ASC 606 relative-SSP allocation calculator. Shows which obligation absorbs the residual cent and builds a monthly schedule that ends at 0.00 deferred. Optional 18% GST isolation for INR.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Soluqube", url: "https://soluqube.com" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SspAllocationCalculatorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase font-mono tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Free tool &bull; ASC 606 &bull; Ind AS 115
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            SSP Allocation &amp; Residual-Cent Calculator
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Allocate a transaction price by relative standalone selling price, see exactly where the residual cent goes, and
            get a monthly schedule that ends at 0.00 deferred. Runs in your browser.
          </p>
        </div>

        <SspCalculator />

        {/* Explanation */}
        <section className="max-w-3xl mx-auto mt-20 mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-slate-500" />
            How the allocation works
          </h2>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              ASC 606-10-32-28 sets the objective: allocate the transaction price to each performance obligation in an
              amount that depicts the consideration the entity expects to be entitled to for it. Paragraphs 32-29 and 32-31
              do this on a relative standalone selling price basis at contract inception: each obligation receives
              transaction price × its SSP ÷ the sum of SSPs. Paragraphs 32-32 to 32-35 cover how to estimate an SSP when it
              is not directly observable, and 32-36 to 32-41 cover allocating a discount or variable consideration to
              specific obligations, which this calculator does not model.
            </p>
            <p>
              The standard does not say which obligation gets the leftover cent when the rounded shares don&apos;t sum to
              the price. That is an accounting policy choice, and it should be written down and applied the same way every
              time. Soluqube&apos;s rule: compute in integer arithmetic at 10^6 scale, round each line to the cent, and give
              the last-listed obligation the transaction price minus the others. Ratable obligations get the floored monthly
              amount every month and the final month absorbs the remainder, so the schedule ties to the allocation and the
              deferred balance ends at 0.00.
            </p>
            <p>
              A cent is far below materiality. The reason to settle it is mechanical: if the allocation or schedule
              doesn&apos;t sum to the contract, the deferred balance never reaches zero and someone books a plug that the
              next reviewer has to explain.
            </p>
            <p>
              Worked example and policy wording:{" "}
              <Link
                href="/blog/ssp-allocation-rounding-residual-cent-asc-606"
                className="font-semibold text-emerald-700 hover:underline"
              >
                SSP Allocation Rounding in ASC 606: Where the Cent Goes
              </Link>
              .
            </p>
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

        {/* CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Run this on your real contracts — free design-partner seat
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Send real contracts and get the relative-SSP allocation, a full-term schedule that ties to the cent, clause
            evidence (page + excerpt) per obligation, and a hashed evidence workpaper. 60 days free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/design-partners"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all"
            >
              <span>Apply for a design-partner seat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SIGNUP_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-sm transition-all"
            >
              <span>Create a free account</span>
            </a>
          </div>
          <p className="mt-6 text-[11px] font-mono text-slate-400">Patent Pending (App. No. 202621096305)</p>
        </div>
      </main>
    </div>
  );
}
