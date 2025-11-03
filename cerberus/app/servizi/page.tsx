import type { Metadata } from "next";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Servizi - Cerberus",
  description: "Elenco dei servizi offerti da Cerberus: scadenziario, assistenza ispettiva e consulenza normativa.",
};

export default function ServiziPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container">
        <header style={{ margin: "28px 0 8px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>I nostri servizi</h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Offriamo servizi pensati per supportare le aziende nella gestione della conformità
            normativa, dalla pianificazione delle verifiche fino all'assistenza durante le visite ispettive.
          </p>
        </header>

        <section className="services">
          <div className="services-grid">
            <ServiceCard
              title="Scadenziario e verifiche"
              desc="Pianificazione completa delle verifiche periodiche, promemoria e gestione scadenze per referenti aziendali."
            />

            <ServiceCard
              title="Assistenza ispettiva"
              desc="Supporto operativo durante le ispezioni, preparazione documentale e gestione comunicazioni con gli enti."
            />

            <ServiceCard
              title="Consulenza normativa"
              desc="Analisi tecnica e suggerimenti per adeguamento alla normativa vigente, con report e piani di intervento."
            />

            <ServiceCard
              title="Formazione e aggiornamenti"
              desc="Corsi personalizzati per il personale e aggiornamenti periodici su cambi normativi rilevanti."
            />

            <ServiceCard
              title="Supporto pratiche INAIL/ISP"
              desc="Gestione pratiche e comunicazioni verso gli enti competenti per semplificare gli adempimenti."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
