'use client'
import { useState } from 'react'

const HOLIDAYS = new Set([
  '2025-01-01','2025-01-28','2025-01-29','2025-01-30',
  '2025-03-01','2025-05-05','2025-05-06','2025-06-06',
  '2025-08-15','2025-10-03','2025-10-05','2025-10-06','2025-10-07','2025-10-09',
  '2025-12-25',
  '2026-01-01','2026-02-17','2026-02-18','2026-02-19',
  '2026-03-01','2026-05-05','2026-06-06','2026-08-17',
  '2026-09-24','2026-09-25','2026-09-26','2026-10-09','2026-12-25',
])

function toStr(d) { return d.toISOString().split('T')[0] }

export default function BusinessDaysCalc() {
  const [start,  setStart]  = useState(toStr(new Date()))
  const [end,    setEnd]    = useState('')
  const [exHol,  setExHol]  = useState(true)
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!start || !end) return
    const s = new Date(start), e = new Date(end)
    if (s > e) return
    let work = 0, weekend = 0, holiday = 0
    const cur = new Date(s)
    while (cur <= e) {
      const dow = cur.getDay()
      const str = toStr(cur)
      if (dow === 0 || dow === 6) { weekend++ }
      else if (exHol && HOLIDAYS.has(str)) { holiday++ }
      else { work++ }
      cur.setDate(cur.getDate() + 1)
    }
    const total = Math.round((e - s) / 86400000) + 1
    setResult({ work, weekend, holiday, total })
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">계산 조건 입력</h2>
        <div className="space-y-4">
          {[['시작일', start, setStart],['종료일', end, setEnd]].map(([lbl,val,set]) => (
            <div key={lbl}>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">{lbl} <span className="text-red-400">*</span></label>
              <input type="date" value={val} onChange={(e) => set(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
            </div>
          ))}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-600">
            <input type="checkbox" checked={exHol} onChange={(e) => setExHol(e.target.checked)} className="w-4 h-4 accent-amber-500" />
            한국 공휴일 제외 (2025~2026 기준)
          </label>
        </div>
        <button onClick={calculate} disabled={!start || !end}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 text-center mb-4">
            <p className="text-xs text-stone-400 mb-1">영업일 수</p>
            <p className="text-5xl font-black text-amber-500">{result.work}일</p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['전체 기간', `${result.total}일`],
                ['영업일', `${result.work}일`],
                ['주말', `${result.weekend}일`],
                ...(exHol ? [['공휴일', `${result.holiday}일`]] : []),
              ].map(([k,v]) => (
                <tr key={k} className="border-b border-stone-100 last:border-none">
                  <td className="py-2.5 text-xs text-stone-400">{k}</td>
                  <td className="py-2.5 text-right text-xs font-bold text-stone-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 영업일이란?</h3>
        <p>토·일요일과 공휴일을 제외한 실제 근무 가능한 날입니다. 계약서 납기일, 배송일, 행정 처리 기한 계산 시 활용하세요.</p>
      </aside>
    </div>
  )
}
