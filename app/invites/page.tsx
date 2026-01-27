// app/admin/invites/page.tsx
import PageLayout from "@/components/PageLayout";
import InvitesActions from "@/components/InvitesActions";
// エイリアス無しならこちらに差し替え:
// import PageLayout from "../../../components/PageLayout";
// import InvitesActions from "../../../components/InvitesActions";

export default function AdminInvitesPage() {
  return (
    <PageLayout
      title="招待管理"
      description="メンバー招待の作成・一覧・無効化を行います"
      actions={<InvitesActions />}
    >
      {/* 既存の /admin/invites の中身をこの children にそのまま移植 */}
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">既存の招待一覧/フォームをここへ。</p>
        </div>
      </div>
    </PageLayout>
  );
}
