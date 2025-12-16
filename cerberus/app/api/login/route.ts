import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pw = body?.password;
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return NextResponse.json({ error: "ADMIN_PASSWORD non configurata" }, { status: 500 });
    }
    if (pw === expected) {
      const res = NextResponse.json({ ok: true });
      // Set a simple HttpOnly cookie for session
      res.headers.set(
        "Set-Cookie",
        `admin_auth=1; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`
      );
      return res;
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
