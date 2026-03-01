'use client'
import { useState } from 'react'
import { INPUT_CLS } from '@/lib/constants'

// ===== 2025년 귀속 종합소득세율 (2026년 5월 신고) =====
const TAX_BRACKETS = [
  { limit:   14000000, rate: 0.06, deduction:         0 },
  { limit:   50000000, rate: 0.15, deduction:   1260000 },
  { limit:   88000000, rate: 0.24, deduction:   5760000 },
  { limit:  150000000, rate: 0.35, deduction:  15440000 },
  { limit:  300000000, rate: 0.38, deduction:  19940000 },
  { limit:  500000000, rate: 0.40, deduction:  25940000 },
  { limit: 1000000000, rate: 0.42, deduction:  35940000 },
  { limit:    Infinity, rate: 0.45, deduction:  65940000 },
]

function calcTaxAmount(taxBase) {
  const bracket = TAX_BRACKETS.find(b => taxBase <= b.limit)
  return Math.max(0, taxBase * bracket.rate - bracket.deduction)
}

function getMarginalRate(taxBase) {
  return TAX_BRACKETS.find(b => taxBase <= b.limit)?.rate * 100 ?? 45
}

// 근로소득공제 (한도 2,000만원)
function calcWorkDeduction(gross) {
  if (gross <= 5000000)       return gross * 0.7
  if (gross <= 15000000)      return 3500000  + (gross - 5000000)   * 0.4
  if (gross <= 45000000)      return 7500000  + (gross - 15000000)  * 0.15
  if (gross <= 100000000)     return 12000000 + (gross - 45000000)  * 0.05
  return Math.min(14750000 + (gross - 100000000) * 0.02, 20000000)
}

// 근로소득세액공제 + 한도
function calcWorkTaxCredit(tax, gross) {
  const credit = tax <= 1300000 ? tax * 0.55 : 715000 + (tax - 1300000) * 0.30
  let limit
  if (gross <= 33000000)      limit = 740000
  else if (gross <= 70000000) limit = Math.max(0, 740000 - (gross - 33000000) * 0.008)
  else                         limit = Math.max(500000, 660000 - (gross - 70000000) * 0.5)
  return Math.min(credit, limit)
}

// 자녀세액공제
function calcChildCredit(n) {
  if (n === 0) return 0
  if (n === 1) return 250000
  if (n === 2) return 550000
  return 550000 + (n - 2) * 300000
}

// ===== 상수 =====
const fmt = (n) => Math.round(n).toLocaleString('ko-KR')
const INCOME_TYPES = ['근로소득', '사업·프리랜서', '직접 입력']

