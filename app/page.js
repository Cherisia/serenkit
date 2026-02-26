import Link from 'next/link'

export const metadata = {
  title: 'serenkit | 숫자가 필요한 순간',
  description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 적정 체중, 기초대사량, 단위 변환, 생리주기까지 생활에 필요한 모든 계산기를 무료로 제공합니다.',
  keywords: ['날짜 계산기', 'D-day 계산기', '날짜 차이 계산기', '영업일 계산기', '만 나이 계산기', '기념일 계산기', '월급 실수령액 계산기', 'BMI 계산기', '적정 체중 계산기', '기초대사량 계산기', '단위 변환기', '생리주기 계산기', '무료 계산기'],
  alternates: { canonical: 'https://serenkit.com/' },
  openGraph: {
    title: 'serenkit | 숫자가 필요한 순간',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 적정 체중, 기초대사량, 단위 변환, 생리주기까지 생활에 필요한 모든 계산기를 무료로 제공합니다.',
    url: 'https://serenkit.com/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'serenkit | 숫자가 필요한 순간' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '생활 계산기 목록',
  url: 'https://serenkit.com/',
  itemListElement: [
    { '@type': 'ListItem', position: 1,  name: 'D-day 계산기',       url: 'https://serenkit.com/cal/dday/' },
    { '@type': 'ListItem', position: 2,  name: '날짜 차이 계산기',    url: 'https://serenkit.com/cal/date-diff/' },
    { '@type': 'ListItem', position: 3,  name: '날짜 더하기/빼기',    url: 'https://serenkit.com/cal/date-add/' },
    { '@type': 'ListItem', position: 4,  name: '영업일 계산기',       url: 'https://serenkit.com/cal/business-days/' },
    { '@type': 'ListItem', position: 5,  name: '만 나이 계산기',      url: 'https://serenkit.com/cal/age/' },
    { '@type': 'ListItem', position: 6,  name: '기념일 계산기',       url: 'https://serenkit.com/cal/anniversary/' },
    { '@type': 'ListItem', position: 7,  name: '적정 체중 계산기',    url: 'https://serenkit.com/cal/weight/' },
    { '@type': 'ListItem', position: 8,  name: '기초대사량 계산기',   url: 'https://serenkit.com/cal/calorie/' },
    { '@type': 'ListItem', position: 9,  name: '생리주기 계산기',     url: 'https://serenkit.com/cal/period/' },
    { '@type': 'ListItem', position: 10, name: '월급 실수령액 계산기', url: 'https://serenkit.com/cal/salary/' },
    { '@type': 'ListItem', position: 11, name: '띠/별자리 계산기',    url: 'https://serenkit.com/cal/zodiac/' },
    { '@type': 'ListItem', position: 12, name: '단위 변환기',         url: 'https://serenkit.com/cal/unit/' },
  ],
}

const categories = [
  {
    key: 'date',
    label: '날짜 · 시간',
    icon: '📅',
    desc: '날짜 계산의 모든 것',
    color: 'from-amber-400 to-orange-400',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    labelColor: 'text-amber-600',
    calcs: [
      { name: 'D-day 계산기',    url: '/cal/dday',         icon: '📅', desc: '특정 날짜까지 남은 일수와 경과 일수를 계산해요', color: 'from-amber-400 to-orange-400' },
      { name: '날짜 차이',        url: '/cal/date-diff',     icon: '📆', desc: '두 날짜 사이 일수·주·월·년을 한눈에 확인해요',   color: 'from-yellow-400 to-amber-400' },
      { name: '날짜 더하기/빼기', url: '/cal/date-add',      icon: '➕', desc: '날짜에 원하는 기간을 더하거나 빼서 결과를 계산해요', color: 'from-orange-400 to-rose-400' },
      { name: '영업일 계산기',    url: '/cal/business-days', icon: '💼', desc: '주말·공휴일 제외한 실제 근무 가능 일수를 계산해요', color: 'from-lime-400 to-green-400' },
      { name: '만 나이 계산기',   url: '/cal/age',           icon: '🎂', desc: '생년월일로 법적 만 나이를 정확하게 계산해요',       color: 'from-sky-400 to-blue-400' },
      { name: '기념일 계산기',    url: '/cal/anniversary',   icon: '💑', desc: '100일·200일·1주년 등 기념일 날짜를 자동 계산해요',  color: 'from-pink-400 to-rose-400' },
    ],
  },
  {
    key: 'health',
    label: '건강 · 신체',
    icon: '💪',
    desc: '내 몸을 숫자로 이해해요',
    color: 'from-emerald-400 to-teal-400',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    labelColor: 'text-emerald-600',
    calcs: [
      { name: '적정 체중 계산기', url: '/cal/weight',   icon: '⚖️', desc: 'BMI와 표준 체중으로 나의 적정 체중 범위를 확인해요',         color: 'from-cyan-400 to-sky-500' },
      { name: '기초대사량 계산기', url: '/cal/calorie', icon: '🔥', desc: '나이·키·체중·활동량으로 하루 필요 칼로리를 계산해요',         color: 'from-rose-400 to-orange-400' },
      { name: '생리주기 계산기',  url: '/cal/period',   icon: '🌸', desc: '다음 생리 예정일·배란일·가임기·PMS를 한 번에 예측해요',       color: 'from-pink-400 to-rose-500' },
    ],
  },
  {
    key: 'finance',
    label: '금융 · 급여',
    icon: '💰',
    desc: '돈 계산을 정확하게',
    color: 'from-green-400 to-emerald-500',
    border: 'border-green-200',
    bg: 'bg-green-50',
    labelColor: 'text-green-600',
    calcs: [
      { name: '월급 실수령액',    url: '/cal/salary',  icon: '💰', desc: '4대보험·소득세 공제 후 실제 통장에 들어오는 금액을 계산해요', color: 'from-emerald-400 to-green-500' },
    ],
  },
  {
    key: 'life',
    label: '운세 · 라이프',
    icon: '✨',
    desc: '생활 속 재미있는 계산',
    color: 'from-violet-400 to-purple-500',
    border: 'border-violet-200',
    bg: 'bg-violet-50',
    labelColor: 'text-violet-600',
    calcs: [
      { name: '띠/별자리 계산기', url: '/cal/zodiac',  icon: '🐾', desc: '생년월일로 나의 띠와 별자리, 오행, 궁합까지 확인해요',        color: 'from-violet-400 to-purple-500' },
    ],
  },
  {
    key: 'convert',
    label: '단위 변환',
    icon: '🔄',
    desc: '길이·무게·온도 등 즉시 변환',
    color: 'from-teal-400 to-cyan-500',
    border: 'border-teal-200',
    bg: 'bg-teal-50',
    labelColor: 'text-teal-600',
    calcs: [
      { name: '단위 변환기',      url: '/cal/unit',    icon: '🔄', desc: '길이·무게·온도·넓이·부피·속도·데이터 단위를 한 번에 변환해요', color: 'from-teal-400 to-cyan-500' },
    ],
  },
]

export default function Home() {
  return (
    <div className="w-full bg-slate-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 히어로 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <p className="text-xs font-black opacity-75 mb-4 tracking-[0.3em] uppercase">Free Calculator</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            숫자가 필요한 순간, 이제 <span className="underline decoration-white/50 decoration-2 underline-offset-4">한 곳</span>에서
          </h1>
          <p className="text-sm md:text-base opacity-85 max-w-sm mx-auto leading-relaxed">
            날짜·건강·금융·단위 변환까지<br />
            생활에 필요한 모든 계산기 모음
          </p>
          {/* 카테고리 버튼 */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {categories.map(c => (
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

      {/* 카테고리별 계산기 */}
      <main className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-10 space-y-10">
        {categories.map(cat => (
          <section key={cat.key} id={cat.key} className="scroll-mt-20">
            {/* 카테고리 헤더 */}
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

            {/* 카드 그리드 */}
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 list-none p-0">
              {cat.calcs.map((calc) => (
                <li key={calc.url}>
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
        ))}
      </main>

      {/* 활용 예시 */}
      <section className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-10">
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
          {[
            {
              icon: '💑', title: '연인 · 커플',
              color: 'from-pink-400 to-rose-400',
              bg: 'bg-pink-50', border: 'border-pink-100', titleColor: 'text-pink-600',
              items: [
                '처음 만난 날부터 D-day 카운트',
                '100일·200일·1주년 기념일 날짜',
                '결혼기념일까지 남은 날 계산',
                '두 사람의 띠·별자리 궁합 확인',
              ],
            },
            {
              icon: '📚', title: '수험생 · 학생',
              color: 'from-sky-400 to-blue-400',
              bg: 'bg-sky-50', border: 'border-sky-100', titleColor: 'text-sky-600',
              items: [
                '수능·시험까지 D-day 계산',
                '원서 마감일까지 영업일 확인',
                '학기 시작·종강일 날짜 계산',
                '만 나이로 학년·병역 기준 확인',
              ],
            },
            {
              icon: '💼', title: '직장인 · 비즈니스',
              color: 'from-emerald-400 to-green-400',
              bg: 'bg-emerald-50', border: 'border-emerald-100', titleColor: 'text-emerald-600',
              items: [
                '세전 월급 → 실수령액 계산',
                '계약 만료일·프로젝트 마감 영업일',
                '입사일 기준 근속 기간 확인',
                '연봉 협상 전 공제 내역 파악',
              ],
            },
            {
              icon: '💪', title: '건강 · 다이어트',
              color: 'from-orange-400 to-rose-400',
              bg: 'bg-orange-50', border: 'border-orange-100', titleColor: 'text-orange-600',
              items: [
                'BMI · 적정 체중 범위 확인',
                '기초대사량·하루 필요 칼로리 계산',
                '감량·유지·증량 목표별 식단 기준',
                '다이어트 시작일 D-day 관리',
              ],
            },
            {
              icon: '🌸', title: '여성 · 임신 준비',
              color: 'from-pink-400 to-fuchsia-400',
              bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', titleColor: 'text-fuchsia-600',
              items: [
                '다음 생리 예정일 미리 확인',
                '배란일·가임기 날짜 예측',
                'PMS 예상 기간 파악',
                '향후 4개월 주기 한눈에 보기',
              ],
            },
            {
              icon: '🔄', title: '일상 · 생활',
              color: 'from-teal-400 to-cyan-400',
              bg: 'bg-teal-50', border: 'border-teal-100', titleColor: 'text-teal-600',
              items: [
                'cm ↔ 인치, kg ↔ 파운드 즉시 변환',
                '평 ↔ m² 아파트 넓이 계산',
                '섭씨 ↔ 화씨 온도 변환',
                '해외 레시피 용량 단위 변환',
              ],
            },
          ].map(({ icon, title, color, bg, border, titleColor, items }) => (
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

    </div>
  )
}
