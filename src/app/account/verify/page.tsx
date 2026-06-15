import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyView } from "@/components/account/VerifyView";

export const metadata: Metadata = {
  title: "Signing in",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 glow-radial" />
      <div className="relative mx-auto w-full max-w-md">
        <Suspense fallback={null}>
          <VerifyView />
        </Suspense>
      </div>
    </div>
  );
}
