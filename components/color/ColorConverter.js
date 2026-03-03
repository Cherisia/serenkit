'use client'

import { useState, useCallback } from 'react'
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsb, hsbToRgb,
  rgbToCmyk, cmykToRgb, parseColor, isValidHex, normalizeHex, getTextColor
} from '@/lib/colorUtils'
import { findClosestTailwindColor } from '@/lib/tailwindColors'
import { INPUT_CLS } from '@/lib/colorTools'

const MODES = ['HEX', 'RGB', 'HSL', 'HSB', 'CMYK']

export default function ColorConverter() {
  const [mode, setMode] = useState('HEX')
  const [inputs, setInputs] = useState({
    hex: '#6366f1',
    r: '99', g: '102', b: '241',
    hslH: '239', hslS: '84', hslL: '67',
    hsbH: '239', hsbS: '59', hsbV: '95',
    cmykC: '59', cmykM: '58', cmykY: '0', cmykK: '5',
  })
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const convert = useCallback(() => {
    setError('')
    let rgb = null

    try {
      if (mode === 'HEX') {
        const h = inputs.hex.trim()
        if (!isValidHex(h)) { setError('올바른 HEX 코드를 입력하세요 (예: #6366f1)'); return }
        rgb = hexToRgb(normalizeHex(h))
      } else if (mode === 'RGB') {
        const r = +inputs.r, g = +inputs.g, b = +inputs.b
        if ([r,g,b].some(v => isNaN(v) || v < 0 || v > 255)) { setError('RGB 값은 0~255 범위여야 합니다'); return }
        rgb = { r, g, b }
      } else if (mode === 'HSL') {
        const h = +inputs.hslH, s = +inputs.hslS, l = +inputs.hslL
        if (isNaN(h) || h < 0 || h > 360 || isNaN(s) || s < 0 || s > 100 || isNaN(l) || l < 0 || l > 100) {
          setError('H: 0-360, S/L: 0-100 범위여야 합니다'); return
        }
        rgb = hslToRgb(h, s, l)
      } else if (mode === 'HSB') {
        const h = +inputs.hsbH, s = +inputs.hsbS, v = +inputs.hsbV
        if (isNaN(h) || h < 0 || h > 360 || isNaN(s) || s < 0 || s > 100 || isNaN(v) || v < 0 || v > 100) {
          setError('H: 0-360, S/B: 0-100 범위여야 합니다'); return
        }
        rgb = hsbToRgb(h, s, v)
      } else if (mode === 'CMYK') {
        const c = +inputs.cmykC, m = +inputs.cmykM, y = +inputs.cmykY, k = +inputs.cmykK
        if ([c,m,y,k].some(v => isNaN(v) || v < 0 || v > 100)) { setError('CMYK 값은 0~100 범위여야 합니다'); return }
        rgb = cmykToRgb(c, m, y, k)
      }

      if (!rgb) { setError('변환할 수 없는 값입니다'); return }

      const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b)
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
      const tw = findClosestTailwindColor(hex)

      setResult({
        hex,
        hexUpper: hex.toUpperCase(),
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
        hsb: `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`,
        cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
        tailwind: tw ? tw.class : null,
        tailwindHex: tw ? tw.hex : null,
        r: rgb.r, g: rgb.g, b: rgb.b,
        hslH: hsl.h, hslS: hsl.s, hslL: hsl.l,
        hsbH: hsb.h, hsbS: hsb.s, hsbV: hsb.b,
        cmykC: cmyk.c, cmykM: cmyk.m, cmykY: cmyk.y, cmykK: cmyk.k,
      })
    } catch {
      setError('변환 중 오류가 발생했습니다')
    }
  }, [mode, inputs])

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    })
  }

  const setInput = (key, val) => setInputs(prev => ({ ...prev, [key]: val }))

  return (
    <div className="space-y-4">
      {/* Input mode selector */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">입력 포맷 선택</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="색상 입력 포맷">
            {MODES.map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setResult(null); setError('') }}
                className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                  mode === m
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
                aria-pressed={mode === m}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Input fields */}
          <div className="space-y-3">
            {mode === 'HEX' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">HEX 코드</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={inputs.hex.length === 7 ? inputs.hex : '#6366f1'}
                    onChange={(e) => setInput('hex', e.target.value)}
                    className="w-11 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
                    aria-label="색상 선택"
                  />
                  <input
                    type="text"
                    value={inputs.hex}
                    onChange={(e) => setInput('hex', e.target.value)}
                    placeholder="#6366f1"
                    className={INPUT_CLS}
                    aria-label="HEX 색상 코드 입력"
                  />
                </div>
              </div>
            )}

            {mode === 'RGB' && (
              <div className="grid grid-cols-3 gap-3">
                {[['r', 'R (빨강)', '0-255'], ['g', 'G (초록)', '0-255'], ['b', 'B (파랑)', '0-255']].map(([k, label, ph]) => (
                  <div key={k}>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{label}</label>
                    <input type="number" min={0} max={255} value={inputs[k]}
                      onChange={(e) => setInput(k, e.target.value)}
                      placeholder={ph} className={INPUT_CLS} aria-label={label} />
                  </div>
                ))}
              </div>
            )}

            {mode === 'HSL' && (
              <div className="grid grid-cols-3 gap-3">
                {[['hslH', 'H (색상)', '0-360'], ['hslS', 'S (채도%)', '0-100'], ['hslL', 'L (명도%)', '0-100']].map(([k, label, ph]) => (
                  <div key={k}>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{label}</label>
                    <input type="number" value={inputs[k]}
                      onChange={(e) => setInput(k, e.target.value)}
                      placeholder={ph} className={INPUT_CLS} aria-label={label} />
                  </div>
                ))}
              </div>
            )}

            {mode === 'HSB' && (
              <div className="grid grid-cols-3 gap-3">
                {[['hsbH', 'H (색상)', '0-360'], ['hsbS', 'S (채도%)', '0-100'], ['hsbV', 'B (밝기%)', '0-100']].map(([k, label, ph]) => (
                  <div key={k}>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{label}</label>
                    <input type="number" value={inputs[k]}
                      onChange={(e) => setInput(k, e.target.value)}
                      placeholder={ph} className={INPUT_CLS} aria-label={label} />
                  </div>
                ))}
              </div>
            )}

            {mode === 'CMYK' && (
              <div className="grid grid-cols-2 gap-3">
                {[['cmykC', 'C (청록%)', '0-100'], ['cmykM', 'M (마젠타%)', '0-100'], ['cmykY', 'Y (노랑%)', '0-100'], ['cmykK', 'K (검정%)', '0-100']].map(([k, label, ph]) => (
                  <div key={k}>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{label}</label>
                    <input type="number" min={0} max={100} value={inputs[k]}
                      onChange={(e) => setInput(k, e.target.value)}
                      placeholder={ph} className={INPUT_CLS} aria-label={label} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2" role="alert">{error}</p>}

          <button
            onClick={convert}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 rounded-xl transition-colors"
          >
            변환하기
          </button>
        </div>
      </article>

      {/* Result */}
      {result && (
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {/* Color preview */}
          <div
            className="h-24 w-full flex items-center justify-center"
            style={{ backgroundColor: result.hex }}
            aria-label={`변환된 색상: ${result.hexUpper}`}
          >
            <span className="text-3xl font-black tracking-tight" style={{ color: getTextColor(result.hex) }}>
              {result.hexUpper}
            </span>
          </div>

          <div className="px-5 py-4 border-t border-slate-100">
            <h3 className="font-black text-slate-700 mb-3">변환 결과</h3>
            <div className="space-y-2">
              {[
                { label: 'HEX', value: result.hexUpper },
                { label: 'RGB', value: result.rgb },
                { label: 'RGBA', value: result.rgba },
                { label: 'HSL', value: result.hsl },
                { label: 'HSLA', value: result.hsla },
                { label: 'HSB/HSV', value: result.hsb },
                { label: 'CMYK', value: result.cmyk },
                ...(result.tailwind ? [{ label: 'Tailwind', value: result.tailwind }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-400 w-16 shrink-0">{label}</span>
                  <code className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-700 truncate">
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

            {result.tailwind && (
              <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border border-white shadow-sm" style={{ backgroundColor: result.tailwindHex }} />
                <div>
                  <p className="text-xs font-black text-cyan-700">가장 가까운 Tailwind 색상</p>
                  <p className="text-sm font-bold text-cyan-600">{result.tailwind}</p>
                </div>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  )
}
