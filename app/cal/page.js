import { Fragment } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'
import { CALC_HERO_PATTERN } from '@/lib/constants'
import { FavoriteCardButton } from '@/components/share/FavoriteButton'
import AdUnit, { AD_SLOT_MIDDLE, AD_SLOT_SIDEBAR_L, AD_SLOT_SIDEBAR_R } from '@/components/share/AdUnit'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '생활 계산기 모음 - 날짜·건강·금융·단위 변환',
  description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 적정 체중, 기초대사량, 단위 변환, 생리주기까지 생활에 필요한 모든 계산기가 모여 있어요.',
  keywords: ['날짜 계산기', 'D-day 계산기', '날짜 차이 계산기', '영업일 계산기', '만 나이 계산기', '기념일 계산기', '월급 실수령액 계산기', 'BMI 계산기', '적정 체중 계산기', '기초대사량 계산기', '단위 변환기', '생리주기 계산기', '생활 계산기'],
  alternates: { canonical: `${BASE_URL}/cal/` },
  openGraph: {
    title: '생활 계산기 모음 - serenkit',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 적정 체중, 기초대사량, 단위 변환, 생리주기까지 생활에 필요한 모든 계산기가 모여 있어요.',
    url: `${BASE_URL}/cal/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'serenkit 생활 계산기 모음' }],
  },
}

const USE_CASES = [
  {
    icon: '💑', title: '연인 · 커플',
    color: 'from-pink-400 to-rose-400',
    bg: 'bg-pink-50', border: 'border-pink-100', titleColor: 'text-pink-600',
    items: [
      '처음 만난 날부터 D-day 카운트',
      '100일·200일·1주년 기념일 날짜 미리 체크',
      '결혼기념일·생일까지 남은 날 실시간 확인',
      '두 사람의 띠·별자리·MBTI 궁합 분석',
      '음력 생일을 양력으로 변환해서 기념일 등록',
    ],
  },
  {
    icon: '📚', title: '수험생 · 학생',
    color: 'from-sky-400 to-blue-400',
    bg: 'bg-sky-50', border: 'border-sky-100', titleColor: 'text-sky-600',
    items: [
      '수능·자격시험·졸업까지 D-day 계산',
      '원서 마감·면접일까지 정확한 영업일 확인',
      '학기 시작·종강·방학 날짜 계산',
      '만 나이로 학년·병역·취업 기준 확인',
      '과제·레포트 마감일에 기간 더하고 빼기',
    ],
  },
  {
    icon: '💼', title: '직장인 · 비즈니스',
    color: 'from-emerald-400 to-green-400',
    bg: 'bg-emerald-50', border: 'border-emerald-100', titleColor: 'text-emerald-600',
    items: [
      '세전 연봉·월급 → 실수령액 계산',
      '계약 만료일·프로젝트 마감 영업일 파악',
      '입사일 기준 정확한 근속 기간·퇴직금 확인',
      '연봉 협상 전 4대보험·소득세 공제 내역 파악',
      '야근·주말 근무 시간당 실제 시급 환산',
    ],
  },
  {
    icon: '🏠', title: '자영업자 · 사업자',
    color: 'from-amber-400 to-orange-400',
    bg: 'bg-amber-50', border: 'border-amber-100', titleColor: 'text-amber-600',
    items: [
      '매출에서 부가세 10% 즉시 역산',
      '직원 급여 실수령액·4대보험 사전 계산',
      '계약·납부 마감일까지 남은 영업일 확인',
      '종합소득세 신고 전 예상 세액 간이 계산',
      '근로자 퇴직금 사전 적립액 추정',
    ],
  },
  {
    icon: '💪', title: '건강 · 다이어트',
    color: 'from-orange-400 to-rose-400',
    bg: 'bg-orange-50', border: 'border-orange-100', titleColor: 'text-orange-600',
    items: [
      'BMI로 현재 체중이 정상 범위인지 확인',
      '표준 체중과 현재 체중의 차이 한눈에 파악',
      '기초대사량·활동 수준별 하루 필요 칼로리 계산',
      '감량·유지·증량 목표별 적정 식단 기준 확인',
      '다이어트 시작일·목표일 D-day 관리',
    ],
  },
  {
    icon: '🌸', title: '여성 · 임신 준비',
    color: 'from-pink-400 to-fuchsia-400',
    bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', titleColor: 'text-fuchsia-600',
    items: [
      '불규칙한 주기도 평균으로 다음 생리 예정일 예측',
      '배란일·가임기 날짜를 달력으로 한눈에 확인',
      'PMS(생리 전 증후군) 예상 시작일 파악',
      '향후 4개월 생리·배란 주기 미리 보기',
      '임신 준비 전 자신의 생리 패턴 파악',
    ],
  },
  {
    icon: '🏡', title: '부동산 · 이사',
    color: 'from-lime-400 to-green-500',
    bg: 'bg-lime-50', border: 'border-lime-100', titleColor: 'text-lime-700',
    items: [
      '등기부상 전용면적(m²) → 평수 즉시 환산',
      '대출 원금·금리로 월 상환액·총 이자 계산',
      '입주 예정일·계약 만료일 D-day 관리',
      '계약서 잔금일까지 남은 영업일 확인',
      '분양 공급면적·전용면적 차이 비교',
    ],
  },
  {
    icon: '🔄', title: '일상 · 생활',
    color: 'from-teal-400 to-cyan-400',
    bg: 'bg-teal-50', border: 'border-teal-100', titleColor: 'text-teal-600',
    items: [
      'cm ↔ 인치, kg ↔ 파운드 즉시 변환',
      '섭씨 ↔ 화씨 온도 변환',
      'L ↔ mL, 컵 단위 해외 레시피 용량 변환',
      'km/h ↔ mph 속도·거리 단위 변환',
      'GB·MB·KB 데이터 용량 단위 변환',
    ],
  },
]

function buildJsonLd() {
  let position = 1
  const items = CATEGORIES.flatMap(cat =>
    cat.calcs.map(c => ({
      '@type': 'ListItem',
      position: position++,
      name: c.name,
      url: `${BASE_URL}${c.url}/`,
    }))
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '생활 계산기 목록',
    url: `${BASE_URL}/cal/`,
    itemListElement: items,
  }
}

export default function CalPage() {
  return (
    <div className="w-full bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />

      {/* 히어로 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: CALC_HERO_PATTERN }} />
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <p className="text-xs font-black opacity-75 mb-4 tracking-[0.3em] uppercase">생활 계산기 모음</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            숫자가 필요한 순간, 이제 <span className="underline decoration-white/50 decoration-2 underline-offset-4">한 곳</span>에서
          </h1>
          <p className="text-sm md:text-base opacity-85 max-w-sm mx-auto leading-relaxed">
            날짜·건강·금융·단위 변환까지<br />
            생활에 필요한 모든 계산기 모음
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {CATEGORIES.map(c => (
              <a key={c.key} href={`#${c.key}`}
                className="group flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 hover:border-white/50 text-white px-4 py-2.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <span className="text-base leading-none">{c.icon}</span>
                <span className="text-xs font-bold tracking-wide">{c.label}</span>
                <span className="text-white/40 text-[10px] group-hover:text-white/70 transition-colors">↓</span>
              </a>
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

      {/* 카테고리별 계산기 */}
      <main className="container md:w-11/12 w-[92%] 2xl:w-full mx-auto mt-10 space-y-10">
        {CATEGORIES.map((cat, idx) => (
          <Fragment key={cat.key}>
          <section id={cat.key} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-base shrink-0`}>
                {cat.icon}
              </div>
              <div>
                <h2 className={`text-sm font-black ${cat.labelColor}`}>{cat.label}</h2>
                <p className="text-[11px] text-stone-400">{cat.desc}</p>
              </div>
              <div className="flex-1 h-px bg-stone-200 ml-1" />
              <span className="text-[11px] font-bold text-stone-300">{cat.calcs.length}개</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 list-none p-0">
              {cat.calcs.map((calc) => (
                <li key={calc.url} className="relative">
                  <FavoriteCardButton url={calc.url} />
                  <Link href={calc.url}
                    className="group bg-white border border-stone-200 rounded-2xl p-5 hover:border-amber-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col h-full">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-xl mb-4`}>
                      {calc.icon}
                    </div>
                    <h3 className="text-sm font-black text-stone-800 mb-1.5 group-hover:text-amber-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{calc.desc}</p>
                    <div className="mt-4 text-xs font-bold text-amber-500 flex items-center gap-1">
                      계산하기 <span>→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {/* 광고 — 카테고리 2번째 아래 (건강·신체 다음, 모든 디바이스) */}
          {idx === 1 && <AdUnit slot={AD_SLOT_MIDDLE} className="my-2" />}
          {/* 광고 — 카테고리 4번째 아래 (라이프 다음, 태블릿·데스크탑) */}
          {idx === 3 && <AdUnit slot={AD_SLOT_MIDDLE} className="my-2 hidden md:block" />}
          </Fragment>
        ))}
      </main>

      {/* 활용 예시 */}
      <section className="container md:w-11/12 w-[92%] 2xl:w-full mx-auto mt-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-base shrink-0">
            📌
          </div>
          <div>
            <h2 className="text-sm font-black text-amber-600">활용 예시</h2>
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
