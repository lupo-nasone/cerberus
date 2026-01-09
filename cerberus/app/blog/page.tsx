import { list } from "@vercel/blob";
// Read posts via internal API to keep logic in one place
// Ensure this page is always dynamically rendered and not cached
export const revalidate = 0;
export const dynamic = "force-dynamic";

import BlogSearch from "../components/BlogSearch";
import Header from "../components/Header";
import Footer from "../components/Footer";

type BlobItem = { pathname: string; url: string };
type PostItem = { id: string; title?: string; html: string; keywords?: string[]; createdAt?: string };

async function getSaved() {
  // Prefer Blob in production
  try {
    const { blobs } = await list({ prefix: "cerberus/", token: process.env.BLOB_READ_WRITE_TOKEN });
    const found = (blobs as BlobItem[]).find((b) => b.pathname === "cerberus/linkedin-posts.json");
    if (found?.url) {
      const r = await fetch(found.url, { cache: "no-store" });
      if (r.ok) {
        const arr = await r.json();
        if (Array.isArray(arr)) {
          if (arr.length > 0 && typeof arr[0] === "string") {
            return (arr as string[]).map((html, i) => ({ id: `${Date.now()}-${i}`, html })) as PostItem[];
          }
          return arr as PostItem[];
        }
      }
    }
  } catch {}

  // Blob not found or error: return empty
  return [] as PostItem[];
}

export default async function BlogPage() {
  const posts = await getSaved();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Hero */}
        <div className="page-hero">
          <div className="container">
            <h1>Blog</h1>
            <p className="page-subtitle">
              Scopri i nostri ultimi aggiornamenti, approfondimenti sulla sicurezza sul lavoro e novità dal mondo della formazione professionale.
            </p>
          </div>
        </div>
        
        {/* Blog Content */}
        <section className="blog-section">
          <div className="container">
            <BlogSearch posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
