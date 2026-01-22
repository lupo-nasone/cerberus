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
            // Legacy format: convert to new format with stable IDs
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
    const id = body?.id;
    const arr = await readArr();
    let next: PostItem[] = arr;
    if (typeof idx === "number") {
      if (idx < 0 || idx >= arr.length) {
        return NextResponse.json({ error: "Index out of range" }, { status: 400 });
      }
      next = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    } else if (typeof id === "string") {
      next = arr.filter((p) => p.id !== id);
    } else {
      return NextResponse.json({ error: "Invalid index or id" }, { status: 400 });
    }

    await writeArr(next);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/links failed:", err);
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    if (!cookie.includes("admin_auth=1")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, keywords } = body;

    if (typeof id !== "string") {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const arr = await readArr();
    const index = arr.findIndex((p) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update only title and keywords
    arr[index] = {
      ...arr[index],
      title: typeof title === "string" ? title : arr[index].title,
      keywords: Array.isArray(keywords) ? keywords : arr[index].keywords,
    };

    await writeArr(arr);

    return NextResponse.json({ ok: true, post: arr[index] });
  } catch (err) {
    console.error("PATCH /api/links failed:", err);
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
