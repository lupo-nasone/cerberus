"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [embed, setEmbed] = useState("");
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  // posts can be string[] (legacy) or objects with id/title/html/keywords
  type PostItem = { id: string; title?: string; html: string; keywords?: string[]; createdAt?: string };
  const [postItems, setPostItems] = useState<PostItem[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

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
        setMessage({ text: "Login riuscito! Benvenuto nell'area admin.", type: "success" });
        // fetch saved posts after login
        fetchPosts();
      } else {
        setMessage({ text: "Password errata. Riprova.", type: "error" });
      }
    } catch {
      setMessage({ text: "Errore di rete. Verifica la connessione.", type: "error" });
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      // We expect the admin to paste the embed iframe HTML
      if (!embed || typeof embed !== "string") {
        setMessage({ text: "Incolla il codice di incorporamento (iframe).", type: "error" });
        return;
      }
      const res = await fetch("/api/save-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: embed, title, keywords }),
        credentials: "same-origin",
      });
      if (res.ok) {
        setMessage({ text: "Post salvato con successo!", type: "success" });
        setEmbed("");
        setTitle("");
        setKeywords("");
        fetchPosts();
      } else if (res.status === 401) {
        setMessage({ text: "Sessione scaduta. Effettua nuovamente il login.", type: "error" });
        setLoggedIn(false);
      } else {
        const data = await res.json();
        setMessage({ text: data?.error || "Errore durante il salvataggio.", type: "error" });
      }
    } catch {
      setMessage({ text: "Errore di rete. Verifica la connessione.", type: "error" });
    }
  }

  async function fetchPosts() {
    try {
      const res = await fetch("/api/links", { headers: { "Content-Type": "application/json" }, credentials: "same-origin" });
      if (res.ok) {
        const arr = await res.json();
        if (Array.isArray(arr)) {
          if (arr.length > 0 && typeof arr[0] === "string") {
            // Legacy format: array of strings
            const converted = (arr as string[]).map((html, i) => ({ 
              id: `legacy-${i}-${Math.random()}`, 
              html 
            }));
            setPosts(converted.map((p) => p.html));
            setPostItems(converted);
          } else {
            // New format: array of PostItem objects
            setPosts((arr as PostItem[]).map((p) => p.html));
            setPostItems(arr as PostItem[]);
          }
        } else {
          setPosts([]);
          setPostItems([]);
        }
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    // try fetch posts on mount (in case already logged in)
    fetchPosts();
  }, []);

  async function handleDelete(index: number) {
    setMessage(null);
    try {
      const p = postItems[index];
      if (!p?.id) {
        setMessage({ text: "Errore: Post senza ID.", type: "error" });
        return;
      }
      const res = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id }),
        credentials: "same-origin",
      });
      if (res.ok) {
        setMessage({ text: "Post eliminato con successo.", type: "success" });
        fetchPosts();
      } else if (res.status === 401) {
        setMessage({ text: "Sessione scaduta.", type: "error" });
        setLoggedIn(false);
      } else {
        const d = await res.json();
        setMessage({ text: d?.error || "Errore durante l'eliminazione.", type: "error" });
      }
    } catch {
      setMessage({ text: "Errore di rete.", type: "error" });
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <div className="page-hero">
          <div className="container">
            <h1>Area Admin</h1>
            <p className="page-subtitle">
              Gestisci i post LinkedIn del blog. Aggiungi nuovi contenuti o rimuovi quelli esistenti.
            </p>
          </div>
        </div>

        <section className="admin-section">
          <div className="container">
            {!loggedIn ? (
              <div className="admin-login-card" style={{ position: 'relative' }}>
                <h2>🔐 Accesso Riservato</h2>
                <p className="login-subtitle">Inserisci la password per accedere all&apos;area amministrativa.</p>
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
                  <div className={`admin-message ${message.type}`}>
                    {message.text}
                  </div>
                )}
              </div>
            ) : (
              <div className="admin-dashboard">
                {/* Form Panel */}
                <div className="admin-form-panel">
                  <h2>Nuovo Post</h2>
                  <form onSubmit={handleSave}>
                    <div className="form-group">
                      <label className="form-label">Codice Embed (iframe)</label>
                      <textarea
                        value={embed}
                        onChange={(e) => setEmbed(e.target.value)}
                        placeholder={`<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:..." height="762" width="504" frameborder="0" allowfullscreen title="Post incorporato"></iframe>`}
                        className="form-textarea"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Titolo (facoltativo)</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Es: Nuovo corso sulla sicurezza"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Parole chiave</label>
                      <input
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="sicurezza, normative, cantieri"
                        className="form-input"
                      />
                    </div>
                    <button type="submit" className="btn-admin-primary btn-admin-success">
                      Salva Post
                    </button>
                  </form>
                  {message && (
                    <div className={`admin-message ${message.type}`}>
                      {message.text}
                    </div>
                  )}
                </div>

                {/* Posts Panel */}
                <div className="admin-posts-panel">
                  <h2>
                    Post Salvati 
                    <span className="admin-posts-count">{posts.length}</span>
                  </h2>
                  
                  {posts.length === 0 ? (
                    <div className="admin-empty">
                      <div className="admin-empty-icon">📭</div>
                      <p className="admin-empty-text">Nessun post salvato ancora. Aggiungi il tuo primo post!</p>
                    </div>
                  ) : (
                    <div className="admin-posts-grid">
                      {postItems.map((p, i) => (
                        <div key={i} className="admin-post-card">
                          <div className="admin-post-header">
                            {p.title && <h3 className="admin-post-title">{p.title}</h3>}
                            {p.keywords && p.keywords.length > 0 && (
                              <div className="admin-post-keywords">
                                {p.keywords.map((kw, ki) => (
                                  <span key={ki} className="admin-post-keyword">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            )}
                            {!p.title && (!p.keywords || p.keywords.length === 0) && (
                              <span className="admin-post-title" style={{ opacity: 0.5 }}>Post #{i + 1}</span>
                            )}
                          </div>
                          <div className="admin-post-embed" dangerouslySetInnerHTML={{ __html: p.html }} />
                          <div className="admin-post-actions">
                            <button
                              className="btn-admin-danger"
                              onClick={() => handleDelete(i)}
                            >
                              🗑️ Elimina
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
