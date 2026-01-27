import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin</CardTitle>
        <CardDescription>admin ロールのみ閲覧可能</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ここに管理画面（ユーザー管理 / 設定 / 監査ログなど）を追加していく想定です。
        </p>
      </CardContent>
    </Card>
  );
}
