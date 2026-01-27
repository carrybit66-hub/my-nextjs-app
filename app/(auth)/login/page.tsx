"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace(next);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border border-border bg-bg p-6 rounded-lg">
        <h1 className="text-xl font-bold text-fg">ログイン</h1>

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
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded bg-emerald-600 text-white py-2 disabled:opacity-60"
        >
          {loading ? "処理中..." : "ログイン"}
        </button>

        <button
          type="button"
          className="w-full rounded border border-border py-2 text-fg"
          onClick={() => router.push("/signup")}
        >
          新規作成へ
        </button>
      </form>
    </div>
  );
}
