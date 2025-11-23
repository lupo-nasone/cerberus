"use client";
import Link from "next/link";
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
  const clients = (t("home.clientsList") as unknown) as string[];

  const services = [
    {
      title: t("services.items.scadenziario.title"),
      desc: t("services.items.scadenziario.desc"),
      image: "https://images.unsplash.com/photo-1523365280197-f1783db9fe62?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: t("services.items.assistenza.title"),
      desc: t("services.items.assistenza.desc"),
      image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: t("services.items.consulenza.title"),
      desc: t("services.items.consulenza.desc"),
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: t("services.items.formazione.title"),
      desc: t("services.items.formazione.desc"),
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const highlightBullets = [
    {
      title: t("services.items.scadenziario.title"),
      desc: t("services.items.scadenziario.desc")
    },
    {
      title: t("services.items.assistenza.title"),
      desc: t("services.items.assistenza.desc")
    },
    {
      title: t("services.items.consulenza.title"),
      desc: t("services.items.consulenza.desc")
    }
  ];

  const metrics = [
    t("home.metric1") as string,
    t("home.metric2") as string,
    t("home.metric3") as string
  ];

  const serviceCta = t("services.learnMore");
  const fallbackClients = ["Azienda A", "Azienda B", "Azienda C", "Azienda D"];
  const clientsList = clients && clients.length ? clients : fallbackClients;
  const marqueeClients = [...clientsList, ...clientsList];

  const renderMetric = (metric: string) => {
    const match = metric.match(/(\d+[\w%]*)/);
    if (!match) {
      return metric;
    }
    const value = match[0];
    const index = metric.indexOf(value);
    return (
      <>
        {metric.slice(0, index)}
        <span className="metric-value">{value}</span>
        {metric.slice(index + value.length)}
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />
        <HowItWorks />
        <section className="home-highlights">
          <div className="container">
            <div className="highlights-grid">
              <div>
                <Reveal variant="fade-up">
                  <p className="section-eyebrow">{t("home.sections.overview.eyebrow")}</p>
                  <h2 className="section-title">{t("home.introTitle")}</h2>
                  <p className="section-subtitle">{t("home.introText")}</p>
                </Reveal>
                <div className="highlight-bullets">
                  {highlightBullets.map((bullet, index) => (
                    <Reveal
                      key={bullet.title}
                      className="highlight-bullet"
                      variant="fade-up"
                      delay={index * 80}
                    >
                      <span className="highlight-bullet-index">0{index + 1}</span>
                      <div>
                        <h3>{bullet.title}</h3>
                        <p>{bullet.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal className="highlight-card" variant="fade-up" delay={160}>
                <div className="highlight-card-body">
                  <p className="highlight-card-eyebrow">{t("home.sections.cta.eyebrow")}</p>
                  <h3>{t("ctaBanner.title")}</h3>
                  <p>{t("ctaBanner.desc")}</p>
                  <Link href="/contatti" className="btn btn-primary highlight-card-action">
                    {t("ctaBanner.button")}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="home-stats">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {t("home.sections.stats.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {t("home.sections.stats.title")}
            </Reveal>
            <Reveal as="p" className="section-subtitle" variant="fade-up" delay={120}>
              {t("home.sections.stats.subtitle")}
            </Reveal>

            <div className="stats-grid">
              {metrics.map((metric, index) => (
                <Reveal key={`${metric}-${index}`} className="stat-card" variant="fade-up" delay={index * 100}>
                  <div className="stat-card-inner">
                    <span className="stat-icon" aria-hidden />
                    <p>{renderMetric(metric)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="home-services">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {t("home.sections.services.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {t("services.title")}
            </Reveal>
            <Reveal as="p" className="section-subtitle" variant="fade-up" delay={120}>
              {t("home.sections.services.subtitle")}
            </Reveal>

            <div className="services-grid">
              {services.map((card, index) => (
                <Reveal key={card.title} variant="fade-up" delay={index * 100}>
                  <ServiceCard {...card} ctaLabel={serviceCta} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="home-clients">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {t("home.sections.clients.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {t("home.clientsTitle")}
            </Reveal>
            <Reveal as="p" className="section-subtitle" variant="fade-up" delay={120}>
              {t("home.sections.clients.subtitle")}
            </Reveal>

            <div className="clients-marquee">
              <div className="clients-marquee-track">
                {marqueeClients.map((clientName, index) => (
                  <span
                    key={`${clientName}-${index}`}
                    className="clients-pill"
                    aria-hidden={index >= clientsList.length}
                  >
                    {clientName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-cta-band">
          <div className="container">
            <Reveal className="cta-band" variant="fade-up">
              <div className="cta-band-text">
                <p className="section-eyebrow">{t("home.sections.cta.eyebrow")}</p>
                <h3>{t("ctaBanner.title")}</h3>
                <p>{t("ctaBanner.desc")}</p>
              </div>
              <Link href="/contatti" className="btn btn-primary cta-band-action">
                {t("ctaBanner.button")}
              </Link>
            </Reveal>
          </div>
        </section>

        <Testimonials />
      </main>

      
      <Footer />
    </div>
  );
}
