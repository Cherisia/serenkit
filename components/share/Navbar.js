'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const menu = [
  { name: 'D-day 계산기',  url: '/cal/dday' },
  { name: '만 나이',        url: '/cal/age' },
  { name: '월급 실수령액',  url: '/cal/salary' },
  { name: '생리주기',       url: '/cal/period' },
  { name: '단위 변환',      url: '/cal/unit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isMain = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // 메인 top=0 일 때만 흰색, 나머지는 어두운색
  const white = isMain && !scrolled && !open
  const bg = !white

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b
      ${bg ? 'bg-white border-stone-100 shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className={`container mx-auto px-5 flex justify-between items-center transition-all duration-300
        ${scrolled ? 'py-3' : 'py-4'}`}>

        {/* 로고 */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className={`text-2xl font-black tracking-tight transition-colors duration-300
            ${white ? 'text-white' : 'text-stone-800'}`}>
            seren<span className={white ? 'text-white' : 'text-amber-400'}>kit</span>
          </span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden xl:flex items-center gap-7">
          {menu.map((item) => (
            <Link key={item.url} href={item.url}
              className={`text-sm font-bold transition-colors duration-200
                ${!white && (pathname === item.url ? 'text-amber-500' : 'text-stone-500 hover:text-amber-500')
                }`}
              style={white ? { color: 'rgba(255,255,255,0.8)' } : {}}>
              {item.name}
            </Link>
          ))}
          <Link href="/"
            className={`text-sm font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200
              ${white
                ? 'border-white/50 text-white hover:bg-white/20'
                : 'border-amber-300 text-amber-500 hover:bg-amber-50'
              }`}>
            전체 보기 →
          </Link>
        </nav>

        {/* 모바일 햄버거 */}
        <button className="xl:hidden p-1" onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 20 20" fill="currentColor"
            className="w-6 h-6 transition-colors"
            style={{ color: white ? 'rgba(255,255,255,0.8)' : undefined }}>
            <path fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="xl:hidden bg-white border-t border-stone-100 px-5 py-4 flex flex-col gap-4">
          {menu.map((item) => (
            <Link key={item.url} href={item.url} onClick={() => setOpen(false)}
              className={`text-sm font-bold ${pathname === item.url ? 'text-amber-500' : 'text-stone-500'}`}>
              {item.name}
            </Link>
          ))}
          <Link href="/" onClick={() => setOpen(false)}
            className="text-sm font-bold text-amber-500 border-t border-stone-100 pt-4">
            전체 보기 →
          </Link>
        </div>
      )}
    </header>
  )
}
