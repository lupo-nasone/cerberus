import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Hero />

        {/* Quick intro/features section (inspired layout) */}
        <section className="container intro-section" style={{ padding: '40px 0' }}>
          <div className="intro-grid">
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Servizi dedicati per la tua conformità</h2>
              <p style={{ color: 'var(--muted)', marginTop: 10, maxWidth: 680 }}>
                Offriamo un pacchetto completo per la gestione della conformità: scadenziario, assistenza
                durante le visite ispettive, consulenza tecnica e formazione. Lavoriamo al tuo fianco per
                trasformare obblighi in opportunità di miglioramento.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 10, height: 10, background: 'var(--brand-700)', borderRadius: 4, marginTop: 6 }} />
                  <div>
                    <strong>Scadenziario e verifica</strong>
                    <div style={{ color: 'var(--muted)' }}>Pianificazione e reminder automatici.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 10, height: 10, background: 'var(--brand-500)', borderRadius: 4, marginTop: 6 }} />
                  <div>
                    <strong>Assistenza ispettiva</strong>
                    <div style={{ color: 'var(--muted)' }}>Supporto operativo e documentale.</div>
                  </div>
                </div>
              </div>
            </div>

            <aside>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Pacchetto Scudo Cerberus</h3>
                <p style={{ color: 'var(--muted)' }}>Servizi inclusi per proteggere la tua azienda con supporto dedicato.</p>
                <div style={{ marginTop: 12 }}>
                  <a href="/contatti" className="btn btn-primary">Richiedi una consulenza</a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Clients / certifications strip */}
        <section style={{ padding: '24px 0', background: 'transparent' }}>
          <div className="container">
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Chi si affida a noi</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, alignItems: 'center' }}>
              <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda A</div>
              <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda B</div>
              <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda C</div>
              <div className="card" style={{ textAlign: 'center', padding: 12 }}>Azienda D</div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services container">
          <h2 style={{fontSize:22,fontWeight:600,marginBottom:12}}>I nostri servizi</h2>
          <div className="services-grid">
            <ServiceCard
              title="Scadenziario e verifiche"
              desc="Pianificazione e reminder delle verifiche periodiche."
            />
            <ServiceCard
              title="Assistenza ispettiva"
              desc="Supporto durante le visite ispettive e gestione pratiche."
            />
            <ServiceCard
              title="Consulenza normativa"
              desc="Check up tecnico e adeguamento alla normativa vigente."
            />
          </div>
        </section>

        {/* CTA banner */}
        <section style={{ padding: '28px 0' }}>
          <div className="container">
            <div className="cta-banner">
              <div>
                <h3 style={{ margin: 0 }}>Vuoi mettere al sicuro la tua attività?</h3>
                <p style={{ margin: '6px 0 0', opacity: .95 }}>Richiedi una consulenza personalizzata e scopri il pacchetto su misura per te.</p>
              </div>

              <div>
                <a href="/contatti" className="btn btn-primary">Contattaci</a>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>

      
      <Footer />
    </div>
  );
}
