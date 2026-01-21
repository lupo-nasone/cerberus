"use client";

import { useState, useMemo, useRef, useEffect } from "react";

type PostItem = { id: string; title?: string; html: string; keywords?: string[]; createdAt?: string };

interface BlogSearchProps {
  posts: PostItem[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setIsDropdownOpen(false);
  };

  return (
    <div>
      {/* Search Bar and Tags Dropdown */}
      <div className="blog-filters-row">
        {/* Search Bar */}
        <div className="blog-search-container">
          <span className="blog-search-icon">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per titolo o parola chiave..."
            className="blog-search-input"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="blog-search-clear"
              aria-label="Cancella ricerca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tags Dropdown - sempre visibile */}
        <div className="tags-dropdown-container" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`tags-dropdown-button ${search && allKeywords.includes(search) ? 'active' : ''}`}
          >
            <span className="tags-dropdown-icon">🏷️</span>
            <span>{search && allKeywords.includes(search) ? search : 'Filtra per tag'}</span>
            <span className={`tags-dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          {isDropdownOpen && (
            <div className="tags-dropdown-menu">
              <button
                onClick={() => { setSearch(""); setIsDropdownOpen(false); }}
                className={`tags-dropdown-item ${!search ? 'active' : ''}`}
              >
                Tutti i post
              </button>
              {allKeywords.length > 0 ? (
                allKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleKeywordClick(kw)}
                    className={`tags-dropdown-item ${search.toLowerCase() === kw ? 'active' : ''}`}
                  >
                    {kw}
                  </button>
                ))
              ) : (
                <div className="tags-dropdown-item tags-dropdown-empty">
                  Nessun tag disponibile
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results info */}
      {search && (
        <p className="results-info">
          {filteredPosts.length === 0
            ? "Nessun risultato trovato"
            : <><span className="results-count">{filteredPosts.length}</span> risultat{filteredPosts.length === 1 ? "o" : "i"} per &quot;{search}&quot;</>}
        </p>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        !search && (
          <div className="blog-empty">
            <div className="blog-empty-icon">📝</div>
            <p className="blog-empty-text">Nessun post pubblicato ancora.</p>
          </div>
        )
      ) : (
        <div className="blog-grid">
          {filteredPosts.map((p, i) => (
            <div key={p.id || i} className="blog-card">
              {(p.title || (p.keywords && p.keywords.length > 0)) && (
                <div className="blog-card-header">
                  {p.title && <h3 className="blog-card-title">{p.title}</h3>}
                  {p.keywords && p.keywords.length > 0 && (
                    <div className="blog-card-keywords">
                      {p.keywords.map((kw, ki) => (
                        <button
                          key={ki}
                          onClick={() => handleKeywordClick(kw)}
                          className="blog-card-keyword"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="blog-card-embed" dangerouslySetInnerHTML={{ __html: p.html }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
