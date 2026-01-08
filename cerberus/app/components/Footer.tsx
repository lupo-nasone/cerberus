"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "../lib/LanguageProvider";
import Reveal from "./Reveal";

export default function Footer() {
  const { t } = useLocale();
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretClick = () => {
    // Reset timeout on each click
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setClickCount(0);
      router.push("/credits");
    } else {
      // Reset count after 2 seconds of no clicks
      timeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container foot-wrap">
        <Reveal variant="fade-up">
          <div 
            onClick={handleSecretClick}
            style={{
              fontWeight: 700,
              fontSize: 18,
              cursor: "default",
              userSelect: "none"
            }}
          >
            Cerberus
          </div>
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
