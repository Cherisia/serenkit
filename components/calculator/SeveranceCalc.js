'use client'
import { useState } from 'react'
import { INPUT_CLS } from '@/lib/constants'

// 퇴직금 계산 (근로기준법 제34조)
// 퇴직금 = 1일 평균임금 × 30일 × (재직일수 / 365)
// 1일 평균임금 = 퇴직 전 3개월 임금 총액 / 퇴직 전 3개월 총 일수
function calcSeverance({ startDate, endDate, monthlyWage, annualBonus, annualLeave }) {
  const start = new Date(startDate)
  const end   = new Date(endDate)

  // 재직일수 (퇴직일 포함)
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1

  // 퇴직 전 3개월 일수 (달력 기준)
  const threeMonthsAgo = new Date(end)
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  const threeMonthDays = Math.floor((end - threeMonthsAgo) / (1000 * 60 * 60 * 24)) + 1

  // 3개월 임금 총액 = 월급×3 + 상여금×(3/12) + 연차수당×(3/12)
  const bonus3m       = (annualBonus  / 12) * 3
  const leave3m       = (annualLeave  / 12) * 3
  const threeMonthWage = monthlyWage * 3 + bonus3m + leave3m

  // 1일 평균임금
  const dailyAvgWage = threeMonthWage / threeMonthDays

  // 퇴직금
  const severancePay = Math.floor(dailyAvgWage * 30 * (totalDays / 365))

  // 근속 연·월·일
  const workYears  = Math.floor(totalDays / 365)
  const remainder  = totalDays - workYears * 365
  const workMonths = Math.floor(remainder / 30)
  const workDays   = remainder - workMonths * 30

  return {
    totalDays,
    workYears, workMonths, workDays,
    threeMonthDays,
    threeMonthWage: Math.floor(threeMonthWage),
    dailyAvgWage:   Math.floor(dailyAvgWage),
    bonus3m:        Math.floor(bonus3m),
    leave3m:        Math.floor(leave3m),
    severancePay,
    eligible: totalDays >= 365,
  }
}

const fmt  = (n) => Math.floor(n).toLocaleString('ko-KR') + '원'

