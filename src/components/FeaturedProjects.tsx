"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Users2, Calendar } from "lucide-react";
import type { Project } from "@/lib/backend";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function EmptyProjects() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-sm text-zinc-500">
      No featured projects have been published yet.
    </div>
  );
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(249,115,22,0.03),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs text-accent font-medium tracking-widest uppercase mb-4 block">
              Featured Projects
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Built by our community.
              <br />
              <span className="text-zinc-500">Solving real problems.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="shrink-0">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              View all projects
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {projects.length === 0 ? (
          <EmptyProjects />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div key={project.id} custom={i} variants={cardVariant} initial="hidden" animate={isInView ? "show" : "hidden"}>
              <Link
                href={`/projects/${project.id}`}
                className="group relative flex flex-col rounded-2xl border border-white/5 bg-card hover:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
              {/* Placeholder image area */}
              <div
                className="relative h-44 overflow-hidden shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}15 0%, #09090b 100%)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="text-6xl font-black tracking-tight opacity-10 select-none"
                    style={{ color: project.accent }}
                  >
                    {project.title.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: `${project.accent}20`,
                      color: project.accent,
                      border: `1px solid ${project.accent}30`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                {/* Arrow icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-white font-semibold text-lg mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Users2 size={12} />
                    {project.team}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <Calendar size={12} />
                    {project.year}
                  </div>
                </div>
              </div>
              </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
