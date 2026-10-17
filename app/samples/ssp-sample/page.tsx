import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";

// Landing page for outreach links (founder-approved tracking work, 17 Oct 2026): the GA tag loads here, so the visit and
// its utm_* parameters are recorded, and the download click sends sample_download (components/analytics-clicks.tsx).
export const metadata: Metadata = {
  title: "SSP Allocation Sample (Public SEC Contract)",
  description:
    "A one-page SSP allocation and revenue schedule built from a public SEC filing (Cloudera / Intel), with clause evidence and SHA-256 hashes.",
  alternates: { canonical: "https://soluqube.com/samples/ssp-sample" },
  robots: { index: false, follow: true },
};

const PDF = "/samples/soluqube-ssp-sample.pdf";
const CALENDLY = "https://calendly.com/nikhil-soluqube/30min";

export default function SspSamplePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Sample workpaper</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          SSP allocation sample from a public SEC contract
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          This one-page sample runs the Cloudera / Intel Enterprise Subscription Agreement (EX-10.13, a public SEC filing) through
          Soluqube: a $30,000,000 transaction price over 48 months, split across two performance obligations by relative standalone
          selling price, with the page and verbatim excerpt each figure came from, a revenue schedule that ends at $0.00 deferred, and
          SHA-256 hashes of the source PDF and the workpaper. The full 48-row schedule is in the Excel workpaper.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <a
            href={PDF}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Download the sample (PDF)
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Book a 30-min call to run your own contracts
          </a>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-2">Honest limits</h2>
        <ul className="list-disc pl-5 text-sm text-slate-700 leading-relaxed space-y-1.5">
          <li>Built from a public filing; no client data. List prices and discounts are redacted in the filing, so the stated order-form fees are used as SSP inputs.</li>
          <li>Contract terms are extracted as a draft and confirmed by a person before the schedule runs.</li>
          <li>One contract at a time; USD and INR contracts only.</li>
          <li>Both obligations are shown straight-line over the term; usage-based draw-down and contract modifications are not modelled.</li>
        </ul>
      </main>
      <ResourceFooter />
    </div>
  );
}
