"use client";

import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";
import { useState } from "react";

export default function Header() {
  const { lang, setLang, t } = useLocale();
  const [open, setOpen] = useState(false);
  function toggleLang(){
    setLang(lang === 'it' ? 'en' : 'it');
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-row">
          <nav className="nav-left" aria-label="Main navigation">
            {/* logo */}
            <Link href="/" className="top-logo-link" aria-label="Home">
              <img src="/images/logo.png" className="top-logo" alt="Cerberus" />
            </Link>
            {/* Company text (replaces primary links) */}
            <div className="company-text-inline ml-4 text-sm text-gray-900 hidden md:block">
              Cerberus S.r.l. – Verifiche ispettive e gestione obblighi di legge
            </div>
          </nav>

          <div className="top-right flex items-center gap-3">
            {/* Hamburger visible on small screens; language toggle stays always visible outside the mobile menu */}
            <button
              className="hamburger-toggle"
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              <span className="hamburger-icon" aria-hidden>{open ? '✕' : '☰'}</span>
            </button>

            <button aria-label="Toggle language" className="lang-toggle" onClick={toggleLang}>
              {lang === 'it' ? 'EN' : 'IT'}
            </button>

            {/* Phone and email added */}
            <a href="tel:+[numero]" className="contact-link text-sm text-gray-700 hover:text-gray-900" aria-label="Telefono">☎ [numero]</a>
            <a href="mailto:[email]" className="contact-link text-sm text-gray-700 hover:text-gray-900" aria-label="Email">📧 [email]</a>

            <Link href="/contatti" className="top-cta ml-2">Richiedi il Check-up</Link>
          </div>
        </div>

        {/* Mobile nav - appears below the topbar */}
        <div id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`} aria-hidden={!open}>
          <div className="container">
            <nav className="mobile-links">
              <Link href="/servizi" className="mobile-link" onClick={() => setOpen(false)}>{t('header.servizi')}</Link>
              <Link href="/blog" className="mobile-link" onClick={() => setOpen(false)}>{t('header.blog')}</Link>
              <Link href="/about" className="mobile-link" onClick={() => setOpen(false)}>{t('header.about')}</Link>
              <Link href="/contatti" className="mobile-link mobile-cta" onClick={() => setOpen(false)}>{t('header.contatti')}</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
