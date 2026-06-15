// Where the licensing/account backend lives. Set NEXT_PUBLIC_BACKEND_URL in the
// hosting env (e.g. https://api.jorapress.com); falls back to local dev.
export const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

const SESSION_KEY = "jp_session"; // customer account token
const ADMIN_KEY = "jp_admin"; // admin dashboard token

export const sessionToken = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(SESSION_KEY)),
  set: (t: string) => localStorage.setItem(SESSION_KEY, t),
  clear: () => localStorage.removeItem(SESSION_KEY),
};

export const adminToken = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(ADMIN_KEY)),
  set: (t: string) => localStorage.setItem(ADMIN_KEY, t),
  clear: () => localStorage.removeItem(ADMIN_KEY),
};

/** Authenticated JSON fetch against the backend. Throws on non-2xx. */
export async function apiFetch<T = unknown>(
  path: string,
  opts: RequestInit & { token?: string | null } = {}
): Promise<T> {
  const { token, headers, ...rest } = opts;
  const res = await fetch(`${BACKEND}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as { error?: string }).error || `Request failed (${res.status}).`);
  }
  return json as T;
}
