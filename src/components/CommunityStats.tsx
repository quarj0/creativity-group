"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { COMMUNITY_STATS } from "@/lib/data";

function useCounter(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatCard({
  stat,
  active,
  index,
}: {
  stat: (typeof COMMUNITY_STATS)[number];
  active: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, 1800, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors duration-300"
    >
      <div className="text-5xl lg:text-6xl font-black text-white tabular-nums tracking-tight">
        {count.toLocaleString()}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="mt-3 text-sm text-zinc-500 font-medium">{stat.label}</div>
    </motion.div>
  );
}

export default function CommunityStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="community"
      ref={ref}
      className="relative py-32 border-t border-white/5"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(249,115,22,0.06),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-accent font-medium tracking-widest uppercase mb-4 block">
            By the Numbers
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            A community that ships.
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
            From students to founders — the Creativity Group network keeps
            growing, building, and making impact across Ghana and beyond.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {COMMUNITY_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={isInView} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-600 text-sm italic">
            &ldquo;The best time to build was yesterday. The second best time is
            right now.&rdquo;
          </p>
          <p className="text-zinc-700 text-xs mt-2">— CG Community Motto</p>
        </motion.div>
      </div>
    </section>
  );
}
