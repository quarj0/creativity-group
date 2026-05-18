"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import FormPage from "@/components/FormPage";

const SUBJECTS = [
  "General Enquiry",
  "Partnership Opportunity",
  "Media & Press",
  "Event Collaboration",
  "Technical Support",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
        badge="Contact"
        title="Message"
        highlight="sent."
        description=""
      >
        <div className="text-center py-8">
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h2 className="text-white font-semibold text-xl mb-2">Got it!</h2>
          <p className="text-zinc-400">{message}</p>
        </div>
      </FormPage>
    );
  }

  return (
    <FormPage
      badge="Get in Touch"
      title="Contact"
      highlight="Creativity Group."
      description="Have a question, idea, or proposal? We'd love to hear from you. Fill out the form and we'll respond within 24 hours."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Your Name *"
            placeholder="Ama Darko"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          />
          <Field
            label="Email Address *"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          />
        </div>

        <SelectField
          label="Subject *"
          value={form.subject}
          onChange={(v) => setForm((p) => ({ ...p, subject: v }))}
          options={SUBJECTS}
        />

        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            rows={6}
            placeholder="Tell us what's on your mind…"
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
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
          {status === "loading" ? "Sending…" : "Send Message"}
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
          Select a subject…
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
