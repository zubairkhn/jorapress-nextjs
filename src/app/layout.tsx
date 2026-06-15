import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/Navbar";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, site } from "@/lib/content";
import {
  graph,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JoraPress — Let your AI agent build & heal your WordPress site",
    template: "%s · JoraPress",
  },
  description:
    "JoraPress is a secure remote-execution bridge for WordPress. Connect Claude Code, Cursor or Windsurf over MCP — or use the built-in chat panel — to build pages in any builder, then diagnose and fix bugs, performance and SEO. Every action gated, snapshotted, audited and reversible.",
  applicationName: site.name,
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  publisher: site.name,
  category: "technology",
  keywords: [
    "WordPress AI",
    "MCP WordPress",
    "AI website builder",
    "WordPress doctor",
    "Elementor AI",
    "Claude Code WordPress",
    "Cursor WordPress",
    "AI WordPress plugin",
    "fix WordPress SEO",
    "WordPress MCP server",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: SITE_URL,
    locale: "en_US",
    title: "JoraPress — AI WordPress Builder & Doctor",
    description:
      "Let your AI agent build and heal your WordPress site over MCP or a built-in chat panel — safely.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JoraPress — AI WordPress Builder & Doctor",
    description:
      "Let your AI agent build and heal your WordPress site over MCP or a built-in chat panel — safely.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-ink-950">
        <JsonLd
          data={graph(
            organizationSchema,
            websiteSchema,
            softwareApplicationSchema
          )}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
