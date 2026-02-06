import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const REQUIRED_ENV = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CHAT_RECIPIENT_EMAIL",
  "CHAT_FROM_EMAIL"
] as const;

type RequiredEnv = (typeof REQUIRED_ENV)[number];

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  source?: string;
};

function validateEnv(): Record<RequiredEnv, string> {
  const missing: RequiredEnv[] = [];
  const values = {} as Record<RequiredEnv, string>;

  for (const key of REQUIRED_ENV) {
    const value = process.env[key];
    if (!value) {
      missing.push(key);
    } else {
      values[key] = value;
    }
  }

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  return values;
}

function isValidEmail(email: string) {
  const at = email.indexOf("@");
  if (at <= 0) return false;
  const dot = email.indexOf(".", at + 2);
  if (dot <= at + 1) return false;
  if (dot === email.length - 1) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const env = validateEnv();
  const body = (await request.json()) as Partial<ContactPayload> | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim().toLowerCase() : "chat";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    });

  const originLabel = source === "contact-form" ? "Modulo contatti" : "Chat assistente";
  const subject = source === "contact-form" ? `Nuova richiesta dal sito – ${name}` : `Nuova richiesta chat – ${name}`;

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;">
        <h2 style="margin:0 0 12px;">Nuovo messaggio – ${escapeHtml(originLabel)}</h2>
        <p><strong>Origine:</strong> ${escapeHtml(originLabel)}</p>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Messaggio:</strong></p>
        <pre style="white-space:pre-wrap;background:#f5f7fb;padding:16px;border-radius:8px;border:1px solid #dce2f0;">${escapeHtml(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: env.CHAT_FROM_EMAIL,
      to: env.CHAT_RECIPIENT_EMAIL,
      subject,
      text: `Origine: ${originLabel}\nNome: ${name}\nEmail: ${email}\nMessaggio:\n${message}`,
      html
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chat mail error", error);
    return NextResponse.json(
      { error: "Unable to send message" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
