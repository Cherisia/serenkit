import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { COLOR_TOOLS } from '@/lib/colorTools'
import { DEV_TOOLS } from '@/lib/devTools'

const totalCalcs = CATEGORIES.reduce((s, c) => s + c.calcs.length, 0)

export const metadata = {
  title: 'serenkit 소개 - 계산 기준·출처·운영 방침',
  description: `serenkit은 2026년 최신 법령을 반영한 생활 계산기 ${totalCalcs}개, 색상 도구 ${COLOR_TOOLS.length}개, 개발자 도구 ${DEV_TOOLS.length}개를 제공합니다. 국민연금공단·국세청·고용노동부 등 공식 기준을 바탕으로 정확한 계산 결과를 제공합니다.`,
  keywords: ['serenkit 소개', '계산기 출처', '계산 기준', '법령 기준 계산기', '신뢰할 수 있는 계산기'],
  alternates: { canonical: 'https://serenkit.com/about/' },
  openGraph: {
    title: 'serenkit 소개 - 계산 기준·출처·운영 방침',
    description: `2026년 최신 법령 기준 생활 계산기 ${totalCalcs}개, 색상 도구 ${COLOR_TOOLS.length}개, 개발자 도구 ${DEV_TOOLS.length}개 제공.`,
    url: 'https://serenkit.com/about/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'serenkit 소개' }],
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'serenkit',
  url: 'https://serenkit.com',
  email: 'admin@serenkit.com',
  description: '2026년 최신 법령을 반영한 생활 계산기, 색상 도구, 개발자 도구를 제공하는 한국어 웹 서비스',
  inLanguage: 'ko-KR',
  foundingDate: '2026',
  areaServed: { '@type': 'Country', name: 'KR' },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'admin@serenkit.com',
    contactType: 'customer support',
    availableLanguage: 'Korean',
  },
}

const SOURCES = [
  {
    category: '급여·세금',
    icon: '💰',
    items: [
      { name: '국세청 홈택스 — 근로소득세 간이세액표', url: 'https://www.nts.go.kr', desc: '소득세·지방소득세 계산 기준' },
      { name: '국민건강보험공단 — 보험료율 고시', url: 'https://www.nhis.or.kr', desc: '건강보험·장기요양보험료율' },
      { name: '국민연금공단 — 기준소득월액 고시', url: 'https://www.nps.or.kr', desc: '국민연금 보험료율 및 상·하한액' },
      { name: '고용노동부 — 고용보험료율 고시', url: 'https://www.moel.go.kr', desc: '고용보험·실업급여 기준' },
    ],
  },
  {
    category: '날짜·음력',
    icon: '📅',
    items: [
      { name: '한국천문연구원 — 음양력 변환', url: 'https://www.kasi.re.kr', desc: '음력-양력 변환 알고리즘 기준' },
      { name: '대한민국 공휴일법 (관공서의 공휴일에 관한 규정)', url: 'https://www.law.go.kr', desc: '공휴일·영업일 계산 기준' },
    ],
  },
  {
    category: '건강·신체',
    icon: '💪',
    items: [
      { name: '세계보건기구(WHO) — BMI 분류 기준', url: 'https://www.who.int', desc: '체중·BMI 계산 기준' },
      { name: '보건복지부 — 한국인 영양소 섭취기준', url: 'https://www.mohw.go.kr', desc: '칼로리·기초대사량 계산 기준' },
    ],
  },
  {
    category: '단위·환산',
    icon: '📐',
    items: [
      { name: '국가기술표준원 — 법정계량단위', url: 'https://www.kats.go.kr', desc: '단위 환산 기준' },
      { name: '한국부동산원 — 평(坪) 환산 기준', url: 'https://www.reb.or.kr', desc: '평수·㎡ 환산 기준' },
    ],
  },
]

const UPDATES = [
  { date: '2026-05', desc: 'About 페이지 E-E-A-T 강화 — 계산 기준·출처 섹션 추가, Organization 스키마 추가' },
  { date: '2026-04', desc: 'GSC 데이터 기반 8개 페이지 콘텐츠 개선 (lunar, lotto, anniversary, date-diff, color-extractor, char-count, dday, hourly)' },
  { date: '2026-03', desc: '개발자 도구 5종 신설 (timestamp, base64, url-encoder, uuid, regex-tester), URL 파라미터 공유 기능 전체 계산기 적용' },
  { date: '2026-03', desc: 'Google AdSense 광고 배치 도입, 반응형 사이드바 레이아웃 적용' },
  { date: '2026-02', desc: '색상 도구 8종 제공 개시, 계산기 23종 서비스 오픈' },
]

