'use client'
import { useState } from 'react'

function toStr(d) { return d.toISOString().split('T')[0] }

function calcAge(birth, base) {
  const b = new Date(birth), d = new Date(base)
  let age = d.getFullYear() - b.getFullYear()
  const hadBday = d.getMonth() > b.getMonth() || (d.getMonth() === b.getMonth() && d.getDate() >= b.getDate())
  if (!hadBday) age--
  const korean = d.getFullYear() - b.getFullYear() + 1
  let next = new Date(d.getFullYear(), b.getMonth(), b.getDate())
  if (next <= d) next.setFullYear(next.getFullYear() + 1)
  const daysToNext = Math.round((next - d) / 86400000)
  const livedDays  = Math.round((d - b) / 86400000)
  return { age, korean, livedDays, daysToNext, next }
}

export default function AgeCalc() {
  const [birth,  setBirth]  = useState('')
  const [base,   setBase]   = useState(toStr(new Date()))
  const [result, setResult] = useState(null)

  const calculate = () => { if (birth) setResult(calcAge(birth, base)) }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">계산 조건 입력</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">생년월일 <span className="text-red-400">*</span></label>
            <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">기준일</label>
            <input type="date" value={base} onChange={(e) => setBase(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
          </div>
        </div>
        <button onClick={calculate} disabled={!birth}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4 text-center">
              <p className="text-xs text-stone-400 mb-1">만 나이 (법적)</p>
              <p className="text-4xl font-black text-amber-500">{result.age}세</p>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
              <p className="text-xs text-stone-400 mb-1">한국 나이</p>
              <p className="text-4xl font-black text-stone-600">{result.korean}세</p>
            </div>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['살아온 날수', `${result.livedDays.toLocaleString()}일`],
                ['다음 생일', result.next.toLocaleDateString('ko-KR', {year:'numeric',month:'long',day:'numeric'})],
                ['생일까지', `${result.daysToNext}일 남음`],
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
        <h3 className="font-bold text-stone-600 mb-1.5">💡 만 나이란?</h3>
        <p>2023년 6월부터 법적으로 만 나이가 표준입니다. 태어난 날을 0세로 시작해 생일마다 1살 증가합니다. 한국 나이는 태어난 해를 1세로 계산하는 방식이에요.</p>
      </aside>
    </div>
  )
}
