import Link from 'next/link'
import { COLOR_TOOLS as TOOLS, COLOR_HERO_PATTERN } from '@/lib/colorTools'
import { FavoriteBannerButton } from '@/components/share/FavoriteButton'
import FaqSection from '@/components/calculator/FaqSection'
import AdUnit, { AD_SLOT_TOP, AD_SLOT_MIDDLE, AD_SLOT_BOTTOM, AD_SLOT_SIDEBAR_L, AD_SLOT_SIDEBAR_R } from '@/components/share/AdUnit'

export default function ToolLayout({ toolKey, children, faqs = [] }) {
  const tool = TOOLS.find(t => t.key === toolKey)
  const related = TOOLS.filter(t => t.key !== toolKey)

  return (
    <div className="bg-slate-50 pb-20 min-h-screen">
      {/* Hero Banner */}
      <section
        className={`relative bg-gradient-to-br ${tool?.color ?? 'from-indigo-400 to-purple-500'} pt-20 pb-12`}
        aria-label="페이지 소개"
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: COLOR_HERO_PATTERN }} aria-hidden="true" />
        <div className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto text-center relative">
          <div className="text-5xl mb-4" aria-hidden="true">{tool?.icon}</div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
            {tool?.name}
          </h1>
          <p className="text-sm md:text-base text-white/85 leading-relaxed">
            {tool?.desc}
          </p>
          <FavoriteBannerButton url={tool?.url ?? ''} />
        </div>
      </section>

      {/* 데스크탑: 좌측사이드바 | 중앙콘텐츠(600px) | 우측사이드바 */}
      <div className="xl:grid xl:grid-cols-[1fr_600px_1fr] xl:items-start">

        {/* 좌측 사이드바 광고 — 데스크탑(xl+) 전용 */}
        <div className="hidden xl:flex justify-center pt-6">
          <div className="sticky top-24 w-[300px]">
            <AdUnit slot={AD_SLOT_SIDEBAR_L} fullWidth={false} />
          </div>
        </div>

        {/* 중앙 콘텐츠 */}
        <div>
          {/* 광고 A — 상단 (배너 직후, 모바일·태블릿만) */}
          <div className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-6 xl:hidden">
            <AdUnit slot={AD_SLOT_TOP} />
          </div>

          {/* Main content */}
          <main className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-4 space-y-4" id="main-content">
            {children}
          </main>

          {/* 광고 B — 중간 (도구 아래, 모든 디바이스) */}
          <div className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-4">
            <AdUnit slot={AD_SLOT_MIDDLE} />
          </div>

          {/* Related tools */}
          <aside className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-10" aria-label="관련 도구">
            <section>
              <h2 className="text-base font-black text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-indigo-400 rounded-full inline-block" aria-hidden="true"></span>
                다른 색상 도구
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {related.map(t => (
                  <li key={t.key}>
                    <Link
                      href={t.url}
                      className="flex flex-col items-center gap-1.5 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-center group"
                    >
                      <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 leading-tight">{t.shortName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* 광고 C — 하단 (FAQ 위, 태블릿·데스크탑 전용) */}
          <div className="container xl:w-[600px] md:w-[640px] w-[92%] mx-auto mt-6 hidden md:block">
            <AdUnit slot={AD_SLOT_BOTTOM} />
          </div>

          <FaqSection faqs={faqs} />
        </div>

        {/* 우측 사이드바 광고 — 데스크탑(xl+) 전용 */}
        <div className="hidden xl:flex justify-center pt-6">
          <div className="sticky top-24 w-[300px]">
            <AdUnit slot={AD_SLOT_SIDEBAR_R} fullWidth={false} />
          </div>
        </div>

      </div>
    </div>
  )
}
