import Link from 'next/link'
import FaqSection from '@/components/calculator/FaqSection'

const CATEGORIES = [
  {
    key: 'date',
    label: '날짜 · 시간',
    icon: '📅',
    color: 'from-amber-400 to-orange-400',
    labelColor: 'text-amber-600',
    calcs: [
      { name: 'D-day 계산기',    url: '/cal/dday',         icon: '📅', desc: '특정 날짜까지 남은 일수' },
      { name: '날짜 차이',        url: '/cal/date-diff',     icon: '📆', desc: '두 날짜 사이의 기간' },
      { name: '날짜 더하기/빼기', url: '/cal/date-add',      icon: '➕', desc: '날짜에 기간 더하고 빼기' },
      { name: '영업일 계산기',    url: '/cal/business-days', icon: '💼', desc: '주말·공휴일 제외 근무일' },
      { name: '만 나이',          url: '/cal/age',           icon: '🎂', desc: '법적 만 나이 계산' },
      { name: '기념일 계산기',    url: '/cal/anniversary',   icon: '💑', desc: '100일·1주년 기념일 날짜' },
      { name: '양력 음력 변환기', url: '/cal/lunar',          icon: '🌙', desc: '양력↔음력 상호 변환' },
    ],
  },
  {
    key: 'health',
    label: '건강 · 신체',
    icon: '💪',
    color: 'from-emerald-400 to-teal-400',
    labelColor: 'text-emerald-600',
    calcs: [
      { name: '적정 체중',        url: '/cal/weight',   icon: '⚖️', desc: 'BMI와 표준 체중 계산' },
      { name: '기초대사량',       url: '/cal/calorie',  icon: '🔥', desc: '하루 필요 칼로리 계산' },
      { name: '생리주기 계산기',  url: '/cal/period',   icon: '🌸', desc: '다음 생리·배란일·가임기 예측' },
    ],
  },
  {
    key: 'finance',
    label: '금융 · 급여',
    icon: '💰',
    color: 'from-green-400 to-emerald-500',
    labelColor: 'text-green-600',
    calcs: [
      { name: '월급 실수령액',    url: '/cal/salary',    icon: '💰', desc: '4대보험·소득세 공제 후 실수령액' },
      { name: '퇴직금 계산기',    url: '/cal/severance', icon: '💼', desc: '법정 퇴직금 계산' },
    ],
  },
  {
    key: 'life',
    label: '운세 · 라이프',
    icon: '✨',
    color: 'from-violet-400 to-purple-500',
    labelColor: 'text-violet-600',
    calcs: [
      { name: '띠/별자리',        url: '/cal/zodiac',  icon: '🐾', desc: '나의 띠와 별자리 확인' },
    ],
  },
  {
    key: 'convert',
    label: '단위 변환',
    icon: '🔄',
    color: 'from-teal-400 to-cyan-500',
    labelColor: 'text-teal-600',
    calcs: [
      { name: '단위 변환기',      url: '/cal/unit',    icon: '🔄', desc: '길이·무게·온도 등 단위 변환' },
    ],
  },
]

export default function CalcLayout({ title, desc, currentUrl, faqs, children }) {
  // 현재 페이지 제외 후 빈 카테고리 제거
  const filteredCategories = CATEGORIES
    .map(cat => ({ ...cat, calcs: cat.calcs.filter(c => c.url !== currentUrl) }))
    .filter(cat => cat.calcs.length > 0)

  return (
    <div className="w-full bg-slate-50 pb-20">

      {/* 배너 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 relative overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
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

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center text-sm shrink-0">
            🧮
          </div>
          <div>
            <h2 className="text-sm font-black text-stone-700">다른 계산기</h2>
            <p className="text-[11px] text-stone-400">Other Tools</p>
          </div>
          <div className="flex-1 h-px bg-stone-200 ml-1" />
        </div>

        {/* 카테고리별 목록 */}
        <div className="space-y-6">
          {filteredCategories.map(cat => (
            <div key={cat.key}>
              {/* 카테고리 헤더 */}
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${cat.color} flex items-center justify-center text-[10px] shrink-0`}>
                  {cat.icon}
                </div>
                <span className={`text-xs font-black ${cat.labelColor}`}>{cat.label}</span>
                <div className="flex-1 h-px bg-stone-100" />
              </div>

              {/* 카드 그리드 */}
              <ul className="grid grid-cols-2 gap-2 list-none p-0">
                {cat.calcs.map((c) => (
                  <li key={c.url}>
                    <Link href={c.url}
                      className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl p-3 hover:border-amber-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 group">
                      <span className="w-7 h-7 bg-stone-50 rounded-lg flex items-center justify-center text-sm shrink-0">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-600 group-hover:text-amber-600 transition-colors leading-tight truncate">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-stone-400 leading-tight mt-0.5 truncate">{c.desc}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

    </div>
  )
}
