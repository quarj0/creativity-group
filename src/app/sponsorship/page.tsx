"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import FormPage from "@/components/FormPage";

const INTERESTS = [
  "CG Hackathon",
  "Maker Faire Ghana",
  "STEM Workshops",
  "Robotics Programme",
  "Annual Tech Summit",
  "Student Innovation Fund",
  "Community Labs Equipment",
  "General / Open Sponsorship",
];

const BUDGETS = [
  "Under GHS 5,000",
  "GHS 5,000 – 20,000",
  "GHS 20,000 – 50,000",
  "GHS 50,000 – 100,000",
  "Above GHS 100,000",
  "Prefer to discuss",
];

export default function SponsorshipPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    interest: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/sponsorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResponseMessage(data.message);
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
      setResponseMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <FormPage
        badge="Partnerships"
        title="Enquiry"
        highlight="received."
        description=""
      >
        <div className="text-center py-8">
          <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
          <h2 className="text-white font-semibold text-xl mb-2">Thank you!</h2>
          <p className="text-zinc-400">{responseMessage}</p>
        </div>
      </FormPage>
    );
  }

  return (
    <FormPage
      badge="Partnerships"
      title="Sponsor"
      highlight="Creativity Group."
      description="Support Ghana's most active innovation community. Partner with us to put your brand in front of the country's best young engineers and entrepreneurs."
    >
      {/* Value props */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { num: "2,400+", label: "Community members" },
          { num: "12", label: "Campus chapters" },
          { num: "95+", label: "Events per year" },
        ].map((s) => (
          <div
            key={s.label}
            className="text-center p-4 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <div className="text-xl font-bold text-white">{s.num}</div>
            <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Company / Organisation *"
            placeholder="Acme Tech Ghana"
            value={form.companyName}
            onChange={(v) => setForm((p) => ({ ...p, companyName: v }))}
          />
          <Field
            label="Contact Person *"
            placeholder="Your full name"
            value={form.contactName}
            onChange={(v) => setForm((p) => ({ ...p, contactName: v }))}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Email Address *"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          />
          <Field
            label="Phone (optional)"
            type="tel"
            placeholder="+233 50 000 0000"
            value={form.phone}
            onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
          />
        </div>

        <Field
          label="Company Website (optional)"
          placeholder="https://yourcompany.com"
          value={form.website}
          onChange={(v) => setForm((p) => ({ ...p, website: v }))}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <SelectField
            label="Sponsorship Interest *"
            value={form.interest}
            onChange={(v) => setForm((p) => ({ ...p, interest: v }))}
            options={INTERESTS}
            placeholder="Select programme…"
          />
          <SelectField
            label="Budget Range"
            value={form.budget}
            onChange={(v) => setForm((p) => ({ ...p, budget: v }))}
            options={BUDGETS}
            placeholder="Select range…"
          />
        </div>

        <div>
          <label className="block text-zinc-300 text-sm font-medium mb-2">
            Additional Notes
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your goals for the partnership, any specific requirements, or anything else we should know…"
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-red-400 text-sm">{responseMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          {status === "loading" ? "Sending…" : "Submit Enquiry"}
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
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
          {placeholder}
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
