'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useFavorites } from '@/components/share/FavoritesProvider'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function Key({ children }) {
  return (
    <kbd className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-600 text-[11px] font-black shadow-sm min-w-[28px]">
      {children}
    </kbd>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [bmOpen, setBmOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)

  const favRef = useRef(null)
  const bmRef = useRef(null)
  const pathname = usePathname()
  const isMain = pathname === '/'
  const { favCalcs, toggle } = useFavorites()

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // 각 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e) => {
      if (favRef.current && !favRef.current.contains(e.target)) setFavOpen(false)
      if (bmRef.current && !bmRef.current.contains(e.target)) setBmOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const white = isMain && !scrolled && !favOpen && !bmOpen

  const btnCls = (active) => `relative flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-200 ${
    white
      ? 'border-white/30 text-white/80 hover:bg-white/20'
      : active
        ? 'border-amber-300 text-amber-500 bg-amber-50'
        : 'border-stone-200 text-stone-500 hover:border-amber-200 hover:text-amber-500 hover:bg-amber-50'
  }`

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b
      ${!white ? 'bg-white border-stone-100 shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className={`container mx-auto px-5 flex justify-between items-center transition-all duration-300
        ${scrolled ? 'py-3' : 'py-4'}`}>

        {/* 로고 */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className={`text-2xl font-black tracking-tight transition-colors duration-300
            ${white ? 'text-white' : 'text-stone-800'}`}>
            seren<span className={white ? 'text-white' : 'text-amber-400'}>kit</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">

          {/* 북마크 버튼 */}
          <div className="relative" ref={bmRef}>
            <button
              onClick={() => { setBmOpen(v => !v); setFavOpen(false) }}
              aria-label="북마크에 추가"
              className={btnCls(bmOpen)}
            >
              <BookmarkIcon />
              <span className="hidden sm:inline text-xs font-bold">북마크</span>
            </button>

            {bmOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-stone-100">
                  <p className="text-xs font-black text-stone-700">북마크에 추가</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">브라우저에 이 페이지를 저장해요</p>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 mb-1.5">
                      {isMac ? 'macOS' : 'Windows / Linux'}
                    </p>
                    <div className="flex items-center gap-1.5">
                      {isMac
                        ? <><Key>⌘</Key><span className="text-stone-300 text-xs">+</span><Key>D</Key></>
                        : <><Key>Ctrl</Key><span className="text-stone-300 text-xs">+</span><Key>D</Key></>
                      }
                      <span className="text-[11px] text-stone-400 ml-1">를 눌러보세요</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-relaxed border-t border-stone-50 pt-3">
                    브라우저 북마크 바에 추가하면<br />언제든 빠르게 접속할 수 있어요
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 즐겨찾기 버튼 */}
          <div className="relative" ref={favRef}>
            <button
              onClick={() => { setFavOpen(v => !v); setBmOpen(false) }}
              aria-label="즐겨찾기"
              className={btnCls(favOpen)}
            >
              <HeartIcon filled={favCalcs.length > 0} />
              <span className="hidden sm:inline text-xs font-bold">즐겨찾기</span>
              {favCalcs.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-amber-400 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                  {favCalcs.length}
                </span>
              )}
            </button>

            {favOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-black text-stone-700">즐겨찾기</span>
                  {favCalcs.length > 0 && (
                    <span className="text-[10px] font-bold text-stone-400">{favCalcs.length}개</span>
                  )}
                </div>

                {favCalcs.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-2xl mb-2">🤍</p>
                    <p className="text-xs font-bold text-stone-500 mb-1">아직 즐겨찾기가 없어요</p>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      계산기 카드의 ♡ 버튼을 눌러<br />자주 쓰는 계산기를 추가해보세요
                    </p>
                  </div>
                ) : (
                  <ul className="max-h-80 overflow-y-auto">
                    {favCalcs.map(c => (
                      <li key={c.url} className="border-b border-stone-50 last:border-none">
                        <Link
                          href={c.url}
                          onClick={() => setFavOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors group"
                        >
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-sm shrink-0`}>
                            {c.icon}
                          </span>
                          <span className="text-xs font-bold text-stone-600 group-hover:text-amber-600 flex-1 transition-colors">
                            {c.name}
                          </span>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(c.url) }}
                            aria-label="즐겨찾기 해제"
                            className="text-stone-200 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50"
                          >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}
