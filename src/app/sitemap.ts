import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => new URL(path, SITE_URL).toString();

  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/download"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    // /checkout is intentionally excluded — transactional, noindex.
  ];
}
