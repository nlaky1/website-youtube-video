/**
 * Translated stand-alone pages (ASC 606 hubs, soluqube-vs-* comparisons, SSP calculator).
 * The English pages are hand-written TSX, so their translations live as data in data/i18n/<lang>/pages.json
 * and render through components/i18n/localized-landing.tsx. Claims gate: see docs/I18N_LOCKED_TERMS.md.
 */
import type { Metadata } from "next";
import type { PageFaq } from "@/lib/page-faqs";
import { TRANSLATIONS } from "@/data/i18n";
import { LOCALES, hreflangMap, type Locale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/i18n-meta";

/** Page id -> path without the language prefix (same path as the English page). */
export const LANDING_PATHS = {
  "asc-606": "/asc-606",
  "asc-606-vs-ind-as-115": "/asc-606-vs-ind-as-115",
  "soluqube-vs-maxio": "/soluqube-vs-maxio",
  "soluqube-vs-trullion": "/soluqube-vs-trullion",
  "soluqube-vs-klarity": "/soluqube-vs-klarity",
  "soluqube-vs-rightrev": "/soluqube-vs-rightrev",
  "soluqube-vs-leapfin": "/soluqube-vs-leapfin",
  "ssp-allocation-calculator": "/tools/ssp-allocation-calculator",
} as const;
export type LandingId = keyof typeof LANDING_PATHS;

export interface LandingTr {
  title: string;
  description: string;
  breadcrumb: string;
  eyebrow?: string;
  h1: string;
  /** Markdown shown under the H1. */
  lead: string;
  /** Markdown body (GFM tables allowed). Shown after the interactive widget when the page has one. */
  body: string;
  faqs?: PageFaq[];
  cta: { title: string; body: string; label: string; href: string; secondaryLabel?: string; secondaryHref?: string };
  type?: "article" | "website";
}
export interface LandingShared {
  scopeNote: string;
  faqTitle: string;
  englishVersion: string;
  widgetNote: string;
  moreTitle: string;
}

type PagesFile = { _shared: LandingShared } & Partial<Record<LandingId, LandingTr>>;
const P = TRANSLATIONS as unknown as Record<Locale, { pages: PagesFile }>;

export function landingShared(lang: Locale): LandingShared {
  return P[lang].pages._shared;
}

export function getLanding(lang: Locale, id: LandingId): LandingTr | undefined {
  return P[lang]?.pages?.[id];
}

/** Languages that have a translation of this page (for hreflang on the English page and the sitemap). */
export function landingLangs(id: LandingId): Locale[] {
  return LOCALES.filter((l) => Boolean(getLanding(l, id)));
}

/** Translated landing page ids in a language (for the hub and the sitemap). */
export function landingIds(lang: Locale): LandingId[] {
  return (Object.keys(LANDING_PATHS) as LandingId[]).filter((id) => Boolean(getLanding(lang, id)));
}

/** Path ("/asc-606") -> page id, when that path is one of the translated landing pages. */
export function landingIdForPath(path: string): LandingId | undefined {
  return (Object.keys(LANDING_PATHS) as LandingId[]).find((id) => LANDING_PATHS[id] === path);
}

export function landingMetadata(lang: string, id: LandingId): Metadata {
  if (!(LOCALES as readonly string[]).includes(lang)) return {};
  const l = lang as Locale;
  const tr = getLanding(l, id);
  if (!tr) return {};
  return localizedMetadata({
    lang: l,
    path: LANDING_PATHS[id],
    title: tr.title,
    description: tr.description,
    available: landingLangs(id),
    type: tr.type ?? "article",
  });
}

/** `alternates.languages` for the English page at `path` (undefined while it has no translation). */
export function landingHreflang(path: string): Record<string, string> | undefined {
  const id = landingIdForPath(path);
  const langs = id ? landingLangs(id) : [];
  return langs.length ? hreflangMap(path, langs) : undefined;
}
