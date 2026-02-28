'use client'
import { useState } from 'react'

// 1평 = 400/121 m² ≈ 3.305785m²
const SQM_PER_PYEONG = 400 / 121

function sqmToPyeong(sqm) { return sqm / SQM_PER_PYEONG }
function pyeongToSqm(pyeong) { return pyeong * SQM_PER_PYEONG }
function fmt(n, digits = 2) { return parseFloat(n.toFixed(digits)).toLocaleString('ko-KR') }

const REFERENCE = [
  { pyeong: 10,  sqm: 33.1,  desc: '원룸 · 오피스텔' },
  { pyeong: 15,  sqm: 49.6,  desc: '소형 아파트' },
  { pyeong: 20,  sqm: 66.1,  desc: '소형 아파트' },
  { pyeong: 25,  sqm: 82.6,  desc: '소형~중형' },
  { pyeong: 30,  sqm: 99.2,  desc: '중형 아파트' },
  { pyeong: 34,  sqm: 112.4, desc: '중형 아파트 · 인기 평형' },
  { pyeong: 40,  sqm: 132.2, desc: '중대형 아파트' },
  { pyeong: 50,  sqm: 165.3, desc: '대형 아파트' },
]

export default function PyeongCalc() {
  const [sqm,    setSqm]    = useState('')
  const [pyeong, setPyeong] = useState('')
  const [active, setActive] = useState(null) // 'sqm' | 'pyeong'

  const handleSqmChange = (e) => {
    const val = e.target.value
    setSqm(val)
    setActive('sqm')
    if (val === '' || isNaN(val)) { setPyeong('') }
    else { setPyeong(String(parseFloat(sqmToPyeong(parseFloat(val)).toFixed(2)))) }
  }

  const handlePyeongChange = (e) => {
    const val = e.target.value
    setPyeong(val)
    setActive('pyeong')
    if (val === '' || isNaN(val)) { setSqm('') }
    else { setSqm(String(parseFloat(pyeongToSqm(parseFloat(val)).toFixed(2)))) }
  }

  const hasValue = sqm !== '' && !isNaN(sqm) && pyeong !== '' && !isNaN(pyeong)
  const sqmVal   = parseFloat(sqm)
  const pyeongVal = parseFloat(pyeong)

  return (
    <div className="space-y-4">

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">면적 입력</h2>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

          {/* m² 입력 */}
          <div>
            <label className="text-xs font-bold text-stone-500 mb-1.5 block">제곱미터 (m²)</label>
            <div className="relative">
              <input
                type="number"
                value={sqm}
                onChange={handleSqmChange}
                placeholder="0"
                min="0"
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-10 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">m²</span>
            </div>
          </div>

          {/* 구분 */}
          <div className="flex items-center justify-center mt-5">
            <span className="text-lg text-stone-300 font-black">⇄</span>
          </div>

          {/* 평 입력 */}
          <div>
            <label className="text-xs font-bold text-stone-500 mb-1.5 block">평수 (평)</label>
            <div className="relative">
              <input
                type="number"
                value={pyeong}
                onChange={handlePyeongChange}
                placeholder="0"
                min="0"
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-10 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">평</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-stone-400 mt-3 text-center">어느 쪽에 입력해도 자동으로 변환됩니다</p>
      </section>

      {/* 결과 */}
      {hasValue && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">변환 결과</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl p-5 text-center ${active === 'sqm' ? 'bg-gradient-to-br from-sky-400 to-blue-500 text-white' : 'bg-stone-50 border border-stone-200'}`}>
              <p className={`text-xs font-bold mb-1 ${active === 'sqm' ? 'opacity-80' : 'text-stone-400'}`}>제곱미터</p>
              <p className={`text-3xl font-black leading-none ${active === 'sqm' ? '' : 'text-stone-800'}`}>{fmt(sqmVal)}</p>
              <p className={`text-xs mt-1.5 ${active === 'sqm' ? 'opacity-60' : 'text-stone-400'}`}>m²</p>
            </div>
            <div className={`rounded-2xl p-5 text-center ${active === 'pyeong' ? 'bg-gradient-to-br from-sky-400 to-blue-500 text-white' : 'bg-stone-50 border border-stone-200'}`}>
              <p className={`text-xs font-bold mb-1 ${active === 'pyeong' ? 'opacity-80' : 'text-stone-400'}`}>평수</p>
              <p className={`text-3xl font-black leading-none ${active === 'pyeong' ? '' : 'text-stone-800'}`}>{fmt(pyeongVal)}</p>
              <p className={`text-xs mt-1.5 ${active === 'pyeong' ? 'opacity-60' : 'text-stone-400'}`}>평</p>
            </div>
          </div>
        </section>
      )}

      {/* 아파트 평수 참고표 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-sky-400">아파트 평수 참고표</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-stone-100">
              <th className="text-left pb-2.5 text-xs font-black text-stone-500">평수</th>
              <th className="text-right pb-2.5 text-xs font-black text-stone-500">m²</th>
              <th className="text-right pb-2.5 text-xs font-black text-stone-500">세대 유형</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE.map(({ pyeong: p, sqm: s, desc }) => {
              const isActive = hasValue && Math.abs(pyeongVal - p) < 2.5
              return (
                <tr
                  key={p}
                  className={`border-b border-stone-100 last:border-none transition-colors ${isActive ? 'bg-sky-50' : ''}`}
                >
                  <td className={`py-2.5 font-black ${isActive ? 'text-sky-600' : 'text-stone-800'}`}>
                    {p}평
                    {isActive && <span className="ml-1.5 text-[10px] bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded-full">근접</span>}
                  </td>
                  <td className="py-2.5 text-right text-stone-600">{s} m²</td>
                  <td className="py-2.5 text-right text-stone-400 text-xs">{desc}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <ul className="space-y-1">
          <li>• 1평 = 3.3058m²(400/121m²) 기준으로 계산합니다.</li>
          <li>• 아파트 분양 광고의 "○○평"은 <strong className="text-stone-600">공급면적</strong> 기준입니다.</li>
          <li>• <strong className="text-stone-600">전용면적</strong>은 실제 생활 공간으로, 공급면적보다 20~25% 작습니다.</li>
          <li>• 참고표의 m²는 반올림 값이며, 실제 면적과 다를 수 있어요.</li>
        </ul>
      </aside>

    </div>
  )
}
