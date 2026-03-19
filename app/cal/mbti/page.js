import CalcLayout from '@/components/calculator/CalcLayout'
import MbtiCalc from '@/components/calculator/MbtiCalc'

export const metadata = {
  title: 'MBTI 궁합 계산기 · 관계도 - 황금비율·점수 분석',
  description: '두 사람의 MBTI 관계도와 궁합 점수를 한 번에 확인하세요. 4가지 차원 분석, 황금비율 여부, 연인·친구·동료 궁합을 바로 알 수 있어요.',
  keywords: ['MBTI 궁합', 'MBTI 궁합 계산기', 'mbti 관계도', 'MBTI 관계도', 'MBTI 연애 궁합', 'mbti 궁합표', '황금비율 mbti', 'MBTI 친구 궁합', 'MBTI 직장 궁합', 'MBTI 검사', 'MBTI 유형 변화', 'MBTI 16가지'],
  alternates: { canonical: 'https://serenkit.com/cal/mbti/' },
  openGraph: {
    title: 'MBTI 궁합 계산기 · 관계도 - serenkit',
    description: '두 사람의 MBTI 관계도와 궁합 점수, 황금비율 여부를 바로 확인해보세요.',
    url: 'https://serenkit.com/cal/mbti/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'MBTI 궁합 계산기 관계도 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'MBTI 궁합 계산기 · 관계도',
  url: 'https://serenkit.com/cal/mbti/',
  description: '두 사람의 MBTI 유형으로 관계도와 궁합 점수, 4가지 차원 분석을 제공하는 계산기',
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
    q: 'MBTI 관계도란 무엇인가요?',
    a: 'MBTI 관계도는 두 사람의 MBTI 유형이 서로 어떤 관계에 있는지를 E/I·N/S·T/F·J/P 4가지 차원으로 분석한 결과예요. 몇 가지 차원이 같고 다른지에 따라 궁합 점수와 관계 특성이 달라집니다. 황금비율(4가지 모두 반대), 유사형(4가지 모두 같) 등 다양한 유형이 있어요.',
  },
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
    a: '물론이에요! MBTI 궁합은 통계적 경향성을 보여줄 뿐, 개인의 관계를 결정하지 않아요. 도전적인 궁합이라도 서로의 차이를 인정하고 소통 방식을 맞춰가면 오히려 더 단단한 관계가 될 수 있어요. MBTI는 상대를 이해하는 출발점으로만 활용하세요.',
  },
  {
    q: '공식 MBTI 검사는 어디서 받을 수 있나요?',
    a: '공식 MBTI 검사는 국제 공인 자격을 보유한 검사 기관 또는 심리상담 전문가를 통해 유료로 받을 수 있어요. 인터넷에서 무료로 받을 수 있는 검사들은 MBTI에서 영감을 받은 유사 검사(MBTI-like test)이며 공식 결과와 다를 수 있습니다. 자기 이해를 위한 참고 용도로 활용하기에는 충분해요.',
  },
  {
    q: 'MBTI는 시간이 지나면 바뀔 수 있나요?',
    a: '네, MBTI 유형은 고정된 것이 아니에요. 나이, 직업, 환경, 경험 등의 영향을 받아 달라질 수 있습니다. 특히 성격의 경계선(예: I/E 비율이 51/49에 가까운 경우)에 있다면 상황에 따라 반대 유형으로 측정되기도 해요. 몇 년마다 다시 검사해보는 것도 자기 이해에 도움이 됩니다.',
  },
  {
    q: '직장에서 MBTI를 채용이나 평가 기준으로 활용해도 되나요?',
    a: '권장하지 않습니다. MBTI는 개인의 성격 경향을 이해하는 참고 도구일 뿐, 업무 능력이나 성과를 예측하는 지표가 아닙니다. 심리학계에서도 MBTI의 직업·채용 활용에는 신중해야 한다고 권고해요. 채용·인사 평가에서 MBTI를 결정적 기준으로 활용하면 오히려 다양성을 해치고 법적 문제로 이어질 수 있습니다.',
  },
]

export default function Page() {
  return (
    <CalcLayout title="💘 MBTI 궁합 계산기 · 관계도" desc="두 사람의 MBTI 관계도와 궁합 점수, 황금비율 여부를 한 번에 확인해보세요" currentUrl="/cal/mbti/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MbtiCalc />
    </CalcLayout>
  )
}
