// components/app/AppShell.tsx
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64">
        <Sidebar />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-emerald-100 bg-white/80 px-4 backdrop-blur lg:hidden">
        <MobileSidebar />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-emerald-950">Sample SaaS</div>
          <div className="truncate text-xs text-emerald-900/60">Workspace</div>
        </div>
      </header>

      {/* Main */}
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
