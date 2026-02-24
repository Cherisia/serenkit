import CalcLayout from '@/components/calculator/CalcLayout'
import DdayCalc from '@/components/calculator/DdayCalc'

export const metadata = {
  title: 'D-day 계산기',
  description: '특정 날짜까지 남은 일수와 경과 일수를 무료로 계산해드립니다. 수능, 시험, 기념일, 여행 등 중요한 날짜를 확인하세요.',
  keywords: ['D-day 계산기', 'D데이 계산기', '디데이 계산기', '남은 날짜 계산', '날짜 카운트다운'],
  alternates: { canonical: 'https://toolit.com/cal/dday/' },
  openGraph: {
    title: 'D-day 계산기 | Toolit',
    description: '특정 날짜까지 남은 일수와 경과 일수를 무료로 계산해드립니다.',
    url: 'https://toolit.com/cal/dday/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'D-day 계산기 | Toolit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'D-day 계산기',
  url: 'https://toolit.com/cal/dday/',
  description: '특정 날짜까지 남은 일수와 경과 일수를 계산하는 무료 D-day 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://toolit.com/' },
      { '@type': 'ListItem', position: 2, name: 'D-day 계산기', item: 'https://toolit.com/cal/dday/' },
    ],
  },
}

const faqs = [
  { q: 'D-day 계산기란 무엇인가요?', a: 'D-day 계산기는 특정 날짜까지 남은 일수(D-숫자) 또는 기준일로부터 경과한 일수(D+숫자)를 계산해주는 도구입니다. 수능, 시험, 기념일, 여행, 프로젝트 마감 등 중요한 날짜를 관리할 때 활용할 수 있습니다.' },
  { q: 'D-day가 D-0이면 어떤 의미인가요?', a: '기준일과 목표일이 같은 날인 경우 D-Day로 표시됩니다. 즉 오늘이 바로 그 날임을 의미합니다.' },
  { q: 'D+숫자는 무슨 의미인가요?', a: '목표일이 기준일보다 과거인 경우 D+숫자로 표시됩니다. 예를 들어 D+100은 목표일로부터 100일이 경과했음을 의미합니다.' },
  { q: '기준일을 오늘 말고 다른 날짜로 설정할 수 있나요?', a: '네, 기준일 입력란에서 원하는 날짜로 자유롭게 변경할 수 있습니다. 특정 시점 기준의 D-day를 계산하고 싶을 때 활용하세요.' },
  { q: '크리스마스, 새해 등 자주 쓰는 날짜를 빠르게 입력할 수 있나요?', a: '네, 목표일 입력란 아래의 프리셋 버튼(크리스마스, 새해, 발렌타인, 어린이날)을 누르면 해당 날짜가 자동으로 입력됩니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="📅 D-day 계산기" desc="특정 날짜까지 남은 일수, 경과 일수를 계산해요" currentUrl="/cal/dday" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DdayCalc />
    </CalcLayout>
  )
}
