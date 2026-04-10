'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

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

function calcResult(startDate) {
  const s = new Date(startDate); s.setHours(0,0,0,0)
  const today = new Date(); today.setHours(0,0,0,0)

  // 시작일을 1일로 기산
  const daysElapsed = Math.round((today - s) / 86400000) + 1

  const dayResults  = DAY_MARKS.map(n => { const d = new Date(s); d.setDate(d.getDate() + n - 1); return { label: `${n}일`, date: d } })
  const yearResults = YEAR_MARKS.map(n => { const d = new Date(s); d.setFullYear(d.getFullYear() + n); return { label: `${n}주년`, date: d } })

  // 다음 기념일 (오늘 이후 가장 가까운 것)
  const upcoming = [...dayResults, ...yearResults]
    .filter(r => { const t = new Date(r.date); t.setHours(0,0,0,0); return t >= today })
    .sort((a, b) => a.date - b.date)[0] ?? null

  return { dayResults, yearResults, daysElapsed, upcoming }
}

export default function AnniversaryCalc() {
  const [start,  setStart]  = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const p = readParams()
    if (p.start) {
      setStart(p.start)
      setResult(calcResult(p.start))
    }
  }, [])

  const calculate = () => {
    if (!start) return
    pushParams({ start })
    setResult(calcResult(start))
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
          {/* 오늘 기준 경과 일수 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">오늘 기준</h2>

            {result.daysElapsed > 0 ? (
              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">처음 만난 지 오늘까지</p>
                <p className="text-4xl font-black">{result.daysElapsed.toLocaleString('ko-KR')}일째</p>
                {result.upcoming && (
                  <p className="text-sm opacity-90 mt-2.5">
                    다음 기념일: <span className="font-black">{result.upcoming.label}</span> ({dday(result.upcoming.date)})
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">시작일까지</p>
                <p className="text-3xl font-black">D-{Math.abs(result.daysElapsed - 1)}</p>
              </div>
            )}
          </section>

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
        <h3 className="font-bold text-stone-600 mb-1.5">💡 기념일 계산 기준</h3>
        <p>처음 만난 날(시작일)을 <strong className="text-stone-600">1일</strong>로 기산합니다. 예를 들어 1월 1일 시작 시 1월 1일이 1일째, 4월 10일이 100일째입니다. 오늘 이전 기념일은 D+, 앞으로 남은 기념일은 D-로 표시됩니다.</p>
      </aside>
    </div>
  )
}
