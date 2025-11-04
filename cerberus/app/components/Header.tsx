"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem("theme") || document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(t);
    } catch (e) {
      setTheme("dark");
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
    } catch (e) {}
  }

  return (
    <header className="site-header">
      <div className="wrap container">
        <Link href="/" className="brand">
          <div className="logo">C</div>
          <span className="brand-name">Cerberus</span>
        </Link>

        <nav className="nav">
          <Link href="/servizi">Servizi</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">Chi siamo</Link>
          <Link href="/contatti" className="cta">Contatti</Link>
        </nav>

        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <button
            aria-label={theme === 'dark' ? 'Passa a tema chiaro' : 'Passa a tema scuro'}
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Tema chiaro' : 'Tema scuro'}
            style={{background:'transparent',border:'1px solid var(--card-border)',padding:8,borderRadius:8,cursor:'pointer'}}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
