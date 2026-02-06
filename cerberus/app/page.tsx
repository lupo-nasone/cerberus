"use client";
import { FormEvent, useState } from "react";
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
  const [leadSuccess, setLeadSuccess] = useState(false);
  const clients = (t("home.clientsList") as unknown) as string[];

  const services = [
    {
      title: t("services.items.checkup.title"),
      desc: t("services.items.checkup.desc"),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      ctaHref: "/servizi#check-up"
    },
    {
      title: t("services.items.ispettive.title"),
      desc: t("services.items.ispettive.desc"),
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      ctaHref: "/servizi#attivita-ispettive"
    },
    {
      title: t("services.items.scadenzario.title"),
      desc: t("services.items.scadenzario.desc"),
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
      ctaHref: "/servizi#scadenzario"
    },
    {
      title: t("services.items.adeguamenti.title"),
      desc: t("services.items.adeguamenti.desc"),
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
      ctaHref: "/servizi#adeguamenti"
    }
  ];

  const highlightBullets = [
    {
      title: t("services.items.checkup.title"),
      desc: t("services.items.checkup.desc")
    },
    {
      title: t("services.items.ispettive.title"),
      desc: t("services.items.ispettive.desc")
    },
    {
      title: t("services.items.scadenzario.title"),
      desc: t("services.items.scadenzario.desc")
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

  type SubscriptionContent = {
    eyebrow: string;
    title: string;
    desc: string;
    bullets: string[];
    cta: string;
  };

  type PromiseContent = {
    eyebrow: string;
    title: string;
    bulletTitle: string;
    paragraphs: string[];
    bullets: string[];
  };

  type LeadField = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    fullWidth?: boolean;
    required?: boolean;
  };

  type ResourceArticle = {
    title: string;
    href: string;
    category?: string;
    excerpt?: string;
  };

  type ResourcesContent = {
    eyebrow: string;
    title: string;
    lead: string;
    leadMagnet: {
      title: string;
      subtitle: string;
      formTitle: string;
      privacy: string;
      cta: string;
      success: string;
      fields: LeadField[];
    };
    blog: {
      title: string;
      subtitle: string;
      cta: string;
      postLinkLabel: string;
      ctaHref: string;
      posts: ResourceArticle[];
    };
  };

  type FinalCtaContent = {
    eyebrow: string;
    title: string;
    subtitle: string;
    bullets: string[];
    cta: string;
    ctaHref: string;
  };

  const subscriptionRaw = t("subscription") as any;
  const subscription: SubscriptionContent = {
    eyebrow: typeof subscriptionRaw?.eyebrow === "string" ? subscriptionRaw.eyebrow : "Un unico canone",
    title: typeof subscriptionRaw?.title === "string" ? subscriptionRaw.title : "Abbonamento Verifica Zero Rischi",
    desc:
      typeof subscriptionRaw?.desc === "string"
        ? subscriptionRaw.desc
        : "Gestiamo verifiche, scadenze e fornitori con un'unica regia – così sai sempre a che punto sei.",
    bullets: Array.isArray(subscriptionRaw?.bullets)
    ? subscriptionRaw.bullets.filter((item: unknown): item is string => typeof item === "string")
    : [
          "Piano completo di verifiche con scadenze chiare",
          "Reminder automatici e coordinamento con gli enti",
          "Report periodici sullo stato di conformità",
          "Supporto in caso di controlli ispettivi",
          "Servizi specialistici attivabili quando servono"
        ],
    cta:
      typeof subscriptionRaw?.cta === "string"
        ? subscriptionRaw.cta
        : "Richiedi una proposta di abbonamento"
  };

  const promiseRaw = t("promise") as any;
  const promise: PromiseContent = {
    eyebrow: typeof promiseRaw?.eyebrow === "string" ? promiseRaw.eyebrow : "Impegno Cerberus",
    title: typeof promiseRaw?.title === "string" ? promiseRaw.title : "La nostra promessa",
    bulletTitle:
      typeof promiseRaw?.bulletTitle === "string"
        ? promiseRaw.bulletTitle
        : "Cosa significa in pratica",
    paragraphs: Array.isArray(promiseRaw?.paragraphs)
      ? promiseRaw.paragraphs.filter((item: unknown): item is string => typeof item === "string")
      : [
          "Non possiamo prometterti che non avrai mai un controllo. Possiamo però dirti con trasparenza dove sei scoperto, quali sono le priorità e cosa conviene fare subito.",
          "Ti accompagniamo nella preparazione dei documenti, nelle risposte agli enti e nelle azioni correttive: quando arriva un'ispezione non resti solo."
        ],
    bullets: Array.isArray(promiseRaw?.bullets)
      ? promiseRaw.bullets.filter((item: unknown): item is string => typeof item === "string")
      : [
          "Consigli pratici, non burocrazia",
          "Controllo costante dello stato di conformità",
          "Affiancamento diretto durante gli audit"
        ]
  };

  const resourcesRaw = t("resourcesSection") as any;
  const finalCtaRaw = t("finalCta") as any;

  const fallbackLeadFields: LeadField[] = [
    { name: "firstName", label: "Nome" },
    { name: "lastName", label: "Cognome" },
    { name: "email", label: "Email", type: "email" },
    { name: "company", label: "Azienda" },
    { name: "role", label: "Ruolo", fullWidth: true }
  ];

  const fallbackPosts: ResourceArticle[] = [
    {
      title: "Come prepararsi a una verifica INAIL senza stress",
      href: "/blog/prepararsi-verifica-inail",
      category: "Normativa",
      excerpt: "Documenti da avere pronti e passaggi chiave prima di un controllo."
    },
    {
      title: "DPR 462/01: checklist operativa per gli impianti di messa a terra",
      href: "/blog/dpr-462-checklist",
      category: "Impianti",
      excerpt: "Gli step indispensabili per prevenire contestazioni e fermo impianto."
    },
    {
      title: "Verifiche sulle attrezzature in pressione: cosa cambia nel 2025",
      href: "/blog/verifiche-pressione-2025",
      category: "Aggiornamenti",
      excerpt: "Le novità normative e come organizzare scadenze e responsabilità."
    }
  ];

  const resources: ResourcesContent = {
    eyebrow:
      typeof resourcesRaw?.eyebrow === "string"
        ? resourcesRaw.eyebrow
        : "Risorse e approfondimenti",
    title:
      typeof resourcesRaw?.title === "string"
        ? resourcesRaw.title
        : "Vuoi capire meglio cosa ti serve davvero?",
    lead:
      typeof resourcesRaw?.lead === "string"
        ? resourcesRaw.lead
        : "Scarica la checklist e leggi gli ultimi articoli per orientarti tra obblighi e ispezioni.",
    leadMagnet: {
      title:
        typeof resourcesRaw?.leadMagnet?.title === "string"
          ? resourcesRaw.leadMagnet.title
          : "Checklist Verifica Zero Rischi",
      subtitle:
        typeof resourcesRaw?.leadMagnet?.subtitle === "string"
          ? resourcesRaw.leadMagnet.subtitle
          : "Le verifiche minime che ogni datore di lavoro dovrebbe conoscere.",
      formTitle:
        typeof resourcesRaw?.leadMagnet?.formTitle === "string"
          ? resourcesRaw.leadMagnet.formTitle
          : "Compila il modulo per riceverla via email",
      privacy:
        typeof resourcesRaw?.leadMagnet?.privacy === "string"
          ? resourcesRaw.leadMagnet.privacy
          : "Confermo di voler ricevere la checklist e di aver letto l'informativa privacy.",
      cta:
        typeof resourcesRaw?.leadMagnet?.cta === "string"
          ? resourcesRaw.leadMagnet.cta
          : "Invia e ricevi la checklist",
      success:
        typeof resourcesRaw?.leadMagnet?.success === "string"
          ? resourcesRaw.leadMagnet.success
          : "Grazie! Ti invieremo la checklist via email entro poche ore.",
      fields: Array.isArray(resourcesRaw?.leadMagnet?.fields)
        ? resourcesRaw.leadMagnet.fields.filter(
            (field: any): field is LeadField =>
              field && typeof field.name === "string" && typeof field.label === "string"
          )
        : fallbackLeadFields
    },
    blog: {
      title:
        typeof resourcesRaw?.blog?.title === "string"
          ? resourcesRaw.blog.title
          : "Dal nostro blog",
      subtitle:
        typeof resourcesRaw?.blog?.subtitle === "string"
          ? resourcesRaw.blog.subtitle
          : "Approfondimenti concreti per farti arrivare pronto alle ispezioni.",
      cta:
        typeof resourcesRaw?.blog?.cta === "string"
          ? resourcesRaw.blog.cta
          : "Vai al blog",
      postLinkLabel:
        typeof resourcesRaw?.blog?.postLinkLabel === "string"
          ? resourcesRaw.blog.postLinkLabel
          : "Leggi l'articolo",
      ctaHref:
        typeof resourcesRaw?.blog?.ctaHref === "string"
          ? resourcesRaw.blog.ctaHref
          : "/blog",
      posts: Array.isArray(resourcesRaw?.blog?.posts)
        ? resourcesRaw.blog.posts.filter(
            (post: any): post is ResourceArticle =>
              post && typeof post.title === "string" && typeof post.href === "string"
          )
        : fallbackPosts
    }
  };

  const finalCta: FinalCtaContent = {
    eyebrow:
      typeof finalCtaRaw?.eyebrow === "string"
        ? finalCtaRaw.eyebrow
        : "Pronto a fare il punto?",
    title:
      typeof finalCtaRaw?.title === "string"
        ? finalCtaRaw.title
        : "Richiedi il tuo Check-up Verifica Zero Rischi",
    subtitle:
      typeof finalCtaRaw?.subtitle === "string"
        ? finalCtaRaw.subtitle
        : "Compila il form e ti ricontattiamo per una valutazione senza impegno dei tuoi impianti e attrezzature.",
    bullets: Array.isArray(finalCtaRaw?.bullets)
      ? finalCtaRaw.bullets.filter((item: unknown): item is string => typeof item === "string")
      : [
          "Analisi iniziale delle verifiche obbligatorie",
          "Piano di priorità chiaro e condiviso",
          "Affiancamento durante controlli e ispezioni"
        ],
    cta:
      typeof finalCtaRaw?.cta === "string"
        ? finalCtaRaw.cta
        : "Richiedi il Check-up",
    ctaHref:
      typeof finalCtaRaw?.ctaHref === "string"
        ? finalCtaRaw.ctaHref
        : "/contatti"
  };

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setLeadSuccess(true);
    form.reset();
  };

  const handleLeadChange = () => {
    if (leadSuccess) {
      setLeadSuccess(false);
    }
  };

  const resolveAutocomplete = (fieldName: string) => {
    const normalized = fieldName.toLowerCase();
    if (normalized.includes("first")) return "given-name";
    if (normalized.includes("last") || normalized.includes("surname") || normalized.includes("cognome")) {
      return "family-name";
    }
    if (normalized.includes("email")) return "email";
    if (normalized.includes("company") || normalized.includes("azienda")) return "organization";
    if (normalized.includes("role") || normalized.includes("ruolo")) return "organization-title";
    return "off";
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />
        <HowItWorks />
        <section className="home-highlights fade-section">
          <div className="container">
            <div className="highlights-grid">
              <div>
                <Reveal variant="fade-up">
                  <p className="section-eyebrow">{t("sections.overview.eyebrow")}</p>
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
                  <p className="highlight-card-eyebrow">{t("sections.cta.eyebrow")}</p>
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

        <section className="home-stats fade-section">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {t("sections.stats.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {t("sections.stats.title")}
            </Reveal>
            <Reveal as="p" className="section-subtitle" variant="fade-up" delay={120}>
              {t("sections.stats.subtitle")}
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

        <section className="home-services fade-section">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {t("sections.services.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {t("services.title")}
            </Reveal>
            <Reveal as="p" className="section-subtitle" variant="fade-up" delay={120}>
              {t("sections.services.subtitle")}
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

        <section className="subscription-section fade-section">
          <div className="container">
            <Reveal className="subscription-card" variant="fade-up">
              <div className="subscription-header">
                <p className="section-eyebrow">{subscription.eyebrow}</p>
                <h2 className="section-title">{subscription.title}</h2>
                <p className="section-subtitle">{subscription.desc}</p>
              </div>
              <ul className="subscription-list">
                {subscription.bullets.map((benefit: string, index: number) => (
                  <li key={`subscription-benefit-${index}`}>{benefit}</li>
                ))}
              </ul>
              <div className="subscription-actions">
                <Link href="/contatti" className="btn btn-primary">
                  {subscription.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="promise-section fade-section">
          <div className="container">
            <div className="promise-grid">
              <Reveal className="promise-card" variant="fade-up">
                <p className="section-eyebrow">{promise.eyebrow}</p>
                <h2 className="section-title">{promise.title}</h2>
                {promise.paragraphs.map((paragraph: string, index: number) => (
                  <p key={`promise-paragraph-${index}`} className="promise-text">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
              <Reveal className="promise-card promise-card--bullets" variant="fade-up" delay={120}>
                <h3 className="promise-bullet-title">{promise.bulletTitle}</h3>
                <ul className="promise-list">
                  {promise.bullets.map((item: string, index: number) => (
                    <li key={`promise-bullet-${index}`}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="home-clients fade-section">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {t("sections.clients.eyebrow")}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {t("home.clientsTitle")}
            </Reveal>
            <Reveal as="p" className="section-subtitle" variant="fade-up" delay={120}>
              {t("sections.clients.subtitle")}
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

        <Testimonials />

        <section className="resources-section fade-section">
          <div className="container">
            <Reveal as="p" className="section-eyebrow" variant="fade-up">
              {resources.eyebrow}
            </Reveal>
            <Reveal as="h2" className="section-title" variant="fade-up" delay={80}>
              {resources.title}
            </Reveal>
            <Reveal
              as="p"
              className="section-subtitle resources-section-lead"
              variant="fade-up"
              delay={120}
            >
              {resources.lead}
            </Reveal>

            <div className="resources-grid">
              <Reveal className="resources-card resources-card--lead" variant="fade-up" delay={160}>
                <div className="resources-card-visual" aria-hidden="true" />
                <div className="resources-card-body">
                  <div className="lead-magnet-head">
                    <h3 className="resources-card-title">{resources.leadMagnet.title}</h3>
                    <p className="resources-card-subtitle">{resources.leadMagnet.subtitle}</p>
                  </div>
                  <span className="lead-form-title">{resources.leadMagnet.formTitle}</span>
                  <form className="lead-form" onSubmit={handleLeadSubmit} onChange={handleLeadChange}>
                    <div className="lead-form-grid">
                      {resources.leadMagnet.fields.map((field) => (
                        <label
                          key={field.name}
                          className={`lead-field${field.fullWidth ? " lead-field--full" : ""}`}
                        >
                          <span>{field.label}</span>
                          <input
                            name={field.name}
                            type={field.type ?? (field.name.toLowerCase().includes("email") ? "email" : "text")}
                            placeholder={field.placeholder || undefined}
                            required={field.required !== false}
                            autoComplete={resolveAutocomplete(field.name)}
                          />
                        </label>
                      ))}
                    </div>
                    <label className="lead-checkbox">
                      <input type="checkbox" name="privacyConsent" required />
                      <span>{resources.leadMagnet.privacy}</span>
                    </label>
                    <button type="submit" className="btn btn-primary lead-submit">
                      {resources.leadMagnet.cta}
                    </button>
                    {leadSuccess && (
                      <p className="lead-success" role="status" aria-live="polite">
                        {resources.leadMagnet.success}
                      </p>
                    )}
                  </form>
                </div>
              </Reveal>

              <Reveal className="resources-card resources-card--blog" variant="fade-up" delay={220}>
                <div className="resources-card-visual resources-card-visual--blog" aria-hidden="true" />
                <div className="resources-card-body">
                  <div className="resource-feed-head">
                    <h3 className="resources-card-title">{resources.blog.title}</h3>
                    <p className="resources-card-subtitle">{resources.blog.subtitle}</p>
                  </div>
                  <div className="resource-feed-list">
                    {resources.blog.posts.map((post, index) => (
                      <Reveal key={post.title} className="resource-post" variant="fade-up" delay={index * 80}>
                        <div className="resource-post-body">
                          {post.category && <span className="resource-post-meta">{post.category}</span>}
                          <Link href={post.href} className="resource-post-link-heading">
                            {post.title}
                          </Link>
                          {post.excerpt && <p>{post.excerpt}</p>}
                          <Link
                            href={post.href}
                            className="resource-post-link"
                            aria-label={`${post.title} - ${resources.blog.postLinkLabel}`}
                          >
                            {resources.blog.postLinkLabel}
                          </Link>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  <div className="resource-feed-cta">
                    <Link href={resources.blog.ctaHref} className="btn btn-secondary">
                      {resources.blog.cta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="final-cta fade-section">
          <div className="container">
            <Reveal className="final-cta-card" variant="fade-up">
              <div className="final-cta-layout">
                <div className="final-cta-visual" aria-hidden="true" />
                <div className="final-cta-content">
                  <div className="final-cta-copy">
                    <p className="section-eyebrow">{finalCta.eyebrow}</p>
                    <h2 className="section-title">{finalCta.title}</h2>
                    <p className="section-subtitle final-cta-subtitle">{finalCta.subtitle}</p>
                  </div>
                  <ul className="final-cta-bullets">
                    {finalCta.bullets.map((item, index) => (
                      <li key={`final-cta-bullet-${index}`}>{item}</li>
                    ))}
                  </ul>
                  <Link href={finalCta.ctaHref} className="btn btn-primary final-cta-action">
                    {finalCta.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      
      <Footer />
    </div>
  );
}
