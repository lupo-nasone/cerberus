"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [embed, setEmbed] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

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
        setMessage("Login riuscito.");
        // fetch saved posts after login
        fetchPosts();
      } else {
        setMessage("Password errata.");
      }
    } catch (err) {
      setMessage("Errore di rete.");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      // We expect the admin to paste the embed iframe HTML
      if (!embed || typeof embed !== "string") {
        setMessage("Incolla il codice di incorporamento (iframe).");
        return;
      }
      const res = await fetch("/api/save-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: embed }),
        credentials: "same-origin",
      });
      if (res.ok) {
        setMessage("Embed salvato.");
        setEmbed("");
        fetchPosts();
      } else if (res.status === 401) {
        setMessage("Non autorizzato. Effettua il login.");
        setLoggedIn(false);
      } else {
        const data = await res.json();
        setMessage(data?.error || "Errore salvando.");
      }
    } catch (err) {
      setMessage("Errore di rete.");
    }
  }

  async function fetchPosts() {
    try {
      const res = await fetch("/api/links", { headers: { "Content-Type": "application/json" }, credentials: "same-origin" });
      if (res.ok) {
        const arr = await res.json();
        setPosts(Array.isArray(arr) ? arr : []);
      }
    } catch (err) {
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
      const res = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
        credentials: "same-origin",
      });
      if (res.ok) {
        setMessage("Post cancellato.");
        fetchPosts();
      } else if (res.status === 401) {
        setMessage("Non autorizzato.");
        setLoggedIn(false);
      } else {
        const d = await res.json();
        setMessage(d?.error || "Errore cancellando.");
      }
    } catch (err) {
      setMessage("Errore di rete.");
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="container p-6">
          <h1 className="text-2xl font-bold mb-4">Area Admin - Inserisci LinkedIn post</h1>
          {!loggedIn ? (
        <form onSubmit={handleLogin} className="space-y-3">
          <label className="block">
            <div>Password (da `.env`)</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </label>
          <div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Accedi</button>
          </div>
        </form>
          ) : (
            <div>
          <form onSubmit={handleSave} className="space-y-3">
            <label className="block">
              <div>Incolla il codice di incorporamento (iframe) del post LinkedIn</div>
              <textarea
                value={embed}
                onChange={(e) => setEmbed(e.target.value)}
                placeholder={`<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:..." height="762" width="504" frameborder="0" allowfullscreen title="Post incorporato"></iframe>`}
                className="border rounded px-2 py-1 w-full h-40"
              />
            </label>
            <div>
              <button className="bg-green-600 text-white px-3 py-1 rounded">Salva</button>
            </div>
          </form>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Post salvati</h2>
            {posts.length === 0 ? (
              <p>Nessun post salvato.</p>
            ) : (
              <div className="grid cols-2 gap-4">
                {posts.map((p, i) => (
                  <div key={i} className="card p-4">
                    <div className="mb-3 embed-wrapper" dangerouslySetInnerHTML={{ __html: p }} />
                    <div className="flex items-center justify-end">
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDelete(i)}
                      >
                        Cancella
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
            </div>
          )}

          {message && <p className="mt-4">{message}</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
}
