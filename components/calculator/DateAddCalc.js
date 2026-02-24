'use client'
import { useState } from 'react'

const DOW = ['일','월','화','수','목','금','토']
function toStr(d) { return d.toISOString().split('T')[0] }

export default function DateAddCalc() {
  const [base,   setBase]   = useState(toStr(new Date()))
  const [mode,   setMode]   = useState('add')
  const [years,  setYears]  = useState(0)
  const [months, setMonths] = useState(0)
  const [days,   setDays]   = useState(0)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const d = new Date(base)
    const s = mode === 'add' ? 1 : -1
    d.setFullYear(d.getFullYear() + s * Number(years))
    d.setMonth(d.getMonth()       + s * Number(months))
    d.setDate(d.getDate()         + s * Number(days))
    setResult(d)
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">계산 조건 입력</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">기준 날짜 <span className="text-red-400">*</span></label>
            <input type="date" value={base} onChange={(e) => setBase(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">계산 방식</label>
            <div className="flex rounded-xl overflow-hidden border border-stone-200">
              {[['add','➕ 더하기'],['sub','➖ 빼기']].map(([v,l]) => (
                <button key={v} onClick={() => setMode(v)}
                  className={`flex-1 py-2.5 text-xs font-bold transition-colors
                    ${mode === v ? 'bg-amber-400 text-white' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[['년', years, setYears],['개월', months, setMonths],['일', days, setDays]].map(([u,v,s]) => (
              <div key={u}>
                <label className="block text-xs font-bold text-stone-600 mb-1.5">{u}</label>
                <input type="number" min="0" value={v} onChange={(e) => s(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors text-center" />
              </div>
            ))}
          </div>
        </div>
        <button onClick={calculate}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 text-center mb-4">
            <p className="text-3xl font-black text-amber-500">
              {result.getFullYear()}년 {result.getMonth()+1}월 {result.getDate()}일
            </p>
            <p className="text-xs text-stone-400 mt-1">{DOW[result.getDay()]}요일</p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['기준 날짜', new Date(base).toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'})],
                ['계산',      `${mode==='add'?'+':'-'} ${years}년 ${months}개월 ${days}일`],
                ['결과 날짜', result.toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric',weekday:'long'})],
              ].map(([k,v]) => (
                <tr key={k} className="border-b border-stone-100 last:border-none">
                  <td className="py-2.5 text-xs text-stone-400">{k}</td>
                  <td className="py-2.5 text-right text-xs font-bold text-stone-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 활용 예시</h3>
        <p>오늘부터 90일 후, 계약일로부터 1년 후, 3개월 전 날짜 등 기준 날짜에 기간을 더하거나 빼서 특정 날짜를 구할 때 사용하세요.</p>
      </aside>
    </div>
  )
}
