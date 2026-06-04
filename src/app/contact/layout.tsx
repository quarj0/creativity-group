import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Creativity Group. We'd love to hear from you — whether you're a student, partner, sponsor, or just curious about our work.",
  openGraph: {
    title: "Contact Us | Creativity Group",
    description:
      "Get in touch with Creativity Group. We'd love to hear from you — whether you're a student, partner, sponsor, or just curious about our work.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
