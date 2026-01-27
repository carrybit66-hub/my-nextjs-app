// components/InvitesActions.tsx
"use client";

export default function InvitesActions() {
  return (
    <button
      type="button"
      className="h-12 sm:h-10 px-4 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
      onClick={() => alert("招待作成（仮）")}
    >
      招待を作成
    </button>
  );
}
