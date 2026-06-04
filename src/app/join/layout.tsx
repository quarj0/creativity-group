import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Community",
  description:
    "Become part of Creativity Group — Ghana's leading innovation and maker community for young African technologists, engineers, and entrepreneurs.",
  openGraph: {
    title: "Join the Community | Creativity Group",
    description:
      "Become part of Creativity Group — Ghana's leading innovation and maker community for young African technologists, engineers, and entrepreneurs.",
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
