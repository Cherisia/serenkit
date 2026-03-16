import CalcLayout from '@/components/calculator/CalcLayout'
import DdayCalc from '@/components/calculator/DdayCalc'

export const metadata = {
  title: 'D-day 계산기 - 남은 날짜·경과 일수 계산',
  description: '특정 날짜까지 남은 일수(D-숫자)와 경과 일수(D+숫자)를 바로 계산해요. 수능·시험·군 전역일·기념일·여행·프로젝트 마감 등 중요한 날짜를 쉽고 빠르게 확인하세요.',
  keywords: ['D-day 계산기', 'D데이 계산기', '디데이 계산기', '남은 날짜 계산', '날짜 카운트다운', '수능 디데이', '전역일 계산기', '시험 D-day', '기념일 카운트다운'],
  alternates: { canonical: 'https://serenkit.com/cal/dday/' },
  openGraph: {
    title: 'D-day 계산기 - serenkit',
    description: '특정 날짜까지 남은 일수와 경과 일수를 바로 계산해요.',
    url: 'https://serenkit.com/cal/dday/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'D-day 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'D-day 계산기',
  url: 'https://serenkit.com/cal/dday/',
  description: '특정 날짜까지 남은 일수와 경과 일수를 계산하는 D-day 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: 'D-day 계산기', item: 'https://serenkit.com/cal/dday/' },
    ],
  },
}

const faqs = [
  { q: 'D-day 계산기란 무엇인가요?', a: 'D-day 계산기는 특정 날짜까지 남은 일수(D-숫자) 또는 기준일로부터 경과한 일수(D+숫자)를 계산해주는 도구입니다. 수능·시험·군 전역일·기념일·여행·프로젝트 마감 등 중요한 날짜를 관리할 때 활용할 수 있습니다.' },
  { q: 'D-day가 D-0이면 어떤 의미인가요?', a: '기준일과 목표일이 같은 날인 경우 D-Day로 표시됩니다. 즉 오늘이 바로 그 날임을 의미합니다.' },
  { q: 'D+숫자는 무슨 의미인가요?', a: '목표일이 기준일보다 과거인 경우 D+숫자로 표시됩니다. 예를 들어 D+100은 목표일로부터 100일이 경과했음을 의미합니다. 연인의 100일·200일 기념일을 지난 기준으로 확인할 때도 유용해요.' },
  { q: '수능·군 전역일 D-day 계산에도 쓸 수 있나요?', a: '네, 목표일에 수능 날짜나 전역 예정일을 입력하면 오늘부터 며칠 남았는지 바로 계산됩니다. 군 복무 중에는 입대일을 기준일로 놓고 전역일을 목표일로 설정하면 D+숫자로 복무 경과일도 확인할 수 있어요.' },
  { q: '기준일을 오늘 말고 다른 날짜로 설정할 수 있나요?', a: '네, 기준일 입력란에서 원하는 날짜로 자유롭게 변경할 수 있습니다. 특정 시점 기준의 D-day를 계산하거나 미래 특정 날짜 기준의 카운트다운을 확인하고 싶을 때 활용하세요.' },
  { q: '크리스마스, 새해 등 자주 쓰는 날짜를 빠르게 입력할 수 있나요?', a: '네, 목표일 입력란 아래의 프리셋 버튼(크리스마스, 새해, 발렌타인, 어린이날)을 누르면 해당 날짜가 자동으로 입력됩니다.' },
  { q: '윤년이 D-day 계산에 영향을 미치나요?', a: '이 계산기는 윤년(2월 29일)을 자동으로 반영하므로 별도로 고려하지 않아도 됩니다. 예를 들어 2024년(윤년) 2월 1일부터 3월 1일까지 계산 시 29일이 정확하게 표시됩니다.' },
  { q: '매년 반복되는 생일·기념일 D-day는 어떻게 계산하나요?', a: '목표일에 올해 생일(또는 기념일) 날짜를 입력하면 올해까지 남은 일수가 계산됩니다. 이미 지났다면 내년 날짜로 입력하거나 기념일 계산기를 함께 활용하면 편리해요.' },
]

export default function Page() {
  return (
    <CalcLayout title="📅 D-day 계산기" desc="특정 날짜까지 남은 일수, 경과 일수를 계산해요" currentUrl="/cal/dday/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DdayCalc />
    </CalcLayout>
  )
}
