"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Users2, ArrowUpRight, CalendarDays } from "lucide-react";
import type { Event } from "@/lib/backend";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const TYPE_COLORS: Record<string, string> = {
  Hackathon: "#f97316",
  Exhibition: "#3b82f6",
  Conference: "#8b5cf6",
  "Online Challenge": "#10b981",
};

function EmptyEvents() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-sm text-zinc-500">
      No upcoming events have been published yet.
    </div>
  );
}

export default function Events({ events }: { events: Event[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="events"
      ref={ref}
      className="relative py-32 border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(139,92,246,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs text-[#f97316] font-medium tracking-widest uppercase mb-4 block">
              Upcoming Events
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Mark your calendar.
              <br />
              <span className="text-zinc-500">Something&apos;s always building.</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all"
          >
            View full calendar
            <ArrowUpRight size={14} />
          </motion.button>
        </div>

        {events.length === 0 ? (
          <EmptyEvents />
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {events.map((event, i) => {
              const typeColor = TYPE_COLORS[event.type] || "#f97316";
              return (
                <motion.div
                  key={event.id}
                  custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") e.currentTarget.click(); }}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-card hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                {/* Left accent line */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: typeColor }}
                />

                <div className="pl-5">
                  {/* Type + date row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: `${typeColor}15`,
                        color: typeColor,
                        border: `1px solid ${typeColor}25`,
                      }}
                    >
                      {event.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                      <CalendarDays size={12} />
                      {event.date}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-2 leading-snug group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                    {event.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
                      <MapPin size={12} />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
                      <Users2 size={12} />
                      {event.spots}
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={13} className="text-zinc-300" />
                </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
