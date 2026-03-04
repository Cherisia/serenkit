'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

// ===== 2025년 기준 4대보험 요율 =====
const RATES = {
  nationalPension:  0.045,   // 국민연금 4.5% (상한: 590만원)
  healthInsurance:  0.03545, // 건강보험 3.545%
  longTermCare:     0.1295,  // 장기요양 건강보험료의 12.95%
  employmentIns:    0.009,   // 고용보험 0.9%
}
const NP_CAP = 5900000 // 국민연금 기준소득월액 상한

// ===== 근로소득 간이세액표 (2025년) =====
// [월급여 하한, 세율, 누진공제] 구간 기반 간소화 계산
function calcIncomeTax(monthly, dependents) {
  // 근로소득공제 적용 후 과세표준 근사치 계산
  // 간이세액표 기반 (부양가족 수 반영)
  const annual = monthly * 12

  // 근로소득공제
  let deduction = 0
  if (annual <= 5000000)        deduction = annual * 0.7
  else if (annual <= 15000000)  deduction = 3500000 + (annual - 5000000) * 0.4
  else if (annual <= 45000000)  deduction = 7500000 + (annual - 15000000) * 0.15
  else if (annual <= 100000000) deduction = 12000000 + (annual - 45000000) * 0.05
  else                          deduction = 14750000 + (annual - 100000000) * 0.02
  deduction = Math.min(deduction, 20000000)

  // 인적공제 (본인 포함)
  const personalDeduction = 1500000 * Math.max(1, dependents)

  // 과세표준
  const taxBase = Math.max(0, annual - deduction - personalDeduction)

  // 소득세율 구간
  let annualTax = 0
  if      (taxBase <= 14000000)  annualTax = taxBase * 0.06
  else if (taxBase <= 50000000)  annualTax = 840000  + (taxBase - 14000000) * 0.15
  else if (taxBase <= 88000000)  annualTax = 6240000 + (taxBase - 50000000) * 0.24
  else if (taxBase <= 150000000) annualTax = 15360000 + (taxBase - 88000000) * 0.35
  else if (taxBase <= 300000000) annualTax = 37060000 + (taxBase - 150000000) * 0.38
  else if (taxBase <= 500000000) annualTax = 94060000 + (taxBase - 300000000) * 0.40
  else                           annualTax = 174060000 + (taxBase - 500000000) * 0.42

  const monthlyTax = Math.max(0, Math.round(annualTax / 12 / 10) * 10)
  const localTax   = Math.round(monthlyTax * 0.1 / 10) * 10  // 지방소득세 10%
  return { incomeTax: monthlyTax, localTax }
}

function calcSalary(gross, dependents) {
  const g = Number(gross)

  // 4대보험
  const npBase = Math.min(g, NP_CAP)
  const nationalPension = Math.round(npBase * RATES.nationalPension / 10) * 10
  const healthInsurance = Math.round(g * RATES.healthInsurance / 10) * 10
  const longTermCare    = Math.round(healthInsurance * RATES.longTermCare / 10) * 10
  const employmentIns   = Math.round(g * RATES.employmentIns / 10) * 10

  // 소득세/지방소득세
  const { incomeTax, localTax } = calcIncomeTax(g, Number(dependents))

  const totalDeduction = nationalPension + healthInsurance + longTermCare + employmentIns + incomeTax + localTax
  const netSalary = g - totalDeduction

  return {
    gross: g,
    netSalary,
    totalDeduction,
    breakdown: [
      { label: '국민연금',    amount: nationalPension, color: 'text-blue-500' },
      { label: '건강보험',    amount: healthInsurance, color: 'text-green-500' },
      { label: '장기요양',    amount: longTermCare,    color: 'text-teal-500' },
      { label: '고용보험',    amount: employmentIns,   color: 'text-orange-500' },
      { label: '소득세',      amount: incomeTax,       color: 'text-red-500' },
      { label: '지방소득세',  amount: localTax,        color: 'text-rose-400' },
    ],
  }
}

const fmt = (n) => n.toLocaleString('ko-KR') + '원'
const pct = (part, total) => total > 0 ? ((part / total) * 100).toFixed(1) + '%' : '0%'

const PRESETS = [
  { label: '250만', value: 2500000 },
  { label: '300만', value: 3000000 },
  { label: '400만', value: 4000000 },
  { label: '500만', value: 5000000 },
]

