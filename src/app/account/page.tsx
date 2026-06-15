import type { Metadata } from "next";
import { AccountView } from "@/components/account/AccountView";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your JoraPress license, linked sites and subscription.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <div className="relative min-h-[70vh] overflow-hidden px-5 py-16 sm:py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 glow-radial" />
      <div className="relative mx-auto w-full max-w-2xl">
        <AccountView />
      </div>
    </div>
  );
}
