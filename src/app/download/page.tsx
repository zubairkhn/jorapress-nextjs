import type { Metadata } from "next";
import { site } from "@/lib/content";
import { Button, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, graph, softwareApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Download JoraPress Free for WordPress",
  description:
    "Download JoraPress free for WordPress. Install, connect your AI agent over MCP or the built-in chat panel, and start building. Requires WordPress 6.5+ and PHP 8.1+.",
  alternates: { canonical: "/download" },
};

const installSteps = [
  { t: "Copy the plugin", d: "Drop the jorapress/ folder into wp-content/plugins/ (or upload the zip from Plugins → Add New)." },
  { t: "Activate it", d: "Activate “JoraPress — AI WordPress Builder” in WP admin. Optionally run composer install for dev tooling — the plugin runs without it." },
  { t: "Enable AI abilities", d: "Open JoraPress → Dashboard and click Enable AI abilities. Everything stays read-only until you do." },
  { t: "Connect & build", d: "Add the MCP server to your agent, or paste a provider key into the chat panel — then start prompting." },
];

export default function DownloadPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Download", path: "/download" },
          ]),
          softwareApplicationSchema
        )}
      />
      <div className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 glow-radial" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-800/60 px-3.5 py-1.5 text-xs font-medium text-fg-muted">
            <Icon name="wp" className="h-4 w-4 text-cyan-glow" /> Free · v{site.version} · GPL-2.0
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Download <span className="text-gradient">JoraPress</span> free
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-fg-muted">
            The full execution core and Site Doctor scanners, free forever. Built for development and
            staging. Requires WordPress {site.requires.wp} and PHP {site.requires.php}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/jorapress.zip" variant="primary" icon="download">Download .zip</Button>
            <Button href="https://github.com/" variant="outline" icon="github">View on GitHub</Button>
          </div>
          <p className="mt-4 text-xs text-fg-dim">
            Need automated fixers, skills &amp; reports?{" "}
            <a href="/pricing" className="text-cyan-soft hover:underline">Get Pro →</a>
          </p>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="Installation" title="Up and running in minutes" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {installSteps.map((s, i) => (
            <div key={s.t} className="card card-hover flex gap-4 p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/15 font-mono text-sm font-bold text-cyan-glow">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-fg">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-y border-line bg-ink-900/30">
        <SectionHeading
          eyebrow="Connect over MCP"
          title="Add the server to your AI client"
          subtitle="Create an Application Password in JoraPress → Connect (MCP), then add the server to Claude Code, Cursor or Windsurf. No model or API key ships with the plugin."
        />
        <div className="card mx-auto mt-10 max-w-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-ink-850 px-4 py-3">
            <span className="font-mono text-xs text-fg-dim">~/.config/mcp/jorapress.json</span>
          </div>
          <pre className="thin-scroll overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-fg-muted">
{`{
  "mcpServers": {
    "jorapress": {
      "url": "https://your-site.com/wp-json/jorapress/v1/mcp",
      "transport": "streamable-http",
      "auth": {
        "type": "basic",
        "username": "your-wp-user",
        "password": "APPLICATION-PASSWORD"
      }
    }
  }
}`}
          </pre>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-fg-dim">
          Endpoint: <span className="font-mono text-fg-muted">POST /wp-json/jorapress/v1/mcp</span> · JSON-RPC 2.0
          over Streamable HTTP · HTTP Basic auth over HTTPS. Implements initialize, tools/list, tools/call, ping.
        </p>
      </Section>

      <Section>
        <div className="card flex flex-col items-center gap-4 p-10 text-center">
          <Icon name="chat" className="h-8 w-8 text-cyan-glow" />
          <h3 className="text-xl font-semibold text-fg">Prefer no external agent?</h3>
          <p className="max-w-lg text-sm leading-relaxed text-fg-muted">
            Use the built-in chat panel. Pick a provider (Anthropic, OpenAI, Gemini or OpenRouter),
            paste your API key — stored encrypted — choose a model, and watch it build right inside
            wp-admin. Turn on “Require approval” to confirm every write.
          </p>
          <Button href="/pricing" variant="outline" icon="arrow">See what Pro adds</Button>
        </div>
      </Section>
    </>
  );
}
