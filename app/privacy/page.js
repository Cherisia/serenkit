export const metadata = {
  title: '개인정보처리방침',
  description: 'serenkit 서비스의 개인정보처리방침을 안내합니다.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://serenkit.com/privacy/' },
}

const SECTIONS = [
  {
    title: '1. 수집하는 개인정보',
    content: `serenkit은 별도의 회원가입 없이 이용 가능한 서비스로, 사용자로부터 직접적인 개인정보(이름, 이메일, 전화번호 등)를 수집하지 않습니다.

다만, 서비스 운영 및 품질 향상을 위해 아래와 같은 정보가 자동으로 수집될 수 있습니다.
• 방문 페이지, 체류 시간, 유입 경로 등 서비스 이용 기록 (Google Analytics)
• IP 주소, 브라우저 종류, 운영체제 등 기기 및 접속 환경 정보
• 쿠키(Cookie) 및 유사 기술을 통해 수집되는 정보`,
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    content: `수집된 정보는 다음 목적으로만 사용됩니다.
• 서비스 이용 통계 분석 및 기능 개선
• 서비스 오류 탐지 및 기술적 문제 해결
• 맞춤형 광고 제공 (Google AdSense)`,
  },
  {
    title: '3. 쿠키(Cookie) 사용',
    content: `serenkit은 서비스 이용 편의 및 광고 최적화를 위해 쿠키를 사용합니다.

쿠키란 웹사이트가 사용자의 브라우저에 저장하는 소규모 텍스트 파일입니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다. 단, 쿠키를 차단할 경우 일부 서비스 이용에 불편이 생길 수 있습니다.

• Google Analytics: 서비스 이용 통계 수집
• Google AdSense: 관심 기반 광고 노출`,
  },
  {
    title: '4. 제3자 서비스 및 광고',
    content: `serenkit은 Google LLC가 제공하는 Google Analytics 및 Google AdSense를 사용합니다. 이 과정에서 Google은 쿠키를 통해 사용자의 서비스 이용 행태 및 관심사 정보를 수집할 수 있습니다.

Google의 개인정보 처리 방식에 대한 자세한 내용은 아래에서 확인하실 수 있습니다.
• Google 개인정보처리방침: https://policies.google.com/privacy
• 맞춤 광고 설정 관리: https://adssettings.google.com`,
  },
  {
    title: '5. 개인정보의 보유 및 이용 기간',
    content: `serenkit은 개인정보를 목적 달성 후 지체 없이 파기합니다. Google Analytics 등 제3자 서비스의 데이터 보유 기간은 각 서비스의 정책을 따릅니다.`,
  },
  {
    title: '6. 미성년자 보호',
    content: `serenkit은 만 14세 미만 아동으로부터 의도적으로 개인정보를 수집하지 않습니다. 만약 보호자가 자녀의 정보가 수집되었다고 판단하시는 경우, 아래 연락처로 문의해 주시면 즉시 삭제 조치하겠습니다.`,
  },
  {
    title: '7. 개인정보 관련 문의',
    content: `개인정보 처리에 관한 문의사항은 아래 연락처로 보내주세요.
• 이메일: admin@serenkit.com`,
  },
  {
    title: '8. 방침 변경',
    content: `본 개인정보처리방침은 법령 또는 서비스 변경에 따라 업데이트될 수 있습니다. 변경 시 본 페이지를 통해 공지합니다.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="w-full bg-slate-50 pb-20">
      {/* 헤더 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 py-14 pt-[calc(3.5rem+3.5rem)] text-center text-white">
        <p className="text-xs font-black opacity-75 mb-3 tracking-[0.3em] uppercase">Legal</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">개인정보처리방침</h1>
        <p className="text-xs opacity-75 mt-3">최종 업데이트: 2025년 1월 1일</p>
      </section>

      {/* 본문 */}
      <main className="container xl:w-7/12 md:w-9/12 w-[92%] mx-auto mt-10 space-y-8">
        {/* 인트로 */}
        <p className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-xs text-stone-600 leading-relaxed">
          serenkit(이하 "서비스")은 사용자의 개인정보를 중요하게 생각합니다. 본 방침은 서비스 이용 과정에서 수집되는 정보의 종류와 사용 방식을 안내합니다.
        </p>

        {/* 섹션들 */}
        {SECTIONS.map((s) => (
          <article key={s.title} className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-sm font-black text-stone-800 mb-4">{s.title}</h2>
            <p className="text-xs text-stone-500 leading-7 whitespace-pre-line">{s.content}</p>
          </article>
        ))}
      </main>
    </div>
  )
}
