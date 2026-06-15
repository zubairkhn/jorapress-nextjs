import type { Metadata } from "next";
import Link from "next/link";
import { plans, site } from "@/lib/content";
import { Button } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { CheckoutButton } from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your JoraPress subscription.",
  alternates: { canonical: "/checkout" },
  // Transactional page — keep it out of the index but let crawlers follow links.
  robots: { index: false, follow: true },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planKey } = await searchParams;
  const plan =
    plans.find((p) => p.name.toLowerCase() === (planKey ?? "pro").toLowerCase()) ??
    plans.find((p) => p.featured)!;
  const planSlug = plan.name.toLowerCase();
  const isFree = /^\$?0/.test(plan.price);

  return (
    <div className="relative min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 glow-radial" />
      <div className="relative mx-auto grid max-w-5xl gap-8 px-5 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Order summary */}
        <div className="card p-8">
          <Link href="/pricing" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg">
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to pricing
          </Link>
          <h1 className="mt-6 text-2xl font-semibold text-fg">Order summary</h1>

          <div className="mt-6 flex items-baseline justify-between border-b border-line pb-5">
            <div>
              <p className="text-lg font-semibold text-fg">JoraPress {plan.name}</p>
              <p className="text-sm text-fg-muted">{plan.blurb}</p>
            </div>
            <p className="whitespace-nowrap text-2xl font-bold text-fg">
              {plan.price}
              <span className="text-sm font-normal text-fg-dim">{plan.period}</span>
            </p>
          </div>

          <ul className="mt-5 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-fg-muted">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" strokeWidth={2.2} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-base font-semibold text-fg">
            <span>Total due today</span>
            <span>
              {plan.price}
              <span className="text-sm font-normal text-fg-dim">{plan.period}</span>
            </span>
          </div>
        </div>

        {/* Payment panel */}
        <div className="card flex flex-col p-8">
          <h2 className="text-lg font-semibold text-fg">Payment</h2>

          {isFree ? (
            <>
              <p className="mt-5 text-sm leading-relaxed text-fg-muted">
                The {plan.name} plan is free — no payment needed. Download the plugin and start
                building right away.
              </p>
              <div className="mt-6">
                <Button href="/download" variant="primary" icon="download" className="w-full">
                  Download free
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-ink-850/60 p-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-glow/15 text-cyan-glow">
                  <Icon name="lock" className="h-5 w-5" />
                </span>
                <p className="text-xs leading-relaxed text-fg-muted">
                  You&apos;ll be redirected to Stripe&apos;s secure, PCI-compliant checkout to enter
                  your card details. We never see or store your card.
                </p>
              </div>

              <div className="mt-6">
                <CheckoutButton plan={planSlug} price={plan.price} period={plan.period} />
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-fg-dim">
                <Icon name="shield" className="h-4 w-4" /> 14-day money-back guarantee
              </div>
            </>
          )}

          <p className="mt-4 text-center text-xs text-fg-dim">
            Questions before you buy?{" "}
            <a href={`mailto:${site.email}`} className="text-cyan-soft hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-5 pb-16 text-center">
        <p className="text-sm text-fg-muted">
          Not ready to subscribe?{" "}
          <span className="inline-flex items-center gap-1">
            <Button href="/download" variant="ghost">Download the free version instead →</Button>
          </span>
        </p>
      </div>
    </div>
  );
}
