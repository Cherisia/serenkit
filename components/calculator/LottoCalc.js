'use client'

import { useState, useEffect, useRef } from 'react'
import { pushParams, readParams } from '@/lib/urlParams'

function ballCls(n) {
  if (n <= 10) return 'bg-yellow-400 text-yellow-900 shadow-yellow-200'
  if (n <= 20) return 'bg-sky-500 text-white shadow-sky-200'
  if (n <= 30) return 'bg-red-500 text-white shadow-red-200'
  if (n <= 40) return 'bg-stone-600 text-white shadow-stone-300'
  return 'bg-green-500 text-white shadow-green-200'
}

function pickNumbers(excludeSet) {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1).filter(n => !excludeSet.has(n))
  if (pool.length < 6) return null
  const p = [...pool]
  const result = []
  while (result.length < 6) {
    const i = Math.floor(Math.random() * p.length)
    result.push(p.splice(i, 1)[0])
  }
  return result.sort((a, b) => a - b)
}

// 다음 로또 추첨일 계산 (매주 토요일 오후 8:45)
function getNextDraw() {
  const now = new Date()
  const day = now.getDay() // 0=일, 6=토
  let daysUntil = (6 - day + 7) % 7

  // 토요일이고 오후 8:45 이후면 다음 주 토요일
  if (daysUntil === 0) {
    const isPastDraw = now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() >= 45)
    if (isPastDraw) daysUntil = 7
  }

  const nextDate = new Date(now)
  nextDate.setDate(now.getDate() + daysUntil)

  return {
    daysUntil,
    isToday: daysUntil === 0,
    dateLabel: `${nextDate.getMonth() + 1}월 ${nextDate.getDate()}일 (토)`,
  }
}

const ROLL_MS = 2000
const SETTLE_MS = 400

