import Link from "next/link";
import { ArrowLeft, MapPin, GraduationCap } from "lucide-react";

const UNIVERSITIES = [
  {
    id: 1,
    name: "KNUST",
    fullName: "Kwame Nkrumah University of Science and Technology",
    location: "Kumasi, Ashanti Region",
    focus: "Engineering, Science & Technology",
    accent: "#f97316",
  },
  {
    id: 2,
    name: "UENR",
    fullName: "University of Energy and Natural Resources",
    location: "Sunyani, Bono Region",
    focus: "Energy, Natural Resources & Environment",
    accent: "#10b981",
  },
  {
    id: 3,
    name: "KsTU",
    fullName: "Kumasi Technical University",
    location: "Kumasi, Ashanti Region",
    focus: "Technical & Applied Sciences",
    accent: "#3b82f6",
  },
  {
    id: 4,
    name: "AAMUSTED",
    fullName: "Akenten Appiah-Menka University of Skills Training and Entrepreneurial Development",
    location: "Kumasi & Mampong, Ashanti Region",
    focus: "Skills Training & Entrepreneurship",
    accent: "#8b5cf6",
  },
  {
    id: 5,
    name: "University of Ghana",
    fullName: "University of Ghana",
    location: "Legon, Greater Accra Region",
    focus: "Multi-disciplinary Research & Innovation",
    accent: "#ef4444",
  },
  {
    id: 6,
    name: "University of Cape Coast",
    fullName: "University of Cape Coast",
    location: "Cape Coast, Central Region",
    focus: "Education, Science & Technology",
    accent: "#f59e0b",
  },
];

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.08),transparent)] pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-10 transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs text-accent font-medium tracking-widest uppercase mb-4 block">
            Alumni Network
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
            Our Campus
            <br />
            <span className="text-accent">Communities.</span>
          </h1>
          <p className="text-zinc-400 leading-relaxed max-w-2xl">
            Creativity Group is active across six leading Ghanaian universities.
            Our alumni and active chapters are making an impact from Kumasi to
            Cape Coast — building Africa&apos;s next generation of innovators.
          </p>
        </div>

        {/* University cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {UNIVERSITIES.map((uni) => (
            <div
              key={uni.id}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              {/* Accent bar */}
              <div
                className="h-1 w-10 rounded-full mb-5"
                style={{ backgroundColor: uni.accent }}
              />

              <div className="mb-1">
                <span
                  className="text-lg font-bold"
                  style={{ color: uni.accent }}
                >
                  {uni.name}
                </span>
              </div>
              <p className="text-zinc-300 text-sm font-medium leading-snug mb-4">
                {uni.fullName}
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-zinc-500">
                  <MapPin size={12} className="mt-0.5 shrink-0" />
                  {uni.location}
                </div>
                <div className="flex items-start gap-2 text-xs text-zinc-500">
                  <GraduationCap size={12} className="mt-0.5 shrink-0" />
                  {uni.focus}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
          <h2 className="text-white font-bold text-xl mb-2">
            Are you an alumnus or active member?
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            Connect with fellow CG members and stay plugged into opportunities,
            events, and the broader community.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 text-sm"
          >
            Join the Network
          </Link>
        </div>
      </div>
    </main>
  );
}
