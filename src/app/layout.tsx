import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gharfar.com"),
  title: {
    default: "AIWP — Let your AI agent build & heal your WordPress site",
    template: "%s · AIWP",
  },
  description:
    "AIWP is a secure remote-execution bridge for WordPress. Connect Claude Code, Cursor or Windsurf over MCP — or use the built-in chat panel — to build pages in any builder, then diagnose and fix bugs, performance and SEO. Every action gated, snapshotted, audited and reversible.",
  keywords: [
    "WordPress AI",
    "MCP WordPress",
    "AI website builder",
    "WordPress doctor",
    "Elementor AI",
    "Claude Code WordPress",
  ],
  openGraph: {
    title: "AIWP — AI WordPress Builder & Doctor",
    description:
      "Let your AI agent build and heal your WordPress site over MCP or a built-in chat panel — safely.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-ink-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