export default function LottoCalc() {
  const [nextDraw, setNextDraw] = useState(null)
  const [excludes, setExcludes] = useState(new Set())
  const [gameCount, setGameCount] = useState(1)
  const [phase, setPhase] = useState('idle') // idle | rolling | done
  const [finalGames, setFinalGames] = useState([])
  const [display, setDisplay] = useState([])
  const [settled, setSettled] = useState([])
  const [justSettled, setJustSettled] = useState(new Set())
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(null)

  const timersRef = useRef([])
  const intervalRef = useRef(null)
  const settledRef = useRef([])

  function clearAll() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }

  useEffect(() => () => clearAll(), [])

  useEffect(() => {
    setNextDraw(getNextDraw())

    const p = readParams()
    if (p.results) {
      const games = p.results.split(',').map(g => g.split('-').map(Number))
      if (games.every(g => g.length === 6 && g.every(n => n >= 1 && n <= 45))) {
        setFinalGames(games)
        setPhase('done')
        setHistory([games])
      }
    }
  }, [])

  function draw() {
    clearAll()

    const games = Array.from({ length: gameCount }, () => pickNumbers(excludes))
    if (games.some(g => !g)) return

    settledRef.current = Array(6).fill(false)
    setFinalGames(games)
    setPhase('rolling')
    setSettled(Array(6).fill(false))
    setJustSettled(new Set())
    setDisplay(games.map(() => Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1)))

    intervalRef.current = setInterval(() => {
      setDisplay(() =>
        games.map(game =>
          game.map((final, bi) =>
            settledRef.current[bi] ? final : Math.floor(Math.random() * 45) + 1
          )
        )
      )
    }, 80)

    for (let b = 0; b < 6; b++) {
      const bi = b
      const t = setTimeout(() => {
        settledRef.current[bi] = true
        setSettled(prev => { const n = [...prev]; n[bi] = true; return n })
        setJustSettled(prev => new Set([...prev, bi]))
        timersRef.current.push(setTimeout(() => {
          setJustSettled(prev => { const s = new Set(prev); s.delete(bi); return s })
        }, 650))
      }, ROLL_MS + bi * SETTLE_MS)
      timersRef.current.push(t)
    }

    timersRef.current.push(setTimeout(() => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setPhase('done')
      setHistory(prev => [games, ...prev].slice(0, 5))
      pushParams({ results: games.map(g => g.join('-')).join(',') })
    }, ROLL_MS + 6 * SETTLE_MS + 150))
  }

  function toggleExclude(n) {
    if (phase === 'rolling') return
    setExcludes(prev => {
      const s = new Set(prev)
      if (s.has(n)) s.delete(n)
      else if (45 - s.size > 6) s.add(n)
      return s
    })
  }

  async function copyGame(game, gi) {
    try { await navigator.clipboard.writeText(game.join(', ')) } catch {}
    setCopied(gi)
    setTimeout(() => setCopied(null), 1500)
  }

  const isRolling = phase === 'rolling'
  const showResults = phase !== 'idle'
  const resultData = isRolling ? display : finalGames

  return (
    <>
      <style>{`
        @keyframes ballPop {
          0%   { transform: scale(0.5); opacity: 0.5; }
          55%  { transform: scale(1.4); opacity: 1; }
          78%  { transform: scale(0.88); }
          100% { transform: scale(1); }
        }
        .ball-pop { animation: ballPop 0.6s cubic-bezier(.36,.07,.19,.97) both; }

        @keyframes rollShake {
          0%, 100% { transform: translateY(0); }
          25%       { transform: translateY(-2px); }
          75%       { transform: translateY(2px); }
        }
        .ball-rolling { animation: rollShake 0.25s ease-in-out infinite; }
      `}</style>

      <div className="space-y-4">

        {/* 다음 추첨일 */}
        {nextDraw && (
          <div className="bg-white border border-stone-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold text-stone-400 mb-1">다음 로또 추첨일</p>
              <p className="text-sm font-black text-stone-800">
                {nextDraw.isToday
                  ? <span className="text-violet-600">오늘 추첨! 오후 8시 45분</span>
                  : <><span className="text-violet-600">D-{nextDraw.daysUntil}</span> <span className="text-stone-500 font-bold">{nextDraw.dateLabel}</span></>
                }
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">매주 토요일 오후 8시 45분 추첨</p>
            </div>
            {nextDraw.daysUntil <= 1 && (
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${nextDraw.isToday ? 'bg-violet-500 text-white' : 'bg-violet-100 text-violet-600'}`}>
                {nextDraw.isToday ? '오늘!' : '내일!'}
              </span>
            )}
          </div>
        )}

        {/* 추첨 설정 */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-violet-400">추첨 설정</h2>

          <div className="mb-5">
            <p className="text-xs font-black text-stone-600 mb-2.5">게임 수</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n}
                  onClick={() => !isRolling && setGameCount(n)}
                  className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                    gameCount === n
                      ? 'bg-violet-500 text-white shadow-md shadow-violet-200'
                      : 'bg-stone-100 text-stone-500 hover:bg-violet-100 hover:text-violet-600'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-black text-stone-600">
                제외할 번호
                <span className="font-bold text-stone-400 ml-1.5">({excludes.size}개 선택)</span>
              </p>
              {excludes.size > 0 && (
                <button onClick={() => setExcludes(new Set())}
                  className="text-[10px] font-bold text-stone-300 hover:text-red-400 transition-colors">
                  전체 해제
                </button>
              )}
            </div>
            <div className="grid grid-cols-9 gap-1">
              {Array.from({ length: 45 }, (_, i) => i + 1).map(n => (
                <button key={n}
                  onClick={() => toggleExclude(n)}
                  className={`h-7 rounded-lg text-[11px] font-bold transition-all ${
                    excludes.has(n)
                      ? 'bg-red-100 text-red-400 line-through'
                      : 'bg-stone-50 text-stone-500 hover:bg-violet-100 hover:text-violet-600'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={draw}
            disabled={isRolling}
            className={`w-full py-4 rounded-xl font-black text-sm transition-all duration-200 ${
              isRolling
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
            }`}>
            {isRolling ? '🎰 추첨 중...' : phase === 'done' ? '🎱 다시 추첨하기' : '🎱 번호 추첨하기'}
          </button>
        </section>

        {/* 추첨 결과 */}
        {showResults && (
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-purple-400">추첨 결과</h2>

            <div className="space-y-6">
              {resultData.map((game, gi) => (
                <div key={gi}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      phase === 'done' ? 'bg-violet-100 text-violet-600' : 'bg-stone-100 text-stone-400'
                    }`}>{gi + 1}게임</span>
                    {phase === 'done' && (
                      <button onClick={() => copyGame(finalGames[gi], gi)}
                        className="text-[10px] font-bold text-stone-300 hover:text-violet-500 transition-colors">
                        {copied === gi ? '✓ 복사됨' : '번호 복사'}
                      </button>
                    )}
                  </div>

                  <div className="flex gap-1.5 md:gap-2.5">
                    {game.map((num, bi) => {
                      const isSettledBall = settled[bi]
                      const isJust = justSettled.has(bi)
                      const finalNum = finalGames[gi]?.[bi]
                      const showFinal = isSettledBall || !isRolling

                      return (
                        <div key={bi}
                          className={[
                            'w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center',
                            'text-sm md:text-base font-black shadow-md select-none',
                            showFinal ? ballCls(finalNum) : 'bg-stone-200 text-stone-500',
                            isJust ? 'ball-pop' : (isRolling && !isSettledBall ? 'ball-rolling' : ''),
                          ].join(' ')}>
                          {showFinal ? finalNum : num}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* 색상 범례 */}
            <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap gap-3">
              {[
                { label: '1~10', cls: 'bg-yellow-400' },
                { label: '11~20', cls: 'bg-sky-500' },
                { label: '21~30', cls: 'bg-red-500' },
                { label: '31~40', cls: 'bg-stone-600' },
                { label: '41~45', cls: 'bg-green-500' },
              ].map(({ label, cls }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-full ${cls}`} />
                  <span className="text-[10px] text-stone-400">{label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 이전 추첨 기록 */}
        {history.length > 1 && (
          <section className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="text-sm font-black text-stone-800 mb-4 pb-3 border-b-2 border-stone-200">이전 추첨 기록</h2>
            <div className="space-y-4">
              {history.slice(1, 4).map((games, hi) => (
                <div key={hi} className="opacity-50">
                  {games.map((game, gi) => (
                    <div key={gi} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-stone-400 w-8 shrink-0">{gi + 1}게임</span>
                      <div className="flex gap-1.5">
                        {game.map((n, bi) => (
                          <div key={bi}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${ballCls(n)}`}>
                            {n}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        <aside className="bg-violet-50 border border-violet-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
          <h3 className="font-bold text-stone-600 mb-1.5">💡 이용 안내</h3>
          <p>번호는 완전 무작위로 생성되며 실제 당첨을 보장하지 않습니다. 동행복권 로또 6/45는 <strong className="text-stone-600">매주 토요일 오후 8시 45분</strong>에 추첨되며, 구매 마감은 추첨 당일 오후 8시입니다.</p>
        </aside>

      </div>
    </>
  )
}
