'use client'

import { useState, useCallback } from 'react'
import { hexToRgb, rgbToHsl, rgbToHsb, rgbToCmyk, getTextColor } from '@/lib/colorUtils'
import { findClosestTailwindColor } from '@/lib/tailwindColors'

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1')
  const [copied, setCopied] = useState('')

  const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
  const tw = findClosestTailwindColor(color)

  const copy = useCallback((text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    })
  }, [])

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'HSLA', value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` },
    { label: 'HSB/HSV', value: `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
    ...(tw ? [{ label: 'Tailwind', value: tw.class }] : []),
  ]

  // Generate color swatches for quick selection
  const quickColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#64748b',
    '#ffffff', '#e5e7eb', '#9ca3af', '#374151', '#000000',
  ]

  return (
    <div className="space-y-4">
      {/* Color picker */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">색상 선택</h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Large color picker */}
          <div className="flex gap-4 items-start">
            <div className="relative">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-20 rounded-2xl border-2 border-slate-200 cursor-pointer p-0 bg-transparent"
                aria-label="색상 선택기"
                style={{ appearance: 'none' }}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">HEX 코드 직접 입력</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    const v = e.target.value
                    if (/^#?[0-9a-f]{0,6}$/i.test(v.replace('#', ''))) {
                      setColor(v.startsWith('#') ? v : '#' + v)
                    }
                  }}
                  className="w-full bg-stone-50 border border-stone-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 font-mono transition-colors"
                  aria-label="HEX 색상 코드 입력"
                  maxLength={7}
                  spellCheck={false}
                />
              </div>
              <div
                className="h-10 rounded-xl border border-white/20 shadow-inner flex items-center justify-center"
                style={{ backgroundColor: color }}
                aria-label={`현재 선택된 색상: ${color.toUpperCase()}`}
              >
                <span className="text-sm font-black" style={{ color: getTextColor(color) }}>
                  {color.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick color swatches */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2">빠른 선택</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="빠른 색상 선택">
              {quickColors.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all color-swatch ${
                    color.toLowerCase() === c.toLowerCase()
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`색상 ${c} 선택`}
                  aria-pressed={color.toLowerCase() === c.toLowerCase()}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Color details */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">색상 코드</h2>
          <p className="text-xs text-slate-400 mt-0.5">클릭하여 원하는 포맷 복사</p>
        </div>
        <div className="p-5 space-y-2">
          {formats.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => copy(value, label)}
              className={`w-full flex items-center gap-2 p-3 rounded-xl border transition-all text-left group ${
                copied === label
                  ? 'border-emerald-300 bg-emerald-50'
                  : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
              }`}
              aria-label={`${label}: ${value} - 복사하기`}
            >
              <span className="text-xs font-black text-slate-400 w-16 shrink-0">{label}</span>
              <code className="flex-1 text-sm font-mono text-slate-700 truncate">{value}</code>
              <span className={`text-xs font-bold shrink-0 ${
                copied === label ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'
              }`}>
                {copied === label ? '✓ 복사됨' : '복사'}
              </span>
            </button>
          ))}
        </div>
      </article>

      {/* RGB sliders */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">RGB 슬라이더</h2>
        </div>
        <div className="p-5 space-y-4">
          {[
            { key: 'r', label: 'R (빨강)', color: '#ef4444', gradient: `linear-gradient(to right, #000000, #ff0000)` },
            { key: 'g', label: 'G (초록)', color: '#22c55e', gradient: `linear-gradient(to right, #000000, #00ff00)` },
            { key: 'b', label: 'B (파랑)', color: '#3b82f6', gradient: `linear-gradient(to right, #000000, #0000ff)` },
          ].map(({ key, label, gradient }) => (
            <div key={key}>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-500">{label}</label>
                <span className="text-xs font-black text-slate-700">{rgb[key]}</span>
              </div>
              <div className="relative h-6 rounded-full overflow-hidden" style={{ background: gradient }}>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={rgb[key]}
                  onChange={(e) => {
                    const newRgb = { ...rgb, [key]: +e.target.value }
                    const r2h = (r, g, b) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
                    setColor(r2h(newRgb.r, newRgb.g, newRgb.b))
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label={`${label} 값 조절`}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-slate-300 shadow-md transition-all pointer-events-none"
                  style={{ left: `calc(${rgb[key] / 255 * 100}% - 10px)` }}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
