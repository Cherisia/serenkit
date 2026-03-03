'use client'

import { useState } from 'react'
import { getTextColor } from '@/lib/colorUtils'

const DIRECTIONS = [
  { label: '→ 오른쪽', value: 'to right', icon: '→' },
  { label: '↓ 아래', value: 'to bottom', icon: '↓' },
  { label: '↗ 오른쪽 위', value: 'to top right', icon: '↗' },
  { label: '↘ 오른쪽 아래', value: 'to bottom right', icon: '↘' },
  { label: '← 왼쪽', value: 'to left', icon: '←' },
  { label: '↑ 위', value: 'to top', icon: '↑' },
  { label: '↙ 왼쪽 아래', value: 'to bottom left', icon: '↙' },
  { label: '↖ 왼쪽 위', value: 'to top left', icon: '↖' },
]

const TYPES = [
  { label: '선형 (linear)', value: 'linear' },
  { label: '방사형 (radial)', value: 'radial' },
  { label: '원뿔형 (conic)', value: 'conic' },
]

const PRESETS = [
  { name: '오로라', stops: ['#6366f1', '#8b5cf6', '#ec4899'] },
  { name: '선셋', stops: ['#f97316', '#ef4444', '#8b5cf6'] },
  { name: '오션', stops: ['#06b6d4', '#3b82f6', '#6366f1'] },
  { name: '포레스트', stops: ['#4ade80', '#22c55e', '#14b8a6'] },
  { name: '캔디', stops: ['#f472b6', '#fb7185', '#fb923c'] },
  { name: '미드나잇', stops: ['#0f172a', '#1e1b4b', '#312e81'] },
  { name: '레몬', stops: ['#fde047', '#fb923c', '#f43f5e'] },
  { name: '민트', stops: ['#a7f3d0', '#6ee7b7', '#34d399'] },
]

export default function GradientGenerator() {
  const [type, setType] = useState('linear')
  const [direction, setDirection] = useState('to right')
  const [angle, setAngle] = useState(90)
  const [stops, setStops] = useState(['#6366f1', '#8b5cf6'])
  const [copied, setCopied] = useState('')

  const addStop = () => {
    if (stops.length < 5) setStops([...stops, '#ec4899'])
  }

  const removeStop = (i) => {
    if (stops.length > 2) setStops(stops.filter((_, idx) => idx !== i))
  }

  const updateStop = (i, val) => {
    const next = [...stops]
    next[i] = val
    setStops(next)
  }

  const getCss = () => {
    const stopsStr = stops.join(', ')
    if (type === 'linear') return `linear-gradient(${direction}, ${stopsStr})`
    if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`
    if (type === 'conic') return `conic-gradient(from ${angle}deg, ${stopsStr})`
    return ''
  }

  const getTailwind = () => {
    if (type !== 'linear') return null
    const dirMap = {
      'to right': 'bg-gradient-to-r',
      'to left': 'bg-gradient-to-l',
      'to bottom': 'bg-gradient-to-b',
      'to top': 'bg-gradient-to-t',
      'to bottom right': 'bg-gradient-to-br',
      'to bottom left': 'bg-gradient-to-bl',
      'to top right': 'bg-gradient-to-tr',
      'to top left': 'bg-gradient-to-tl',
    }
    return dirMap[direction] || 'bg-gradient-to-r'
  }

  const css = getCss()
  const tailwindDir = getTailwind()

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    })
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div
          className="h-40 w-full transition-all duration-300"
          style={{ background: css }}
          role="img"
          aria-label={`그라디언트 미리보기: ${css}`}
        />
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
          <p className="text-xs font-mono text-slate-500 break-all">{css}</p>
        </div>
      </article>

      {/* Settings */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">그라디언트 설정</h2>
        </div>
        <div className="p-5 space-y-5">
          {/* Type */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2">그라디언트 종류</p>
            <div className="flex gap-2" role="group" aria-label="그라디언트 종류">
              {TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    type === t.value ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  aria-pressed={type === t.value}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direction (linear only) */}
          {type === 'linear' && (
            <div>
              <p className="text-xs font-bold text-slate-500 mb-2">방향</p>
              <div className="grid grid-cols-4 gap-2" role="group" aria-label="그라디언트 방향">
                {DIRECTIONS.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setDirection(d.value)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      direction === d.value ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                    aria-pressed={direction === d.value}
                    aria-label={d.label}
                  >
                    {d.icon}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conic angle */}
          {type === 'conic' && (
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-500">시작 각도</label>
                <span className="text-xs font-black text-slate-700">{angle}°</span>
              </div>
              <input
                type="range" min={0} max={360} value={angle}
                onChange={(e) => setAngle(+e.target.value)}
                className="w-full accent-emerald-500"
                aria-label="시작 각도 조절"
              />
            </div>
          )}

          {/* Color stops */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500">색상 포인트</p>
              {stops.length < 5 && (
                <button
                  onClick={addStop}
                  className="text-xs font-bold text-emerald-500 hover:text-emerald-700"
                  aria-label="색상 포인트 추가"
                >
                  + 추가
                </button>
              )}
            </div>
            <div className="space-y-2">
              {stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={stop}
                    onChange={(e) => updateStop(i, e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                    aria-label={`색상 포인트 ${i + 1}`}
                  />
                  <input
                    type="text"
                    value={stop}
                    onChange={(e) => updateStop(i, e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 text-slate-800 text-sm rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                    aria-label={`색상 포인트 ${i + 1} 값`}
                  />
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(i)}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label={`색상 포인트 ${i + 1} 삭제`}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Presets */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">프리셋</h2>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRESETS.map(preset => (
            <button
              key={preset.name}
              onClick={() => { setStops(preset.stops); setType('linear') }}
              className="group flex flex-col gap-1.5 hover:scale-105 transition-transform"
              aria-label={`${preset.name} 프리셋 적용`}
            >
              <div
                className="h-12 w-full rounded-xl"
                style={{ background: `linear-gradient(to right, ${preset.stops.join(', ')})` }}
              />
              <span className="text-xs font-bold text-slate-500 text-center group-hover:text-emerald-600">{preset.name}</span>
            </button>
          ))}
        </div>
      </article>

      {/* CSS Output */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">CSS 코드</h2>
        </div>
        <div className="p-5 space-y-3">
          {[
            { label: 'background', value: css },
            { label: 'background-image', value: css },
            ...(tailwindDir ? [{ label: 'Tailwind (방향)', value: tailwindDir }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <span className="text-xs font-black text-slate-400 w-32 shrink-0 pt-2.5">{label}</span>
              <code className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-700 break-all">
                {value}
              </code>
              <button
                onClick={() => copy(value, label)}
                className={`shrink-0 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                  copied === label ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
                aria-label={`${label} 복사`}
              >
                {copied === label ? '✓' : '복사'}
              </button>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
