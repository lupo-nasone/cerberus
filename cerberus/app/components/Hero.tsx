"use client";
import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero-full">
      <div className="hero-bg">
        {/* use local hero svg as soft background if available */}
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: "url('/images/sfondo.jpeg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />

        {/* Center content column */}
        <div className="hero-center">
          <div className="hero-center-card">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <p style={{color:'var(--muted)',margin:'6px 0 18px'}}>{t('hero.sub')}</p>

            <h1 className="hero-title">
              {/* split accent if translation contains the word NON like in Italian, otherwise render full title */}
              {(() => {
                const title: string = t('hero.title');
                // if title starts with NON (Italian) or similar, try to accent first word
                const parts = title.split(' ');
                if(parts.length > 1 && (parts[0].toUpperCase() === 'NON' || parts[0].toUpperCase() === "DON'T" || parts[0].toUpperCase() === "DON'T")){
                  const first = parts.shift();
                  return (<><span className="hero-title-accent">{first}</span> {parts.join(' ')}</>);
                }
                return title;
              })()}
            </h1>

            <p className="hero-sub">{t('hero.sub')}</p>

            <div style={{ marginTop: 22, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link href="/contatti" className="btn btn-primary">» {t('hero.ctaPrimary')}</Link>
            </div>
          </div>
        </div>

        {/* Flank images grouped so on small screens they can sit side-by-side below the center card */}
        <div className="hero-flanks">
          <img
            className="hero-flank hero-flank-left"
            src="/images/bro1.png"
            alt="persona sinistra"
          />
          <img
            className="hero-flank hero-flank-right"
            src="/images/bro2.png"
            alt="persona destra"
          />
        </div>
      </div>
    </section>
  );
}
