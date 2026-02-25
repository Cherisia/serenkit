'use client'
import { useState } from 'react'

// 12간지 띠
const ZODIACS = [
  { year: 0, name: '원숭이', emoji: '🐒', element: '금', compat: ['쥐', '용'] },
  { year: 1, name: '닭',     emoji: '🐓', element: '금', compat: ['소', '뱀'] },
  { year: 2, name: '개',     emoji: '🐕', element: '토', compat: ['호랑이', '말'] },
  { year: 3, name: '돼지',   emoji: '🐖', element: '수', compat: ['토끼', '양'] },
  { year: 4, name: '쥐',     emoji: '🐭', element: '수', compat: ['용', '원숭이'] },
  { year: 5, name: '소',     emoji: '🐮', element: '토', compat: ['뱀', '닭'] },
  { year: 6, name: '호랑이', emoji: '🐯', element: '목', compat: ['말', '개'] },
  { year: 7, name: '토끼',   emoji: '🐰', element: '목', compat: ['양', '돼지'] },
  { year: 8, name: '용',     emoji: '🐲', element: '토', compat: ['쥐', '원숭이'] },
  { year: 9, name: '뱀',     emoji: '🐍', element: '화', compat: ['소', '닭'] },
  { year: 10, name: '말',    emoji: '🐴', element: '화', compat: ['호랑이', '개'] },
  { year: 11, name: '양',    emoji: '🐑', element: '토', compat: ['토끼', '돼지'] },
]

// 서양 별자리
const STAR_SIGNS = [
  { name: '염소자리', emoji: '♑', en: 'Capricorn', start: [1,1],  end: [1,19],  trait: '책임감 있고 야망이 넘쳐요' },
  { name: '물병자리', emoji: '♒', en: 'Aquarius',  start: [1,20], end: [2,18],  trait: '독립적이고 창의적이에요' },
  { name: '물고기자리',emoji:'♓', en: 'Pisces',    start: [2,19], end: [3,20],  trait: '감수성이 풍부하고 공감 능력이 뛰어나요' },
  { name: '양자리',   emoji: '♈', en: 'Aries',     start: [3,21], end: [4,19],  trait: '열정적이고 리더십이 강해요' },
  { name: '황소자리', emoji: '♉', en: 'Taurus',    start: [4,20], end: [5,20],  trait: '안정적이고 신뢰할 수 있어요' },
  { name: '쌍둥이자리',emoji:'♊', en: 'Gemini',    start: [5,21], end: [6,21],  trait: '호기심이 많고 재치 있어요' },
  { name: '게자리',   emoji: '♋', en: 'Cancer',    start: [6,22], end: [7,22],  trait: '세심하고 가족을 소중히 여겨요' },
  { name: '사자자리', emoji: '♌', en: 'Leo',       start: [7,23], end: [8,22],  trait: '자신감 넘치고 카리스마 있어요' },
  { name: '처녀자리', emoji: '♍', en: 'Virgo',     start: [8,23], end: [9,22],  trait: '꼼꼼하고 분석적이에요' },
  { name: '천칭자리', emoji: '♎', en: 'Libra',     start: [9,23], end: [10,23], trait: '균형을 추구하고 외교적이에요' },
  { name: '전갈자리', emoji: '♏', en: 'Scorpio',   start: [10,24],end: [11,22], trait: '강렬하고 직관력이 뛰어나요' },
  { name: '사수자리', emoji: '♐', en: 'Sagittarius',start:[11,23],end: [12,21], trait: '자유롭고 모험을 즐겨요' },
  { name: '염소자리', emoji: '♑', en: 'Capricorn', start: [12,22],end: [12,31], trait: '책임감 있고 야망이 넘쳐요' },
]

// 음력 기반 띠 계산 (양력 기준, 음력 설날 이전 출생은 전년도 띠)
// 간략화: 2월 4일(입춘) 기준으로 구분
function getZodiac(birthDate) {
  const d = new Date(birthDate)
  let year = d.getFullYear()
  // 1월~2월 3일 출생은 전년도 띠로 계산 (입춘 기준)
  if (d.getMonth() === 0 || (d.getMonth() === 1 && d.getDate() < 4)) year--
  const idx = ((year - 2004) % 12 + 12) % 12  // 2004년 = 원숭이
  return { ...ZODIACS[idx], year }
}

function getStarSign(birthDate) {
  const d = new Date(birthDate)
  const m = d.getMonth() + 1
  const day = d.getDate()
  return STAR_SIGNS.find(s => {
    const [sm, sd] = s.start
    const [em, ed] = s.end
    return (m === sm && day >= sd) || (m === em && day <= ed)
  }) || STAR_SIGNS[0]
}

const ELEMENTS = { 목: '🌳', 화: '🔥', 토: '🌍', 금: '⚙️', 수: '💧' }
const ELEMENT_COLORS = {
  목: 'from-green-400 to-emerald-500',
  화: 'from-red-400 to-orange-500',
  토: 'from-yellow-500 to-amber-600',
  금: 'from-slate-400 to-zinc-500',
  수: 'from-blue-400 to-cyan-500',
}

export default function ZodiacCalc() {
  const [birth, setBirth] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!birth) return
    const zodiac = getZodiac(birth)
    const star = getStarSign(birth)
    setResult({ zodiac, star })
  }

  return (
    <div className="space-y-4">
      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">생년월일 입력</h2>
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1.5">생년월일 <span className="text-red-400">*</span></label>
          <input type="date" value={birth} onChange={e => setBirth(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
        </div>
        <button onClick={calculate} disabled={!birth}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          확인하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <>
          {/* 띠 결과 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">🐾 나의 띠</h2>
            <div className={`bg-gradient-to-br ${ELEMENT_COLORS[result.zodiac.element]} rounded-2xl p-6 text-white text-center mb-4`}>
              <div className="text-6xl mb-2">{result.zodiac.emoji}</div>
              <div className="text-2xl font-black mb-1">{result.zodiac.name}띠</div>
              <div className="text-sm opacity-80">{ELEMENTS[result.zodiac.element]} {result.zodiac.element}(木火土金水) 기운</div>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['오행', `${ELEMENTS[result.zodiac.element]} ${result.zodiac.element}`],
                  ['궁합 좋은 띠', result.zodiac.compat.join(', ')],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-stone-100 last:border-none">
                    <td className="py-2.5 text-xs text-stone-400">{k}</td>
                    <td className="py-2.5 text-right text-xs font-bold text-stone-700">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 별자리 결과 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-purple-400">✨ 나의 별자리</h2>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center mb-4">
              <div className="text-6xl mb-2">{result.star.emoji}</div>
              <div className="text-2xl font-black mb-1">{result.star.name}</div>
              <div className="text-sm opacity-80">{result.star.en}</div>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                <span className="font-bold text-purple-600">{result.star.name}</span>인 당신은 {result.star.trait}
              </p>
            </div>
          </section>
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 띠 계산 기준</h3>
        <p>띠는 음력 설날(입춘, 2월 4일경)을 기준으로 바뀝니다. 1~2월 초 출생자는 전년도 띠로 계산될 수 있어요.</p>
      </aside>
    </div>
  )
}
