import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects } from "@/lib/backend";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.1),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="text-xs text-accent font-medium tracking-widest uppercase mb-4 block">
            Community Work
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            All Projects.
            <br />
            <span className="text-zinc-500">Built by our members.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            From robotics and embedded systems to software tools and social innovation — every project here
            was built by Creativity Group members solving real problems.
          </p>
        </div>

        {/* Client-side filter + grid */}
        <ProjectsClient projects={projects} />
      </div>
    </main>
  );
}
