import Link from 'next/link'
import { COLOR_TOOLS, HERO_PATTERN } from '@/lib/colorTools'
import { FavoriteCardButton } from '@/components/share/FavoriteButton'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 도구 모음 - HEX RGB HSL 변환, 팔레트, 그라디언트',
  description: '이미지 색상 추출, HEX·RGB·HSL 변환, Tailwindㅇ 색상표, 그라디언트 생성, 명도 대비 검사 등 모든 색상 유틸리티 도구 모음',
  keywords: ['색상 변환', 'HEX RGB 변환', '색상 추출', 'Tailwind 색상표', '그라디언트 생성기', '명도 대비 검사', '색상 팔레트'],
  alternates: { canonical: `${BASE_URL}/color/` },
  openGraph: {
    title: '색상 도구 모음 - serenkit',
    description: '이미지 색상 추출, HEX·RGB·HSL 변환, 팔레트 생성, 그라디언트, 명도 대비 검사 등 모든 색상 유틸리티',
    url: `${BASE_URL}/color/`,
    type: 'website',
  },
}

const USE_CASES = [
  {
    title: '디자이너',
    icon: '🎨',
    color: 'from-emerald-400 to-teal-500',
    items: ['이미지에서 브랜드 컬러 추출', 'HEX·RGB·HSL 포맷 즉시 변환', '색상 조화 팔레트 자동 생성', 'CSS 그라디언트 코드 생성'],
  },
  {
    title: '개발자',
    icon: '💻',
    color: 'from-teal-400 to-cyan-500',
    items: ['Tailwind 색상 클래스명 검색', '색상 코드 모든 포맷 복사', 'WCAG 명도 대비 기준 검증', 'CSS 색상 이름 자동 매칭'],
  },
  {
    title: '마케터',
    icon: '📊',
    color: 'from-green-400 to-emerald-500',
    items: ['경쟁사 색상 역분석', '브랜드 컬러 가이드라인 정리', '광고 배너 색상 최적화', '색상 접근성 기준 준수 확인'],
  },
]

export default function ColorHomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'serenkit 색상 도구 목록',
    url: `${BASE_URL}/color/`,
    itemListElement: COLOR_TOOLS.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: `${BASE_URL}${tool.url}`,
        description: tool.desc,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="w-full bg-slate-50 pb-20">
        {/* Hero */}
        <section className="w-full bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 relative overflow-hidden pt-[4.5rem]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: HERO_PATTERN }} />
          <div className="relative container mx-auto px-4 py-24 text-center text-white">
            <p className="text-xs font-black opacity-75 mb-4 tracking-[0.3em] uppercase">색상 도구 모음</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
              색상 작업이 필요한 순간, 이제 <span className="underline decoration-white/50 decoration-2 underline-offset-4">한 곳</span>에서
            </h1>
            <p className="text-sm md:text-base opacity-85 max-w-sm mx-auto leading-relaxed">
              색상 추출·변환·팔레트 생성·접근성 검사까지<br />
              색상 작업에 필요한 모든 도구 모음
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 mt-8">
              {COLOR_TOOLS.map(tool => (
                <Link
                  key={tool.key}
                  href={tool.url}
                  className="group flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 hover:border-white/50 text-white px-4 py-2.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-base leading-none">{tool.icon}</span>
                  <span className="text-xs font-bold tracking-wide">{tool.shortName}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <main className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-12" id="main-content">
          <section aria-label="색상 도구 목록">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" aria-hidden="true"></span>
              색상 유틸리티 도구
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {COLOR_TOOLS.map(tool => (
                <li key={tool.key} className="relative">
                  <FavoriteCardButton url={tool.url} color="emerald" />
                  <Link
                    href={tool.url}
                    className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all hover:-translate-y-1"
                    aria-label={`${tool.name} - ${tool.desc}`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 shadow-sm`} aria-hidden="true">
                      {tool.icon}
                    </div>
                    <h3 className="text-base font-black text-slate-800 mb-1.5 group-hover:text-emerald-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">{tool.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>바로 사용하기</span>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Use cases */}
          <section className="mt-16" aria-label="활용 사례">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" aria-hidden="true"></span>
              이런 분들에게 유용해요
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {USE_CASES.map(uc => (
                <li key={uc.title} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${uc.color} p-5`}>
                    <div className="text-3xl mb-2">{uc.icon}</div>
                    <h3 className="text-lg font-black text-white">{uc.title}</h3>
                  </div>
                  <ul className="p-5 space-y-2">
                    {uc.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          {/* Feature highlights */}
          <section className="mt-16" aria-label="주요 기능">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" aria-hidden="true"></span>
              색상 도구의 특징
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { icon: '⚡', title: '빠른 변환', desc: '서버 없이 브라우저에서 즉시 처리, 어떤 색상 포맷이든 실시간 변환' },
                { icon: '🔒', title: '프라이버시 보호', desc: '이미지를 포함한 모든 데이터가 서버로 전송되지 않고 브라우저에서만 처리' },
                { icon: '📋', title: '한 번에 복사', desc: 'HEX, RGB, HSL, Tailwind 등 원하는 포맷을 클릭 한 번으로 클립보드 복사' },
                { icon: '♿', title: '접근성 검사', desc: 'WCAG 2.1 AA/AAA 기준으로 색상 명도 대비를 자동으로 측정하고 등급 표시' },
                { icon: '🎨', title: '색상 팔레트 생성', desc: '보색, 유사색, 삼각배색 등 색채학적으로 조화로운 색상 조합 자동 생성' },
                { icon: '📱', title: '모바일 최적화', desc: '스마트폰, 태블릿, 데스크탑 모든 환경에서 편리하게 사용 가능' },
              ].map(f => (
                <li key={f.title} className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4">
                  <span className="text-2xl shrink-0" aria-hidden="true">{f.icon}</span>
                  <div>
                    <h3 className="font-black text-slate-800 mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}
