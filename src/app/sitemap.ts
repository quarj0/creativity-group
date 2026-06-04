import type { MetadataRoute } from "next";
import { getAllProjects, getAllEvents } from "@/lib/backend";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creativitygroup.org";
  const now = new Date();

  const [projects, events] = await Promise.all([
    getAllProjects().catch(() => []),
    getAllEvents().catch(() => []),
  ]);

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/join`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/mentorship`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/sponsorship`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/alumni`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...events.map((e) => ({
      url: `${siteUrl}/events/${e.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
