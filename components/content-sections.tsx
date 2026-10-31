import React from "react";
import Link from "next/link";
import type { ContentLink, ContentSection } from "@/lib/content-sections";

function AnyLink({ l }: { l: ContentLink }) {
  const cls = "text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-900";
  return l.href.startsWith("http") ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {l.label}
    </a>
  ) : (
    <Link href={l.href} className={cls}>
      {l.label}
    </Link>
  );
}

export default function ContentSections({ sections }: { sections?: ContentSection[] }) {
  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections.map((s, i) => (
        <section key={i} className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
          {s.paragraphs?.map((p, j) => (
            <p key={j} className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700 marker:text-emerald-600">
              {s.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          )}
          {s.table && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    {s.table.headers.map((h, j) => (
                      <th key={j} className="p-3 font-semibold text-slate-900 border-b border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((r, j) => (
                    <tr key={j} className="align-top">
                      {r.map((c, k) => (
                        <td key={k} className={`p-3 border-b border-slate-100 ${k === 0 ? "font-medium text-slate-900" : "text-slate-700"}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.note && <p className="text-xs text-slate-500">{s.note}</p>}
          {s.links && s.links.length > 0 && (
            <ul className="space-y-1.5 text-sm">
              {s.links.map((l) => (
                <li key={l.href}>
                  <AnyLink l={l} />
                </li>
              ))}
            </ul>
          )}
          {s.sources && s.sources.length > 0 && (
            <p className="text-xs text-slate-500">
              Source{s.sources.length > 1 ? "s" : ""}:{" "}
              {s.sources.map((src, j) => (
                <React.Fragment key={src.href}>
                  {j > 0 ? "; " : null}
                  <a href={src.href} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
                    {src.label}
                  </a>
                </React.Fragment>
              ))}
            </p>
          )}
        </section>
      ))}
    </>
  );
}
