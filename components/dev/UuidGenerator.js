'use client'
import { useState } from 'react'

const COUNT_OPTIONS = [1, 5, 10]

function generateUuids(count) {
  return Array.from({ length: count }, () => crypto.randomUUID())
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState([])
  const [copiedIdx, setCopiedIdx] = useState(null)
  const [copiedAll, setCopiedAll] = useState(false)

  function generate() {
    setUuids(generateUuids(count))
    setCopiedIdx(null)
    setCopiedAll(false)
  }

  function copyOne(idx) {
    navigator.clipboard.writeText(uuids[idx]).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    })
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n')).then(() => {
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    })
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">생성 설정</h2>
        <label className="block text-xs font-bold text-slate-500 mb-2">생성 개수</label>
        <div className="flex gap-2 mb-5">
          {COUNT_OPTIONS.map(n => (
            <button key={n} onClick={() => setCount(n)}
              className={`flex-1 py-2.5 text-sm font-black rounded-xl border transition-colors ${count === n ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}>
              {n}개
            </button>
          ))}
        </div>
        <button onClick={generate}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          UUID 생성하기
        </button>
      </section>

      {uuids.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-black text-slate-800">생성된 UUID</h2>
            <div className="flex gap-2">
              <button onClick={generate}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
                새로 생성
              </button>
              {uuids.length > 1 && (
                <button onClick={copyAll}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-200">
                  {copiedAll ? '복사됨 ✓' : '전체 복사'}
                </button>
              )}
            </div>
          </div>
          <ul className="space-y-2">
            {uuids.map((uuid, i) => (
              <li key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 group">
                <span className="flex-1 text-sm font-mono text-slate-700 break-all">{uuid}</span>
                <button onClick={() => copyOne(i)}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-white text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors border border-slate-200 hover:border-indigo-200">
                  {copiedIdx === i ? '✓' : '복사'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
        <h3 className="font-bold text-slate-600 mb-1.5">💡 UUID v4란?</h3>
        <ul className="space-y-1">
          <li>· Universally Unique Identifier — 전역적으로 고유한 128비트 식별자입니다</li>
          <li>· v4는 암호학적으로 안전한 난수(crypto.randomUUID)로 생성됩니다</li>
          <li>· 형식: 8-4-4-4-12 자리 (16진수, 하이픈 구분)</li>
          <li>· 데이터베이스 기본키, API 요청 ID, 세션 토큰 등에 활용됩니다</li>
          <li>· 같은 UUID가 생성될 확률은 천문학적으로 낮습니다</li>
        </ul>
      </aside>
    </div>
  )
}
