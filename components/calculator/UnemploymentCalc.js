'use client'
import { useState, useEffect } from 'react'
import { INPUT_CLS } from '@/lib/constants'
import { pushParams, readParams } from '@/lib/urlParams'

// 연도별 최저시급 (원)
const MIN_WAGE = { 2022: 9160, 2023: 9620, 2024: 9860, 2025: 10030, 2026: 10320 }

// 소정급여일수 표 (고용보험법)
const BENEFIT_DAYS = {
  lt1:   [120, 120],
  '1-3': [150, 180],
  '3-5': [180, 210],
  '5-10':[210, 240],
  gte10: [240, 270],
}

function calcUnemployment({ exitDate, age, insuredPeriod, monthlyWage, hoursPerDay, isDisabled }) {
  const year = new Date(exitDate).getFullYear()
  const minWagePerHour = MIN_WAGE[year] || MIN_WAGE[2025]

  // 1일 하한액 = 최저시급 × 소정근로시간 × 80%
  const dailyMin = Math.floor(minWagePerHour * hoursPerDay * 0.8)
  const dailyMax = 66000

  // 1일 평균임금 = 월급 / 30 (3개월 임금 합계 ÷ 90일)
  const dailyAvgWage = Math.floor(monthlyWage / 30)

  // 1일 구직급여 = 1일 평균임금 × 60%
  const dailyBenefitRaw = Math.floor(dailyAvgWage * 0.6)

  // 상한/하한 적용
  const dailyBenefit = Math.min(dailyMax, Math.max(dailyMin, dailyBenefitRaw))

  // 소정급여일수 결정
  const col = (age >= 50 || isDisabled) ? 1 : 0
  const benefitDays = (BENEFIT_DAYS[insuredPeriod] || BENEFIT_DAYS['lt1'])[col]

  const totalBenefit = dailyBenefit * benefitDays

  return {
    dailyAvgWage,
    dailyBenefitRaw,
    dailyBenefit,
    dailyMin,
    dailyMax,
    isCapAtMax: dailyBenefitRaw > dailyMax,
    isCapAtMin: dailyBenefitRaw < dailyMin,
    benefitDays,
    totalBenefit,
    minWagePerHour,
    year,
  }
}

const fmt = (n) => Math.floor(n).toLocaleString('ko-KR') + '원'

const INSURED_PERIODS = [
  { value: 'lt1',   label: '1년 미만' },
  { value: '1-3',   label: '1년 이상 3년 미만' },
  { value: '3-5',   label: '3년 이상 5년 미만' },
  { value: '5-10',  label: '5년 이상 10년 미만' },
  { value: 'gte10', label: '10년 이상' },
]

