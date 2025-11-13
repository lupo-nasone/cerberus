"use client";

import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";

export default function Header() {
  const { lang, setLang, t } = useLocale();
  function toggleLang(){
    setLang(lang === 'it' ? 'en' : 'it');
  }

  // small translation map for header labels
  // Use translation helper from context
  // const t = useTranslation();
  return (
    <header className="site-header">
      <div className="wrap container">
        <button aria-label="Toggle language" className="lang-toggle" onClick={toggleLang}>
          {lang === 'it' ? 'EN' : 'IT'}
        </button>

        <Link href="/" className="brand">
          <img className="brand-logo" src="/images/logo.png" alt="Cerberus" width={64} height={64} />
          <span className="brand-name">{t('header.brand')}</span>
        </Link>

        <nav className="nav">
          <Link href="/servizi">{t('header.servizi')}</Link>
          <Link href="/blog">{t('header.blog')}</Link>
          <Link href="/about">{t('header.about')}</Link>
          <Link href="/contatti" className="cta">{t('header.contatti')}</Link>
        </nav>

        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {/* theme toggle removed to enforce dark-only mode */}
        </div>
      </div>
    </header>
  );
}
