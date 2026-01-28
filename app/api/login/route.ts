import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").toLowerCase().trim();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "email と password が必要です" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "メールかパスワードが違います" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json({ error: "メールかパスワードが違います" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // ★ ここでCookieセット（確実）
  res.cookies.set("session", user.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return res;
}
