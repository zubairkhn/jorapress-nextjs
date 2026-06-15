import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { SpotlightCard } from "./Motion";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  icon?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap";
  const styles: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-cyan-soft via-cyan-glow to-lime-glow text-ink-950 font-bold shadow-[0_8px_28px_-10px_rgba(34,211,238,0.55)] hover:shadow-[0_14px_44px_-10px_rgba(34,211,238,0.75)] hover:-translate-y-0.5 hover:brightness-105",
    outline:
      "border border-line-strong text-fg hover:border-cyan-glow/50 hover:text-cyan-soft hover:bg-cyan-glow/5",
    ghost: "text-fg-muted hover:text-fg hover:bg-ink-800/60",
  };
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-cyan-glow/8 px-4 py-1.5 text-xs font-semibold text-cyan-soft backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-dot" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-glow">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-fg sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function FeatureCard({
  icon,
  title,
  desc,
  mono = false,
}: {
  icon: string;
  title: string;
  desc: string;
  mono?: boolean;
}) {
  return (
    <SpotlightCard className="card card-hover group h-full p-6">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-ink-800/80 text-cyan-glow transition-all group-hover:border-cyan-glow/35 group-hover:bg-cyan-glow/8">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      {mono ? (
        <h3 className="code-chip mb-1">{title}</h3>
      ) : (
        <h3 className="text-base font-semibold text-fg">{title}</h3>
      )}
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{desc}</p>
    </SpotlightCard>
  );
}
