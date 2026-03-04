'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

function calcWeight(height, weight, gender) {
  const h = Number(height)
  const w = Number(weight)
  const hm = h / 100 // cm → m

  // BMI
  const bmi = w / (hm * hm)

  // 표준 체중 (Broca 변형법)
  const standard = gender === 'male'
    ? (h - 100) * 0.9
    : (h - 100) * 0.85

  // 적정 체중 범위 (BMI 18.5 ~ 22.9)
  const minWeight = 18.5 * hm * hm
  const maxWeight = 22.9 * hm * hm

  // BMI 판정
  let category, color, bgColor, borderColor
  if (bmi < 18.5) {
    category = '저체중'; color = 'text-sky-500'; bgColor = 'bg-sky-50'; borderColor = 'border-sky-200'
  } else if (bmi < 23) {
    category = '정상'; color = 'text-emerald-500'; bgColor = 'bg-emerald-50'; borderColor = 'border-emerald-200'
  } else if (bmi < 25) {
    category = '과체중'; color = 'text-yellow-500'; bgColor = 'bg-yellow-50'; borderColor = 'border-yellow-200'
  } else if (bmi < 30) {
    category = '비만 1단계'; color = 'text-orange-500'; bgColor = 'bg-orange-50'; borderColor = 'border-orange-200'
  } else if (bmi < 35) {
    category = '비만 2단계'; color = 'text-red-500'; bgColor = 'bg-red-50'; borderColor = 'border-red-200'
  } else {
    category = '고도비만'; color = 'text-rose-600'; bgColor = 'bg-rose-50'; borderColor = 'border-rose-200'
  }

  // 현재 체중과 표준 체중 차이
  const diff = w - standard
  const diffText = diff > 0
    ? `표준 체중보다 ${diff.toFixed(1)}kg 많아요`
    : diff < 0
    ? `표준 체중보다 ${Math.abs(diff).toFixed(1)}kg 적어요`
    : '표준 체중과 같아요'

  // BMI 게이지 위치 (0~40 범위에서 백분율)
  const gaugeMax = 40
  const bmiPos = Math.min((bmi / gaugeMax) * 100, 100)

  return { bmi, category, color, bgColor, borderColor, standard, minWeight, maxWeight, diff, diffText, bmiPos }
}

const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
]

