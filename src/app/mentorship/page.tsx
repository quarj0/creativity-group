"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import FormPage from "@/components/FormPage";

const AREAS = [
  "Software Engineering",
  "Hardware & Electronics",
  "Robotics & Embedded Systems",
  "Product Design / UX",
  "Entrepreneurship & Startups",
  "AI & Machine Learning",
  "STEM Education",
  "Research & Academia",
  "Career Development",
];

export default function MentorshipPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    institution: "",
    currentRole: "",
    area: "",
    goals: "",
    linkedin: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message);
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <FormPage
        badge="Mentorship"
        title="Application"
        highlight="submitted."
        description=""
      >
        <div className="text-center py-8">
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h2 className="text-white font-semibold text-xl mb-2">We&apos;ve got your application!</h2>
          <p className="text-zinc-400">{message}</p>
        </div>
      </FormPage>
    );
  }

  return (
    <FormPage
      badge="Mentorship Programme"
      title="Apply for"
      highlight="Mentorship."
      description="Get matched with an experienced mentor in your area of interest. We pair students and early-career professionals with industry practitioners and researchers."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Full Name *"
            placeholder="Kofi Boateng"
            value={form.fullName}
            onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
          />
          <Field
            label="Email Address *"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="University / Institution"
            placeholder="KNUST, UG, Ashesi…"
            value={form.institution}
            onChange={(v) => setForm((p) => ({ ...p, institution: v }))}
          />
          <Field
            label="Current Role *"
            placeholder="e.g. 3rd Year CS Student"
            value={form.currentRole}
            onChange={(v) => setForm((p) => ({ ...p, currentRole: v }))}
          />
        </div>

        <SelectField
          label="Area Seeking Mentorship *"
          value={form.area}
          onChange={(v) => setForm((p) => ({ ...p, area: v }))}
          options={AREAS}
        />

        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-2">
            Goals & What You Hope to Gain *
          </label>
          <textarea
            rows={5}
            placeholder="Describe what you're hoping to achieve through mentorship and what specific challenges you're facing right now…"
            value={form.goals}
            onChange={(e) => setForm((p) => ({ ...p, goals: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
        </div>

        <Field
          label="LinkedIn Profile (optional)"
          placeholder="https://linkedin.com/in/yourprofile"
          value={form.linkedin}
          onChange={(v) => setForm((p) => ({ ...p, linkedin: v }))}
        />

        {status === "error" && (
          <p className="text-red-400 text-sm">{message}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          {status === "loading" ? "Submitting…" : "Submit Application"}
        </button>
      </form>
    </FormPage>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-zinc-300 text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-zinc-300 text-sm font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
        style={{ color: value ? "white" : "#52525b" }}
      >
        <option value="" disabled>
          Select an area…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#18181b] text-white">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
