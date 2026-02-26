import CalcLayout from '@/components/calculator/CalcLayout'
import WeightCalc from '@/components/calculator/WeightCalc'

export const metadata = {
  title: '적정 체중 계산기 | BMI 계산기',
  description: '키와 몸무게를 입력하면 BMI(체질량지수)와 표준 체중, 적정 체중 범위를 바로 계산해요. 한국인 기준 비만도 판정 기준도 확인해보세요.',
  keywords: ['적정 체중 계산기', 'BMI 계산기', '체질량지수 계산', '표준 체중', '비만도 계산기', '체중 계산기', '정상 체중 범위'],
  alternates: { canonical: 'https://serenkit.com/cal/weight/' },
  openGraph: {
    title: '적정 체중 계산기 | serenkit',
    description: 'BMI와 표준 체중으로 나의 적정 체중 범위를 확인해보세요.',
    url: 'https://serenkit.com/cal/weight/',
    type: 'website',
    images: [{ url: '/api/og?title=적정+체중+계산기&sub=BMI와+표준+체중으로+적정+체중+확인', width: 1200, height: 630, alt: '적정 체중 계산기 | serenkit' }],
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
  { q: 'BMI란 무엇인가요?', a: 'BMI(Body Mass Index, 체질량지수)는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다. 세계보건기구(WHO)와 대한비만학회가 비만도 판정에 사용하는 국제 표준 지표예요.' },
  { q: '한국인 BMI 기준이 다른가요?', a: '네, 대한비만학회 기준 한국인은 BMI 23 이상을 과체중, 25 이상을 비만으로 분류합니다. 서양인 기준(25 이상 과체중)보다 낮은데, 동아시아인은 같은 BMI에서도 체지방률이 높기 때문이에요.' },
  { q: '표준 체중은 어떻게 계산하나요?', a: 'Broca 변형법을 사용합니다. 남성은 (키(cm) - 100) × 0.9, 여성은 (키(cm) - 100) × 0.85로 계산합니다. 한국에서 널리 사용되는 간편 공식이에요.' },
  { q: '적정 체중 범위는 어떻게 정해지나요?', a: 'BMI 18.5 ~ 22.9 구간에 해당하는 체중을 적정 범위로 제시합니다. 이 범위에서 각종 성인병 발생 위험이 가장 낮은 것으로 알려져 있어요.' },
  { q: 'BMI가 낮으면 무조건 건강한가요?', a: '아닙니다. BMI가 18.5 미만인 저체중도 면역력 저하, 골다공증, 빈혈 등 건강 문제를 유발할 수 있어요. BMI는 참고 지표이며, 근육량·체지방률 등 정확한 체성분 분석은 전문 의료진과 상담하세요.' },
]

export default function Page() {
  return (
    <CalcLayout title="⚖️ 적정 체중 계산기" desc="BMI와 표준 체중으로 나의 적정 체중 범위를 확인해요" currentUrl="/cal/weight" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WeightCalc />
    </CalcLayout>
  )
}
