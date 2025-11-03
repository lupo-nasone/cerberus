import Link from "next/link";

export default function Header() {
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
      </div>
    </header>
  );
}
