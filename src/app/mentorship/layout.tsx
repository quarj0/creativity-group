import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorship Program",
  description:
    "Apply for Creativity Group's mentorship program and connect with experienced innovators, engineers, and entrepreneurs who can guide your journey.",
  openGraph: {
    title: "Mentorship Program | Creativity Group",
    description:
      "Apply for Creativity Group's mentorship program and connect with experienced innovators, engineers, and entrepreneurs who can guide your journey.",
  },
};

export default function MentorshipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
