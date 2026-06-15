"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

type Status = "idle" | "sending" | "success" | "error";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // keep in sync with the API route
const ACCEPT = ".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.zip,.doc,.docx";

function prettySize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(f: File | null) {
    setError("");
    if (f && f.size > MAX_FILE_BYTES) {
      setError("Attachment exceeds the 10 MB limit.");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setFile(f);
  }

  function clearFile() {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const data = new FormData(e.currentTarget);
      // Re-attach the controlled file (input value can't be set programmatically).
      data.delete("attachment");
      if (file) data.set("attachment", file);

      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      formRef.current?.reset();
      clearFile();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime-glow/15 text-lime-glow ring-1 ring-lime-glow/25">
          <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="text-xl font-semibold text-fg">Message sent</h3>
        <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
          Thanks for reaching out — we&apos;ll get back to you at the email you
          provided as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-cyan-soft hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="card p-7 sm:p-8">
      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" placeholder="Jane Doe" required disabled={sending} />
        <Field
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          required
          disabled={sending}
        />
      </div>

      <div className="mt-5">
        <Field
          name="subject"
          label="Subject"
          placeholder="How can we help?"
          disabled={sending}
        />
      </div>

      <label className="mt-5 block">
        <span className="text-xs font-medium text-fg-muted">
          Message <span className="text-cyan-soft">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          disabled={sending}
          placeholder="Tell us what you need…"
          className="mt-1.5 w-full resize-y rounded-lg border border-line bg-ink-850 px-3 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-dim focus:border-cyan-glow/50 focus:ring-2 focus:ring-cyan-glow/15 disabled:opacity-60"
        />
      </label>

      {/* Attachment */}
      <div className="mt-5">
        <span className="text-xs font-medium text-fg-muted">
          Attachment <span className="text-fg-dim">(optional, max 10 MB)</span>
        </span>
        {file ? (
          <div className="mt-1.5 flex items-center justify-between gap-3 rounded-lg border border-line bg-ink-850 px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-2.5 text-sm text-fg">
              <Icon name="paperclip" className="h-4 w-4 shrink-0 text-cyan-glow" />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-fg-dim">{prettySize(file.size)}</span>
            </span>
            <button
              type="button"
              onClick={clearFile}
              disabled={sending}
              className="shrink-0 rounded-md p-1 text-fg-dim hover:text-fg"
              aria-label="Remove attachment"
            >
              <Icon name="x" className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={sending}
            className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong bg-ink-850/60 px-3 py-3.5 text-sm text-fg-muted transition-colors hover:border-cyan-glow/40 hover:text-fg"
          >
            <Icon name="paperclip" className="h-4 w-4" />
            Attach a file
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          name="attachment"
          accept={ACCEPT}
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-soft via-cyan-glow to-lime-glow px-5 py-3 text-sm font-bold text-ink-950 shadow-[0_8px_28px_-10px_rgba(34,211,238,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {sending ? "Sending…" : "Send message"}
        <Icon name={sending ? "sparkle" : "send"} className={`h-4 w-4 ${sending ? "animate-spin" : ""}`} />
      </button>

      <p className="mt-4 text-center text-xs text-fg-dim">
        We&apos;ll only use your details to reply to this enquiry.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-fg-muted">
        {label} {required && <span className="text-cyan-soft">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-line bg-ink-850 px-3 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-fg-dim focus:border-cyan-glow/50 focus:ring-2 focus:ring-cyan-glow/15 disabled:opacity-60"
      />
    </label>
  );
}
