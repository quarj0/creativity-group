"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { ArrowRight, GitBranch, MessageSquare } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated floating shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-accent/5 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-accent/5 pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-medium tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to all builders
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95] mb-6">
            Ready to build
            <br />
            <span className="text-accent">something great?</span>
          </h2>

          <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-12">
            Whether you&apos;re a student, engineer, designer, or entrepreneur —
            there&apos;s a place for you in Creativity Group. Come build with us.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => router.push("/join")}
              className="group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-0.5 text-sm w-full sm:w-auto justify-center"
            >
              Join Creativity Group
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all duration-200 text-sm w-full sm:w-auto justify-center"
            >
              <MessageSquare size={15} />
              Get in Touch
            </button>
          </div>

          {/* Secondary links */}
          <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
            <button className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
              <GitBranch size={15} />
              Open source on GitHub
            </button>
            <span className="text-zinc-700">·</span>
            <button className="hover:text-zinc-300 transition-colors">
              Partner with us
            </button>
            <span className="text-zinc-700">·</span>
            <button className="hover:text-zinc-300 transition-colors">
              Sponsor a hackathon
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
