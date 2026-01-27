// app/analytics/page.tsx
import PageLayout from "@/components/PageLayout";
import AnalyticsActions from "@/components/AnalyticsActions";
// エイリアス無しならこちらに差し替え:
// import PageLayout from "../../components/PageLayout";
// import AnalyticsActions from "../../components/AnalyticsActions";

export default function AnalyticsPage() {
  return (
    <PageLayout
      title="アナリティクス"
      description="利用状況・傾向を確認します"
      actions={<AnalyticsActions />}
    >
      {/* 既存の /analytics の中身をこの children にそのまま移植 */}
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">既存のグラフ/集計テーブルをここへ。</p>
        </div>
      </div>
    </PageLayout>
  );
}
