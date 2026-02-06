"use client";
import Link from "next/link";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { useLocale } from "../../app/lib/LanguageProvider";

// metadata is intentionally handled at the layout level for client-side translated pages

export default function ServiziPage() {
  const { t } = useLocale();

  const services = [
    {
      id: "check-up",
      title: "Check-up completo",
      subtitle: "Prima capiamo dove sei, poi decidiamo dove andare",
      description: "Prima di parlare di verifiche, adeguamenti e scadenze, serve una cosa semplice ma rara: sapere davvero qual è la situazione attuale.",
      details: [
        "Gli impianti e le attrezzature chiave (elettrico, pressione, sollevamento, ecc.)",
        "La documentazione disponibile (dichiarazioni, verbali, denunce, libretti, progetti)",
        "Le modalità d'uso reali, non solo ciò che è scritto sulla carta"
      ],
      objectives: [
        "Individuare dove sei scoperto dal punto di vista tecnico e normativo",
        "Distinguere ciò che è urgente da ciò che è programmabile",
        "Darti una visione chiara dei rischi che stai correndo oggi"
      ],
      deliverables: [
        "Una mappa sintetica delle criticità, con priorità e livelli di rischio",
        "Un quadro delle scadenze e delle verifiche mancanti o non allineate",
        "Indicazioni concrete su come proseguire nelle fasi successive del Metodo Cerberus"
      ],
      ideal: [
        "Chi ha ereditato impianti e documenti da altri",
        "Chi non sa se \"è tutto a posto\"",
        "Chi vuole parlare con l'ente di controllo con la tranquillità di chi conosce la propria situazione"
      ],
      cta: "Richiedi un Check up completo",
      ctaDesc: "Ti diremo con chiarezza dove sei forte e dove, invece, conviene intervenire.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "attivita-ispettive",
      title: "Attività ispettive",
      subtitle: "Le verifiche sugli impianti con un ispettore dalla tua parte",
      description: "Una volta chiarito il quadro con il Check up, passiamo alla fase che tutti conoscono: le ispezioni vere e proprie.",
      coverage: [
        "Impianti elettrici e verifiche di messa a terra (DPR 462/01)",
        "Attrezzature in pressione e centrali termiche",
        "Apparecchi di sollevamento, ascensori",
        "Scaffalature"
      ],
      approach: "Non ci limitiamo a fare misure e compilare un verbale. Ogni verifica diventa un'occasione per:",
      benefits: [
        "Individuare anomalie che nel tempo potrebbero trasformarsi in infortuni, fermi impianto o contestazioni",
        "Verificare la coerenza tra come l'impianto è stato progettato e come viene realmente utilizzato",
        "Tradurre i risultati tecnici in informazioni comprensibili per datore di lavoro, RSPP, manutentori e consulenti"
      ],
      independence: "Il nostro approccio è indipendente: non vendiamo impianti né manutenzioni, per questo possiamo concentrarci su una cosa sola: la qualità dell'ispezione.",
      results: [
        "Meno sorprese durante le verifiche degli enti",
        "Una migliore pianificazione degli investimenti",
        "Maggiore serenità nel dimostrare di aver fatto il possibile per tutelare lavoratori e produzione"
      ],
      cta: "Parliamo della tua Attività ispettiva",
      ctaDesc: "Costruiamo un piano adatto alla tua realtà.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "scadenzario",
      title: "Scadenzario e assistenza",
      subtitle: "Nessuna scadenza dimenticata, nessuna visita affrontata da solo",
      description: "Molte criticità non nascono da impianti pericolosi, ma da una gestione confusa di scadenze, verbali e comunicazioni.",
      scheduling: [
        "Creiamo uno scadenzario ragionato delle verifiche e delle prove da eseguire",
        "Ti ricordiamo le scadenze con il tempo necessario per organizzarti",
        "Aggiorniamo lo stato delle verifiche mano a mano che vengono eseguite"
      ],
      preparation: "Quando è in programma una visita di INAIL, ASL, ti aiutiamo a:",
      prepSteps: [
        "Verificare in anticipo se la documentazione è completa",
        "Preparare ciò che l'ispettore potrebbe chiedere",
        "Chiarire i punti emersi nei nostri rapporti, così sai cosa aspettarti"
      ],
      support: "Se richiesto, possiamo affiancarti anche durante la visita, per:",
      supportSteps: [
        "Facilitare il dialogo con l'ispettore",
        "Spiegare il contesto tecnico e le azioni già intraprese",
        "Raccogliere correttamente eventuali rilievi e richieste"
      ],
      outcome: "Risultato: niente corse dell'ultimo minuto, niente documenti da cercare in archivio la sera prima e, soprattutto, meno ansia nel momento in cui l'ente bussa alla porta.",
      cta: "Imposta uno scadenzario con assistenza dedicata",
      ctaDesc: "Smetti di vivere scadenze e visite ispettive come emergenze.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "adeguamenti",
      title: "Supporto agli adeguamenti",
      subtitle: "Dalla lista dei problemi al lavoro fatto (bene e documentato)",
      description: "Un verbale che segnala criticità è solo l'inizio. La vera domanda è: \"E adesso, cosa facciamo?\"",
      role: "Non siamo installatori né costruttori di impianti: il nostro ruolo è fare da regia indipendente tra te e i professionisti coinvolti (progettisti, imprese, manutentori, laboratori).",
      helpWith: "In pratica ti aiutiamo a:",
      services: [
        "Capire quali interventi sono davvero prioritari e quali puoi programmare nel tempo",
        "Chiarire le specifiche tecniche e normative da rispettare",
        "Interfacciarti con studi e imprese specializzate",
        "Verificare, a fine lavori, che ciò che è stato fatto sia coerente con le prescrizioni e con la normativa"
      ],
      advantages: [
        "Non ti ritrovi a pagare interventi inutili o sovradimensionati",
        "Riduci il rischio di lavori \"fatti a metà\" che non risolvono il problema",
        "Puoi dimostrare, in caso di controlli, di aver seguito un percorso strutturato dalla rilevazione del problema alla sua soluzione"
      ],
      cta: "Affiancamento nella gestione degli adeguamenti",
      ctaDesc: "Hai già dei verbali con prescrizioni o criticità da chiudere? Possiamo affiancarti così non rimangono per anni in fondo a un cassetto.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="fade-section" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <p className="section-eyebrow">Il nostro approccio</p>
              <h1 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "20px" }}>
                Metodo Cerberus in 4 fasi
              </h1>
              <p className="section-subtitle" style={{ maxWidth: "800px", fontSize: "18px", lineHeight: "1.7" }}>
                Dall'analisi iniziale agli adeguamenti finali: ti accompagniamo in un percorso strutturato, 
                così non rimani mai da solo tra norme, ispezioni e scadenze.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="fade-section" style={{ paddingBottom: "60px" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <div style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "32px",
                background: "var(--surface)",
                borderRadius: "16px",
                border: "1px solid var(--card-border)"
              }}>
                <p style={{ fontSize: "17px", lineHeight: "1.8", color: "var(--muted)", marginBottom: "16px" }}>
                  Molte aziende vivono la sicurezza come un insieme di adempimenti scollegati: un verbale qui, 
                  una verifica là, una scadenza che spunta all'improvviso.
                </p>
                <p style={{ fontSize: "17px", lineHeight: "1.8", color: "var(--fg)", fontWeight: 600 }}>
                  Con il Metodo Cerberus trasformiamo questo caos in un percorso chiaro, in 4 fasi, 
                  in cui sai sempre a che punto sei e cosa c'è da fare dopo.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Phase Overview Cards */}
        <section className="fade-section" style={{ paddingBottom: "60px" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "60px"
            }}>
              {services.map((service, index) => (
                <Reveal key={service.id} variant="fade-up" delay={index * 100}>
                  <div style={{
                    padding: "28px",
                    background: "var(--surface)",
                    borderRadius: "12px",
                    border: "1px solid var(--card-border)",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--card-border)";
                  }}>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: "var(--gradient-primary)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "20px",
                      marginBottom: "16px"
                    }}>
                      {index + 1}
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      marginBottom: "8px",
                      color: "var(--fg)"
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      fontSize: "14px",
                      color: "var(--muted)",
                      lineHeight: "1.6",
                      margin: 0
                    }}>
                      {service.subtitle}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Service Sections */}
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className="fade-section" style={{
            paddingTop: "60px",
            paddingBottom: "60px",
            background: index % 2 === 0 ? "transparent" : "rgba(21, 28, 38, 0.5)"
          }}>
            <div className="container">
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
                gap: "48px",
                alignItems: "start"
              }}>
                <Reveal variant="fade-up">
                  <div>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "var(--gradient-primary)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "28px",
                      marginBottom: "24px"
                    }}>
                      {index + 1}
                    </div>
                    <h2 style={{
                      fontSize: "clamp(28px, 4vw, 36px)",
                      fontWeight: 700,
                      marginBottom: "12px",
                      color: "var(--fg)"
                    }}>
                      {service.title}
                    </h2>
                    <p style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--accent)",
                      marginBottom: "24px",
                      lineHeight: "1.5"
                    }}>
                      {service.subtitle}
                    </p>
                    <div style={{
                      width: "60px",
                      height: "4px",
                      background: "var(--gradient-primary)",
                      borderRadius: "2px",
                      marginBottom: "24px"
                    }} />
                    <img 
                      src={service.image}
                      alt={service.title}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "16px",
                        border: "1px solid var(--card-border)"
                      }}
                    />
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={120}>
                  <div>
                    <p style={{
                      fontSize: "17px",
                      lineHeight: "1.8",
                      color: "var(--muted)",
                      marginBottom: "32px"
                    }}>
                      {service.description}
                    </p>

                    {/* Check-up specific content */}
                    {service.id === "check-up" && (
                      <>
                        <div style={{ marginBottom: "28px" }}>
                          <p style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "12px"
                          }}>
                            Con il nostro Check up completo analizziamo in modo strutturato:
                          </p>
                          <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0
                          }}>
                            {service.details?.map((detail, i) => (
                              <li key={i} style={{
                                padding: "8px 0 8px 28px",
                                position: "relative",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                color: "var(--muted)"
                              }}>
                                <span style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--accent)"
                                }}>✓</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ marginBottom: "28px" }}>
                          <p style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "12px"
                          }}>
                            L'obiettivo non è "cercare il problema a tutti i costi", ma:
                          </p>
                          <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0
                          }}>
                            {service.objectives?.map((obj, i) => (
                              <li key={i} style={{
                                padding: "8px 0 8px 28px",
                                position: "relative",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                color: "var(--muted)"
                              }}>
                                <span style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--accent)"
                                }}>→</span>
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ marginBottom: "28px" }}>
                          <p style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "12px"
                          }}>
                            Alla fine del Check up non ti consegniamo un malloppo incomprensibile, ma:
                          </p>
                          <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0
                          }}>
                            {service.deliverables?.map((deliverable, i) => (
                              <li key={i} style={{
                                padding: "8px 0 8px 28px",
                                position: "relative",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                color: "var(--muted)"
                              }}>
                                <span style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--accent)"
                                }}>📋</span>
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{
                          padding: "20px",
                          background: "rgba(65, 113, 184, 0.1)",
                          borderRadius: "12px",
                          border: "1px solid rgba(65, 113, 184, 0.3)",
                          marginBottom: "28px"
                        }}>
                          <p style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "10px"
                          }}>
                            È un servizio pensato per:
                          </p>
                          <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0
                          }}>
                            {service.ideal?.map((item, i) => (
                              <li key={i} style={{
                                padding: "6px 0",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                color: "var(--muted)"
                              }}>
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}

                    {/* Attività ispettive specific content */}
                    {service.id === "attivita-ispettive" && (
                      <>
                        <div style={{ marginBottom: "28px" }}>
                          <p style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "12px"
                          }}>
                            Con la nostra Attività ispettiva ci occupiamo di:
                          </p>
                          <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0
                          }}>
                            {service.coverage?.map((item, i) => (
                              <li key={i} style={{
                                padding: "8px 0 8px 28px",
                                position: "relative",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                color: "var(--muted)"
                              }}>
                                <span style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--accent)"
                                }}>⚙️</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--fg)",
                          marginBottom: "12px"
                        }}>
                          {service.approach}
                        </p>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "28px"
                        }}>
                          {service.benefits?.map((benefit, i) => (
                            <li key={i} style={{
                              padding: "8px 0 8px 28px",
                              position: "relative",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              color: "var(--muted)"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: 0,
                                color: "var(--accent)"
                              }}>✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <div style={{
                          padding: "20px",
                          background: "rgba(65, 113, 184, 0.1)",
                          borderRadius: "12px",
                          border: "1px solid rgba(65, 113, 184, 0.3)",
                          marginBottom: "20px"
                        }}>
                          <p style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "10px"
                          }}>
                            {service.independence}
                          </p>
                        </div>

                        <p style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--fg)",
                          marginBottom: "12px"
                        }}>
                          Per molte aziende questo si traduce in:
                        </p>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "28px"
                        }}>
                          {service.results?.map((result, i) => (
                            <li key={i} style={{
                              padding: "8px 0 8px 28px",
                              position: "relative",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              color: "var(--muted)"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: 0,
                                color: "var(--accent)"
                              }}>→</span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Scadenzario specific content */}
                    {service.id === "scadenzario" && (
                      <>
                        <div style={{ marginBottom: "28px" }}>
                          <p style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--fg)",
                            marginBottom: "12px"
                          }}>
                            Con la fase di Scadenzario e assistenza ti aiutiamo a evitare proprio questo:
                          </p>
                          <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0
                          }}>
                            {service.scheduling?.map((item, i) => (
                              <li key={i} style={{
                                padding: "8px 0 8px 28px",
                                position: "relative",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                color: "var(--muted)"
                              }}>
                                <span style={{
                                  position: "absolute",
                                  left: 0,
                                  color: "var(--accent)"
                                }}>📅</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--fg)",
                          marginBottom: "12px"
                        }}>
                          {service.preparation}
                        </p>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "28px"
                        }}>
                          {service.prepSteps?.map((step, i) => (
                            <li key={i} style={{
                              padding: "8px 0 8px 28px",
                              position: "relative",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              color: "var(--muted)"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: 0,
                                color: "var(--accent)"
                              }}>✓</span>
                              {step}
                            </li>
                          ))}
                        </ul>

                        <p style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--fg)",
                          marginBottom: "12px"
                        }}>
                          {service.support}
                        </p>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "28px"
                        }}>
                          {service.supportSteps?.map((step, i) => (
                            <li key={i} style={{
                              padding: "8px 0 8px 28px",
                              position: "relative",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              color: "var(--muted)"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: 0,
                                color: "var(--accent)"
                              }}>→</span>
                              {step}
                            </li>
                          ))}
                        </ul>

                        <div style={{
                          padding: "20px",
                          background: "rgba(29, 138, 109, 0.1)",
                          borderRadius: "12px",
                          border: "1px solid rgba(29, 138, 109, 0.3)",
                          marginBottom: "28px"
                        }}>
                          <p style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "var(--fg)"
                          }}>
                            {service.outcome}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Adeguamenti specific content */}
                    {service.id === "adeguamenti" && (
                      <>
                        <div style={{
                          padding: "20px",
                          background: "rgba(65, 113, 184, 0.1)",
                          borderRadius: "12px",
                          border: "1px solid rgba(65, 113, 184, 0.3)",
                          marginBottom: "28px"
                        }}>
                          <p style={{
                            fontSize: "15px",
                            color: "var(--muted)",
                            lineHeight: "1.7"
                          }}>
                            {service.role}
                          </p>
                        </div>

                        <p style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--fg)",
                          marginBottom: "12px"
                        }}>
                          {service.helpWith}
                        </p>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "28px"
                        }}>
                          {service.services?.map((item, i) => (
                            <li key={i} style={{
                              padding: "8px 0 8px 28px",
                              position: "relative",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              color: "var(--muted)"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: 0,
                                color: "var(--accent)"
                              }}>🔧</span>
                              {item}
                            </li>
                          ))}
                        </ul>

                        <p style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "var(--fg)",
                          marginBottom: "12px"
                        }}>
                          In questo modo:
                        </p>
                        <ul style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "28px"
                        }}>
                          {service.advantages?.map((adv, i) => (
                            <li key={i} style={{
                              padding: "8px 0 8px 28px",
                              position: "relative",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              color: "var(--muted)"
                            }}>
                              <span style={{
                                position: "absolute",
                                left: 0,
                                color: "var(--accent)"
                              }}>✓</span>
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* CTA */}
                    <div style={{
                      marginTop: "32px",
                      padding: "24px",
                      background: "var(--surface)",
                      borderRadius: "12px",
                      border: "1px solid var(--card-border)"
                    }}>
                      <p style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--fg)",
                        marginBottom: "12px"
                      }}>
                        {service.ctaDesc}
                      </p>
                      <Link 
                        href="/contatti"
                        className="btn btn-primary"
                        style={{
                          display: "inline-block",
                          marginTop: "12px"
                        }}
                      >
                        👉 {service.cta}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* Final CTA Section */}
        <section className="final-cta fade-section" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="container">
            <Reveal className="final-cta-card" variant="fade-up">
              <div className="final-cta-layout">
                <div className="final-cta-visual" aria-hidden="true" />
                <div className="final-cta-content">
                  <div className="final-cta-copy">
                    <p className="section-eyebrow">Pronto a iniziare?</p>
                    <h2 className="section-title">Trasforma la sicurezza da emergenza a processo chiaro</h2>
                    <p className="section-subtitle final-cta-subtitle">
                      Inizia con un Check-up completo e scopri dove sei oggi, quali sono le priorità 
                      e come strutturare il percorso di conformità per la tua azienda.
                    </p>
                  </div>
                  <ul className="final-cta-bullets">
                    <li>Analisi completa della situazione attuale</li>
                    <li>Piano d'azione con priorità chiare</li>
                    <li>Affiancamento in ogni fase del percorso</li>
                  </ul>
                  <Link href="/contatti" className="btn btn-primary final-cta-action">
                    Richiedi un Check-up
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
