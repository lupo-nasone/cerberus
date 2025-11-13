"use client";
import { useLocale } from "../lib/LanguageProvider";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer">
      <div className="container foot-wrap">
        <div>
          <div style={{fontWeight:700,fontSize:18}}>Cerberus</div>
          <p>Soluzioni per la conformità e la sicurezza aziendale.</p>
        </div>

        <div>
          <h5 style={{margin:0,fontWeight:600}}>Links</h5>
          <ul style={{marginTop:8,color:'var(--muted)'}}>
            <li>{t('header.servizi')}</li>
            <li>{t('header.blog')}</li>
            <li>{t('header.contatti')}</li>
          </ul>
        </div>

        <div style={{alignSelf:'center',opacity:.9}}>{t('footer.rights')}</div>
      </div>
    </footer>
  );
}
