import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all projects built by the Creativity Group community — from robotics and embedded systems to software, AI, and social innovation.",
  openGraph: {
    title: "Projects | Creativity Group",
    description:
      "Explore all projects built by the Creativity Group community — from robotics and embedded systems to software, AI, and social innovation.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
