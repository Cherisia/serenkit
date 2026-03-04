'use client'
import { useState, useEffect } from 'react'
import { INPUT_CLS } from '@/lib/constants'
import { pushParams, readParams } from '@/lib/urlParams'

// ===== 순수 계산 함수 =====

function calcEqualInstallment(principal, annualRate, months) {
  // 원리금균등상환
  const r = annualRate / 100 / 12
  if (r === 0) {
    const monthly = principal / months
    return {
      monthlyPayment: monthly,
      schedule: Array.from({ length: months }, (_, i) => ({
        month: i + 1,
        payment: monthly,
        principal: monthly,
        interest: 0,
        balance: principal - monthly * (i + 1),
      })),
    }
  }
  const monthly = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  let balance = principal
  const schedule = []
  for (let i = 1; i <= months; i++) {
    const interest = balance * r
    const princ = monthly - interest
    balance -= princ
    schedule.push({
      month: i,
      payment: monthly,
      principal: princ,
      interest,
      balance: Math.max(0, balance),
    })
  }
  return { monthlyPayment: monthly, schedule }
}

function calcEqualPrincipal(principal, annualRate, months) {
  // 원금균등상환
  const r = annualRate / 100 / 12
  const monthlyPrincipal = principal / months
  let balance = principal
  const schedule = []
  for (let i = 1; i <= months; i++) {
    const interest = balance * r
    const payment = monthlyPrincipal + interest
    balance -= monthlyPrincipal
    schedule.push({
      month: i,
      payment,
      principal: monthlyPrincipal,
      interest,
      balance: Math.max(0, balance),
    })
  }
  const firstPayment = schedule[0]?.payment ?? 0
  const lastPayment = schedule[schedule.length - 1]?.payment ?? 0
  return { firstPayment, lastPayment, schedule }
}

function calcBullet(principal, annualRate, months) {
  // 만기일시상환
  const r = annualRate / 100 / 12
  const monthlyInterest = principal * r
  const schedule = Array.from({ length: months }, (_, i) => {
    const isLast = i === months - 1
    return {
      month: i + 1,
      payment: isLast ? principal + monthlyInterest : monthlyInterest,
      principal: isLast ? principal : 0,
      interest: monthlyInterest,
      balance: isLast ? 0 : principal,
    }
  })
  return { monthlyInterest, schedule }
}

// ===== 상수 =====
const fmt = (n) => Math.round(n).toLocaleString('ko-KR')
const METHODS = ['원리금균등', '원금균등', '만기일시']
const YEAR_OPTIONS = [1,2,3,4,5,6,7,8,9,10,12,15,20,25,30,35,40]