export default function WeightCalc() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('male')
  const [result, setResult] = useState(null)

  const canCalc = height && weight && Number(height) > 0 && Number(weight) > 0

  useEffect(() => {
    const p = readParams()
    if (p.height && p.weight) {
      const g = p.gender || 'male'
      setHeight(p.height); setWeight(p.weight); setGender(g)
      setResult(calcWeight(p.height, p.weight, g))
    }
  }, [])

  const calculate = () => {
    if (!canCalc) return
    pushParams({ height, weight, gender })
    setResult(calcWeight(height, weight, gender))
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
              {GENDER_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => setGender(opt.value)}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    gender === opt.value
                      ? 'bg-amber-400 text-white border-amber-400'
                      : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-amber-300 hover:text-amber-600'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 키 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              키 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number" value={height} onChange={e => setHeight(e.target.value)}
                placeholder="예) 170"
                min="100" max="250"
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">cm</span>
            </div>
          </div>

          {/* 몸무게 */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">
              몸무게 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number" value={weight} onChange={e => setWeight(e.target.value)}
                placeholder="예) 65"
                min="20" max="300"
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">kg</span>
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
          {/* BMI 핵심 결과 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">BMI 결과</h2>

            <div className={`${result.bgColor} ${result.borderColor} border rounded-2xl p-5 text-center mb-5`}>
              <p className="text-xs text-stone-400 mb-1">체질량지수 (BMI)</p>
              <p className={`text-4xl font-black ${result.color} leading-tight`}>
                {result.bmi.toFixed(1)}
              </p>
              <p className={`text-sm font-black mt-1 ${result.color}`}>{result.category}</p>
            </div>

            {/* BMI 게이지 */}
            <div className="mb-2">
              <div className="relative h-4 rounded-full overflow-hidden"
                style={{ background: 'linear-gradient(to right, #38bdf8 0%, #34d399 25%, #facc15 42%, #fb923c 55%, #ef4444 75%, #e11d48 100%)' }}>
                <div className="absolute top-0 w-2 h-4 bg-white border-2 border-stone-700 rounded-full -translate-x-1/2 transition-all"
                  style={{ left: `${result.bmiPos}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 px-0.5">
                <span>저체중<br/>~18.5</span>
                <span className="text-center">정상<br/>~23</span>
                <span className="text-center">과체중<br/>~25</span>
                <span className="text-center">비만<br/>~35</span>
                <span className="text-right">고도비만<br/>35~</span>
              </div>
            </div>
          </section>

          {/* 체중 상세 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-sky-400">체중 분석</h2>
            <table className="w-full">
              <tbody>
                {[
                  { label: '현재 체중',     value: `${Number(weight).toFixed(1)} kg`, sub: result.diffText },
                  { label: '표준 체중',     value: `${result.standard.toFixed(1)} kg`, sub: 'Broca 변형법 기준' },
                  { label: '적정 범위 (하)', value: `${result.minWeight.toFixed(1)} kg`, sub: 'BMI 18.5 기준' },
                  { label: '적정 범위 (상)', value: `${result.maxWeight.toFixed(1)} kg`, sub: 'BMI 22.9 기준' },
                ].map(({ label, value, sub }) => (
                  <tr key={label} className="border-b border-stone-100 last:border-none">
                    <td className="py-2.5">
                      <p className="text-xs text-stone-400">{label}</p>
                      {sub && <p className="text-[10px] text-stone-300 mt-0.5">{sub}</p>}
                    </td>
                    <td className="py-2.5 text-right text-sm font-bold text-stone-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 조언 메시지 */}
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-3 pb-3 border-b-2 border-violet-400">목표 체중 가이드</h2>
            {result.bmi < 18.5 && (
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <p className="font-bold text-sky-600 mb-1">저체중 구간입니다</p>
                <p>표준 체중({result.standard.toFixed(1)}kg)까지 <span className="font-bold text-sky-600">{Math.abs(result.diff).toFixed(1)}kg</span> 증량이 필요해요. 균형 잡힌 식단과 근력 운동을 통해 건강하게 체중을 늘려보세요.</p>
              </div>
            )}
            {result.bmi >= 18.5 && result.bmi < 23 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <p className="font-bold text-emerald-600 mb-1">정상 범위입니다</p>
                <p>현재 체중은 BMI 정상 범위({result.minWeight.toFixed(1)}~{result.maxWeight.toFixed(1)}kg)에 속해요. 지금처럼 규칙적인 운동과 균형 잡힌 식습관을 유지하세요!</p>
              </div>
            )}
            {result.bmi >= 23 && result.bmi < 25 && (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <p className="font-bold text-yellow-600 mb-1">과체중 구간입니다</p>
                <p>정상 범위 최대({result.maxWeight.toFixed(1)}kg)까지 <span className="font-bold text-yellow-600">{result.diff.toFixed(1)}kg</span> 감량이 필요해요. 유산소 운동과 식단 조절을 시작해보세요.</p>
              </div>
            )}
            {result.bmi >= 25 && (
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <p className="font-bold text-orange-600 mb-1">{result.category} 구간입니다</p>
                <p>정상 범위({result.maxWeight.toFixed(1)}kg)까지 <span className="font-bold text-orange-600">{result.diff.toFixed(1)}kg</span> 감량이 필요해요. 전문 의료진과 상담해 체계적인 관리 계획을 세워보세요.</p>
              </div>
            )}
          </section>
        </>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준 안내</h3>
        <p>BMI(체질량지수)는 WHO 기준이며, 한국인 기준 23 이상을 과체중으로 분류합니다. 표준 체중은 Broca 변형법(남성: (키-100)×0.9, 여성: (키-100)×0.85)을 사용합니다. 본 계산기는 참고용이며 정확한 건강 상태는 전문 의료진과 상담하세요.</p>
      </aside>

    </div>
  )
}
