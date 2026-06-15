import {
  compare,
  doctorFixers,
  doctorScanners,
  frontDoors,
  hero,
  safety,
  stats,
  steps,
  tools,
} from "@/lib/content";
import { Button, Eyebrow, FeatureCard, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Terminal } from "@/components/Terminal";
import { PricingCards } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Reveal, SpotlightCard } from "@/components/Motion";
import { BuildersMarquee } from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <BuildersMarquee />
      <FrontDoors />
      <HowItWorks />
      <Tools />
      <Doctor />
      <Security />
      <Compare />
      <PricingPreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-line hero-glow">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 sm:py-32 lg:grid-cols-2 lg:gap-12">

        {/* ── Left column ── */}
        <div className="animate-float-up">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance text-5xl font-black leading-[1.04] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4rem]">
            Let your AI agent{" "}
            <span className="text-gradient">build</span>
            {" "}and{" "}
            <span className="text-gradient">heal</span>
            {" "}your WordPress site.
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
            {hero.subtitle}
          </p>
          <ul className="mt-7 space-y-3">
            {hero.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-fg">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-glow/15">
                  <Icon name="check" className="h-3 w-3 text-lime-glow" strokeWidth={2.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/download" variant="primary" icon="download">Download free</Button>
            <Button href="/pricing" variant="outline" icon="arrow">View pricing</Button>
          </div>
          <p className="mt-5 text-xs text-fg-dim">
            Free forever · No API key for MCP · WordPress 6.5+ · PHP 8.1+
          </p>
        </div>

        {/* ── Right column — terminal ── */}
        <div className="glow-ring animate-float-up [animation-delay:140ms]">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 py-10 text-center ${i < stats.length - 1 ? "border-r border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <p className="text-4xl font-bold tracking-tight text-cyan-glow">{s.value}</p>
            <p className="mt-1.5 text-sm font-semibold text-fg">{s.label}</p>
            <p className="mt-0.5 text-xs text-fg-dim">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrontDoors() {
  return (
    <Section id="how">
      <Reveal>
        <SectionHeading
          eyebrow="One core, two front doors"
          title="Use your own agent, or your own key"
          subtitle="JoraPress is not a chatbox that calls OpenAI. It is a secure execution core with two interchangeable ways in — you choose how the intelligence reaches your site."
        />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {frontDoors.map((f, i) => (
          <Reveal key={f.title} delay={i * 100}>
            <SpotlightCard className="card card-hover h-full p-8">
              <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl border border-cyan-glow/25 bg-gradient-to-br from-cyan-glow/15 to-cyan-glow/5 text-cyan-glow">
                <Icon name={f.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-fg">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="steps" className="border-y border-line bg-ink-900/30">
      <Reveal>
        <SectionHeading
          eyebrow="How it works"
          title="From install to building in four steps"
          subtitle="Everything stays read-only until you flip the switch. You stay in control at every step."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="card card-hover relative h-full p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-glow/10 font-mono text-xs font-bold text-cyan-glow ring-1 ring-cyan-glow/20">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Tools() {
  return (
    <Section id="tools">
      <Reveal>
        <SectionHeading
          eyebrow="The primitives"
          title="A small set of powerful tools"
          subtitle="There is no per-builder code. The AI just runs PHP, SQL, files, WP-CLI and REST — so it works with every builder, present and future."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, i) => (
          <Reveal key={t.title} delay={(i % 3) * 80}>
            <FeatureCard {...t} mono />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Doctor() {
  return (
    <Section id="doctor" className="border-y border-line bg-ink-900/30">
      <Reveal>
        <SectionHeading
          eyebrow="WordPress Doctor"
          title="Not just building — keeping sites healthy"
          subtitle="Scanners diagnose real problems across four domains. Fixers remediate them safely, with a dry-run preview and one-click revert. Scanners run even with AI abilities off."
        />
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-10">
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="rounded-md bg-cyan-glow/12 px-2.5 py-1 font-mono text-xs text-cyan-glow ring-1 ring-cyan-glow/20">scan</span>
              Read-only scanners
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {doctorScanners.map((t, i) => (
                <Reveal key={t.title} delay={i * 70}>
                  <FeatureCard {...t} mono />
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="rounded-md bg-lime-glow/12 px-2.5 py-1 font-mono text-xs text-lime-glow ring-1 ring-lime-glow/20">fix</span>
              Gated, reversible fixers
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {doctorFixers.map((t, i) => (
                <Reveal key={t.title} delay={i * 70}>
                  <FeatureCard {...t} mono />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <HealthScore />
      </div>
    </Section>
  );
}

function HealthScore() {
  const score = 94;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - score / 100);
  const rows = [
    { label: "Bugs fixed", dot: "bg-lime-glow", status: "healthy" },
    { label: "Performance", dot: "bg-cyan-glow", status: "healthy" },
    { label: "SEO", dot: "bg-cyan-soft", status: "healthy" },
    { label: "Site Health", dot: "bg-lime-glow", status: "healthy" },
  ];
  return (
    <div className="card mx-auto flex w-full max-w-xs flex-col items-center p-8 lg:w-72">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-fg-muted">Health score</p>
      <div className="relative mt-7 h-44 w-44">
        {/* Background ring */}
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-ink-700)" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a3e635" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold tracking-tight text-fg">{score}</span>
          <span className="text-xs text-fg-dim">/ 100</span>
        </div>
      </div>
      <div className="mt-7 w-full space-y-2.5 text-xs">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-fg-muted">
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${r.dot}`} />
              {r.label}
            </span>
            <span className="font-medium text-lime-glow">{r.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 w-full rounded-xl bg-lime-glow/8 py-2.5 text-center text-xs font-semibold text-lime-glow ring-1 ring-lime-glow/15">
        72 → 94 after JoraPress scan
      </div>
    </div>
  );
}

function Security() {
  return (
    <Section id="security">
      <Reveal>
        <SectionHeading
          eyebrow="The security layer is the product"
          title="Remote execution, made safe"
          subtitle="JoraPress ships remote code execution as a feature — for dev and staging. So it ships with the safety layers to match. AI abilities are OFF by default."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {safety.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 70}>
            <FeatureCard {...s} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#febc2e]/25 bg-[#febc2e]/[0.04] p-5">
          <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-[#febc2e]" />
          <p className="text-sm leading-relaxed text-fg-muted">
            <span className="font-semibold text-fg">Built for development & staging.</span>{" "}
            Because it enables remote arbitrary code execution, JoraPress is not intended for a
            production site with live traffic. The guardrails refuse to run on production-looking
            sites until you explicitly acknowledge the risk.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function Compare() {
  return (
    <Section className="border-y border-line bg-ink-900/30">
      <Reveal>
        <SectionHeading eyebrow="Why JoraPress" title={compare.title} subtitle={compare.intro} />
      </Reveal>
      <Reveal delay={100}>
        <div className="card mx-auto mt-12 max-w-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line bg-ink-850/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-fg-muted">
            <span>Capability</span>
            <span className="w-20 text-center text-cyan-glow">JoraPress</span>
            <span className="w-20 text-center">Others</span>
          </div>
          {compare.rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-4 text-sm ${i % 2 ? "bg-ink-900/30" : ""}`}
            >
              <span className="text-fg">{row.feature}</span>
              <span className="flex w-20 justify-center"><Mark on={row.jorapress} /></span>
              <span className="flex w-20 justify-center"><Mark on={row.others} /></span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Mark({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-glow/12 text-cyan-glow ring-1 ring-cyan-glow/25">
      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-700 text-fg-dim">
      <Icon name="x" className="h-3.5 w-3.5" strokeWidth={2} />
    </span>
  );
}

function PricingPreview() {
  return (
    <Section id="pricing">
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Upgrade when you're ready."
          subtitle="The full execution core and scanners are free forever. Pro unlocks automated fixers, skills, memory and scheduled reports."
        />
      </Reveal>
      <div className="mt-12">
        <PricingCards />
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section id="faq" className="border-t border-line">
      <Reveal>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      </Reveal>
      <div className="mt-12">
        <Faq />
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <div className="relative overflow-hidden border-t border-line cta-glow">
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center">
        <Reveal>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-glow">
            Get started today
          </p>
          <h2 className="text-balance text-5xl font-black tracking-[-0.03em] text-fg sm:text-6xl">
            Ship your next site with an AI<br className="hidden sm:block" /> in the driver&apos;s seat.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-fg-muted">
            Install the free plugin, connect your agent, and watch it build — then keep your site
            healthy with the Site Doctor. Safe by default, reversible by design.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/download" variant="primary" icon="download">Download free</Button>
            <Button href="/pricing" variant="outline" icon="arrow">Compare plans</Button>
          </div>
          <p className="mt-5 text-xs text-fg-dim">No credit card · No API key for MCP · GPL-2.0</p>
        </Reveal>
      </div>
    </div>
  );
}
