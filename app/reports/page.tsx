// app/reports/page.tsx
import PageLayout from "@/components/PageLayout";
import ReportsActions from "@/components/ReportsActions";
// エイリアス無しならこちらに差し替え:
// import PageLayout from "../../components/PageLayout";
// import ReportsActions from "../../components/ReportsActions";

export default function ReportsPage() {
  return (
    <PageLayout
      title="レポート"
      description="集計・出力・共有などを行います"
      actions={<ReportsActions />}
    >
      {/* 既存の /reports の中身をこの children にそのまま移植 */}
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">既存のフォーム/テーブルをここへ。</p>
        </div>
      </div>
    </PageLayout>
  );
}
