"use client";
import Link from "next/link";
import { useLocale } from "../lib/LanguageProvider";
import Reveal from "./Reveal";

type Step = {
  title: string;
  tag: string;
  points: string[];
};

const FALLBACK_STEPS: Step[] = [
  {
    title: "Check-up iniziale",
    tag: "Analisi & mappatura",
    points: [
      "Analisi di impianti, attrezzature e documentazione esistente.",
      "Mappatura delle normative rilevanti e identificazione delle priorità."
    ]
  },
  {
    title: "Piano Zero Rischi",
    tag: "Strategia & priorità",
    points: [
      "Piano completo con verifiche da eseguire, scadenze, ruoli e responsabilità.",
      "Valutazione dell’esposizione al rischio e soluzioni sostenibili."
    ]
  },
  {
    title: "Gestione e accompagnamento",
    tag: "Supporto continuo",
    points: [
      "Esecuzione delle verifiche, reminder e aggiornamenti costanti.",
      "Affiancamento in caso di controllo e gestione delle richieste degli enti."
    ]
  }
];

export default function HowItWorks() {
  const { t } = useLocale();

  const eyebrowRaw = t("howItWorksSection.eyebrow");
  const titleRaw = t("howItWorksSection.title");
  const subtitleRaw = t("howItWorksSection.subtitle");
  const ctaRaw = t("howItWorksSection.cta");
  const stepsRaw = t("howItWorksSection.steps");

  const eyebrow = typeof eyebrowRaw === "string" ? eyebrowRaw : "Tre fasi, zero sorprese";
  const title = typeof titleRaw === "string" ? titleRaw : "Come funziona Verifica Zero Rischi®";
  const subtitle =
    typeof subtitleRaw === "string"
      ? subtitleRaw
      : "Dalla fotografia iniziale al coordinamento quotidiano: un metodo pensato per liberarti dalle corse all’ultimo minuto e farti dormire tranquillo.";
  const cta =
    typeof ctaRaw === "string" ? ctaRaw : "Voglio il mio Check-up Verifica Zero Rischi";

  const translatedSteps =
    Array.isArray(stepsRaw) && stepsRaw.length ? (stepsRaw as Step[]) : FALLBACK_STEPS;

  const steps = translatedSteps.map((rawStep, index) => {
    const fallback = FALLBACK_STEPS[index] ?? FALLBACK_STEPS[FALLBACK_STEPS.length - 1];
    const pointsRaw = Array.isArray(rawStep?.points)
      ? rawStep.points.filter((point): point is string => typeof point === "string")
      : [];

    return {
      title: typeof rawStep?.title === "string" ? rawStep.title : fallback.title,
      tag: typeof rawStep?.tag === "string" ? rawStep.tag : fallback.tag,
      points: pointsRaw.length ? pointsRaw : fallback.points
    };
  });

  return (
    <section className="process-section">
      <div className="process-glow" aria-hidden />
      <div className="container">
        <Reveal className="section-eyebrow process-eyebrow" variant="fade-up">
          {eyebrow}
        </Reveal>
        <Reveal as="h2" className="section-title process-title" variant="fade-up" delay={80}>
          {title}
        </Reveal>
        <Reveal as="p" className="section-subtitle process-subtitle" variant="fade-up" delay={140}>
          {subtitle}
        </Reveal>

        <div className="process-grid">
          {steps.map((step, index) => (
            <Reveal
              key={`${step.title}-${index}`}
              className="process-card"
              variant="fade-up"
              delay={index * 120}
            >
              <div className="process-card-head">
                <span className="process-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="process-card-tag">{step.tag}</span>
              </div>
              <h3>{step.title}</h3>
              <ul className="process-card-list">
                {step.points.map((point, pointIndex) => (
                  <li key={`${step.title}-${pointIndex}`}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="process-cta" variant="fade-up" delay={steps.length * 120}>
          <Link href="/contatti" className="btn btn-primary process-cta-btn">
            {cta}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
