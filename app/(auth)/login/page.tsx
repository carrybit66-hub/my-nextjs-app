// app/(auth)/login/page.tsx
import { loginAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold">ログイン</h1>

        <form action={loginAction}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm">
              メールアドレス
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              data-testid="email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm">
              パスワード
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              data-testid="password"
              required
            />
          </div>

          <Button type="submit" className="w-full" data-testid="login-submit">
            ログイン
          </Button>
        </form>
      </div>
    </main>
  );
}
