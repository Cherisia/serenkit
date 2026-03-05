'use client'
import { useState } from 'react'
import { DEV_INPUT_CLS } from '@/lib/devTools'

export default function Base64Tool() {
  const [tab, setTab] = useState('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function process() {
    setError('')
    setOutput('')
    setCopied(false)
    if (!input.trim()) { setError('텍스트를 입력해주세요.'); return }
    if (tab === 'encode') {
      try {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
      } catch {
        setError('인코딩 중 오류가 발생했습니다.')
      }
    } else {
      try {
        const decoded = decodeURIComponent(escape(atob(input.trim())))
        setOutput(decoded)
      } catch {
        setError('유효하지 않은 Base64 문자열입니다. 올바른 Base64 인코딩 값을 입력해주세요.')
      }
    }
  }

  function copy() {
    if (!output) return
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleTabChange(t) {
    setTab(t)
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  const btnBase = 'px-4 py-2 text-sm font-black rounded-xl transition-colors'

  return (
    <div className="space-y-4">
      {/* 탭 */}
      <div className="flex gap-2">
        <button onClick={() => handleTabChange('encode')} className={`${btnBase} flex-1 ${tab === 'encode' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
          인코딩
        </button>
        <button onClick={() => handleTabChange('decode')} className={`${btnBase} flex-1 ${tab === 'decode' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
          디코딩
        </button>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">
          {tab === 'encode' ? '인코딩할 텍스트 입력' : 'Base64 문자열 입력'}
        </h2>
        <textarea
          className={`${DEV_INPUT_CLS} min-h-[120px] resize-y`}
          placeholder={tab === 'encode' ? '인코딩할 텍스트를 입력하세요...' : 'Base64 문자열을 입력하세요...'}
          value={input}
          onChange={e => { setInput(e.target.value); setOutput(''); setError('') }}
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        <button onClick={process}
          className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          {tab === 'encode' ? 'Base64 인코딩' : 'Base64 디코딩'}
        </button>
      </section>

      {output && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-black text-slate-800">
              {tab === 'encode' ? '인코딩 결과' : '디코딩 결과'}
            </h2>
            <button onClick={copy}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-200">
              {copied ? '복사됨 ✓' : '복사'}
            </button>
          </div>
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 mb-4">
            <p className="text-xs text-white/75 mb-2 font-bold">{tab === 'encode' ? 'Base64 인코딩 결과' : '디코딩된 텍스트'}</p>
            <p className="text-sm text-white font-mono break-all leading-relaxed">{output}</p>
          </div>
          <div className="text-xs text-slate-400 flex gap-4">
            <span>입력 {input.length}자</span>
            <span>출력 {output.length}자</span>
            {tab === 'encode' && (
              <span>압축률 {Math.round((1 - output.length / (input.length || 1)) * 100)}%</span>
            )}
          </div>
        </section>
      )}

      <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
        <h3 className="font-bold text-slate-600 mb-1.5">💡 Base64란?</h3>
        <ul className="space-y-1">
          <li>· 바이너리 데이터를 ASCII 문자로 표현하는 인코딩 방식입니다</li>
          <li>· 이메일 첨부 파일, 이미지 data URI, JWT 토큰 등에 사용됩니다</li>
          <li>· 원본 대비 약 33% 크기가 증가합니다</li>
          <li>· 한글, 이모지 등 유니코드 문자도 지원합니다</li>
        </ul>
      </aside>
    </div>
  )
}
