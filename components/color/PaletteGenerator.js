'use client'

import { useState } from 'react'
import { generatePalette, getTextColor, hexToRgb, rgbToHsl } from '@/lib/colorUtils'
import { INPUT_CLS } from '@/lib/colorTools'

const SCHEME_TYPES = [
  { value: 'complementary', label: '보색', desc: '정반대 색상으로 강한 대비' },
  { value: 'analogous', label: '유사색', desc: '인접한 색상으로 자연스러운 조화' },
  { value: 'triadic', label: '삼각배색', desc: '120° 간격의 3가지 색상' },
  { value: 'split-complementary', label: '분할보색', desc: '보색의 양쪽 색상 활용' },
  { value: 'tetradic', label: '사각배색', desc: '90° 간격의 4가지 색상' },
  { value: 'monochromatic', label: '단색배색', desc: '같은 색상, 다른 명도' },
  { value: 'shades', label: '명도 단계', desc: '같은 색상의 10단계 명도' },
]

export default function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#6366f1')
  const [scheme, setScheme] = useState('analogous')
  const [palette, setPalette] = useState([])
  const [copied, setCopied] = useState('')
  const [generated, setGenerated] = useState(false)

  const generate = () => {
    const result = generatePalette(baseColor, scheme)
    setPalette(result)
    setGenerated(true)
  }

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1200)
    })
  }

  const copyAll = () => {
    const all = palette.map(p => p.hex).join(', ')
    copy(all, 'all')
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">기준 색상 선택</h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2">기준 색상</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-11 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                aria-label="기준 색상 선택"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className={INPUT_CLS}
                aria-label="기준 색상 HEX 입력"
              />
            </div>
          </div>

          {/* Color preview with info */}
          {hexToRgb(baseColor) && (() => {
            const rgb = hexToRgb(baseColor)
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
            return (
              <div
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: baseColor }}
                aria-label={`선택된 색상: ${baseColor}`}
              >
                <div className="w-8 h-8 rounded-lg border border-white/30" style={{ backgroundColor: baseColor }} aria-hidden="true" />
                <div>
                  <p className="text-sm font-black" style={{ color: getTextColor(baseColor) }}>{baseColor.toUpperCase()}</p>
                  <p className="text-xs opacity-75" style={{ color: getTextColor(baseColor) }}>
                    hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
                  </p>
                </div>
              </div>
            )
          })()}
        </div>
      </article>

      {/* Scheme type */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">배색 방식</h2>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 gap-2" role="radiogroup" aria-label="배색 방식 선택">
            {SCHEME_TYPES.map(s => (
              <button
                key={s.value}
                onClick={() => setScheme(s.value)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                  scheme === s.value
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
                }`}
                role="radio"
                aria-checked={scheme === s.value}
              >
                <div>
                  <p className={`text-sm font-black ${scheme === s.value ? 'text-emerald-700' : 'text-slate-700'}`}>{s.label}</p>
                  <p className="text-xs text-slate-400">{s.desc}</p>
                </div>
                {scheme === s.value && (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={generate}
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 rounded-xl transition-colors"
          >
            팔레트 생성
          </button>
        </div>
      </article>

      {/* Result palette */}
      {generated && palette.length > 0 && (
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-black text-slate-800">생성된 팔레트</h2>
            <button
              onClick={copyAll}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                copied === 'all' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
              aria-label="모든 색상 복사"
            >
              {copied === 'all' ? '✓ 복사됨' : '전체 복사'}
            </button>
          </div>
          <div className="p-5">
            {/* Color bar */}
            <div className="h-16 rounded-xl overflow-hidden flex mb-4" role="img" aria-label="팔레트 미리보기">
              {palette.map(({ hex }) => (
                <div key={hex} className="flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: hex }}
                  onClick={() => copy(hex, `bar-${hex}`)}
                  title={hex}
                  role="button"
                  aria-label={`${hex} 복사`}
                />
              ))}
            </div>

            {/* Color cards */}
            <div className={`grid gap-3 ${palette.length <= 3 ? 'grid-cols-' + palette.length : 'grid-cols-2 md:grid-cols-4'}`}>
              {palette.map(({ hex, label }) => (
                <button
                  key={hex}
                  onClick={() => copy(hex, hex)}
                  className={`group flex flex-col rounded-xl overflow-hidden border-2 transition-all ${
                    copied === hex ? 'border-emerald-400' : 'border-transparent hover:border-slate-300'
                  }`}
                  aria-label={`${label}: ${hex} 복사`}
                >
                  <div
                    className="h-20 w-full flex items-center justify-center"
                    style={{ backgroundColor: hex }}
                  >
                    {copied === hex && (
                      <span className="text-lg font-black" style={{ color: getTextColor(hex) }} aria-live="polite">✓</span>
                    )}
                  </div>
                  <div className="bg-slate-50 px-2 py-2 border-t border-slate-100">
                    <p className="text-xs font-black text-slate-700 font-mono">{hex.toUpperCase()}</p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}
