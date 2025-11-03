import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero container">
      <div className="left">
        <h1>Verifica zero rischi — Check up tecnico per la conformità normativa</h1>
        <p>
          Abbonamento "Zero Rischi": scadenziario verifiche, pianificazione con referenti aziendali,
          supporto pratiche e assistenza durante le visite ispettive. Garanzia Scudo Cerberus per la
          tua tranquillità.
        </p>

        <div className="ctas">
          <Link href="/landing/zero-rischi" className="btn btn-primary">Scopri l'abbonamento</Link>
          <Link href="/contatti" className="btn btn-ghost">Contattaci</Link>
        </div>
      </div>

      <div className="right">
        <div className="card">
          <h3>Garanzia Scudo Cerberus</h3>
          <p>Include: scadenziario, assistenza INAIL, supporto pratiche e consulenza dedicata.</p>
          <div style={{marginTop:12}}>
            <Link href="/landing/zero-rischi" className="btn" style={{background:'var(--accent)',color:'#fff',borderRadius:8,padding:'8px 12px',display:'inline-block'}}>Richiedi info</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
