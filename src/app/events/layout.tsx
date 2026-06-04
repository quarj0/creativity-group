import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Stay up to date with Creativity Group events — hackathons, exhibitions, conferences, and online challenges happening across Ghana.",
  openGraph: {
    title: "Events | Creativity Group",
    description:
      "Stay up to date with Creativity Group events — hackathons, exhibitions, conferences, and online challenges happening across Ghana.",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
