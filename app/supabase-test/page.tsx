'use client'

import { useEffect, useState } from 'react'
import { supabase } from ''

export default function SupabaseTest() {
  const [status, setStatus] = useState('接続中...')

  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from('stores').select('*')

if (error) {
  setStatus('エラー: ' + error.message)
} else if (!data || data.length === 0) {
  setStatus('接続OK。でもデータはまだ空です')
} else {
  setStatus(`接続成功！店舗数: ${data.length}`)
}
    }
    test()
  }, [])

  return (
    <div className="p-10 text-xl">
      {status}
    </div>
  )
}
