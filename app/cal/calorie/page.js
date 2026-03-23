import CalcLayout from '@/components/calculator/CalcLayout'
import CalorieCalc from '@/components/calculator/CalorieCalc'

export const metadata = {
  title: '기초대사량 계산기 — 하루 칼로리·TDEE 즉시 계산',
  description: '나이·키·몸무게·활동량으로 기초대사량(BMR)과 하루 필요 칼로리(TDEE)를 계산하세요. 체중 감량·유지·증량 목표별 권장 칼로리와 영양소 비율까지 한눈에 볼 수 있어요.',
  keywords: ['기초대사량 계산기', '하루 칼로리 계산기', 'BMR 계산기', 'TDEE 계산기', '칼로리 계산', '다이어트 칼로리', '하루 권장 칼로리', '기초 대사량', '하루 칼로리 계산', '칼로리 소모량 계산기'],
  alternates: { canonical: 'https://serenkit.com/cal/calorie/' },
  openGraph: {
    title: '기초대사량 계산기 — 하루 칼로리·TDEE 즉시 계산 | serenkit',
    description: '기초대사량(BMR)과 하루 필요 칼로리(TDEE), 목표별 권장 칼로리를 계산해보세요.',
    url: 'https://serenkit.com/cal/calorie/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '기초대사량 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '기초대사량 계산기',
  url: 'https://serenkit.com/cal/calorie/',
  description: 'Mifflin-St Jeor 공식 기반 기초대사량(BMR)과 하루 필요 칼로리(TDEE)를 계산하는 계산기',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '기초대사량 계산기', item: 'https://serenkit.com/cal/calorie/' },
    ],
  },
}

const faqs = [
  { q: '기초대사량(BMR)이란 무엇인가요?', a: '기초대사량(Basal Metabolic Rate)은 아무런 활동을 하지 않고 안정된 상태에서 체온 유지, 호흡, 심장 박동 등 기본 생명 활동에 필요한 최소 에너지입니다. 하루 총 소비 칼로리의 약 60~70%를 차지해요.' },
  { q: '어떤 공식을 사용하나요?', a: 'Mifflin-St Jeor 공식을 사용합니다. 남성: (10×체중) + (6.25×키) - (5×나이) + 5, 여성: (10×체중) + (6.25×키) - (5×나이) - 161 입니다. 여러 연구에서 가장 정확한 공식으로 검증되어 현재 표준으로 사용됩니다.' },
  { q: 'TDEE란 무엇인가요?', a: 'TDEE(Total Daily Energy Expenditure)는 하루 동안 실제로 소비하는 총 칼로리입니다. BMR에 활동 계수를 곱해서 계산하며, 이 값을 기준으로 식단을 조절하면 체중을 관리할 수 있어요.' },
  { q: '칼로리를 얼마나 줄여야 살이 빠지나요?', a: '지방 1kg을 태우려면 약 7,700kcal가 필요합니다. 하루 500kcal를 줄이면 일주일에 약 0.5kg 감량이 가능해요. 무리한 절식보다 TDEE보다 300~500kcal 적게 먹는 것이 건강한 감량 속도입니다. 1,000kcal 이하로 줄이면 근손실과 기초대사량 저하 위험이 있어요.' },
  { q: '근육을 늘리려면 칼로리를 얼마나 먹어야 하나요?', a: '근육 증량(벌크업)을 위해서는 TDEE보다 250~500kcal 더 섭취하는 것을 권장합니다. 단백질은 체중 1kg당 1.6~2.2g 섭취하면 근합성에 효과적이에요.' },
  { q: '기초대사량은 왜 사람마다 다른가요?', a: '나이, 성별, 키, 체중, 근육량에 따라 달라집니다. 근육은 지방보다 에너지 소비가 높아 근육량이 많을수록 기초대사량이 높아요. 나이가 들수록 근육량이 감소하기 때문에 기초대사량도 낮아지는 경향이 있습니다.' },
  { q: '다이어트 중 단백질은 얼마나 먹어야 하나요?', a: '감량 중에는 체중 1kg당 최소 1.2~1.6g의 단백질 섭취를 권장합니다. 단백질은 포만감을 높이고 근손실을 방지해 다이어트 효과를 높여줘요. 닭가슴살, 두부, 계란, 저지방 유제품이 좋은 단백질 공급원이에요.' },
  { q: '공복 유산소 운동이 지방 연소에 더 효과적인가요?', a: '공복 유산소는 지방 연소 비율이 높지만, 총 칼로리 소모량은 일반 유산소와 크게 다르지 않아요. 공복 상태에서 고강도 운동 시 근손실이 올 수 있어 식후 유산소와 큰 차이가 없습니다. 꾸준히 실천할 수 있는 방식을 선택하는 것이 가장 중요해요.' },
]

export default function Page() {
  return (
    <CalcLayout title="🔥 기초대사량 계산기" desc="나이·키·몸무게·활동량으로 하루 필요 칼로리를 계산해요" currentUrl="/cal/calorie/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalorieCalc />
    </CalcLayout>
  )
}
