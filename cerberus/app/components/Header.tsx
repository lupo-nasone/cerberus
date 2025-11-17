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

            {/* Primary links - on small screens these will be hidden in favor of the hamburger */}
            <div className="primary-links">
              <Link href="/servizi" className="top-link">{t('header.servizi')}</Link>
              <Link href="/blog" className="top-link">{t('header.blog')}</Link>
              <Link href="/about" className="top-link">{t('header.about')}</Link>
            </div>
          </nav>

          <div className="top-right" style={{display:'flex',alignItems:'center',gap:12}}>
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

            <Link href="/contatti" className="top-cta">{t('header.contatti')}</Link>
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
