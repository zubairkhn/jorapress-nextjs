"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function CheckoutButton({
  plan,
  price,
  period,
}: {
  plan: string;
  price: string;
  period?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    setLoading(true);
    setError("");
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
      const res = await fetch(`${backend}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.url) {
        setError(json.error || "Could not start checkout. Please try again.");
        setLoading(false);
        return;
      }
      // Hand off to Stripe's hosted, PCI-compliant checkout page.
      window.location.href = json.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={start}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-soft via-cyan-glow to-lime-glow px-5 py-3 text-sm font-bold text-ink-950 shadow-[0_8px_28px_-10px_rgba(34,211,238,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            Redirecting…
            <Icon name="sparkle" className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            <Icon name="lock" className="h-4 w-4" />
            Pay {price}
            <span className="font-normal opacity-80">{period}</span>
          </>
        )}
      </button>
      {error && (
        <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
          {error}
        </p>
      )}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-fg-dim">
        <Icon name="lock" className="h-3.5 w-3.5" /> Secured by Stripe · cancel anytime
      </p>
    </>
  );
}
