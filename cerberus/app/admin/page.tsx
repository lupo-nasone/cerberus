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
        body: JSON.stringify({ html: embed, title, keywords }),
        credentials: "same-origin",
      });
      if (res.ok) {
        setMessage("Embed salvato.");
        setEmbed("");
        setTitle("");
        setKeywords("");
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
      const p = postItems[index];
      if (!p?.id) {
        setMessage("Errore: Post senza ID.");
        return;
      }
      const res = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id }),
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
            <label className="block">
              <div>Titolo (facoltativo)</div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titolo del post"
                className="border rounded px-2 py-1 w-full"
              />
            </label>
            <label className="block">
              <div>Parole chiave (separate da virgola)</div>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="sicurezza, normative, cantieri, formazione"
                className="border rounded px-2 py-1 w-full"
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
                {postItems.map((p, i) => (
                  <div key={i} className="card p-4">
                    {p.title && <div className="font-semibold mb-2">{p.title}</div>}
                    {p.keywords && p.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {p.keywords.map((kw, ki) => (
                          <span key={ki} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mb-3 embed-wrapper" dangerouslySetInnerHTML={{ __html: p.html }} />
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
