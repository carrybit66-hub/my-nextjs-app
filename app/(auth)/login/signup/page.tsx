"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // 設定によってはメール確認が必要
    router.replace("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border border-border bg-bg p-6 rounded-lg">
        <h1 className="text-xl font-bold text-fg">新規作成</h1>

        <div className="space-y-2">
          <label className="text-sm text-muted">Email</label>
          <input
            className="w-full border border-border rounded px-3 py-2 bg-bg text-fg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted">Password</label>
          <input
            className="w-full border border-border rounded px-3 py-2 bg-bg text-fg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
        >
          {loading ? "処理中..." : "作成する"}
        </button>

        <button
          type="button"
          className="w-full rounded border border-border py-2 text-fg"
          onClick={() => router.push("/login")}
        >
          ログインへ
        </button>
      </form>
    </div>
  );
}
