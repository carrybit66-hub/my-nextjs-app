import { createSupabaseServer } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";

type Profile = {
  display_name: string | null;
  role: "user" | "admin" | string;
};

export async function DashboardHeader() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  const displayName = profile?.display_name ?? user.email ?? "User";
  const role = profile?.role ?? "user";

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Dashboard</span>
          <span className="text-xs text-muted-foreground">
            {displayName} / {user.email} / role: {role}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
