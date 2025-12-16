import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

type BlobItem = { pathname: string; url: string };
type PostItem = { id: string; title?: string; html: string; createdAt?: string };

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    if (!cookie.includes("admin_auth=1")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const body = await req.json();
  const html = body?.html;
  const title = body?.title;
    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "Invalid html" }, { status: 400 });
    }
    // basic validation: must contain an iframe and LinkedIn embed url
    const lowered = html.toLowerCase();
    if (!lowered.includes("<iframe") || !lowered.includes("linkedin.com/embed")) {
      return NextResponse.json({ error: "HTML non valido: serve un iframe di LinkedIn" }, { status: 400 });
    }

  let arr: PostItem[] = [];
    // Blob-only read
    try {
      const { blobs } = await list({ prefix: "cerberus/", token: process.env.BLOB_READ_WRITE_TOKEN });
      const found = (blobs as BlobItem[]).find((b) => b.pathname === "cerberus/linkedin-posts.json");
      if (found?.url) {
        const r = await fetch(found.url);
        if (r.ok) {
          const parsed = await r.json();
          if (Array.isArray(parsed)) {
            if (parsed.length > 0 && typeof parsed[0] === "string") {
              arr = (parsed as string[]).map((h, i) => ({ id: `${Date.now()}-${i}`, html: h }));
            } else {
              arr = parsed as PostItem[];
            }
          } else {
            arr = [];
          }
        }
      }
    } catch {}

    // avoid exact-duplicate HTML entries
    const trimmed = html.trim();
    const exists = arr.some((p) => p.html === trimmed);
    if (!exists) {
      arr.push({ id: `${Date.now()}`, title: typeof title === "string" ? title : undefined, html: trimmed, createdAt: new Date().toISOString() });
    }

    // Blob-only write
    try {
      await put("cerberus/linkedin-posts.json", JSON.stringify(arr, null, 2), {
        contentType: "application/json",
        access: "public",
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } catch (err) {
      console.error("Blob put failed:", err);
      return NextResponse.json({ error: "Blob write failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
