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

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
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
    <div className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 glow-radial" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:gap-10">
        <div className="animate-float-up">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-[3.4rem]">
            Let your AI agent <span className="text-gradient">build</span> and{" "}
            <span className="text-gradient">heal</span> your WordPress site.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {hero.subtitle}
          </p>
          <ul className="mt-7 space-y-2.5">
            {hero.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-fg">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime-glow" strokeWidth={2.2} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/download" variant="primary" icon="download">Download free</Button>
            <Button href="/pricing" variant="outline" icon="arrow">View pricing</Button>
          </div>
          <p className="mt-5 text-xs text-fg-dim">
            Free forever · No API key needed for MCP · WordPress 6.5+ · PHP 8.1+
          </p>
        </div>

        <div className="animate-float-up [animation-delay:120ms]">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="border-b border-line bg-ink-900/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-8 text-center sm:py-10">
            <p className="text-3xl font-bold tracking-tight text-cyan-glow sm:text-4xl">{s.value}</p>
            <p className="mt-1.5 text-sm font-medium text-fg">{s.label}</p>
            <p className="text-xs text-fg-dim">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrontDoors() {
  return (
    <Section>
      <SectionHeading
        eyebrow="One core, two front doors"
        title="Use your own agent, or your own key"
        subtitle="AIWP is not a chatbox that calls OpenAI. It is a secure execution core with two interchangeable ways in — you choose how the intelligence reaches your site."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {frontDoors.map((f) => (
          <div key={f.title} className="card card-hover p-7">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow">
              <Icon name={f.icon} className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-fg">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how" className="border-y border-line bg-ink-900/30">
      <SectionHeading
        eyebrow="How it works"
        title="From install to building in four steps"
        subtitle="Everything stays read-only until you flip the switch. You stay in control at every step."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="card card-hover relative p-6">
            <span className="font-mono text-sm font-bold text-cyan-glow/50">{s.n}</span>
            <h3 className="mt-3 text-base font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Tools() {
  return (
    <Section id="tools">
      <SectionHeading
        eyebrow="The primitives"
        title="A small set of powerful tools"
        subtitle="There is no per-builder code. The AI just runs PHP, SQL, files, WP-CLI and REST — so it works with every builder, present and future."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <FeatureCard key={t.title} {...t} mono />
        ))}
      </div>
    </Section>
  );
}

function Doctor() {
  return (
    <Section id="doctor" className="border-y border-line bg-ink-900/30">
      <SectionHeading
        eyebrow="WordPress Doctor"
        title="Not just building — keeping sites healthy"
        subtitle="Scanners diagnose real problems across four domains. Fixers remediate them safely, with a dry-run preview and one-click revert. Scanners run even with AI abilities off."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-8">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="rounded-md bg-cyan-glow/15 px-2 py-0.5 font-mono text-xs text-cyan-glow">scan</span>
              Read-only scanners
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {doctorScanners.map((t) => (
                <FeatureCard key={t.title} {...t} mono />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
              <span className="rounded-md bg-lime-glow/15 px-2 py-0.5 font-mono text-xs text-lime-glow">fix</span>
              Gated, reversible fixers
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {doctorFixers.map((t) => (
                <FeatureCard key={t.title} {...t} mono />
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
  const rows: { label: string; dot: string }[] = [
    { label: "Bugs", dot: "bg-lime-glow" },
    { label: "Performance", dot: "bg-cyan-glow" },
    { label: "SEO", dot: "bg-cyan-soft" },
    { label: "Health", dot: "bg-lime-glow" },
  ];
  return (
    <div className="card mx-auto flex w-full max-w-xs flex-col items-center p-8 lg:w-64">
      <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">Health score</p>
      <div className="relative mt-6 h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-ink-700)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--color-cyan-glow)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-fg">{score}</span>
          <span className="text-xs text-fg-dim">/ 100</span>
        </div>
      </div>
      <div className="mt-6 w-full space-y-2 text-xs">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-fg-muted">
            <span className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} /> {r.label}
            </span>
            <span className="text-lime-glow">healthy</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Security() {
  return (
    <Section id="security">
      <SectionHeading
        eyebrow="The security layer is the product"
        title="Remote execution, made safe"
        subtitle="AIWP ships remote code execution as a feature — for dev and staging. So it ships with the safety layers to match. AI abilities are OFF by default."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {safety.map((s) => (
          <FeatureCard key={s.title} {...s} />
        ))}
      </div>
      <div className="card mt-8 flex items-start gap-4 border-[#febc2e]/25 bg-[#febc2e]/[0.04] p-5">
        <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-[#febc2e]" />
        <p className="text-sm leading-relaxed text-fg-muted">
          <span className="font-semibold text-fg">Built for development & staging.</span> Because it
          enables remote arbitrary code execution, AIWP is not intended for a production site with
          live traffic. The guardrails refuse to run on production-looking sites until you explicitly
          acknowledge the risk.
        </p>
      </div>
    </Section>
  );
}

function Compare() {
  return (
    <Section className="border-y border-line bg-ink-900/30">
      <SectionHeading eyebrow="Why AIWP" title={compare.title} subtitle={compare.intro} />
      <div className="card mx-auto mt-12 max-w-3xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line bg-ink-850 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-fg-muted">
          <span>Capability</span>
          <span className="w-16 text-center text-cyan-glow">AIWP</span>
          <span className="w-16 text-center">Others</span>
        </div>
        {compare.rows.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-3.5 text-sm ${
              i % 2 ? "bg-ink-900/40" : ""
            }`}
          >
            <span className="text-fg">{row.feature}</span>
            <span className="flex w-16 justify-center">
              <Mark on={row.aiwp} />
            </span>
            <span className="flex w-16 justify-center">
              <Mark on={row.others} />
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Mark({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-glow/15 text-cyan-glow">
      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-fg-dim">
      <Icon name="x" className="h-3.5 w-3.5" strokeWidth={2} />
    </span>
  );
}

function PricingPreview() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free. Upgrade when you're ready."
        subtitle="The full execution core and scanners are free forever. Pro unlocks automated fixers, skills, memory and scheduled reports."
      />
      <div className="mt-12">
        <PricingCards />
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section id="faq" className="border-t border-line">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-12">
        <Faq />
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <div className="relative overflow-hidden border-t border-line">
      <div className="absolute inset-0 glow-radial" />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Ship your next WordPress site with an AI in the driver&apos;s seat.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-fg-muted">
          Install the free plugin, connect your agent, and watch it build — then keep your site
          healthy with the Site Doctor. Safe by default, reversible by design.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/download" variant="primary" icon="download">Download free</Button>
          <Button href="/pricing" variant="outline" icon="arrow">Compare plans</Button>
        </div>
      </div>
    </div>
  );
}
