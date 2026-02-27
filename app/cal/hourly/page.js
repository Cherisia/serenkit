import CalcLayout from '@/components/calculator/CalcLayout'
import HourlyCalc from '@/components/calculator/HourlyCalc'

export const metadata = {
  title: '시급 계산기',
  description: '2026년 최저시급 10,320원 기준으로 시급·일급·주급·월급·연봉을 한 번에 계산해요. 주휴수당 자동 포함.',
  keywords: ['시급 계산기', '최저시급 계산기', '2026 최저시급', '주휴수당 계산', '월급 계산기', '시급 월급 환산', '알바 시급 계산'],
  alternates: { canonical: 'https://serenkit.com/cal/hourly/' },
  openGraph: {
    title: '시급 계산기 | serenkit',
    description: '2026년 최저시급 10,320원 기준으로 시급·일급·주급·월급·연봉을 한 번에 계산해요.',
    url: 'https://serenkit.com/cal/hourly/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '시급 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '시급 계산기',
  url: 'https://serenkit.com/cal/hourly/',
  description: '2026년 최저시급 기준으로 시급·일급·주급·월급·연봉과 주휴수당을 계산하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '시급 계산기', item: 'https://serenkit.com/cal/hourly/' },
    ],
  },
}

const faqs = [
  { q: '2026년 최저시급은 얼마인가요?', a: '2026년 최저시급은 10,320원입니다. 2025년(10,030원) 대비 290원(약 2.9%) 인상됐어요. 주 40시간(5일) 기준으로 환산하면 월 약 2,156,880원(209시간)이에요.' },
  { q: '주휴수당이란 무엇인가요?', a: '주휴수당은 주 15시간 이상 근무한 근로자에게 주 1회 유급 휴일을 보장하는 수당이에요. 계산 공식은 "1주 소정근로시간 ÷ 40 × 8 × 시급"으로, 주 40시간 근무 시 8시간분 시급이 추가로 지급돼요.' },
  { q: '시급을 월급으로 환산하는 방법은?', a: '월급 = 시급 × 월 환산 시간으로 계산해요. 월 환산 시간은 (주 근로시간 + 주휴시간) × 4.345(월 평균 주수)로 구해요. 주 40시간 근무 기준으로는 (40 + 8) × 4.345 ≈ 209시간이에요.' },
  { q: '알바(아르바이트)도 최저시급을 적용받나요?', a: '네, 아르바이트·단시간 근로자·청소년 모두 최저임금법의 적용을 받아요. 사용자가 최저시급 미만을 지급하면 최저임금법 위반으로 3년 이하 징역 또는 2천만원 이하 벌금에 처해질 수 있어요.' },
  { q: '계산된 월급과 실수령액이 다른 이유는?', a: '이 계산기는 세전 금액을 기준으로 해요. 실제 통장에 들어오는 실수령액은 국민연금·건강보험·고용보험·장기요양보험(4대보험)과 소득세·지방소득세가 공제된 후 금액이에요. 월급 실수령액 계산기를 함께 활용해보세요.' },
]

export default function Page() {
  return (
    <CalcLayout title="💰 시급 계산기" desc="2026년 최저시급 기준으로 일급·주급·월급·연봉을 한 번에 계산해요" currentUrl="/cal/hourly" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HourlyCalc />
    </CalcLayout>
  )
}
