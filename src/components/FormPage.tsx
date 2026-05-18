import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface FormPageProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  children: React.ReactNode;
}

export default function FormPage({
  badge,
  title,
  highlight,
  description,
  children,
}: FormPageProps) {
  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.08),transparent)] pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-10 transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs text-accent font-medium tracking-widest uppercase mb-4 block">
            {badge}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
            {title}
            <br />
            <span className="text-accent">{highlight}</span>
          </h1>
          <p className="text-zinc-400 leading-relaxed">{description}</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
