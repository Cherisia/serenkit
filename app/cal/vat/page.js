import CalcLayout from '@/components/calculator/CalcLayout'
import VatCalc from '@/components/calculator/VatCalc'

export const metadata = {
  title: '부가세 계산기',
  description: '공급가액으로 부가세(VAT 10%)와 합계금액을 계산하거나, 부가세 포함 합계금액에서 공급가액을 역산해보세요.',
  keywords: ['부가세 계산기', 'VAT 계산기', '부가가치세 계산기', '공급가액 계산', '세금계산서', '부가세 역산', '부가세 포함 가격'],
  alternates: { canonical: 'https://serenkit.com/cal/vat/' },
  openGraph: {
    title: '부가세 계산기 - serenkit',
    description: '공급가액 → 부가세·합계금액 계산, 합계금액 → 공급가액 역산을 즉시 계산해요.',
    url: 'https://serenkit.com/cal/vat/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '부가세 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '부가세 계산기',
  url: 'https://serenkit.com/cal/vat/',
  description: '공급가액으로 부가세와 합계금액을 계산하거나 합계금액에서 공급가액을 역산하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '부가세 계산기', item: 'https://serenkit.com/cal/vat/' },
    ],
  },
}

const faqs = [
  {
    q: '부가세(VAT)란 무엇인가요?',
    a: '부가가치세(Value Added Tax)는 상품·서비스의 거래 과정에서 창출된 부가가치에 부과하는 세금입니다. 한국은 일반과세자 기준 10%이며, 최종 소비자가 부담하고 사업자가 국가에 납부합니다. 사업자는 매출세액(받은 부가세)에서 매입세액(지불한 부가세)을 공제한 차액을 납부해요.',
  },
  {
    q: '공급가액과 합계금액의 차이는 무엇인가요?',
    a: '공급가액은 부가세를 제외한 순수 상품·서비스 금액이고, 합계금액(공급대가)은 공급가액에 부가세 10%를 더한 금액입니다. 예를 들어 공급가액 100만 원이면 부가세 10만 원이 붙어 합계금액은 110만 원이 됩니다. 세금계산서에는 두 금액이 구분 표기됩니다.',
  },
  {
    q: '간이과세자는 부가세율이 다른가요?',
    a: '네, 연 매출 1억 400만 원 미만 간이과세자는 업종에 따라 1.5%~4%의 낮은 부가가치율이 적용됩니다. 연 매출 4,800만 원 미만은 납부 의무도 면제돼요. 이 계산기는 일반과세자 기준 10%로 계산하므로 간이과세자는 세무사 또는 국세청(126)에 문의하세요.',
  },
  {
    q: '프리랜서·유튜버도 부가세를 신고해야 하나요?',
    a: '인적 용역(강의, 창작, 컨설팅 등)을 제공하는 프리랜서는 면세 사업자로 부가세 신고 의무가 없는 경우가 많아요. 유튜버·인플루언서의 광고 수익은 원칙적으로 과세 대상입니다. 사업 형태에 따라 다르므로 국세청에 본인의 사업자 유형을 확인하세요.',
  },
  {
    q: '면세 품목에는 부가세가 없나요?',
    a: '맞습니다. 기초 생필품(쌀·채소 등), 의료·교육·금융 서비스 일부는 부가세가 면제됩니다. 영세율(0%)은 수출 상품 등에 적용되며, 면세와 달리 매입세액 공제가 가능합니다.',
  },
  {
    q: '세금계산서와 영수증의 차이는 무엇인가요?',
    a: '세금계산서는 사업자 간 거래에서 발행하며 매입세액 공제를 받을 수 있어요. 영수증은 최종 소비자에게 발급하며 매입세액 공제가 불가합니다. 사업자라면 거래 시 반드시 세금계산서를 요청해 부가세를 환급받으세요.',
  },
  {
    q: '부가세 신고는 언제 하나요?',
    a: '일반과세자는 1년에 2번(1월·7월), 간이과세자는 1년에 1번(1월) 신고합니다. 법인사업자는 분기별 4회 신고가 원칙입니다. 홈택스(hometax.go.kr)에서 전자 신고가 가능해요. 신고 기한 내 납부하지 않으면 가산세가 부과됩니다.',
  },
  {
    q: '해외에서 구매한 물건도 부가세를 내야 하나요?',
    a: '해외 직구 시 미화 150달러(미국 발송 200달러) 초과 물품은 관세와 함께 부가세가 부과됩니다. 부가세는 과세가격(상품가 + 운임 + 관세)의 10%예요. 소액 면세를 활용하면 세금 없이 구매할 수 있어요.',
  },
]

export default function Page() {
  return (
    <CalcLayout title="🧾 부가세 계산기" desc="공급가액 ↔ 합계금액, 부가세(VAT 10%) 즉시 계산" currentUrl="/cal/vat/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VatCalc />
    </CalcLayout>
  )
}
