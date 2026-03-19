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
