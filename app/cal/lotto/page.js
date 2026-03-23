import CalcLayout from '@/components/calculator/CalcLayout'
import LottoCalc from '@/components/calculator/LottoCalc'

export const metadata = {
  title: '로또 자동번호 생성기 — 번호 추첨기 · 제외 번호 설정',
  description: '로또 6/45 번호를 자동으로 생성해요. 제외 번호 설정, 1~5게임 동시 추첨, 번호 복사까지 한 번에. 매주 토요일 추첨 전 행운의 번호를 뽑아보세요.',
  keywords: [
    '로또 자동번호', '로또자동번호', '로또 자동 번호', '로또 자동번호 생성', '로또자동번호생성',
    '로또 번호 생성기', '로또 추첨기', '로또번호추첨', '로또번호 추첨', '로또 자동 번호 생성',
    '로또 6/45', '행운의 번호', '로또 번호 추천', '로또계산기', '로또 확률 계산기',
  ],
  alternates: { canonical: 'https://serenkit.com/cal/lotto/' },
  openGraph: {
    title: '로또 자동번호 생성기 — 번호 추첨기 | serenkit',
    description: '로또 6/45 번호를 자동 생성해요. 제외 번호 설정과 최대 5게임 동시 추첨 지원.',
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
  description: '무작위 로또 6/45 번호 자동 생성기. 슬롯머신 애니메이션, 제외 번호 설정, 1~5게임 동시 추첨.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqs = [
  { q: '번호는 완전히 무작위로 생성되나요?', a: '네, 추첨할 때마다 1~45 사이 번호를 독립적으로 무작위 추출합니다. 과거 당첨 번호나 통계와는 무관하며, 매번 새로운 조합이 생성돼요.' },
  { q: '제외 번호를 설정하면 어떻게 되나요?', a: '선택한 번호를 추첨 풀에서 제외하고 나머지 번호 중에서만 6개를 뽑습니다. 최소 6개의 번호는 남아야 추첨이 가능해요.' },
  { q: '로또 1등 당첨 확률은 얼마나 되나요?', a: '45개 중 6개를 순서 없이 맞출 확률은 약 1/8,145,060(약 814만 분의 1)입니다. 어떤 번호 조합을 선택해도 확률은 동일해요.' },
  { q: '추첨한 번호를 저장하려면 어떻게 하나요?', a: '결과 화면에서 "번호 복사" 버튼을 누르면 해당 게임 번호가 클립보드에 복사됩니다. 메모장이나 카카오톡에 붙여넣기 해서 보관하세요.' },
  { q: '로또는 언제, 어디서 구매하나요?', a: '동행복권 로또 6/45는 전국 편의점·복권방에서 1장 1,000원에 구매할 수 있으며, 동행복권 앱에서도 온라인 구매가 가능합니다. 추첨은 매주 토요일 오후 8시 45분에 진행됩니다.' },
  { q: '자동번호와 수동번호 중 당첨 확률이 다른가요?', a: '아니요, 동일합니다. 로또 6/45는 순수 확률 게임으로 어떤 방법으로 번호를 선택해도 각 조합의 당첨 확률은 1/8,145,060으로 완전히 같습니다. 자동번호라고 당첨이 더 잘 되거나 덜 되는 것은 없어요.' },
  { q: '통계적으로 자주 나오는 번호가 있나요?', a: '이론적으로 로또는 각 번호가 동일한 확률로 추첨되는 독립 시행이기 때문에 과거 통계가 미래 결과에 영향을 주지 않습니다. 다만 누적 당첨 통계에서 상대적으로 많이 나온 번호들이 있으며, 동행복권 사이트에서 역대 당첨 번호 통계를 확인할 수 있습니다.' },
  { q: '로또 등수별 당첨 기준은 어떻게 되나요?', a: '1등: 6개 번호 일치 / 2등: 5개 + 보너스 번호 / 3등: 5개 일치 / 4등: 4개 일치(5만 원 고정) / 5등: 3개 일치(5,000원 고정). 1~3등 당첨금은 해당 회차 판매 금액에 따라 달라집니다.' },
]

export default function Page() {
  return (
    <CalcLayout
      title="🎱 로또 자동번호 생성기"
      desc="행운의 번호를 뽑아드려요 — 제외 번호 설정, 최대 5게임 동시 추첨"
      currentUrl="/cal/lotto/"
      faqs={faqs}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LottoCalc />
    </CalcLayout>
  )
}
