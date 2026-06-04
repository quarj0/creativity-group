import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Users2, Calendar, Tag } from "lucide-react";
import { getProject, getAllProjects } from "@/lib/backend";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(parseInt(id));
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: `${project.title} | Creativity Group`, description: project.description },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ id: String(p.id) }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(parseInt(id));
  if (!project) notFound();

  return (
    <main className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* Hero gradient using project accent */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${project.accent}, transparent)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          All projects
        </Link>

        {/* Category + meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              background: `${project.accent}20`,
              color: project.accent,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {project.category}
          </span>
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Calendar size={12} />
            {project.year}
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Users2 size={12} />
            {project.team}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-8">
          {project.title}
        </h1>

        {/* Visual placeholder */}
        <div
          className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden mb-12 border border-white/5"
          style={{ background: `linear-gradient(135deg, ${project.accent}15 0%, #09090b 100%)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[10rem] font-black tracking-tight opacity-10 select-none leading-none"
              style={{ color: project.accent }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
          {/* Accent bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40"
            style={{ background: project.accent }}
          />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">About</h2>
            <p className="text-zinc-300 text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tags */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-widest mb-3">
                <Tag size={12} />
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Team */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-widest mb-3">
                <Users2 size={12} />
                Team
              </div>
              <p className="text-zinc-300 text-sm">{project.team}</p>
            </div>

            {/* Year */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-widest mb-3">
                <Calendar size={12} />
                Year
              </div>
              <p className="text-zinc-300 text-sm">{project.year}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mt-16 pt-10 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to all projects
          </Link>
          <Link
            href="/join"
            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Join the community
          </Link>
        </div>
      </div>
    </main>
  );
}