export default function LoanCalc() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState(20)
  const [method, setMethod] = useState(0) // 0:원리금균등 1:원금균등 2:만기일시
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const p = readParams()
    if (p.principal && p.rate) {
      const pr = Number(p.principal), r = Number(p.rate), yr = Number(p.years) || 20, mt = Number(p.method) || 0
      setPrincipal(pr.toLocaleString('ko-KR')); setRate(String(r)); setYears(yr); setMethod(mt)
      const n = yr * 12
      if (pr > 0 && r >= 0 && r <= 100) {
        let data
        if (mt === 0) { const { monthlyPayment, schedule } = calcEqualInstallment(pr, r, n); data = { label: '원리금균등', monthlyLabel: '월 납입금', monthly: monthlyPayment, totalPayment: monthlyPayment * n, totalInterest: monthlyPayment * n - pr, schedule } }
        else if (mt === 1) { const { firstPayment, lastPayment, schedule } = calcEqualPrincipal(pr, r, n); const totalInterest = schedule.reduce((s, x) => s + x.interest, 0); data = { label: '원금균등', monthlyLabel: '첫 달 납입금', monthly: firstPayment, lastMonthly: lastPayment, totalPayment: pr + totalInterest, totalInterest, schedule } }
        else { const { monthlyInterest, schedule } = calcBullet(pr, r, n); data = { label: '만기일시', monthlyLabel: '월 이자', monthly: monthlyInterest, totalPayment: pr + monthlyInterest * n, totalInterest: monthlyInterest * n, schedule } }
        setResult({ ...data, principal: pr, rate: r, years: yr })
      }
    }
  }, [])

  const calculate = () => {
    setError('')
    const p = parseFloat(principal.replace(/,/g, ''))
    const r = parseFloat(rate)
    const n = years * 12

    if (!p || p <= 0) return setError('대출 원금을 입력해주세요.')
    if (!r || r < 0) return setError('연 금리를 입력해주세요.')
    if (r > 100) return setError('금리가 너무 높습니다.')
    pushParams({ principal: p, rate, years, method })

    let data
    if (method === 0) {
      const { monthlyPayment, schedule } = calcEqualInstallment(p, r, n)
      const totalPayment = monthlyPayment * n
      const totalInterest = totalPayment - p
      data = {
        method: 0,
        mainLabel: '월 납입금',
        mainValue: monthlyPayment,
        totalPrincipal: p,
        totalInterest,
        totalPayment,
        schedule,
      }
    } else if (method === 1) {
      const { firstPayment, lastPayment, schedule } = calcEqualPrincipal(p, r, n)
      const totalPayment = schedule.reduce((s, row) => s + row.payment, 0)
      const totalInterest = totalPayment - p
      data = {
        method: 1,
        firstPayment,
        lastPayment,
        totalPrincipal: p,
        totalInterest,
        totalPayment,
        schedule,
      }
    } else {
      const { monthlyInterest, schedule } = calcBullet(p, r, n)
      const totalPayment = monthlyInterest * n + p
      const totalInterest = monthlyInterest * n
      data = {
        method: 2,
        mainLabel: '월 납입 이자',
        mainValue: monthlyInterest,
        totalPrincipal: p,
        totalInterest,
        totalPayment,
        schedule,
      }
    }

    setResult(data)
    setShowAll(false)
  }

  const handlePrincipalChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setPrincipal(raw ? Number(raw).toLocaleString('ko-KR') : '')
  }

  const interestRatio = result
    ? (result.totalInterest / result.totalPrincipal) * 100
    : 0
  const principalRatio = result
    ? (result.totalPrincipal / result.totalPayment) * 100
    : 0

  const visibleRows = result
    ? showAll
      ? result.schedule
      : result.schedule.slice(0, 12)
    : []

  return (
    <div className="space-y-4">
      {/* 입력 섹션 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">
          조건 입력
        </h2>

        {/* 상환 방식 탭 */}
        <div className="mb-5">
          <p className="text-xs font-bold text-stone-500 mb-2">상환 방식</p>
          <div className="flex gap-2">
            {METHODS.map((m, i) => (
              <button
                key={m}
                onClick={() => { setMethod(i); setResult(null) }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${
                  method === i
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-green-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* 대출 원금 */}
        <div className="mb-4">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            대출 원금 (원)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={principal}
            onChange={handlePrincipalChange}
            placeholder="예: 300,000,000"
            className={INPUT_CLS}
          />
        </div>

        {/* 연 금리 */}
        <div className="mb-4">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            연 금리 (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="예: 3.5"
            className={INPUT_CLS}
          />
        </div>

        {/* 대출 기간 */}
        <div className="mb-5">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            대출 기간
          </label>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className={INPUT_CLS}
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>{y}년 ({y * 12}개월)</option>
            ))}
          </select>
        </div>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button
          onClick={calculate}
          disabled={!principal || !rate}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors"
        >
          계산하기
        </button>
      </section>

      {/* 결과 섹션 */}
      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-emerald-400">
            계산 결과
          </h2>

          {/* 메인 결과 박스 */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-5 text-white text-center mb-4">
            {result.method === 1 ? (
              <>
                <p className="text-xs opacity-80 mb-1">첫 달 납입금</p>
                <p className="text-3xl font-black mb-1">{fmt(result.firstPayment)}원</p>
                <p className="text-xs opacity-70">
                  마지막 달: {fmt(result.lastPayment)}원
                </p>
              </>
            ) : (
              <>
                <p className="text-xs opacity-80 mb-1">{result.mainLabel}</p>
                <p className="text-3xl font-black mb-1">{fmt(result.mainValue)}원</p>
                <p className="text-xs opacity-70">
                  연 금리 {rate}% · {years}년 ({years * 12}개월)
                </p>
              </>
            )}
          </div>

          {/* 요약 테이블 */}
          <table className="w-full text-xs mb-4">
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="py-2.5 text-stone-500">대출 원금</td>
                <td className="py-2.5 text-right font-bold text-stone-800">{fmt(result.totalPrincipal)}원</td>
              </tr>
              <tr className="border-b border-stone-100">
                <td className="py-2.5 text-stone-500">총 이자</td>
                <td className="py-2.5 text-right font-bold text-red-500">{fmt(result.totalInterest)}원</td>
              </tr>
              <tr className="border-b border-stone-100">
                <td className="py-2.5 text-stone-500">총 납입금</td>
                <td className="py-2.5 text-right font-bold text-stone-800">{fmt(result.totalPayment)}원</td>
              </tr>
              <tr>
                <td className="py-2.5 text-stone-500">이자 비율</td>
                <td className="py-2.5 text-right font-bold text-orange-500">{interestRatio.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>

          {/* 원금/이자 비율 바 */}
          <div className="mb-5">
            <div className="flex justify-between text-[10px] text-stone-400 mb-1">
              <span>원금 {principalRatio.toFixed(1)}%</span>
              <span>이자 {(100 - principalRatio).toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden bg-stone-100 flex">
              <div
                className="bg-green-400 h-full transition-all duration-500"
                style={{ width: `${principalRatio}%` }}
              />
              <div
                className="bg-red-400 h-full transition-all duration-500"
                style={{ width: `${100 - principalRatio}%` }}
              />
            </div>
            <div className="flex gap-4 mt-1.5 text-[10px] text-stone-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-400 inline-block" />원금</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-400 inline-block" />이자</span>
            </div>
          </div>

          {/* 상환 일정표 */}
          <div>
            <h3 className="text-xs font-black text-stone-700 mb-2">월별 상환 일정</h3>
            <div className="overflow-auto max-h-80 rounded-xl border border-stone-100">
              <table className="w-full text-[11px] min-w-[400px]">
                <thead className="bg-stone-50 sticky top-0">
                  <tr>
                    <th className="py-2 px-2 text-left font-bold text-stone-500">회차</th>
                    <th className="py-2 px-2 text-right font-bold text-stone-500">납입금</th>
                    <th className="py-2 px-2 text-right font-bold text-stone-500">원금</th>
                    <th className="py-2 px-2 text-right font-bold text-stone-500">이자</th>
                    <th className="py-2 px-2 text-right font-bold text-stone-500">잔액</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr key={row.month} className="border-t border-stone-100 hover:bg-stone-50">
                      <td className="py-2 px-2 text-stone-500">{row.month}회</td>
                      <td className="py-2 px-2 text-right font-bold text-stone-800">{fmt(row.payment)}</td>
                      <td className="py-2 px-2 text-right text-green-600">{fmt(row.principal)}</td>
                      <td className="py-2 px-2 text-right text-red-400">{fmt(row.interest)}</td>
                      <td className="py-2 px-2 text-right text-stone-500">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.schedule.length > 12 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-2 py-2 text-xs font-bold text-stone-500 hover:text-green-600 border border-stone-200 hover:border-green-300 rounded-xl transition-colors"
              >
                {showAll ? '접기 ▲' : `전체 ${result.schedule.length}개월 보기 ▼`}
              </button>
            )}
          </div>
        </section>
      )}

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <p>월 복리 기준으로 계산되며, 실제 대출 상품에 따라 결과가 다를 수 있어요. 중도상환수수료·인지세·보증보험료 등은 포함되지 않습니다. 정확한 상환 조건은 해당 금융기관에 확인하세요.</p>
      </aside>
    </div>
  )
}
