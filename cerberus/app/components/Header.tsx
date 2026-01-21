"use client";

import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";
import { useState } from "react";

export default function Header() {
  const { lang, setLang, t } = useLocale();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/servizi", label: t("header.servizi") },
    { href: lang === "it" ? "/chi-siamo" : "/about", label: t("header.about") },
    { href: "/blog", label: t("header.blog") },
    { href: "/contatti", label: t("header.contatti") }
  ];

  const toggleLang = () => setLang(lang === "it" ? "en" : "it");
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-shell">
        <Link href="/" className="header-brand" aria-label="Home">
          <span className="header-logo">
            <img src="/images/logo.png" alt="Cerberus" />
          </span>
          <span className="header-brand-text">
            <span className="header-brand-name">Cerberus</span>
            <span className="header-brand-tagline">Verifiche ispettive &amp; gestione obblighi</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Navigazione principale">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-contact">
            <a href="tel:+3905741596267" className="header-contact-link" aria-label="Telefono">
              ☎ 0574 1596267
            </a>
            <a href="mailto:segreteria@cerberussrl.it" className="header-contact-link" aria-label="Email">
              📧 segreteria@cerberussrl.it
            </a>
          </div>
          <button aria-label="Cambia lingua" className="lang-toggle" onClick={toggleLang}>
            {lang === "it" ? "EN" : "IT"}
          </button>
          <button
            className="header-hamburger"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="header-drawer"
            onClick={toggleMenu}
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <div
        id="header-drawer"
        className={`header-drawer ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="container header-drawer-inner">
          <nav className="drawer-nav" aria-label="Navigazione mobile">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className="drawer-nav-link"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="drawer-footer">
            <div className="drawer-contact">
                <a
                  href="tel:+3905741596267"
                  className="drawer-contact-link"
                  onClick={closeMenu}
                  aria-label="Telefono"
                >
                  ☎ 0574 1596267
                </a>
                <a
                  href="mailto:segreteria@cerberussrl.it"
                  className="drawer-contact-link"
                  onClick={closeMenu}
                  aria-label="Email"
                >
                  📧 segreteria@cerberussrl.it
                </a>
            </div>
            <Link href="/contatti" className="btn btn-primary drawer-cta" onClick={closeMenu}>
              {t("ctaBanner.button")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
