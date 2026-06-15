"use client";

import { useEffect, useState } from "react";
import { apiFetch, adminToken } from "@/lib/api";
import { Icon } from "@/components/Icon";
import { AdminDashboard } from "./AdminDashboard";

export function AdminView() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(Boolean(adminToken.get()));
  }, []);

  if (authed === null) return null;

  return authed ? (
    <AdminDashboard onSignOut={() => setAuthed(false)} />
  ) : (
    <div className="mx-auto max-w-md">
      <AdminLogin onSignIn={() => setAuthed(true)} />
    </div>
  );
}

function AdminLogin({ onSignIn }: { onSignIn: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await apiFetch<{ token: string }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      adminToken.set(token);
      onSignIn();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-8">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-ink-800/80 text-cyan-glow">
        <Icon name="lock" className="h-5 w-5" />
      </span>
      <h1 className="mt-5 text-xl font-semibold text-fg">Admin sign-in</h1>
      <p className="mt-2 text-sm text-fg-muted">Enter the admin password to view customers and reports.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full rounded-xl border border-line-strong bg-ink-900/80 px-4 py-3 text-sm text-fg outline-none placeholder:text-fg-dim focus:border-cyan-glow/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-soft via-cyan-glow to-lime-glow px-5 py-3 text-sm font-bold text-ink-950 transition-all hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Checking…" : "Sign in"}
        </button>
        {error && <p className="text-sm text-red-300">{error}</p>}
      </form>
    </div>
  );
}
