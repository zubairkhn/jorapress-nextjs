import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your JoraPress subscription is confirmed.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // Ask the backend (which owns Stripe) to summarise the session.
  let email: string | null = null;
  let planName: string | null = null;
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  if (backend && session_id) {
    try {
      const r = await fetch(
        `${backend}/api/checkout/session?id=${encodeURIComponent(session_id)}`,
        { cache: "no-store" }
      );
      if (r.ok) {
        const s = await r.json();
        email = s.email ?? null;
        planName = s.plan ? titleCase(String(s.plan)) : null;
      }
    } catch {
      // Non-fatal — still show the generic thank-you.
    }
  }

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-20">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 glow-radial" />
      <div className="card relative w-full max-w-md p-10 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime-glow/15 text-lime-glow ring-1 ring-lime-glow/25">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold text-fg">
          You&apos;re all set{planName ? ` — welcome to ${planName}` : ""}!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          Your subscription is confirmed{email ? `, and a receipt is on its way to ${email}` : ""}.
          Your license key and setup instructions will arrive by email shortly.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button href="/download" variant="primary" icon="download">Download JoraPress</Button>
          <Button href="/" variant="outline" icon="arrow">Back to home</Button>
        </div>
      </div>
    </div>
  );
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
