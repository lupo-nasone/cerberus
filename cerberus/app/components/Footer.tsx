"use client";
import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";
import Reveal from "./Reveal";

export default function Footer() {
  const { t } = useLocale();

  const footerLinks = [
    { label: t('header.servizi'), href: '/servizi' },
    { label: t('header.blog'), href: '/blog' },
    { label: t('header.about'), href: '/chi-siamo' },
    { label: t('header.contatti'), href: '/contatti' },
  ];

  return (
    <footer className="site-footer" style={{ padding: '60px 0 40px' }}>
      {/* Decorative top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: 600,
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--brand-700), transparent)',
        opacity: 0.5
      }} />

      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40
        }}>
          {/* Brand Section */}
          <Reveal variant="fade-up">
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  C
                </div>
                <span style={{ fontWeight: 700, fontSize: 20, color: '#f1f5fa' }}>
                  Cerberus
                </span>
              </div>
              <p style={{ 
                color: 'var(--muted)', 
                lineHeight: 1.6, 
                fontSize: 14,
                maxWidth: 260 
              }}>
                {t('footer.tagline')}
              </p>
            </div>
          </Reveal>

          {/* Links Section */}
          <Reveal variant="fade-up" delay={100}>
            <div>
              <h5 style={{ 
                margin: '0 0 16px 0', 
                fontWeight: 600, 
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-700)'
              }}>
                Navigazione
              </h5>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {footerLinks.map((link, index) => (
                  <li key={index} style={{ marginBottom: 10 }}>
                    <Link 
                      href={link.href}
                      style={{
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        fontSize: 14,
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                      className="footer-link"
                    >
                      <span style={{ 
                        opacity: 0.5, 
                        transition: 'opacity 0.2s ease',
                        fontSize: 10
                      }}>→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Creators Section */}
          <Reveal variant="fade-up" delay={200}>
            <div>
              <h5 style={{ 
                margin: '0 0 16px 0', 
                fontWeight: 600, 
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-700)'
              }}>
                Il Team
              </h5>
              <p style={{ 
                color: 'var(--muted)', 
                fontSize: 13, 
                lineHeight: 1.6,
                marginBottom: 16 
              }}>
                Scopri chi ha creato questo progetto
              </p>
              <Link 
                href="/credits" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 10,
                  background: 'rgba(44, 79, 136, 0.15)',
                  border: '1px solid rgba(65, 113, 184, 0.3)',
                  color: '#9eb7e4',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                className="creators-btn"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {t('footer.creators')}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <Reveal variant="fade-up" delay={300}>
          <div style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(148, 163, 184, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <span style={{ color: 'var(--muted-2)', fontSize: 13 }}>
              {t('footer.rights')}
            </span>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ 
                color: 'var(--muted-2)', 
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span style={{ 
                  width: 6, 
                  height: 6, 
                  borderRadius: '50%', 
                  background: '#1d8a6d',
                  boxShadow: '0 0 8px #1d8a6d'
                }} />
                Made in Italy 🇮🇹
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .footer-link:hover {
          color: #9eb7e4 !important;
          transform: translateX(4px);
        }
        .footer-link:hover span {
          opacity: 1 !important;
        }
        .creators-btn:hover {
          background: rgba(44, 79, 136, 0.25) !important;
          border-color: rgba(65, 113, 184, 0.5) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 79, 136, 0.3);
        }
      `}</style>
    </footer>
  );
}
