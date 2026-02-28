'use client'
import { useState } from 'react'

// EUC-KR 기준 바이트 계산 (한글 2B, 영문·숫자 1B)
function getByteLength(str) {
  let bytes = 0
  for (let i = 0; i < str.length; i++) {
    bytes += str.charCodeAt(i) > 127 ? 2 : 1
  }
  return bytes
}

const PRESETS = [
  { name: '자기소개서 (1,000자)',      limit: 1000, type: 'char' },
  { name: '자기소개서 (500자)',         limit: 500,  type: 'char' },
  { name: '트위터 / X (280자)',         limit: 280,  type: 'char' },
  { name: '인스타그램 캡션 (2,200자)', limit: 2200, type: 'char' },
  { name: 'SMS 단문 (90바이트)',        limit: 90,   type: 'byte' },
  { name: 'MMS 장문 (2,000바이트)',     limit: 2000, type: 'byte' },
]

export default function CharCountCalc() {
  const [text, setText] = useState('')

  const charCount   = text.length
  const charNoSpace = text.replace(/\s/g, '').length
  const byteCount   = getByteLength(text)
  const wordCount   = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const lineCount   = text === '' ? 0 : text.split('\n').length

  return (
    <div className="space-y-4">

      {/* 텍스트 입력 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">텍스트 입력</h2>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="여기에 텍스트를 붙여넣거나 직접 입력하세요..."
          rows={8}
          className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed overflow-y-scroll max-h-52"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-stone-400">
            {charCount > 0 ? `${charCount.toLocaleString('ko-KR')}자 입력됨` : '텍스트를 입력하면 실시간으로 분석합니다'}
          </span>
          {text && (
            <button
              onClick={() => setText('')}
              className="text-xs text-stone-400 hover:text-red-400 transition-colors"
            >
              초기화
            </button>
          )}
        </div>
      </section>

      {/* 글자수 분석 결과 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">글자수 분석</h2>

        {/* 주요 수치 카드 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl p-5 text-white text-center">
            <p className="text-xs font-bold opacity-80 mb-1">전체 글자수</p>
            <p className="text-4xl font-black leading-none">{charCount.toLocaleString('ko-KR')}</p>
            <p className="text-[11px] opacity-60 mt-1.5">공백 포함</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-400 to-blue-400 rounded-2xl p-5 text-white text-center">
            <p className="text-xs font-bold opacity-80 mb-1">공백 제외</p>
            <p className="text-4xl font-black leading-none">{charNoSpace.toLocaleString('ko-KR')}</p>
            <p className="text-[11px] opacity-60 mt-1.5">순수 글자수</p>
          </div>
        </div>

        {/* 상세 수치 */}
        <table className="w-full">
          <tbody>
            {[
              { label: '바이트 수', value: `${byteCount.toLocaleString('ko-KR')} B`, sub: '한글 2B · 영문 1B 기준' },
              { label: '단어 수',   value: `${wordCount.toLocaleString('ko-KR')} 개` },
              { label: '줄 수',    value: `${lineCount.toLocaleString('ko-KR')} 줄` },
            ].map(({ label, value, sub }) => (
              <tr key={label} className="border-b border-stone-100 last:border-none">
                <td className="py-2.5 text-xs text-stone-500">{label}</td>
                <td className="py-2.5 text-right">
                  <span className="text-sm font-black text-stone-800">{value}</span>
                  {sub && <span className="text-[10px] text-stone-400 ml-1.5">({sub})</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 글자 제한 확인 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-sky-400">글자 제한 확인</h2>
        <div className="space-y-4">
          {PRESETS.map(({ name, limit, type }) => {
            const count = type === 'char' ? charCount : byteCount
            const pct   = Math.min((count / limit) * 100, 100)
            const over  = count > limit
            const barColor = pct < 70 ? 'bg-sky-400' : pct < 90 ? 'bg-amber-400' : 'bg-red-400'
            return (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-stone-600">{name}</span>
                  <span className={`text-xs font-black ${over ? 'text-red-500' : 'text-stone-700'}`}>
                    {count.toLocaleString('ko-KR')} / {limit.toLocaleString('ko-KR')}
                    {over && <span className="ml-1 font-normal text-[10px]">(+{(count - limit).toLocaleString('ko-KR')} 초과)</span>}
                  </span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <ul className="space-y-1">
          <li>• 전체 글자수는 공백(스페이스·줄바꿈·탭)을 포함한 모든 문자를 셉니다.</li>
          <li>• 바이트 수는 한글·특수문자 2바이트, 영문·숫자 1바이트 기준(EUC-KR)입니다.</li>
          <li>• 자기소개서 글자수는 대부분 공백 포함 기준이나, 회사마다 다를 수 있어요.</li>
          <li>• SMS 단문(90바이트)은 한글 기준 약 45자까지 전송 가능합니다.</li>
        </ul>
      </aside>

    </div>
  )
}
