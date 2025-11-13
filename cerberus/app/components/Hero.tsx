import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-full">
      <div className="hero-bg">
        {/* Soft blurred industrial background */}
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?factory,warehouse,industry')",
          }}
        />

        {/* Left and right flank images (people in hi-vis) */}
        <img
          className="hero-flank hero-flank-left"
          src="https://source.unsplash.com/300x500/?man,worker,helmet"
          alt=""
        />
        <img
          className="hero-flank hero-flank-right"
          src="https://source.unsplash.com/300x500/?man,engineer,vest"
          alt=""
        />

        {/* Center content column */}
        <div className="hero-center">
          <div className="hero-center-card">
            <p className="eyebrow">Sei un imprenditore?</p>
            <h1 className="hero-title">
              <span className="hero-title-accent">NON</span> PRENDERTI LA <br />
              COLPA DEGLI ALTRI
            </h1>
            <p className="hero-sub">Come specialisti della conformità CE per macchine e impianti, ti aiutiamo con documentazione, installazione e adeguamenti.</p>

            <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link href="/contatti" className="btn btn-primary">COSA POSSIAMO FARE?</Link>
              <Link href="/servizi" className="btn btn-ghost">I nostri servizi</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
