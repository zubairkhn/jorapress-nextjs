import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { CopyField } from "@/components/CopyField";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your JoraPress subscription is confirmed.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

interface SessionSummary {
  email: string | null;
  plan: string | null;
  status: string | null;
  license: {
    key: string;
    tier: string;
    maxSites: number;
    expiresAt: string | null;
    daysLeft: number | null;
  } | null;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // Ask the backend (which owns Stripe) to summarise the session. This call
  // also fulfils the license on demand, so the key is ready here.
  let summary: SessionSummary | null = null;
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";
  if (backend && session_id) {
    try {
      const r = await fetch(
        `${backend}/api/checkout/session?id=${encodeURIComponent(session_id)}`,
        { cache: "no-store" }
      );
      if (r.ok) summary = await r.json();
    } catch {
      // Non-fatal — still show the generic thank-you.
    }
  }

  const planName = summary?.plan ? titleCase(summary.plan) : null;
  const license = summary?.license ?? null;

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-20">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 glow-radial" />
      <div className="card relative w-full max-w-md p-8 text-center sm:p-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime-glow/15 text-lime-glow ring-1 ring-lime-glow/25">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold text-fg">
          You&apos;re all set{planName ? ` — welcome to ${planName}` : ""}!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          Your subscription is confirmed
          {summary?.email ? `, and a receipt is on its way to ${summary.email}` : ""}.
        </p>

        {license ? (
          <div className="mt-7 rounded-xl border border-line-strong bg-ink-900/40 p-5 text-left">
            <CopyField value={license.key} label="Your license key" />
            <p className="mt-3 text-xs leading-relaxed text-fg-dim">
              Activate it in WordPress under <strong className="text-fg-muted">JoraPress → Settings → License</strong>.
              Valid on up to {license.maxSites} site{license.maxSites === 1 ? "" : "s"}. We&apos;ve also emailed it to you.
            </p>
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-line bg-ink-900/40 px-4 py-3 text-sm text-fg-muted">
            Your license key is being generated and will arrive by email shortly.
            You can also find it anytime in your account.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Button href="/account" variant="primary" icon="arrow">Go to your account</Button>
          <Button href="/" variant="outline" icon="arrow">Back to home</Button>
        </div>
      </div>
    </div>
  );
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
