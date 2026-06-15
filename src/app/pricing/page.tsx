import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui";
import { PricingCards } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqPageSchema,
  graph,
  softwareApplicationSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "JoraPress pricing — start free forever, upgrade to Pro for automated fixers, skills, memory and scheduled health reports. Agency plans for teams.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          softwareApplicationSchema,
          faqPageSchema()
        )}
      />
      <div className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 glow-radial" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Simple pricing for <span className="text-gradient">every site</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-fg-muted">
            The execution core and Site Doctor scanners are free, forever. Pay only when you want
            automated fixes, skills, memory and scheduled reports.
          </p>
        </div>
      </div>

      <Section>
        <PricingCards />
        <p className="mt-8 text-center text-xs text-fg-dim">
          Prices in USD. Pro &amp; Agency include automatic updates from our self-hosted update server.
          JoraPress self-distributes — it is not on the WordPress.org repo because it ships code execution.
        </p>
      </Section>

      <Section className="border-y border-line bg-ink-900/30">
        <SectionHeading eyebrow="Compare" title="What you get at each tier" />
        <div className="card mx-auto mt-12 max-w-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line bg-ink-850 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-fg-muted">
            <span>Capability</span>
            <span className="w-16 text-center">Free</span>
            <span className="w-16 text-center text-cyan-glow">Pro</span>
          </div>
          {tierRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-3.5 text-sm ${
                i % 2 ? "bg-ink-900/40" : ""
              }`}
            >
              <span className="text-fg">{row.label}</span>
              <span className="flex w-16 justify-center"><Mark on={row.free} /></span>
              <span className="flex w-16 justify-center"><Mark on={row.pro} /></span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Pricing & licensing questions" />
        <div className="mt-12">
          <Faq />
        </div>
      </Section>
    </>
  );
}

const tierRows = [
  { label: "MCP endpoint + admin chat", free: true, pro: true },
  { label: "All core tools (PHP, SQL, files, WP-CLI, REST)", free: true, pro: true },
  { label: "Site Doctor scanners", free: true, pro: true },
  { label: "Full safety layer + audit log", free: true, pro: true },
  { label: "Automated fixers (bug / perf / SEO)", free: false, pro: true },
  { label: "Skills packs + memory", free: false, pro: true },
  { label: "Scheduled audits + email reports", free: false, pro: true },
  { label: "Priority support & updates", free: false, pro: true },
];

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
