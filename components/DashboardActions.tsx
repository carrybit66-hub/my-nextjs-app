// components/DashboardActions.tsx
"use client";

export default function DashboardActions() {
  return (
    <>
      <button
        type="button"
        className="h-12 sm:h-10 px-4 rounded-md border border-emerald-200 bg-white text-emerald-700 text-sm font-medium hover:bg-emerald-50"
        onClick={() => alert("更新（仮）")}
      >
        更新
      </button>

      <button
        type="button"
        className="h-12 sm:h-10 px-4 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
        onClick={() => alert("新規作成（仮）")}
      >
        新規作成
      </button>
    </>
  );
}
