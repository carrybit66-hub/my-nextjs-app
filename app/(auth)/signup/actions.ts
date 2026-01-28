// app/(auth)/signup/actions.ts
"use server";

import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) return;

  // TODO: Supabase sign up をここに実装
  // await supabase.auth.signUp({ email, password })

  redirect("/dashboard");
}
