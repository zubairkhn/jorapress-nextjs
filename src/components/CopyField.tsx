"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** A read-only value (e.g. a license key) with a click-to-copy button. */
export function CopyField({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — user can still select the text */
    }
  }

  return (
    <div>
      {label && <p className="mb-1.5 text-xs font-medium text-fg-dim">{label}</p>}
      <div className="flex items-stretch gap-2">
        <code className="flex-1 select-all overflow-x-auto rounded-lg border border-line-strong bg-ink-900/80 px-3.5 py-2.5 font-mono text-sm tracking-wide text-fg">
          {value}
        </code>
        <button
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-xs font-semibold text-fg-muted transition-all hover:border-cyan-glow/50 hover:text-cyan-soft"
          aria-label="Copy"
        >
          <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
