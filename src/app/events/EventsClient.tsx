"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { MapPin, Users2, CalendarDays, ArrowUpRight } from "lucide-react";
import type { Event } from "@/lib/backend";

const TYPE_COLORS: Record<string, string> = {
  Hackathon: "#f97316",
  Exhibition: "#3b82f6",
  Conference: "#8b5cf6",
  "Online Challenge": "#10b981",
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function EventsClient({ events }: { events: Event[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeType, setActiveType] = useState("All");

  const types = ["All", ...Array.from(new Set(events.map((e) => e.type))).sort()];
  const filtered = activeType === "All" ? events : events.filter((e) => e.type === activeType);

  return (
    <div ref={ref}>
      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {types.map((type) => {
          const color = TYPE_COLORS[type];
          const isActive = activeType === type;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white shadow-lg"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
              style={
                isActive && color
                  ? { background: `${color}20`, color, border: `1px solid ${color}40`, boxShadow: `0 4px 20px ${color}20` }
                  : isActive
                  ? { background: "rgb(249 115 22 / 0.2)", color: "#f97316", border: "1px solid rgb(249 115 22 / 0.4)" }
                  : {}
              }
            >
              {type}
            </button>
          );
        })}
      </motion.div>

      {/* Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-zinc-600 text-sm mb-8"
      >
        {filtered.length} {filtered.length === 1 ? "event" : "events"}
        {activeType !== "All" && ` · ${activeType}`}
      </motion.p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/2 p-12 text-center">
          <p className="text-zinc-500 text-sm">No events found for this type.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((event, i) => {
            const typeColor = TYPE_COLORS[event.type] || "#f97316";
            return (
              <motion.div key={event.id} custom={i} variants={cardVariant} initial="hidden" animate={isInView ? "show" : "hidden"}>
                <Link
                  href={`/events/${event.id}`}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-card hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 block"
                >
                  {/* Left accent line */}
                  <div
                    className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: typeColor }}
                  />
                  <div className="pl-5">
                    {/* Type + date */}
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
                    <p className="text-zinc-500 text-sm leading-relaxed mb-5 line-clamp-2">
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
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
