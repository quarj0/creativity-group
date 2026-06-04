"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Users2, Calendar, Search } from "lucide-react";
import type { Project } from "@/lib/backend";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category))).sort()];

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={ref}>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-lg shadow-orange-500/20"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-zinc-600 text-sm mb-8"
      >
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </motion.p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/2 p-12 text-center">
          <p className="text-zinc-500 text-sm">No projects match your search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group relative flex flex-col rounded-2xl border border-white/5 bg-card hover:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 h-full"
              >
                {/* Image area */}
                <div
                  className="relative h-44 overflow-hidden shrink-0"
                  style={{ background: `linear-gradient(135deg, ${project.accent}15 0%, #09090b 100%)` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-6xl font-black tracking-tight opacity-10 select-none"
                      style={{ color: project.accent }}
                    >
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
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
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 leading-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs text-zinc-600 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
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
  );
}
