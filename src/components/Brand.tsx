import type { SVGProps } from "react";

/**
 * JoraPress brand mark — a gradient tile with a "J" monogram and a spark,
 * nodding to the AI + WordPress lineage.
 */
export function BrandMark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id="jp-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a3e635" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="34" height="34" rx="10" fill="url(#jp-mark)" />
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="10"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.18"
      />
      {/* J monogram */}
      <path
        d="M23 10v9.5a6.5 6.5 0 0 1-13 0"
        fill="none"
        stroke="#050708"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* spark */}
      <path
        d="M25.5 8.5l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z"
        fill="#050708"
      />
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark className="h-8 w-8 shrink-0 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
      <span className="text-lg font-semibold tracking-tight text-fg">
        Jora<span className="text-gradient">Press</span>
      </span>
    </span>
  );
}
