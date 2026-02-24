import CalcLayout from '@/components/calculator/CalcLayout'
import DateAddCalc from '@/components/calculator/DateAddCalc'

export const metadata = {
  title: '날짜 더하기 빼기 계산기',
  description: '날짜에 년, 월, 일을 더하거나 빼서 결과 날짜를 무료로 계산해드립니다. 90일 후, 1년 전 날짜 등을 간편하게 확인하세요.',
  keywords: ['날짜 더하기', '날짜 빼기', '날짜 계산기', '90일 후 날짜', '몇일 후 날짜'],
  alternates: { canonical: 'https://toolit.com/cal/date-add/' },
  openGraph: {
    title: '날짜 더하기 빼기 계산기 | Toolit',
    description: '날짜에 년, 월, 일을 더하거나 빼서 결과 날짜를 무료로 계산해드립니다.',
    url: 'https://toolit.com/cal/date-add/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '날짜 더하기 빼기 계산기 | Toolit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '날짜 더하기 빼기 계산기',
  url: 'https://toolit.com/cal/date-add/',
  description: '날짜에 기간을 더하거나 빼서 결과 날짜를 구하는 무료 날짜 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://toolit.com/' },
      { '@type': 'ListItem', position: 2, name: '날짜 더하기 빼기', item: 'https://toolit.com/cal/date-add/' },
    ],
  },
}

const faqs = [
  { q: '날짜 더하기/빼기 계산기란 무엇인가요?', a: '특정 날짜에 원하는 기간(년, 월, 일)을 더하거나 빼서 결과 날짜를 계산해주는 도구입니다. 90일 후 날짜, 계약일로부터 1년 후, 3개월 전 날짜 등을 간편하게 구할 수 있습니다.' },
  { q: '90일 후 날짜를 계산하려면 어떻게 하나요?', a: '기준 날짜를 입력하고 계산 방식을 더하기로 선택한 뒤, 일 입력란에 90을 입력하고 계산하기를 누르면 됩니다.' },
  { q: '년, 월, 일을 동시에 더할 수 있나요?', a: '네, 년·월·일 입력란에 각각 원하는 숫자를 입력하면 한 번에 모두 더하거나 뺄 수 있습니다. 예를 들어 1년 6개월 15일 후 날짜도 한 번에 계산 가능합니다.' },
  { q: '월말 날짜 계산 시 주의할 점이 있나요?', a: '1월 31일에서 1개월을 더하면 2월 28일(또는 29일)이 됩니다. 각 월의 마지막 날이 다르기 때문에 월 단위 계산 시 결과가 예상과 다를 수 있으니 확인하세요.' },
  { q: '임신 출산 예정일 계산에도 쓸 수 있나요?', a: '네, 마지막 생리 시작일에 280일(40주)을 더하면 출산 예정일을 계산할 수 있습니다. 단 정확한 예정일은 반드시 산부인과 전문의에게 확인하세요.' },
]

export default function Page() {
  return (
    <CalcLayout title="➕ 날짜 더하기/빼기" desc="날짜에 년·월·일을 더하거나 빼서 결과 날짜를 구해요" currentUrl="/cal/date-add" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DateAddCalc />
    </CalcLayout>
  )
}
