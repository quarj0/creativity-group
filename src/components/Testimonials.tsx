"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  cohort: string;
  quote: string;
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const AVATAR_COLORS = ["#f97316", "#3b82f6", "#8b5cf6", "#10b981"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(59,130,246,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-xl mb-16"
        >
          <span className="text-xs text-[#f97316] font-medium tracking-widest uppercase mb-4 block">
            Community Voices
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Hear it from
            <br />
            <span className="text-zinc-500">the builders.</span>
          </h2>
        </motion.div>

        {testimonials.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-sm text-zinc-500">
            Testimonials have not been published yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="relative group p-8 rounded-2xl border border-white/5 bg-[#18181b] hover:border-white/10 transition-all duration-300"
              >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={40} className="text-[#f97316]" />
              </div>

              {/* Quote text */}
              <p className="text-zinc-300 text-base leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">{t.role}</div>
                  <div className="text-zinc-600 text-xs">{t.cohort}</div>
                </div>
              </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
