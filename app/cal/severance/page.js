import CalcLayout from '@/components/calculator/CalcLayout'
import SeveranceCalc from '@/components/calculator/SeveranceCalc'

export const metadata = {
  title: '퇴직금 계산기',
  description: '입사일, 퇴직일, 월 급여를 입력하면 법정 퇴직금을 바로 계산해요. 상여금·연차수당 포함 정확한 퇴직금을 확인하세요.',
  keywords: ['퇴직금 계산기', '퇴직금 계산', '평균임금 계산', '퇴직금 얼마', '1일 평균임금', '근로기준법 퇴직금', '퇴직금 산정'],
  alternates: { canonical: 'https://serenkit.com/cal/severance/' },
  openGraph: {
    title: '퇴직금 계산기 | serenkit',
    description: '입사일, 퇴직일, 월 급여를 입력하면 법정 퇴직금을 바로 계산해요.',
    url: 'https://serenkit.com/cal/severance/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '퇴직금 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '퇴직금 계산기',
  url: 'https://serenkit.com/cal/severance/',
  description: '입사일과 퇴직일, 월 급여로 법정 퇴직금을 계산하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '퇴직금 계산기', item: 'https://serenkit.com/cal/severance/' },
    ],
  },
}

const faqs = [
  { q: '퇴직금은 언제 받을 수 있나요?', a: '계속 근로기간이 1년 이상이고, 1주 소정근로시간이 15시간 이상인 근로자는 퇴직 시 법정 퇴직금을 받을 수 있어요. 퇴직금은 퇴직일로부터 14일 이내에 지급해야 합니다. 지연 시 연 20%의 지연이자가 붙을 수 있어요.' },
  { q: '1일 평균임금은 어떻게 계산하나요?', a: '1일 평균임금 = 퇴직 전 3개월간 지급받은 임금 총액 ÷ 퇴직 전 3개월간 총 일수(달력 기준)입니다. 3개월 임금에는 월급여 외에 상여금과 연차수당도 3개월분(연액의 1/4)을 포함해요.' },
  { q: '퇴직금 계산 공식이 어떻게 되나요?', a: '퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)입니다. 예를 들어 1일 평균임금이 10만 원이고 3년 근무했다면 10만 원 × 30 × 3 = 900만 원이 돼요. 재직일수가 365일로 나누어 떨어지지 않아도 비례 계산됩니다.' },
  { q: 'DC형과 DB형 퇴직연금은 어떻게 다른가요?', a: 'DB형(확정급여형)은 회사가 운용하며 퇴직 시 평균임금 기준으로 지급, DC형(확정기여형)은 매년 임금의 1/12 이상을 근로자 계좌에 적립합니다. DC형은 본인이 직접 운용해 수익을 높일 수 있지만 손실 위험도 있어요. 이 계산기는 법정 퇴직금(DB형) 산정 방식을 따릅니다.' },
  { q: '퇴직금에도 세금이 부과되나요?', a: '네, 퇴직금에는 퇴직소득세가 부과됩니다. 다만 근속연수공제가 적용되어 일반 소득세보다 세 부담이 낮아요. 퇴직금을 IRP(개인형 퇴직연금) 계좌로 이전하면 퇴직소득세를 납부 시점까지 이연할 수 있고, 연금으로 수령 시 퇴직소득세의 30~40%를 감면받을 수 있습니다.' },
  { q: '수습기간도 근속기간에 포함되나요?', a: '네, 수습기간도 계속 근로기간에 포함됩니다. 계약직·파견직도 실질적인 근로가 지속됐다면 계속 근로기간으로 인정될 수 있어요. 다만 업무 공백이 있거나 계약 형태가 달라지는 경우 고용노동부 상담을 권장합니다.' },
  { q: '1년 미만 근무하면 퇴직금이 없나요?', a: '네, 근로기준법상 계속 근로기간이 1년 미만이면 법정 퇴직금이 발생하지 않아요. 단, 회사 내규에 따라 별도 지급하는 경우도 있으니 취업규칙을 확인해보세요.' },
  { q: '퇴직금 미지급 시 어떻게 대응할 수 있나요?', a: '회사가 퇴직금을 지급하지 않으면 고용노동부 민원마당(moel.go.kr)에 진정을 제기하거나, 가까운 고용노동청에 신고할 수 있어요. 체불 퇴직금은 3년의 소멸시효가 있으니 퇴직 후 가능한 빨리 조치하는 것이 중요합니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="💼 퇴직금 계산기" desc="입사일부터 퇴직일까지 법정 퇴직금을 계산해요" currentUrl="/cal/severance" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeveranceCalc />
    </CalcLayout>
  )
}
