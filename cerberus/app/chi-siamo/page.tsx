import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Chi siamo - Cerberus",
  description: "Chi siamo: la nostra missione, esperienza e come supportiamo le aziende nella conformità normativa.",
};

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container">
        <section style={{ margin: "28px 0" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Chi siamo</h1>
          <p style={{ color: "var(--muted)", marginTop: 10 }}>
            Cerberus nasce per offrire servizi di consulenza e assistenza nella gestione della conformità
            normativa e della sicurezza aziendale. Il nostro approccio è pratico, basato su esperienza
            tecnica e relazioni consolidate con enti e ispettori.
          </p>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>La nostra missione</h2>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Aiutiamo le imprese a ridurre i rischi e a mantenere la conformità normativa in modo semplice
            e sostenibile. Offriamo servizi modulari: scadenziari, assistenza ispettiva, consulenza tecnica
            e formazione.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Il team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 12 }}>
            <div className="card">
              <strong>Marco Rossi</strong>
              <p style={{ margin: 8, color: "var(--muted)" }}>Responsabile tecnico — Esperto in normativa e gestione del rischio.</p>
            </div>

            <div className="card">
              <strong>Laura Bianchi</strong>
              <p style={{ margin: 8, color: "var(--muted)" }}>Project manager — Coordina i progetti e i rapporti con i clienti.</p>
            </div>

            <div className="card">
              <strong>Team operativo</strong>
              <p style={{ margin: 8, color: "var(--muted)" }}>Tecnici e consulenti a supporto per ispezioni e pratiche amministrative.</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Contattaci</h2>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>Per informazioni su servizi e preventivi, visita la pagina contatti o scrivici direttamente.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
