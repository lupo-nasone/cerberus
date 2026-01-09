"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapClient from "../components/MapClient";
import { useLocale } from "../../app/lib/LanguageProvider";

// metadata is intentionally handled at the layout level for client-side translated pages

type FormStatus = "idle" | "sending" | "success" | "error" | "missing" | "invalidEmail";

type StatusStyle = { background: string; border: string; color: string };

const SUCCESS_STATUS_STYLE: StatusStyle = {
  background: "rgba(34,197,94,0.12)",
  border: "1px solid rgba(34,197,94,0.4)",
  color: "#4ade80"
};

const ERROR_STATUS_STYLE: StatusStyle = {
  background: "rgba(248,113,113,0.14)",
  border: "1px solid rgba(248,113,113,0.4)",
  color: "#fda4af"
};

export default function ContattiPage() {
  const { t } = useLocale();
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const statusMessageKey = (() => {
    switch (status) {
      case "success":
        return "contact.form.success";
      case "error":
        return "contact.form.error";
      case "missing":
        return "contact.form.missing";
      case "invalidEmail":
        return "contact.form.invalidEmail";
      default:
        return null;
    }
  })();

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof typeof formValues;
    setFormValues(prev => ({ ...prev, [field]: event.target.value }));
    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
    }
  }

  function isValidEmail(email: string) {
    const at = email.indexOf("@");
    if (at <= 0) return false;
    const dot = email.indexOf(".", at + 2);
    if (dot <= at + 1) return false;
    if (dot === email.length - 1) return false;
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const message = formValues.message.trim();

    if (!name || !email || !message) {
      setStatus("missing");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("invalidEmail");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "contact-form" })
      });

      if (!response.ok) {
        let nextStatus: FormStatus = "error";
        try {
          const data = await response.json();
          if (data?.error === "Missing fields") nextStatus = "missing";
          if (data?.error === "Invalid email") nextStatus = "invalidEmail";
        } catch {
          // ignore JSON parse issues and fall back to generic error
        }
        setStatus(nextStatus);
        return;
      }

      setFormValues({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission error", error);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container">
        <section style={{ margin: "28px 0" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{t('contact.title')}</h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>{t('contact.intro')}</p>
        </section>

        <section className="contact-grid">
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {statusMessageKey && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginBottom: 16,
                    padding: "12px 14px",
                    borderRadius: 10,
                    fontSize: 14,
                    lineHeight: 1.5,
                    ...(status === "success" ? SUCCESS_STATUS_STYLE : ERROR_STATUS_STYLE)
                  }}
                >
                  {t(statusMessageKey)}
                </div>
              )}

              <div className="form-field">
                <label htmlFor="name">{t('contact.form.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={formValues.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">{t('contact.form.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={formValues.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="form-control"
                  value={formValues.message}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                  style={{ opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </div>
            </form>
          </div>

          <aside className="contact-aside">
            <div className="card">
              <h3 style={{ marginTop: 0 }}>{t('contact.contactsTitle')}</h3>
              <p style={{ margin: 6, color: "var(--muted)" }}>
                {t('contact.emailLabel')} <a href="mailto:segreteria@cerberussrl.it">segreteria@cerberussrl.it</a>
                <br />
                {t('contact.phoneLabel')} <a href="tel:+3905741596267">0574 1596267</a>
              </p>

              <h4 style={{ marginBottom: 6 }}>{t('contact.office')}</h4>
              <p style={{ margin: 0, color: "var(--muted)" }}>Via Alcide De Gasperi, 77/B - 59100 Prato</p>

              <div style={{ marginTop: 12 }}>
                <h4 style={{ marginBottom: 6 }}>{t('contact.follow')}</h4>
                <p style={{ margin: 0, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <a href="https://facebook.com/cerberussrl" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ color: 'var(--brand-700)', display: 'inline-flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.84 7.94 9.78v-6.92H7.9v-2.86h2.04V9.41c0-2.02 1.2-3.13 3.03-3.13.88 0 1.8.16 1.8.16v1.98h-1.01c-.99 0-1.3.62-1.3 1.26v1.51h2.22l-.35 2.86h-1.87V21.8C18.56 20.84 22 16.84 22 12z" />
                    </svg>
                  </a>

                  <a href="https://instagram.com/cerberussrl" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: 'var(--brand-700)', display: 'inline-flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" />
                      <path d="M17.5 6.5h.01" stroke="currentColor" />
                    </svg>
                  </a>

                  <a href="https://www.linkedin.com/company/cerberussrl" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--brand-700)', display: 'inline-flex' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M4.98 3.5C4.98 4.6 4.12 5.5 3 5.5S1 4.6 1 3.5 1.86 1.5 3 1.5s1.98.9 1.98 2zM.5 8.5h5V23h-5v-14.5zM8.5 8.5h4.8v2h.1c.7-1.3 2.4-2.6 4.9-2.6 5.2 0 6.1 3.4 6.1 7.8V23h-5V16.5c0-1.5 0-3.5-2.1-3.5-2.1 0-2.4 1.6-2.4 3.4V23h-5v-14.5z" />
                    </svg>
                  </a>
                </p>
              </div>

              <div style={{ marginTop: 14 }}>
                <h4 style={{ marginBottom: 8 }}>{t('contact.where')}</h4>
                <div style={{ width: '100%' }}>
                  {/* Client-side map component (Leaflet) */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <MapClient />
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
