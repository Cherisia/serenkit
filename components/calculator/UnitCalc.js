'use client'
import { useState, useCallback, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

// ── 카테고리 정의 ──────────────────────────────────────────
// base unit 기준 factor (온도는 special 처리)
const CATEGORIES = [
  {
    key: 'length', label: '길이', icon: '📏',
    units: [
      { key: 'mm',   label: 'mm',    name: '밀리미터',  factor: 1 },
      { key: 'cm',   label: 'cm',    name: '센티미터',  factor: 10 },
      { key: 'm',    label: 'm',     name: '미터',      factor: 1000 },
      { key: 'km',   label: 'km',    name: '킬로미터',  factor: 1_000_000 },
      { key: 'in',   label: 'in',    name: '인치',      factor: 25.4 },
      { key: 'ft',   label: 'ft',    name: '피트',      factor: 304.8 },
      { key: 'yd',   label: 'yd',    name: '야드',      factor: 914.4 },
      { key: 'mi',   label: 'mi',    name: '마일',      factor: 1_609_344 },
    ],
  },
  {
    key: 'weight', label: '무게', icon: '⚖️',
    units: [
      { key: 'mg',  label: 'mg',  name: '밀리그램', factor: 1 },
      { key: 'g',   label: 'g',   name: '그램',     factor: 1_000 },
      { key: 'kg',  label: 'kg',  name: '킬로그램', factor: 1_000_000 },
      { key: 't',   label: 't',   name: '톤',       factor: 1_000_000_000 },
      { key: 'oz',  label: 'oz',  name: '온스',     factor: 28_349.5 },
      { key: 'lb',  label: 'lb',  name: '파운드',   factor: 453_592 },
    ],
  },
  {
    key: 'area', label: '넓이', icon: '📐',
    units: [
      { key: 'mm2',  label: 'mm²',  name: '제곱밀리미터', factor: 1 },
      { key: 'cm2',  label: 'cm²',  name: '제곱센티미터', factor: 100 },
      { key: 'm2',   label: 'm²',   name: '제곱미터',     factor: 1_000_000 },
      { key: 'km2',  label: 'km²',  name: '제곱킬로미터', factor: 1e12 },
      { key: 'py',   label: '평',   name: '평',           factor: 3_305_785.12 },
      { key: 'ha',   label: 'ha',   name: '헥타르',       factor: 10_000_000_000 },
      { key: 'ac',   label: 'ac',   name: '에이커',       factor: 4_046_856_422 },
    ],
  },
  {
    key: 'volume', label: '부피', icon: '🧪',
    units: [
      { key: 'ml',   label: 'mL',    name: '밀리리터',  factor: 1 },
      { key: 'l',    label: 'L',     name: '리터',      factor: 1_000 },
      { key: 'cc',   label: 'cc',    name: 'cc',        factor: 1 },
      { key: 'cup',  label: '컵',    name: '컵 (200mL)', factor: 200 },
      { key: 'floz', label: 'fl oz', name: '액량 온스',  factor: 29.5735 },
      { key: 'gal',  label: 'gal',   name: '갤런',       factor: 3_785.41 },
    ],
  },
  {
    key: 'temp', label: '온도', icon: '🌡️',
    special: true,
    units: [
      { key: 'c', label: '°C', name: '섭씨' },
      { key: 'f', label: '°F', name: '화씨' },
      { key: 'k', label: 'K',  name: '켈빈' },
    ],
  },
  {
    key: 'speed', label: '속도', icon: '🚀',
    units: [
      { key: 'ms',   label: 'm/s',   name: '미터/초',     factor: 1 },
      { key: 'kmh',  label: 'km/h',  name: '킬로미터/시', factor: 1 / 3.6 },
      { key: 'mph',  label: 'mph',   name: '마일/시',     factor: 1 / 2.23694 },
      { key: 'kt',   label: 'knot',  name: '노트',        factor: 1 / 1.94384 },
    ],
  },
  {
    key: 'data', label: '데이터', icon: '💾',
    units: [
      { key: 'bit',  label: 'bit',  name: '비트',     factor: 1 },
      { key: 'byte', label: 'byte', name: '바이트',   factor: 8 },
      { key: 'kb',   label: 'KB',   name: '킬로바이트', factor: 8_192 },
      { key: 'mb',   label: 'MB',   name: '메가바이트', factor: 8_388_608 },
      { key: 'gb',   label: 'GB',   name: '기가바이트', factor: 8_589_934_592 },
      { key: 'tb',   label: 'TB',   name: '테라바이트', factor: 8_796_093_022_208 },
    ],
  },
]

// ── 온도 변환 ──────────────────────────────────────────────
function convertTemp(value, fromKey) {
  const v = Number(value)
  let celsius
  if (fromKey === 'c') celsius = v
  else if (fromKey === 'f') celsius = (v - 32) / 1.8
  else celsius = v - 273.15  // kelvin

  return {
    c: celsius,
    f: celsius * 1.8 + 32,
    k: celsius + 273.15,
  }
}

// ── 숫자 포맷 ──────────────────────────────────────────────
function fmt(n) {
  if (n === 0) return '0'
  const abs = Math.abs(n)
  if (abs >= 1e12)  return (n / 1e12).toPrecision(6) + ' × 10¹²'
  if (abs >= 1e9)   return (n / 1e9).toPrecision(6)  + ' × 10⁹'
  if (abs < 0.0001 && abs > 0) return n.toExponential(4)
  // 소수점 이하 불필요한 0 제거
  const str = parseFloat(n.toPrecision(8)).toString()
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// ── 컴포넌트 ──────────────────────────────────────────────
export default function UnitCalc() {
  const [catKey,   setCatKey]   = useState('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [inputVal, setInputVal] = useState('')

  useEffect(() => {
    const p = readParams()
    if (p.catKey) {
      setCatKey(p.catKey)
      if (p.fromUnit) setFromUnit(p.fromUnit)
      if (p.inputVal) setInputVal(p.inputVal)
    }
  }, [])

  useEffect(() => {
    if (inputVal) pushParams({ catKey, fromUnit, inputVal })
  }, [catKey, fromUnit, inputVal])

  const category = CATEGORIES.find(c => c.key === catKey)

  const handleCatChange = (key) => {
    const newCat = CATEGORIES.find(c => c.key === key)
    setCatKey(key)
    setFromUnit(newCat.units[0].key)
    setInputVal('')
  }

  const handleFromUnit = (key) => {
    setFromUnit(key)
  }

  // 결과 계산
  const results = useCallback(() => {
    if (!inputVal || isNaN(Number(inputVal))) return null
    const v = Number(inputVal)

    if (category.special) {
      // 온도
      const temps = convertTemp(v, fromUnit)
      return category.units.map(u => ({
        ...u,
        result: temps[u.key],
      }))
    }

    // 일반: base unit(mm, mg ...) 기준
    const fromFactor = category.units.find(u => u.key === fromUnit)?.factor ?? 1
    const baseValue  = v * fromFactor

    return category.units.map(u => ({
      ...u,
      result: baseValue / u.factor,
    }))
  }, [inputVal, catKey, fromUnit])

  const res = results()

  return (
    <div className="space-y-4">

      {/* 카테고리 선택 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-amber-400">단위 종류 선택</h2>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map(c => (
            <button key={c.key} onClick={() => handleCatChange(c.key)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                catKey === c.key
                  ? 'bg-amber-400 text-white border-amber-400 shadow-sm'
                  : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-amber-300 hover:text-amber-600'
              }`}>
              <span className="text-lg leading-none">{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-orange-400">값 입력</h2>

        {/* 단위 선택 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {category.units.map(u => (
            <button key={u.key} onClick={() => handleFromUnit(u.key)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl border transition-all ${
                fromUnit === u.key
                  ? 'bg-amber-400 text-white border-amber-400'
                  : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-amber-300 hover:text-amber-600'
              }`}>
              <span className="text-sm font-black leading-none">{u.label}</span>
              <span className={`text-[10px] leading-none ${fromUnit === u.key ? 'text-white/80' : 'text-stone-400'}`}>{u.name}</span>
            </button>
          ))}
        </div>

        {/* 숫자 입력 */}
        <div className="relative">
          <input
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="변환할 값을 입력하세요"
            className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-4 py-3 pr-16 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-500">
            {category.units.find(u => u.key === fromUnit)?.label}
          </span>
        </div>
      </section>

      {/* 결과 */}
      {res && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-sky-400">변환 결과</h2>
          <div className="space-y-1">
            {res.map(u => {
              const isFrom = u.key === fromUnit
              return (
                <div key={u.key}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    isFrom ? 'bg-amber-50 border border-amber-200' : 'hover:bg-stone-50'
                  }`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black w-10 ${isFrom ? 'text-amber-500' : 'text-stone-400'}`}>
                      {u.label}
                    </span>
                    <span className="text-[11px] text-stone-300">{u.name}</span>
                  </div>
                  <span className={`text-sm font-black tabular-nums ${isFrom ? 'text-amber-500' : 'text-stone-700'}`}>
                    {fmt(u.result)}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 사용 안내</h3>
        <p>위에서 단위 종류를 선택하고, 변환할 단위 버튼을 누른 뒤 값을 입력하면 모든 단위로 자동 변환됩니다. 1평 = 3.30579 m² 기준이며, 온도는 공식 환산식을 사용합니다.</p>
      </aside>

    </div>
  )
}
