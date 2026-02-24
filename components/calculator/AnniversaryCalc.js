'use client'
import { useState } from 'react'

const DOW = ['일','월','화','수','목','금','토']
const DAY_MARKS  = [100, 200, 300, 365, 500, 700, 1000]
const YEAR_MARKS = [1, 2, 3, 5, 10, 20, 25, 50]

function fmt(d) {
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${DOW[d.getDay()]})`
}
function dday(d) {
  const today = new Date(); today.setHours(0,0,0,0)
  const target = new Date(d); target.setHours(0,0,0,0)
  const diff = Math.round((target - today) / 86400000)
  if (diff === 0) return '🎉 오늘!'
  return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`
}

export default function AnniversaryCalc() {
  const [start,  setStart]  = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!start) return
    const s = new Date(start)
    const dayResults  = DAY_MARKS.map((n) => {
      const d = new Date(s); d.setDate(d.getDate() + n - 1)
      return { label: `${n}일`, date: d }
    })
    const yearResults = YEAR_MARKS.map((n) => {
      const d = new Date(s); d.setFullYear(d.getFullYear() + n)
      return { label: `${n}주년`, date: d }
    })
    setResult({ dayResults, yearResults })
  }

  function Row({ label, date }) {
    const dd = dday(date)
    const isToday = dd === '🎉 오늘!'
    const isPast  = dd.startsWith('D+')
    return (
      <div className={`flex items-center justify-between py-3 border-b border-stone-100 last:border-none ${isToday ? 'bg-amber-50 -mx-6 px-6' : ''}`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-black min-w-[56px] ${isToday ? 'text-amber-500' : isPast ? 'text-stone-300' : 'text-stone-700'}`}>{label}</span>
          <span className={`text-xs ${isPast && !isToday ? 'text-stone-300' : 'text-stone-500'}`}>{fmt(date)}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full
          ${isToday ? 'bg-amber-400 text-white' : isPast ? 'bg-stone-100 text-stone-300' : 'bg-amber-100 text-amber-600'}`}>
          {dd}
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">기준 날짜 입력</h2>
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1.5">처음 만난 날 / 시작일 <span className="text-red-400">*</span></label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
        </div>
        <button onClick={calculate} disabled={!start}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          기념일 계산하기
        </button>
      </section>

      {result && (
        <>
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-orange-400">📅 일수 기념일</h2>
            {result.dayResults.map((r) => <Row key={r.label} {...r} />)}
          </section>
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-yellow-400">🎊 주년 기념일</h2>
            {result.yearResults.map((r) => <Row key={r.label} {...r} />)}
          </section>
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 기념일 계산 활용</h3>
        <p>연인의 100일·200일·1주년 기념일을 미리 확인하세요. 오늘 이전 기념일은 D+, 앞으로 남은 기념일은 D-로 표시됩니다.</p>
      </aside>
    </div>
  )
}
