import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, MapPin, Users2, CalendarDays, Clock } from "lucide-react";
import { getEvent, getAllEvents } from "@/lib/backend";

export const runtime = "edge";

const TYPE_COLORS: Record<string, string> = {
  Hackathon: "#f97316",
  Exhibition: "#3b82f6",
  Conference: "#8b5cf6",
  "Online Challenge": "#10b981",
};

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(parseInt(id));
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
    openGraph: { title: `${event.title} | Creativity Group`, description: event.description },
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((e) => ({ id: String(e.id) }));
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEvent(parseInt(id));
  if (!event) notFound();

  const typeColor = TYPE_COLORS[event.type] || "#f97316";

  return (
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* Background tinted with event type color */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${typeColor}, transparent)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Back */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          All events
        </Link>

        {/* Type badge */}
        <div className="mb-6">
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              background: `${typeColor}20`,
              color: typeColor,
              border: `1px solid ${typeColor}30`,
            }}
          >
            {event.type}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-10">
          {event.title}
        </h1>

        {/* Meta cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl border border-white/5 bg-card">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest mb-2">
              <CalendarDays size={12} />
              Date
            </div>
            <p className="text-white font-medium text-sm">{event.date}</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/5 bg-card">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest mb-2">
              <MapPin size={12} />
              Location
            </div>
            <p className="text-white font-medium text-sm">{event.location}</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/5 bg-card">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest mb-2">
              <Users2 size={12} />
              Spots
            </div>
            <p className="font-medium text-sm" style={{ color: typeColor }}>
              {event.spots}
            </p>
          </div>
        </div>

        {/* Visual accent bar */}
        <div
          className="w-full h-px mb-12 opacity-30"
          style={{ background: `linear-gradient(90deg, ${typeColor}, transparent)` }}
        />

        {/* Description */}
        <div className="mb-14">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-5">About this event</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">{event.description}</p>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl border border-white/5 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} style={{ color: typeColor }} />
                <span className="text-white font-semibold">Ready to participate?</span>
              </div>
              <p className="text-zinc-500 text-sm">
                Join the Creativity Group community to get notified about upcoming events and secure your spot.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200"
              >
                Contact us
              </Link>
              <Link
                href="/join"
                className="px-5 py-2.5 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg"
                style={{
                  background: typeColor,
                  boxShadow: `0 0 0 0 ${typeColor}40`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 24px ${typeColor}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0 ${typeColor}40`)}
              >
                Join the community
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-white/5 mt-16 pt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to all events
          </Link>
        </div>
      </div>
    </main>
  );
}
