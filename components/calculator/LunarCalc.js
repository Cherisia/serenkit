'use client'
import { useState } from 'react'
import KoreanLunarCalendar from 'korean-lunar-calendar'
import { INPUT_CLS } from '@/lib/constants'

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

function toSolarResult(year, month, day) {
  const cal = new KoreanLunarCalendar()
  cal.setSolarDate(year, month, day)
  const lunar = cal.getLunarCalendar()
  const gapja = cal.getKoreanGapja()
  const ganji = cal.getChineseGapja()
  return { lunar, gapja, ganji }
}

function toLunarResult(year, month, day, intercalation) {
  const cal = new KoreanLunarCalendar()
  cal.setLunarDate(year, month, day, intercalation)
  const solar = cal.getSolarCalendar()
  // re-set to get gapja
  cal.setSolarDate(solar.year, solar.month, solar.day)
  const gapja = cal.getKoreanGapja()
  const ganji = cal.getChineseGapja()
  return { solar, gapja, ganji }
}

function padTwo(n) { return String(n).padStart(2, '0') }


export default function LunarCalc() {
  const [tab, setTab] = useState('solar')

  // 양력 → 음력
  const [solarYear, setSolarYear] = useState('')
  const [solarMonth, setSolarMonth] = useState('1')
  const [solarDay, setSolarDay] = useState('')
  const [solarResult, setSolarResult] = useState(null)
  const [solarError, setSolarError] = useState('')

  // 음력 → 양력
  const [lunarYear, setLunarYear] = useState('')
  const [lunarMonth, setLunarMonth] = useState('1')
  const [lunarDay, setLunarDay] = useState('')
  const [isIntercalation, setIsIntercalation] = useState(false)
  const [lunarResult, setLunarResult] = useState(null)
  const [lunarError, setLunarError] = useState('')

  const calcSolarToLunar = () => {
    setSolarError('')
    setSolarResult(null)
    const y = Number(solarYear)
    const m = Number(solarMonth)
    const d = Number(solarDay)
    if (!solarYear || !solarDay) { setSolarError('연도와 일을 입력해주세요.'); return }
    if (y < 1900 || y > 2050) { setSolarError('1900년 ~ 2050년 범위의 연도를 입력해주세요.'); return }
    if (d < 1 || d > 31) { setSolarError('일(日)은 1~31 범위로 입력해주세요.'); return }
    try {
      const result = toSolarResult(y, m, d)
      setSolarResult(result)
    } catch {
      setSolarError('변환에 실패했어요. 날짜를 확인해주세요.')
    }
  }

  const calcLunarToSolar = () => {
    setLunarError('')
    setLunarResult(null)
    const y = Number(lunarYear)
    const m = Number(lunarMonth)
    const d = Number(lunarDay)
    if (!lunarYear || !lunarDay) { setLunarError('연도와 일을 입력해주세요.'); return }
    if (y < 1900 || y > 2050) { setLunarError('1900년 ~ 2050년 범위의 연도를 입력해주세요.'); return }
    if (d < 1 || d > 30) { setLunarError('일(日)은 1~30 범위로 입력해주세요.'); return }
    try {
      const result = toLunarResult(y, m, d, isIntercalation)
      setLunarResult(result)
    } catch {
      setLunarError('변환에 실패했어요. 날짜를 확인해주세요.')
    }
  }

  const formatLunarDate = (lunar) => {
    const intercalStr = lunar.intercalation ? '윤' : ''
    return `${lunar.year}년 ${intercalStr}${lunar.month}월 ${lunar.day}일`
  }

  const formatSolarDate = (solar) => {
    return `${solar.year}년 ${solar.month}월 ${solar.day}일`
  }

  const formatSolarFull = (solar) => {
    const d = new Date(solar.year, solar.month - 1, solar.day)
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${solar.year}.${padTwo(solar.month)}.${padTwo(solar.day)} (${days[d.getDay()]})`
  }

  const formatLunarFull = (lunar) => {
    const intercalStr = lunar.intercalation ? '(윤달) ' : ''
    return `${lunar.year}.${padTwo(lunar.month)}.${padTwo(lunar.day)} ${intercalStr}`
  }

  return (
    <div className="space-y-4">
      {/* 탭 */}
      <div className="bg-white border border-stone-200 rounded-2xl p-1.5 flex gap-1">
        <button onClick={() => setTab('solar')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${tab === 'solar' ? 'bg-amber-400 text-white shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
          양력 → 음력
        </button>
        <button onClick={() => setTab('lunar')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${tab === 'lunar' ? 'bg-amber-400 text-white shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}>
          음력 → 양력
        </button>
      </div>

      {/* 양력 → 음력 */}
      {tab === 'solar' && (
        <>
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">양력 날짜 입력</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1.5">
                  연도 <span className="text-red-400">*</span>
                  <span className="text-stone-400 font-normal ml-1">(1900 ~ 2050년)</span>
                </label>
                <input type="number" value={solarYear} onChange={e => setSolarYear(e.target.value)}
                  placeholder="예: 2024" min="1900" max="2050"
                  className={INPUT_CLS} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">월 <span className="text-red-400">*</span></label>
                  <select value={solarMonth} onChange={e => setSolarMonth(e.target.value)} className={INPUT_CLS}>
                    {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">일 <span className="text-red-400">*</span></label>
                  <input type="number" value={solarDay} onChange={e => setSolarDay(e.target.value)}
                    placeholder="예: 15" min="1" max="31"
                    className={INPUT_CLS} />
                </div>
              </div>
            </div>
            {solarError && <p className="mt-2 text-xs text-red-500">{solarError}</p>}
            <button onClick={calcSolarToLunar} disabled={!solarYear || !solarDay}
              className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
              음력으로 변환
            </button>
          </section>

          {solarResult && (
            <section className="bg-white border border-stone-200 rounded-2xl p-6">
              <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">변환 결과</h2>

              {/* 메인 결과 */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">음력 날짜</p>
                <p className="text-2xl font-black mb-1">{formatLunarDate(solarResult.lunar)}</p>
                {solarResult.lunar.intercalation && (
                  <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">윤달</span>
                )}
              </div>

              {/* 상세 정보 */}
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['음력 (숫자)', formatLunarFull(solarResult.lunar)],
                    ['한국 간지', `${solarResult.gapja.year} ${solarResult.gapja.month} ${solarResult.gapja.day}`],
                    ['한자 간지', `${solarResult.ganji.year} ${solarResult.ganji.month} ${solarResult.ganji.day}`],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-stone-100 last:border-none">
                      <td className="py-2.5 text-xs text-stone-400 whitespace-nowrap">{k}</td>
                      <td className="py-2.5 text-right text-xs font-bold text-stone-700">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}

      {/* 음력 → 양력 */}
      {tab === 'lunar' && (
        <>
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">음력 날짜 입력</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1.5">
                  연도 <span className="text-red-400">*</span>
                  <span className="text-stone-400 font-normal ml-1">(1900 ~ 2050년)</span>
                </label>
                <input type="number" value={lunarYear} onChange={e => setLunarYear(e.target.value)}
                  placeholder="예: 2024" min="1900" max="2050"
                  className={INPUT_CLS} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">월 <span className="text-red-400">*</span></label>
                  <select value={lunarMonth} onChange={e => setLunarMonth(e.target.value)} className={INPUT_CLS}>
                    {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">일 <span className="text-red-400">*</span></label>
                  <input type="number" value={lunarDay} onChange={e => setLunarDay(e.target.value)}
                    placeholder="예: 15" min="1" max="30"
                    className={INPUT_CLS} />
                </div>
              </div>
              {/* 윤달 토글 */}
              <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
                <div>
                  <p className="text-xs font-bold text-stone-700">윤달 (閏月)</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">해당 월이 윤달인 경우 켜주세요</p>
                </div>
                <button type="button" onClick={() => setIsIntercalation(v => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isIntercalation ? 'bg-amber-400' : 'bg-stone-300'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${isIntercalation ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
            {lunarError && <p className="mt-2 text-xs text-red-500">{lunarError}</p>}
            <button onClick={calcLunarToSolar} disabled={!lunarYear || !lunarDay}
              className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
              양력으로 변환
            </button>
          </section>

          {lunarResult && (
            <section className="bg-white border border-stone-200 rounded-2xl p-6">
              <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">변환 결과</h2>

              {/* 메인 결과 */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">양력 날짜</p>
                <p className="text-2xl font-black">{formatSolarDate(lunarResult.solar)}</p>
                <p className="text-sm opacity-80 mt-1">{formatSolarFull(lunarResult.solar)}</p>
              </div>

              {/* 상세 정보 */}
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['한국 간지', `${lunarResult.gapja.year} ${lunarResult.gapja.month} ${lunarResult.gapja.day}`],
                    ['한자 간지', `${lunarResult.ganji.year} ${lunarResult.ganji.month} ${lunarResult.ganji.day}`],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-stone-100 last:border-none">
                      <td className="py-2.5 text-xs text-stone-400 whitespace-nowrap">{k}</td>
                      <td className="py-2.5 text-right text-xs font-bold text-stone-700">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 음력 변환 안내</h3>
        <p>한국 음력은 한국천문연구원 기준 데이터를 사용해요. 윤달(윤월)이 있는 해에는 해당 월이 두 번 나타날 수 있어요. 1900 ~ 2050년 범위를 지원합니다.</p>
      </aside>
    </div>
  )
}
