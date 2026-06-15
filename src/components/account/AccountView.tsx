"use client";

import { useEffect, useState } from "react";
import { sessionToken } from "@/lib/api";
import { SignInCard } from "./SignInCard";
import { AccountDashboard } from "./AccountDashboard";

/** Decides between the sign-in card and the dashboard based on a stored token. */
export function AccountView() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(Boolean(sessionToken.get()));
  }, []);

  if (authed === null) return null; // avoid a flash before we read localStorage

  return authed ? (
    <AccountDashboard onSignOut={() => setAuthed(false)} />
  ) : (
    <div className="mx-auto max-w-md">
      <SignInCard />
    </div>
  );
}
