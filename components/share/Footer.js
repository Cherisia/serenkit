import Link from 'next/link'

const links = [
  { name: 'D-day 계산기',    url: '/cal/dday' },
  { name: '날짜 차이',        url: '/cal/date-diff' },
  { name: '날짜 더하기/빼기', url: '/cal/date-add' },
  { name: '영업일 계산기',    url: '/cal/business-days' },
  { name: '만 나이',          url: '/cal/age' },
  { name: '기념일 계산기',    url: '/cal/anniversary' },
]

export default function Footer() {
  return (
    <footer className="bg-stone-800">
      <div className="container mx-auto px-6 xl:px-48 py-12 max-md:py-8">
        <div className="flex flex-wrap gap-10 text-sm text-stone-400">

          {/* 브랜드 */}
          <div className="w-full">
            <strong className="text-xl font-black text-white tracking-tight">
              tool<span className="text-amber-400">it</span>
            </strong>
            <p className="mt-2 text-xs text-stone-500">무료 날짜 계산기 모음 서비스</p>
          </div>

          {/* 계산기 목록 */}
          <nav aria-label="계산기 목록" className="flex-1 min-w-[180px]">
            <h2 className="font-bold text-stone-300 mb-3">계산기</h2>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.url}>
                  <Link href={l.url} className="hover:text-amber-400 transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 정보 */}
          <nav aria-label="안내 및 법적 정보" className="min-w-[180px]">
            <h2 className="font-bold text-stone-300 mb-3">안내</h2>
            <ul className="space-y-2">
              <li>계산 결과는 참고용입니다</li>
              <li>문의 : admin@toolit.com</li>
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </nav>

          {/* 카피라이트 */}
          <div className="w-full border-t border-stone-700 pt-5">
            <small className="text-xs text-stone-600">
              Copyright ⓒ 2025 Toolit. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  )
}
