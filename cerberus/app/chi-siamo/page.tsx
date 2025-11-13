"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocale } from "../../app/lib/LanguageProvider";

// metadata is intentionally handled at the layout level for client-side translated pages

export default function ChiSiamoPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 920 }}>
          <section style={{ margin: "28px 0", textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{t('chiSiamo.title')}</h1>

          <div style={{ marginTop: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            <p>{t('chiSiamo.lead')}</p>
            <p>{t('chiSiamo.para1')}</p>
            <p>{t('chiSiamo.para2')}</p>
          </div>
        </section>

        <section style={{ marginBottom: 20, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>{t('chiSiamo.uniqueTitle')}</h2>
          <div style={{ marginTop: 8, color: 'var(--muted)' }}>
            <ul style={{ paddingLeft: 18, margin: '12px auto', display: 'inline-block', textAlign: 'left' }}>
              {((t('chiSiamo.uniqueList') as unknown) as string[]).map((it: string) => (<li key={it}>{it}</li>))}
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>{t('chiSiamo.missionTitle')}</h2>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>{t('chiSiamo.missionText')}</p>

          <p style={{ color: 'var(--muted)', marginTop: 12 }}>{t('chiSiamo.contactCTAText')}</p>
        </section>

        <section style={{ marginBottom: 24, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>{t('chiSiamo.foundersTitle')}</h2>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>{t('chiSiamo.foundersLead')}</p>

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
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>{t('contact.title')}</h2>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>{t('chiSiamo.contactCTAText')}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