export default function UnemploymentCalc() {
  const today = new Date().toISOString().split('T')[0]

  const [exitDate,      setExitDate]      = useState(today)
  const [age,           setAge]           = useState('')
  const [insuredPeriod, setInsuredPeriod] = useState('1-3')
  const [monthlyWage,   setMonthlyWage]   = useState('')
  const [hoursPerDay,   setHoursPerDay]   = useState('8')
  const [isDisabled,    setIsDisabled]    = useState(false)
  const [result,        setResult]        = useState(null)
  const [error,         setError]         = useState('')

  useEffect(() => {
    const p = readParams()
    if (p.age && p.monthlyWage) {
      const ed = p.exitDate || today, ip = p.insuredPeriod || '1-3', hpd = p.hoursPerDay || '8', disabled = p.isDisabled === '1'
      setExitDate(ed); setAge(p.age); setInsuredPeriod(ip)
      setMonthlyWage(p.monthlyWage); setHoursPerDay(hpd); setIsDisabled(disabled)
      setResult(calcUnemployment({ exitDate: ed, age: Number(p.age), insuredPeriod: ip, monthlyWage: Number(p.monthlyWage), hoursPerDay: Number(hpd), isDisabled: disabled }))
    }
  }, [])

  const calculate = () => {
    setError('')
    setResult(null)
    if (!age || Number(age) < 15 || Number(age) > 100) { setError('유효한 만 나이를 입력해주세요.'); return }
    if (!monthlyWage || Number(monthlyWage) <= 0) { setError('월 평균임금을 입력해주세요.'); return }

    pushParams({ exitDate, age, insuredPeriod, monthlyWage, hoursPerDay, isDisabled: isDisabled ? '1' : '0' })
    setResult(calcUnemployment({
      exitDate,
      age: Number(age),
      insuredPeriod,
      monthlyWage: Number(monthlyWage),
      hoursPerDay: Number(hoursPerDay) || 8,
      isDisabled,
    }))
  }

  return (
    <div className="space-y-4">

      {/* 수급 조건 안내 */}
      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-blue-700 mb-2">📋 실업급여(구직급여) 수급 조건</h3>
        <ul className="space-y-1">
          <li>→ 이직일 이전 18개월 중 피보험단위기간 합산 <span className="font-bold text-stone-700">180일 이상</span></li>
          <li>→ 비자발적 퇴직 (권고사직·계약만료·정리해고 등)</li>
          <li>→ 적극적인 재취업 활동 중</li>
        </ul>
      </section>

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">조건 입력</h2>

        <div className="space-y-4">

          {/* 퇴직일 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              퇴직일
              <span className="text-stone-400 font-normal ml-1">(최저임금 기준 연도 산정)</span>
            </label>
            <input type="date" value={exitDate} onChange={e => setExitDate(e.target.value)} className={INPUT_CLS} />
          </div>

          {/* 만 나이 + 장애인 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">만 나이 <span className="text-red-400">*</span></label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)}
                placeholder="예) 35" min="15" max="100" className={INPUT_CLS} />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">장애인 여부</label>
              <label className="flex items-center gap-2 cursor-pointer h-[42px] px-3 bg-stone-50 border border-stone-200 rounded-xl hover:border-amber-300 transition-colors">
                <input type="checkbox" checked={isDisabled} onChange={e => setIsDisabled(e.target.checked)}
                  className="w-4 h-4 accent-amber-400" />
                <span className="text-sm text-stone-600">해당</span>
              </label>
            </div>
          </div>

          {/* 고용보험 가입기간 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">고용보험 가입기간 <span className="text-red-400">*</span></label>
            <select value={insuredPeriod} onChange={e => setInsuredPeriod(e.target.value)} className={INPUT_CLS}>
              {INSURED_PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          {/* 월 평균임금 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              월 평균임금 <span className="text-red-400">*</span>
              <span className="text-stone-400 font-normal ml-1">(세전, 퇴직 전 3개월 기준)</span>
            </label>
            <div className="relative">
              <input type="number" value={monthlyWage} onChange={e => setMonthlyWage(e.target.value)}
                placeholder="예) 3000000" className={`${INPUT_CLS} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">원</span>
            </div>
            {monthlyWage && <p className="mt-1 text-xs text-amber-600 font-bold">= {Number(monthlyWage).toLocaleString('ko-KR')}원</p>}
          </div>

          {/* 1일 소정근로시간 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              1일 소정근로시간
              <span className="text-stone-400 font-normal ml-1">(하한액 계산 기준)</span>
            </label>
            <select value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} className={INPUT_CLS}>
              {[4, 5, 6, 7, 8].map(h => <option key={h} value={h}>{h}시간</option>)}
            </select>
          </div>
        </div>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button onClick={calculate} disabled={!age || !monthlyWage}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          실업급여 계산하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-blue-400">계산 결과</h2>

          {/* 메인 결과 */}
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-5 text-white text-center mb-4">
            <p className="text-xs opacity-75 mb-1">예상 실업급여 총액</p>
            <p className="text-3xl font-black leading-tight">
              {Math.floor(result.totalBenefit / 10000).toLocaleString()}
              <span className="text-xl">만원</span>
            </p>
            <p className="text-sm opacity-80 mt-1">{fmt(result.totalBenefit)}</p>
            <p className="text-xs opacity-60 mt-1">최대 {result.benefitDays}일 수령</p>
          </div>

          {/* 상한/하한 안내 */}
          {result.isCapAtMax && (
            <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-xs text-orange-700">
              평균임금 60%({fmt(result.dailyBenefitRaw)})가 상한액 초과 → <span className="font-bold">상한액 {fmt(result.dailyMax)}</span> 적용
            </div>
          )}
          {result.isCapAtMin && (
            <div className="mb-4 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-xs text-sky-700">
              평균임금 60%({fmt(result.dailyBenefitRaw)})가 하한액 미달 → <span className="font-bold">하한액 {fmt(result.dailyMin)}</span> 적용
            </div>
          )}

          {/* 계산 상세 */}
          <table className="w-full">
            <tbody>
              {[
                ['1일 평균임금',         fmt(result.dailyAvgWage),    'text-stone-700'],
                ['1일 구직급여 (60%)',   fmt(result.dailyBenefitRaw), 'text-stone-700'],
                ['1일 실업급여 (적용)',  fmt(result.dailyBenefit),    'text-amber-600'],
                ['└ 상한액',             fmt(result.dailyMax),        'text-stone-400'],
                ['└ 하한액',             fmt(result.dailyMin),        'text-stone-400'],
                ['소정급여일수',          `${result.benefitDays}일`,   'text-stone-700'],
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
            {fmt(result.dailyBenefit)} × {result.benefitDays}일 = <span className="font-bold text-amber-600">{fmt(result.totalBenefit)}</span>
          </div>

          <p className="mt-3 text-[10px] text-stone-400 text-center">
            {result.year}년 최저시급 {result.minWagePerHour.toLocaleString('ko-KR')}원 기준 · 실제 수급액은 고용센터 상담을 권장해요
          </p>
        </section>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 실업급여 계산 기준</h3>
        <p>고용보험법 기준. 1일 구직급여 = 1일 평균임금 × 60%, 상한액 66,000원·하한액 최저시급×근로시간×80%. 소정급여일수는 나이·가입기간에 따라 120~270일. 실제 수급 여부 및 금액은 고용복지플러스센터(고용24)에서 확인하세요.</p>
      </aside>
    </div>
  )
}
