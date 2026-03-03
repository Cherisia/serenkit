import CalcLayout from '@/components/calculator/CalcLayout'
import SalaryCalc from '@/components/calculator/SalaryCalc'

export const metadata = {
  title: '월급 실수령액 계산기 2026',
  description: '2026년 기준 4대보험(국민연금·건강보험·장기요양·고용보험)과 소득세·지방소득세를 공제한 월급 실수령액을 계산해보세요. 연봉을 입력하면 세전·세후 월급과 공제 내역을 한눈에 확인할 수 있어요.',
  keywords: ['월급 실수령액 계산기', '세후 월급 계산', '4대보험 계산기', '소득세 계산', '월급 계산기', '연봉 실수령액', '2026 월급 계산기', '연봉 실수령액 계산기', '공제 후 월급'],
  alternates: { canonical: 'https://serenkit.com/cal/salary/' },
  openGraph: {
    title: '월급 실수령액 계산기 - serenkit',
    description: '2025년 기준 4대보험과 소득세를 공제한 월급 실수령액을 계산해요.',
    url: 'https://serenkit.com/cal/salary/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '월급 실수령액 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '월급 실수령액 계산기',
  url: 'https://serenkit.com/cal/salary/',
  description: '2025년 기준 4대보험과 소득세를 공제한 월급 실수령액을 계산하는 계산기',
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
  { q: '월급 실수령액이란 무엇인가요?', a: '세전 월급에서 4대보험(국민연금·건강보험·장기요양보험·고용보험)과 소득세·지방소득세를 공제하고 실제로 통장에 입금되는 금액입니다. 같은 연봉이라도 부양가족 수, 비과세 수당 여부에 따라 실수령액이 달라질 수 있어요.' },
  { q: '4대보험 요율이 어떻게 되나요?', a: '2026년 기준으로 국민연금 4.5%, 건강보험 3.545%, 장기요양보험 건강보험료의 12.95%, 고용보험 0.9%입니다. 회사도 같은 비율을 부담하므로 실제 회사가 부담하는 총비용은 세전 월급보다 훨씬 큽니다.' },
  { q: '부양가족 수가 왜 중요한가요?', a: '부양가족 수에 따라 인적공제가 달라져 소득세가 줄어듭니다. 본인만 있으면 1명, 배우자나 자녀가 있으면 해당 인원을 포함해 입력하세요. 부양가족이 많을수록 원천징수 소득세가 낮아져 월 실수령액이 늘어납니다.' },
  { q: '연봉에서 월급을 어떻게 계산하나요?', a: '연봉을 12로 나누면 세전 월급이 됩니다. 예를 들어 연봉 4,000만 원이라면 세전 월급은 약 333만 원이에요. 상여금이 연봉에 포함된 경우 실제 매월 지급액은 다를 수 있으니 근로계약서를 확인하세요.' },
  { q: '비과세 수당에는 어떤 것들이 있나요?', a: '월 20만 원 이하 식대, 월 20만 원 이하 자가운전보조금, 출산·보육수당(6세 이하 자녀, 월 20만 원 이하) 등이 대표적인 비과세 항목이에요. 비과세 수당은 4대보험료와 소득세 산정 기준에서 제외되어 실수령액이 높아집니다.' },
  { q: '소득세는 어떻게 계산되나요?', a: '근로소득에서 근로소득공제를 뺀 후 인적공제·각종 특별공제를 적용해 과세표준을 구합니다. 이후 6%~45%의 누진세율을 적용하고, 근로소득세액공제를 차감해 최종 소득세가 결정됩니다. 지방소득세는 소득세의 10%가 추가로 부과됩니다.' },
  { q: '국민연금 상한액이 있나요?', a: '네, 국민연금 기준소득월액에는 상한과 하한이 있습니다. 월급이 상한액을 초과해도 국민연금은 상한액 기준으로만 계산됩니다. 상한액은 매년 7월 조정되므로 정확한 금액은 국민연금공단에서 확인하세요.' },
  { q: '계산 결과와 실제 급여명세서가 다른 이유는 무엇인가요?', a: '이 계산기는 표준 공제 기준으로 산출한 참고용 금액이에요. 실제 급여명세서는 회사별 공제 항목(조합비, 사내 대출 상환, 식비 공제 등)이나 근로소득 간이세액 조견표 적용 방식에 따라 차이가 날 수 있습니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="💰 월급 실수령액 계산기" desc="2025년 기준 4대보험·소득세 공제 후 실수령액을 계산해요" currentUrl="/cal/salary" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SalaryCalc />
    </CalcLayout>
  )
}
