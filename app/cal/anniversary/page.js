import CalcLayout from '@/components/calculator/CalcLayout'
import AnniversaryCalc from '@/components/calculator/AnniversaryCalc'

export const metadata = {
  title: '기념일 계산기 — 오늘 몇 일째? 100일·주년 날짜 자동 확인',
  description: '만난 날 입력하면 오늘 기준 경과 일수를 즉시 확인. 100일·200일·1주년 등 기념일 날짜와 D-day를 한 번에. 커플·결혼·창업 기념일 모두 지원.',
  keywords: [
    '기념일 계산기', '기념일 세기', '만난 지 며칠', '100일 계산기', '100일 날짜 계산',
    '몇 주년 계산기', '주년 계산기', '200일 기념일', '1주년 날짜 계산', '백일 계산기',
    '커플 기념일 계산기', '사귄날 기념일 계산', '사귄날짜 계산기', '결혼기념일 계산기',
    '기념일 날짜 계산', 'D+100 계산기',
  ],
  alternates: { canonical: 'https://serenkit.com/cal/anniversary/' },
  openGraph: {
    title: '기념일 계산기 — 오늘 몇 일째? | serenkit',
    description: '만난 날부터 오늘 기준 경과 일수 즉시 확인. 100일·200일·1주년 기념일 날짜와 D-day 한 번에.',
    url: 'https://serenkit.com/cal/anniversary/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '기념일 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '기념일 계산기',
  url: 'https://serenkit.com/cal/anniversary/',
  description: '처음 만난 날로부터 오늘까지 경과 일수, 100일·200일·1주년 등 기념일 날짜와 D-day를 자동 계산하는 기념일 계산기.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '기념일 계산기', item: 'https://serenkit.com/cal/anniversary/' },
    ],
  },
}

const faqs = [
  {
    q: '오늘 기준으로 만난 지 며칠인지 어떻게 확인하나요?',
    a: '처음 만난 날(시작일)을 입력하고 계산하면 결과 상단에 오늘까지 경과한 일수가 크게 표시됩니다. 100일·200일·1주년 등 기념일 목록과 함께 다음 기념일까지 남은 D-day도 한눈에 확인할 수 있어요.',
  },
  {
    q: '100일은 어떻게 계산하나요?',
    a: '시작일을 1일로 기산하여 100일째 되는 날을 계산합니다. 예를 들어 1월 1일이 시작일이면 100일은 4월 10일(윤년 제외)이 됩니다. 처음 만난 날 자체가 1일째예요.',
  },
  {
    q: '몇 주년 결혼기념일인지 어떻게 확인하나요?',
    a: '결혼일을 시작일로 입력하면 1주년부터 50주년까지 각 기념일 날짜가 자동으로 표시됩니다. 이미 지난 주년 기념일은 D+, 아직 남은 기념일은 D-로 표시되니 현재 몇 주년인지 쉽게 확인할 수 있어요.',
  },
  {
    q: '처음 만난 날이 1일인가요, 다음날이 1일인가요?',
    a: '이 계산기는 처음 만난 날(시작일)을 1일로 기산합니다. 예를 들어 1월 1일이 시작일이라면 1월 1일이 1일째이고, 4월 10일이 100일째예요. 연인마다 계산 방식이 다를 수 있으니 참고해 사용하세요.',
  },
  {
    q: '1주년은 며칠인가요?',
    a: '1주년은 시작일로부터 정확히 1년 후 같은 날짜입니다. 365일과는 달리 윤년 여부와 관계없이 동일한 월·일로 계산됩니다.',
  },
  {
    q: '결혼기념일, 창업일, 입사일도 계산할 수 있나요?',
    a: '네, 시작일에 결혼일·창업일·입사일·반려동물 입양일 등 원하는 기준 날짜를 입력하면 모든 종류의 기념일을 계산할 수 있습니다.',
  },
  {
    q: '군입대일로 전역일까지 남은 날을 계산할 수 있나요?',
    a: '입대일을 시작일로 넣으면 일수 기념일 목록이 생성됩니다. 예상 전역일을 직접 계산하려면 날짜 더하기 계산기를 함께 활용하면 편리해요.',
  },
  {
    q: 'D+ 표시는 무슨 의미인가요?',
    a: '이미 지난 기념일에는 D+숫자가 표시됩니다. 예를 들어 D+5는 해당 기념일이 5일 전에 지났음을 의미해요. 아직 오지 않은 기념일은 D-숫자로 표시됩니다.',
  },
]

export default function Page() {
  return (
    <CalcLayout
      title="💑 기념일 계산기"
      desc="오늘 기준 경과 일수 · 100일·200일·주년 기념일 날짜와 D-day 자동 계산"
      currentUrl="/cal/anniversary/"
      faqs={faqs}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnniversaryCalc />
    </CalcLayout>
  )
}
