"use client";
import Link from "next/link";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute inset-y-0 -left-24 right-0 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(17,96,166,0.16),_transparent_62%)] blur-3xl opacity-80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal
          as="p"
          className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-brand-700/70"
          variant="fade-up"
        >
          Tre fasi, zero sorprese
        </Reveal>
        <Reveal variant="fade-up" delay={80}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mt-5 text-gray-900">
            <span className="relative inline-flex items-center justify-center px-4 py-1">
              <span className="absolute inset-0 rounded-full bg-brand-500/15 blur-lg" aria-hidden />
              <span>Come funziona Verifica Zero Rischi®</span>
            </span>
          </h2>
        </Reveal>
        <Reveal
          as="p"
          className="mt-6 max-w-3xl mx-auto text-center text-base md:text-lg text-gray-600"
          variant="fade-up"
          delay={160}
        >
          Dalla fotografia iniziale al coordinamento quotidiano: un metodo pensato per liberarti dalle corse all’ultimo minuto e farti dormire tranquillo.
        </Reveal>

        <div className="relative mt-14">
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-px bg-brand-500/10" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Reveal
              className="group relative bg-white/95 border border-white/60 rounded-2xl px-9 pt-16 pb-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur"
              variant="fade-up"
            >
              <span className="absolute -top-6 left-9 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-700 to-brand-500 text-white text-lg font-semibold shadow-lg">01</span>
              <div className="absolute inset-x-9 top-12 h-px bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" aria-hidden />
              <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-brand-700/20 shadow-inner border border-brand-500/10" aria-hidden />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Check-up iniziale</h3>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-700/70 mb-4">Analisi & mappatura</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 marker:text-brand-500">
                <li>Analisi di impianti, attrezzature e documentazione esistente.</li>
                <li>Mappatura delle normative rilevanti (DPR 462/01, DM 11/04/2011, D.P.R. 162/1999, ecc.) e identificazione delle priorità.</li>
              </ul>
              <div className="hidden md:block absolute top-1/2 -right-6 h-3 w-3 rotate-45 bg-white border border-brand-500/15 shadow-sm" aria-hidden />
            </Reveal>

            {/* Step 2 */}
            <Reveal
              className="group relative bg-white/95 border border-white/60 rounded-2xl px-9 pt-16 pb-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur"
              variant="fade-up"
              delay={120}
            >
              <span className="absolute -top-6 left-9 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-700 to-brand-500 text-white text-lg font-semibold shadow-lg">02</span>
              <div className="absolute inset-x-9 top-12 h-px bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" aria-hidden />
              <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-brand-700/20 shadow-inner border border-brand-500/10" aria-hidden />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Piano Zero Rischi</h3>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-700/70 mb-4">Strategia & priorità</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 marker:text-brand-500">
                <li>Piano completo con verifiche da eseguire, scadenze, ruoli e responsabilità.</li>
                <li>Valutazione dell’esposizione al rischio e soluzioni economicamente sostenibili.</li>
              </ul>
              <div className="hidden md:block absolute top-1/2 -right-6 h-3 w-3 rotate-45 bg-white border border-brand-500/15 shadow-sm" aria-hidden />
            </Reveal>

            {/* Step 3 */}
            <Reveal
              className="group relative bg-white/95 border border-white/60 rounded-2xl px-9 pt-16 pb-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur"
              variant="fade-up"
              delay={240}
            >
              <span className="absolute -top-6 left-9 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-700 to-brand-500 text-white text-lg font-semibold shadow-lg">03</span>
              <div className="absolute inset-x-9 top-12 h-px bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" aria-hidden />
              <div className="mb-6 h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-brand-700/20 shadow-inner border border-brand-500/10" aria-hidden />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Gestione e accompagnamento</h3>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-700/70 mb-4">Supporto continuo</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5 marker:text-brand-500">
                <li>Esecuzione delle verifiche (diretta o coordinata), remind scadenze e aggiornamenti costanti.</li>
                <li>Affiancamento in caso di controllo e gestione delle richieste degli enti.</li>
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 text-center" variant="fade-up" delay={320}>
          <Link
            href="/contatti"
            className="btn btn-primary inline-flex items-center gap-3 justify-center px-8 py-4 text-lg font-bold shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Voglio il mio Check-up Verifica Zero Rischi
            <span className="text-2xl leading-none">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
