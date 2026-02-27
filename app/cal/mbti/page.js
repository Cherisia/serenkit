import CalcLayout from '@/components/calculator/CalcLayout'
import MbtiCalc from '@/components/calculator/MbtiCalc'

export const metadata = {
  title: 'MBTI 궁합 계산기',
  description: '두 사람의 MBTI를 선택하면 궁합 점수와 4가지 차원 분석, 황금비율 여부를 알려드려요. 연인·친구·동료 모두 가능해요.',
  keywords: ['MBTI 궁합', 'MBTI 궁합 계산기', 'MBTI 연애 궁합', 'mbti 궁합표', '황금비율 mbti', 'MBTI 친구 궁합', 'MBTI 직장 궁합'],
  alternates: { canonical: 'https://serenkit.com/cal/mbti/' },
  openGraph: {
    title: 'MBTI 궁합 계산기 | serenkit',
    description: '두 사람의 MBTI 궁합 점수와 황금비율 여부를 바로 확인해보세요.',
    url: 'https://serenkit.com/cal/mbti/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MBTI 궁합 계산기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'MBTI 궁합 계산기',
  url: 'https://serenkit.com/cal/mbti/',
  description: '두 사람의 MBTI 유형으로 궁합 점수와 4가지 차원 분석을 제공하는 계산기',
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: 'MBTI 궁합 계산기', item: 'https://serenkit.com/cal/mbti/' },
    ],
  },
}

const faqs = [
  {
    q: 'MBTI 궁합이 실제 관계에 영향을 미치나요?',
    a: 'MBTI는 성격 유형을 이해하는 참고 도구예요. 궁합이 낮아도 서로 이해하고 노력하면 얼마든지 좋은 관계를 만들 수 있어요. 반대로 궁합이 좋아도 소통하지 않으면 관계는 어려워질 수 있답니다. 결국 가장 중요한 건 서로에 대한 이해와 노력이에요.',
  },
  {
    q: '황금비율 궁합이란 무엇인가요?',
    a: '황금비율 궁합은 E/I·N/S·T/F·J/P 4가지 차원이 모두 반대인 유형 쌍이에요. 예를 들어 INTJ와 ENFP가 대표적이에요. 서로 다른 강점이 상대방의 약점을 보완해주기 때문에 자연스럽게 끌리고 오래 함께할수록 더 잘 맞는다는 특징이 있어요.',
  },
  {
    q: '같은 MBTI끼리는 궁합이 어떤가요?',
    a: '같은 MBTI끼리는 서로를 잘 이해하고 공감하기 쉬운 장점이 있어요. 하지만 같은 단점도 공유하기 때문에 서로의 약점을 보완하기 어려울 수 있어요. 특히 같은 단점이 부딪히면 갈등이 커질 수 있어요. 이 계산기에서는 72% 점수로 "잘 맞는 편"에 해당해요.',
  },
  {
    q: 'N형과 S형은 정말 안 맞나요?',
    a: 'N(직관)형과 S(현실)형은 세상을 인식하는 방식이 달라 초반에 대화가 어렵게 느껴질 수 있어요. N형은 미래·가능성·아이디어를 이야기하고, S형은 현재·사실·경험을 이야기하는 경향이 있어요. 하지만 이 차이가 오히려 서로에게서 배울 점이 많은 관계가 될 수도 있어요.',
  },
  {
    q: 'MBTI 궁합이 안 좋아도 잘 지낼 수 있나요?',
    a: '물론이에요! MBTI 궁합은 통계적 경향성을 보여줄 뿐, 개인의 관계를 결정하지 않아요. 도전적인 궁합이라도 서로의 차이를 인정하고 소통 방식을 맞춰가면 오히려 더 단단한 관계가 될 수 있어요. MBTI는 상대를 이해하는 출발점으로만 활용하세요 😊',
  },
]

export default function Page() {
  return (
    <CalcLayout title="💘 MBTI 궁합 계산기" desc="두 사람의 MBTI로 궁합 점수와 황금비율 여부를 확인해보세요" currentUrl="/cal/mbti" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MbtiCalc />
    </CalcLayout>
  )
}
