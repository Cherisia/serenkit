'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

function toStr(d) { return d.toISOString().split('T')[0] }

function calcDiff(s, e, includeEnd) {
  const start = new Date(s); start.setHours(0,0,0,0)
  const end   = new Date(e); end.setHours(0,0,0,0)
  let total = Math.round((end - start) / 86400000)
  if (includeEnd) total += (total >= 0 ? 1 : -1)
  const abs = Math.abs(total)

  const [sd, ed] = total >= 0 ? [start, end] : [end, start]
  let yr = ed.getFullYear() - sd.getFullYear()
  let mo = ed.getMonth()    - sd.getMonth()
  let dy = ed.getDate()     - sd.getDate()
  if (dy < 0) { mo--; dy += new Date(ed.getFullYear(), ed.getMonth(), 0).getDate() }
  if (mo < 0) { yr--; mo += 12 }

  return { total, abs, weeks: Math.floor(abs/7), rem: abs%7, yr, mo, dy }
}

export default function DateDiffCalc() {
  const [start, setStart]           = useState(toStr(new Date()))
  const [end, setEnd]               = useState('')
  const [includeEnd, setIncludeEnd] = useState(false)
  const [result, setResult]         = useState(null)

  useEffect(() => {
    const p = readParams()
    if (p.start && p.end) {
      const inc = p.includeEnd === '1'
      setStart(p.start)
      setEnd(p.end)
      setIncludeEnd(inc)
      setResult(calcDiff(p.start, p.end, inc))
    }
  }, [])

  const calculate = () => {
    if (!start || !end) return
    pushParams({ start, end, includeEnd: includeEnd ? '1' : '0' })
    setResult(calcDiff(start, end, includeEnd))
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">계산 조건 입력</h2>
        <div className="space-y-4">
          {[['시작일', start, setStart], ['종료일', end, setEnd]].map(([lbl, val, set]) => (
            <div key={lbl}>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">{lbl} <span className="text-red-400">*</span></label>
              <input type="date" value={val} onChange={(e) => set(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
            </div>
          ))}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-600">
            <input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} className="w-4 h-4 accent-amber-500" />
            종료일 포함하여 계산
          </label>
        </div>
        <button onClick={calculate} disabled={!start || !end}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 mb-4 text-center">
            <p className="text-5xl font-black text-amber-500 mb-1">{result.abs.toLocaleString()}일</p>
            <p className="text-xs text-stone-400">
              {result.yr > 0 ? `${result.yr}년 ` : ''}{result.mo > 0 ? `${result.mo}개월 ` : ''}{result.dy > 0 ? `${result.dy}일` : ''}
            </p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['총 일수', `${result.abs.toLocaleString()}일${includeEnd ? ' (종료일 포함)' : ''}`],
                ['주 단위', `${result.weeks}주 ${result.rem}일`],
                ['년/월/일', `${result.yr}년 ${result.mo}개월 ${result.dy}일`],
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
        <p>계약 기간, 근무 기간, 여행 일수 등 두 날짜 사이의 기간을 계산할 때 사용하세요. 종료일 포함 시 시작·종료 당일 모두 포함한 일수를 계산합니다.</p>
      </aside>
    </div>
  )
}
