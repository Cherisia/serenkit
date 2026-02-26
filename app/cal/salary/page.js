import CalcLayout from '@/components/calculator/CalcLayout'
import SalaryCalc from '@/components/calculator/SalaryCalc'

export const metadata = {
  title: '월급 실수령액 계산기',
  description: '2025년 기준 4대보험(국민연금·건강보험·장기요양·고용보험)과 소득세를 공제한 월급 실수령액을 무료로 계산하세요.',
  keywords: ['월급 실수령액 계산기', '세후 월급 계산', '4대보험 계산기', '소득세 계산', '월급 계산기', '연봉 실수령액'],
  alternates: { canonical: 'https://serenkit.com/cal/salary/' },
  openGraph: {
    title: '월급 실수령액 계산기 | serenkit',
    description: '2025년 기준 4대보험과 소득세를 공제한 월급 실수령액을 계산해드립니다.',
    url: 'https://serenkit.com/cal/salary/',
    type: 'website',
    images: [{ url: '/api/og?title=월급+실수령액+계산기&sub=4대보험+소득세+공제+후+실수령액', width: 1200, height: 630, alt: '월급 실수령액 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '월급 실수령액 계산기',
  url: 'https://serenkit.com/cal/salary/',
  description: '2025년 기준 4대보험과 소득세를 공제한 월급 실수령액을 계산하는 무료 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '월급 실수령액 계산기', item: 'https://serenkit.com/cal/salary/' },
    ],
  },
}

const faqs = [
  { q: '월급 실수령액이란 무엇인가요?', a: '세전 월급에서 4대보험(국민연금·건강보험·장기요양보험·고용보험)과 소득세·지방소득세를 공제하고 실제로 통장에 입금되는 금액입니다.' },
  { q: '4대보험 요율이 어떻게 되나요?', a: '2025년 기준으로 국민연금 4.5%, 건강보험 3.545%, 장기요양보험 건강보험료의 12.95%, 고용보험 0.9%입니다. 회사도 같은 비율을 부담합니다.' },
  { q: '부양가족 수가 왜 중요한가요?', a: '부양가족 수에 따라 인적공제가 달라져 소득세가 줄어듭니다. 본인만 있으면 1명, 배우자나 자녀가 있으면 해당 인원을 포함해 입력하세요.' },
  { q: '식대는 어떻게 반영하나요?', a: '월 20만 원 이하 식대는 비과세 항목이라 실제로는 이 계산기보다 세금이 적을 수 있어요. 정확한 계산은 회사 급여담당자에게 문의하세요.' },
  { q: '국민연금 상한액이 있나요?', a: '네, 2025년 기준 국민연금 기준소득월액 상한은 590만 원입니다. 월급이 590만 원을 초과해도 국민연금은 590만 원 기준으로만 계산됩니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="💰 월급 실수령액 계산기" desc="2025년 기준 4대보험·소득세 공제 후 실수령액을 계산해요" currentUrl="/cal/salary" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SalaryCalc />
    </CalcLayout>
  )
}
