// components/app/Sidebar.tsx
import Link from "next/link";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <div className="flex w-full flex-col border-r border-emerald-100 bg-white">
      <div className="flex h-14 items-center gap-2 border-b border-emerald-100 px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white">
            S
          </span>
          <span className="text-sm font-semibold text-emerald-950">Sample SaaS</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarNav />
      </div>

      <div className="border-t border-emerald-100 p-3">
        <div className="rounded-2xl bg-emerald-50 p-3">
          <div className="text-xs font-medium text-emerald-900">Signed in</div>
          <div className="mt-1 text-xs text-emerald-900/70">User menu placeholder</div>
        </div>
      </div>
    </div>
  );
}
