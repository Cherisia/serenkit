'use client'

import { useState } from 'react'
import { getContrastRatio, getWcagLevel, getTextColor, hexToRgb } from '@/lib/colorUtils'
import { COLOR_INPUT_CLS as INPUT_CLS } from '@/lib/colorTools'

const COMMON_PAIRS = [
  { name: '흰 배경 + 검은 텍스트', bg: '#ffffff', fg: '#000000' },
  { name: '흰 배경 + 슬레이트 텍스트', bg: '#ffffff', fg: '#334155' },
  { name: '에메랄드 배경 + 흰 텍스트', bg: '#10b981', fg: '#ffffff' },
  { name: '노랑 배경 + 검은 텍스트', bg: '#fde047', fg: '#000000' },
  { name: '빨강 배경 + 흰 텍스트', bg: '#ef4444', fg: '#ffffff' },
  { name: '회색 배경 + 흰 텍스트', bg: '#6b7280', fg: '#ffffff' },
]

export default function ContrastChecker() {
  const [bg, setBg] = useState('#ffffff')
  const [fg, setFg] = useState('#1e1b4b')
  const [copied, setCopied] = useState('')

  const ratio = getContrastRatio(bg, fg)
  const ratioFixed = ratio.toFixed(2)
  const normalLevel = getWcagLevel(ratio, false)
  const largeLevel = getWcagLevel(ratio, true)

  const isPass = (level) => level !== 'Fail'

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    })
  }

  const swap = () => {
    setBg(fg)
    setFg(bg)
  }

  return (
    <div className="space-y-4">
      {/* Color input */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">색상 설정</h2>
          <p className="text-xs text-slate-400 mt-0.5">배경색과 전경색(텍스트색)을 선택하세요</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Background */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">배경색</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  aria-label="배경색 선택"
                />
                <input
                  type="text"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className={INPUT_CLS}
                  aria-label="배경색 HEX 입력"
                />
              </div>
            </div>

            {/* Foreground */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">전경색 (텍스트)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="color"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  aria-label="전경색 선택"
                />
                <input
                  type="text"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className={INPUT_CLS}
                  aria-label="전경색 HEX 입력"
                />
              </div>
            </div>
          </div>

          <button
            onClick={swap}
            className="w-full py-2 text-sm font-bold text-slate-500 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2"
            aria-label="배경색과 전경색 교환"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            색상 교환
          </button>
        </div>
      </article>

      {/* Preview */}
      <article
        className="rounded-2xl overflow-hidden border-2"
        style={{ backgroundColor: bg, borderColor: bg }}
        aria-label="색상 대비 미리보기"
      >
        <div className="p-6 text-center space-y-3">
          <h3 className="text-2xl font-black" style={{ color: fg }}>색상 대비 미리보기</h3>
          <p className="text-base" style={{ color: fg }}>이 텍스트가 얼마나 잘 읽히나요?</p>
          <p className="text-sm" style={{ color: fg }}>작은 텍스트 가독성 테스트입니다. Small text readability test.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              className="px-4 py-2 rounded-xl font-bold text-sm border-2"
              style={{ backgroundColor: fg, color: bg, borderColor: fg }}
            >
              버튼 예시
            </button>
            <button
              className="px-4 py-2 rounded-xl font-bold text-sm border-2"
              style={{ color: fg, borderColor: fg }}
            >
              아웃라인 버튼
            </button>
          </div>
        </div>
      </article>

      {/* Results */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">WCAG 접근성 검사 결과</h2>
        </div>
        <div className="p-5 space-y-4">
          {/* Contrast ratio */}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{
            background: ratio >= 7 ? '#f0fdf4' : ratio >= 4.5 ? '#eff6ff' : ratio >= 3 ? '#fefce8' : '#fef2f2',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: ratio >= 7 ? '#86efac' : ratio >= 4.5 ? '#93c5fd' : ratio >= 3 ? '#fde047' : '#fca5a5',
          }}>
            <div>
              <p className="text-xs font-bold text-slate-500">명도 대비 비율</p>
              <p className="text-3xl font-black text-slate-800">{ratioFixed}:1</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-black ${ratio >= 4.5 ? 'text-emerald-600' : 'text-red-500'}`}>
                {ratio >= 7 ? '우수' : ratio >= 4.5 ? '적합' : ratio >= 3 ? '부분 적합' : '부적합'}
              </p>
              <p className="text-xs text-slate-400">권장: 4.5:1 이상</p>
            </div>
          </div>

          {/* WCAG levels */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '일반 텍스트 AA', required: 4.5, level: normalLevel },
              { label: '일반 텍스트 AAA', required: 7, level: ratio >= 7 ? 'AAA' : 'Fail' },
              { label: '큰 텍스트 AA', required: 3, level: largeLevel === 'AA' || largeLevel === 'AAA' ? 'AA' : 'Fail' },
              { label: '큰 텍스트 AAA', required: 4.5, level: ratio >= 4.5 ? 'AAA' : 'Fail' },
            ].map(({ label, level }) => (
              <div
                key={label}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  isPass(level) ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <span className="text-xs font-bold text-slate-600">{label}</span>
                <span className={`text-sm font-black px-2 py-0.5 rounded-lg ${
                  isPass(level) ? 'bg-emerald-500 text-white' : 'bg-red-400 text-white'
                }`}>
                  {isPass(level) ? level : '실패'}
                </span>
              </div>
            ))}
          </div>

          {/* WCAG explanation */}
          <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 space-y-1">
            <p className="font-bold text-slate-600">WCAG 2.1 기준 설명</p>
            <p>• <strong>AA</strong>: 일반 텍스트 4.5:1 이상, 큰 텍스트(18pt+ 또는 14pt Bold+) 3:1 이상</p>
            <p>• <strong>AAA</strong>: 일반 텍스트 7:1 이상, 큰 텍스트 4.5:1 이상</p>
          </div>
        </div>
      </article>

      {/* Common pairs */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-slate-100">
          <h2 className="font-black text-slate-800">일반적인 색상 조합</h2>
          <p className="text-xs text-slate-400 mt-0.5">클릭하면 해당 조합으로 설정됩니다</p>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          {COMMON_PAIRS.map((pair) => {
            const r = getContrastRatio(pair.bg, pair.fg)
            const pass = r >= 4.5
            return (
              <button
                key={pair.name}
                onClick={() => { setBg(pair.bg); setFg(pair.fg) }}
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-slate-50 transition-all text-left group"
                aria-label={`${pair.name} - 대비 비율 ${r.toFixed(1)}:1`}
              >
                <div className="flex shrink-0">
                  <div className="w-8 h-8 rounded-l-lg border border-slate-200" style={{ backgroundColor: pair.bg }} />
                  <div className="w-8 h-8 rounded-r-lg" style={{ backgroundColor: pair.fg }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-600">{pair.name}</p>
                  <p className="text-xs text-slate-400">{r.toFixed(1)}:1</p>
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                  pass ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                }`}>
                  {pass ? 'AA' : '실패'}
                </span>
              </button>
            )
          })}
        </div>
      </article>
    </div>
  )
}
