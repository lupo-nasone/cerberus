"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export default function CreditsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const developers = [
    {
      name: "Matteo",
      role: "Full Stack Developer",
      description: "Architettura, design system e sviluppo frontend",
      color: "#4171b8"
    },
    {
      name: "Scarpu",
      role: "Full Stack Developer", 
      description: "Backend, integrazioni e ottimizzazione",
      color: "#1d8a6d"
    }
  ];

  const technologies = [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "Vercel"
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="fade-section" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
                <p className="section-eyebrow">Dietro le quinte</p>
                <h1 className="section-title" style={{ fontSize: "clamp(36px, 5vw, 52px)", marginBottom: "24px" }}>
                  Sviluppo e Realizzazione
                </h1>
                <div style={{
                  width: "60px",
                  height: "4px",
                  background: "var(--gradient-primary)",
                  borderRadius: "2px",
                  margin: "0 auto 24px"
                }} />
                <p style={{
                  fontSize: "18px",
                  lineHeight: "1.7",
                  color: "var(--muted)"
                }}>
                  Questo progetto è stato sviluppato con cura e attenzione ai dettagli 
                  da un team dedicato di professionisti.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Developers Section */}
        <section className="fade-section" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <p className="section-eyebrow" style={{ textAlign: "center" }}>Il Team</p>
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: "48px" }}>
                Sviluppatori
              </h2>
            </Reveal>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "32px"
            }}>
              {developers.map((dev, index) => (
                <Reveal key={dev.name} variant="fade-up" delay={index * 120}>
                  <div style={{
                    width: "320px",
                    padding: "40px 32px",
                    background: "var(--surface)",
                    borderRadius: "20px",
                    border: "1px solid var(--card-border)",
                    textAlign: "center",
                    transition: "transform 0.2s ease, border-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = dev.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--card-border)";
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 20px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${dev.color}, ${dev.color}aa)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "white",
                      boxShadow: `0 8px 24px ${dev.color}33`
                    }}>
                      {dev.name.charAt(0)}
                    </div>

                    {/* Name */}
                    <h3 style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      margin: "0 0 8px",
                      color: "var(--fg)"
                    }}>
                      {dev.name}
                    </h3>

                    {/* Role */}
                    <p style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: dev.color,
                      margin: "0 0 16px"
                    }}>
                      {dev.role}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontSize: "15px",
                      lineHeight: "1.6",
                      color: "var(--muted)",
                      margin: 0
                    }}>
                      {dev.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="fade-section" style={{ paddingTop: "40px", paddingBottom: "60px", background: "rgba(21, 28, 38, 0.5)" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <p className="section-eyebrow" style={{ textAlign: "center" }}>Stack Tecnologico</p>
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: "40px" }}>
                Tecnologie Utilizzate
              </h2>
            </Reveal>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              {technologies.map((tech, index) => (
                <Reveal key={tech} variant="fade-up" delay={index * 80}>
                  <div style={{
                    padding: "12px 24px",
                    background: "var(--surface)",
                    borderRadius: "8px",
                    border: "1px solid var(--card-border)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--fg)"
                  }}>
                    {tech}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Back CTA */}
        <section className="fade-section" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
          <div className="container">
            <Reveal variant="fade-up">
              <div style={{
                textAlign: "center",
                padding: "48px",
                background: "var(--surface)",
                borderRadius: "20px",
                border: "1px solid var(--card-border)",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <p style={{
                  fontSize: "17px",
                  lineHeight: "1.7",
                  color: "var(--muted)",
                  marginBottom: "24px"
                }}>
                  Grazie per aver visitato questa pagina. <br />
                  Per qualsiasi informazione sui nostri servizi, non esitare a contattarci.
                </p>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    href="/"
                    className="btn btn-secondary"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    ← Torna alla Home
                  </Link>
                  <Link
                    href="/contatti"
                    className="btn btn-primary"
                  >
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
