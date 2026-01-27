import { ReactNode } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Sidebar } from "@/components/sidebar";
import { createSupabaseServer } from "@/lib/supabase-server";

type Profile = { role: string | null };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <>{children}</>;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  const role = profile?.role ?? "user";

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[14rem_1fr]">
        <Sidebar role={role} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
