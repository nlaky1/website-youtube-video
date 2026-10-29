import { GLOSSARY_TERMS, type GlossaryTerm } from "@/data/glossary";
import { ALTERNATIVES_PAGES, VENDORS, type AlternativesPage, type VendorProfile } from "@/data/alternatives";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";
import type { PageFaq } from "@/lib/page-faqs";
import { TRANSLATIONS } from "@/data/i18n";
import { LOCALES, localizeRef, type Locale } from "@/lib/i18n";

/** Only content with a real translation file gets a localized page (no thin or fallback pages). */

interface GlossaryTr {
  term: string;
  title: string;
  description: string;
  definition: string;
  references: { note: string | null }[];
  example: { scenario: string; steps: string[]; result: string };
  mistakes: string[];
  furtherLabels: string[];
  soluqubeNote: string | null;
  faqs: PageFaq[] | null;
}
interface BlogTr {
  title: string;
  subtitle: string;
  excerpt: string;
  definitionAnchor: string;
  readTime: string;
  content: string;
  faqs: PageFaq[] | null;
}
interface AltPageTr {
  title: string;
  description: string;
  intro: string;
  whyLook: string[];
  howToChoose: string[];
  pickFits: string[];
  relatedPostLabel: string | null;
  faqs: PageFaq[] | null;
}
type VendorTr = Pick<VendorProfile, "whatItIs" | "whoFor" | "strengths" | "limits" | "pricing" | "standards" | "ssp">;
interface LangData {
  glossary: Record<string, GlossaryTr>;
  blog: Record<string, BlogTr>;
  alternatives: { pages: Record<string, AltPageTr>; vendors: Record<string, VendorTr> };
}

const T = TRANSLATIONS as unknown as Record<Locale, LangData>;

export type LocalizedGlossaryTerm = Omit<GlossaryTerm, "faqs" | "soluqubeNote"> & { faqs?: PageFaq[]; soluqubeNote?: string };

export function glossarySlugs(lang: Locale): string[] {
  return GLOSSARY_TERMS.filter((t) => T[lang]?.glossary[t.slug]).map((t) => t.slug);
}
export function blogSlugs(lang: Locale): string[] {
  return BLOG_POSTS.filter((p) => T[lang]?.blog[p.slug]).map((p) => p.slug);
}
export function alternativesSlugs(lang: Locale): string[] {
  return ALTERNATIVES_PAGES.filter((p) => T[lang]?.alternatives.pages[p.slug]).map((p) => p.slug);
}

/** Languages in which a given English page has a translation (for hreflang on the English page). */
export function langsFor(kind: "glossary" | "blog" | "alternatives", slug: string): Locale[] {
  return LOCALES.filter((l) => {
    const d = T[l];
    if (!d) return false;
    return kind === "alternatives" ? Boolean(d.alternatives.pages[slug]) : Boolean(d[kind][slug]);
  });
}

export function getLocalizedGlossaryTerm(lang: Locale, slug: string): LocalizedGlossaryTerm | undefined {
  const en = GLOSSARY_TERMS.find((t) => t.slug === slug);
  const tr = T[lang]?.glossary[slug];
  if (!en || !tr) return undefined;
  return {
    slug,
    term: tr.term,
    title: tr.title,
    description: tr.description,
    definition: tr.definition,
    references: en.references.map((r, i) => ({
      standard: r.standard,
      ref: localizeRef(lang, r.ref),
      note: tr.references[i]?.note ?? undefined,
    })),
    example: tr.example,
    mistakes: tr.mistakes,
    related: en.related.filter((s) => T[lang].glossary[s]),
    further: en.further.map((f, i) => ({ href: f.href, label: tr.furtherLabels[i] ?? f.label })),
    soluqubeNote: tr.soluqubeNote ?? undefined,
    faqs: tr.faqs ?? undefined,
  };
}

export function getLocalizedBlogPost(lang: Locale, slug: string): BlogPost | undefined {
  const en = BLOG_POSTS.find((p) => p.slug === slug);
  const tr = T[lang]?.blog[slug];
  if (!en || !tr) return undefined;
  return {
    ...en,
    title: tr.title,
    subtitle: tr.subtitle,
    excerpt: tr.excerpt,
    definitionAnchor: tr.definitionAnchor,
    readTime: tr.readTime,
    content: tr.content,
    toc: [],
    faqs: tr.faqs ?? undefined,
  };
}

export interface LocalizedAltPage {
  page: AlternativesPage;
  relatedPostLabel: string | null;
  subject: VendorProfile;
  picks: { vendor: string; fit: string; profile: VendorProfile }[];
}

function localVendor(lang: Locale, key: string): VendorProfile | undefined {
  const en = VENDORS[key];
  if (!en) return undefined;
  const tr = T[lang].alternatives.vendors[key];
  return tr ? { ...en, ...tr } : en;
}

export function getLocalizedAlternativesPage(lang: Locale, slug: string): LocalizedAltPage | undefined {
  const en = ALTERNATIVES_PAGES.find((p) => p.slug === slug);
  const tr = T[lang]?.alternatives.pages[slug];
  if (!en || !tr) return undefined;
  const subject = localVendor(lang, en.subject);
  if (!subject) return undefined;
  const picks = en.picks
    .map((p, i) => ({ vendor: p.vendor, fit: tr.pickFits[i] ?? p.fit, profile: localVendor(lang, p.vendor) as VendorProfile }))
    .filter((x) => x.profile);
  const page: AlternativesPage = {
    ...en,
    title: tr.title,
    description: tr.description,
    intro: tr.intro,
    whyLook: tr.whyLook,
    howToChoose: tr.howToChoose,
    faqs: tr.faqs ?? undefined,
  };
  return { page, relatedPostLabel: tr.relatedPostLabel, subject, picks };
}

/**
 * Point an internal English link at its translation when one exists in this language;
 * otherwise leave it on the English page. External links are returned unchanged.
 */
export function localizeHref(lang: Locale, href: string): string {
  const local = href.replace(/^https:\/\/soluqube\.com(?=\/|$)/, "") || "/";
  if (!local.startsWith("/")) return href;
  const [pathPart, ...hashParts] = local.split("#");
  const hash = hashParts.length ? `#${hashParts.join("#")}` : "";
  if (/\.(csv|json|pdf|xlsx|zip|txt)$/i.test(pathPart)) return href;
  let m: RegExpMatchArray | null;
  if ((m = pathPart.match(/^\/glossary\/([^/]+)$/)) && glossarySlugs(lang).includes(m[1])) return `/${lang}${pathPart}${hash}`;
  if ((m = pathPart.match(/^\/blog\/([^/]+)$/)) && blogSlugs(lang).includes(m[1])) return `/${lang}${pathPart}${hash}`;
  if ((m = pathPart.match(/^\/alternatives\/([^/]+)$/)) && alternativesSlugs(lang).includes(m[1])) return `/${lang}${pathPart}${hash}`;
  if (pathPart === "/glossary" || pathPart === "/blog" || pathPart === "/alternatives") return `/${lang}${pathPart}${hash}`;
  if (pathPart === "/") return `/${lang}${hash}`;
  return local;
}

/** Rewrite internal markdown links in translated article text to their localized URLs. */
export function localizeMarkdownLinks(lang: Locale, md: string): string {
  return md.replace(/\]\(([^)\s]+)\)/g, (_all, href: string) => `](${localizeHref(lang, href)})`);
}
