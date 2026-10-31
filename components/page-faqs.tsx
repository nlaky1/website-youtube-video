import React from "react";
import type { PageFaq } from "@/lib/page-faqs";

export default function PageFaqs({ faqs, heading = "Frequently asked questions" }: { faqs?: PageFaq[]; heading?: string }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-slate-900">{heading}</h2>
      <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
        {faqs.map((f, i) => (
          <div key={i} className="p-4 space-y-1.5">
            <h3 className="font-semibold text-slate-900">{f.question}</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
