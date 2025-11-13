"use client";
import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="hero-full">
      <div className="hero-bg">
        {/* Soft blurred industrial background */}
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?factory,warehouse,industry')",
          }}
        />

        {/* Left and right flank images (people in hi-vis) */}
        <img
          className="hero-flank hero-flank-left"
          src="https://source.unsplash.com/300x500/?man,worker,helmet"
          alt=""
        />
        <img
          className="hero-flank hero-flank-right"
          src="https://source.unsplash.com/300x500/?man,engineer,vest"
          alt=""
        />

        {/* Center content column */}
        <div className="hero-center">
          <div className="hero-center-card">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1 className="hero-title">
              <span className="hero-title-accent">{t('hero.title').split(' ')[0]}</span> {t('hero.title').replace(t('hero.title').split(' ')[0],'')}
            </h1>
            <p className="hero-sub">{t('hero.sub')}</p>

            <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link href="/contatti" className="btn btn-primary">{t('hero.ctaPrimary')}</Link>
              <Link href="/servizi" className="btn btn-ghost">{t('hero.ctaSecondary')}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
