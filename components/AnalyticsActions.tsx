// components/AnalyticsActions.tsx
"use client";

export default function AnalyticsActions() {
  return (
    <>
      <button
        type="button"
        className="h-12 sm:h-10 px-4 rounded-md border border-emerald-200 bg-white text-emerald-700 text-sm font-medium hover:bg-emerald-50"
        onClick={() => alert("期間変更（仮）")}
      >
        期間変更
      </button>

      <button
        type="button"
        className="h-12 sm:h-10 px-4 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
        onClick={() => alert("エクスポート（仮）")}
      >
        エクスポート
      </button>
    </>
  );
}
