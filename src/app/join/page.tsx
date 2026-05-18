"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import FormPage from "@/components/FormPage";

const INTERESTS = [
  "STEM Education",
  "Robotics",
  "Software Engineering",
  "Maker Culture",
  "Entrepreneurship",
  "AI & Machine Learning",
  "IoT & Electronics",
  "Research & Prototyping",
];

const ROLES = [
  "Undergraduate Student",
  "Postgraduate Student",
  "Recent Graduate",
  "Working Professional",
  "Educator / Researcher",
  "Entrepreneur",
];

export default function JoinPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    institution: "",
    role: "",
    interests: [] as string[],
    intro: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/join", {
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
        badge="Membership"
        title="Application"
        highlight="received."
        description=""
      >
        <div className="text-center py-8">
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h2 className="text-white font-semibold text-xl mb-2">You&apos;re in!</h2>
          <p className="text-zinc-400">{message}</p>
        </div>
      </FormPage>
    );
  }

  return (
    <FormPage
      badge="Community"
      title="Join Creativity"
      highlight="Group."
      description="Become part of Ghana's most active innovation and maker community. Fill in the form below and we'll reach out within 48 hours."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Full Name *"
            placeholder="Kwame Mensah"
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

        {/* Institution + Role */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="University / Institution *"
            placeholder="KNUST, UG, Ashesi…"
            value={form.institution}
            onChange={(v) => setForm((p) => ({ ...p, institution: v }))}
          />
          <SelectField
            label="Current Role *"
            value={form.role}
            onChange={(v) => setForm((p) => ({ ...p, role: v }))}
            options={ROLES}
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-3">
            Areas of Interest
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => {
              const active = form.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
                    active
                      ? "bg-accent/15 border-accent/40 text-accent"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Intro */}
        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-2">
            Brief Introduction
          </label>
          <textarea
            rows={4}
            placeholder="Tell us a little about yourself, what you're working on, and why you want to join CG…"
            value={form.intro}
            onChange={(e) => setForm((p) => ({ ...p, intro: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
        </div>

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
          Select one…
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
