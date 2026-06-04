import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creativity Group — Building Africa's Next Generation of Innovators",
  description:
    "Creativity Group is a Ghana-based innovation and maker community empowering young Africans through technology, STEM, engineering, and entrepreneurship.",
  keywords: [
    "Creativity Group",
    "Ghana innovation",
    "STEM Africa",
    "maker community",
    "African entrepreneurs",
    "robotics Ghana",
    "tech community Ghana",
  ],
  openGraph: {
    title: "Creativity Group — Africa's Innovation & Maker Community",
    description:
      "Empowering the next generation of African innovators, makers, engineers, and entrepreneurs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-white antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
