# JoraPress — Marketing & Download Site

The public website for the **JoraPress — AI WordPress Builder** plugin. Lets visitors
explore everything the plugin does, download the free version, and subscribe to
Pro / Agency.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.
Dark, dev-first theme (electric cyan + lime).

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
src/
  app/
    layout.tsx        root layout (Navbar + Footer, SEO metadata)
    page.tsx          home — all marketing sections
    pricing/          full pricing + tier comparison + FAQ
    download/         free download, install steps, MCP connect snippet
    checkout/         Stripe-ready checkout stub (reads ?plan=)
    globals.css       design tokens + Tailwind theme
  components/
    Navbar.tsx        nav + footer + logo
    ui.tsx            Button, Section, SectionHeading, FeatureCard, Eyebrow
    Icon.tsx          inline SVG icon set
    Terminal.tsx      hero terminal/MCP mockup
    Pricing.tsx       pricing cards (home + pricing page)
    Faq.tsx           accordion
  lib/
    content.ts        ALL copy/data — edit here to change the site
public/
    jorapress.zip          the packaged free plugin (served at /download)
```

All copy and data lives in [`src/lib/content.ts`](src/lib/content.ts) — plans,
features, tools, FAQs, stats. Edit that one file to update the site.

## Wiring up Stripe (checkout)

The checkout page (`src/app/checkout/page.tsx`) is a styled placeholder. To make
it live:

1. `npm i stripe @stripe/stripe-js`
2. Add `STRIPE_SECRET_KEY` and price IDs to `.env.local`.
3. Add a route handler (e.g. `src/app/api/checkout/route.ts`) that creates a
   Stripe Checkout Session and redirects to `session.url`.
4. Point each plan's `href` in `content.ts` at that handler (or call it from the
   checkout button).

## Updating the downloadable plugin

The free download is `public/jorapress.zip`. Re-package from the plugin folder:

```bash
cd ../  # plugins dir
zip -rq jorapress-nextjs/public/jorapress.zip jorapress -x "jorapress/.git/*" "*/.DS_Store"
```
# jorapress-nextjs
