"use client";
import { useLocale } from "../lib/LanguageProvider";
import Reveal from "./Reveal";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer">
      <div className="container foot-wrap">
        <Reveal variant="fade-up">
          <div style={{fontWeight:700,fontSize:18}}>Cerberus</div>
          <p>Soluzioni per la conformità e la sicurezza aziendale.</p>
        </Reveal>

        <Reveal variant="fade-up" delay={120}>
          <div>
            <h5 style={{margin:0,fontWeight:600}}>Links</h5>
            <ul style={{marginTop:8,color:'var(--muted)'}}>
              <li>{t('header.servizi')}</li>
              <li>{t('header.blog')}</li>
              <li>{t('header.contatti')}</li>
            </ul>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={220}>
          <div style={{alignSelf:'center',opacity:.9}}>{t('footer.rights')}</div>
        </Reveal>
      </div>
    </footer>
  );
}
