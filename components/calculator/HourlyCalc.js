'use client'
import { useState } from 'react'
import { INPUT_CLS } from '@/lib/constants'

// 연도별 최저시급
const MIN_WAGE = { 2024: 9860, 2025: 10030, 2026: 10320 }
const MIN_WAGE_YEAR = 2026
const MIN_WAGE_NOW = MIN_WAGE[MIN_WAGE_YEAR]

// 주휴시간 계산 (주당): 주 15시간 이상일 때 발생
// 공식: 주 소정근로시간 / 40 × 8 (최대 8시간)
function weeklyHolidayHours(weeklyHours) {
  if (weeklyHours < 15) return 0
  return Math.min(8, weeklyHours / 5)
}

function calcHourly({ hourlyWage, hoursPerDay, daysPerWeek }) {
  const weeklyHours = hoursPerDay * daysPerWeek
  const holidayHours = weeklyHolidayHours(weeklyHours)
  const hasHoliday = weeklyHours >= 15

  // 월 환산 계수: 365일 / 7일 / 12개월 ≈ 4.3452
  const WEEKS_PER_MONTH = 365 / 7 / 12

  const dailyPay       = Math.floor(hourlyWage * hoursPerDay)
  const weeklyWorked   = hourlyWage * weeklyHours
  const weeklyHolidayPay = Math.floor(hourlyWage * holidayHours)
  const weeklyPay      = Math.floor(weeklyWorked + weeklyHolidayPay)

  const monthlyHours   = Math.round((weeklyHours + holidayHours) * WEEKS_PER_MONTH)
  const monthlyPay     = Math.floor(hourlyWage * monthlyHours)
  const annualPay      = monthlyPay * 12

  return {
    weeklyHours,
    holidayHours,
    hasHoliday,
    dailyPay,
    weeklyPay,
    weeklyHolidayPay,
    monthlyHours,
    monthlyPay,
    annualPay,
    meetsMinWage: hourlyWage >= MIN_WAGE_NOW,
  }
}

const fmt  = (n) => Math.floor(n).toLocaleString('ko-KR') + '원'

