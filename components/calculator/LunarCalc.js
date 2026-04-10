'use client'
import { useState, useEffect } from 'react'
import KoreanLunarCalendar from 'korean-lunar-calendar'
import { INPUT_CLS } from '@/lib/constants'
import { pushParams, readParams } from '@/lib/urlParams'

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토']

// 십이지 띠 — 1900(경자·쥐)년 기준: 1900 % 12 = 4 → index 4 = 쥐
const ZODIAC = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양']
const ZODIAC_EMOJI = ['🐒', '🐓', '🐕', '🐗', '🐭', '🐂', '🐯', '🐰', '🐲', '🐍', '🐎', '🐑']

function getZodiac(year) {
  const idx = ((year % 12) + 12) % 12
  return `${ZODIAC_EMOJI[idx]} ${ZODIAC[idx]}띠`
}

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
  cal.setSolarDate(solar.year, solar.month, solar.day)
  const gapja = cal.getKoreanGapja()
  const ganji = cal.getChineseGapja()
  return { solar, gapja, ganji }
}

// 음력 월·일의 연도별(현재년도 ±2) 양력 날짜 계산
function getMultiYearSolar(lunarMonth, lunarDay, intercalation) {
  const currentYear = new Date().getFullYear()
  const results = []
  for (let y = currentYear - 1; y <= currentYear + 2; y++) {
    try {
      const cal = new KoreanLunarCalendar()
      cal.setLunarDate(y, lunarMonth, lunarDay, intercalation)
      const solar = cal.getSolarCalendar()
      if (solar && solar.year > 0) {
        results.push({ lunarYear: y, solar, isThisYear: y === currentYear })
      }
    } catch {
      // 해당 연도에 윤달이 없는 등 변환 불가한 경우 건너뜀
    }
  }
  return results
}

function padTwo(n) { return String(n).padStart(2, '0') }

