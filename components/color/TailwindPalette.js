'use client'

import { useState } from 'react'
import { TAILWIND_COLORS, TAILWIND_COLOR_NAMES, TAILWIND_SHADES } from '@/lib/tailwindColors'
import { getTextColor } from '@/lib/colorUtils'

const COLOR_KR = {
  slate: '슬레이트', gray: '그레이', zinc: '징크', neutral: '뉴트럴', stone: '스톤',
  red: '빨강', orange: '주황', amber: '앰버', yellow: '노랑', lime: '라임',
  green: '초록', emerald: '에메랄드', teal: '틸', cyan: '시안', sky: '스카이',
  blue: '파랑', indigo: '인디고', violet: '바이올렛', purple: '보라', fuchsia: '퓨샤',
  pink: '핑크', rose: '로즈',
}

export default function TailwindPalette() {
  const [copied, setCopied] = useState('')
  const [filter, setFilter] = useState('')
  const [copyMode, setCopyMode] = useState('class') // 'class' | 'hex'

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1200)
    })
  }

  const filteredColors = filter
    ? TAILWIND_COLOR_NAMES.filter(n => n.includes(filter.toLowerCase()) || (COLOR_KR[n] || '').includes(filter))
    : TAILWIND_COLOR_NAMES

  return (
    <div className="space-y-4">
      {/* Controls */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">Tailwind CSS 색상표</h2>
          <p className="text-xs text-slate-400 mt-0.5">색상을 클릭하면 클래스명 또는 HEX 코드를 복사합니다</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="색상 검색 (예: blue, 파랑)"
              className="flex-1 bg-stone-50 border border-stone-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition-colors"
              aria-label="Tailwind 색상 검색"
            />
          </div>
          <div className="flex gap-2" role="group" aria-label="복사 모드 선택">
            <button
              onClick={() => setCopyMode('class')}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                copyMode === 'class' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
              aria-pressed={copyMode === 'class'}
            >
              클래스명 복사
            </button>
            <button
              onClick={() => setCopyMode('hex')}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                copyMode === 'hex' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
              aria-pressed={copyMode === 'hex'}
            >
              HEX 복사
            </button>
          </div>
        </div>
      </article>

      {/* Shades header */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center px-4 py-2 border-b border-slate-100">
          <span className="text-xs font-black text-slate-400 w-28 shrink-0">색상</span>
          <div className="flex flex-1 gap-px">
            {TAILWIND_SHADES.map(shade => (
              <div key={shade} className="flex-1 text-center text-xs font-bold text-slate-400 py-1">
                {shade}
              </div>
            ))}
          </div>
        </div>

        {/* Color rows */}
        <div role="list" aria-label="Tailwind 색상표">
          {filteredColors.map(colorName => (
            <div
              key={colorName}
              className="flex items-center px-4 py-1.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
              role="listitem"
            >
              <div className="w-28 shrink-0">
                <p className="text-xs font-black text-slate-700">{colorName}</p>
                <p className="text-xs text-slate-400">{COLOR_KR[colorName] || ''}</p>
              </div>
              <div className="flex flex-1 gap-px" role="group" aria-label={`${colorName} 색상 음영`}>
                {TAILWIND_SHADES.map(shade => {
                  const hex = TAILWIND_COLORS[colorName]?.[shade]
                  if (!hex) return <div key={shade} className="flex-1 h-10" />
                  const copyKey = `${colorName}-${shade}`
                  const copyValue = copyMode === 'class' ? `${colorName}-${shade}` : hex
                  return (
                    <button
                      key={shade}
                      onClick={() => copy(copyValue, copyKey)}
                      className={`flex-1 h-10 relative transition-all color-swatch ${
                        copied === copyKey ? 'ring-2 ring-offset-1 ring-emerald-400 z-10' : 'hover:z-10 hover:scale-110 hover:rounded-sm'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={`${colorName}-${shade} | ${hex}`}
                      aria-label={`${colorName}-${shade} (${hex}) 복사`}
                    >
                      {copied === copyKey && (
                        <span
                          className="absolute inset-0 flex items-center justify-center text-xs font-black"
                          style={{ color: getTextColor(hex) }}
                          aria-live="polite"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredColors.length === 0 && (
        <p className="text-center text-sm text-slate-400 py-8" role="status">
          검색 결과가 없습니다
        </p>
      )}
    </div>
  )
}
