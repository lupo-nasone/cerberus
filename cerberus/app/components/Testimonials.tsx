"use client";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLocale } from "../lib/LanguageProvider";

type TestimonialItem = { name: string; quote: string };

export default function Testimonials() {
  const { t } = useLocale();

  const sectionRaw = t("testimonialsSection") as any;
  const itemsRaw = t("testimonials.items") as any;

  const section = {
    eyebrow: typeof sectionRaw?.eyebrow === "string" ? sectionRaw.eyebrow : "Cosa dicono i clienti",
    title: typeof sectionRaw?.title === "string" ? sectionRaw.title : "Le testimonianze",
    subtitle:
      typeof sectionRaw?.subtitle === "string"
        ? sectionRaw.subtitle
        : "Aziende che ci hanno scelto per mettere ordine in verifiche, scadenze e responsabilità.",
    cta: typeof sectionRaw?.cta === "string" ? sectionRaw.cta : "Leggi tutte le recensioni"
  };

  const fallbackItems: TestimonialItem[] = [
    { name: "Azienda Alfa", quote: "Supporto rapido e competente, procedure chiare." },
    { name: "Beta Srl", quote: "Abbiamo ridotto i rischi e migliorato la conformità." }
  ];

  const items: TestimonialItem[] = Array.isArray(itemsRaw)
    ? itemsRaw.filter((entry: any): entry is TestimonialItem =>
        entry && typeof entry.name === "string" && typeof entry.quote === "string"
      )
    : fallbackItems;

  return (
  <section className="testimonials fade-section">
      <div className="container">
        <Reveal className="testimonials-head" variant="fade-up">
          <p className="section-eyebrow">{section.eyebrow}</p>
          <h2 className="section-title">{section.title}</h2>
          <p className="section-subtitle testimonials-subtitle">{section.subtitle}</p>
        </Reveal>

        <div className="test-grid">
          {items.map((it, index) => (
            <Reveal key={it.name} className="quote" variant="fade-up" delay={index * 120}>
              <blockquote>“{it.quote}”</blockquote>
              <cite>{it.name}</cite>
            </Reveal>
          ))}
        </div>

        <Reveal className="testimonials-cta" variant="fade-up" delay={items.length * 120}>
          <Link href="/testimonials" className="btn btn-secondary">
            {section.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
