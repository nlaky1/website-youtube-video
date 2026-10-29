"use client";

import { useState } from "react";

interface SampleDownloadFormProps {
  pdfUrl: string;
  calendlyUrl: string;
}

export default function SampleDownloadForm({ pdfUrl, calendlyUrl }: SampleDownloadFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid business email");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workEmail: email,
          company: "SSP Sample Visitor",
          job_title: "Accounting / Finance Leader",
          info: "Downloaded Cloudera / Intel SEC SSP Sample Workpaper",
        }),
      });
    } catch (err) {
      // Non-blocking: proceed to download even if telemetry network blips
    }

    setLoading(false);
    setSubmitted(true);

    // Trigger instant download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "soluqube-ssp-sample.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
      <div className="max-w-xl">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Get the Audit-Ready Workpaper (.pdf + summary)
        </h2>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          Enter your corporate email to immediately download the sample Cloudera / Intel relative-SSP allocation schedule,
          including clause citations, terminal rounding tie-out, and verification hashes.
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm">
            <p className="font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Workpaper downloaded!
            </p>
            <p className="mt-1 text-xs text-emerald-700">
              Your download started automatically. If it didn&apos;t,{" "}
              <a href={pdfUrl} className="underline font-medium hover:text-emerald-900">
                click here to download directly
              </a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
              {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "Preparing..." : "Download Workpaper"}
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Instant access
          </span>
          <span>•</span>
          <span>No credit card required</span>
          <span>•</span>
          <a href="/pricing" className="text-slate-900 font-medium underline hover:text-slate-700">
            Self-serve tool access from $49/mo
          </a>
          <span>•</span>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 font-medium underline hover:text-slate-700"
          >
            Book 30-min walkthrough
          </a>
        </div>
      </div>
    </div>
  );
}
