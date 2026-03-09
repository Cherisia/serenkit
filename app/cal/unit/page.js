import CalcLayout from '@/components/calculator/CalcLayout'
import UnitCalc from '@/components/calculator/UnitCalc'

export const metadata = {
  title: '단위 변환기 - 길이·무게·온도·넓이·부피·속도·데이터',
  description: '길이, 무게, 넓이, 부피, 온도, 속도, 데이터 단위를 한 번에 변환하세요. mm↔cm↔m↔km↔인치↔피트, kg↔lb↔oz, °C↔°F↔K, km/h↔m/s 등 단위 변환기.',
  keywords: ['단위 변환기', '길이 변환', '무게 변환', '온도 변환', '넓이 변환', '부피 변환', '속도 변환', '데이터 변환', 'cm 인치 변환', 'kg lb 변환', '섭씨 화씨 변환', '평 m2 변환'],
  alternates: { canonical: 'https://serenkit.com/cal/unit/' },
  openGraph: {
    title: '단위 변환기 - serenkit',
    description: '길이·무게·온도·넓이·부피·속도·데이터 단위를 한 번에 변환해보세요.',
    url: 'https://serenkit.com/cal/unit/',
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '단위 변환기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '단위 변환기',
  url: 'https://serenkit.com/cal/unit/',
  description: '길이, 무게, 넓이, 부피, 온도, 속도, 데이터 등 7가지 단위를 변환하는 단위 변환기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '단위 변환기', item: 'https://serenkit.com/cal/unit/' },
    ],
  },
}

const faqs = [
  { q: '1인치는 몇 cm인가요?', a: '1인치(inch)는 정확히 2.54cm입니다. 반대로 1cm는 약 0.394인치예요. 예를 들어 6인치는 15.24cm, 12인치(1피트)는 30.48cm입니다.' },
  { q: '1평은 몇 m²인가요?', a: '1평은 약 3.30579m²입니다. 반대로 1m²는 약 0.3025평이에요. 33평 아파트는 약 109m², 84m² 아파트는 약 25.4평에 해당합니다.' },
  { q: '섭씨(°C)와 화씨(°F)는 어떻게 변환하나요?', a: '°F = °C × 1.8 + 32 공식을 사용합니다. 예를 들어 체온 36.5°C는 97.7°F, 물 끓는점 100°C는 212°F, 체감온도 0°C는 32°F예요.' },
  { q: '1kg은 몇 파운드(lb)인가요?', a: '1kg은 약 2.2046파운드(lb)입니다. 미국 등 파운드를 사용하는 나라에서 체중을 말할 때 자주 필요한 변환이에요. 반대로 1lb는 약 453.6g입니다.' },
  { q: '1갤런은 몇 리터인가요?', a: '미국식 1갤런(US gallon)은 약 3.785리터입니다. 주유소에서 갤런 단위로 표시될 때 유용해요. 1리터는 약 0.264갤런입니다.' },
  { q: '1GB는 몇 MB인가요?', a: '1GB = 1,024MB = 1,048,576KB = 1,073,741,824byte입니다. 이 계산기는 이진수(2진법) 기준(1KB=1024byte)을 사용합니다.' },
  { q: '속도 km/h와 m/s는 어떻게 변환하나요?', a: '1km/h = 1000m ÷ 3600s = 약 0.2778m/s입니다. 반대로 1m/s = 3.6km/h예요. 예를 들어 고속도로 제한속도 100km/h는 약 27.8m/s, 사람 걷는 속도 1.4m/s는 약 5km/h입니다.' },
  { q: '1마일은 몇 km인가요?', a: '1마일(mile)은 정확히 1.60934km입니다. 미국·영국 도로 표지판은 마일 단위를 사용하므로, 해외 여행 시 유용해요. 반대로 1km는 약 0.6214마일입니다. 마라톤 풀코스 42.195km는 약 26.2마일이에요.' },
]

export default function Page() {
  return (
    <CalcLayout title="🔄 단위 변환기" desc="길이·무게·온도·넓이·부피·속도·데이터를 한 번에 변환해요" currentUrl="/cal/unit/" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitCalc />
    </CalcLayout>
  )
}
