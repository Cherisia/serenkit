'use client'
import { useState } from 'react'
import { DEV_INPUT_CLS } from '@/lib/devTools'

function parseTimestamp(raw) {
  const n = raw.trim().replace(/,/g, '')
  if (!/^\d+$/.test(n)) return null
  const num = parseInt(n, 10)
  // 밀리초 자동 감지: 13자리 이상이면 ms
  const ms = n.length >= 13 ? num : num * 1000
  return new Date(ms)
}

function formatDate(date, tz) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).format(date)
}

function dateStringToTimestamp(raw) {
  const d = new Date(raw.trim())
  if (isNaN(d.getTime())) return null
  return d
}

export default function TimestampConverter() {
  const [tsInput, setTsInput] = useState('')
  const [tsResult, setTsResult] = useState(null)
  const [tsError, setTsError] = useState('')

  const [dtInput, setDtInput] = useState('')
  const [dtResult, setDtResult] = useState(null)
  const [dtError, setDtError] = useState('')

  const [tab, setTab] = useState('ts') // 'ts' | 'dt'

  function handleNow() {
    const now = Date.now()
    setTsInput(String(now))
    convertTs(String(now))
  }

  function convertTs(val) {
    const raw = val ?? tsInput
    setTsError('')
    setTsResult(null)
    if (!raw.trim()) { setTsError('타임스탬프를 입력해주세요.'); return }
    const d = parseTimestamp(raw)
    if (!d || isNaN(d.getTime())) { setTsError('올바른 Unix 타임스탬프를 입력해주세요.'); return }
    const num = parseInt(raw.trim().replace(/,/g, ''), 10)
    const isMs = raw.trim().replace(/,/g, '').length >= 13
    setTsResult({
      utc: formatDate(d, 'UTC'),
      kst: formatDate(d, 'Asia/Seoul'),
      iso: d.toISOString(),
      unit: isMs ? '밀리초(ms)' : '초(s)',
      epoch: isMs ? num : num * 1000,
    })
  }

  function convertDt() {
    setDtError('')
    setDtResult(null)
    if (!dtInput.trim()) { setDtError('날짜/시간을 입력해주세요.'); return }
    const d = dateStringToTimestamp(dtInput)
    if (!d) { setDtError('올바른 날짜/시간 형식을 입력해주세요.\n예) 2026-03-01 12:00:00'); return }
    setDtResult({
      sec: Math.floor(d.getTime() / 1000),
      ms: d.getTime(),
      iso: d.toISOString(),
      utc: formatDate(d, 'UTC'),
      kst: formatDate(d, 'Asia/Seoul'),
    })
  }

  const btnBase = 'px-4 py-2 text-sm font-black rounded-xl transition-colors'

  return (
    <div className="space-y-4">
      {/* 탭 */}
      <div className="flex gap-2">
        <button onClick={() => setTab('ts')} className={`${btnBase} flex-1 ${tab === 'ts' ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-300'}`}>
          타임스탬프 → 날짜
        </button>
        <button onClick={() => setTab('dt')} className={`${btnBase} flex-1 ${tab === 'dt' ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-300'}`}>
          날짜 → 타임스탬프
        </button>
      </div>

      {tab === 'ts' && (
        <>
          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">타임스탬프 입력</h2>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">Unix 타임스탬프 (초 또는 밀리초)</label>
            <input
              className={DEV_INPUT_CLS}
              placeholder="예) 1709280000 또는 1709280000000"
              value={tsInput}
              onChange={e => setTsInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && convertTs()}
            />
            {tsError && <p className="mt-2 text-xs text-red-500">{tsError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={handleNow}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl py-3 text-sm transition-colors">
                현재 시각
              </button>
              <button onClick={() => convertTs()}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-xl py-3 text-sm transition-colors">
                변환하기
              </button>
            </div>
          </section>

          {tsResult && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">변환 결과</h2>
              <div className="bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs text-white/75 mb-1">KST (한국 표준시)</p>
                <p className="text-xl font-black tracking-tight">{tsResult.kst}</p>
                <p className="text-xs text-white/60 mt-1">입력 단위: {tsResult.unit}</p>
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-100">
                  <tr className="py-2">
                    <td className="py-2.5 text-slate-500 font-bold w-24">UTC</td>
                    <td className="py-2.5 text-slate-800 font-mono">{tsResult.utc}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">KST</td>
                    <td className="py-2.5 text-slate-800 font-mono">{tsResult.kst}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">ISO 8601</td>
                    <td className="py-2.5 text-slate-800 font-mono break-all">{tsResult.iso}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">밀리초</td>
                    <td className="py-2.5 text-slate-800 font-mono">{tsResult.epoch.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
        </>
      )}

      {tab === 'dt' && (
        <>
          <section className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">날짜/시간 입력</h2>
            <label className="block text-xs font-bold text-slate-500 mb-1.5">날짜/시간 문자열</label>
            <input
              className={DEV_INPUT_CLS}
              placeholder="예) 2026-03-01 09:00:00"
              value={dtInput}
              onChange={e => setDtInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && convertDt()}
            />
            <p className="mt-1.5 text-[11px] text-slate-400">YYYY-MM-DD HH:MM:SS 또는 ISO 8601 형식</p>
            {dtError && <p className="mt-2 text-xs text-red-500 whitespace-pre-line">{dtError}</p>}
            <button onClick={convertDt}
              className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
              변환하기
            </button>
          </section>

          {dtResult && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-sm font-black text-slate-800 mb-5 pb-3 border-b border-slate-100">변환 결과</h2>
              <div className="bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl p-5 text-white text-center mb-4">
                <p className="text-xs text-white/75 mb-1">Unix 타임스탬프 (초)</p>
                <p className="text-2xl font-black tracking-tight font-mono">{dtResult.sec}</p>
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold w-24">초(s)</td>
                    <td className="py-2.5 text-slate-800 font-mono">{dtResult.sec}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">밀리초(ms)</td>
                    <td className="py-2.5 text-slate-800 font-mono">{dtResult.ms.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">ISO 8601</td>
                    <td className="py-2.5 text-slate-800 font-mono break-all">{dtResult.iso}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">UTC</td>
                    <td className="py-2.5 text-slate-800 font-mono">{dtResult.utc}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-slate-500 font-bold">KST</td>
                    <td className="py-2.5 text-slate-800 font-mono">{dtResult.kst}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
        </>
      )}

      <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
        <h3 className="font-bold text-slate-600 mb-1.5">💡 사용 기준</h3>
        <ul className="space-y-1">
          <li>· Unix 타임스탬프: 1970-01-01 00:00:00 UTC 기준 경과 시간(초 또는 밀리초)</li>
          <li>· 13자리 이상 입력 시 밀리초로 자동 인식합니다</li>
          <li>· 날짜 입력 시 로컬 시간대(브라우저 설정) 기준으로 처리됩니다</li>
          <li>· KST는 UTC+9 (한국 표준시)입니다</li>
        </ul>
      </aside>
    </div>
  )
}
