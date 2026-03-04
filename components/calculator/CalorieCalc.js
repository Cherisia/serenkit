'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

// Mifflin-St Jeor 공식 (가장 정확도 높은 표준)
function calcBMR(gender, weight, height, age) {
  const base = 10 * weight + 6.25 * height - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

const ACTIVITY_LEVELS = [
  { value: 1.2,   label: '거의 안 움직임',      desc: '주로 앉아서 생활, 운동 거의 없음' },
  { value: 1.375, label: '가벼운 활동',          desc: '주 1~3회 가벼운 운동' },
  { value: 1.55,  label: '보통 활동',            desc: '주 3~5회 중강도 운동' },
  { value: 1.725, label: '활동적',               desc: '주 6~7회 고강도 운동' },
  { value: 1.9,   label: '매우 활동적',          desc: '하루 2회 운동 또는 육체 노동' },
]

const GOALS = [
  { key: 'loss',    label: '체중 감량',  delta: -500, color: 'text-sky-500',     bg: 'bg-sky-50',     border: 'border-sky-200',     desc: '주 약 0.5kg 감량' },
  { key: 'maintain',label: '체중 유지',  delta: 0,    color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', desc: '현재 체중 유지' },
  { key: 'gain',    label: '근육 증량',  delta: 500,  color: 'text-orange-500',  bg: 'bg-orange-50',  border: 'border-orange-200',  desc: '주 약 0.5kg 증량' },
]

function MacroBar({ label, g, kcal, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-3 text-center`}>
      <p className="text-[10px] text-stone-400 mb-0.5">{label}</p>
      <p className={`text-lg font-black ${color}`}>{g}g</p>
      <p className="text-[10px] text-stone-400">{kcal} kcal</p>
    </div>
  )
}

export default function CalorieCalc() {
  const [gender,   setGender]   = useState('male')
  const [age,      setAge]      = useState('')
  const [height,   setHeight]   = useState('')
  const [weight,   setWeight]   = useState('')
  const [activity, setActivity] = useState(1.55)
  const [result,   setResult]   = useState(null)

  const canCalc = age && height && weight &&
    Number(age) > 0 && Number(height) > 0 && Number(weight) > 0

  useEffect(() => {
    const p = readParams()
    if (p.age && p.height && p.weight) {
      const g = p.gender || 'male', act = Number(p.activity) || 1.55
      setGender(g); setAge(p.age); setHeight(p.height); setWeight(p.weight); setActivity(act)
      const bmr  = Math.round(calcBMR(g, Number(p.weight), Number(p.height), Number(p.age)))
      const tdee = Math.round(bmr * act)
      const goals = GOALS.map(go => ({ ...go, kcal: Math.max(1200, tdee + go.delta) }))
      const macros = (kcal) => ({ carb: Math.round(kcal * 0.4 / 4), protein: Math.round(kcal * 0.3 / 4), fat: Math.round(kcal * 0.3 / 9) })
      setResult({ bmr, tdee, goals, macros })
    }
  }, [])

  const calculate = () => {
    if (!canCalc) return
    pushParams({ gender, age, height, weight, activity })
    const bmr  = Math.round(calcBMR(gender, Number(weight), Number(height), Number(age)))
    const tdee = Math.round(bmr * activity)

    // 목표별 칼로리
    const goals = GOALS.map(g => ({ ...g, kcal: Math.max(1200, tdee + g.delta) }))

    // 권장 영양소 비율 (탄40:단30:지30)
    const macros = (kcal) => ({
      carb:    Math.round(kcal * 0.4  / 4),
      protein: Math.round(kcal * 0.3  / 4),
      fat:     Math.round(kcal * 0.3  / 9),
    })

    setResult({ bmr, tdee, goals, macros })
  }

  return (
    <div className="space-y-4">

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">신체 정보 입력</h2>

        <div className="space-y-4">
          {/* 성별 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">성별</label>
            <div className="grid grid-cols-2 gap-2">
              {[['male','남성'],['female','여성']].map(([v, l]) => (
                <button key={v} onClick={() => setGender(v)}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    gender === v
                      ? 'bg-amber-400 text-white border-amber-400'
                      : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-amber-300 hover:text-amber-600'
                  }`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* 나이 / 키 / 몸무게 */}
          {[
            { label: '나이', state: age,    setter: setAge,    unit: '세',  ph: '예) 30', min: 10, max: 100 },
            { label: '키',   state: height, setter: setHeight, unit: 'cm',  ph: '예) 170', min: 100, max: 250 },
            { label: '몸무게', state: weight, setter: setWeight, unit: 'kg', ph: '예) 65', min: 20, max: 300 },
          ].map(({ label, state, setter, unit, ph, min, max }) => (
            <div key={label}>
              <label className="block text-xs font-bold text-stone-600 mb-1.5">
                {label} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number" value={state} onChange={e => setter(e.target.value)}
                  placeholder={ph} min={min} max={max}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-10 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">{unit}</span>
              </div>
            </div>
          ))}

          {/* 활동 수준 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">활동 수준</label>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map(lv => (
                <button key={lv.value} onClick={() => setActivity(lv.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    activity === lv.value
                      ? 'bg-amber-50 border-amber-400'
                      : 'bg-stone-50 border-stone-200 hover:border-amber-300'
                  }`}>
                  <span className={`w-3 h-3 rounded-full border-2 shrink-0 transition-all ${
                    activity === lv.value ? 'bg-amber-400 border-amber-400' : 'border-stone-300'
                  }`} />
                  <span className="flex-1">
                    <span className={`block text-xs font-bold ${activity === lv.value ? 'text-amber-600' : 'text-stone-700'}`}>
                      {lv.label}
                    </span>
                    <span className="block text-[10px] text-stone-400 mt-0.5">{lv.desc}</span>
                  </span>
                  <span className="text-[10px] text-stone-300 font-mono">×{lv.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={calculate} disabled={!canCalc}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {/* 결과 */}
      {result && (
        <>
          {/* BMR / TDEE */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">기초대사량 결과</h2>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4 text-center">
                <p className="text-xs text-stone-400 mb-1">기초대사량 (BMR)</p>
                <p className="text-3xl font-black text-amber-500 leading-tight">
                  {result.bmr.toLocaleString()}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">kcal / 일</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-rose-50 border border-orange-100 rounded-xl p-4 text-center">
                <p className="text-xs text-stone-400 mb-1">하루 필요 칼로리 (TDEE)</p>
                <p className="text-3xl font-black text-orange-500 leading-tight">
                  {result.tdee.toLocaleString()}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">kcal / 일</p>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 text-center leading-relaxed">
              BMR은 아무것도 안 해도 소비되는 칼로리, TDEE는 활동량을 반영한 하루 총 소비 칼로리예요.
            </p>
          </section>

          {/* 목표별 칼로리 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-sky-400">목표별 권장 칼로리</h2>
            <div className="space-y-3">
              {result.goals.map(g => {
                const m = result.macros(g.kcal)
                return (
                  <div key={g.key} className={`${g.bg} ${g.border} border rounded-2xl p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className={`text-xs font-black ${g.color}`}>{g.label}</span>
                        <span className="text-[10px] text-stone-400 ml-2">{g.desc}</span>
                      </div>
                      <span className={`text-xl font-black ${g.color}`}>
                        {g.kcal.toLocaleString()} <span className="text-xs font-bold">kcal</span>
                      </span>
                    </div>
                    {/* 영양소 */}
                    <div className="grid grid-cols-3 gap-2">
                      <MacroBar label="탄수화물" g={m.carb}    kcal={m.carb * 4}    color="text-amber-500"   bg="bg-white/70" />
                      <MacroBar label="단백질"   g={m.protein} kcal={m.protein * 4} color="text-rose-500"    bg="bg-white/70" />
                      <MacroBar label="지방"     g={m.fat}     kcal={m.fat * 9}     color="text-violet-500"  bg="bg-white/70" />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 칼로리 참고표 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-violet-400">주요 식품 칼로리 참고</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                ['공기밥 (210g)', '300 kcal'],
                ['달걀 1개',      '80 kcal'],
                ['닭가슴살 100g', '109 kcal'],
                ['바나나 1개',    '90 kcal'],
                ['아메리카노',    '10 kcal'],
                ['라면 1봉',      '500 kcal'],
              ].map(([food, kcal]) => (
                <div key={food} className="flex justify-between py-2 border-b border-stone-100 last:border-none">
                  <span className="text-xs text-stone-400">{food}</span>
                  <span className="text-xs font-bold text-stone-600">{kcal}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준 안내</h3>
        <p>기초대사량은 Mifflin-St Jeor 공식(가장 정확도 높은 표준 공식)을 사용합니다. TDEE는 BMR에 활동 계수를 곱한 값이에요. 영양소 비율은 탄수화물 40% · 단백질 30% · 지방 30% 기준이며, 개인 목표와 건강 상태에 따라 다를 수 있습니다.</p>
      </aside>

    </div>
  )
}
