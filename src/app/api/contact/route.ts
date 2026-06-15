import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/zip",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v.trim() : "";

function transporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field; humans never see it.
  if (clean(form.get("company"))) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(form.get("name"));
  const email = clean(form.get("email"));
  const subject = clean(form.get("subject"));
  const message = clean(form.get("message"));

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long (5000 char max)." },
      { status: 400 }
    );
  }

  // Optional attachment.
  const attachments: { filename: string; content: Buffer }[] = [];
  const file = form.get("attachment");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Attachment exceeds the 10 MB limit." },
        { status: 400 }
      );
    }
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }
    attachments.push({
      filename: file.name || "attachment",
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  const tx = transporter();
  if (!tx) {
    console.error("Contact form: SMTP env vars are not configured.");
    return NextResponse.json(
      { error: "Email is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO || "info@jorapress.com";
  // The envelope address must stay an address the SMTP account is authorized to
  // send for (SPF/DKIM), but we set the *display name* to the submitter so the
  // inbox list shows who wrote in — and replyTo points back at their email.
  const fromAddress =
    process.env.CONTACT_FROM?.match(/<([^>]+)>/)?.[1] ||
    process.env.SMTP_USER ||
    to;
  const from = { name: `${name} via JoraPress`, address: fromAddress };
  const subjectLine = subject
    ? `[JoraPress] ${subject}`
    : `[JoraPress] New message from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : null,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await tx.sendMail({
      from,
      to,
      replyTo: `${name} <${email}>`,
      subject: subjectLine,
      text,
      html: `<table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">
        <tr><td style="color:#666;padding-right:12px">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="color:#666;padding-right:12px">Email</td><td>${esc(email)}</td></tr>
        ${subject ? `<tr><td style="color:#666;padding-right:12px">Subject</td><td>${esc(subject)}</td></tr>` : ""}
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
      <p style="white-space:pre-wrap;font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">${esc(message)}</p>`,
      attachments,
    });
  } catch (err) {
    console.error("Contact form: sendMail failed.", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

/** Minimal HTML escaping for values interpolated into the email body. */
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
