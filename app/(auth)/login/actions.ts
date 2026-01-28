// app/(auth)/login/actions.ts
"use server";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("login called:", { email, password });

  // とりあえずダミーでもOK（E2E通す目的なら）
}
