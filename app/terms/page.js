export const metadata = {
  title: '이용약관',
  description: 'Toolit 서비스의 이용약관을 안내합니다.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://toolit.com/terms/' },
}

const SECTIONS = [
  {
    title: '제1조 (목적)',
    content: `본 약관은 Toolit(이하 "서비스")이 제공하는 날짜 계산기 서비스의 이용 조건 및 절차, 서비스 제공자와 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.`,
  },
  {
    title: '제2조 (서비스의 제공)',
    content: `서비스는 다음과 같은 기능을 제공합니다.
• D-day 계산기: 특정 날짜까지 남은 일수 및 경과 일수 계산
• 날짜 차이 계산기: 두 날짜 사이의 기간 계산
• 날짜 더하기/빼기: 날짜에 기간을 더하거나 빼는 계산
• 영업일 계산기: 주말 및 공휴일을 제외한 영업일 계산
• 만 나이 계산기: 생년월일 기반 법적 만 나이 계산
• 기념일 계산기: 특정 날짜 기준 기념일 자동 계산

서비스는 별도의 회원가입 없이 무료로 이용할 수 있습니다.`,
  },
  {
    title: '제3조 (서비스 이용)',
    content: `① 서비스는 연중무휴 24시간 제공을 원칙으로 합니다. 단, 시스템 점검·장애·기술적 사유 등으로 일시 중단될 수 있습니다.

② 서비스 제공자는 사전 공지 없이 서비스의 전부 또는 일부를 변경하거나 종료할 수 있습니다.`,
  },
  {
    title: '제4조 (계산 결과의 정확성)',
    content: `① 서비스가 제공하는 계산 결과는 참고용입니다. 법적·의학적·재정적 의사결정에 활용 시 반드시 전문가에게 확인하시기 바랍니다.

② 공휴일 데이터는 사전에 등록된 정보를 기반으로 하며, 임시 공휴일 등 변동 사항이 즉시 반영되지 않을 수 있습니다.

③ 계산 결과의 오류로 인해 발생한 손해에 대해 서비스 제공자는 책임을 지지 않습니다.`,
  },
  {
    title: '제5조 (광고)',
    content: `서비스는 Google AdSense 등의 광고 서비스를 통해 수익을 창출할 수 있습니다. 광고는 사용자의 관심사 기반으로 노출될 수 있으며, 광고 내용은 서비스 제공자의 의견과 무관합니다.`,
  },
  {
    title: '제6조 (지식재산권)',
    content: `서비스 내 모든 콘텐츠(디자인, 텍스트, 코드, 로고 등)의 지식재산권은 서비스 제공자에게 귀속됩니다. 이용자는 서비스 제공자의 사전 동의 없이 이를 복제·배포·수정할 수 없습니다.`,
  },
  {
    title: '제7조 (금지 행위)',
    content: `이용자는 다음 행위를 해서는 안 됩니다.
• 서비스의 정상적인 운영을 방해하는 행위
• 자동화 수단(봇, 크롤러 등)을 이용한 대량 요청
• 서비스를 역공학(Reverse Engineering)하거나 소스코드를 무단으로 추출하는 행위
• 기타 관련 법령에 위반되는 행위`,
  },
  {
    title: '제8조 (책임 제한)',
    content: `서비스 제공자는 다음 사항에 대해 책임을 지지 않습니다.
• 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단
• 이용자의 귀책 사유로 인한 서비스 이용 장애
• 서비스를 통해 제공되는 계산 결과의 오류로 인한 손해
• 제3자가 제공하는 광고·링크된 외부 사이트의 내용`,
  },
  {
    title: '제9조 (약관의 변경)',
    content: `서비스 제공자는 필요한 경우 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다. 변경된 약관은 공지 후 7일이 경과한 날부터 효력이 발생합니다.`,
  },
  {
    title: '제10조 (문의)',
    content: `서비스 이용과 관련한 문의사항은 아래 연락처로 보내주세요.
• 이메일: admin@toolit.com`,
  },
]

export default function TermsPage() {
  return (
    <div className="w-full bg-slate-50 pb-20">
      {/* 헤더 */}
      <section className="w-full bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300 py-14 pt-[calc(3.5rem+3.5rem)] text-center text-white">
        <p className="text-xs font-black opacity-75 mb-3 tracking-[0.3em] uppercase">Legal</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">이용약관</h1>
        <p className="text-xs opacity-75 mt-3">최종 업데이트: 2025년 1월 1일</p>
      </section>

      {/* 본문 */}
      <main className="container xl:w-7/12 md:w-9/12 w-[92%] mx-auto mt-10 space-y-8">
        {/* 인트로 */}
        <p className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-xs text-stone-600 leading-relaxed">
          Toolit 서비스를 이용하시면 본 약관에 동의한 것으로 간주됩니다. 서비스 이용 전 반드시 본 약관을 주의 깊게 읽어주시기 바랍니다.
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
