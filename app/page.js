import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { COLOR_TOOLS } from '@/lib/colorTools'
import { CALC_HERO_PATTERN } from '@/lib/constants'

const BASE_URL = 'https://serenkit.com'

const totalCalcs = CATEGORIES.reduce((sum, cat) => sum + cat.calcs.length, 0)

export const metadata = {
  title: 'serenkit - 생활 계산기 · 색상 도구 모음',
  description: `날짜·건강·금융·단위 변환 계산기 ${totalCalcs}개, 색상 변환·추출·팔레트 도구 ${COLOR_TOOLS.length}개가 모여 있어요. 필요할 때 바로 꺼내 쓰세요.`,
  keywords: ['생활 계산기', '색상 변환', '날짜 계산기', '월급 계산기', 'HEX RGB 변환', '색상 도구'],
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    title: 'serenkit - 생활 계산기 · 색상 도구 모음',
    description: `날짜·건강·금융 계산기 ${totalCalcs}개, 색상 변환·팔레트 도구 ${COLOR_TOOLS.length}개가 모여 있어요.`,
    url: `${BASE_URL}/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'serenkit - 생활 계산기 · 색상 도구 모음' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'serenkit',
  url: BASE_URL,
  description: '생활 계산기와 색상 유틸리티 도구 모음',
  inLanguage: 'ko-KR',
}

export default function Home() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 히어로 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: CALC_HERO_PATTERN }} />
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <p className="text-xs font-black opacity-75 mb-4 tracking-[0.3em] uppercase">Everyday Tools</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            숫자와 색상, <span className="underline decoration-white/50 decoration-2 underline-offset-4">모든 작업</span>을 한 곳에서
          </h1>
          <p className="text-sm md:text-base opacity-85 max-w-sm mx-auto leading-relaxed">
            생활 계산기 {totalCalcs}개 · 색상 도구 {COLOR_TOOLS.length}개<br />
            필요할 때 언제든, 바로 꺼내 쓰세요
          </p>
        </div>
      </section>

      {/* 두 카테고리 카드 */}
      <main className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 계산기 */}
          <Link href="/cal"
            className="group flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-amber-300">
            <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 p-8 relative overflow-hidden h-52">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: CALC_HERO_PATTERN }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-7">
                  <span className="text-4xl">🧮</span>
                  <div>
                    <p className="text-xs font-black text-white/70 uppercase tracking-widest">Calculators</p>
                    <h2 className="text-2xl font-black text-white">생활 계산기</h2>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <span key={cat.key}
                      className="flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {cat.icon} {cat.label}
                      <span className="text-white/60 text-[10px] ml-0.5">{cat.calcs.length}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm text-stone-500 leading-relaxed mb-5">
                날짜·건강·금융·운세·유틸리티까지 <strong className="text-stone-700">{totalCalcs}개 계산기</strong>가 모여 있어요.
                공식 기준으로 정확하게, 필요할 때 바로 꺼내 쓰세요.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                {CATEGORIES.flatMap(c => c.calcs).slice(0, 8).map(calc => (
                  <li key={calc.url} className="flex items-center gap-1.5 text-xs text-stone-400">
                    <span className="shrink-0">{calc.icon}</span>
                    <span className="truncate">{calc.name}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-stone-400">{totalCalcs}개 계산기</span>
                <span className="flex items-center gap-1.5 bg-amber-400 group-hover:bg-amber-500 text-white text-sm font-black px-5 py-2.5 rounded-xl transition-colors">
                  계산기 보러가기
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                </span>
              </div>
            </div>
          </Link>

          {/* 색상 도구 */}
          <Link href="/color"
            className="group flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-indigo-300">
            <div className="bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 p-8 relative overflow-hidden h-52">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: CALC_HERO_PATTERN }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-7">
                  <span className="text-4xl">🎨</span>
                  <div>
                    <p className="text-xs font-black text-white/70 uppercase tracking-widest">Color Tools</p>
                    <h2 className="text-2xl font-black text-white">색상 도구</h2>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_TOOLS.map(tool => (
                    <span key={tool.key}
                      className="flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {tool.icon} {tool.shortName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-sm text-stone-500 leading-relaxed mb-5">
                색상 변환·추출·팔레트 생성·명도 대비 검사까지 <strong className="text-stone-700">{COLOR_TOOLS.length}개 도구</strong>가 준비되어 있어요.
                브라우저에서 바로, 서버 전송 없이 안전하게 쓸 수 있어요.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                {COLOR_TOOLS.map(tool => (
                  <li key={tool.url} className="flex items-center gap-1.5 text-xs text-stone-400">
                    <span className="shrink-0">{tool.icon}</span>
                    <span className="truncate">{tool.name}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-stone-400">{COLOR_TOOLS.length}개 도구</span>
                <span className="flex items-center gap-1.5 bg-indigo-500 group-hover:bg-indigo-600 text-white text-sm font-black px-5 py-2.5 rounded-xl transition-colors">
                  색상 도구 보러가기
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                </span>
              </div>
            </div>
          </Link>

        </div>
      </main>
    </div>
  )
}
