import CalcLayout from '@/components/calculator/CalcLayout'
import DateDiffCalc from '@/components/calculator/DateDiffCalc'

export const metadata = {
  title: '날짜 차이 계산기',
  description: '두 날짜 사이의 일수, 주, 월, 년을 무료로 계산해드립니다. 계약 기간, 근무 일수, 여행 기간 등을 정확하게 확인하세요.',
  keywords: ['날짜 차이 계산기', '두 날짜 사이 일수', '날짜 간격 계산', '기간 계산기', '일수 계산'],
  alternates: { canonical: 'https://serenkit.com/cal/date-diff/' },
  openGraph: {
    title: '날짜 차이 계산기 | serenKit',
    description: '두 날짜 사이의 일수, 주, 월, 년을 무료로 계산해드립니다.',
    url: 'https://serenkit.com/cal/date-diff/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '날짜 차이 계산기 | serenKit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '날짜 차이 계산기',
  url: 'https://serenkit.com/cal/date-diff/',
  description: '두 날짜 사이의 기간을 일·주·월·년 단위로 계산하는 무료 날짜 차이 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '날짜 차이 계산기', item: 'https://serenkit.com/cal/date-diff/' },
    ],
  },
}

const faqs = [
  { q: '날짜 차이 계산기란 무엇인가요?', a: '두 날짜 사이의 기간을 일수, 주, 월, 년 단위로 계산해주는 도구입니다. 계약 기간, 근무 일수, 여행 기간, 연애 기간 등을 정확하게 파악할 때 유용합니다.' },
  { q: '종료일 포함 옵션은 어떤 차이가 있나요?', a: '종료일 포함을 체크하면 시작일과 종료일 당일 모두를 포함해서 계산합니다. 예를 들어 1월 1일~1월 3일의 경우 미포함 시 2일, 포함 시 3일로 계산됩니다. 숙박 일수나 행사 기간 계산 시 포함 옵션을 사용하세요.' },
  { q: '시작일이 종료일보다 늦어도 계산이 되나요?', a: '네, 시작일이 종료일보다 나중이어도 자동으로 절댓값으로 계산하여 기간을 표시해 드립니다.' },
  { q: '년/월/일 단위 분리는 어떻게 계산되나요?', a: '총 일수를 기준으로 년·월·일을 자연스럽게 분리합니다. 예를 들어 400일이면 1년 1개월 4일 형태로 표시됩니다.' },
  { q: '계약 만료일까지 몇 일 남았는지 계산할 수 있나요?', a: '네, 시작일에 오늘 날짜를, 종료일에 계약 만료일을 입력하면 남은 기간을 정확하게 계산할 수 있습니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="📆 날짜 차이 계산기" desc="두 날짜 사이의 기간을 일·주·월·년 단위로 계산해요" currentUrl="/cal/date-diff" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DateDiffCalc />
    </CalcLayout>
  )
}
