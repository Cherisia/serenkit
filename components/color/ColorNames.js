'use client'

import { useState, useMemo } from 'react'
import { CSS_COLOR_NAMES, INPUT_CLS } from '@/lib/colorTools'
import { hexToRgb, rgbToHex, getTextColor } from '@/lib/colorUtils'
import { findClosestTailwindColor, TAILWIND_COLORS } from '@/lib/tailwindColors'

function colorDistance(hex1, hex2) {
  const r1 = hexToRgb(hex1)
  const r2 = hexToRgb(hex2)
  if (!r1 || !r2) return Infinity
  return Math.sqrt(
    Math.pow(r1.r - r2.r, 2) +
    Math.pow(r1.g - r2.g, 2) +
    Math.pow(r1.b - r2.b, 2)
  )
}

function findClosestCssName(hex) {
  let closest = null
  let minDist = Infinity
  for (const color of CSS_COLOR_NAMES) {
    const d = colorDistance(hex, color.hex)
    if (d < minDist) {
      minDist = d
      closest = { ...color, distance: Math.round(d) }
    }
  }
  return closest
}

export default function ColorNames() {
  const [input, setInput] = useState('#6366f1')
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const find = () => {
    setError('')
    const rgb = hexToRgb(input)
    if (!rgb) { setError('올바른 HEX 색상 코드를 입력하세요 (예: #6366f1)'); return }
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    const cssMatch = findClosestCssName(hex)
    const twMatch = findClosestTailwindColor(hex)
    setResult({ hex, cssMatch, twMatch })
  }

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1200)
    })
  }

  const filteredColors = useMemo(() => {
    if (!search) return CSS_COLOR_NAMES
    const q = search.toLowerCase()
    return CSS_COLOR_NAMES.filter(c => c.name.includes(q) || c.hex.includes(q))
  }, [search])

  return (
    <div className="space-y-4">
      {/* Finder */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">색상 코드로 이름 찾기</h2>
          <p className="text-xs text-slate-400 mt-0.5">HEX 코드를 입력하면 가장 가까운 CSS 이름과 Tailwind 클래스를 찾아드립니다</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-2">
            <input
              type="color"
              value={input.length === 7 ? input : '#6366f1'}
              onChange={(e) => setInput(e.target.value)}
              className="w-11 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
              aria-label="색상 선택"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="#6366f1"
              className={INPUT_CLS}
              aria-label="HEX 색상 코드 입력"
              onKeyDown={(e) => e.key === 'Enter' && find()}
            />
          </div>
          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2" role="alert">{error}</p>}
          <button
            onClick={find}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 rounded-xl transition-colors"
          >
            이름 찾기
          </button>
        </div>
      </article>

      {/* Result */}
      {result && (
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div
            className="h-20 w-full"
            style={{ backgroundColor: result.hex }}
            aria-label={`검색한 색상: ${result.hex}`}
          />
          <div className="p-5 space-y-4">
            {/* CSS name */}
            {result.cssMatch && (
              <div className={`p-4 rounded-xl border ${
                result.cssMatch.distance < 10
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-slate-500">가장 가까운 CSS 색상 이름</p>
                  {result.cssMatch.distance < 1 && (
                    <span className="text-xs font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">완전 일치</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-white shadow-sm" style={{ backgroundColor: result.cssMatch.hex }} />
                  <div className="flex-1">
                    <p className="font-black text-slate-800">{result.cssMatch.name}</p>
                    <p className="text-sm text-slate-400">{result.cssMatch.hex.toUpperCase()}</p>
                    {result.cssMatch.distance > 0 && (
                      <p className="text-xs text-slate-400">색상 차이: {result.cssMatch.distance}</p>
                    )}
                  </div>
                  <button
                    onClick={() => copy(result.cssMatch.name, 'cssName')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      copied === 'cssName' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                    aria-label="CSS 색상 이름 복사"
                  >
                    {copied === 'cssName' ? '✓' : '복사'}
                  </button>
                </div>
              </div>
            )}

            {/* Tailwind */}
            {result.twMatch && (
              <div className={`p-4 rounded-xl border ${
                result.twMatch.distance < 10
                  ? 'bg-cyan-50 border-cyan-200'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-slate-500">가장 가까운 Tailwind CSS 클래스</p>
                  {result.twMatch.distance < 1 && (
                    <span className="text-xs font-black bg-cyan-500 text-white px-2 py-0.5 rounded-full">완전 일치</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-white shadow-sm" style={{ backgroundColor: result.twMatch.hex }} />
                  <div className="flex-1">
                    <p className="font-black text-slate-800 font-mono">{result.twMatch.class}</p>
                    <p className="text-sm text-slate-400">{result.twMatch.hex.toUpperCase()}</p>
                    {result.twMatch.distance > 0 && (
                      <p className="text-xs text-slate-400">색상 차이: {result.twMatch.distance}</p>
                    )}
                  </div>
                  <button
                    onClick={() => copy(result.twMatch.class, 'twClass')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                      copied === 'twClass' ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-cyan-50 hover:text-cyan-600'
                    }`}
                    aria-label="Tailwind 클래스명 복사"
                  >
                    {copied === 'twClass' ? '✓' : '복사'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>
      )}

      {/* All CSS colors browser */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">CSS 색상 이름 전체 목록</h2>
          <p className="text-xs text-slate-400 mt-0.5">{CSS_COLOR_NAMES.length}가지 CSS 표준 색상</p>
        </div>
        <div className="p-5 space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="색상 이름 또는 HEX 검색..."
            className={INPUT_CLS}
            aria-label="CSS 색상 검색"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto" role="list" aria-label="CSS 색상 목록">
            {filteredColors.map(color => (
              <button
                key={color.name}
                onClick={() => copy(color.name, `css-${color.name}`)}
                className={`flex items-center gap-2 p-2 rounded-xl border transition-all group ${
                  copied === `css-${color.name}` ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
                }`}
                role="listitem"
                aria-label={`${color.name}: ${color.hex}`}
              >
                <div
                  className="w-8 h-8 rounded-lg border border-slate-200 shrink-0"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                <div className="text-left overflow-hidden">
                  <p className="text-xs font-bold text-slate-700 truncate group-hover:text-emerald-600">{color.name}</p>
                  <p className="text-xs text-slate-400 font-mono">{color.hex}</p>
                </div>
              </button>
            ))}
          </div>
          {filteredColors.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4" role="status">검색 결과가 없습니다</p>
          )}
        </div>
      </article>
    </div>
  )
}
