"use client";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { useLocale } from "../../app/lib/LanguageProvider";

// metadata is intentionally handled at the layout level for client-side translated pages

export default function ServiziPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container">
        <header style={{ margin: "28px 0 8px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{t('services.title')}</h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>{t('home.introText')}</p>
        </header>

        <section className="services">
          <div className="services-grid">
            {[
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
              },
              {
                title: t('services.items.formazione.title'),
                desc: t('services.items.formazione.desc'),
                image: "https://source.unsplash.com/600x360/?training,classroom"
              }
            ].map((card, index) => (
              <Reveal key={card.title} variant="fade-up" delay={index * 120}>
                <ServiceCard {...card} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
