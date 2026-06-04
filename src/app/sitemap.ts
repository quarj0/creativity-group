import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creativitygroup.org";
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/join`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/mentorship`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/sponsorship`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/alumni`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
