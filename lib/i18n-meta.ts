import type { Metadata } from "next";
import { HREFLANG, OG_LOCALE, hreflangMap, localeUrl, type Locale } from "@/lib/i18n";

/** Metadata for a localized page: self-canonical, hreflang to every available variant + English + x-default. */
export function localizedMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  available: readonly Locale[];
  type?: "website" | "article";
}): Metadata {
  const { lang, path, title, description, available, type = "website" } = opts;
  const url = localeUrl(lang, path);
  const languages = hreflangMap(path, available);
  // The page's own language entry points at itself.
  languages[HREFLANG[lang]] = url;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: "Soluqube",
      type,
      locale: OG_LOCALE[lang],
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Soluqube" }],
    },
    twitter: { card: "summary", title, description },
  };
}

