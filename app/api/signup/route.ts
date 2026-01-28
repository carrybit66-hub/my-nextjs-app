import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").toLowerCase().trim();
    const password = String(body.password ?? "");
    const name = body.name ? String(body.name).trim() : null;

    if (!email || !password || password.length < 8) {
      return NextResponse.json({ error: "メールと8文字以上のパスワードが必要です" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "そのメールは既に使われています" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hash, name },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    console.error("SIGNUP_ERROR_DETAIL:", e);
    return NextResponse.json(
      {
        error: e?.message ?? "signup server error",
        code: e?.code ?? null,
      },
      { status: 500 }
    );
  }
}
