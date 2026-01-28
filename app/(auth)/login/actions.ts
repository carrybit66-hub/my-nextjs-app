"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    throw new Error("メールアドレスとパスワードを入力してください");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("メールアドレスかパスワードが違います");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new Error("メールアドレスかパスワードが違います");
  }

  const cookieStore = await cookies();

  cookieStore.set("session", String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}
