"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      setStatus(data.success ? "success" : "error");
      if (data.success) setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <CheckCircle2 size={16} />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
      <input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 sm:w-56 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
      >
        {status === "loading" && <Loader2 size={13} className="animate-spin" />}
        Subscribe
      </button>
      {status === "error" && (
        <p className="absolute mt-10 text-red-400 text-xs">{message}</p>
      )}
    </form>
  );
}
