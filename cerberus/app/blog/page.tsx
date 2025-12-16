import { list } from "@vercel/blob";
// Read posts via internal API to keep logic in one place
// Ensure this page is always dynamically rendered and not cached
export const revalidate = 0;
export const dynamic = "force-dynamic";

import LinkedInEmbeds from "../components/LinkedInEmbeds";
import Header from "../components/Header";
import Footer from "../components/Footer";

type BlobItem = { pathname: string; url: string };
type PostItem = { id: string; title?: string; html: string; createdAt?: string };

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
        <section className="container p-6">
          <h1 className="text-2xl font-bold mb-4">Blog - LinkedIn Posts</h1>
          {posts.length === 0 ? (
            <p>Nessun post incorporato.</p>
          ) : (
            // mostra gli embed in colonne
            <div className="grid cols-2 gap-6">
              {posts.map((p, i) => (
                <div key={i} className="card p-4">
                  {p.title && <div className="font-semibold mb-2">{p.title}</div>}
                  <div className="embed-wrapper" dangerouslySetInnerHTML={{ __html: p.html }} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
