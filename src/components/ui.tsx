import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

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
  const styles = {
    primary:
      "bg-cyan-glow text-ink-950 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.7)] hover:-translate-y-0.5",
    outline:
      "border border-line-strong text-fg hover:border-cyan-glow hover:text-cyan-soft",
    ghost: "text-fg-muted hover:text-fg",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-800/60 px-3.5 py-1.5 text-xs font-medium text-fg-muted backdrop-blur">
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
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-glow">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted">
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
    <div className="card card-hover group relative overflow-hidden p-6">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-ink-800 text-cyan-glow transition-colors group-hover:border-cyan-glow/40">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className={`text-base font-semibold text-fg ${mono ? "font-mono text-cyan-soft" : ""}`}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{desc}</p>
    </div>
  );
}
