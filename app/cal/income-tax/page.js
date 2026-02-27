import CalcLayout from '@/components/calculator/CalcLayout'
import IncomeTaxCalc from '@/components/calculator/IncomeTaxCalc'

export const metadata = {
  title: '종합소득세 계산기 2026',
  description: '2026년 신고(2025년 귀속) 종합소득세를 계산해보세요. 근로소득·사업소득·프리랜서 소득을 입력하면 과세표준·산출세액·세액공제·결정세액까지 단계별로 계산해드려요.',
  keywords: ['종합소득세 계산기', '소득세 계산기', '프리랜서 세금 계산기', '사업소득세 계산기', '세금 계산기', '실효세율 계산기', '연금저축 세액공제', '종합소득세 신고'],
  alternates: { canonical: 'https://serenkit.com/cal/income-tax/' },
  openGraph: {
    title: '종합소득세 계산기 2026 | serenkit',
    description: '2026년 신고분(2025년 귀속) 종합소득세를 근로·사업·프리랜서 소득별로 단계별 계산해요.',
    url: 'https://serenkit.com/cal/income-tax/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '종합소득세 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '종합소득세 계산기',
  url: 'https://serenkit.com/cal/income-tax/',
  description: '2026년 신고분(2025년 귀속) 종합소득세를 근로·사업소득별로 단계별 계산하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '종합소득세 계산기', item: 'https://serenkit.com/cal/income-tax/' },
    ],
  },
}

const faqs = [
  {
    q: '종합소득세 신고 대상은 누구인가요?',
    a: '프리랜서·자영업자 등 사업소득이 있는 분, 근로소득 외에 부업·임대·금융소득이 있는 분이 대상입니다. 연간 금융소득(이자·배당) 합계가 2,000만원을 초과하거나 다른 종합소득이 있으면 신고해야 해요.',
  },
  {
    q: '직장인은 종합소득세 신고를 안 해도 되나요?',
    a: '근로소득만 있는 직장인은 회사에서 연말정산으로 납세가 완료되어 별도 신고가 불필요합니다. 단, 근로소득 외 소득(프리랜서 수입, 임대소득, 연간 300만원 초과 기타소득 등)이 있으면 종합소득세를 신고해야 해요.',
  },
  {
    q: '연금저축·IRP로 절세하면 얼마나 환급받나요?',
    a: '종합소득금액 4,500만원 이하라면 납입액의 16.5%, 초과라면 13.2%를 세액공제 받아요. 연금저축 최대 600만원 + IRP 추가 300만원 = 연 최대 900만원 납입 시, 최대 148.5만원(16.5%) 또는 118.8만원(13.2%)을 돌려받을 수 있어요.',
  },
  {
    q: '프리랜서는 필요경비를 어떻게 계산하나요?',
    a: '장부를 작성하지 않은 경우, 국세청이 정한 단순경비율 또는 기준경비율을 적용해요. 예를 들어 IT·전문직 프리랜서의 단순경비율은 약 64.1%, 기준경비율은 약 19.7%입니다. 홈택스에서 업종별 경비율을 확인하세요.',
  },
  {
    q: '종합소득세 신고 기간은 언제인가요?',
    a: '2025년 귀속 소득에 대한 신고 기간은 2026년 5월 1일~31일입니다(성실신고확인 대상은 6월 30일까지). 해외 출국 예정자나 특별한 사유가 있으면 신고 기한 연장 신청도 가능해요. 홈택스(hometax.go.kr) 또는 모바일 손택스 앱에서 신고할 수 있어요.',
  },
]

export default function Page() {
  return (
    <CalcLayout title="📊 종합소득세 계산기" desc="2025년 귀속 (2026년 5월 신고) 기준 종합소득세를 단계별로 계산해요" currentUrl="/cal/income-tax" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IncomeTaxCalc />
    </CalcLayout>
  )
}