export default function SeveranceCalc() {
  const today = new Date().toISOString().split('T')[0]

  const [startDate,    setStartDate]    = useState('')
  const [endDate,      setEndDate]      = useState(today)
  const [monthlyWage,  setMonthlyWage]  = useState('')
  const [annualBonus,  setAnnualBonus]  = useState('')
  const [annualLeave,  setAnnualLeave]  = useState('')
  const [result,       setResult]       = useState(null)
  const [error,        setError]        = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    if (!startDate || !endDate) { setError('입사일과 퇴직일을 입력해주세요.'); return }
    if (!monthlyWage || Number(monthlyWage) <= 0) { setError('월 평균 급여를 입력해주세요.'); return }
    if (new Date(endDate) <= new Date(startDate)) { setError('퇴직일은 입사일보다 늦어야 해요.'); return }

    const res = calcSeverance({
      startDate,
      endDate,
      monthlyWage:  Number(monthlyWage),
      annualBonus:  Number(annualBonus)  || 0,
      annualLeave:  Number(annualLeave)  || 0,
    })
    setResult(res)
  }

  return (
    <div className="space-y-4">

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">근무 조건 입력</h2>

        <div className="space-y-4">
          {/* 입퇴사일 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">입사일 <span className="text-red-400">*</span></label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                max={endDate} className={INPUT_CLS} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">퇴직일 <span className="text-red-400">*</span></label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                min={startDate} className={INPUT_CLS} />
            </div>
          </div>

          {/* 월 평균 급여 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              월 평균 급여 <span className="text-red-400">*</span>
              <span className="text-stone-400 font-normal ml-1">(세전, 퇴직 전 3개월 기준)</span>
            </label>
            <div className="relative">
              <input type="number" value={monthlyWage} onChange={e => setMonthlyWage(e.target.value)}
                placeholder="예) 3000000" className={`${INPUT_CLS} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">원</span>
            </div>
            {monthlyWage && <p className="mt-1 text-xs text-amber-600 font-bold">= {Number(monthlyWage).toLocaleString('ko-KR')}원</p>}
          </div>

          {/* 연간 상여금 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              연간 상여금
              <span className="text-stone-400 font-normal ml-1">(선택 · 연 총액)</span>
            </label>
            <div className="relative">
              <input type="number" value={annualBonus} onChange={e => setAnnualBonus(e.target.value)}
                placeholder="예) 3000000" className={`${INPUT_CLS} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">원</span>
            </div>
          </div>

          {/* 연차수당 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              연차수당
              <span className="text-stone-400 font-normal ml-1">(선택 · 연 총액)</span>
            </label>
            <div className="relative">
              <input type="number" value={annualLeave} onChange={e => setAnnualLeave(e.target.value)}
                placeholder="예) 500000" className={`${INPUT_CLS} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">원</span>
            </div>
          </div>
        </div>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button onClick={calculate} disabled={!startDate || !monthlyWage}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          퇴직금 계산하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <>
          {/* 1년 미만 */}
          {!result.eligible && (
            <section className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
              <p className="text-2xl mb-2">⚠️</p>
              <p className="text-sm font-black text-orange-700 mb-1">퇴직금 지급 대상이 아니에요</p>
              <p className="text-xs text-stone-500">계속 근로기간이 <span className="font-bold">{result.totalDays}일</span>로, 1년(365일) 미만이면 법정 퇴직금이 발생하지 않아요.</p>
            </section>
          )}

          {/* 퇴직금 결과 */}
          {result.eligible && (
            <section className="bg-white border border-stone-200 rounded-2xl p-6">
              <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>

              {/* 메인 결과 */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">예상 퇴직금</p>
                <p className="text-3xl font-black leading-tight">
                  {Math.floor(result.severancePay / 10000).toLocaleString()}
                  <span className="text-xl">만원</span>
                </p>
                <p className="text-sm opacity-80 mt-1">{fmt(result.severancePay)}</p>
              </div>

              {/* 근속 기간 */}
              <div className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 mb-4 flex justify-between items-center">
                <span className="text-xs text-stone-500">근속 기간</span>
                <span className="text-xs font-black text-stone-700">
                  {result.workYears > 0 && `${result.workYears}년 `}
                  {result.workMonths > 0 && `${result.workMonths}개월 `}
                  {result.workDays > 0 && `${result.workDays}일 `}
                  <span className="text-stone-400 font-normal">({result.totalDays.toLocaleString()}일)</span>
                </span>
              </div>

              {/* 계산 상세 */}
              <table className="w-full">
                <tbody>
                  {[
                    ['3개월 임금 총액',  fmt(result.threeMonthWage),   'text-stone-700'],
                    ['3개월 급여',       fmt(result.monthlyWage * 3 ?? 0), 'text-stone-700'],
                    ...(result.bonus3m > 0 ? [['└ 상여금 (3/12)', fmt(result.bonus3m), 'text-stone-400']] : []),
                    ...(result.leave3m > 0 ? [['└ 연차수당 (3/12)', fmt(result.leave3m), 'text-stone-400']] : []),
                    ['3개월 일수',       `${result.threeMonthDays}일`,  'text-stone-700'],
                    ['1일 평균임금',     fmt(result.dailyAvgWage),     'text-stone-700'],
                  ].map(([k, v, cls]) => (
                    <tr key={k} className="border-b border-stone-100 last:border-none">
                      <td className="py-2.5 text-xs text-stone-400">{k}</td>
                      <td className={`py-2.5 text-right text-xs font-bold ${cls}`}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-stone-500">
                <span className="font-bold text-stone-600">계산식 </span>
                {fmt(result.dailyAvgWage)} × 30일 × ({result.totalDays}일 ÷ 365) = <span className="font-bold text-amber-600">{fmt(result.severancePay)}</span>
              </div>
            </section>
          )}
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 퇴직금 계산 기준</h3>
        <p>근로기준법 제34조 기준으로, 계속 근로기간 1년에 대해 30일분 평균임금을 지급해요. 1일 평균임금은 퇴직 전 3개월간 지급받은 임금 총액을 그 기간 총일수로 나눠 계산합니다. 상여금·연차수당은 3개월분(연액의 1/4)을 산입해요. 실제 퇴직금은 회사 규정·DC형/DB형 퇴직연금 방식에 따라 다를 수 있어요.</p>
      </aside>
    </div>
  )
}
