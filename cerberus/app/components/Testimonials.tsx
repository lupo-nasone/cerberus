"use client";
import Reveal from "./Reveal";

export default function Testimonials() {
  const items = [
    { name: 'Azienda Alfa', quote: 'Supporto rapido e competente, procedure chiare.' },
    { name: 'Beta Srl', quote: 'Abbiamo ridotto i rischi e migliorato la conformità.' },
  ];

  return (
    <section className="testimonials container">
      <Reveal as="h3" variant="fade-up" style={{fontSize:22,fontWeight:600,marginBottom:12}}>
        Cosa dicono i clienti
      </Reveal>
      <div className="test-grid">
        {items.map((it, index) => (
          <Reveal key={it.name} className="quote" variant="fade-up" delay={index * 120}>
            <blockquote>“{it.quote}”</blockquote>
            <cite>{it.name}</cite>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
