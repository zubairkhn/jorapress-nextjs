"use client";

import { useEffect, useState } from "react";
import { apiFetch, sessionToken, BACKEND } from "@/lib/api";
import { Icon } from "@/components/Icon";
import { CopyField } from "@/components/CopyField";

interface Site {
  url: string;
  version: string | null;
  activatedAt: string;
  lastSeenAt: string;
}
interface License {
  key: string;
  tier: string;
  status: string;
  maxSites: number;
  sitesUsed: number;
  expiresAt: string | null;
  daysLeft: number | null;
  valid: boolean;
  canManageBilling: boolean;
  createdAt: string;
  sites: Site[];
}
interface Me {
  email: string;
  licenses: License[];
}

export function AccountDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [data, setData] = useState<Me | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<Me>("/api/account/me", { token: sessionToken.get() })
      .then(setData)
      .catch((e) => {
        // Expired/invalid session — bounce back to sign-in.
        if (/sign in/i.test(e.message)) {
          sessionToken.clear();
          onSignOut();
        } else {
          setError(e.message);
        }
      });
  }, [onSignOut]);

  function signOut() {
    sessionToken.clear();
    onSignOut();
  }

  if (error) {
    return <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>;
  }
  if (!data) {
    return <p className="text-sm text-fg-muted">Loading your account…</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Your account</h1>
          <p className="mt-1 text-sm text-fg-muted">{data.email}</p>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-2 text-xs font-semibold text-fg-muted transition-all hover:border-cyan-glow/50 hover:text-cyan-soft"
        >
          <Icon name="logout" className="h-4 w-4" /> Sign out
        </button>
      </div>

      {data.licenses.length === 0 ? (
        <p className="rounded-lg border border-line bg-ink-900/40 px-4 py-6 text-center text-sm text-fg-muted">
          No licenses on this account yet.
        </p>
      ) : (
        <div className="space-y-6">
          {data.licenses.map((lic) => (
            <LicenseCard key={lic.key} lic={lic} />
          ))}
        </div>
      )}
    </div>
  );
}

function LicenseCard({ lic }: { lic: License }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function manageBilling() {
    setBusy(true);
    setErr("");
    try {
      const { url } = await apiFetch<{ url: string }>("/api/account/portal", {
        method: "POST",
        token: sessionToken.get(),
        body: JSON.stringify({ key: lic.key }),
      });
      window.location.href = url;
    } catch (e) {
      setErr((e as Error).message);
      setBusy(false);
    }
  }

  function download() {
    const t = sessionToken.get();
    // Fetch the zip as a blob so the Bearer header applies, then trigger a save.
    fetch(`${BACKEND}/api/account/download?key=${encodeURIComponent(lic.key)}`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Download failed.");
        return r.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "jorapress.zip";
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((e) => setErr(e.message));
  }

  const statusTone =
    lic.status === "active" && lic.valid
      ? "text-lime-glow border-lime-glow/30 bg-lime-glow/10"
      : lic.status === "cancelled"
        ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
        : "text-red-300 border-red-500/30 bg-red-500/10";

  return (
    <div className="card p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-ink-800/80 text-cyan-glow">
            <Icon name="key" className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-fg">JoraPress {titleCase(lic.tier)}</p>
            <p className="text-xs text-fg-dim">Since {fmtDate(lic.createdAt)}</p>
          </div>
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusTone}`}>
          {lic.valid ? lic.status : lic.status === "active" ? "expired" : lic.status}
        </span>
      </div>

      <CopyField value={lic.key} label="License key" />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat icon="globe" label="Sites used" value={`${lic.sitesUsed} / ${lic.maxSites}`} />
        <Stat
          icon="clock"
          label="Renews / expires"
          value={lic.daysLeft === null ? "—" : lic.daysLeft === 0 ? "Expired" : `${lic.daysLeft} days`}
        />
        <Stat icon="check" label="Expiry date" value={lic.expiresAt ? fmtDate(lic.expiresAt) : "No expiry"} />
      </div>

      {lic.sites.length > 0 && (
        <div className="mt-5 rounded-lg border border-line bg-ink-900/40 p-3">
          <p className="mb-2 text-xs font-medium text-fg-dim">Linked sites</p>
          <ul className="space-y-1.5">
            {lic.sites.map((s) => (
              <li key={s.url} className="flex items-center justify-between gap-3 text-xs">
                <span className="truncate font-mono text-fg-muted">{s.url}</span>
                <span className="shrink-0 text-fg-dim">
                  {s.version ? `v${s.version} · ` : ""}seen {fmtDate(s.lastSeenAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2.5">
        <button
          onClick={download}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-soft via-cyan-glow to-lime-glow px-4 py-2 text-xs font-bold text-ink-950 transition-all hover:-translate-y-0.5"
        >
          <Icon name="download" className="h-4 w-4" /> Download plugin
        </button>
        {lic.canManageBilling && (
          <button
            onClick={manageBilling}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-4 py-2 text-xs font-semibold text-fg-muted transition-all hover:border-cyan-glow/50 hover:text-cyan-soft disabled:opacity-60"
          >
            <Icon name="external" className="h-4 w-4" /> {busy ? "Opening…" : "Manage billing"}
          </button>
        )}
      </div>
      {err && <p className="mt-3 text-xs text-red-300">{err}</p>}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-ink-900/40 p-3">
      <p className="flex items-center gap-1.5 text-xs text-fg-dim">
        <Icon name={icon} className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-fg">{value}</p>
    </div>
  );
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
