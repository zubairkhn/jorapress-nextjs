import type { Metadata } from "next";
import { AdminView } from "@/components/admin/AdminView";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden px-5 py-16 sm:py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto w-full max-w-6xl">
        <AdminView />
      </div>
    </div>
  );
}
