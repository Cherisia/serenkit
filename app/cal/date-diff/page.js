import CalcLayout from '@/components/calculator/CalcLayout'
import DateDiffCalc from '@/components/calculator/DateDiffCalc'

export const metadata = {
  title: '날짜 차이 계산기',
  description: '두 날짜 사이의 일수, 주, 월, 년을 바로 계산해요. 계약 기간, 근무 일수, 여행 기간 등을 정확하게 확인하세요.',
  keywords: ['날짜 차이 계산기', '두 날짜 사이 일수', '날짜 간격 계산', '기간 계산기', '일수 계산'],
  alternates: { canonical: 'https://serenkit.com/cal/date-diff/' },
  openGraph: {
    title: '날짜 차이 계산기 | serenkit',
    description: '두 날짜 사이의 일수, 주, 월, 년을 바로 계산해요.',
    url: 'https://serenkit.com/cal/date-diff/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '날짜 차이 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '날짜 차이 계산기',
  url: 'https://serenkit.com/cal/date-diff/',
  description: '두 날짜 사이의 기간을 일·주·월·년 단위로 계산하는 날짜 차이 계산기',
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
  { q: '날짜 차이 계산기란 무엇인가요?', a: '두 날짜 사이의 기간을 일수, 주, 월, 년 단위로 계산해주는 도구입니다. 계약 기간, 근속 일수, 여행 기간, 연애 기간 등을 정확하게 파악할 때 유용합니다.' },
  { q: '종료일 포함 옵션은 어떤 차이가 있나요?', a: '종료일 포함을 체크하면 시작일과 종료일 당일 모두를 포함해서 계산합니다. 예를 들어 1월 1일~1월 3일의 경우 미포함 시 2일, 포함 시 3일로 계산됩니다. 숙박 일수나 행사 기간 계산 시 포함 옵션을 사용하세요.' },
  { q: '시작일이 종료일보다 늦어도 계산이 되나요?', a: '네, 시작일이 종료일보다 나중이어도 자동으로 절댓값으로 계산하여 기간을 표시해요.' },
  { q: '년/월/일 단위 분리는 어떻게 계산되나요?', a: '총 일수를 기준으로 년·월·일을 자연스럽게 분리합니다. 예를 들어 400일이면 1년 1개월 4일 형태로 표시됩니다.' },
  { q: '근속 기간 계산에 활용할 수 있나요?', a: '네, 시작일에 입사일을, 종료일에 오늘 날짜(또는 퇴직일)를 입력하면 정확한 근속 기간이 계산됩니다. 퇴직금·퇴직연금 산정 기준인 재직일수를 확인할 때 활용하세요.' },
  { q: '계약 만료일까지 몇 일 남았는지 계산할 수 있나요?', a: '네, 시작일에 오늘 날짜를, 종료일에 계약 만료일을 입력하면 남은 기간을 정확하게 계산할 수 있습니다.' },
  { q: '임신 주수 계산에도 사용할 수 있나요?', a: '마지막 생리 시작일을 시작일로, 오늘 날짜를 종료일로 입력한 뒤 표시된 일수를 7로 나누면 임신 주수를 구할 수 있어요. 정확한 임신 주수와 출산 예정일은 산부인과 초음파 검사로 확인하세요.' },
  { q: '두 날짜의 시간 단위 차이도 알 수 있나요?', a: '이 계산기는 일수(day) 단위로 계산합니다. 총 일수 × 24를 하면 시간, × 1,440을 하면 분 단위로 환산할 수 있어요.' },
]

export default function Page() {
  return (
    <CalcLayout title="📆 날짜 차이 계산기" desc="두 날짜 사이의 기간을 일·주·월·년 단위로 계산해요" currentUrl="/cal/date-diff" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DateDiffCalc />
    </CalcLayout>
  )
}
