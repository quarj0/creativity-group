import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Us",
  description:
    "Partner with Creativity Group to empower the next generation of African innovators. Explore sponsorship opportunities that create lasting impact.",
  openGraph: {
    title: "Sponsor Us | Creativity Group",
    description:
      "Partner with Creativity Group to empower the next generation of African innovators. Explore sponsorship opportunities that create lasting impact.",
  },
};

export default function SponsorshipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
