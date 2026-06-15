"use client";

import { builders } from "@/lib/content";

export function BuildersMarquee() {
  const row = [...builders, ...builders, ...builders];
  return (
    <div className="border-b border-line bg-ink-900/40 py-10">
      <p className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-dim">
        Works with every page builder — no per-builder code
      </p>
      <div className="marquee-wrap relative overflow-hidden marquee-fade">
        <div className="flex animate-marquee items-center gap-4" style={{ width: "max-content" }}>
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-ink-850 px-5 py-2.5 text-sm font-medium text-fg-muted"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow opacity-70" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
