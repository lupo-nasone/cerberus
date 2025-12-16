import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

type BlobItem = { pathname: string; url: string };

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    if (!cookie.includes("admin_auth=1")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const html = body?.html;
    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "Invalid html" }, { status: 400 });
    }
    // basic validation: must contain LinkedIn embed content
    // Accept either iframe embeds or blockquote+script embeds
    const lowered = html.toLowerCase();
    const hasIframe = lowered.includes("<iframe") && (lowered.includes("linkedin.com") || lowered.includes("platform.linkedin.com"));
    const hasScriptEmbed = lowered.includes("<blockquote") && lowered.includes("class=\"linkedin-post\"") || lowered.includes("platform.linkedin.com");
    if (!hasIframe && !hasScriptEmbed) {
      return NextResponse.json({ error: "HTML non valido: incolla un embed LinkedIn (iframe o script)" }, { status: 400 });
    }

    let arr: string[] = [];
    // Blob-only read
    try {
      const { blobs } = await list({ prefix: "cerberus/", token: process.env.BLOB_READ_WRITE_TOKEN });
      const found = (blobs as BlobItem[]).find((b) => b.pathname === "cerberus/linkedin-posts.json");
      if (found?.url) {
        const r = await fetch(found.url);
        if (r.ok) {
          const parsed = await r.json();
          arr = Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch {}

    // avoid exact-duplicate HTML entries
    const trimmed = html.trim();
    if (!arr.includes(trimmed)) arr.push(trimmed);

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
