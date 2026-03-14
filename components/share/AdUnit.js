'use client'
import { useEffect, useRef } from 'react'

const PUB_ID = 'ca-pub-7505734558280029'

// ⚠️  AdSense 슬롯 ID
export const AD_SLOT_TOP       = '4137164165'  // 상단: 배너 직후 (모바일·태블릿)
export const AD_SLOT_MIDDLE    = '5883193399'  // 중간: 계산기·도구 아래 (전체)
export const AD_SLOT_BOTTOM    = '4570111729'  // 하단: FAQ 위 (태블릿+)
export const AD_SLOT_SIDEBAR_L = '7996518124'  // 좌측 사이드바 (데스크탑 전용)
export const AD_SLOT_SIDEBAR_R = '7746939400'  // 우측 사이드바 (데스크탑 전용)

// fullWidth=false → 컨테이너 너비에 고정 (사이드바 광고에 사용)
export default function AdUnit({ slot, className = '', fullWidth = true }) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        {...(fullWidth && { 'data-full-width-responsive': 'true' })}
      />
    </div>
  )
}
