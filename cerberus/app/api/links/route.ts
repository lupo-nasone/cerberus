import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "content", "linkedin-posts.json");

async function readArr(): Promise<string[]> {
  try {
    const c = await fs.readFile(filePath, "utf8");
    const arr = JSON.parse(c);
    return Array.isArray(arr) ? arr : [];
  } catch (err) {
    return [];
  }
}

async function writeArr(arr: string[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
