import CalcLayout from '@/components/calculator/CalcLayout'
import BusinessDaysCalc from '@/components/calculator/BusinessDaysCalc'

export const metadata = {
  title: '영업일 계산기',
  description: '주말과 공휴일을 제외한 실제 영업일수를 바로 계산해요. 계약 납기일, 배송일, 행정 처리 기한을 정확하게 확인하세요.',
  keywords: ['영업일 계산기', '영업일 수 계산', '공휴일 제외 일수', '근무일 계산', '납기일 계산'],
  alternates: { canonical: 'https://serenkit.com/cal/business-days/' },
  openGraph: {
    title: '영업일 계산기 - serenkit',
    description: '주말과 공휴일을 제외한 실제 영업일수를 바로 계산해요.',
    url: 'https://serenkit.com/cal/business-days/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '영업일 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '영업일 계산기',
  url: 'https://serenkit.com/cal/business-days/',
  description: '주말·공휴일을 제외한 실제 영업일수를 계산하는 영업일 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '영업일 계산기', item: 'https://serenkit.com/cal/business-days/' },
    ],
  },
}

const faqs = [
  { q: '영업일 계산기란 무엇인가요?', a: '토요일, 일요일, 공휴일을 제외한 실제 근무 가능한 날수를 계산해주는 도구입니다. 계약서 납기일, 물품 배송일, 행정 처리 기한, 법적 신청 기간 등을 정확하게 파악할 때 사용합니다.' },
  { q: '영업일과 달력상 일수는 어떻게 다른가요?', a: '달력상 일수는 주말과 공휴일을 포함한 전체 날수이고, 영업일은 실제 업무가 이루어지는 날수입니다. 예를 들어 10 영업일은 주말·공휴일을 포함하면 약 2주(14일) 정도에 해당합니다.' },
  { q: '공휴일 데이터는 어느 기간까지 포함되어 있나요?', a: '현재 2025년~2026년 대한민국 법정 공휴일과 대체공휴일이 포함되어 있습니다. 임시 공휴일 등 추가로 지정되는 공휴일은 반영이 늦어질 수 있으니 중요한 일정은 반드시 확인하세요.' },
  { q: '대체공휴일도 자동으로 포함되나요?', a: '네, 공휴일이 주말과 겹칠 때 지정되는 대체공휴일도 공휴일 데이터에 포함되어 있습니다. 단, 정부가 추후 별도로 지정하는 임시 공휴일은 반영이 늦어질 수 있어요.' },
  { q: '법원 기한 "14일 이내" 계산에도 영업일인가요?', a: '법원·행정청의 기간 계산은 대부분 달력상 일수(영업일이 아닌 역일) 기준입니다. 단, 기간의 마지막 날이 공휴일이면 다음 날까지 연장돼요. 중요한 법적 기한은 반드시 관련 법령을 확인하거나 전문가에게 문의하세요.' },
  { q: '공휴일을 제외하지 않고 계산할 수도 있나요?', a: '네, 한국 공휴일 제외 체크박스를 해제하면 주말만 제외하고 공휴일은 포함해서 계산합니다.' },
  { q: '배송 예정일 계산에 활용할 수 있나요?', a: '네, 주문일을 시작일로 설정하고 영업일 수를 확인하면 실제 배송 가능일을 예측하는 데 도움이 됩니다. 택배사는 보통 영업일 기준으로 배송 기간을 안내하지만, 성수기·물량 폭주 시 더 걸릴 수 있으니 참고용으로 활용하세요.' },
  { q: '토요일도 영업일로 포함할 수 있나요?', a: '이 계산기는 주 5일(월~금) 근무제 기준으로 계산합니다. 토요일에 근무하는 회사라면 계산된 영업일에서 해당 주의 토요일 수를 직접 더해서 조정하시면 돼요.' },
]

export default function Page() {
  return (
    <CalcLayout title="💼 영업일 계산기" desc="주말·공휴일을 제외한 실제 근무 가능 일수를 계산해요" currentUrl="/cal/business-days/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BusinessDaysCalc />
    </CalcLayout>
  )
}
