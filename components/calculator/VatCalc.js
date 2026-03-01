'use client'
import { useState } from 'react'
import { INPUT_CLS } from '@/lib/constants'

const VAT_RATE = 0.1

const fmt = (n) => Math.round(n).toLocaleString('ko-KR')


const QUICK_AMOUNTS = [
  { label: '10만', value: 100000 },
  { label: '50만', value: 500000 },
  { label: '100만', value: 1000000 },
  { label: '500만', value: 5000000 },
  { label: '1,000만', value: 10000000 },
]

// 0: 공급가액 → 합계, 1: 합계(부가세포함) → 공급가액
const MODES = ['공급가액 입력', '합계금액 입력']

export default function VatCalc() {
  const [mode, setMode] = useState(0)
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setAmount(raw ? Number(raw).toLocaleString('ko-KR') : '')
    setResult(null)
  }

  const handleQuick = (val) => {
    setAmount(val.toLocaleString('ko-KR'))
    setResult(null)
  }

  const handleModeChange = (m) => {
    setMode(m)
    setAmount('')
    setResult(null)
    setError('')
  }

  const calculate = () => {
    setError('')
    const raw = parseFloat(amount.replace(/,/g, ''))
    if (!raw || raw <= 0) return setError('금액을 입력해주세요.')

    if (mode === 0) {
      // 공급가액 → 부가세, 합계
      const vat = raw * VAT_RATE
      const total = raw + vat
      setResult({ supply: raw, vat, total })
    } else {
      // 합계 → 공급가액, 부가세 역산
      const supply = raw / (1 + VAT_RATE)
      const vat = raw - supply
      setResult({ supply, vat, total: raw })
    }
  }

  const inputLabel = mode === 0 ? '공급가액 (부가세 제외 금액)' : '합계금액 (부가세 포함 금액)'
  const inputPlaceholder = mode === 0 ? '예: 1,000,000' : '예: 1,100,000'

  return (
    <div className="space-y-4">
      {/* 입력 섹션 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">
          조건 입력
        </h2>

        {/* 모드 탭 */}
        <div className="mb-5">
          <p className="text-xs font-bold text-stone-500 mb-2">계산 방향</p>
          <div className="flex gap-2">
            {MODES.map((m, i) => (
              <button
                key={m}
                onClick={() => handleModeChange(i)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${
                  mode === i
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-green-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-stone-400 mt-1.5">
            {mode === 0
              ? '공급가액을 입력하면 부가세(10%)와 합계금액을 계산해요'
              : '부가세 포함 합계금액을 입력하면 공급가액과 부가세를 역산해요'}
          </p>
        </div>

        {/* 금액 입력 */}
        <div className="mb-3">
          <label className="text-xs font-bold text-stone-500 mb-1.5 block">
            {inputLabel}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
            onKeyDown={(e) => e.key === 'Enter' && calculate()}
            placeholder={inputPlaceholder}
            className={INPUT_CLS}
          />
        </div>

        {/* 빠른 금액 버튼 */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {QUICK_AMOUNTS.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => handleQuick(value)}
              className="px-3 py-1.5 text-[11px] font-bold bg-stone-50 hover:bg-green-50 border border-stone-200 hover:border-green-300 hover:text-green-600 text-stone-500 rounded-lg transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button
          onClick={calculate}
          disabled={!amount}
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
            <p className="text-xs opacity-80 mb-1">부가세 (VAT 10%)</p>
            <p className="text-3xl font-black mb-1">{fmt(result.vat)}원</p>
            <p className="text-xs opacity-70">
              공급가액 {fmt(result.supply)}원 + 부가세 {fmt(result.vat)}원
            </p>
          </div>

          {/* 상세 테이블 */}
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="py-3 text-stone-500 text-xs">공급가액</td>
                <td className="py-3 text-right font-bold text-stone-800">{fmt(result.supply)}원</td>
              </tr>
              <tr className="border-b border-stone-100">
                <td className="py-3 text-stone-500 text-xs">
                  부가세
                  <span className="ml-1.5 text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-md font-bold">
                    10%
                  </span>
                </td>
                <td className="py-3 text-right font-bold text-green-600">{fmt(result.vat)}원</td>
              </tr>
              <tr>
                <td className="py-3 text-stone-500 text-xs font-bold">합계금액</td>
                <td className="py-3 text-right font-black text-stone-800 text-base">{fmt(result.total)}원</td>
              </tr>
            </tbody>
          </table>

          {/* 복사 버튼 영역 */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: '공급가액', value: fmt(result.supply) + '원' },
              { label: '부가세', value: fmt(result.vat) + '원' },
              { label: '합계금액', value: fmt(result.total) + '원' },
            ].map(({ label, value }) => (
              <button
                key={label}
                onClick={() => navigator.clipboard?.writeText(value)}
                className="flex flex-col items-center py-2.5 px-2 bg-stone-50 hover:bg-green-50 border border-stone-200 hover:border-green-300 rounded-xl transition-colors group"
              >
                <span className="text-[10px] text-stone-400 group-hover:text-green-500 mb-0.5">{label}</span>
                <span className="text-xs font-bold text-stone-700 group-hover:text-green-700 truncate w-full text-center">{value}</span>
                <span className="text-[9px] text-stone-300 group-hover:text-green-400 mt-0.5">복사</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <p>일반과세자 기준 부가세율 10%로 계산됩니다. 간이과세자·면세사업자는 세율이 다를 수 있으며, 영세율(0%) 적용 품목은 부가세가 없어요. 정확한 세액은 세무사나 국세청에 문의하세요.</p>
      </aside>
    </div>
  )
}
