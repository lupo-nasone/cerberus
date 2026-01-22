"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h3>🍪 Utilizziamo i cookie</h3>
          <p>
            Questo sito utilizza cookie tecnici necessari per il funzionamento e cookie analitici 
            per migliorare la tua esperienza. Puoi accettare tutti i cookie o solo quelli necessari.
            Per maggiori informazioni consulta la nostra{" "}
            <Link href="/privacy" className="cookie-link">Privacy Policy</Link>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button onClick={acceptNecessary} className="cookie-btn cookie-btn-secondary">
            Solo necessari
          </button>
          <button onClick={acceptAll} className="cookie-btn cookie-btn-primary">
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}
