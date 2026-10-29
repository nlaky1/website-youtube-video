import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";
import { GLOSSARY_TERMS } from "@/data/glossary";
import { ALTERNATIVES_PAGES } from "@/data/alternatives";
import { LOCALES, hreflangMap, localeUrl } from "@/lib/i18n";
import { alternativesSlugs, blogSlugs, glossarySlugs, langsFor } from "@/lib/i18n-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://soluqube.com";
  const now = new Date();

  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    ...(langsFor("blog", post.slug).length ? { alternates: { languages: hreflangMap(`/blog/${post.slug}`, langsFor("blog", post.slug)) } } : {}),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const glossaryUrls: MetadataRoute.Sitemap = GLOSSARY_TERMS.map((t) => ({
    url: `${baseUrl}/glossary/${t.slug}`,
    ...(langsFor("glossary", t.slug).length ? { alternates: { languages: hreflangMap(`/glossary/${t.slug}`, langsFor("glossary", t.slug)) } } : {}),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const alternativesUrls: MetadataRoute.Sitemap = ALTERNATIVES_PAGES.map((p) => ({
    url: `${baseUrl}/alternatives/${p.slug}`,
    ...(langsFor("alternatives", p.slug).length ? { alternates: { languages: hreflangMap(`/alternatives/${p.slug}`, langsFor("alternatives", p.slug)) } } : {}),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Multilingual wave 1: one entry per translated page, each listing every variant (reciprocal hreflang).
  const localized: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => {
    const entry = (path: string, priority: number) => ({
      url: localeUrl(lang, path),
      alternates: { languages: hreflangMap(path, path === "/" || /^\/(glossary|blog|alternatives)$/.test(path) ? LOCALES : langsFor(path.split("/")[1] as "glossary" | "blog" | "alternatives", path.split("/")[2])) },
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    });
    return [
      entry("/", 0.8),
      entry("/glossary", 0.6),
      entry("/blog", 0.6),
      entry("/alternatives", 0.6),
      ...glossarySlugs(lang).map((slug) => entry(`/glossary/${slug}`, 0.5)),
      ...blogSlugs(lang).map((slug) => entry(`/blog/${slug}`, 0.55)),
      ...alternativesSlugs(lang).map((slug) => entry(`/alternatives/${slug}`, 0.55)),
    ];
  });

  return [
    {
      url: `${baseUrl}/`,
      alternates: { languages: hreflangMap("/", LOCALES) },
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/asc-606`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/asc-606-vs-ind-as-115`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluqube-vs-maxio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/soluqube-vs-trullion`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluqube-vs-klarity`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluqube-vs-rightrev`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soluqube-vs-leapfin`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/design-partners`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/ssp-allocation-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/book-demo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogUrls,
    ...glossaryUrls,
    ...alternativesUrls,
    ...localized,
  ];
}
