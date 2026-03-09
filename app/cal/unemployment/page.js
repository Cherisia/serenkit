import CalcLayout from '@/components/calculator/CalcLayout'
import UnemploymentCalc from '@/components/calculator/UnemploymentCalc'

export const metadata = {
  title: '실업급여 계산기',
  description: '퇴직일, 나이, 고용보험 가입기간, 월급으로 실업급여(구직급여) 수령액을 바로 계산해요. 상한액·하한액·소정급여일수까지 한눈에 확인하세요.',
  keywords: ['실업급여 계산기', '구직급여 계산', '실업급여 얼마', '실업급여 조건', '소정급여일수', '고용보험 실업급여', '실업급여 상한액 하한액'],
  alternates: { canonical: 'https://serenkit.com/cal/unemployment/' },
  openGraph: {
    title: '실업급여 계산기 - serenkit',
    description: '퇴직일, 나이, 고용보험 가입기간, 월급으로 실업급여(구직급여) 수령액을 바로 계산해요.',
    url: 'https://serenkit.com/cal/unemployment/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '실업급여 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '실업급여 계산기',
  url: 'https://serenkit.com/cal/unemployment/',
  description: '고용보험 가입기간과 월 평균임금으로 실업급여(구직급여) 수령액을 계산하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '실업급여 계산기', item: 'https://serenkit.com/cal/unemployment/' },
    ],
  },
}

const faqs = [
  { q: '실업급여 수급 조건이 어떻게 되나요?', a: '이직일 이전 18개월 중 피보험단위기간이 합산 180일 이상이어야 하고, 비자발적 퇴직(권고사직·계약만료·정리해고 등)이어야 해요. 자발적 퇴직이라도 직장 내 괴롭힘, 임금 체불, 최저임금 위반, 출퇴근 거리 왕복 3시간 이상 등 정당한 사유가 있으면 인정될 수 있어요.' },
  { q: '1일 구직급여는 어떻게 계산하나요?', a: '1일 구직급여 = 1일 평균임금 × 60%입니다. 1일 평균임금은 퇴직 전 3개월 임금 총액을 그 기간 총 일수(약 90일)로 나눠 계산해요. 단, 상한액(66,000원)과 하한액(최저시급×근로시간×80%) 사이로 조정됩니다.' },
  { q: '소정급여일수는 어떻게 결정되나요?', a: '나이와 고용보험 가입기간에 따라 다릅니다. 만 50세 미만은 120~240일, 만 50세 이상 및 장애인은 120~270일 범위에서 결정돼요. 가입기간이 길수록 더 오래 받을 수 있어요. 최대 270일(9개월)까지 수급 가능합니다.' },
  { q: '권고사직과 자발적 퇴직의 차이는 무엇인가요?', a: '권고사직은 회사의 권고로 사직하는 것으로 비자발적 퇴직에 해당해 실업급여 수급이 가능합니다. 반면 순수 자발적 퇴직은 원칙적으로 수급 불가해요. 다만 퇴직 사유 확인이 필요하므로 이직확인서와 사직서 내용에 주의하고, 고용센터에서 수급 자격 여부를 꼭 확인하세요.' },
  { q: '실업급여 상한액과 하한액이 얼마인가요?', a: '상한액은 1일 66,000원(2019년 10월 이후 고정)이에요. 하한액은 최저시급 × 1일 소정근로시간 × 80%로, 2026년 최저시급 기준 8시간 근로 시 약 65,472원입니다. 계산된 구직급여가 상한액을 넘거나 하한액에 미달하면 해당 금액으로 조정돼요.' },
  { q: '실업급여를 받으면서 아르바이트를 해도 되나요?', a: '수급 기간 중 취업(아르바이트 포함)을 하면 반드시 고용센터에 신고해야 해요. 신고 없이 취업 소득이 발생하면 부정수급으로 처리되어 받은 급여를 반환하고 추가 제재를 받을 수 있어요. 신고하면 취업한 날수만큼 급여가 차감됩니다.' },
  { q: '실업급여 수급 중 해외여행을 가도 되나요?', a: '수급 기간 중에는 적극적인 구직 활동 의무가 있어요. 단기 여행은 가능하지만, 장기간 출국 시 구직 활동을 이행할 수 없어 급여가 중단될 수 있습니다. 출국 전 반드시 고용센터에 사전 신고하고 허가를 받아야 해요.' },
  { q: '재취업 후 다시 실직해도 실업급여를 받을 수 있나요?', a: '네, 재취업 후 고용보험 피보험단위기간이 다시 180일 이상 쌓이면 재수급이 가능합니다. 이전 수급 이력이 있어도 새로운 수급 자격이 생기면 다시 신청할 수 있어요. 단 자진퇴사는 수급 불가 원칙을 기억하세요.' },
]

export default function Page() {
  return (
    <CalcLayout title="📋 실업급여 계산기" desc="고용보험 가입기간과 월급으로 구직급여 수령액을 계산해요" currentUrl="/cal/unemployment/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnemploymentCalc />
    </CalcLayout>
  )
}
