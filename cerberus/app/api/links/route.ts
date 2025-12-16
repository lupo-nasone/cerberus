import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

type BlobItem = { pathname: string; url: string };

async function readArr(): Promise<string[]> {
  // Prefer Vercel Blob in production
  try {
    const { blobs } = await list({ prefix: "cerberus/", token: process.env.BLOB_READ_WRITE_TOKEN });
  const found = (blobs as BlobItem[]).find((b) => b.pathname === "cerberus/linkedin-posts.json");
    if (found?.url) {
      const res = await fetch(found.url);
      if (res.ok) {
        const arr = await res.json();
        return Array.isArray(arr) ? arr : [];
      }
    }
  } catch {}

  // Blob not found or error: return empty
  return [];
}

async function writeArr(arr: string[]) {
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

export async function GET() {
  try {
    const arr = await readArr();
    return NextResponse.json(arr);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    if (!cookie.includes("admin_auth=1")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const idx = body?.index;
    if (typeof idx !== "number") {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const arr = await readArr();
    if (idx < 0 || idx >= arr.length) {
      return NextResponse.json({ error: "Index out of range" }, { status: 400 });
    }

    arr.splice(idx, 1);
    await writeArr(arr);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/links failed:", err);
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
