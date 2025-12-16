import fs from "fs";
import path from "path";
import LinkedInEmbeds from "../components/LinkedInEmbeds";
import Header from "../components/Header";
import Footer from "../components/Footer";

async function getSaved() {
  const filePath = path.join(process.cwd(), "content", "linkedin-posts.json");
  try {
    const c = await fs.promises.readFile(filePath, "utf8");
    const arr = JSON.parse(c);
    if (Array.isArray(arr)) return arr as string[];
    return [];
  } catch (err) {
    return [];
  }
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
            <div className="grid cols-2 gap-6">
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
