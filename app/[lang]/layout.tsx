import React from "react";
import { notFound } from "next/navigation";
import { HREFLANG, LOCALES, isLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** The root layout is shared with English, so the language is declared on this subtree and on <html> at load. */
export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const code = HREFLANG[params.lang];
  return (
    <div lang={code}>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(code)};` }} />
      {children}
    </div>
  );
}
