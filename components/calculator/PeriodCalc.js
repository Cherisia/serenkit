'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

// ── 날짜 유틸 ────────────────────────────────────────────
const addDays = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const fmtDate = (date) =>
  date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })

const fmtShort = (date) =>
  date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })

const fmtMd = (date) => {
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${m}/${d}`
}

const diffDays = (a, b) => Math.round((b - a) / (1000 * 60 * 60 * 24))

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

// ── 계산 로직 ────────────────────────────────────────────
function calcCycle(lastDate, cycleLen, periodLen, cycles = 4) {
  const last   = new Date(lastDate)
  const cLen   = Number(cycleLen)
  const pLen   = Number(periodLen)
  const today  = new Date()
  today.setHours(0, 0, 0, 0)

  // 현재 사이클 기준 계산
  const ovulation   = addDays(last, cLen - 14)       // 배란일
  const fertileStart = addDays(ovulation, -5)         // 가임기 시작
  const fertileEnd   = addDays(ovulation, 1)          // 가임기 종료
  const pmsStart     = addDays(last, cLen - 7)        // PMS 시작 예상
  const nextPeriod   = addDays(last, cLen)            // 다음 생리 예정일
  const periodEnd    = addDays(nextPeriod, pLen - 1)  // 다음 생리 종료 예정

  // 다음 N개 사이클 예측
  const predictions = Array.from({ length: cycles }, (_, i) => {
    const start = addDays(last, cLen * (i + 1))
    const end   = addDays(start, pLen - 1)
    const ov    = addDays(start, cLen - 14)
    const fs    = addDays(ov, -5)
    const fe    = addDays(ov, 1)
    return { start, end, ovulation: ov, fertileStart: fs, fertileEnd: fe }
  })

  // D-day
  const dday = diffDays(today, nextPeriod)

  // 현재 상태 판단
  let status = null
  const inPeriod    = today >= last && today <= addDays(last, pLen - 1)
  const inFertile   = today >= fertileStart && today <= fertileEnd
  const isOvulation = diffDays(today, ovulation) === 0
  const inPms       = today >= pmsStart && today < nextPeriod
  if (isOvulation) status = { label: '오늘은 배란일이에요', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' }
  else if (inPeriod)  status = { label: '현재 생리 중이에요', color: 'text-pink-500',  bg: 'bg-pink-50',  border: 'border-pink-200' }
  else if (inFertile) status = { label: '현재 가임기예요',    color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' }
  else if (inPms)     status = { label: 'PMS 구간이에요',     color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-200' }

  return { ovulation, fertileStart, fertileEnd, pmsStart, nextPeriod, periodEnd, dday, status, predictions }
}

// ── 컴포넌트 ────────────────────────────────────────────
export default function PeriodCalc() {
  const todayStr = new Date().toISOString().slice(0, 10)

  const [lastDate,  setLastDate]  = useState('')
  const [cycleLen,  setCycleLen]  = useState('28')
  const [periodLen, setPeriodLen] = useState('5')
  const [result,    setResult]    = useState(null)

  const canCalc = lastDate && cycleLen && periodLen

  useEffect(() => {
    const p = readParams()
    if (p.lastDate) {
      const cl = p.cycleLen || '28', pl = p.periodLen || '5'
      setLastDate(p.lastDate); setCycleLen(cl); setPeriodLen(pl)
      setResult(calcCycle(p.lastDate, cl, pl))
    }
  }, [])

  const calculate = () => {
    if (!canCalc) return
    pushParams({ lastDate, cycleLen, periodLen })
    setResult(calcCycle(lastDate, cycleLen, periodLen))
  }

  const ddayColor = (d) => {
    if (d < 0)  return 'text-stone-400'
    if (d <= 3) return 'text-rose-500'
    if (d <= 7) return 'text-orange-400'
    return 'text-emerald-500'
  }

  return (
    <div className="space-y-4">

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-pink-400">생리 정보 입력</h2>

        <div className="space-y-4">
          {/* 마지막 생리 시작일 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              마지막 생리 시작일 <span className="text-red-400">*</span>
            </label>
            <input
              type="date" value={lastDate} max={todayStr}
              onChange={e => setLastDate(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-pink-400 transition-colors"
            />
          </div>

          {/* 생리 주기 / 생리 기간 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">
                생리 주기
              </label>
              <div className="relative">
                <select value={cycleLen} onChange={e => setCycleLen(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-pink-400 transition-colors appearance-none">
                  {Array.from({ length: 21 }, (_, i) => i + 21).map(n => (
                    <option key={n} value={n}>{n}일{n === 28 ? ' (평균)' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">
                생리 기간
              </label>
              <div className="relative">
                <select value={periodLen} onChange={e => setPeriodLen(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-pink-400 transition-colors appearance-none">
                  {Array.from({ length: 8 }, (_, i) => i + 2).map(n => (
                    <option key={n} value={n}>{n}일{n === 5 ? ' (평균)' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button onClick={calculate} disabled={!canCalc}
          className="w-full mt-5 bg-pink-400 hover:bg-pink-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <>
          {/* 현재 상태 배지 */}
          {result.status && (
            <div className={`${result.status.bg} ${result.status.border} border rounded-2xl px-5 py-4 flex items-center gap-3`}>
              <span className="text-xl">🌸</span>
              <span className={`text-sm font-black ${result.status.color}`}>{result.status.label}</span>
            </div>
          )}

          {/* 핵심 정보 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-rose-400">이번 사이클 예측</h2>

            {/* 다음 생리 D-day */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-5 text-center mb-4">
              <p className="text-xs text-stone-400 mb-1">다음 생리 예정일</p>
              <p className="text-2xl font-black text-pink-500 leading-tight">
                {fmtDate(result.nextPeriod)}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">{WEEKDAY[result.nextPeriod.getDay()]}요일</p>
              <p className={`text-xl font-black mt-2 ${ddayColor(result.dday)}`}>
                {result.dday === 0 ? 'D-day' : result.dday > 0 ? `D-${result.dday}` : `D+${Math.abs(result.dday)}`}
              </p>
            </div>

            {/* 상세 날짜 */}
            <table className="w-full">
              <tbody>
                {[
                  { icon: '🌸', label: '다음 생리',   value: `${fmtShort(result.nextPeriod)} ~ ${fmtShort(result.periodEnd)}`, sub: `${periodLen}일간`, color: 'text-pink-500' },
                  { icon: '🥚', label: '배란 예정일', value: fmtShort(result.ovulation),    sub: WEEKDAY[result.ovulation.getDay()] + '요일', color: 'text-rose-500' },
                  { icon: '💕', label: '가임기',      value: `${fmtShort(result.fertileStart)} ~ ${fmtShort(result.fertileEnd)}`, sub: '6일간', color: 'text-orange-500' },
                  { icon: '😔', label: 'PMS 예상',   value: `${fmtShort(result.pmsStart)} ~`, sub: '생리 7일 전부터', color: 'text-violet-400' },
                ].map(({ icon, label, value, sub, color }) => (
                  <tr key={label} className="border-b border-stone-100 last:border-none">
                    <td className="py-3 w-6 text-base">{icon}</td>
                    <td className="py-3 text-xs text-stone-400 w-20">{label}</td>
                    <td className="py-3 text-right">
                      <span className={`text-xs font-bold ${color}`}>{value}</span>
                      <span className="text-[10px] text-stone-300 ml-1.5">{sub}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 향후 예측 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-violet-400">향후 4개월 예측</h2>
            <div className="space-y-2">
              {result.predictions.map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3">
                  <span className="text-xs font-black text-stone-400 w-12 shrink-0">
                    {p.start.getMonth() + 1}월
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-pink-500">
                      🌸 {fmtMd(p.start)} ~ {fmtMd(p.end)}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      배란 {fmtMd(p.ovulation)} · 가임기 {fmtMd(p.fertileStart)}~{fmtMd(p.fertileEnd)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <aside className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준 안내</h3>
        <p>배란일은 다음 생리 예정일로부터 14일 전을 기준으로 계산합니다. 가임기는 배란일 5일 전 ~ 1일 후이며, 개인마다 실제 주기가 다를 수 있어요. 이 계산기는 참고용이며 정확한 배란일은 기초체온·배란 테스트기로 확인하세요.</p>
      </aside>

    </div>
  )
}
