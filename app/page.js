import Link from 'next/link'

export const metadata = {
  title: 'serenKit | 무료 날짜 계산기 모음',
  description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일 등 생활에 필요한 모든 날짜 계산기를 무료로 제공합니다.',
  keywords: ['날짜 계산기', 'D-day 계산기', '날짜 차이 계산기', '영업일 계산기', '만 나이 계산기', '기념일 계산기', '무료 계산기'],
  alternates: { canonical: 'https://serenkit.com/' },
  openGraph: {
    title: 'serenKit | 무료 날짜 계산기 모음',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일 등 생활에 필요한 모든 날짜 계산기를 무료로 제공합니다.',
    url: 'https://serenkit.com/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'serenKit 무료 날짜 계산기 모음' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '날짜 계산기 목록',
  url: 'https://serenkit.com/',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'D-day 계산기',    url: 'https://serenkit.com/cal/dday/' },
    { '@type': 'ListItem', position: 2, name: '날짜 차이 계산기', url: 'https://serenkit.com/cal/date-diff/' },
    { '@type': 'ListItem', position: 3, name: '날짜 더하기/빼기', url: 'https://serenkit.com/cal/date-add/' },
    { '@type': 'ListItem', position: 4, name: '영업일 계산기',    url: 'https://serenkit.com/cal/business-days/' },
    { '@type': 'ListItem', position: 5, name: '만 나이 계산기',   url: 'https://serenkit.com/cal/age/' },
    { '@type': 'ListItem', position: 6, name: '기념일 계산기',    url: 'https://serenkit.com/cal/anniversary/' },
    { '@type': 'ListItem', position: 7, name: '띠/별자리 계산기', url: 'https://serenkit.com/cal/zodiac/' },
  ],
}

const calcs = [
  { name: 'D-day 계산기',    url: '/cal/dday',         icon: '📅', desc: '특정 날짜까지 남은 일수와 경과 일수를 계산해요', color: 'from-amber-400 to-orange-400' },
  { name: '날짜 차이',        url: '/cal/date-diff',     icon: '📆', desc: '두 날짜 사이 일수·주·월·년을 한눈에 확인해요',   color: 'from-yellow-400 to-amber-400' },
  { name: '날짜 더하기/빼기', url: '/cal/date-add',      icon: '➕', desc: '날짜에 원하는 기간을 더하거나 빼서 결과를 계산해요', color: 'from-orange-400 to-rose-400' },
  { name: '영업일 계산기',    url: '/cal/business-days', icon: '💼', desc: '주말·공휴일 제외한 실제 근무 가능 일수를 계산해요', color: 'from-lime-400 to-green-400' },
  { name: '만 나이 계산기',   url: '/cal/age',           icon: '🎂', desc: '생년월일로 법적 만 나이를 정확하게 계산해요',       color: 'from-sky-400 to-blue-400' },
  { name: '기념일 계산기',    url: '/cal/anniversary',   icon: '💑', desc: '100일·200일·1주년 등 기념일 날짜를 자동 계산해요',  color: 'from-pink-400 to-rose-400' },
  { name: '띠/별자리 계산기', url: '/cal/zodiac',         icon: '🐾', desc: '생년월일로 나의 띠와 별자리, 오행, 궁합까지 확인해요', color: 'from-violet-400 to-purple-500' },
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
          <p className="text-xs font-black opacity-75 mb-4 tracking-[0.3em] uppercase">Free Date Calculator</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            날짜 계산, 이제 <span className="underline decoration-white/50 decoration-2 underline-offset-4">한 곳</span>에서
          </h1>
          <p className="text-sm md:text-base opacity-85 max-w-sm mx-auto leading-relaxed">
            D-day부터 기념일, 만 나이, 영업일까지<br />
            생활에 필요한 모든 날짜 계산기 모음
          </p>
        </div>
      </section>

      {/* 계산기 그리드 */}
      <main className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-10">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xs font-black text-stone-500 tracking-widest uppercase">All Tools</h2>
          <div className="flex-1 h-px bg-stone-200" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 list-none p-0">
          {calcs.map((calc) => (
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
      </main>

      {/* 활용 예시 */}
      <section className="container xl:w-10/12 md:w-11/12 w-[92%] mx-auto mt-10">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-700 mb-5">📌 이런 상황에 활용하세요</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-500">
            <article>
              <h3 className="font-bold text-stone-600 mb-2">💑 연인 · 기념일</h3>
              <ul className="space-y-1.5">
                <li>→ 100일·200일 기념일 날짜</li>
                <li>→ 처음 만난 날 D-day</li>
                <li>→ 결혼기념일까지 남은 날</li>
              </ul>
            </article>
            <article>
              <h3 className="font-bold text-stone-600 mb-2">📚 수험생 · 직장인</h3>
              <ul className="space-y-1.5">
                <li>→ 수능 D-day 계산</li>
                <li>→ 프로젝트 마감 영업일</li>
                <li>→ 계약 만료일 계산</li>
              </ul>
            </article>
            <article>
              <h3 className="font-bold text-stone-600 mb-2">👶 임신 · 육아</h3>
              <ul className="space-y-1.5">
                <li>→ 출산 예정일 D-day</li>
                <li>→ 아기 돌 날짜 계산</li>
                <li>→ 만 나이 계산</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

    </div>
  )
}
