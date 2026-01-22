"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

interface StatsSummary {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgDuration: number;
}

interface PageData {
  path: string;
  views: number;
  visitors: number;
}

interface ReferrerData {
  referrer: string;
  views: number;
  visitors: number;
}

interface CountryData {
  country: string;
  views: number;
  visitors: number;
}

interface BrowserData {
  browser: string;
  views: number;
  visitors: number;
}

interface OSData {
  os: string;
  views: number;
  visitors: number;
}

interface StatsData {
  summary: StatsSummary;
  topPages: PageData[];
  topReferrers: ReferrerData[];
  countries: CountryData[];
  browsers: BrowserData[];
  os: OSData[];
  period?: { from: string; to: string };
  message?: string;
  isDemoData?: boolean;
}

export default function AdminStatsPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats", { credentials: "same-origin" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        if (data.isDemoData) {
          setMessage({ text: data.message || "Dati di esempio mostrati.", type: "info" });
        }
      } else if (res.status === 401) {
        setLoggedIn(false);
        setMessage({ text: "Sessione scaduta. Effettua nuovamente il login.", type: "error" });
      } else {
        const data = await res.json();
        setMessage({ text: data?.error || "Errore nel caricamento delle statistiche.", type: "error" });
      }
    } catch {
      setMessage({ text: "Errore di rete. Verifica la connessione.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setLoggedIn(true);
        setMessage({ text: "Login riuscito!", type: "success" });
        fetchStats();
      } else {
        setMessage({ text: "Password errata. Riprova.", type: "error" });
      }
    } catch {
      setMessage({ text: "Errore di rete. Verifica la connessione.", type: "error" });
    }
  }

  useEffect(() => {
    // Try fetching stats on mount (in case already logged in)
    fetchStats();
  }, [fetchStats]);

  // Country flag emoji helper
  function getCountryFlag(countryCode: string): string {
    if (!countryCode || countryCode.length !== 2) return "🌍";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  // Format number with locale
  function formatNumber(num: number): string {
    return new Intl.NumberFormat("it-IT").format(num);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <div className="page-hero">
          <div className="container">
            <h1>📊 Statistiche Sito</h1>
            <p className="page-subtitle">
              Monitora le visite e le performance del sito web con i dati di Vercel Analytics.
            </p>
          </div>
        </div>

        <section className="admin-section">
          <div className="container">
            {/* Navigation tabs */}
            <div className="admin-tabs" style={{ marginBottom: "2rem" }}>
              <Link href="/admin" className="admin-tab">
                📝 Gestione Post
              </Link>
              <Link href="/admin/stats" className="admin-tab admin-tab-active">
                📊 Statistiche
              </Link>
            </div>

            {!loggedIn && !stats ? (
              <div className="admin-login-card" style={{ position: "relative" }}>
                <h2>🔐 Accesso Riservato</h2>
                <p className="login-subtitle">
                  Inserisci la password per accedere alle statistiche.
                </p>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      placeholder="Inserisci la password..."
                    />
                  </div>
                  <button type="submit" className="btn-admin-primary">
                    Accedi
                  </button>
                </form>
                {message && (
                  <div className={`admin-message ${message.type}`}>{message.text}</div>
                )}
              </div>
            ) : (
              <div className="stats-dashboard">
                {/* Info message */}
                {message && (
                  <div className={`admin-message ${message.type}`} style={{ marginBottom: "1.5rem" }}>
                    {message.text}
                  </div>
                )}

                {loading ? (
                  <div className="stats-loading">
                    <div className="stats-spinner"></div>
                    <p>Caricamento statistiche...</p>
                  </div>
                ) : stats ? (
                  <>
                    {/* Period info */}
                    {stats.period && (
                      <p className="stats-period">
                        📅 Dati dal {stats.period.from} al {stats.period.to} (ultimi 30 giorni)
                      </p>
                    )}

                    {/* Summary Cards */}
                    <div className="stats-summary-grid">
                      <div className="stats-card stats-card-highlight">
                        <div className="stats-card-icon">👥</div>
                        <div className="stats-card-content">
                          <h3>Visitatori Unici</h3>
                          <p className="stats-value">{formatNumber(stats.summary.visitors)}</p>
                        </div>
                      </div>
                      <div className="stats-card stats-card-highlight">
                        <div className="stats-card-icon">👁️</div>
                        <div className="stats-card-content">
                          <h3>Visualizzazioni</h3>
                          <p className="stats-value">{formatNumber(stats.summary.pageViews)}</p>
                        </div>
                      </div>
                      <div className="stats-card">
                        <div className="stats-card-icon">📄</div>
                        <div className="stats-card-content">
                          <h3>Pagine/Visita</h3>
                          <p className="stats-value">
                            {stats.summary.visitors > 0
                              ? (stats.summary.pageViews / stats.summary.visitors).toFixed(1)
                              : "0"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Stats Grid */}
                    <div className="stats-details-grid">
                      {/* Top Pages */}
                      <div className="stats-panel">
                        <h3>🔗 Pagine più visitate</h3>
                        {stats.topPages.length > 0 ? (
                          <ul className="stats-list">
                            {stats.topPages.map((page, i) => (
                              <li key={i} className="stats-list-item">
                                <span className="stats-list-rank">{i + 1}</span>
                                <span className="stats-list-label" title={page.path}>
                                  {page.path === "/" ? "Homepage" : page.path}
                                </span>
                                <span className="stats-list-value">{formatNumber(page.views)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="stats-empty">Nessun dato disponibile</p>
                        )}
                      </div>

                      {/* Top Referrers */}
                      <div className="stats-panel">
                        <h3>🔀 Fonti di traffico</h3>
                        {stats.topReferrers.length > 0 ? (
                          <ul className="stats-list">
                            {stats.topReferrers.map((ref, i) => (
                              <li key={i} className="stats-list-item">
                                <span className="stats-list-rank">{i + 1}</span>
                                <span className="stats-list-label" title={ref.referrer}>
                                  {ref.referrer || "(Diretto)"}
                                </span>
                                <span className="stats-list-value">{formatNumber(ref.views)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="stats-empty">Nessun dato disponibile</p>
                        )}
                      </div>

                      {/* Countries */}
                      <div className="stats-panel">
                        <h3>🌍 Paesi</h3>
                        {stats.countries.length > 0 ? (
                          <ul className="stats-list">
                            {stats.countries.map((country, i) => (
                              <li key={i} className="stats-list-item">
                                <span className="stats-list-rank">{getCountryFlag(country.country)}</span>
                                <span className="stats-list-label">{country.country}</span>
                                <span className="stats-list-value">{formatNumber(country.visitors)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="stats-empty">Nessun dato disponibile</p>
                        )}
                      </div>

                      {/* Browsers */}
                      <div className="stats-panel">
                        <h3>🌐 Browser</h3>
                        {stats.browsers.length > 0 ? (
                          <ul className="stats-list">
                            {stats.browsers.map((browser, i) => (
                              <li key={i} className="stats-list-item">
                                <span className="stats-list-rank">{i + 1}</span>
                                <span className="stats-list-label">{browser.browser}</span>
                                <span className="stats-list-value">{formatNumber(browser.visitors)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="stats-empty">Nessun dato disponibile</p>
                        )}
                      </div>

                      {/* OS */}
                      <div className="stats-panel">
                        <h3>💻 Sistemi Operativi</h3>
                        {stats.os.length > 0 ? (
                          <ul className="stats-list">
                            {stats.os.map((os, i) => (
                              <li key={i} className="stats-list-item">
                                <span className="stats-list-rank">{i + 1}</span>
                                <span className="stats-list-label">{os.os}</span>
                                <span className="stats-list-value">{formatNumber(os.visitors)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="stats-empty">Nessun dato disponibile</p>
                        )}
                      </div>
                    </div>

                    {/* Refresh button */}
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                      <button onClick={fetchStats} className="btn-admin-primary" disabled={loading}>
                        🔄 Aggiorna Statistiche
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="stats-empty-state">
                    <p>Impossibile caricare le statistiche.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
