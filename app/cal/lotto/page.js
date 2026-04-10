import CalcLayout from '@/components/calculator/CalcLayout'
import LottoCalc from '@/components/calculator/LottoCalc'

export const metadata = {
  title: '로또 자동번호 생성기 — 제외 번호 설정, 5게임 동시 추첨',
  description: '로또 6/45 번호를 클릭 한 번에 즉시 추첨해요. 원하지 않는 번호는 직접 제외하고, 최대 5게임을 한 번에 뽑을 수 있어요. 다음 추첨일 D-Day와 구매 마감 시간도 확인 가능.',
  keywords: [
    '로또 자동번호', '로또자동번호', '로또 자동 번호', '로또 자동번호 생성', '로또자동번호생성',
    '로또 번호 생성기', '로또 추첨기', '로또번호추첨', '로또번호 추첨', '로또 자동 번호 생성',
    '로또 6/45', '행운의 번호', '로또 번호 추천', '로또계산기', '로또 확률 계산기',
    '로또 당첨 확률', '로또 추첨일', '로또 구매 마감',
  ],
  alternates: { canonical: 'https://serenkit.com/cal/lotto/' },
  openGraph: {
    title: '로또 자동번호 생성기 | serenkit',
    description: '로또 6/45 번호를 클릭 한 번에 즉시 추첨. 제외 번호 설정·5게임 동시 추첨·다음 추첨일 D-Day 확인.',
    url: 'https://serenkit.com/cal/lotto/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '로또 자동번호 생성기',
  url: 'https://serenkit.com/cal/lotto/',
  description: '로또 6/45 번호를 무작위 자동 생성. 제외 번호 설정, 최대 5게임 동시 추첨, 다음 추첨일 D-Day 확인 지원.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '로또 자동번호 생성기', item: 'https://serenkit.com/cal/lotto/' },
    ],
  },
}

const faqs = [
  {
    q: '번호는 완전히 무작위로 생성되나요?',
    a: '네, 추첨할 때마다 1~45 사이 번호를 독립적으로 무작위 추출합니다. 과거 당첨 번호나 통계와는 무관하며, 매번 새로운 조합이 생성돼요.',
  },
  {
    q: '제외 번호를 설정하면 어떻게 되나요?',
    a: '선택한 번호를 추첨 풀에서 제외하고 나머지 번호 중에서만 6개를 뽑습니다. 최소 6개의 번호는 남아야 추첨이 가능해요.',
  },
  {
    q: '로또 1등 당첨 확률은 얼마나 되나요?',
    a: '45개 중 6개를 순서 없이 맞출 확률은 약 1/8,145,060(약 814만 분의 1)입니다. 어떤 번호 조합을 선택해도 확률은 동일해요.',
  },
  {
    q: '이번 주 로또 추첨일은 언제인가요?',
    a: '로또 6/45는 매주 토요일 오후 8시 45분에 추첨됩니다. 구매 마감은 추첨 당일 오후 8시예요. 이 페이지 상단에서 다음 추첨일까지 남은 D-Day를 실시간으로 확인할 수 있어요.',
  },
  {
    q: '로또 당첨 번호는 어디서 확인하나요?',
    a: '추첨이 끝난 뒤 동행복권 공식 사이트(dhlottery.co.kr)나 앱에서 당첨 번호를 확인할 수 있어요. 편의점 로또 단말기에 티켓을 스캔해도 당첨 여부를 즉시 알 수 있습니다.',
  },
  {
    q: '로또는 언제, 어디서 구매하나요?',
    a: '전국 편의점·복권방에서 1장 1,000원에 구매할 수 있으며, 동행복권 앱에서도 온라인 구매가 가능합니다. 추첨 당일 오후 8시까지 구매 가능해요.',
  },
  {
    q: '자동번호와 수동번호 중 당첨 확률이 다른가요?',
    a: '아니요, 동일합니다. 로또 6/45는 순수 확률 게임으로 어떤 방법으로 번호를 선택해도 각 조합의 당첨 확률은 1/8,145,060으로 완전히 같습니다.',
  },
  {
    q: '통계적으로 자주 나오는 번호가 있나요?',
    a: '이론적으로 로또는 각 번호가 동일한 확률로 추첨되는 독립 시행이기 때문에 과거 통계가 미래 결과에 영향을 주지 않습니다. 다만 누적 당첨 통계는 동행복권 사이트에서 확인할 수 있어요.',
  },
  {
    q: '로또 등수별 당첨 기준은 어떻게 되나요?',
    a: '1등: 6개 번호 모두 일치 / 2등: 5개 + 보너스 번호 / 3등: 5개 일치 / 4등: 4개 일치(5만 원 고정) / 5등: 3개 일치(5,000원 고정). 1~3등 당첨금은 해당 회차 판매 금액에 따라 달라집니다.',
  },
]

export default function Page() {
  return (
    <CalcLayout
      title="🎱 로또 자동번호 생성기"
      desc="클릭 한 번으로 행운의 번호 추첨 — 제외 번호 설정·5게임 동시·추첨일 D-Day"
      currentUrl="/cal/lotto/"
      faqs={faqs}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LottoCalc />
    </CalcLayout>
  )
}