export default function AboutPage() {
  return (
    <div className="w-full bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* 헤더 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 py-14 pt-[calc(3.5rem+3.5rem)] text-center text-white">
        <p className="text-xs font-black opacity-75 mb-3 tracking-[0.3em] uppercase">About</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">serenkit 소개</h1>
        <p className="text-xs opacity-75 mt-3">숫자·색상·개발 작업, 생활 도구 모음 — 2026년 법령 기준</p>
      </section>

      <main className="container xl:w-7/12 md:w-9/12 w-[92%] mx-auto mt-10 space-y-6">

        {/* 서비스 소개 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">serenkit이란?</h2>
          <p className="text-xs text-stone-500 leading-7">
            serenkit은 일상에서 자주 필요한 계산과 색상·개발 작업을 빠르고 간편하게 해결할 수 있는 도구 모음 서비스입니다.
          </p>
          <p className="text-xs text-stone-500 leading-7 mt-2">
            날짜 계산부터 건강 지표, 급여·세금, 단위 변환, 색상 변환·추출·팔레트 생성, 개발자 유틸리티까지
            — 복잡한 작업을 누구나 쉽게 사용할 수 있도록 만들었습니다.
            회원가입 없이 바로 이용 가능하며, 모바일과 PC 어디서든 편하게 사용할 수 있습니다.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { num: `${totalCalcs}종`, label: '생활 계산기' },
              { num: `${COLOR_TOOLS.length}종`, label: '색상 도구' },
              { num: `${DEV_TOOLS.length}종`, label: '개발자 도구' },
            ].map(item => (
              <div key={item.label} className="bg-amber-50 rounded-xl p-3 text-center">
                <p className="text-lg font-black text-amber-600">{item.num}</p>
                <p className="text-[11px] text-stone-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </article>

        {/* 계산 기준 및 공식 출처 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-1">계산 기준 및 공식 출처</h2>
          <p className="text-xs text-stone-400 mb-5">모든 계산기는 아래 공공기관·국제기구의 최신 고시 기준을 반영하여 구현되었습니다.</p>
          <div className="space-y-6">
            {SOURCES.map(group => (
              <div key={group.category}>
                <p className="text-xs font-black text-stone-600 mb-2.5 flex items-center gap-1.5">
                  <span>{group.icon}</span>{group.category}
                </p>
                <ul className="space-y-2">
                  {group.items.map(src => (
                    <li key={src.name} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <div>
                        <a href={src.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                          {src.name} ↗
                        </a>
                        <p className="text-[11px] text-stone-400 mt-0.5">{src.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-stone-400 bg-stone-50 rounded-xl p-3 leading-relaxed">
            계산 결과는 참고용이며, 실제 적용 금액은 회사·기관·상황에 따라 다를 수 있습니다.
            정확한 금액 확인은 담당 기관 또는 전문가에게 문의하시기 바랍니다.
          </p>
        </article>

        {/* 운영 방침 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">운영 방침</h2>
          <ul className="space-y-3">
            {[
              { icon: '🙌', title: '가입 없이 즉시 사용', desc: '회원가입, 앱 설치 없이 브라우저에서 바로 사용할 수 있습니다.' },
              { icon: '🔒', title: '서버 전송 없음', desc: '입력한 계산 값과 이미지는 서버로 전송되지 않습니다. 모든 처리는 브라우저 안에서만 이루어집니다.' },
              { icon: '📋', title: '참고용 결과', desc: '계산 결과는 참고용으로만 활용해 주세요. 법적·의료적 판단이 필요한 경우 전문가에게 문의하시기 바랍니다.' },
              { icon: '🔄', title: '지속 업데이트', desc: '법령 및 기준 변경 시 계산기 로직을 최신 기준으로 업데이트합니다. 오류 신고는 이메일로 접수해 주세요.' },
            ].map(item => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center text-base shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-xs font-black text-stone-700">{item.title}</p>
                  <p className="text-xs text-stone-500 leading-6 mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        {/* 최근 업데이트 이력 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">최근 업데이트 이력</h2>
          <ul className="space-y-3">
            {UPDATES.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[11px] font-black text-amber-500 w-14 shrink-0 pt-0.5">{item.date}</span>
                <p className="text-xs text-stone-500 leading-6">{item.desc}</p>
              </li>
            ))}
          </ul>
        </article>

        {/* 제공 계산기 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-5">제공하는 계산기 ({totalCalcs}개)</h2>
          <div className="space-y-5">
            {CATEGORIES.map(cat => (
              <div key={cat.key}>
                <p className="text-xs font-black text-stone-600 mb-2 flex items-center gap-1.5">
                  <span>{cat.icon}</span>{cat.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {cat.calcs.map(calc => (
                    <li key={calc.url}>
                      <Link href={calc.url}
                        className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 rounded-full px-3 py-1 hover:border-amber-300 hover:text-amber-600 transition-colors">
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        {/* 색상 도구 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-5">색상 도구 ({COLOR_TOOLS.length}개)</h2>
          <ul className="flex flex-wrap gap-2">
            {COLOR_TOOLS.map(tool => (
              <li key={tool.key}>
                <Link href={tool.url}
                  className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 rounded-full px-3 py-1 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
                  {tool.icon} {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </article>

        {/* 개발자 도구 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-5">개발자 도구 ({DEV_TOOLS.length}개)</h2>
          <ul className="flex flex-wrap gap-2">
            {DEV_TOOLS.map(tool => (
              <li key={tool.key}>
                <Link href={tool.url}
                  className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 rounded-full px-3 py-1 hover:border-sky-300 hover:text-sky-600 transition-colors">
                  {tool.icon} {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </article>

        {/* 문의 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">문의 및 제안</h2>
          <p className="text-xs text-stone-500 leading-7">
            계산기 오류 신고, 개선 제안, 새로운 도구 요청 등은 아래 이메일로 보내주세요.
            모든 문의를 검토하여 서비스 개선에 반영하겠습니다.
          </p>
          <a href="mailto:admin@serenkit.com"
            className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
            <span>✉️</span> admin@serenkit.com
          </a>
          <div className="mt-4 pt-4 border-t border-stone-100 flex gap-4">
            <Link href="/privacy/" className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors">개인정보처리방침</Link>
            <Link href="/terms/" className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors">이용약관</Link>
          </div>
        </article>

        {/* 홈으로 */}
        <div className="text-center pt-2">
          <Link href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-amber-500 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>

      </main>
    </div>
  )
}
