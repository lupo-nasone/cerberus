import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

type BlobItem = { pathname: string; url: string };
type PostItem = { id: string; title?: string; html: string; keywords?: string[]; createdAt?: string };

async function readArr(): Promise<PostItem[]> {
  // Prefer Vercel Blob in production
  try {
    const { blobs } = await list({ prefix: "cerberus/", token: process.env.BLOB_READ_WRITE_TOKEN });
    const found = (blobs as BlobItem[]).find((b) => b.pathname === "cerberus/linkedin-posts.json");
    if (found?.url) {
      const res = await fetch(found.url);
      if (res.ok) {
        const arr = await res.json();
        if (Array.isArray(arr)) {
          if (arr.length > 0 && typeof arr[0] === "string") {
            return (arr as string[]).map((html, i) => ({ id: `legacy-${i}-${Date.now()}`, html }));
          }
          return arr as PostItem[];
        }
        return [];
      }
    }
  } catch {}

  // Blob not found or error: return empty
  return [];
}

async function writeArr(arr: PostItem[]) {
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
    throw err;
  }
}

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    if (!cookie.includes("admin_auth=1")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const html = body?.html;
    const title = body?.title;
    const keywords = body?.keywords;
    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "Invalid html" }, { status: 400 });
    }
    // Parse keywords: accept array or comma-separated string
    let parsedKeywords: string[] = [];
    if (Array.isArray(keywords)) {
      parsedKeywords = keywords.map((k: string) => k.trim().toLowerCase()).filter(Boolean);
    } else if (typeof keywords === "string" && keywords.trim()) {
      parsedKeywords = keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    }
    // basic validation: must contain an iframe and LinkedIn embed url
    const lowered = html.toLowerCase();
    if (!lowered.includes("<iframe") || !lowered.includes("linkedin.com/embed")) {
      return NextResponse.json({ error: "HTML non valido: serve un iframe di LinkedIn" }, { status: 400 });
    }

    let arr: PostItem[] = await readArr();

    // avoid exact-duplicate HTML entries
    const trimmed = html.trim();
    const exists = arr.some((p) => p.html === trimmed);
    if (exists) {
      return NextResponse.json({ error: "Questo post esiste già" }, { status: 400 });
    }

    // Generate stable ID using crypto
    const id = `post-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    arr.push({ 
      id, 
      title: typeof title === "string" ? title : undefined, 
      html: trimmed, 
      keywords: parsedKeywords.length > 0 ? parsedKeywords : undefined,
      createdAt: new Date().toISOString() 
    });

    // Blob-only write
    try {
      await writeArr(arr);
    } catch (err) {
      console.error("Blob put failed:", err);
      return NextResponse.json({ error: "Blob write failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("POST /api/save-link error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
