/**
 * Single source of truth for marketing content.
 * Pulled from the AIWP plugin README, header and WP-Doctor plan.
 */

export const site = {
  name: "AIWP",
  tagline: "AI WordPress Builder",
  domain: "gharfar.com/aiwp",
  url: "https://gharfar.com/aiwp",
  author: "Zubair",
  version: "0.1.0",
  email: "info@gharfar.com",
  requires: { wp: "6.5+", php: "8.1+" },
  license: "GPL-2.0-or-later",
};

export const nav = [
  { label: "How it works", href: "/#how" },
  { label: "Tools", href: "/#tools" },
  { label: "Site Doctor", href: "/#doctor" },
  { label: "Security", href: "/#security" },
  { label: "Pricing", href: "/pricing" },
];

export const hero = {
  eyebrow: "MCP + Built-in chat agent · Works with every page builder",
  title: "Let your AI agent build and heal your WordPress site.",
  subtitle:
    "AIWP is a secure remote-execution bridge for WordPress. Connect Claude Code, Cursor or Windsurf over MCP — or use the built-in chat panel — to design pages in any builder, then diagnose and fix bugs, performance and SEO. Every action gated, snapshotted, audited and reversible.",
  points: [
    "No per-builder code — works with Elementor, Bricks, Divi, Gutenberg & more",
    "Ships no API key in MCP mode — the intelligence is your agent",
    "Not just building: a full WordPress Doctor that diagnoses + fixes",
  ],
};

export const stats = [
  { value: "2", label: "Front doors", sub: "MCP endpoint + admin chat" },
  { value: "7+", label: "Core tools", sub: "PHP, SQL, files, WP-CLI, REST" },
  { value: "100", label: "Health score", sub: "diagnose across 4 domains" },
  { value: "8", label: "Safety layers", sub: "gating to immutable audit log" },
];

export type Feature = {
  title: string;
  desc: string;
  icon: string; // key for Icon component
};

export const frontDoors: Feature[] = [
  {
    title: "MCP endpoint — Bring Your Own Agent",
    desc: "POST /wp-json/aiwp/v1/mcp speaks JSON-RPC 2.0 over Streamable HTTP. Create an Application Password, drop the snippet into Claude Code, Cursor or Windsurf, and your agent runs the show. No model and no API key ever ship with the plugin.",
    icon: "plug",
  },
  {
    title: "Admin chat panel — Bring Your Own Key",
    desc: "Prefer to stay in wp-admin? Pick a provider (Anthropic, OpenAI, Gemini, OpenRouter), paste an encrypted API key, choose a model and watch it build. Turn on Require approval and the agent pauses before every write.",
    icon: "chat",
  },
];

export const tools: Feature[] = [
  { title: "execute_php", desc: "Run PHP inside the WordPress runtime — the master key that reaches every builder's API.", icon: "code" },
  { title: "db_query", desc: "SQL access. Reads by default; writes are gated and snapshotted before they run.", icon: "database" },
  { title: "file ops", desc: "read_file · write_file · edit_file · list_dir — filesystem access scoped to the install.", icon: "file" },
  { title: "wp_cli", desc: "Full WP-CLI on hosts that allow shell access.", icon: "terminal" },
  { title: "wp_rest", desc: "Dispatch internal WP REST routes — safer and structured.", icon: "route" },
  { title: "skills + memory", desc: "Markdown playbooks the agent auto-loads, plus key/value project context across sessions.", icon: "book" },
];

export const doctorScanners: Feature[] = [
  { title: "site_health", desc: "Environment audit — PHP/MySQL versions, HTTPS, loopback cron, REST availability, object cache, debug flags & updates.", icon: "heart" },
  { title: "error_scan", desc: "Parses debug.log and recent fatals, groups errors and attributes each to the offending plugin, theme, file and line.", icon: "bug" },
  { title: "perf_scan", desc: "Autoload bloat, slow/duplicate queries, transient & cron buildup, missing cache, oversized images, large tables & revisions.", icon: "gauge" },
  { title: "seo_scan", desc: "Titles & meta descriptions, H1 structure, image alt text, sitemap, robots.txt, canonicals, Open Graph & JSON-LD.", icon: "search" },
];

export const doctorFixers: Feature[] = [
  { title: "bug_fix", desc: "Update plugins, deactivate a fatal-throwing plugin, replace deprecated calls, repair common misconfigurations.", icon: "wrench" },
  { title: "perf_fix", desc: "Trim autoload, purge stale transients & cron, clean revisions, optimize images, defer non-critical JS.", icon: "bolt" },
  { title: "seo_fix", desc: "Generate meta & alt text, inject JSON-LD, allow indexing, repair sitemap & robots, fix bad canonicals.", icon: "trending" },
];

export const safety: Feature[] = [
  { title: "Master kill switch", desc: "AI abilities ship OFF. One toggle for an instant, global off — from the dashboard.", icon: "power" },
  { title: "Production guardrail", desc: "Heuristic detection refuses tool calls on a production-looking site until you acknowledge the risk.", icon: "shield" },
  { title: "Write gating", desc: "DB and file writes stay off until you enable them. Reads are always allowed.", icon: "lock" },
  { title: "Crash guard", desc: "Wraps execute_php and sandbox loads — a fatal is caught and the offending file auto-disabled. No white screen.", icon: "umbrella" },
  { title: "Versioned sandbox", desc: "AI-written files live in an isolated, tracked, one-click revertible sandbox directory.", icon: "box" },
  { title: "Pre-write backups", desc: "Affected rows and posts are snapshotted before any write touches them.", icon: "save" },
  { title: "Immutable audit log", desc: "Every single tool call is recorded and reviewable from AIWP → Audit Log.", icon: "list" },
  { title: "Rate limiting + encryption", desc: "Per-user calls/minute throttling, and API keys encrypted at rest (libsodium → OpenSSL).", icon: "key" },
];

