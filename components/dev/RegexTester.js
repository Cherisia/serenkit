'use client'
import { useState, useMemo } from 'react'
import { DEV_INPUT_CLS } from '@/lib/devTools'

const ALL_FLAGS = [
  { flag: 'g', title: '전역 검색 (모든 매치 반환)' },
  { flag: 'i', title: '대소문자 무시' },
  { flag: 'm', title: '여러 줄 모드 (^·$이 줄 경계)' },
  { flag: 's', title: '점(.)이 줄바꿈 포함' },
  { flag: 'u', title: 'Unicode 모드' },
]

const PRESETS = [
  { name: '이메일', pattern: '[\\w.+-]+@[\\w-]+\\.[\\w.]+', flags: 'gi' },
  { name: '한국 전화번호', pattern: '0\\d{1,2}[-.\\s]?\\d{3,4}[-.\\s]?\\d{4}', flags: 'g' },
  { name: '사업자등록번호', pattern: '\\d{3}-\\d{2}-\\d{5}', flags: 'g' },
  { name: '주민번호 형식', pattern: '\\d{6}-[1-4]\\d{6}', flags: 'g' },
  { name: '한국 우편번호', pattern: '\\d{5}', flags: 'g' },
  { name: 'URL', pattern: 'https?:\\/\\/[\\w./?%&=#@:+-]+', flags: 'gi' },
  { name: 'HTML 태그', pattern: '<\\/?[a-zA-Z][^>]*>', flags: 'gi' },
  { name: '날짜 YYYY-MM-DD', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', flags: 'g' },
  { name: '시간 HH:MM', pattern: '(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?', flags: 'g' },
  { name: '정수/소수', pattern: '-?\\d+(?:\\.\\d+)?', flags: 'g' },
  { name: '한글', pattern: '[가-힣]+', flags: 'g' },
  { name: '영문자', pattern: '[a-zA-Z]+', flags: 'g' },
  { name: 'IP 주소', pattern: '(?:\\d{1,3}\\.){3}\\d{1,3}', flags: 'g' },
  { name: '16진수 색상', pattern: '#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?', flags: 'gi' },
  { name: '빈 줄', pattern: '^\\s*$', flags: 'gm' },
  { name: '연속 공백', pattern: '\\s{2,}', flags: 'g' },
]

function buildRegex(pattern, flagStr) {
  if (!pattern) return { error: null }
  try { new RegExp(pattern, flagStr); return { error: null } }
  catch (e) { return { error: e.message } }
}

function findMatches(pattern, flagStr, text) {
  if (!pattern || !text) return []
  const hasG = flagStr.includes('g')
  const iterFlags = hasG ? flagStr : flagStr + 'g'
  try {
    const re = new RegExp(pattern, iterFlags)
    const results = []
    let m
    while ((m = re.exec(text)) !== null) {
      results.push({
        index: m.index,
        length: m[0].length,
        value: m[0],
        groups: Array.from({ length: m.length - 1 }, (_, i) => m[i + 1]),
      })
      if (m[0].length === 0) re.lastIndex++
      if (!hasG) break
    }
    return results
  } catch { return [] }
}

function buildSegments(text, matches) {
  if (!matches.length) return [{ text, hi: false }]
  const segs = []
  let pos = 0
  for (const m of matches) {
    if (m.index > pos) segs.push({ text: text.slice(pos, m.index), hi: false })
    segs.push({ text: m.value, hi: true })
    pos = m.index + m.length
  }
  if (pos < text.length) segs.push({ text: text.slice(pos), hi: false })
  return segs
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState(new Set(['g']))
  const [testText, setTestText] = useState('')
  const [selectedPreset, setSelectedPreset] = useState(null)

  const flagStr = useMemo(() => [...flags].sort().join(''), [flags])
  const { error } = useMemo(() => buildRegex(pattern, flagStr), [pattern, flagStr])
  const matches = useMemo(() => findMatches(pattern, flagStr, testText), [pattern, flagStr, testText])
  const segments = useMemo(() => buildSegments(testText, matches), [testText, matches])

  const maxGroups = matches.length ? Math.max(...matches.map(m => m.groups.length)) : 0
  const hasCaptures = maxGroups > 0 && matches.some(m => m.groups.some(g => g !== undefined))
  const showResult = !!(pattern && !error && testText)

  function toggleFlag(f) {
    setFlags(prev => {
      const next = new Set(prev)
      next.has(f) ? next.delete(f) : next.add(f)
      return next
    })
  }

  function applyPreset(p) {
    setPattern(p.pattern)
    setFlags(new Set(p.flags.split('')))
    setSelectedPreset(p.name)
  }

  return (
    <div className="space-y-4">
      {/* 패턴 입력 */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-slate-800 mb-4 pb-3 border-b border-slate-100">정규식 패턴</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-slate-400 font-mono text-lg select-none leading-none">/</span>
          <input
            className={`${DEV_INPUT_CLS} flex-1`}
            placeholder="\d{3}-\d{4}-\d{4}"
            value={pattern}
            onChange={e => { setPattern(e.target.value); setSelectedPreset(null) }}
            spellCheck={false}
          />
          <span className="text-slate-400 font-mono text-lg select-none leading-none">/{flagStr}</span>
        </div>

        {/* 플래그 토글 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-slate-400 shrink-0">플래그</span>
          {ALL_FLAGS.map(({ flag, title }) => (
            <button
              key={flag}
              title={title}
              onClick={() => toggleFlag(flag)}
              className={`w-8 h-8 text-xs font-mono font-black rounded-lg border transition-colors ${
                flags.has(flag)
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-slate-400 border-slate-200 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              {flag}
            </button>
          ))}
        </div>

        {error && <p className="mb-3 text-xs text-red-500 font-mono break-all">{error}</p>}

        {/* 예제 패턴 */}
        <div>
          <p className="text-xs text-slate-400 mb-2">예제 패턴</p>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map(p => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  selectedPreset === p.name
                    ? 'bg-rose-50 border-rose-400 text-rose-600 font-bold ring-1 ring-rose-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 테스트 문자열 */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-slate-800 mb-4 pb-3 border-b border-slate-100">테스트 문자열</h2>
        <textarea
          className={`${DEV_INPUT_CLS} min-h-[120px] resize-y`}
          placeholder="매치를 확인할 텍스트를 입력하세요..."
          value={testText}
          onChange={e => setTestText(e.target.value)}
          spellCheck={false}
        />
      </section>

      {/* 결과 */}
      {showResult && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-black text-slate-800">매치 결과</h2>
            {matches.length > 0
              ? <span className="text-xs font-black px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg border border-rose-200">{matches.length}개 매치</span>
              : <span className="text-xs text-slate-400 font-bold">매치 없음</span>
            }
          </div>

          {/* 하이라이팅 프리뷰 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap break-all min-h-[60px] leading-relaxed mb-4">
            {segments.map((seg, i) =>
              seg.hi
                ? <mark key={i} className="bg-rose-200 text-rose-900 rounded-sm not-italic">{seg.text}</mark>
                : <span key={i}>{seg.text}</span>
            )}
          </div>

          {/* 캡처 그룹 테이블 */}
          {hasCaptures && (
            <div className="overflow-x-auto">
              <p className="text-xs text-slate-500 font-bold mb-2">캡처 그룹</p>
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-3 py-2 border border-slate-200 text-slate-500 font-bold">#</th>
                    <th className="text-left px-3 py-2 border border-slate-200 text-slate-500 font-bold">전체 매치</th>
                    {Array.from({ length: maxGroups }, (_, i) => (
                      <th key={i} className="text-left px-3 py-2 border border-slate-200 text-slate-500 font-bold">그룹 {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m, i) => (
                    <tr key={i} className="hover:bg-rose-50 transition-colors">
                      <td className="px-3 py-2 border border-slate-200 text-slate-400">{i + 1}</td>
                      <td className="px-3 py-2 border border-slate-200 text-rose-700 font-bold">{m.value}</td>
                      {m.groups.map((g, j) => (
                        <td key={j} className="px-3 py-2 border border-slate-200 text-slate-600">
                          {g !== undefined ? g : <span className="text-slate-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 매치 목록 (캡처 그룹 없을 때) */}
          {!hasCaptures && matches.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 font-bold mb-2">매치 목록</p>
              <div className="space-y-1">
                {matches.slice(0, 30).map((m, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400 w-6 text-right shrink-0">{i + 1}</span>
                    <span className="font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-100">{m.value}</span>
                    <span className="text-slate-400">위치 {m.index}</span>
                  </div>
                ))}
                {matches.length > 30 && (
                  <p className="text-xs text-slate-400 pl-9">... 외 {matches.length - 30}개</p>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
        <h3 className="font-bold text-slate-600 mb-1.5">💡 플래그 설명</h3>
        <ul className="space-y-1">
          {ALL_FLAGS.map(({ flag, title }) => (
            <li key={flag}>· <span className="font-mono text-slate-700">{flag}</span> — {title}</li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