export default function HourlyCalc() {
  const [hourlyWage,  setHourlyWage]  = useState(String(MIN_WAGE_NOW))
  const [hoursPerDay, setHoursPerDay] = useState('8')
  const [daysPerWeek, setDaysPerWeek] = useState('5')
  const [result,      setResult]      = useState(null)
  const [error,       setError]       = useState('')

  const calculate = () => {
    setError('')
    setResult(null)
    const wage = Number(hourlyWage)
    if (!hourlyWage || wage <= 0) { setError('시급을 입력해주세요.'); return }
    if (wage < 1000) { setError('시급이 너무 낮아요. 단위를 확인해주세요.'); return }

    setResult(calcHourly({
      hourlyWage:  wage,
      hoursPerDay: Number(hoursPerDay),
      daysPerWeek: Number(daysPerWeek),
    }))
  }

  return (
    <div className="space-y-4">

      {/* 2026 최저시급 안내 */}
      <section className="bg-green-50 border border-green-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-green-700 mb-2">💡 2026년 최저시급 안내</h3>
        <ul className="space-y-1">
          <li>→ 2026년 최저시급 <span className="font-bold text-stone-700">{MIN_WAGE_NOW.toLocaleString('ko-KR')}원</span>/시간</li>
          <li>→ 주 40시간(5일) 기준 월 환산: <span className="font-bold text-stone-700">{Math.floor(MIN_WAGE_NOW * 209).toLocaleString('ko-KR')}원</span> (209시간)</li>
          <li>→ 주 15시간 이상 근무 시 주휴수당 추가 발생</li>
        </ul>
      </section>

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">근무 조건 입력</h2>

        <div className="space-y-4">

          {/* 시급 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-600">
                시급 <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setHourlyWage(String(MIN_WAGE_NOW))}
                className="text-[11px] font-bold text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 px-2 py-0.5 rounded-lg transition-colors"
              >
                2026 최저시급 적용
              </button>
            </div>
            <div className="relative">
              <input type="number" value={hourlyWage} onChange={e => setHourlyWage(e.target.value)}
                placeholder={`예) ${MIN_WAGE_NOW}`} min="1000" className={`${INPUT_CLS} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">원</span>
            </div>
            {hourlyWage && Number(hourlyWage) > 0 && (
              <p className="mt-1 text-xs font-bold">
                {Number(hourlyWage) >= MIN_WAGE_NOW
                  ? <span className="text-green-600">✓ 최저시급 이상</span>
                  : <span className="text-red-500">⚠ 최저시급({MIN_WAGE_NOW.toLocaleString()}원) 미달</span>
                }
              </p>
            )}
          </div>

          {/* 1일 근무시간 + 주 근무일수 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">1일 근무시간</label>
              <select value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} className={INPUT_CLS}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(h => (
                  <option key={h} value={h}>{h}시간</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">주 근무일수</label>
              <select value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)} className={INPUT_CLS}>
                {[1,2,3,4,5,6].map(d => (
                  <option key={d} value={d}>{d}일</option>
                ))}
              </select>
            </div>
          </div>

          {/* 주 근무시간 미리보기 */}
          {hourlyWage && (
            <div className="bg-stone-50 rounded-xl px-4 py-2.5 text-xs text-stone-500">
              주 <span className="font-bold text-stone-700">{Number(hoursPerDay) * Number(daysPerWeek)}시간</span> 근무
              {Number(hoursPerDay) * Number(daysPerWeek) >= 15
                ? <span className="ml-2 text-green-600 font-bold">→ 주휴수당 발생</span>
                : <span className="ml-2 text-stone-400">→ 주 15시간 미만, 주휴수당 없음</span>
              }
            </div>
          )}
        </div>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button onClick={calculate} disabled={!hourlyWage}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          시급 계산하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-green-400">계산 결과</h2>

          {/* 최저시급 미달 경고 */}
          {!result.meetsMinWage && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
              ⚠ 입력한 시급이 {MIN_WAGE_YEAR}년 최저시급({MIN_WAGE_NOW.toLocaleString()}원)보다 낮아요. 최저임금법 위반에 해당할 수 있어요.
            </div>
          )}

          {/* 메인 결과 */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-5 text-white text-center mb-4">
            <p className="text-xs opacity-75 mb-1">예상 월급</p>
            <p className="text-3xl font-black leading-tight">
              {Math.floor(result.monthlyPay / 10000).toLocaleString()}
              <span className="text-xl">만원</span>
            </p>
            <p className="text-sm opacity-80 mt-1">{fmt(result.monthlyPay)}</p>
            <p className="text-xs opacity-60 mt-1">월 {result.monthlyHours}시간 기준</p>
          </div>

          {/* 상세 테이블 */}
          <table className="w-full">
            <tbody>
              {[
                ['일급',  fmt(result.dailyPay),   'text-stone-700'],
                ['주급',  fmt(result.weeklyPay),   'text-stone-700'],
                ...(result.hasHoliday ? [['└ 주휴수당', fmt(result.weeklyHolidayPay), 'text-stone-400']] : []),
                ['월급',  fmt(result.monthlyPay),  'text-amber-600'],
                ['연봉',  fmt(result.annualPay),   'text-stone-700'],
              ].map(([k, v, cls]) => (
                <tr key={k} className="border-b border-stone-100 last:border-none">
                  <td className="py-2.5 text-xs text-stone-400">{k}</td>
                  <td className={`py-2.5 text-right text-xs font-bold ${cls}`}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 주휴수당 안내 */}
          {result.hasHoliday && (
            <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-xs text-stone-500">
              <span className="font-bold text-stone-600">주휴수당 </span>
              주 {result.weeklyHours}시간 근무 → 주휴시간 {result.holidayHours.toFixed(1)}시간
              → 주휴수당 {fmt(result.weeklyHolidayPay)}/주
            </div>
          )}

          {/* 계산식 */}
          <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-stone-500">
            <span className="font-bold text-stone-600">월급 계산식 </span>
            {Number(hourlyWage).toLocaleString('ko-KR')}원 × {result.monthlyHours}시간 = <span className="font-bold text-amber-600">{fmt(result.monthlyPay)}</span>
          </div>

          <p className="mt-3 text-[10px] text-stone-400 text-center">
            {MIN_WAGE_YEAR}년 최저시급 {MIN_WAGE_NOW.toLocaleString()}원 기준 · 세전 금액이며 실수령액은 4대보험·소득세 공제 후 달라질 수 있어요
          </p>
        </section>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 시급 계산 기준</h3>
        <p>월급은 주 소정근로시간과 주휴시간을 합산한 월 환산 시간(365일÷7÷12 × 주 총 시간)에 시급을 곱해 계산해요. 주 15시간 이상 근무 시 주휴수당(1주 소정근로시간÷40×8×시급)이 포함돼요. 세전 금액이며 실수령액은 4대보험·소득세 공제 후 다를 수 있어요.</p>
      </aside>
    </div>
  )
}
