import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllEvents } from "@/lib/backend";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.1),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-medium tracking-widest uppercase mb-4 block" style={{ color: "#8b5cf6" }}>
            Calendar
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            Events & Programs.
            <br />
            <span className="text-zinc-500">Something&apos;s always building.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Hackathons, exhibitions, conferences, and online challenges — Creativity Group events are where
            ideas turn into real projects and connections turn into collaborations.
          </p>
        </div>

        {/* Client-side filter + grid */}
        <EventsClient events={events} />
      </div>
    </main>
  );
}
