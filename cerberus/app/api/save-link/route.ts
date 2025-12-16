import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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
    // basic validation: must contain an iframe and LinkedIn embed url
    const lowered = html.toLowerCase();
    if (!lowered.includes("<iframe") || !lowered.includes("linkedin.com/embed")) {
      return NextResponse.json({ error: "HTML non valido: serve un iframe di LinkedIn" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "content", "linkedin-posts.json");
    let arr: string[] = [];
    try {
      const content = await fs.readFile(filePath, "utf8");
      arr = JSON.parse(content);
      if (!Array.isArray(arr)) arr = [];
    } catch (err) {
      // file may not exist, we'll create it
      arr = [];
    }

    // avoid exact-duplicate HTML entries
    const trimmed = html.trim();
    if (!arr.includes(trimmed)) arr.push(trimmed);

    await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
