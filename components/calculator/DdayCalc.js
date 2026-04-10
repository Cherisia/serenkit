'use client'
import { useState, useEffect } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

function toStr(d) { return d.toISOString().split('T')[0] }

const PRESETS = [
  { label: '수능',        value: () => { const y = new Date(); return `${y.getMonth() >= 10 ? y.getFullYear() + 1 : y.getFullYear()}-11-14` } },
  { label: '크리스마스',  value: () => `${new Date().getFullYear()}-12-25` },
  { label: '새해',        value: () => `${new Date().getFullYear() + 1}-01-01` },
  { label: '어린이날',    value: () => `${new Date().getFullYear()}-05-05` },
  { label: '발렌타인',    value: () => `${new Date().getFullYear()}-02-14` },
]

function Card({ children, as: Tag = 'section' }) {
  return <Tag className="bg-white border border-stone-200 rounded-2xl p-6">{children}</Tag>
}

function SectionTitle({ children, color = 'border-amber-400' }) {
  return <h2 className={`text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 ${color}`}>{children}</h2>
}

function InputField({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-stone-600 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}

function DateInput({ value, onChange }) {
  return (
    <input type="date" value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
  )
}

export default function DdayCalc() {
  const [baseDate, setBaseDate]     = useState(toStr(new Date()))
  const [targetDate, setTargetDate] = useState('')
  const [label, setLabel]           = useState('')
  const [result, setResult]         = useState(null)

  useEffect(() => {
    const p = readParams()
    if (p.targetDate) {
      const bd = p.baseDate || toStr(new Date()), td = p.targetDate, lb = p.label || ''
      setBaseDate(bd); setTargetDate(td); setLabel(lb)
      const base = new Date(bd); base.setHours(0,0,0,0)
      const target = new Date(td); target.setHours(0,0,0,0)
      setResult({ diff: Math.round((target - base) / 86400000), base, target, label: lb })
    }
  }, [])

  const calculate = () => {
    if (!targetDate) return
    pushParams({ baseDate, targetDate, ...(label && { label }) })
    const base   = new Date(baseDate);   base.setHours(0,0,0,0)
    const target = new Date(targetDate); target.setHours(0,0,0,0)
    const diff = Math.round((target - base) / 86400000)
    setResult({ diff, base, target, label })
  }

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle>계산 조건 입력</SectionTitle>
        <div className="space-y-4">
          <InputField label="기준일" required>
            <DateInput value={baseDate} onChange={setBaseDate} />
          </InputField>

          <InputField label="목표일 (D-day)" required>
            <DateInput value={targetDate} onChange={setTargetDate} />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESETS.map((p) => (
                <button key={p.label} onClick={() => setTargetDate(p.value())}
                  className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold hover:bg-amber-100 transition-colors">
                  {p.label}
                </button>
              ))}
            </div>
          </InputField>

          <InputField label="이름 (선택)">
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)}
              placeholder="예) 수능, 결혼기념일, 프로젝트 마감"
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors" />
          </InputField>
        </div>

        <button onClick={calculate} disabled={!targetDate}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </Card>

      {result && (
        <Card>
          <SectionTitle color="border-orange-400">계산 결과</SectionTitle>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 mb-4 text-center">
            {result.label && <p className="text-xs font-bold text-stone-400 mb-2">{result.label}</p>}
            <p className="text-5xl font-black text-amber-500 mb-1">
              {result.diff === 0 ? 'D-Day' : result.diff > 0 ? `D-${result.diff}` : `D+${Math.abs(result.diff)}`}
            </p>
            <p className="text-xs text-stone-400 mt-2">
              {result.diff === 0 ? '🎉 오늘이 바로 그 날입니다!' : result.diff > 0 ? `목표일까지 ${result.diff}일 남았어요` : `목표일로부터 ${Math.abs(result.diff)}일이 지났어요`}
            </p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['기준일', result.base.toLocaleDateString('ko-KR',   { year:'numeric', month:'long', day:'numeric', weekday:'short' })],
                ['목표일', result.target.toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric', weekday:'short' })],
                ['D-day',  result.diff === 0 ? 'D-Day' : result.diff > 0 ? `D-${result.diff}` : `D+${Math.abs(result.diff)}`],
                ['총 일수', `${Math.abs(result.diff)}일`],
                ['주 단위', `약 ${Math.floor(Math.abs(result.diff)/7)}주 ${Math.abs(result.diff)%7}일`],
              ].map(([k,v]) => (
                <tr key={k} className="border-b border-stone-100 last:border-none">
                  <td className="py-2.5 text-xs text-stone-400">{k}</td>
                  <td className="py-2.5 text-right text-xs font-bold text-stone-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 D-day 계산이란?</h3>
        <p>기준일 기준으로 목표일이 미래면 D-숫자, 과거면 D+숫자로 표시해요. 수능·시험·기념일까지 남은 날을 확인할 때 활용하세요.</p>
      </aside>
    </div>
  )
}
