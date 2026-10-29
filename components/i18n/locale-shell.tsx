import React from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { LANG_NAME, STRINGS, type Locale } from "@/lib/i18n";

interface ShellProps {
  lang: Locale;
  /** Path of this page without the language prefix ("/" for the hub); used by the language switcher. */
  path: string;
  /** Languages in which this same page exists (including this one). */
  available: readonly Locale[];
}

function Switcher({ lang, path, available }: ShellProps) {
  const s = STRINGS[lang];
  const enPath = path === "/" ? "/" : path;
  return (
    <nav aria-label={s.language} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <span className="text-slate-500">{s.language}:</span>
      <Link href={enPath} hrefLang="en" className="text-slate-600 hover:text-slate-950">English</Link>
      {available.map((l) =>
        l === lang ? (
          <span key={l} className="font-semibold text-slate-900" aria-current="true">{LANG_NAME[l]}</span>
        ) : (
          <Link key={l} href={`/${l}${path === "/" ? "" : path}`} hrefLang={l} className="text-slate-600 hover:text-slate-950">
            {LANG_NAME[l]}
          </Link>
        ),
      )}
    </nav>
  );
}

export function LocaleHeader(props: ShellProps) {
  const { lang } = props;
  const s = STRINGS[lang];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </span>
          <span className="font-bold text-slate-900">Soluqube</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-700">
          <Link href={`/${lang}/glossary`} className="hover:text-slate-950">{s.nav.glossary}</Link>
          <Link href={`/${lang}/blog`} className="hover:text-slate-950">{s.nav.blog}</Link>
          <Link href={`/${lang}/alternatives`} className="hover:text-slate-950">{s.nav.alternatives}</Link>
          <Link href="/design-partners" className="hover:text-slate-950">{s.nav.designPartners}</Link>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-2">
        <Switcher {...props} />
      </div>
    </header>
  );
}

export function LocaleFooter({ lang }: { lang: Locale }) {
  const s = STRINGS[lang];
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-3">
        <div>
          <span className="font-bold text-slate-900">Soluqube</span> | {s.tagline}
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-600">
          <Link href={`/${lang}`} className="hover:text-slate-950">{s.nav.home}</Link>
          <Link href={`/${lang}/glossary`} className="hover:text-slate-950">{s.nav.glossary}</Link>
          <Link href={`/${lang}/blog`} className="hover:text-slate-950">{s.nav.blog}</Link>
          <Link href={`/${lang}/alternatives`} className="hover:text-slate-950">{s.nav.alternatives}</Link>
          <Link href="/design-partners" className="hover:text-slate-950">{s.nav.designPartners}</Link>
          <Link href="/contact" className="hover:text-slate-950">{s.nav.contact}</Link>
          <Link href="/privacy" className="hover:text-slate-950">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-950">Terms</Link>
          <Link href="/security" className="hover:text-slate-950">Security</Link>
        </nav>
        <p>{s.legalNote}</p>
      </div>
    </footer>
  );
}
