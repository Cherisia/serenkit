import Link from 'next/link'
import { COLOR_TOOLS, COLOR_HERO_PATTERN } from '@/lib/colorTools'
import { FavoriteCardButton } from '@/components/share/FavoriteButton'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 도구 모음 - HEX RGB HSL 변환, 팔레트, 그라디언트',
  description: '이미지 색상 추출, HEX·RGB·HSL 변환, Tailwind 색상표, 그라디언트 생성, 명도 대비 검사 등 모든 색상 유틸리티 도구 모음',
  keywords: ['색상 변환', 'HEX RGB 변환', '색상 추출', 'Tailwind 색상표', '그라디언트 생성기', '명도 대비 검사', '색상 팔레트'],
  alternates: { canonical: `${BASE_URL}/color/` },
  openGraph: {
    title: '색상 도구 모음 - serenkit',
    description: '이미지 색상 추출, HEX·RGB·HSL 변환, 팔레트 생성, 그라디언트, 명도 대비 검사 등 모든 색상 유틸리티',
    url: `${BASE_URL}/color/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '색상 도구 모음 - serenkit' }],
  },
}

const USE_CASES = [
  {
    icon: '🎨', title: '디자이너',
    color: 'from-indigo-400 to-purple-500',
    bg: 'bg-indigo-50', border: 'border-indigo-100', titleColor: 'text-indigo-700',
    items: [
      '이미지에서 브랜드 컬러 자동 추출',
      'HEX·RGB·HSL 포맷 즉시 변환',
      '보색·유사색·삼각배색 팔레트 자동 생성',
      'CSS 그라디언트 코드 시각적으로 생성',
      '색상 조합의 접근성 기준 사전 검토',
    ],
  },
  {
    icon: '💻', title: '개발자',
    color: 'from-teal-400 to-cyan-500',
    bg: 'bg-teal-50', border: 'border-teal-100', titleColor: 'text-teal-700',
    items: [
      'Tailwind CSS 색상 클래스명 즉시 검색',
      '모든 포맷 코드 클릭 한 번으로 복사',
      'WCAG AA/AAA 명도 대비 기준 검증',
      'CSS 색상 이름 자동 매칭',
      '개발 중 색상 코드 빠르게 변환',
    ],
  },
  {
    icon: '📊', title: '마케터 · 기획자',
    color: 'from-violet-400 to-indigo-500',
    bg: 'bg-violet-50', border: 'border-violet-100', titleColor: 'text-violet-700',
    items: [
      '경쟁사 이미지에서 브랜드 컬러 역분석',
      '브랜드 컬러 가이드라인 정리',
      '광고 배너 배경색 명도 대비 최적화',
      '색상 접근성 기준 준수 여부 확인',
      '시즌·캠페인별 색상 팔레트 기획',
    ],
  },
  {
    icon: '✍️', title: '블로거 · 크리에이터',
    color: 'from-cyan-400 to-teal-400',
    bg: 'bg-cyan-50', border: 'border-cyan-100', titleColor: 'text-cyan-700',
    items: [
      '썸네일·배너에 어울리는 색상 조합 찾기',
      '사진 속 색상을 코드로 추출',
      '그라디언트 배경 CSS 코드 바로 복사',
      '채널 브랜드 컬러 팔레트 구성',
      '색상 이름으로 감성 전달',
    ],
  },
  {
    icon: '🏠', title: '인테리어 · 홈데코',
    color: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50', border: 'border-indigo-200', titleColor: 'text-indigo-800',
    items: [
      '참고 이미지에서 인테리어 컬러 추출',
      '벽지·가구 색상 조화 미리 확인',
      '보색 포인트 색상 추천',
      '색상 이름으로 페인트 컬러 소통',
      '유사색 계열로 통일된 공간 연출',
    ],
  },
  {
    icon: '🎓', title: '학생 · 교육',
    color: 'from-purple-400 to-indigo-400',
    bg: 'bg-purple-50', border: 'border-purple-100', titleColor: 'text-purple-700',
    items: [
      '색채학 과제에서 색상 이론 실습',
      'HEX·RGB·HSL 개념 직접 변환하며 학습',
      '보색·유사색·삼각배색 시각적으로 이해',
      'UI/UX 과제 접근성 기준 적용 연습',
      '포트폴리오용 색상 팔레트 직접 제작',
    ],
  },
]

const FEATURES = [
  { icon: '⚡', title: '즉시 처리', desc: '서버 전송 없이 브라우저에서 실시간 변환. 어떤 포맷이든 입력 즉시 결과가 나와요.',
    color: 'from-indigo-400 to-purple-400', bg: 'bg-indigo-50', border: 'border-indigo-100', titleColor: 'text-indigo-700' },
  { icon: '🔒', title: '프라이버시 보호', desc: '이미지를 포함한 모든 데이터가 서버로 전송되지 않고 브라우저 안에서만 처리돼요.',
    color: 'from-teal-400 to-cyan-400', bg: 'bg-teal-50', border: 'border-teal-100', titleColor: 'text-teal-700' },
  { icon: '📋', title: '한 번에 복사', desc: 'HEX, RGB, HSL, Tailwind 등 원하는 포맷을 클릭 한 번으로 클립보드로 복사해요.',
    color: 'from-violet-400 to-indigo-400', bg: 'bg-violet-50', border: 'border-violet-100', titleColor: 'text-violet-700' },
  { icon: '♿', title: '접근성 검사', desc: 'WCAG 2.1 AA/AAA 기준으로 명도 대비를 자동 측정하고 등급을 표시해요.',
    color: 'from-cyan-400 to-teal-400', bg: 'bg-cyan-50', border: 'border-cyan-100', titleColor: 'text-cyan-700' },
  { icon: '🎨', title: '팔레트 자동 생성', desc: '보색, 유사색, 삼각배색 등 색채학적으로 조화로운 색상 조합을 자동으로 만들어줘요.',
    color: 'from-indigo-400 to-violet-400', bg: 'bg-indigo-50', border: 'border-indigo-100', titleColor: 'text-indigo-700' },
  { icon: '📱', title: '모바일 최적화', desc: '스마트폰, 태블릿, 데스크탑 모든 환경에서 편리하게 사용 가능해요.',
    color: 'from-purple-400 to-indigo-400', bg: 'bg-purple-50', border: 'border-purple-100', titleColor: 'text-purple-700' },
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
    <div className="w-full bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* 히어로 */}
      <section className="w-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: COLOR_HERO_PATTERN }} />
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

      <main className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-10 space-y-10">

        {/* 도구 목록 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-base shrink-0">
              🎨
            </div>
            <div>
              <h2 className="text-sm font-black text-indigo-600">색상 유틸리티 도구</h2>
              <p className="text-[11px] text-stone-400">Color Tools</p>
            </div>
            <div className="flex-1 h-px bg-stone-200 ml-1" />
            <span className="text-[11px] font-bold text-stone-300">{COLOR_TOOLS.length}개</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {COLOR_TOOLS.map(tool => (
              <li key={tool.key} className="relative">
                <FavoriteCardButton url={tool.url} color="indigo" />
                <Link
                  href={tool.url}
                  className="group flex flex-col h-full bg-white border border-stone-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-xl mb-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-sm font-black text-stone-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed flex-1">{tool.desc}</p>
                  <div className="mt-4 text-xs font-bold text-indigo-500 flex items-center gap-1">
                    바로 사용하기 <span>→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 활용 예시 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-base shrink-0">
              📌
            </div>
            <div>
              <h2 className="text-sm font-black text-indigo-600">활용 예시</h2>
              <p className="text-[11px] text-stone-400">Use Cases</p>
            </div>
            <div className="flex-1 h-px bg-stone-200 ml-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {USE_CASES.map(({ icon, title, color, bg, border, titleColor, items }) => (
              <article key={title} className={`${bg} ${border} border rounded-2xl p-5`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-sm shrink-0`}>
                    {icon}
                  </div>
                  <h3 className={`text-sm font-black ${titleColor}`}>{title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-stone-500">
                      <span className="text-stone-300 mt-0.5 shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 도구 특징 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-base shrink-0">
              ✨
            </div>
            <div>
              <h2 className="text-sm font-black text-indigo-600">도구 특징</h2>
              <p className="text-[11px] text-stone-400">Features</p>
            </div>
            <div className="flex-1 h-px bg-stone-200 ml-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {FEATURES.map(({ icon, title, desc, color, bg, border, titleColor }) => (
              <article key={title} className={`${bg} ${border} border rounded-2xl p-5`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-sm shrink-0`}>
                    {icon}
                  </div>
                  <h3 className={`text-sm font-black ${titleColor}`}>{title}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
