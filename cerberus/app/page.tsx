"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ServiceCard from "./components/ServiceCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { useLocale } from "./lib/LanguageProvider";

export default function Home() {
  const { t } = useLocale();
  const clients = (t('home.clientsList') as unknown) as string[];
  const services = [
    {
      title: t('services.items.scadenziario.title'),
      desc: t('services.items.scadenziario.desc'),
      image: "https://source.unsplash.com/600x360/?calendar,planning"
    },
    {
      title: t('services.items.assistenza.title'),
      desc: t('services.items.assistenza.desc'),
      image: "https://source.unsplash.com/600x360/?inspection,inspection-team"
    },
    {
      title: t('services.items.consulenza.title'),
      desc: t('services.items.consulenza.desc'),
      image: "https://source.unsplash.com/600x360/?consulting,documents"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />
        <HowItWorks />

        {/* Overlap CTA removed per request */}

        {/* Quick intro/features section (inspired layout) */}
        <section className="container intro-section" style={{ padding: '40px 0' }}>
          <div className="intro-grid">
            <Reveal variant="fade-up">
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
            </Reveal>

            <Reveal as="aside" variant="fade-up" delay={120}>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>{t('ctaBanner.title')}</h3>
                <p style={{ color: 'var(--muted)' }}>{t('ctaBanner.desc')}</p>
                <div style={{ marginTop: 12 }}>
                  <a href="/contatti" className="btn btn-primary">{t('ctaBanner.button')}</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Clients / certifications strip */}
        <section style={{ padding: '24px 0', background: 'transparent' }}>
          <div className="container">
            <Reveal as="h3" variant="fade-up" style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
              {t('home.clientsTitle')}
            </Reveal>
            <Reveal
              variant="fade-up"
              delay={100}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, alignItems: 'center' }}
            >
              {clients && clients.length ? (
                clients.map((c, idx) => (
                  <Reveal
                    key={c}
                    className="card"
                    variant="fade-up"
                    delay={idx * 60}
                    style={{ textAlign: 'center', padding: 12 }}
                  >
                    {c}
                  </Reveal>
                ))
              ) : (
                ["Azienda A", "Azienda B", "Azienda C", "Azienda D"].map((placeholder, idx) => (
                  <Reveal
                    key={placeholder}
                    className="card"
                    variant="fade-up"
                    delay={idx * 60}
                    style={{ textAlign: 'center', padding: 12 }}
                  >
                    {placeholder}
                  </Reveal>
                ))
              )}
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section className="services container">
          <Reveal as="h2" variant="fade-up" style={{fontSize:22,fontWeight:600,marginBottom:12}}>
            {t('services.title')}
          </Reveal>
          <div className="services-grid">
            {services.map((card, index) => (
              <Reveal key={card.title} variant="fade-up" delay={index * 120}>
                <ServiceCard {...card} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section style={{ padding: '28px 0' }}>
          <div className="container">
            <Reveal className="cta-banner" variant="fade-up">
              <div>
                <h3 style={{ margin: 0 }}>{t('ctaBanner.title')}</h3>
                <p style={{ margin: '6px 0 0', opacity: .95 }}>{t('ctaBanner.desc')}</p>
              </div>

              <div>
                <a href="/contatti" className="btn btn-primary">{t('ctaBanner.button')}</a>
              </div>
            </Reveal>
          </div>
        </section>

        <Testimonials />
      </main>

      
      <Footer />
    </div>
  );
}
