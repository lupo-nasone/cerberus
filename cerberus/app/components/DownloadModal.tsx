"use client";
import { FormEvent, useState } from "react";

type DownloadModalProps = {
  open: boolean;
  onClose: () => void;
};

const FILE_URL = "/files/Le 7 verifiche da non trascurare.docx";

export default function DownloadModal({ open, onClose }: DownloadModalProps) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
    };

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Errore durante l'invio");
      }

      // Avvia il download
      const a = document.createElement("a");
      a.href = FILE_URL;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Errore durante l'invio");
    } finally {
      setSending(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="download-modal-backdrop" onClick={handleBackdropClick}>
      <div className="download-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="download-modal-close"
          onClick={onClose}
          aria-label="Chiudi"
        >
          ✕
        </button>

        <h2 className="download-modal-title">Scarica la guida gratuita</h2>
        <p className="download-modal-subtitle">
          Compila il modulo per scaricare &ldquo;Le 7 verifiche da non trascurare&rdquo;.
        </p>

        <form className="download-modal-form" onSubmit={handleSubmit}>
          <label className="download-modal-field">
            <span>Nome *</span>
            <input
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Mario"
            />
          </label>
          <label className="download-modal-field">
            <span>Cognome *</span>
            <input
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Rossi"
            />
          </label>
          <label className="download-modal-field">
            <span>Email *</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="mario@azienda.it"
            />
          </label>
          <label className="download-modal-field">
            <span>Azienda *</span>
            <input
              name="company"
              type="text"
              required
              autoComplete="organization"
              placeholder="Azienda S.r.l."
            />
          </label>
          <label className="download-modal-field">
            <span>Telefono *</span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+39 333 1234567"
            />
          </label>

          {error && <p className="download-modal-error">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary download-modal-submit"
            disabled={sending}
          >
            {sending ? "Invio in corso…" : "Scarica il file"}
          </button>
        </form>
      </div>
    </div>
  );
}
