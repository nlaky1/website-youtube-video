import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import ResourceFooter from "@/components/resource-footer";
import SampleDownloadForm from "./sample-download-form";

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
          This sample runs the Cloudera / Intel Enterprise Subscription Agreement (EX-10.13, a public SEC filing) through
          Soluqube: a $30,000,000 transaction price over 48 months, split across two performance obligations by relative standalone
          selling price, with the page and verbatim excerpt each figure came from, a revenue schedule that ends at $0.00 deferred, and
          SHA-256 hashes of the source PDF and the workpaper.
        </p>

        {/* Lead Capture Gate */}
        <SampleDownloadForm pdfUrl={PDF} calendlyUrl={CALENDLY} />

        <div className="border border-slate-200 rounded-2xl p-6 mb-10 bg-white">
          <h2 className="text-base font-bold text-slate-900 mb-3">Audit-Grade Verifications in Soluqube Workpapers</h2>
          <ul className="space-y-2.5 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span><strong>Verbatim Clause Fingerprinting:</strong> Every performance obligation attaches the source contract page number and verbatim excerpt.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span><strong>Cent-Level Allocation Tie-Out:</strong> Relative-SSP allocation schedule ends at exactly $0.00 remainder through terminal period absorption.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span><strong>Dual-Standard Support:</strong> Formatted for US GAAP ASC 606 and Ind AS 115 (USD and INR contracts; 18% GST isolated on INR contracts only).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span><strong>Human-in-the-Loop Integrity:</strong> Extracted contract terms are confirmed by a reviewer before schedules are locked and hashed.</span>
            </li>
          </ul>
        </div>
      </main>
      <ResourceFooter />
    </div>
  );
}
