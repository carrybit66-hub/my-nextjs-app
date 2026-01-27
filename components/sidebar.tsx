"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();

  const items: { href: string; label: string; adminOnly?: boolean }[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/tasks", label: "Tasks" },
    { href: "/admin", label: "Admin", adminOnly: true },
  ];

  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <nav className="rounded-lg border bg-card p-2 shadow-sm">
        <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
          MENU
        </div>

        <ul className="space-y-1">
          {items
            .filter((i) => !i.adminOnly || role === "admin")
            .map((i) => {
              const active = pathname === i.href;

              return (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm hover:bg-accent",
                      active && "bg-accent font-semibold"
                    )}
                  >
                    {i.label}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </aside>
  );
}
