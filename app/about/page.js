import Link from 'next/link'

export const metadata = {
  title: 'serenkit 소개',
  description: 'serenkit은 날짜 계산, 건강, 금융, 단위 변환 등 생활에 필요한 계산기를 제공하는 서비스입니다.',
  alternates: { canonical: 'https://serenkit.com/about/' },
  openGraph: {
    title: 'serenkit 소개 - serenkit',
    description: 'serenkit은 날짜 계산, 건강, 금융, 단위 변환 등 생활에 필요한 계산기를 제공하는 서비스입니다.',
    url: 'https://serenkit.com/about/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'serenkit 소개' }],
  },
}

const CATEGORIES = [
  {
    icon: '📅',
    label: '날짜 · 시간',
    items: ['D-day 계산기', '날짜 차이 계산기', '날짜 더하기/빼기', '영업일 계산기', '만 나이 계산기', '기념일 계산기', '양력 음력 변환기'],
  },
  {
    icon: '💪',
    label: '건강 · 신체',
    items: ['적정 체중 계산기', '기초대사량 계산기', '생리주기 계산기'],
  },
  {
    icon: '💰',
    label: '금융 · 급여',
    items: ['월급 실수령액 계산기', '퇴직금 계산기', '실업급여 계산기', '시급 계산기', '대출 이자 계산기', '부가세 계산기', '종합소득세 계산기'],
  },
  {
    icon: '✨',
    label: '운세 · 라이프',
    items: ['띠/별자리 계산기', 'MBTI 궁합 계산기'],
  },
  {
    icon: '🔄',
    label: '단위 변환',
    items: ['단위 변환기 (길이·무게·온도·넓이·부피)'],
  },
]

export default function AboutPage() {
  return (
    <div className="w-full bg-slate-50 pb-20">

      {/* 헤더 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 py-14 pt-[calc(3.5rem+3.5rem)] text-center text-white">
        <p className="text-xs font-black opacity-75 mb-3 tracking-[0.3em] uppercase">About</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">serenkit 소개</h1>
        <p className="text-xs opacity-75 mt-3">숫자가 필요한 순간, 생활 계산기 모음</p>
      </section>

      <main className="container xl:w-7/12 md:w-9/12 w-[92%] mx-auto mt-10 space-y-6">

        {/* 서비스 소개 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">serenkit이란?</h2>
          <p className="text-xs text-stone-500 leading-7">
            serenkit은 일상에서 자주 필요한 계산을 빠르고 간편하게 해결할 수 있는 생활 계산기 모음 서비스입니다.
          </p>
          <p className="text-xs text-stone-500 leading-7 mt-2">
            날짜 계산부터 건강 지표, 급여·세금, 단위 변환까지 - 복잡한 계산을 공식을 몰라도 누구나 쉽게 사용할 수 있도록 만들었습니다.
            회원가입 없이 바로 이용 가능하며, 모바일과 PC 어디서든 편하게 사용할 수 있습니다.
          </p>
        </article>

        {/* 운영 방침 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">운영 방침</h2>
          <ul className="space-y-3">
            {[
              { icon: '🙌', title: '가입 없이 즉시 사용', desc: '회원가입, 앱 설치 없이 브라우저에서 바로 사용할 수 있습니다.' },
              { icon: '🔒', title: '정보 수집 없음', desc: '입력한 계산 값은 서버로 전송되지 않습니다. 모든 계산은 브라우저 안에서 처리됩니다.' },
              { icon: '📋', title: '참고용 결과', desc: '계산 결과는 참고용으로만 활용해 주세요. 법적·의료적 판단이 필요한 경우 전문가에게 문의하시기 바랍니다.' },
              { icon: '🔄', title: '지속 업데이트', desc: '법령 및 기준 변경 시 계산기 로직을 최신 기준으로 업데이트합니다.' },
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

        {/* 제공 계산기 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-5">제공하는 계산기 ({CATEGORIES.reduce((s, c) => s + c.items.length, 0)}개)</h2>
          <div className="space-y-5">
            {CATEGORIES.map(cat => (
              <div key={cat.label}>
                <p className="text-xs font-black text-stone-600 mb-2 flex items-center gap-1.5">
                  <span>{cat.icon}</span>{cat.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <li key={item}
                      className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 rounded-full px-3 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        {/* 문의 */}
        <article className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-sm font-black text-stone-800 mb-4">문의 및 제안</h2>
          <p className="text-xs text-stone-500 leading-7">
            계산기 오류 신고, 개선 제안, 새로운 계산기 요청 등은 아래 이메일로 보내주세요.
            모든 문의를 검토하여 서비스 개선에 반영하겠습니다.
          </p>
          <a href="mailto:admin@serenkit.com"
            className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
            <span>✉️</span> admin@serenkit.com
          </a>
        </article>

        {/* 홈으로 */}
        <div className="text-center pt-2">
          <Link href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-amber-500 transition-colors">
            ← 계산기 목록으로 돌아가기
          </Link>
        </div>

      </main>
    </div>
  )
}
