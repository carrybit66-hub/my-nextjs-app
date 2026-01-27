import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="rounded-md border bg-white p-4">
        <p className="text-sm text-gray-600">Go to feature pages:</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/dashboard/tasks"
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Tasks
          </Link>

          <Link
            href="/admin"
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
