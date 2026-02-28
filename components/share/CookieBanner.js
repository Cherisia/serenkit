'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white border border-stone-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl">
          <p className="text-xs text-stone-500 leading-relaxed flex-1">
            <span className="text-sm mr-1.5">🍪</span>
            이 사이트는 서비스 개선 및 맞춤 광고 제공을 위해 쿠키를 사용합니다.{' '}
            <Link href="/privacy" className="text-amber-500 underline underline-offset-2 hover:text-amber-600 transition-colors">
              개인정보처리방침
            </Link>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={decline}
              className="text-xs font-bold text-stone-400 hover:text-stone-600 px-4 py-2 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors">
              거절
            </button>
            <button onClick={accept}
              className="text-xs font-bold text-white bg-amber-400 hover:bg-amber-500 px-5 py-2 rounded-xl transition-colors">
              동의
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
