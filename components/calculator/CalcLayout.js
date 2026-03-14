'use client'

import { useRef } from 'react'
import Link from 'next/link'
import FaqSection from '@/components/calculator/FaqSection'
import { CATEGORIES } from '@/lib/categories'
import { CALC_HERO_PATTERN } from '@/lib/constants'
import { FavoriteBannerButton } from '@/components/share/FavoriteButton'
import ShareButtons from '@/components/share/ShareResultButton'
import AdUnit, { AD_SLOT_TOP, AD_SLOT_MIDDLE, AD_SLOT_BOTTOM, AD_SLOT_SIDEBAR_L, AD_SLOT_SIDEBAR_R } from '@/components/share/AdUnit'

export default function CalcLayout({ title, desc, currentUrl, faqs, children }) {
  const shareRef = useRef(null)

  const filteredCategories = CATEGORIES
    .map(cat => ({ ...cat, calcs: cat.calcs.filter(c => c.url !== currentUrl) }))
    .filter(cat => cat.calcs.length > 0)

  return (
    <div className="w-full bg-slate-50 pb-20">

      {/* 배너 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: CALC_HERO_PATTERN }} />
        <div className="relative container mx-auto px-4 py-14 text-center text-white">
          <h1 className="text-2xl font-black tracking-tight mb-2">{title}</h1>
          <p className="text-sm opacity-85">{desc}</p>
          <FavoriteBannerButton url={currentUrl} />
        </div>
      </section>

      {/* 데스크탑: 좌측사이드바 | 중앙콘텐츠(560px) | 우측사이드바 */}
      <div className="xl:grid xl:grid-cols-[1fr_560px_1fr] xl:items-start">

        {/* 좌측 사이드바 광고 — 데스크탑(xl+) 전용 */}
        <div className="hidden xl:flex justify-end pr-6 pt-6">
          <div className="sticky top-24 w-[160px]">
            <AdUnit slot={AD_SLOT_SIDEBAR_L} fullWidth={false} />
          </div>
        </div>

        {/* 중앙 콘텐츠 */}
        <div>
          {/* 광고 A — 상단 (배너 직후, 모바일·태블릿만 / 데스크탑은 사이드바로 대체) */}
          <div className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-6 xl:hidden">
            <AdUnit slot={AD_SLOT_TOP} />
          </div>

          {/* 계산기 본체 */}
          <main className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-4">
            <div ref={shareRef}>
              {children}
            </div>
            <div className="mt-4" data-share-ignore>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-px bg-stone-200" />
                <p className="text-[10px] font-bold text-stone-400">결과 공유하기</p>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              <ShareButtons targetRef={shareRef} />
              <p className="text-[10px] text-stone-300 text-center mt-1.5">
                🔗 SNS 공유 버튼을 누르면 현재 결과가 담긴 URL이 전달됩니다
              </p>
            </div>
          </main>

          {/* 광고 B — 중간 (계산기 아래, 모든 디바이스) */}
          <div className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-4">
            <AdUnit slot={AD_SLOT_MIDDLE} />
          </div>

          {/* 다른 계산기 */}
          <aside className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center text-sm shrink-0">
                🧮
              </div>
              <div>
                <h2 className="text-sm font-black text-stone-700">다른 계산기</h2>
                <p className="text-[11px] text-stone-400">Other Tools</p>
              </div>
              <div className="flex-1 h-px bg-stone-200 ml-1" />
            </div>

            <div className="space-y-6">
              {filteredCategories.map(cat => (
                <div key={cat.key}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${cat.color} flex items-center justify-center text-[10px] shrink-0`}>
                      {cat.icon}
                    </div>
                    <span className={`text-xs font-black ${cat.labelColor}`}>{cat.label}</span>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>
                  <ul className="grid grid-cols-2 gap-2 list-none p-0">
                    {cat.calcs.map((c) => (
                      <li key={c.url}>
                        <Link href={c.url}
                          className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl p-3 hover:border-amber-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 group">
                          <span className="w-7 h-7 bg-stone-50 rounded-lg flex items-center justify-center text-sm shrink-0">
                            {c.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-600 group-hover:text-amber-600 transition-colors leading-tight truncate">
                              {c.name}
                            </p>
                            <p className="text-[10px] text-stone-400 leading-tight mt-0.5 truncate">{c.desc}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* 광고 C — 하단 (FAQ 위, 태블릿·데스크탑 전용) */}
          <div className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-6 hidden md:block">
            <AdUnit slot={AD_SLOT_BOTTOM} />
          </div>

          <FaqSection faqs={faqs} />
        </div>

        {/* 우측 사이드바 광고 — 데스크탑(xl+) 전용 */}
        <div className="hidden xl:flex justify-start pl-6 pt-6">
          <div className="sticky top-24 w-[160px]">
            <AdUnit slot={AD_SLOT_SIDEBAR_R} fullWidth={false} />
          </div>
        </div>

      </div>
    </div>
  )
}
