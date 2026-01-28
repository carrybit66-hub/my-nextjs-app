"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/src/lib/supabase";


type Row = {
  order_id: string;
  store_name: string;
  ordered_at: string;
  product_name: string;
  qty: number;
  unit_price: number;
  status: string;
};

const FEE_RATE = 0.1; // 手数料10%（あとで変更OK）

export default function SalesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      setError("");

      const { data, error } = await supabase
        .from("order_items")
        .select(
          `
          qty,
          unit_price,
          orders:order_id (
            id,
            ordered_at,
            status,
            stores:store_id ( name )
          ),
          products:product_id ( name )
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      const flat: Row[] = (data ?? []).map((x: any) => ({
        order_id: x.orders?.id ?? "",
        store_name: x.orders?.stores?.name ?? "",
        ordered_at: x.orders?.ordered_at ?? "",
        product_name: x.products?.name ?? "",
        qty: Number(x.qty ?? 0),
        unit_price: Number(x.unit_price ?? 0),
        status: x.orders?.status ?? "",
      }));

      setRows(flat);
    };

    load();
  }, []);

  const totals = useMemo(() => {
    const sumSubtotal = rows.reduce((acc, r) => acc + r.qty * r.unit_price, 0);
    const sumFee = Math.round(sumSubtotal * FEE_RATE);
    const sumPayout = sumSubtotal - sumFee;
    return { sumSubtotal, sumFee, sumPayout };
  }, [rows]);

  const yen = (n: number) => n.toLocaleString("ja-JP");

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">売上一覧</h1>
          <p className="text-gray-700">Supabaseの本データを表示しています。</p>
          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded">
              エラー: {error}
            </p>
          )}
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-700">小計（商品合計）</div>
            <div className="text-2xl font-bold">¥{yen(totals.sumSubtotal)}</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-700">手数料合計</div>
            <div className="text-2xl font-bold">¥{yen(totals.sumFee)}</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-700">振込対象合計</div>
            <div className="text-2xl font-bold">¥{yen(totals.sumPayout)}</div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-semibold">注文明細</div>
            <div className="text-sm text-gray-700">件数：{rows.length}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-900">
                <tr className="text-left">
                  <th className="p-3 whitespace-nowrap">注文ID</th>
                  <th className="p-3 whitespace-nowrap">店舗</th>
                  <th className="p-3 whitespace-nowrap">日時</th>
                  <th className="p-3 whitespace-nowrap">商品</th>
                  <th className="p-3 whitespace-nowrap">数量</th>
                  <th className="p-3 whitespace-nowrap">単価</th>
                  <th className="p-3 whitespace-nowrap">小計</th>
                  <th className="p-3 whitespace-nowrap">手数料</th>
                  <th className="p-3 whitespace-nowrap">振込額</th>
                  <th className="p-3 whitespace-nowrap">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const sub = r.qty * r.unit_price;
                  const fee = Math.round(sub * FEE_RATE);
                  const pay = sub - fee;

                  return (
                    <tr key={`${r.order_id}-${i}`} className="border-t">
                      <td className="p-3 text-gray-900">{r.order_id.slice(0, 8)}</td>
                      <td className="p-3 text-gray-900">{r.store_name}</td>
                      <td className="p-3 text-gray-900">
                        {r.ordered_at ? new Date(r.ordered_at).toLocaleString("ja-JP") : ""}
                      </td>
                      <td className="p-3 text-gray-900">{r.product_name}</td>
                      <td className="p-3 text-gray-900">{r.qty}</td>
                      <td className="p-3 text-gray-900">¥{yen(r.unit_price)}</td>
                      <td className="p-3 text-gray-900">¥{yen(sub)}</td>
                      <td className="p-3 text-gray-900">¥{yen(fee)}</td>
                      <td className="p-3 text-gray-900">¥{yen(pay)}</td>
                      <td className="p-3">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                            r.status === "未振込"
                              ? "bg-red-100 text-red-700"
                              : r.status === "振込申請中"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-700",
                          ].join(" ")}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {rows.length === 0 && !error && (
                  <tr>
                    <td className="p-6 text-gray-700" colSpan={10}>
                      データがありません（Supabaseにテストデータを入れると表示されます）
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
