import CalcLayout from '@/components/calculator/CalcLayout'
import AgeCalc from '@/components/calculator/AgeCalc'

export const metadata = {
  title: '만 나이 계산기',
  description: '생년월일로 법적 만 나이를 바로 계산해요. 2023년 만 나이 통일법 기준으로 정확한 만 나이를 확인하세요.',
  keywords: ['만 나이 계산기', '만나이 계산', '법적 나이 계산', '만 나이 통일법', '나이 계산기'],
  alternates: { canonical: 'https://serenkit.com/cal/age/' },
  openGraph: {
    title: '만 나이 계산기 - serenkit',
    description: '생년월일로 법적 만 나이를 바로 계산해요.',
    url: 'https://serenkit.com/cal/age/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '만 나이 계산기 - serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '만 나이 계산기',
  url: 'https://serenkit.com/cal/age/',
  description: '생년월일로 법적 만 나이를 계산하는 만 나이 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '만 나이 계산기', item: 'https://serenkit.com/cal/age/' },
    ],
  },
}

const faqs = [
  { q: '만 나이란 무엇인가요?', a: '만 나이는 태어난 날을 0세로 시작해 생일이 지날 때마다 1살씩 늘어나는 국제 표준 나이 계산 방식입니다. 2023년 6월부터 대한민국 법령에서도 만 나이를 공식 기준으로 사용합니다.' },
  { q: '한국 나이, 만 나이, 연나이는 어떻게 다른가요?', a: '한국 나이(세는 나이)는 태어난 해를 1세로 시작하고 매년 1월 1일에 한 살 늘어납니다. 만 나이는 생일이 지나야 한 살 추가됩니다. 연나이(현재 연도 - 출생 연도)는 생일 전후 관계없이 계산해요. 생일 전이라면 한국 나이가 만 나이보다 2살 많을 수 있습니다.' },
  { q: '2023년 만 나이 통일법이란 무엇인가요?', a: '2023년 6월 28일부터 시행된 법령으로, 법적·행정적 나이 기준을 만 나이로 통일한 제도입니다. 이에 따라 건강보험·병역·복지 등 공식 문서에서는 만 나이를 기준으로 합니다. 일상 대화에서 세는 나이를 쓰는 것은 자유예요.' },
  { q: '나이에 따른 법적 기준이 달라지는 것이 있나요?', a: '만 19세 이상부터 성인으로 선거권 부여, 만 18세부터 운전면허 취득 가능, 만 14세 미만은 형사 미성년자로 처벌 불가, 만 65세 이상은 기초연금 수급 대상 등 다양한 법적 기준이 만 나이를 기준으로 합니다.' },
  { q: '기준일을 오늘이 아닌 다른 날짜로 설정할 수 있나요?', a: '네, 기준일 입력란에서 원하는 날짜를 선택할 수 있습니다. 특정 날짜 기준의 나이를 확인하거나 미래 나이를 미리 계산할 때 활용하세요.' },
  { q: '다음 생일까지 며칠 남았는지도 알 수 있나요?', a: '네, 계산 결과 하단에 다음 생일 날짜와 생일까지 남은 일수가 함께 표시됩니다.' },
  { q: '다른 나라에서는 나이를 어떻게 계산하나요?', a: '대부분의 나라에서 만 나이를 사용합니다. 과거 한국·중국·일본에서 전통적으로 세는 나이를 사용했지만, 한국은 2023년부터 공식적으로 만 나이로 통일됐어요. 일본도 현재는 만 나이를 공식 기준으로 사용합니다.' },
  { q: '아기의 월령(개월 수)도 계산할 수 있나요?', a: '네, 기준일에 오늘 날짜를 설정하고 생년월일을 입력하면 개월 수도 함께 표시됩니다. 영아 검진이나 예방접종 일정 확인 시 활용할 수 있어요.' },
]

export default function Page() {
  return (
    <CalcLayout title="🎂 만 나이 계산기" desc="생년월일로 법적 만 나이를 정확하게 계산해요" currentUrl="/cal/age" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AgeCalc />
    </CalcLayout>
  )
}
