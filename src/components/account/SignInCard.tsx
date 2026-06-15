"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Icon } from "@/components/Icon";

/** Passwordless sign-in: enter email → receive a magic link. */
export function SignInCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiFetch("/api/account/request-link", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-glow/15 text-cyan-soft ring-1 ring-cyan-glow/25">
          <Icon name="mail" className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-xl font-semibold text-fg">Check your inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          If <strong className="text-fg">{email}</strong> has a JoraPress license, we&apos;ve sent a
          sign-in link. It expires in 15 minutes.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-xs font-semibold text-cyan-soft hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <h1 className="text-xl font-semibold text-fg">Sign in to your account</h1>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        Enter the email you used at checkout. We&apos;ll send you a secure sign-in link — no password
        needed.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-xl border border-line-strong bg-ink-900/80 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-dim focus:border-cyan-glow/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-soft via-cyan-glow to-lime-glow px-5 py-3 text-sm font-bold text-ink-950 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name={loading ? "refresh" : "send"} className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Sending…" : "Send me a sign-in link"}
        </button>
        {error && <p className="text-sm text-red-300">{error}</p>}
      </form>
    </div>
  );
}
