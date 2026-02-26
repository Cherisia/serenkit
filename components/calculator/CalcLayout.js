import Link from 'next/link'
import FaqSection from '@/components/calculator/FaqSection'

const ALL_CALCS = [
  { name: 'D-day 계산기',    url: '/cal/dday',          icon: '📅', desc: '특정 날짜까지 남은 일수' },
  { name: '날짜 차이',        url: '/cal/date-diff',      icon: '📆', desc: '두 날짜 사이의 기간' },
  { name: '날짜 더하기/빼기', url: '/cal/date-add',       icon: '➕', desc: '날짜에 기간 더하고 빼기' },
  { name: '영업일 계산기',    url: '/cal/business-days',  icon: '💼', desc: '주말·공휴일 제외 근무일' },
  { name: '만 나이',          url: '/cal/age',            icon: '🎂', desc: '법적 만 나이 계산' },
  { name: '기념일 계산기',    url: '/cal/anniversary',    icon: '💑', desc: '100일·1주년 기념일 날짜' },
  { name: '띠/별자리',        url: '/cal/zodiac',         icon: '🐾', desc: '나의 띠와 별자리 확인' },
  { name: '월급 실수령액',    url: '/cal/salary',         icon: '💰', desc: '4대보험·소득세 공제 후 실수령액' },
  { name: '적정 체중',        url: '/cal/weight',         icon: '⚖️', desc: 'BMI와 표준 체중 계산' },
  { name: '기초대사량',       url: '/cal/calorie',        icon: '🔥', desc: '하루 필요 칼로리 계산' },
  { name: '단위 변환기',      url: '/cal/unit',           icon: '🔄', desc: '길이·무게·온도 등 단위 변환' },
  { name: '생리주기 계산기', url: '/cal/period',          icon: '🌸', desc: '다음 생리·배란일·가임기 예측' },
]

export default function CalcLayout({ title, desc, currentUrl, faqs, children }) {
  const others = ALL_CALCS.filter((c) => c.url !== currentUrl)

  return (
    <div className="w-full bg-slate-50 pb-20">

      {/* 배너 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative container mx-auto px-4 py-14 text-center text-white">
          <h1 className="text-2xl font-black tracking-tight mb-2">{title}</h1>
          <p className="text-sm opacity-85">{desc}</p>
        </div>
      </section>

      {/* 계산기 본체 */}
      <main className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-8">
        {children}
      </main>

      {/* 다른 계산기 */}
      <aside className="container xl:w-[560px] md:w-[600px] w-[92%] mx-auto mt-10">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xs font-black text-stone-500 tracking-widest uppercase">Other Tools</h2>
          <div className="flex-1 h-px bg-stone-200" />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-none p-0">
          {others.map((c) => (
            <li key={c.url}>
              <Link href={c.url}
                className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl p-3 hover:border-amber-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 group">
                <span className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-sm shrink-0">
                  {c.icon}
                </span>
                <span className="text-xs font-bold text-stone-600 group-hover:text-amber-600 transition-colors leading-tight">
                  {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

    </div>
  )
}
