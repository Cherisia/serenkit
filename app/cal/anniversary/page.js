import CalcLayout from '@/components/calculator/CalcLayout'
import AnniversaryCalc from '@/components/calculator/AnniversaryCalc'

export const metadata = {
  title: '기념일 계산기',
  description: '100일, 200일, 1주년 등 기념일 날짜를 무료로 계산해드립니다. 연인, 결혼, 친구와의 특별한 날을 미리 확인하세요.',
  keywords: ['기념일 계산기', '100일 계산', '200일 계산', '1주년 날짜', '커플 기념일 계산'],
  alternates: { canonical: 'https://serenkit.com/cal/anniversary/' },
  openGraph: {
    title: '기념일 계산기 | serenkit',
    description: '100일, 200일, 1주년 등 기념일 날짜를 무료로 계산해드립니다.',
    url: 'https://serenkit.com/cal/anniversary/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '기념일 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '기념일 계산기',
  url: 'https://serenkit.com/cal/anniversary/',
  description: '100일·200일·1주년 등 기념일 날짜를 자동으로 계산하는 무료 기념일 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
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
  { q: '기념일 계산기란 무엇인가요?', a: '처음 만난 날이나 시작일을 기준으로 100일, 200일, 300일, 1주년, 2주년 등 주요 기념일 날짜를 자동으로 계산해주는 도구입니다. 연인, 부부, 친구 사이의 특별한 날을 미리 확인할 수 있습니다.' },
  { q: '100일은 어떻게 계산하나요?', a: '시작일을 1일로 기산하여 100일째 되는 날을 계산합니다. 예를 들어 1월 1일이 시작일이면 100일은 4월 10일(윤년 제외)이 됩니다.' },
  { q: '1주년은 몇 일인가요?', a: '1주년은 시작일로부터 정확히 1년 후 같은 날짜입니다. 365일과는 달리 윤년 여부와 관계없이 동일한 월·일로 계산됩니다.' },
  { q: 'D+ 표시는 무슨 의미인가요?', a: '이미 지난 기념일은 D+숫자로 표시됩니다. 예를 들어 D+5는 해당 기념일이 5일 전에 지났음을 의미합니다.' },
  { q: '결혼기념일이나 창업일도 계산할 수 있나요?', a: '네, 시작일에 결혼일, 창업일, 입사일 등 원하는 기준 날짜를 입력하면 모든 종류의 기념일을 계산할 수 있습니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="💑 기념일 계산기" desc="처음 만난 날로부터 100일·1주년 등 기념일을 자동 계산해요" currentUrl="/cal/anniversary" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnniversaryCalc />
    </CalcLayout>
  )
}
