import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://soluqube.com";
  const now = new Date();

  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: `${baseUrl}/`,
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
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: "https://client.soluqube.com/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://app.soluqube.com/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
