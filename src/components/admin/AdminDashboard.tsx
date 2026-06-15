"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch, adminToken } from "@/lib/api";
import { Icon } from "@/components/Icon";

interface Stats {
  totalLicenses: number;
  customers: number;
  active: number;
  cancelled: number;
  expired: number;
  byTier: Record<string, number>;
  activations: number;
  mrr: number;
  arr: number;
}
interface Row {
  key: string;
  email: string;
  tier: string;
  status: string;
  valid: boolean;
  maxSites: number;
  sitesUsed: number;
  expiresAt: string | null;
  daysLeft: number | null;
  createdAt: string;
}
interface ListResp {
  page: number;
  pages: number;
  total: number;
  licenses: Row[];
}

const money = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [list, setList] = useState<ListResp | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const token = adminToken.get();

  const expire = useCallback(() => {
    adminToken.clear();
    onSignOut();
  }, [onSignOut]);

  // Headline stats — once.
  useEffect(() => {
    apiFetch<Stats>("/api/admin/stats", { token })
      .then(setStats)
      .catch((e) => (/(sign-in|sign in)/i.test(e.message) ? expire() : setError(e.message)));
  }, [token, expire]);

  // License table — refetches on search/filter/page.
  useEffect(() => {
    const q = new URLSearchParams({ page: String(page), limit: "25" });
    if (search) q.set("search", search);
    if (status) q.set("status", status);
    apiFetch<ListResp>(`/api/admin/licenses?${q}`, { token })
      .then(setList)
      .catch((e) => (/(sign-in|sign in)/i.test(e.message) ? expire() : setError(e.message)));
  }, [token, search, status, page, expire]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-fg">Admin</h1>
        <button
          onClick={expire}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-2 text-xs font-semibold text-fg-muted transition-all hover:border-cyan-glow/50 hover:text-cyan-soft"
        >
          <Icon name="logout" className="h-4 w-4" /> Sign out
        </button>
      </div>

      {error && (
        <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      {stats && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Metric icon="users" label="Customers" value={String(stats.customers)} />
          <Metric icon="key" label="Licenses" value={String(stats.totalLicenses)} />
          <Metric icon="check" label="Active" value={String(stats.active)} tone="lime" />
          <Metric icon="globe" label="Sites linked" value={String(stats.activations)} />
          <Metric icon="trending" label="MRR" value={money(stats.mrr)} tone="cyan" />
          <Metric icon="trending" label="ARR" value={money(stats.arr)} tone="cyan" />
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-dim" />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search email, key or site…"
            className="w-full rounded-lg border border-line-strong bg-ink-900/80 py-2.5 pl-9 pr-3 text-sm text-fg outline-none placeholder:text-fg-dim focus:border-cyan-glow/60"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="rounded-lg border border-line-strong bg-ink-900/80 px-3 py-2.5 text-sm text-fg outline-none focus:border-cyan-glow/60"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-dim">
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Sites</th>
                <th className="px-4 py-3 font-medium">Renews</th>
                <th className="px-4 py-3 font-medium">Key</th>
              </tr>
            </thead>
            <tbody>
              {list?.licenses.map((r) => (
                <tr key={r.key} className="border-b border-line/60 last:border-0">
                  <td className="px-4 py-3">
                    <span className="text-fg">{r.email}</span>
                    <span className="block text-xs text-fg-dim">{fmtDate(r.createdAt)}</span>
                  </td>
                  <td className="px-4 py-3 capitalize text-fg-muted">{r.tier}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} valid={r.valid} />
                  </td>
                  <td className="px-4 py-3 text-fg-muted">{r.sitesUsed}/{r.maxSites}</td>
                  <td className="px-4 py-3 text-fg-muted">
                    {r.daysLeft === null ? "—" : r.daysLeft === 0 ? "Expired" : `${r.daysLeft}d`}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-fg-dim">{r.key}</td>
                </tr>
              ))}
              {list && list.licenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-fg-muted">
                    No licenses match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {list && list.pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-fg-muted">
          <span>{list.total} total</span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-line-strong px-3 py-1.5 text-xs disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-xs">
              {page} / {list.pages}
            </span>
            <button
              disabled={page >= list.pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-line-strong px-3 py-1.5 text-xs disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  tone?: "cyan" | "lime";
}) {
  const c = tone === "lime" ? "text-lime-glow" : tone === "cyan" ? "text-cyan-soft" : "text-fg";
  return (
    <div className="card p-4">
      <p className="flex items-center gap-1.5 text-xs text-fg-dim">
        <Icon name={icon} className="h-3.5 w-3.5" /> {label}
      </p>
      <p className={`mt-1.5 text-xl font-bold ${c}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status, valid }: { status: string; valid: boolean }) {
  const label = valid ? status : status === "active" ? "expired" : status;
  const tone =
    valid && status === "active"
      ? "text-lime-glow border-lime-glow/30 bg-lime-glow/10"
      : status === "cancelled"
        ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
        : "text-red-300 border-red-500/30 bg-red-500/10";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${tone}`}>{label}</span>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
