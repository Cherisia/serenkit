'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useFavorites } from '@/components/share/FavoritesProvider'

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const pathname = usePathname()
  const isMain = pathname === '/'
  const { favCalcs, toggle } = useFavorites()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const white = isMain && !scrolled && !open

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

        {/* 즐겨찾기 버튼 */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="즐겨찾기"
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-200
              ${white
                ? 'border-white/30 text-white/80 hover:bg-white/20'
                : open
                  ? 'border-amber-300 text-amber-500 bg-amber-50'
                  : 'border-stone-200 text-stone-500 hover:border-amber-200 hover:text-amber-500 hover:bg-amber-50'
              }`}
          >
            <StarIcon filled={favCalcs.length > 0} />
            <span className="hidden sm:inline text-xs font-bold">즐겨찾기</span>
            {favCalcs.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-amber-400 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                {favCalcs.length}
              </span>
            )}
          </button>

          {/* 드롭다운 패널 */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-50">

              {/* 헤더 */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
                <span className="text-xs font-black text-stone-700">즐겨찾기</span>
                {favCalcs.length > 0 && (
                  <span className="text-[10px] font-bold text-stone-400">{favCalcs.length}개</span>
                )}
              </div>

              {/* 빈 상태 */}
              {favCalcs.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-2xl mb-2">⭐</p>
                  <p className="text-xs font-bold text-stone-500 mb-1">아직 즐겨찾기가 없어요</p>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    계산기 카드의 ★ 버튼을 눌러<br />자주 쓰는 계산기를 추가해보세요
                  </p>
                </div>
              ) : (
                <ul className="max-h-80 overflow-y-auto">
                  {favCalcs.map(c => (
                    <li key={c.url} className="border-b border-stone-50 last:border-none">
                      <Link
                        href={c.url}
                        onClick={() => setOpen(false)}
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
    </header>
  )
}
