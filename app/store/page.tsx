"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // 商品取得
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at')
    setProducts(data ?? [])
  }

  // 商品追加
  const addProduct = async () => {
    if (!name || !price) return

    await supabase.from('products').insert({
      name,
      price: Number(price),
    })

    setName('')
    setPrice('')
    fetchProducts()
  }

  // 売上追加（ワンクリック）
  const addSale = async (product: Product) => {
    await supabase.from('orders').insert({
      product_id: product.id,
      price: product.price,
    })

    setCart([...cart, product])
  }

  const total = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">

        <h1 className="text-2xl font-bold">店舗 売上管理</h1>

        {/* 商品一覧 */}
        <section>
          <h2 className="font-semibold mb-2">商品一覧（クリックで売上追加）</h2>
          <div className="space-y-2">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => addSale(p)}
                className="w-full bg-black text-white py-2 rounded"
              >
                {p.name} ¥{p.price}
              </button>
            ))}
          </div>
        </section>

        {/* 今日の売上 */}
        <section>
          <h2 className="font-semibold">今日の売上</h2>
          <p className="text-lg">合計: ¥{total}</p>
          <ul className="text-sm text-gray-600">
            {cart.map((c, i) => (
              <li key={i}>{c.name} ¥{c.price}</li>
            ))}
          </ul>
        </section>

        {/* 商品追加 */}
        <section className="border-t pt-4 space-y-2">
          <h2 className="font-semibold">商品を追加</h2>

          <input
            placeholder="商品名"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="価格"
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
            className="border p-2 w-full rounded"
          />

          <button
            onClick={addProduct}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            商品を追加
          </button>
        </section>

      </div>
    </main>
  )
}

