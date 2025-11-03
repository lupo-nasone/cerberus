export default function Testimonials() {
  const items = [
    { name: 'Azienda Alfa', quote: 'Supporto rapido e competente, procedure chiare.' },
    { name: 'Beta Srl', quote: 'Abbiamo ridotto i rischi e migliorato la conformità.' },
  ];

  return (
    <section className="testimonials container">
      <h3 style={{fontSize:22,fontWeight:600,marginBottom:12}}>Cosa dicono i clienti</h3>
      <div className="test-grid">
        {items.map((it) => (
          <div key={it.name} className="quote">
            <blockquote>“{it.quote}”</blockquote>
            <cite>{it.name}</cite>
          </div>
        ))}
      </div>
    </section>
  );
}
