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

      <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 920 }}>
          <section style={{ margin: "28px 0", textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Chi siamo</h1>

          <div style={{ marginTop: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            <p>
              Non una semplice storia, ma un viaggio insieme a te.
            </p>

            <p>
              Ogni grande progetto nasce da un’idea, un’intuizione, una scintilla che accende la passione. Il nostro
              è iniziato con la voglia di offrire qualcosa di diverso: non solo servizi di qualità, ma un’esperienza che
              lasci il segno.
            </p>

            <p>
              Siamo il giusto mix di esperienza e freschezza, ma ciò che ci distingue davvero è il nostro approccio. Crediamo
              nel valore delle persone, nella cura del dettaglio e nella capacità di trasformare le esigenze dei nostri clienti
              in soluzioni concrete e innovative.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 20, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Cosa ci rende unici?</h2>
          <div style={{ marginTop: 8, color: 'var(--muted)' }}>
            <ul style={{ paddingLeft: 18, margin: '12px auto', display: 'inline-block', textAlign: 'left' }}>
              <li>✅ Passione autentica – Ogni giorno mettiamo il cuore in quello che facciamo.</li>
              <li>✅ Innovazione costante – Non seguiamo le tendenze, le creiamo.</li>
              <li>✅ Rapporto umano – Il cliente per noi non è un numero, ma un partner di crescita.</li>
              <li>✅ Qualità senza compromessi – Perché il dettaglio fa la differenza.</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>La nostra missione</h2>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>
            Vogliamo creare un legame con chi sceglie di affidarsi a noi, offrendo non solo un servizio, ma una vera e propria
            esperienza. Siamo qui per ascoltarti, consigliarti e accompagnarti verso il successo.
          </p>

          <p style={{ color: 'var(--muted)', marginTop: 12 }}>
            🔹 Vuoi scoprire di più su di noi? Contattaci o vieni a trovarci, sarà un piacere conoscerti!
          </p>
        </section>

        <section style={{ marginBottom: 24, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>I Fondatori</h2>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>Cerberus, il tuo guardiano!</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 12, justifyItems: 'center' }}>
            <div className="card" style={{ textAlign: 'center', paddingTop: 12, width: 320 }}>
              <img
                src="https://files.supersite.aruba.it/media/3294_029a01a98995cdf41080fd2ad65ed7328266daef.jpeg/v1/x_0,y_6,w_104,h_104/photo_20240126_082555%20(1).webp"
                alt="Ing. Simone Baratella"
                style={{ width: 104, height: 104, borderRadius: 8, objectFit: 'cover', display: 'block', margin: '0 auto' }}
              />
              <strong style={{ display: 'block', marginTop: 10 }}>Ing. Simone Baratella</strong>
              <p style={{ margin: 8, color: 'var(--muted)' }}>Legale Rappresentante</p>
            </div>

            <div className="card" style={{ textAlign: 'center', paddingTop: 12, width: 320 }}>
              <img
                src="https://files.supersite.aruba.it/media/3294_1f2b532f212514c47b5653b707b402046750f138.jpeg/v1/x_0,y_23,w_104,h_104/immagine%20whatsapp%202025-03-13%20ore%2015.59.22_d221309e.webp"
                alt="P.I. Andrea Gori"
                style={{ width: 104, height: 104, borderRadius: 8, objectFit: 'cover', display: 'block', margin: '0 auto' }}
              />
              <strong style={{ display: 'block', marginTop: 10 }}>P.I. Andrea Gori</strong>
              <p style={{ margin: 8, color: 'var(--muted)' }}>Legale Rappresentante</p>
            </div>
          </div>
        </section>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Contattaci</h2>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>Per informazioni su servizi e preventivi, visita la pagina contatti o scrivici direttamente.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
