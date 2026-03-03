import CalcLayout from '@/components/calculator/CalcLayout'
import LoanCalc from '@/components/calculator/LoanCalc'

export const metadata = {
  title: '대출 이자 계산기 - 원리금균등·원금균등·만기일시 상환',
  description: '원리금균등·원금균등·만기일시 상환 방식별 월 납입금과 총 이자를 계산해보세요. 주택담보대출·신용대출·전세자금대출 모두 적용 가능하며, 월별 상환 일정표도 한눈에 확인할 수 있어요.',
  keywords: ['대출 이자 계산기', '원리금균등', '원금균등', '만기일시상환', '대출 계산기', '이자 계산', '주택담보대출 계산기', '월 납입금 계산', '전세자금대출 계산기', '신용대출 이자', '대출 상환 계산기'],
  alternates: { canonical: 'https://serenkit.com/cal/loan/' },
  openGraph: {
    title: '대출 이자 계산기 - serenkit',
    description: '원리금균등·원금균등·만기일시 상환 방식별 월 납입금과 총 이자를 계산해요.',
    url: 'https://serenkit.com/cal/loan/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '대출 이자 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '대출 이자 계산기',
  url: 'https://serenkit.com/cal/loan/',
  description: '원리금균등·원금균등·만기일시 상환 방식별 월 납입금과 총 이자를 계산하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '대출 이자 계산기', item: 'https://serenkit.com/cal/loan/' },
    ],
  },
}

const faqs = [
  {
    q: '원리금균등상환과 원금균등상환의 차이는 무엇인가요?',
    a: '원리금균등상환은 매달 동일한 금액(원금+이자)을 납입해 예측이 쉽고 초기 부담이 낮습니다. 원금균등상환은 매달 동일한 원금을 납입하고 이자는 잔액에 비례해 줄어들어 총 이자 부담이 적지만, 초반 납입금이 더 많습니다. 예를 들어 2억 원, 금리 4%, 20년 대출 시 원금균등이 원리금균등보다 총 이자를 약 600만 원 더 절약할 수 있어요.',
  },
  {
    q: '대출 금리 1% 차이가 얼마나 큰 영향을 미치나요?',
    a: '3억 원, 30년 대출 기준으로 금리가 3.5%에서 4.5%로 1% 오르면 월 납입금이 약 16만 원 증가하고, 총 이자 부담은 약 5,800만 원 늘어납니다. 금리 차이가 작아 보여도 장기 대출에서는 수천만 원의 차이가 발생할 수 있어요.',
  },
  {
    q: '만기일시상환은 어떤 경우에 적합한가요?',
    a: '만기일시상환은 매달 이자만 납입하고 만기에 원금 전액을 갚는 방식입니다. 단기 자금 조달이나 투자 수익이 대출 이자보다 높을 때 유리할 수 있어요. 다만 만기에 큰 금액이 필요하므로 충분한 상환 계획이 필요합니다.',
  },
  {
    q: 'DSR(총부채원리금상환비율)이란 무엇인가요?',
    a: 'DSR은 연간 원리금 상환액 합계를 연 소득으로 나눈 비율로, 대출 심사의 핵심 지표입니다. 은행권 대출의 경우 DSR 40% 이하가 원칙이에요. 즉 연 소득 5,000만 원이라면 모든 대출의 연간 원리금 합계가 2,000만 원 이하여야 합니다.',
  },
  {
    q: '변동금리와 고정금리 중 어느 것이 유리한가요?',
    a: '금리 상승기에는 고정금리가, 하락기에는 변동금리가 유리합니다. 고정금리는 초기 금리가 높지만 향후 금리 변동 위험이 없어 장기 주택담보대출에 적합해요. 변동금리는 초기 이율이 낮지만 기준금리 변동에 따라 납입금이 달라질 수 있으니 금리 동향을 주기적으로 확인하세요.',
  },
  {
    q: '중도상환수수료란 무엇인가요?',
    a: '대출 만기 전에 원금 일부 또는 전부를 상환할 때 금융기관이 부과하는 수수료입니다. 보통 잔여 대출금의 0.5~1.5% 수준이며, 대출 실행 후 3년이 지나면 면제되는 경우가 많아요. 중도상환 시 수수료와 이자 절감 효과를 비교해보세요.',
  },
  {
    q: '실제 적용 금리는 어디서 확인할 수 있나요?',
    a: '금융감독원의 금융상품통합비교공시 사이트(finlife.fss.or.kr)에서 은행별 대출 금리를 비교할 수 있습니다. 실제 적용 금리는 개인 신용점수, 담보 종류, 대출 기간 등에 따라 달라지므로 금융기관에 직접 문의하는 것이 정확합니다.',
  },
  {
    q: '대출 원리금이 부담될 때 어떤 방법이 있나요?',
    a: '대출 기간 연장(거치기간 추가)이나 금리 재협상, 저금리 상품으로 대환대출을 고려해볼 수 있어요. 주거래 은행에서 금리 인하 요구권을 신청하면 신용도 개선 시 금리 인하를 요청할 수도 있습니다.',
  },
]

export default function Page() {
  return (
    <CalcLayout title="🏦 대출 이자 계산기" desc="원리금균등·원금균등·만기일시 상환 방식별 이자를 계산해요" currentUrl="/cal/loan" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LoanCalc />
    </CalcLayout>
  )
}
