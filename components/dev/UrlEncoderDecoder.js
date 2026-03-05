'use client'
import { useState, useEffect } from 'react'
import { DEV_INPUT_CLS } from '@/lib/devTools'

export default function UrlEncoderDecoder() {
  const [tab, setTab] = useState('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setError('')
    setCopied(false)
    if (!input) { setOutput(''); return }
    try {
      if (tab === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch {
      setOutput('')
      setError(tab === 'decode' ? '유효하지 않은 URL 인코딩 문자열입니다.' : '인코딩 중 오류가 발생했습니다.')
    }
  }, [input, tab])

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
        <button onClick={() => handleTabChange('encode')} className={`${btnBase} flex-1 ${tab === 'encode' ? 'bg-violet-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300'}`}>
          인코딩
        </button>
        <button onClick={() => handleTabChange('decode')} className={`${btnBase} flex-1 ${tab === 'decode' ? 'bg-violet-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300'}`}>
          디코딩
        </button>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">
          {tab === 'encode' ? '인코딩할 텍스트' : '디코딩할 URL 문자열'}
        </h2>
        <textarea
          className={`${DEV_INPUT_CLS} min-h-[100px] resize-y`}
          placeholder={tab === 'encode'
            ? '인코딩할 텍스트를 입력하세요.\n예) 안녕하세요? Hello World!'
            : '디코딩할 URL 문자열을 입력하세요.\n예) %EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        {!error && input && <p className="mt-1.5 text-[11px] text-violet-400 font-bold">입력과 동시에 실시간 변환됩니다</p>}
      </section>

      {output && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-black text-slate-800">
              {tab === 'encode' ? '인코딩 결과' : '디코딩 결과'}
            </h2>
            <button onClick={copy}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors border border-violet-200">
              {copied ? '복사됨 ✓' : '복사'}
            </button>
          </div>
          <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl p-5 mb-4">
            <p className="text-xs text-white/75 mb-2 font-bold">
              {tab === 'encode' ? 'percent-encoding 결과' : '디코딩된 텍스트'}
            </p>
            <p className="text-sm text-white font-mono break-all leading-relaxed">{output}</p>
          </div>
          <div className="text-xs text-slate-400 flex gap-4">
            <span>입력 {input.length}자</span>
            <span>출력 {output.length}자</span>
          </div>
        </section>
      )}

      <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
        <h3 className="font-bold text-slate-600 mb-1.5">💡 URL 인코딩이란?</h3>
        <ul className="space-y-1">
          <li>· URL에서 사용할 수 없는 문자를 %XX 형식으로 변환하는 방식입니다</li>
          <li>· 한글, 공백, 특수문자 등을 URL에 안전하게 포함시킬 수 있습니다</li>
          <li>· <code className="bg-slate-100 px-1 rounded">encodeURIComponent</code> 방식을 사용합니다 (/, ?, # 등도 인코딩)</li>
          <li>· 쿼리 파라미터 값, 경로 세그먼트 인코딩에 사용됩니다</li>
        </ul>
      </aside>
    </div>
  )
}
