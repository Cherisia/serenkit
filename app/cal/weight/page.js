import CalcLayout from '@/components/calculator/CalcLayout'
import WeightCalc from '@/components/calculator/WeightCalc'

export const metadata = {
  title: '적정 체중 계산기 - BMI·비만도·표준 체중',
  description: '키와 몸무게를 입력하면 BMI(체질량지수)와 표준 체중, 적정 체중 범위를 바로 계산해요. 대한비만학회 기준 한국인 비만도 판정과 감량·증량 목표 체중까지 한눈에 확인하세요.',
  keywords: ['적정 체중 계산기', 'BMI 계산기', '체질량지수 계산', '표준 체중', '비만도 계산기', '체중 계산기', '정상 체중 범위', 'BMI 계산 공식', '한국인 비만 기준', '다이어트 목표 체중'],
  alternates: { canonical: 'https://serenkit.com/cal/weight/' },
  openGraph: {
    title: '적정 체중 계산기 - serenkit',
    description: 'BMI와 표준 체중으로 나의 적정 체중 범위를 확인해보세요.',
    url: 'https://serenkit.com/cal/weight/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '적정 체중 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '적정 체중 계산기',
  url: 'https://serenkit.com/cal/weight/',
  description: 'BMI(체질량지수)와 표준 체중을 기반으로 적정 체중 범위를 계산하는 계산기',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '적정 체중 계산기', item: 'https://serenkit.com/cal/weight/' },
    ],
  },
}

const faqs = [
  { q: 'BMI 계산 공식은 무엇인가요?', a: 'BMI = 체중(kg) ÷ [키(m) × 키(m)]입니다. 예를 들어 키 170cm, 체중 65kg이라면 BMI = 65 ÷ (1.7 × 1.7) = 22.5로 정상 범위에 해당해요. 세계보건기구(WHO)와 대한비만학회가 비만도 판정에 사용하는 국제 표준 지표입니다.' },
  { q: '한국인 BMI 기준이 서양인과 다른가요?', a: '네, 대한비만학회 기준 한국인은 BMI 23 이상을 과체중, 25 이상을 비만으로 분류합니다. 서양인 기준(25 이상 과체중)보다 낮은데, 동아시아인은 같은 BMI에서도 체지방률이 높고 복부비만 위험이 크기 때문이에요.' },
  { q: '표준 체중은 어떻게 계산하나요?', a: 'Broca 변형법을 사용합니다. 남성은 (키(cm) - 100) × 0.9, 여성은 (키(cm) - 100) × 0.85로 계산합니다. 예를 들어 키 170cm 남성의 표준 체중은 (170-100) × 0.9 = 63kg이에요.' },
  { q: '근육이 많으면 BMI가 높게 나오는데 비만인가요?', a: 'BMI는 근육과 지방을 구별하지 못합니다. 운동선수나 근육이 많은 사람은 BMI가 높아도 체지방률은 낮을 수 있어요. 이런 경우 인바디(체성분 분석) 검사로 체지방률을 별도로 확인하는 것이 더 정확합니다.' },
  { q: '적정 체중 범위는 어떻게 정해지나요?', a: 'BMI 18.5 ~ 22.9 구간에 해당하는 체중을 적정 범위로 제시합니다. 이 범위에서 고혈압·당뇨·심혈관 질환 등 성인병 발생 위험이 가장 낮은 것으로 알려져 있어요.' },
  { q: 'BMI가 낮으면 무조건 건강한가요?', a: '아닙니다. BMI 18.5 미만인 저체중도 면역력 저하, 골다공증, 빈혈 등 건강 문제를 유발할 수 있어요. 특히 급격한 체중 감소는 근감소증으로 이어질 수 있으니 주의하세요. BMI는 참고 지표이며, 정확한 체성분 분석은 전문 의료진과 상담하세요.' },
  { q: '다이어트 목표 체중은 어떻게 설정하나요?', a: '무리한 목표보다 BMI 22 기준 체중을 목표로 설정하는 것이 현실적이에요. 지방 1kg 감량에는 약 7,700kcal 적자가 필요하므로 하루 500kcal 줄이면 주당 약 0.5kg 감량이 가능합니다. 급격한 다이어트는 근손실과 요요를 유발하므로 월 1~2kg 감량을 권장해요.' },
  { q: '허리둘레도 비만 판정에 중요한가요?', a: '네, 복부비만 기준으로 남성 허리둘레 90cm 이상, 여성 85cm 이상이면 복부비만으로 분류합니다. BMI가 정상이어도 복부비만이 있으면 대사증후군·심혈관 질환 위험이 높아질 수 있어요.' },
]

export default function Page() {
  return (
    <CalcLayout title="⚖️ 적정 체중 계산기" desc="BMI와 표준 체중으로 나의 적정 체중 범위를 확인해요" currentUrl="/cal/weight" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WeightCalc />
    </CalcLayout>
  )
}
