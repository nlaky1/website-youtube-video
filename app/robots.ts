import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "cohere-ai",
          "Googlebot",
          "Bingbot",
        ],
        allow: [
          "/",
          "/asc-606",
          "/asc-606-vs-ind-as-115",
          "/audit",
          "/blog",
          "/pricing",
          "/schemas/",
          "/llms.txt",
          "/llms-full.txt",
        ],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://soluqube.com/sitemap.xml",
  };
}
