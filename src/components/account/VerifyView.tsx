"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch, sessionToken } from "@/lib/api";
import { Icon } from "@/components/Icon";

/** Exchanges the magic-link token in the URL for a session, then redirects. */
export function VerifyView() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setError("This sign-in link is missing its token.");
      return;
    }
    apiFetch<{ token: string }>("/api/account/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        sessionToken.set(res.token);
        router.replace("/account");
      })
      .catch((e) => setError(e.message));
  }, [params, router]);

  return (
    <div className="card p-8 text-center">
      {error ? (
        <>
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-300 ring-1 ring-red-500/25">
            <Icon name="x" className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-xl font-semibold text-fg">Sign-in failed</h1>
          <p className="mt-2 text-sm text-fg-muted">{error}</p>
          <a href="/account" className="mt-5 inline-block text-xs font-semibold text-cyan-soft hover:underline">
            Request a new link →
          </a>
        </>
      ) : (
        <>
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-glow/15 text-cyan-soft ring-1 ring-cyan-glow/25">
            <Icon name="refresh" className="h-6 w-6 animate-spin" />
          </span>
          <h1 className="mt-5 text-xl font-semibold text-fg">Signing you in…</h1>
        </>
      )}
    </div>
  );
}
