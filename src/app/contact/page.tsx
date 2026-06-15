import type { Metadata } from "next";
import { site } from "@/lib/content";
import { Section } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the JoraPress team. Questions about MCP, the Site Doctor, pricing or licensing — send us a message and we'll reply by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />

      <div className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 glow-radial" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-800/60 px-3.5 py-1.5 text-xs font-medium text-fg-muted">
            <Icon name="mail" className="h-4 w-4 text-cyan-glow" /> We usually reply within a day
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Get in <span className="text-gradient">touch</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-fg-muted">
            Questions about MCP, the Site Doctor, pricing or licensing? Send us a message — attach a
            screenshot or log if it helps — and we&apos;ll get back to you by email.
          </p>
        </div>
      </div>

      <Section className="!py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Aside */}
          <div className="space-y-6">
            <InfoRow
              icon="mail"
              title="Email us directly"
              body={
                <a href={`mailto:${site.email}`} className="text-cyan-soft hover:underline">
                  {site.email}
                </a>
              }
            />
            <InfoRow
              icon="download"
              title="Just want the plugin?"
              body={
                <a href="/download" className="text-cyan-soft hover:underline">
                  Download JoraPress free →
                </a>
              }
            />
            <InfoRow
              icon="book"
              title="Pricing & licensing"
              body={
                <a href="/pricing" className="text-cyan-soft hover:underline">
                  See plans and the FAQ →
                </a>
              }
            />
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function InfoRow({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-ink-800/80 text-cyan-glow">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        <p className="mt-1 text-sm text-fg-muted">{body}</p>
      </div>
    </div>
  );
}
