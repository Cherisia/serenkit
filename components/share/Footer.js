import Link from 'next/link'

const categories = [
  {
    label: '📅 날짜 · 시간',
    links: [
      { name: 'D-day 계산기',    url: '/cal/dday' },
      { name: '날짜 차이 계산기', url: '/cal/date-diff' },
      { name: '날짜 더하기/빼기', url: '/cal/date-add' },
      { name: '영업일 계산기',    url: '/cal/business-days' },
      { name: '만 나이 계산기',   url: '/cal/age' },
      { name: '기념일 계산기',    url: '/cal/anniversary' },
      { name: '양력 음력 변환기', url: '/cal/lunar' },
    ],
  },
  {
    label: '💪 건강 · 신체',
    links: [
      { name: '적정 체중 계산기',  url: '/cal/weight' },
      { name: '기초대사량 계산기', url: '/cal/calorie' },
      { name: '생리주기 계산기',   url: '/cal/period' },
    ],
  },
  {
    label: '💰 금융 · 급여',
    links: [
      { name: '월급 실수령액 계산기', url: '/cal/salary' },
      { name: '퇴직금 계산기',       url: '/cal/severance' },
      { name: '실업급여 계산기',      url: '/cal/unemployment' },
      { name: '시급 계산기',          url: '/cal/hourly' },
      { name: '대출 이자 계산기',     url: '/cal/loan' },
      { name: '부가세 계산기',        url: '/cal/vat' },
      { name: '종합소득세 계산기',    url: '/cal/income-tax' },
    ],
  },
  {
    label: '✨ 운세 · 라이프',
    links: [
      { name: '띠/별자리 계산기', url: '/cal/zodiac' },
      { name: 'MBTI 궁합 계산기', url: '/cal/mbti' },
    ],
  },
  {
    label: '🔄 단위 변환',
    links: [
      { name: '단위 변환기', url: '/cal/unit' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900">

      {/* 메인 푸터 */}
      <div className="container mx-auto px-6 xl:w-10/12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-10">

          {/* 브랜드 */}
          <div>
            <Link href="/">
              <strong className="text-2xl font-black text-white tracking-tight">
                seren<span className="text-amber-400">kit</span>
              </strong>
            </Link>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed">
              숫자가 필요한 순간,<br />생활에 필요한 모든 계산기 모음
            </p>
            <p className="mt-4 text-xs text-stone-500 leading-relaxed">
              날짜 계산부터 건강, 금융, 단위 변환까지<br />
              생활에 꼭 필요한 계산기를 모아둔 서비스입니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['빠른계산', '간편하게'].map(tag => (
                <span key={tag} className="text-[10px] font-bold text-stone-400 border border-stone-700 rounded-full px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 카테고리별 링크 */}
          {categories.map(cat => (
            <nav key={cat.label} aria-label={cat.label}>
              <h2 className="text-xs font-black text-stone-300 mb-3 whitespace-nowrap">{cat.label}</h2>
              <ul className="space-y-2">
                {cat.links.map(l => (
                  <li key={l.url}>
                    <Link href={l.url}
                      className="text-xs text-stone-500 hover:text-amber-400 transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>
      </div>

      {/* 하단 바 */}
      <div className="border-t border-stone-800">
        <div className="container mx-auto px-6 xl:w-10/12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <small className="text-xs text-stone-600">
            Copyright ⓒ 2026 serenkit. All rights reserved.
          </small>
          <div className="flex items-center gap-4 text-xs text-stone-600">
            <span>계산 결과는 참고용입니다</span>
            <span className="text-stone-700">·</span>
            <a href="mailto:admin@serenkit.com" className="hover:text-amber-400 transition-colors">
              admin@serenkit.com
            </a>
            <span className="text-stone-700">·</span>
            <Link href="/about" className="hover:text-amber-400 transition-colors">소개</Link>
            <span className="text-stone-700">·</span>
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">개인정보처리방침</Link>
            <span className="text-stone-700">·</span>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
