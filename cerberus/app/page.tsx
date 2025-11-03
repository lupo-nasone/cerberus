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

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
