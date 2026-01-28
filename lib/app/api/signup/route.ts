import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = body?.email?.toString().toLowerCase().trim();
  const password = body?.password?.toString();
  const name = body?.name?.toString()?.trim() || null;

  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: "パスワードは8文字以上" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "そのメールは既に使われています" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, password: hash, name } });

  return NextResponse.json({ ok: true }, { status: 201 });
}
