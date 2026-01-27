// components/app/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  exact?: boolean;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", exact: true },
  { label: "Reports", href: "/reports" },
  { label: "Sales", href: "/sales" },
  { label: "Store", href: "/store" },
  { label: "Invites", href: "/admin/invites" }
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      <div className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-emerald-900/50">
        Navigation
      </div>

      {NAV.map((item) => {
        const active = isActive(pathname, item);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={[
              "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
              active
                ? "bg-emerald-50 text-emerald-900 ring-1 ring-inset ring-emerald-100"
                : "text-emerald-900/70 hover:bg-emerald-50 hover:text-emerald-900",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            ].join(" ")}
          >
            <span
              className={[
                "inline-flex h-8 w-8 items-center justify-center rounded-xl",
                active ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-900"
              ].join(" ")}
            >
              <span className="h-2 w-2 rounded-full bg-current opacity-80" />
            </span>

            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
