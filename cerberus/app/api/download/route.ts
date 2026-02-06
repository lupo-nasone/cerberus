import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const REQUIRED_ENV = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CHAT_RECIPIENT_EMAIL",
  "CHAT_FROM_EMAIL",
] as const;

type RequiredEnv = (typeof REQUIRED_ENV)[number];

type DownloadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
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

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const env = validateEnv();
    const body = (await request.json()) as Partial<DownloadPayload> | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!firstName || !lastName || !email || !company || !phone) {
      return NextResponse.json({ error: "Tutti i campi sono obbligatori" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    const subject = `Download guida – ${firstName} ${lastName}`;

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;">
        <h2 style="margin:0 0 12px;">Richiesta download guida</h2>
        <p><strong>Nome:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Cognome:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Azienda:</strong> ${escapeHtml(company)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(phone)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: env.CHAT_FROM_EMAIL,
      to: env.CHAT_RECIPIENT_EMAIL,
      subject,
      text: `Richiesta download guida\nNome: ${firstName}\nCognome: ${lastName}\nEmail: ${email}\nAzienda: ${company}\nTelefono: ${phone}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Download mail error", error);
    return NextResponse.json(
      { error: "Impossibile inviare il messaggio" },
      { status: 500 }
    );
  }
}