export default function LunarCalc() {
  const [tab, setTab] = useState('solar')
  const [todayInfo, setTodayInfo] = useState(null)

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
  const [multiYearData, setMultiYearData] = useState([])

  useEffect(() => {
    // 오늘의 음력 날짜 자동 계산
    const t = new Date()
    try {
      const result = toSolarResult(t.getFullYear(), t.getMonth() + 1, t.getDate())
      setTodayInfo({ y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate(), lunar: result.lunar, gapja: result.gapja })
    } catch {}

    // URL 파라미터 복원
    const p = readParams()
    if (p.tab === 'solar' && p.solarYear && p.solarDay) {
      setTab('solar')
      setSolarYear(p.solarYear); setSolarMonth(p.solarMonth || '1'); setSolarDay(p.solarDay)
      try { setSolarResult(toSolarResult(Number(p.solarYear), Number(p.solarMonth || '1'), Number(p.solarDay))) } catch {}
    } else if (p.tab === 'lunar' && p.lunarYear && p.lunarDay) {
      setTab('lunar')
      setLunarYear(p.lunarYear); setLunarMonth(p.lunarMonth || '1'); setLunarDay(p.lunarDay)
      const intercalation = p.isIntercalation === '1'
      setIsIntercalation(intercalation)
      try {
        const lm = Number(p.lunarMonth || '1'), ld = Number(p.lunarDay)
        setLunarResult(toLunarResult(Number(p.lunarYear), lm, ld, intercalation))
        setMultiYearData(getMultiYearSolar(lm, ld, intercalation))
      } catch {}
    }
  }, [])

  const calcSolarToLunar = () => {
    setSolarError('')
    setSolarResult(null)
    const y = Number(solarYear), m = Number(solarMonth), d = Number(solarDay)
    if (!solarYear || !solarDay) { setSolarError('연도와 일을 입력해주세요.'); return }
    if (y < 1900 || y > 2050) { setSolarError('1900년 ~ 2050년 범위의 연도를 입력해주세요.'); return }
    if (d < 1 || d > 31) { setSolarError('일(日)은 1~31 범위로 입력해주세요.'); return }
    try {
      pushParams({ tab: 'solar', solarYear, solarMonth, solarDay })
      setSolarResult(toSolarResult(y, m, d))
    } catch {
      setSolarError('변환에 실패했어요. 날짜를 확인해주세요.')
    }
  }

  const calcLunarToSolar = () => {
    setLunarError('')
    setLunarResult(null)
    setMultiYearData([])
    const y = Number(lunarYear), m = Number(lunarMonth), d = Number(lunarDay)
    if (!lunarYear || !lunarDay) { setLunarError('연도와 일을 입력해주세요.'); return }
    if (y < 1900 || y > 2050) { setLunarError('1900년 ~ 2050년 범위의 연도를 입력해주세요.'); return }
    if (d < 1 || d > 30) { setLunarError('일(日)은 1~30 범위로 입력해주세요.'); return }
    try {
      pushParams({ tab: 'lunar', lunarYear, lunarMonth, lunarDay, isIntercalation: isIntercalation ? '1' : '0' })
      setLunarResult(toLunarResult(y, m, d, isIntercalation))
      setMultiYearData(getMultiYearSolar(m, d, isIntercalation))
    } catch {
      setLunarError('변환에 실패했어요. 날짜를 확인해주세요.')
    }
  }

  const formatLunarDate = (lunar) => {
    const intercalStr = lunar.intercalation ? '윤' : ''
    return `${lunar.year}년 ${intercalStr}${lunar.month}월 ${lunar.day}일`
  }
  const formatSolarDate = (solar) => `${solar.year}년 ${solar.month}월 ${solar.day}일`
  const formatSolarFull = (solar) => {
    const dt = new Date(solar.year, solar.month - 1, solar.day)
    return `${solar.year}.${padTwo(solar.month)}.${padTwo(solar.day)} (${DAYS_KO[dt.getDay()]})`
  }
  const formatLunarFull = (lunar) => {
    const intercalStr = lunar.intercalation ? '(윤달) ' : ''
    return `${lunar.year}.${padTwo(lunar.month)}.${padTwo(lunar.day)} ${intercalStr}`
  }

  return (
    <div className="space-y-4">

      {/* 오늘의 음력 날짜 */}
      {todayInfo && (
        <div className="bg-white border border-stone-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-stone-400 mb-1">오늘의 음력 날짜</p>
            <p className="text-sm font-black text-stone-800">
              음력 {todayInfo.lunar.year}년 {todayInfo.lunar.intercalation ? '윤' : ''}{todayInfo.lunar.month}월 {todayInfo.lunar.day}일
              {todayInfo.lunar.intercalation && <span className="ml-1.5 text-amber-500 text-[10px]">(윤달)</span>}
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">{todayInfo.gapja.year} · {getZodiac(todayInfo.lunar.year)}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-stone-400 mb-0.5">양력</p>
            <p className="text-xs font-bold text-stone-600">{todayInfo.y}년 {todayInfo.m}월 {todayInfo.d}일</p>
          </div>
        </div>
      )}

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
                  placeholder="예: 2026" min="1900" max="2050"
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

              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">음력 날짜</p>
                <p className="text-2xl font-black mb-1">{formatLunarDate(solarResult.lunar)}</p>
                {solarResult.lunar.intercalation && (
                  <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">윤달</span>
                )}
              </div>

              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['음력 (숫자)', formatLunarFull(solarResult.lunar)],
                    ['띠 (십이지)', getZodiac(solarResult.lunar.year)],
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
                  placeholder="예: 2026" min="1900" max="2050"
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

              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs opacity-75 mb-1">양력 날짜</p>
                <p className="text-2xl font-black">{formatSolarDate(lunarResult.solar)}</p>
                <p className="text-sm opacity-80 mt-1">{formatSolarFull(lunarResult.solar)}</p>
              </div>

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

          {/* 연도별 양력 날짜 — 음력 생일·기일 매년 확인용 */}
          {multiYearData.length > 0 && (
            <section className="bg-white border border-stone-200 rounded-2xl p-6">
              <h2 className="text-sm font-black text-stone-800 mb-3 pb-3 border-b-2 border-amber-400">연도별 양력 날짜</h2>
              <p className="text-xs text-stone-400 mb-4">
                음력 {lunarMonth}월 {lunarDay}일{isIntercalation ? ' (윤달)' : ''}의 연도별 양력 날짜예요.
                생일·기일을 매년 확인하는 데 활용하세요.
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {multiYearData.map(({ lunarYear, solar, isThisYear }) => {
                    const dt = new Date(solar.year, solar.month - 1, solar.day)
                    return (
                      <tr key={lunarYear} className={`border-b border-stone-100 last:border-none ${isThisYear ? 'bg-amber-50' : ''}`}>
                        <td className="py-2.5 pl-2 text-xs text-stone-500 whitespace-nowrap">
                          {lunarYear}년
                          {isThisYear && <span className="ml-1.5 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">올해</span>}
                        </td>
                        <td className="py-2.5 pr-2 text-right text-xs font-bold text-stone-700">
                          {solar.year}.{padTwo(solar.month)}.{padTwo(solar.day)} ({DAYS_KO[dt.getDay()]})
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 음력 변환 안내</h3>
        <p>한국 음력은 <strong className="text-stone-600">한국천문연구원(KASI)</strong> 기준 역법 데이터를 사용해요. 윤달이 있는 해에는 같은 월이 두 번 나타날 수 있으며, 연도별 양력 날짜 표에서 윤달이 없는 해는 해당 항목이 생략될 수 있어요. 지원 범위는 1900 ~ 2050년입니다.</p>
      </aside>
    </div>
  )
}
