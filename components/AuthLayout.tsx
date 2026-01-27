// components/AuthLayout.tsx
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthLayout({ title, description, children, footer }: Props) {
  return (
    <div className="min-h-dvh bg-white">
      {/* ここは将来 dark 対応で bg を差し替えやすい */}
      <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
              S
            </span>
            <span>Sample SaaS</span>
          </Link>
          <div className="text-xs text-emerald-700/80">Secure access</div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
        {/* 左：説明 */}
        <section className="hidden lg:flex lg:flex-col lg:justify-center">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-950">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-900/70">{description}</p>
          ) : null}

          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <p className="text-sm font-medium text-emerald-900">業務アプリらしいポイント</p>
            <ul className="mt-3 space-y-2 text-sm text-emerald-900/70">
              <li>• 権限管理 / 監査ログ / 共有</li>
              <li>• ダッシュボード / レポート</li>
              <li>• 招待フロー / 管理画面</li>
            </ul>
          </div>
        </section>

        {/* 右：フォーム */}
        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="lg:hidden">
              <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">{title}</h1>
              {description ? (
                <p className="mt-2 text-sm text-emerald-900/70">{description}</p>
              ) : null}
              <div className="mt-6 border-t border-emerald-100" />
            </div>

            <div className="pt-6 lg:pt-0">{children}</div>

            {footer ? <div className="mt-6 border-t border-emerald-100 pt-6">{footer}</div> : null}
          </div>
        </section>
      </main>
    </div>
  );
}
