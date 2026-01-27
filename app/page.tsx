import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#00A86B]">
  CARRY BIT 売上管理
</h1>
          <p className="text-gray-500">掲載店・管理者ポータル</p>
        </div>

       <div className="space-y-3">
  <Link href="/store" className="block w-full bg-black text-white py-3 rounded-lg text-center">
    店舗ログイン
  </Link>

  <Link href="/admin" className="block w-full border border-gray-300 py-3 rounded-lg text-center">
    管理者ログイン
  </Link>

  <Link href="/sales" className="block w-full bg-gray-200 py-3 rounded-lg text-center">
    売上確認（テスト）
  </Link>
</div>
      </div>
    </main>
  );
}