export default function SalaryCalc() {
  const [gross,      setGross]      = useState('')
  const [dependents, setDependents] = useState('1')
  const [result,     setResult]     = useState(null)

  useEffect(() => {
    const p = readParams()
    if (p.gross) {
      const dep = p.dependents || '1'
      setGross(p.gross); setDependents(dep)
      setResult(calcSalary(Number(p.gross), dep))
    }
  }, [])

  const calculate = () => {
    const g = Number(gross)
    if (!g || g <= 0) return
    pushParams({ gross, dependents })
    setResult(calcSalary(g, dependents))
  }

  const handlePreset = (val) => {
    setGross(String(val))
    setResult(calcSalary(val, dependents))
  }

  return (
    <div className="space-y-4">

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">급여 조건 입력</h2>

        {/* 프리셋 */}
        <div className="flex gap-2 mb-4">
          {PRESETS.map(p => (
            <button key={p.value} onClick={() => handlePreset(p.value)}
              className="flex-1 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-xs font-bold text-stone-600 hover:text-amber-600 rounded-xl py-2 transition-all">
              {p.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {/* 월급여 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              월 세전 급여 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number" value={gross} onChange={e => setGross(e.target.value)}
                placeholder="예) 3000000"
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">원</span>
            </div>
            {gross && (
              <p className="mt-1 text-xs text-amber-600 font-bold">
                = {Number(gross).toLocaleString('ko-KR')}원
              </p>
            )}
          </div>

          {/* 부양가족 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              부양가족 수 <span className="text-stone-400 font-normal">(본인 포함)</span>
            </label>
            <select value={dependents} onChange={e => setDependents(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors">
              {[1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n}명{n === 1 ? ' (본인만)' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={calculate} disabled={!gross || Number(gross) <= 0}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <>
          {/* 핵심 결과 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4 text-center">
                <p className="text-xs text-stone-400 mb-1">세후 실수령액</p>
                <p className="text-2xl font-black text-amber-500 leading-tight">
                  {Math.floor(result.netSalary / 10000).toLocaleString()}
                  <span className="text-base">만원</span>
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{fmt(result.netSalary)}</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                <p className="text-xs text-stone-400 mb-1">총 공제액</p>
                <p className="text-2xl font-black text-stone-600 leading-tight">
                  {Math.floor(result.totalDeduction / 10000).toLocaleString()}
                  <span className="text-base">만원</span>
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{pct(result.totalDeduction, result.gross)}</p>
              </div>
            </div>

            {/* 공제 막대 */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-stone-400 mb-1.5">
                <span>실수령 {pct(result.netSalary, result.gross)}</span>
                <span>공제 {pct(result.totalDeduction, result.gross)}</span>
              </div>
              <div className="h-3 bg-stone-100 rounded-full overflow-hidden flex">
                <div className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: pct(result.netSalary, result.gross) }} />
              </div>
            </div>

            {/* 공제 상세 */}
            <table className="w-full">
              <tbody>
                {result.breakdown.map(({ label, amount, color }) => (
                  <tr key={label} className="border-b border-stone-100 last:border-none">
                    <td className="py-2.5 text-xs text-stone-400">{label}</td>
                    <td className={`py-2.5 text-right text-xs font-bold ${color}`}>{fmt(amount)}</td>
                  </tr>
                ))}
                <tr className="bg-stone-50">
                  <td className="py-2.5 px-1 text-xs font-black text-stone-600 rounded-l-lg">총 공제액</td>
                  <td className="py-2.5 px-1 text-right text-xs font-black text-stone-700 rounded-r-lg">{fmt(result.totalDeduction)}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 연간 환산 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-sky-400">📅 연간 환산</h2>
            <table className="w-full">
              <tbody>
                {[
                  ['연봉 (세전)',   result.gross * 12],
                  ['연 실수령액',  result.netSalary * 12],
                  ['연 총공제액',  result.totalDeduction * 12],
                ].map(([label, val]) => (
                  <tr key={label} className="border-b border-stone-100 last:border-none">
                    <td className="py-2.5 text-xs text-stone-400">{label}</td>
                    <td className="py-2.5 text-right text-xs font-bold text-stone-700">{fmt(val)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준 안내 (2025년)</h3>
        <p>국민연금 4.5% · 건강보험 3.545% · 장기요양 건강보험료의 12.95% · 고용보험 0.9% 기준입니다. 소득세는 근로소득 간이세액표 기준이며 실제 급여와 다소 차이가 있을 수 있어요. 식대·비과세 수당은 반영되지 않습니다.</p>
      </aside>
    </div>
  )
}
