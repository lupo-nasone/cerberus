"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useLocale } from "./lib/LanguageProvider";

export default function Home() {
  const { t } = useLocale();
  const clients = (t('home.clientsList') as unknown) as string[];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />

        {/* Overlap CTA removed per request */}

        {/* Quick intro/features section (inspired layout) */}
        <section className="container intro-section" style={{ padding: '40px 0' }}>
          <div className="intro-grid">
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>{t('home.introTitle')}</h2>
              <p style={{ color: 'var(--muted)', marginTop: 10, maxWidth: 680 }}>{t('home.introText')}</p>

              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 10, height: 10, background: 'var(--brand-700)', borderRadius: 4, marginTop: 6 }} />
                  <div>
                    <strong>{t('services.items.scadenziario.title')}</strong>
                    <div style={{ color: 'var(--muted)' }}>{t('services.items.scadenziario.desc')}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 10, height: 10, background: 'var(--brand-500)', borderRadius: 4, marginTop: 6 }} />
                  <div>
                    <strong>{t('services.items.assistenza.title')}</strong>
                    <div style={{ color: 'var(--muted)' }}>{t('services.items.assistenza.desc')}</div>
                  </div>
                </div>
              </div>
            </div>

            <aside>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>{t('ctaBanner.title')}</h3>
                <p style={{ color: 'var(--muted)' }}>{t('ctaBanner.desc')}</p>
                <div style={{ marginTop: 12 }}>
                  <a href="/contatti" className="btn btn-primary">{t('ctaBanner.button')}</a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Clients / certifications strip */}
        <section style={{ padding: '24px 0', background: 'transparent' }}>
          <div className="container">
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t('home.clientsTitle')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, alignItems: 'center' }}>
              {clients && clients.length ? clients.map((c) => (
                <div key={c} className="card" style={{ textAlign: 'center', padding: 12 }}>{c}</div>
              )) : (
                <>
                  <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda A</div>
                  <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda B</div>
                  <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda C</div>
                  <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda D</div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services container">
          <h2 style={{fontSize:22,fontWeight:600,marginBottom:12}}>{t('services.title')}</h2>
          <div className="services-grid">
            <ServiceCard
              title={t('services.items.scadenziario.title')}
              desc={t('services.items.scadenziario.desc')}
              image="https://source.unsplash.com/600x360/?calendar,planning"
            />
            <ServiceCard
              title={t('services.items.assistenza.title')}
              desc={t('services.items.assistenza.desc')}
              image="https://source.unsplash.com/600x360/?inspection,inspection-team"
            />
            <ServiceCard
              title={t('services.items.consulenza.title')}
              desc={t('services.items.consulenza.desc')}
              image="https://source.unsplash.com/600x360/?consulting,documents"
            />
          </div>
        </section>

        {/* CTA banner */}
        <section style={{ padding: '28px 0' }}>
          <div className="container">
            <div className="cta-banner">
              <div>
                <h3 style={{ margin: 0 }}>{t('ctaBanner.title')}</h3>
                <p style={{ margin: '6px 0 0', opacity: .95 }}>{t('ctaBanner.desc')}</p>
              </div>

              <div>
                <a href="/contatti" className="btn btn-primary">{t('ctaBanner.button')}</a>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>

      
      <Footer />
    </div>
  );
}
