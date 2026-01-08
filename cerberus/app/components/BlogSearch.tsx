"use client";

import { useState, useMemo } from "react";

type PostItem = { id: string; title?: string; html: string; keywords?: string[]; createdAt?: string };

interface BlogSearchProps {
  posts: PostItem[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [search, setSearch] = useState("");

  // Extract all unique keywords from posts
  const allKeywords = useMemo(() => {
    const kwSet = new Set<string>();
    posts.forEach((p) => {
      if (p.keywords) {
        p.keywords.forEach((kw) => kwSet.add(kw));
      }
    });
    return Array.from(kwSet).sort();
  }, [posts]);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    
    const query = search.toLowerCase().trim();
    return posts.filter((p) => {
      // Match against title
      if (p.title && p.title.toLowerCase().includes(query)) return true;
      // Match against keywords
      if (p.keywords && p.keywords.some((kw) => kw.includes(query))) return true;
      return false;
    });
  }, [posts, search]);

  const handleKeywordClick = (kw: string) => {
    setSearch(kw);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per titolo o parola chiave..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Cancella ricerca"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Keywords Cloud */}
      {allKeywords.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-slate-400 mb-2">Parole chiave popolari:</p>
          <div className="flex flex-wrap gap-2">
            {allKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  search.toLowerCase() === kw
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results info */}
      {search && (
        <p className="text-sm text-slate-400 mb-4">
          {filteredPosts.length === 0
            ? "Nessun risultato trovato"
            : `${filteredPosts.length} risultat${filteredPosts.length === 1 ? "o" : "i"} per "${search}"`}
        </p>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        !search && <p>Nessun post incorporato.</p>
      ) : (
        <div className="grid cols-2 gap-6">
          {filteredPosts.map((p, i) => (
            <div key={p.id || i} className="card p-4">
              {p.title && <div className="font-semibold mb-2">{p.title}</div>}
              {p.keywords && p.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.keywords.map((kw, ki) => (
                    <button
                      key={ki}
                      onClick={() => handleKeywordClick(kw)}
                      className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full hover:bg-blue-800/50 transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              )}
              <div className="embed-wrapper" dangerouslySetInnerHTML={{ __html: p.html }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
