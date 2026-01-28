export default function DashboardPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>ダッシュボード</h1>
      <p style={{ marginTop: 12 }}>ログイン中です。</p>

      <form action="/api/logout" method="POST" style={{ marginTop: 24 }}>
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </form>
    </main>
  );
}
