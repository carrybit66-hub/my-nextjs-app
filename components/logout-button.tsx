"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

export function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/logout", { method: "POST" });

      if (!res.ok) {
        toast({ title: "ログアウトに失敗", description: `status: ${res.status}` });
        return;
      }

      toast({ title: "ログアウトしました" });

      // 認証状態が変わるので refresh してから遷移
      router.refresh();
      router.push("/login");
    } catch (e: any) {
      toast({ title: "ログアウトに失敗", description: e?.message ?? "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={onLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
