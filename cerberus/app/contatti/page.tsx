import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contatti - Cerberus",
  description: "Contattaci per informazioni sui servizi, preventivi e assistenza.",
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container">
        <section style={{ margin: "28px 0" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Contatti</h1>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Per informazioni sui nostri servizi o per richiedere un preventivo contattaci tramite il form
            qui sotto o usando i recapiti indicati.
          </p>
        </section>

        <section className="contact-grid">
          <div className="contact-form">
            <form action="#" method="post" className="contact-form">
              <div className="form-field">
                <label htmlFor="name">Nome</label>
                <input id="name" name="name" type="text" className="form-control" />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-control" />
              </div>

              <div className="form-field">
                <label htmlFor="message">Messaggio</label>
                <textarea id="message" name="message" rows={6} className="form-control" />
              </div>

              <div>
                <button type="submit" className="btn btn-primary">Invia richiesta</button>
              </div>
            </form>
          </div>

          <aside className="contact-aside">
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Recapiti</h3>
              <p style={{ margin: 6, color: "var(--muted)" }}>
                Email: <a href="mailto:info@cerberus.example">info@cerberus.example</a>
                <br />
                Telefono: <a href="tel:+390123456789">+39 012 345 6789</a>
              </p>

              <h4 style={{ marginBottom: 6 }}>Sede</h4>
              <p style={{ margin: 0, color: "var(--muted)" }}>Via Esempio 10, 00100 Roma (RM)</p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
