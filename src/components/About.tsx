"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Lightbulb, Zap, Target } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We build solutions to African problems with African ingenuity. Every project starts with a real challenge.",
  },
  {
    icon: Zap,
    title: "Hands-On Learning",
    desc: "No lectures, just labs. We learn by building, breaking, and shipping real projects.",
  },
  {
    icon: Globe,
    title: "Community-Driven",
    desc: "We grow through collaboration, mentorship, and shared access to opportunity.",
  },
  {
    icon: Target,
    title: "Impact-Focused",
    desc: "We measure success in problems solved, startups launched, and careers built.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(249,115,22,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="text-xs text-accent font-medium tracking-widest uppercase">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Where African ambition
              <br />
              <span className="text-accent">meets engineering.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg leading-relaxed mb-6"
            >
              Creativity Group started as a small circle of curious students who
              wanted to build things that mattered. Today we&apos;re a movement —
              spanning campuses, disciplines, and industries across Ghana.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg leading-relaxed mb-10"
            >
              We are makers, developers, roboticists, entrepreneurs, and
              dreamers united by a single belief: that Africa doesn&apos;t just
              consume technology — it builds it.
            </motion.p>

            <motion.div variants={fadeUp} className="h-px w-24 bg-accent/40" />
          </motion.div>

          {/* Right — pillars grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className="group p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
