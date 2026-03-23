import Link from 'next/link'
import { DEV_TOOLS, DEV_HERO_PATTERN } from '@/lib/devTools'
import { FavoriteCardButton } from '@/components/share/FavoriteButton'
import AdUnit, { AD_SLOT_MIDDLE, AD_SLOT_SIDEBAR_L, AD_SLOT_SIDEBAR_R } from '@/components/share/AdUnit'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '개발자 도구 모음 — 타임스탬프·Base64·URL 인코딩·UUID·정규식',
  description: '개발자가 자주 쓰는 유틸리티 5종: 타임스탬프 변환, Base64 인코딩/디코딩, URL 인코더/디코더, UUID 생성기, 정규식 테스터. 브라우저에서 즉시 처리.',
  keywords: ['개발자 도구', '타임스탬프 변환', 'Base64 인코딩', 'URL 인코딩', 'UUID 생성기', '정규식 테스터', '개발자 유틸리티', '온라인 개발 도구', 'developer tools', 'percent encoding'],
  alternates: { canonical: `${BASE_URL}/dev/` },
  openGraph: {
    title: '개발자 도구 모음 — 타임스탬프·Base64·URL·UUID·정규식 | serenkit',
    description: '타임스탬프 변환, Base64, URL 인코딩, UUID 생성, 정규식 테스터 — 개발자 유틸리티 5종.',
    url: `${BASE_URL}/dev/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '개발자 도구 모음 - serenkit' }],
  },
}

const USE_CASES = [
  {
    icon: '🔧', title: '백엔드 개발자',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50', border: 'border-violet-100', titleColor: 'text-violet-700',
    items: [
      'Unix 타임스탬프 → 날짜 즉시 변환',
      'JWT 페이로드 Base64 디코딩',
      'API 쿼리 파라미터 인코딩 검증',
      'DB 기본키용 UUID 빠르게 생성',
      '로그 시간값 사람이 읽기 좋게 변환',
    ],
  },
  {
    icon: '🎨', title: '프론트엔드 개발자',
    color: 'from-sky-400 to-cyan-500',
    bg: 'bg-sky-50', border: 'border-sky-100', titleColor: 'text-sky-700',
    items: [
      'data URI 이미지 Base64 인코딩',
      'URL 파라미터 인코딩/디코딩 테스트',
      'React key prop용 UUID 생성',
      '타임스탬프 기반 날짜 표시 디버깅',
      '로컬스토리지 키 충돌 방지용 UUID',
    ],
  },
  {
    icon: '🛠️', title: 'DevOps · 시스템 엔지니어',
    color: 'from-indigo-400 to-blue-500',
    bg: 'bg-indigo-50', border: 'border-indigo-100', titleColor: 'text-indigo-700',
    items: [
      '서버 로그 타임스탬프 변환 확인',
      '환경변수 Base64 인코딩/디코딩',
      'Kubernetes 시크릿 인코딩 검증',
      'API 게이트웨이 요청 ID 생성',
      'cron 스케줄 타임스탬프 검증',
    ],
  },
]

const FEATURES = [
  { icon: '⚡', title: '브라우저에서 즉시 처리', desc: '서버 전송 없이 브라우저에서 모든 변환이 이루어집니다. 민감한 데이터도 안전하게 처리할 수 있어요.',
    color: 'from-violet-400 to-purple-400', bg: 'bg-violet-50', border: 'border-violet-100', titleColor: 'text-violet-700' },
  { icon: '🔒', title: '프라이버시 보호', desc: '입력한 텍스트, 키값, 토큰 등 어떤 데이터도 외부 서버로 전송되지 않습니다.',
    color: 'from-sky-400 to-cyan-400', bg: 'bg-sky-50', border: 'border-sky-100', titleColor: 'text-sky-700' },
  { icon: '📋', title: '원클릭 복사', desc: '변환 결과를 클릭 한 번으로 클립보드에 복사합니다. UUID는 개별 또는 전체 복사가 가능해요.',
    color: 'from-indigo-400 to-blue-400', bg: 'bg-indigo-50', border: 'border-indigo-100', titleColor: 'text-indigo-700' },
]

export default function DevHomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'serenkit 개발자 도구 목록',
    url: `${BASE_URL}/dev/`,
    itemListElement: DEV_TOOLS.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: `${BASE_URL}${tool.url}`,
        description: tool.desc,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      },
    })),
  }

  return (
    <div className="w-full bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* 히어로 */}
      <section className="w-full bg-gradient-to-br from-slate-600 via-slate-700 to-zinc-800 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: DEV_HERO_PATTERN }} />
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <p className="text-xs font-black opacity-75 mb-4 tracking-[0.3em] uppercase">개발자 도구 모음</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            개발할 때 자주 쓰는 도구, <span className="underline decoration-white/50 decoration-2 underline-offset-4">한 곳</span>에서
          </h1>
          <p className="text-sm md:text-base opacity-85 max-w-sm mx-auto leading-relaxed">
            타임스탬프·Base64·URL 인코딩·UUID 생성<br />
            개발자 유틸리티 도구 모음
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {DEV_TOOLS.map(tool => (
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

      {/* 데스크탑: 좌측사이드바 | 중앙콘텐츠 | 우측사이드바 */}
      <div className="2xl:grid 2xl:grid-cols-[320px_1fr_320px] 2xl:items-start">

        {/* 좌측 사이드바 광고 — 데스크탑(2xl+) 전용 */}
        <div className="hidden 2xl:flex justify-center pt-10">
          <div className="sticky top-24 w-[300px]">
            <AdUnit slot={AD_SLOT_SIDEBAR_L} fullWidth={false} />
          </div>
        </div>

        {/* 중앙 콘텐츠 */}
        <div>
      <main className="container md:w-11/12 w-[92%] 2xl:w-full mx-auto mt-10 space-y-10">

        {/* 도구 목록 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-zinc-700 flex items-center justify-center text-base shrink-0">
              🛠️
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-700">개발자 유틸리티 도구</h2>
              <p className="text-[11px] text-stone-400">Developer Tools</p>
            </div>
            <div className="flex-1 h-px bg-stone-200 ml-1" />
            <span className="text-[11px] font-bold text-stone-300">{DEV_TOOLS.length}개</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {DEV_TOOLS.map(tool => (
              <li key={tool.key} className="relative">
                <FavoriteCardButton url={tool.url} color="slate" />
                <Link
                  href={tool.url}
                  className="group flex flex-col h-full bg-white border border-stone-200 rounded-2xl p-5 hover:border-slate-400 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-xl mb-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-sm font-black text-stone-800 mb-1.5 group-hover:text-slate-700 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed flex-1">{tool.desc}</p>
                  <div className="mt-4 text-xs font-bold text-slate-500 flex items-center gap-1">
                    바로 사용하기 <span>→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 광고 — 도구 목록 아래 (모든 디바이스) */}
        <AdUnit slot={AD_SLOT_MIDDLE} className="my-2" />

        {/* 활용 예시 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-zinc-700 flex items-center justify-center text-base shrink-0">
              📌
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-700">활용 예시</h2>
              <p className="text-[11px] text-stone-400">Use Cases</p>
            </div>
            <div className="flex-1 h-px bg-stone-200 ml-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* 광고 — 활용 예시 아래 (태블릿·데스크탑 전용) */}
        <AdUnit slot={AD_SLOT_MIDDLE} className="my-2 hidden md:block" />

        {/* 도구 특징 */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-zinc-700 flex items-center justify-center text-base shrink-0">
              ✨
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-700">도구 특징</h2>
              <p className="text-[11px] text-stone-400">Features</p>
            </div>
            <div className="flex-1 h-px bg-stone-200 ml-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>{/* /중앙 콘텐츠 */}

        {/* 우측 사이드바 광고 — 데스크탑(2xl+) 전용 */}
        <div className="hidden 2xl:flex justify-center pt-10">
          <div className="sticky top-24 w-[300px]">
            <AdUnit slot={AD_SLOT_SIDEBAR_R} fullWidth={false} />
          </div>
        </div>

      </div>{/* /사이드바 그리드 */}
    </div>
  )
}