export const steps = [
  {
    n: "01",
    title: "Install & activate",
    desc: "Drop the plugin into wp-content/plugins, activate, and open AIWP → Dashboard. Requires WordPress 6.5+ and PHP 8.1+.",
  },
  {
    n: "02",
    title: "Connect your agent",
    desc: "Create an Application Password and add the MCP server to Claude Code / Cursor / Windsurf — or paste a provider key into the chat panel.",
  },
  {
    n: "03",
    title: "Enable AI abilities",
    desc: "Flip the master switch on. Choose your write-gating and approval settings. Everything stays read-only until you say otherwise.",
  },
  {
    n: "04",
    title: "Build & heal",
    desc: '"Build a hero + features + CTA in Elementor on Home." Then run the Site Doctor to scan and fix bugs, performance and SEO.',
  },
];

export const compare = {
  title: "Beyond building — keeping sites healthy",
  intro:
    "Novamira-style tools stop at “an AI builds your site.” AIWP starts there and keeps going: a secure execution core plus a WordPress Doctor that diagnoses and fixes real problems.",
  rows: [
    { feature: "AI builds pages in any builder", aiwp: true, others: true },
    { feature: "Bring Your Own Agent over MCP", aiwp: true, others: false },
    { feature: "No bundled API key required", aiwp: true, others: false },
    { feature: "Diagnose bugs, performance & SEO", aiwp: true, others: false },
    { feature: "Auto-fix gated, snapshotted & reversible", aiwp: true, others: false },
    { feature: "Immutable audit log of every action", aiwp: true, others: false },
    { feature: "Scheduled health audits + email reports", aiwp: true, others: false },
    { feature: "Self-hosted — your keys, your server", aiwp: true, others: false },
  ],
};

export type Plan = {
  name: string;
  price: string;
  period?: string;
  blurb: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "The full execution core and Site Doctor scanners. Perfect for dev & staging.",
    cta: "Download free",
    href: "/download",
    features: [
      "MCP endpoint + admin chat panel",
      "All core tools (PHP, SQL, files, WP-CLI, REST)",
      "Site Doctor read-only scanners",
      "Full safety layer: gating, crash guard, audit log",
      "Versioned sandbox + pre-write backups",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$79",
    period: "/year",
    blurb: "Unlock automated fixers, skills packs, memory and scheduled health reports.",
    cta: "Get Pro",
    href: "/checkout?plan=pro",
    featured: true,
    features: [
      "Everything in Free",
      "Automated fixers: bug_fix · perf_fix · seo_fix",
      "Skills packs (Elementor, SEO, performance, debugging)",
      "Cross-session memory",
      "Scheduled audits + emailed health reports",
      "Priority email support & updates",
    ],
  },
  {
    name: "Agency",
    price: "$249",
    period: "/year",
    blurb: "For teams running AIWP across many client sites.",
    cta: "Get Agency",
    href: "/checkout?plan=agency",
    features: [
      "Everything in Pro",
      "Use on up to 25 sites",
      "Health-score trends across all sites",
      "White-glove onboarding",
      "Dedicated support channel",
      "Early access to new tools",
    ],
  },
];

export const faqs = [
  {
    q: "Is AIWP safe to run?",
    a: "AIWP ships remote arbitrary code execution as a feature, so the security layer is the product. AI abilities ship OFF behind a master switch, with a production guardrail, write-gating, a crash guard, automatic backups, a versioned sandbox, rate limiting and an immutable audit log. It is built for dev and staging environments — not a production site with live traffic.",
  },
  {
    q: "Do I need an API key?",
    a: "Not for MCP mode — the plugin ships no AI model and no API key. The intelligence is your own agent (Claude Code, Cursor, Windsurf). If you prefer the built-in chat panel, you bring your own provider key (Anthropic, OpenAI, Gemini or OpenRouter), and it is encrypted at rest.",
  },
  {
    q: "Which page builders are supported?",
    a: "All of them. There is no per-builder code — the AI just runs PHP/SQL and writes each builder's own data structure. That covers Elementor, Bricks, Divi, Gutenberg, Beaver Builder, Oxygen and more.",
  },
  {
    q: "What is the Site Doctor?",
    a: "A set of read-only scanners (site_health, error_scan, perf_scan, seo_scan) that diagnose problems, paired with fixers (bug_fix, perf_fix, seo_fix) that remediate them. Scanners run even with the master switch off; fixers route through the full safety pipeline and support a dry-run preview before anything changes.",
  },
  {
    q: "How do updates and licensing work?",
    a: "AIWP self-distributes because the WordPress.org repo will not accept arbitrary code execution. Pro and Agency include a license key for automatic updates from our self-hosted update server.",
  },
  {
    q: "What are the requirements?",
    a: "WordPress 6.5 or newer and PHP 8.1 or newer. Composer is optional — it is only used for dev tooling; the plugin runs without it.",
  },
];
