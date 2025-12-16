import { headers } from "next/headers";
// Read posts via internal API to keep logic in one place
// Ensure this page is always dynamically rendered and not cached
export const revalidate = 0;
export const dynamic = "force-dynamic";

import LinkedInEmbeds from "../components/LinkedInEmbeds";
import Header from "../components/Header";
import Footer from "../components/Footer";

async function getSaved() {
  // Build absolute origin to avoid relative fetch issues in Server Components
  const hdrs = await headers();
  const host = hdrs.get("host") ?? "";
  const proto = hdrs.get("x-forwarded-proto") ?? "https";
  const origin = process.env.NEXT_PUBLIC_BASE_URL ?? (host ? `${proto}://${host}` : "");
  const r = await fetch(`${origin}/api/links`, { cache: "no-store" });
  if (r.ok) {
    const arr = await r.json();
    if (Array.isArray(arr)) return arr as string[];
  }
  return [];
}

export default async function BlogPage() {
  const urls = await getSaved();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="container p-6">
          <h1 className="text-2xl font-bold mb-4">Blog - LinkedIn Posts</h1>
          {urls.length === 0 ? (
            <p>Nessun post incorporato.</p>
          ) : (
            // mostra gli embed in colonne
            <div className="grid grid-cols-2 gap-6">
              {urls.map((h, i) => (
                <div key={i} className="card p-4">
                  <div className="embed-wrapper" dangerouslySetInnerHTML={{ __html: h }} />
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
