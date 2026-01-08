"use client";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { useLocale } from "../../app/lib/LanguageProvider";

// metadata is intentionally handled at the layout level for client-side translated pages

export default function ChiSiamoPage() {
  const { t } = useLocale();

  const uniqueList = (t('chiSiamo.uniqueList') as unknown) as string[];

  const values = [
    {
      icon: "❤️",
      title: "Passione autentica",
      desc: "Ogni giorno mettiamo il cuore in quello che facciamo."
    },
    {
      icon: "💡",
      title: "Innovazione costante",
      desc: "Non seguiamo le tendenze, le creiamo."
    },
    {
      icon: "🤝",
      title: "Rapporto umano",
      desc: "Il cliente per noi non è un numero, ma un partner di crescita."
    },
    {
      icon: "✨",
      title: "Qualità senza compromessi",
      desc: "Perché il dettaglio fa la differenza."
    }
  ];

  const founders = [
    {
      name: "Ing. Simone Baratella",
      role: "Legale Rappresentante",
      image: "https://files.supersite.aruba.it/media/3294_029a01a98995cdf41080fd2ad65ed7328266daef.jpeg/v1/x_0,y_6,w_104,h_104/photo_20240126_082555%20(1).webp"
    },
    {
      name: "P.I. Andrea Gori",
      role: "Legale Rappresentante",
      image: "https://files.supersite.aruba.it/media/3294_1f2b532f212514c47b5653b707b402046750f138.jpeg/v1/x_0,y_23,w_104,h_104/immagine%20whatsapp%202025-03-13%20ore%2015.59.22_d221309e.webp"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="fade-section" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              <Reveal variant="fade-up">
                <div>
                  <p className="section-eyebrow">La nostra storia</p>
                  <h1 className="section-title" style={{ fontSize: "clamp(36px, 5vw, 52px)", marginBottom: "24px" }}>
                    {t('chiSiamo.title')}
                  </h1>
                  <p style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--accent)",
                    marginBottom: "20px",
                    lineHeight: "1.5"
                  }}>
                    {t('chiSiamo.lead')}
                  </p>
                  <div style={{
                    width: "60px",
                    height: "4px",
                    background: "var(--gradient-primary)",
                    borderRadius: "2px",
                    marginBottom: "24px"
                  }} />
                  <p style={{
                    fontSize: "17px",
                    lineHeight: "1.8",
                    color: "var(--muted)",
                    marginBottom: "16px"
                  }}>
                    {t('chiSiamo.para1')}
                  </p>
                  <p style={{
                    fontSize: "17px",
                    lineHeight: "1.8",
                    color: "var(--muted)"
                  }}>
                    {t('chiSiamo.para2')}
                  </p>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delay={120}>
                <div style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden"
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                    alt="Team Cerberus"
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 60%, rgba(12,17,24,0.8))",
                    pointerEvents: "none"
                  }} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="fade-section" style={{ paddingTop: "60px", paddingBottom: "60px", background: "rgba(21, 28, 38, 0.5)" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <p className="section-eyebrow" style={{ textAlign: "center" }}>I nostri valori</p>
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: "16px" }}>
                {t('chiSiamo.uniqueTitle')}
              </h2>
              <p className="section-subtitle" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
                Ecco cosa ci distingue e guida ogni nostra decisione
              </p>
            </Reveal>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}>
              {values.map((value, index) => (
                <Reveal key={value.title} variant="fade-up" delay={index * 100}>
                  <div style={{
                    padding: "32px",
                    background: "var(--surface)",
                    borderRadius: "16px",
                    border: "1px solid var(--card-border)",
                    height: "100%",
                    transition: "transform 0.2s ease, border-color 0.2s ease"
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
                      fontSize: "40px",
                      marginBottom: "16px"
                    }}>
                      {value.icon}
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      marginBottom: "10px",
                      color: "var(--fg)"
                    }}>
                      {value.title}
                    </h3>
                    <p style={{
                      fontSize: "15px",
                      lineHeight: "1.6",
                      color: "var(--muted)",
                      margin: 0
                    }}>
                      {value.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="fade-section" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
              gap: "48px",
              alignItems: "center"
            }}>
              <Reveal variant="fade-up" delay={120}>
                <div style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden"
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                    alt="La nostra missione"
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>
              </Reveal>

              <Reveal variant="fade-up">
                <div>
                  <p className="section-eyebrow">Il nostro scopo</p>
                  <h2 className="section-title" style={{ marginBottom: "24px" }}>
                    {t('chiSiamo.missionTitle')}
                  </h2>
                  <div style={{
                    width: "60px",
                    height: "4px",
                    background: "var(--gradient-primary)",
                    borderRadius: "2px",
                    marginBottom: "24px"
                  }} />
                  <p style={{
                    fontSize: "17px",
                    lineHeight: "1.8",
                    color: "var(--muted)",
                    marginBottom: "24px"
                  }}>
                    {t('chiSiamo.missionText')}
                  </p>
                  <div style={{
                    padding: "24px",
                    background: "rgba(65, 113, 184, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(65, 113, 184, 0.3)"
                  }}>
                    <p style={{
                      fontSize: "16px",
                      lineHeight: "1.7",
                      color: "var(--fg)",
                      fontWeight: 500,
                      margin: 0
                    }}>
                      💬 {t('chiSiamo.contactCTAText')}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="fade-section" style={{ paddingTop: "60px", paddingBottom: "80px", background: "rgba(21, 28, 38, 0.5)" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <p className="section-eyebrow" style={{ textAlign: "center" }}>Il team</p>
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: "12px" }}>
                {t('chiSiamo.foundersTitle')}
              </h2>
              <p className="section-subtitle" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
                {t('chiSiamo.foundersLead')}
              </p>
            </Reveal>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "32px"
            }}>
              {founders.map((founder, index) => (
                <Reveal key={founder.name} variant="fade-up" delay={index * 120}>
                  <div style={{
                    width: "280px",
                    padding: "32px",
                    background: "var(--surface)",
                    borderRadius: "20px",
                    border: "1px solid var(--card-border)",
                    textAlign: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    <div style={{
                      width: "120px",
                      height: "120px",
                      margin: "0 auto 20px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid var(--accent)",
                      boxShadow: "0 8px 24px rgba(65, 113, 184, 0.3)"
                    }}>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--fg)",
                      marginBottom: "8px"
                    }}>
                      {founder.name}
                    </h3>
                    <p style={{
                      fontSize: "14px",
                      color: "var(--accent)",
                      fontWeight: 600,
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      {founder.role}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="final-cta fade-section" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="container">
            <Reveal className="final-cta-card" variant="fade-up">
              <div className="final-cta-layout">
                <div className="final-cta-visual" aria-hidden="true" />
                <div className="final-cta-content">
                  <div className="final-cta-copy">
                    <p className="section-eyebrow">Inizia oggi</p>
                    <h2 className="section-title">Vuoi conoscerci meglio?</h2>
                    <p className="section-subtitle final-cta-subtitle">
                      Siamo qui per ascoltarti, consigliarti e accompagnarti verso il successo. 
                      Contattaci per scoprire come possiamo aiutarti.
                    </p>
                  </div>
                  <ul className="final-cta-bullets">
                    <li>Consulenza personalizzata</li>
                    <li>Approccio umano e professionale</li>
                    <li>Soluzioni su misura per la tua azienda</li>
                  </ul>
                  <Link href="/contatti" className="btn btn-primary final-cta-action">
                    Contattaci
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