export default function IncomeTaxCalc() {
  const [incomeType, setIncomeType]     = useState(0)
  const [grossIncome, setGrossIncome]   = useState('')
  const [directIncome, setDirectIncome] = useState('')
  const [basicCount, setBasicCount]     = useState(1)
  const [elderCount, setElderCount]     = useState(0)
  const [disabledCount, setDisabledCount] = useState(0)
  const [pension, setPension]           = useState('')
  const [annuity, setAnnuity]           = useState('')
  const [childCount, setChildCount]     = useState(0)
  const [otherDeduction, setOtherDeduction] = useState('')
  const [result, setResult]             = useState(null)
  const [error, setError]               = useState('')

  const handleMoney = (setter) => (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setter(raw ? Number(raw).toLocaleString('ko-KR') : '')
    setResult(null)
  }
  const toNum = (str) => parseFloat((str || '0').replace(/,/g, '')) || 0

  const calculate = () => {
    setError('')
    const grossVal   = toNum(grossIncome)
    const directVal  = toNum(directIncome)
    const pensionVal = toNum(pension)
    const annuityVal = toNum(annuity)
    const otherVal   = toNum(otherDeduction)

    // 종합소득금액
    let totalIncome = 0
    let workDeduction = 0
    if (incomeType === 0) {
      if (!grossVal) return setError('총급여액을 입력해주세요.')
      workDeduction = calcWorkDeduction(grossVal)
      totalIncome = grossVal - workDeduction
    } else if (incomeType === 1) {
      if (!grossVal) return setError('사업소득금액을 입력해주세요.')
      totalIncome = grossVal
    } else {
      if (!directVal) return setError('종합소득금액을 입력해주세요.')
      totalIncome = directVal
    }
    totalIncome = Math.max(0, totalIncome)

    // 소득공제
    const basicDeduction    = basicCount * 1500000
    const elderDeduction    = elderCount * 1000000
    const disabledDeduction = disabledCount * 2000000
    const totalDeductions   = basicDeduction + elderDeduction + disabledDeduction + pensionVal + otherVal

    // 과세표준 → 산출세액
    const taxBase      = Math.max(0, totalIncome - totalDeductions)
    const calculatedTax = calcTaxAmount(taxBase)

    // 세액공제
    const workTaxCredit  = incomeType === 0 ? calcWorkTaxCredit(calculatedTax, grossVal) : 0
    const annuityCapped  = Math.min(annuityVal, 9000000)
    const annuityRate    = totalIncome <= 45000000 ? 0.165 : 0.132
    const annuityCredit  = annuityCapped * annuityRate
    const childCredit    = calcChildCredit(childCount)
    const standardCredit = incomeType === 0 ? 130000 : 70000
    const totalTaxCredit = workTaxCredit + annuityCredit + childCredit + standardCredit

    // 결정세액
    const finalTax   = Math.max(0, calculatedTax - totalTaxCredit)
    const localTax   = finalTax * 0.1
    const totalTax   = finalTax + localTax
    const effectiveRate  = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0
    const marginalRate   = getMarginalRate(taxBase)

    setResult({
      incomeType, grossVal, totalIncome, workDeduction,
      basicDeduction, elderDeduction, disabledDeduction, pensionVal, otherVal, totalDeductions,
      taxBase, calculatedTax,
      workTaxCredit, annuityCredit, annuityRatePct: Math.round(annuityRate * 100 * 10) / 10,
      childCredit, standardCredit, totalTaxCredit,
      finalTax, localTax, totalTax, effectiveRate, marginalRate,
    })
  }

  const grossLabel = incomeType === 0 ? '연간 총급여액 (세전 연봉)' : '사업소득금액 (수입 − 필요경비)'
  const isGross    = incomeType !== 2

  return (
    <div className="space-y-4">

      {/* 입력 섹션 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">조건 입력</h2>

        {/* 소득 유형 탭 */}
        <div className="mb-5">
          <p className="text-xs font-bold text-stone-500 mb-2">소득 유형</p>
          <div className="flex gap-2">
            {INCOME_TYPES.map((t, i) => (
              <button key={t} onClick={() => { setIncomeType(i); setResult(null) }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${
                  i === incomeType ? 'bg-green-500 text-white border-green-500' : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-green-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-stone-400 mt-1.5">
            {incomeType === 0 && '총급여 입력 시 근로소득공제(최대 2,000만원)를 자동 적용해요'}
            {incomeType === 1 && '총수입에서 필요경비(기준·단순경비율 등)를 차감한 소득금액을 입력해요'}
            {incomeType === 2 && '소득공제 적용 전 종합소득금액을 이미 알고 있을 때 사용해요'}
          </p>
          {incomeType === 0 && (
            <p className="text-[11px] mt-1.5 text-stone-400">
              4대보험은 포함되지 않아요. 매달 실수령액이 궁금하다면{' '}
              <a href="/cal/salary" className="text-green-600 font-bold underline underline-offset-2 hover:text-green-700">
                월급 실수령액 계산기
              </a>
              를 이용하세요.
            </p>
          )}
        </div>

        {/* 금액 입력 */}
        {isGross ? (
          <div className="mb-4">
            <label className="text-xs font-bold text-stone-500 mb-1.5 block">{grossLabel} (원)</label>
            <input type="text" inputMode="numeric" value={grossIncome}
              onChange={handleMoney(setGrossIncome)} placeholder="예: 50,000,000" className={INPUT_CLS} />
          </div>
        ) : (
          <div className="mb-4">
            <label className="text-xs font-bold text-stone-500 mb-1.5 block">종합소득금액 (원)</label>
            <input type="text" inputMode="numeric" value={directIncome}
              onChange={handleMoney(setDirectIncome)} placeholder="예: 40,000,000" className={INPUT_CLS} />
          </div>
        )}

        {/* 구분: 인적공제 */}
        <p className="text-[11px] font-bold text-stone-400 mb-3 mt-1 flex items-center gap-2">
          <span>인적공제</span><span className="flex-1 h-px bg-stone-100" />
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-[11px] font-bold text-stone-500 mb-1 block">기본공제 인원<br/><span className="font-normal text-stone-400">1인당 150만원</span></label>
            <select value={basicCount} onChange={e => setBasicCount(Number(e.target.value))} className={INPUT_CLS}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}명</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-500 mb-1 block">경로우대<br/><span className="font-normal text-stone-400">만 70세+ 100만원</span></label>
            <select value={elderCount} onChange={e => setElderCount(Number(e.target.value))} className={INPUT_CLS}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}명</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-500 mb-1 block">장애인<br/><span className="font-normal text-stone-400">1인당 200만원</span></label>
            <select value={disabledCount} onChange={e => setDisabledCount(Number(e.target.value))} className={INPUT_CLS}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}명</option>)}
            </select>
          </div>
        </div>

        {/* 구분: 소득공제 */}
        <p className="text-[11px] font-bold text-stone-400 mb-3 flex items-center gap-2">
          <span>소득공제</span><span className="flex-1 h-px bg-stone-100" />
        </p>

        <div className="mb-3">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">국민연금 납입액 (연간, 원)</label>
          <input type="text" inputMode="numeric" value={pension}
            onChange={handleMoney(setPension)} placeholder="예: 2,700,000" className={INPUT_CLS} />
        </div>
        <div className="mb-4">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            기타 소득공제 <span className="font-normal text-stone-400">(신용카드·의료비·교육비·주택자금 등)</span>
          </label>
          <input type="text" inputMode="numeric" value={otherDeduction}
            onChange={handleMoney(setOtherDeduction)} placeholder="예: 5,000,000" className={INPUT_CLS} />
        </div>

        {/* 구분: 세액공제 */}
        <p className="text-[11px] font-bold text-stone-400 mb-3 flex items-center gap-2">
          <span>세액공제</span><span className="flex-1 h-px bg-stone-100" />
        </p>

        <div className="mb-3">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            연금저축·IRP 납입액 <span className="font-normal text-stone-400">(연간, 최대 900만원 적용)</span>
          </label>
          <input type="text" inputMode="numeric" value={annuity}
            onChange={handleMoney(setAnnuity)} placeholder="예: 9,000,000" className={INPUT_CLS} />
        </div>
        <div className="mb-5">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            8세 이상 자녀 수 <span className="font-normal text-stone-400">(1명 25만·2명 55만·3명+ 추가 30만)</span>
          </label>
          <select value={childCount} onChange={e => setChildCount(Number(e.target.value))} className={INPUT_CLS}>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}명</option>)}
          </select>
        </div>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button onClick={calculate}
          disabled={!(isGross ? grossIncome : directIncome)}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {/* 결과 섹션 */}
      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-emerald-400">계산 결과</h2>

          {/* 메인 결과 박스 */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-5 text-white text-center mb-5">
            <p className="text-xs opacity-80 mb-1">총 납부세액 (소득세 + 지방소득세)</p>
            <p className="text-3xl font-black mb-1">{fmt(result.totalTax)}원</p>
            <div className="flex justify-center gap-4 text-xs opacity-75 mt-1">
              <span>실효세율 {result.effectiveRate.toFixed(1)}%</span>
              <span>·</span>
              <span>한계세율 {result.marginalRate}%</span>
            </div>
          </div>

          {/* 계산 상세 */}
          <div className="space-y-5 text-xs">

            {/* 1. 소득금액 */}
            <div>
              <p className="font-black text-stone-700 mb-2">① 소득금액 계산</p>
              <table className="w-full">
                <tbody>
                  {result.incomeType === 0 && <>
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">총급여액</td>
                      <td className="py-2 text-right font-bold text-stone-700">{fmt(result.grossVal)}원</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">근로소득공제</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.workDeduction)}원</td>
                    </tr>
                  </>}
                  <tr>
                    <td className="py-2 font-bold text-stone-600">종합소득금액</td>
                    <td className="py-2 text-right font-bold text-stone-800">{fmt(result.totalIncome)}원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 2. 소득공제 */}
            <div>
              <p className="font-black text-stone-700 mb-2">② 소득공제 합계</p>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 text-stone-500">기본공제 ({basicCount}명 × 150만)</td>
                    <td className="py-2 text-right text-blue-500">− {fmt(result.basicDeduction)}원</td>
                  </tr>
                  {result.elderDeduction > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">경로우대 추가공제</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.elderDeduction)}원</td>
                    </tr>
                  )}
                  {result.disabledDeduction > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">장애인 추가공제</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.disabledDeduction)}원</td>
                    </tr>
                  )}
                  {result.pensionVal > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">국민연금 납입액</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.pensionVal)}원</td>
                    </tr>
                  )}
                  {result.otherVal > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">기타 소득공제</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.otherVal)}원</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2 font-bold text-stone-600">과세표준</td>
                    <td className="py-2 text-right font-bold text-stone-800">{fmt(result.taxBase)}원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3. 세액 */}
            <div>
              <p className="font-black text-stone-700 mb-2">③ 세액 계산</p>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 text-stone-500">산출세액 ({result.marginalRate}% 구간)</td>
                    <td className="py-2 text-right font-bold text-stone-700">{fmt(result.calculatedTax)}원</td>
                  </tr>
                  {result.workTaxCredit > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">근로소득세액공제</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.workTaxCredit)}원</td>
                    </tr>
                  )}
                  {result.annuityCredit > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">연금저축·IRP 세액공제 ({result.annuityRatePct}%)</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.annuityCredit)}원</td>
                    </tr>
                  )}
                  {result.childCredit > 0 && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2 text-stone-500">자녀세액공제</td>
                      <td className="py-2 text-right text-blue-500">− {fmt(result.childCredit)}원</td>
                    </tr>
                  )}
                  <tr className="border-b border-stone-100">
                    <td className="py-2 text-stone-500">표준세액공제</td>
                    <td className="py-2 text-right text-blue-500">− {fmt(result.standardCredit)}원</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 font-bold text-stone-600">결정세액 (소득세)</td>
                    <td className="py-2 text-right font-bold text-stone-800">{fmt(result.finalTax)}원</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2 text-stone-500">지방소득세 (10%)</td>
                    <td className="py-2 text-right text-orange-500">{fmt(result.localTax)}원</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-black text-stone-700">총 납부세액</td>
                    <td className="py-3 text-right font-black text-base text-green-600">{fmt(result.totalTax)}원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 세율 요약 */}
            <div className="bg-stone-50 rounded-xl p-4 flex gap-6">
              <div className="text-center flex-1">
                <p className="text-stone-400 mb-0.5">실효세율</p>
                <p className="text-lg font-black text-green-600">{result.effectiveRate.toFixed(1)}%</p>
                <p className="text-[10px] text-stone-400">총납부/종합소득</p>
              </div>
              <div className="w-px bg-stone-200" />
              <div className="text-center flex-1">
                <p className="text-stone-400 mb-0.5">한계세율</p>
                <p className="text-lg font-black text-orange-500">{result.marginalRate}%</p>
                <p className="text-[10px] text-stone-400">과세표준 구간</p>
              </div>
              <div className="w-px bg-stone-200" />
              <div className="text-center flex-1">
                <p className="text-stone-400 mb-0.5">절세액</p>
                <p className="text-lg font-black text-blue-500">{fmt(result.totalTaxCredit)}원</p>
                <p className="text-[10px] text-stone-400">공제 합산</p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <p>2025년 귀속 종합소득세(2026년 5월 신고) 기준으로 계산됩니다. 신용카드·의료비·교육비 등 항목별 공제는 직접 합산하여 기타 소득공제란에 입력하세요. 성실신고확인 대상, 금융소득 종합과세, 분리과세 소득은 반영되지 않습니다. 정확한 신고는 홈택스(hometax.go.kr) 또는 세무사에게 문의하세요.</p>
      </aside>
    </div>
  )
}
