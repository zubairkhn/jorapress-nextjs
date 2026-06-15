"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { Icon } from "./Icon";
import { Button } from "./ui";
import { BrandLockup } from "./Brand";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="JoraPress home"
      className="transition-opacity hover:opacity-90"
    >
      <BrandLockup />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/download" variant="ghost">Download</Button>
          <Button href="/pricing" variant="primary">Get Pro</Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-fg md:hidden"
          aria-label="Toggle menu"
        >
          <Icon name={open ? "x" : "menu"} className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink-900 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-ink-800 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button href="/download" variant="outline" className="w-full">Download free</Button>
              <Button href="/pricing" variant="primary" className="w-full">Get Pro</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            A secure remote-execution bridge that lets your AI agent build and heal WordPress sites.
          </p>
          <p className="mt-4 text-xs text-fg-dim">
            v{site.version} · {site.license}
          </p>
        </div>

        <FooterCol
          title="Product"
          links={[
            { label: "How it works", href: "/#how" },
            { label: "Tools", href: "/#tools" },
            { label: "Site Doctor", href: "/#doctor" },
            { label: "Security", href: "/#security" },
            { label: "Pricing", href: "/pricing" },
          ]}
        />
        <FooterCol
          title="Get started"
          links={[
            { label: "Download free", href: "/download" },
            { label: "Get Pro", href: "/checkout?plan=pro" },
            { label: "Agency", href: "/checkout?plan=agency" },
            { label: "FAQ", href: "/#faq" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "jorapress.com", href: "https://jorapress.com" },
            { label: "Contact", href: `mailto:${site.email}` },
            { label: "License (GPL-2.0)", href: "https://www.gnu.org/licenses/gpl-2.0.html" },
          ]}
        />
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-fg-dim sm:flex-row">
          <p>© {new Date().getFullYear()} JoraPress by {site.author}. All rights reserved.</p>
          <p>Requires WordPress {site.requires.wp} · PHP {site.requires.php}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-fg">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-cyan-soft">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
