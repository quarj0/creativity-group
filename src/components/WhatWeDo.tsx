"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  Wrench,
  FlaskConical,
  TrendingUp,
  Bot,
  Code2,
  Users,
  Microscope,
} from "lucide-react";
import type { Program } from "@/lib/backend";

const ICONS: Record<string, React.ElementType> = {
  Cpu,
  Wrench,
  FlaskConical,
  TrendingUp,
  Bot,
  Code2,
  Users,
  Microscope,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.07 } },
};

function EmptyPrograms() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-sm text-zinc-500">
      No programs have been published yet.
    </div>
  );
}

export default function WhatWeDo({ programs }: { programs: Program[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="programs"
      ref={ref}
      className="relative py-32 border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_100%_50%,rgba(59,130,246,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="max-w-xl mb-16"
        >
          <span className="text-xs text-[#f97316] font-medium tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            Eight pillars.
            <br />
            <span className="text-zinc-500">One community.</span>
          </h2>
        </motion.div>

        {programs.length === 0 ? (
          <EmptyPrograms />
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {programs.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.div
                  key={item.id ?? item.title}
                  variants={fadeUp}
                  className={`group relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${item.color} hover:border-white/10 transition-all duration-300 cursor-default overflow-hidden`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.02] rounded-2xl" />

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {Icon && <Icon size={20} className="text-zinc-300" />}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
