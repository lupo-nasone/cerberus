"use client";
import { useState } from "react";
import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";
import Reveal from "./Reveal";
import DownloadModal from "./DownloadModal";

export default function Hero() {
  const { t } = useLocale();
  const [downloadOpen, setDownloadOpen] = useState(false);
  type QuestionCard = {
    title: string;
    body: string;
    imageAlt: string;
  };

  const questionEyebrowRaw = t("homeQuestions.eyebrow");
  const questionTitleRaw = t("homeQuestions.title");
  const questionCtaRaw = t("homeQuestions.cta");
  const questionCardsRaw = t("homeQuestions.cards");

  const fallbackQuestionCards: QuestionCard[] = [
    {
      title: "È da troppo che non riguardi le verifiche dei tuoi impianti?",
      body: "Messa a terra, attrezzature in pressione, sollevamento… i verbali sono sparsi tra mail, cassetti e fornitori diversi.",
      imageAlt: "Schema impianto"
    },
    {
      title: "Hai paura di non essere pronto se arriva un’ispezione?",
      body: "Sai che dovresti essere in regola, ma se domani entrano INAIL, ASL o un ente terzo… non sei completamente tranquillo.",
      imageAlt: "Preparazione a un’ispezione"
    },
    {
      title: "Ti sembra di spendere senza avere una visione d’insieme?",
      body: "Paghi verifiche e consulenze, ma nessuno ti dà un quadro chiaro di cosa serve davvero e cosa è solo \"carta\".",
      imageAlt: "Controlli e costi aziendali"
    }
  ];

  const questionEyebrow = typeof questionEyebrowRaw === "string" ? questionEyebrowRaw : "Domande scomode";
  const questionTitle = typeof questionTitleRaw === "string" ? questionTitleRaw : "Ti rivedi in almeno una di queste situazioni?";
  const questionCta = typeof questionCtaRaw === "string" ? questionCtaRaw : "Voglio il mio Check-up Verifica Zero Rischi";
  const questionCards: QuestionCard[] = Array.isArray(questionCardsRaw)
    ? (questionCardsRaw as QuestionCard[])
    : fallbackQuestionCards;

  const questionImages = [
    "/images/domanda1.png",
    "/images/domanda2.png",
    "/images/domanda3.png"
  ];

  return (
    <>
      <section className="hero-full">
        <div className="hero-bg">
          {/* use local hero svg as soft background if available */}
          <div
            className="hero-bg-image"
            style={{
              backgroundImage: "url('/images/sfondo.jpeg')",
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}
          />

          {/* Center content column */}
          <div className="hero-center">
            <Reveal className="hero-center-card" variant="fade-up">
              <p className="eyebrow">{t("hero.eyebrow")}</p>

              <h1 className="hero-title">
                {/* split accent if translation contains the word NON like in Italian, otherwise render full title */}
                {(() => {
                  const title: string = t("hero.title");
                  // if title starts with NON (Italian) or similar, try to accent first word
                  const parts = title.split(" ");
                  if (
                    parts.length > 1 &&
                    (parts[0].toUpperCase() === "NON" ||
                      parts[0].toUpperCase() === "DON'T" ||
                      parts[0].toUpperCase() === "DON'T")
                  ) {
                    const first = parts.shift();
                    return (
                      <>
                        <span className="hero-title-accent">{first}</span> {parts.join(" ")}
                      </>
                    );
                  }
                  return title;
                })()}
              </h1>

              <p className="hero-sub">{t("hero.sub")}</p>

              <div className="ctas hero-ctas">
                <Link href="/contatti" className="btn btn-primary">
                  » {t("hero.ctaPrimary")}
                </Link>
                <button
                  type="button"
                  onClick={() => setDownloadOpen(true)}
                  className="btn btn-secondary"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  {t("hero.ctaSecondary")}
                </button>
              </div>
            </Reveal>
          </div>

          <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />

          {/* Flank images grouped so on small screens they can sit side-by-side below the center card */}
          <div className="hero-flanks">
            <img className="hero-flank hero-flank-left" src="/images/bro1.png" alt="persona sinistra" />
            <img className="hero-flank hero-flank-right" src="/images/bro2.png" alt="persona destra" />
          </div>
        </div>
      </section>

      {/* Sezione domande "scomode" rivisitata */}
      <section className="questions-section">
        <div className="container">
          <Reveal className="section-eyebrow" variant="fade-up">
            {questionEyebrow}
          </Reveal>
          <Reveal as="h2" className="section-title questions-title" variant="fade-up" delay={80}>
            {questionTitle}
          </Reveal>

          <div className="questions-grid">
            {questionCards.map((card, index) => (
              <Reveal
                key={`${card.title}-${index}`}
                className="question-card"
                variant="fade-up"
                delay={index * 120}
              >
                <div className="question-card-figure">
                  <span className="question-card-index">0{index + 1}</span>
                  <div className="question-image-wrapper">
                    <img
                      src={questionImages[index] ?? questionImages[0]}
                      alt={card.imageAlt}
                      className="question-image"
                    />
                  </div>
                </div>
                <div className="question-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="questions-cta" variant="fade-up" delay={questionCards.length * 120}>
            <Link href="/contatti" className="btn btn-primary questions-cta-btn">
              {questionCta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
