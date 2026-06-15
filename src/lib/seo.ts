/**
 * Structured data (schema.org JSON-LD) builders.
 *
 * These power Google rich results: the FAQ accordion in search, the
 * software/app card, sitelinks search box, breadcrumbs and product offers.
 * All URLs derive from SITE_URL so there is a single source of truth.
 */
import { SITE_URL, faqs, plans, site } from "./content";

const abs = (path = "/") => new URL(path, SITE_URL).toString();

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;

/** The publishing entity. Referenced by everything else via @id. */
export const organizationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: SITE_URL,
  logo: abs("/icon.svg"),
  email: site.email,
  founder: { "@type": "Person", name: site.author },
  sameAs: [SITE_URL],
};

/** The site itself — enables the sitelinks search box where applicable. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: site.name,
  description:
    "Secure remote-execution bridge that lets your AI agent build and heal WordPress sites over MCP or a built-in chat panel.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

/** The product as a SoftwareApplication, with free + paid offers. */
export const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: `${site.name} — ${site.tagline}`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "WordPress 6.5+, PHP 8.1+",
  softwareVersion: site.version,
  url: SITE_URL,
  downloadUrl: abs("/download"),
  license: "https://www.gnu.org/licenses/gpl-2.0.html",
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  description:
    "Connect Claude Code, Cursor or Windsurf over MCP — or use the built-in chat panel — to build pages in any WordPress builder, then diagnose and fix bugs, performance and SEO. Every action gated, snapshotted, audited and reversible.",
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: `${site.name} ${p.name}`,
    price: p.price.replace(/[^0-9.]/g, "") || "0",
    priceCurrency: "USD",
    url: abs(p.href.split("?")[0]),
    availability: "https://schema.org/InStock",
  })),
};

/** FAQPage — eligible for the expandable FAQ rich result in search. */
export function faqPageSchema(items: { q: string; a: string }[] = faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList for non-home pages. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/** Wrap one or more nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
