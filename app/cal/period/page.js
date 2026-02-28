import CalcLayout from '@/components/calculator/CalcLayout'
import PeriodCalc from '@/components/calculator/PeriodCalc'

export const metadata = {
  title: '생리주기 계산기 | 다음 생리 예정일·배란일·가임기 계산',
  description: '마지막 생리 시작일을 입력하면 다음 생리 예정일, 배란일, 가임기, PMS 예상일, 향후 4개월 주기를 자동으로 계산해요.',
  keywords: ['생리주기 계산기', '다음 생리 예정일', '배란일 계산기', '가임기 계산', '생리 예측', '생리 계산기', 'PMS 예상일', '생리주기 예측'],
  alternates: { canonical: 'https://serenkit.com/cal/period/' },
  openGraph: {
    title: '생리주기 계산기 | serenkit',
    description: '다음 생리 예정일, 배란일, 가임기, PMS 예상일을 한 번에 계산해보세요.',
    url: 'https://serenkit.com/cal/period/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '생리주기 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '생리주기 계산기',
  url: 'https://serenkit.com/cal/period/',
  description: '마지막 생리 시작일 기준으로 다음 생리 예정일, 배란일, 가임기, PMS를 계산하는 계산기',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '생리주기 계산기', item: 'https://serenkit.com/cal/period/' },
    ],
  },
}

const faqs = [
  { q: '생리주기는 어떻게 계산하나요?', a: '생리주기는 생리 시작일부터 다음 생리 시작일 전날까지의 일수입니다. 예를 들어 1월 1일에 생리가 시작되고 1월 29일에 다음 생리가 시작되었다면 주기는 28일이에요. 한국 여성 평균은 약 28~30일입니다.' },
  { q: '배란일은 어떻게 계산하나요?', a: '배란일은 다음 생리 예정일로부터 약 14일 전입니다. 28일 주기라면 생리 시작일로부터 14일 후가 배란 예정일이에요. 단, 실제 배란일은 스트레스, 수면, 체중 변화 등으로 달라질 수 있으니 참고용으로 활용하세요.' },
  { q: '가임기가 무엇인가요?', a: '가임기(fertile window)는 임신이 가능한 기간으로, 배란일 5일 전부터 배란일 후 1일까지 약 6일간입니다. 정자는 체내에서 최대 5일간 생존할 수 있기 때문이에요.' },
  { q: 'PMS란 무엇인가요?', a: 'PMS(월경전증후군, Premenstrual Syndrome)는 생리 전 7~14일 동안 나타나는 신체적·정서적 증상입니다. 복부 팽만, 두통, 예민함, 피로감 등이 흔하며 생리가 시작되면 대부분 완화됩니다. 증상이 일상생활에 지장을 줄 정도라면 산부인과 상담을 권장해요.' },
  { q: '생리주기가 불규칙해요. 계산기가 맞지 않을 수 있나요?', a: '네, 이 계산기는 주기가 일정하다는 가정 하에 계산합니다. 주기가 불규칙하다면 실제 날짜와 다를 수 있어요. 21일 미만이거나 35일 초과가 지속되면 산부인과 상담을 권장합니다.' },
  { q: '주기를 며칠로 입력해야 하나요?', a: '최근 3~6개월 생리를 기록해 평균을 내는 것이 가장 정확합니다. 기록이 없다면 한국 여성 평균인 28일을 기준으로 입력해보세요.' },
  { q: '임신을 확인하려면 언제 검사하는 게 좋나요?', a: '생리 예정일 당일 또는 1~2일 이후부터 임신테스트기로 확인이 가능합니다. hCG 호르몬 농도가 높아지는 데 시간이 걸려 너무 이르면 음성으로 나올 수 있어요. 더 정확한 확인은 산부인과 혈액검사(임신 4주 이후)를 권장합니다.' },
  { q: 'PMS 증상을 완화하는 방법이 있나요?', a: '규칙적인 유산소 운동, 카페인·알코올·짠 음식 줄이기, 마그네슘·칼슘·비타민B6 섭취가 도움이 됩니다. 충분한 수면과 스트레스 관리도 중요해요. 증상이 심하다면 전문의 상담을 통해 호르몬 치료나 약물 치료를 고려할 수 있어요.' },
]

export default function Page() {
  return (
    <CalcLayout title="🌸 생리주기 계산기" desc="다음 생리 예정일·배란일·가임기를 한 번에 계산해요" currentUrl="/cal/period" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PeriodCalc />
    </CalcLayout>
  )
}
