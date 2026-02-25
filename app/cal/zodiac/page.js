import CalcLayout from '@/components/calculator/CalcLayout'
import ZodiacCalc from '@/components/calculator/ZodiacCalc'

export const metadata = {
  title: '띠/별자리 계산기',
  description: '생년월일로 나의 띠와 별자리를 무료로 확인하세요. 오행, 궁합 좋은 띠, 별자리 특징까지 한번에 알아보세요.',
  keywords: ['띠 계산기', '별자리 계산기', '내 띠 확인', '생년월일 별자리', '띠 궁합', '오행', '12간지'],
  alternates: { canonical: 'https://serenkit.com/cal/zodiac/' },
  openGraph: {
    title: '띠/별자리 계산기 | serenKit',
    description: '생년월일로 나의 띠와 별자리를 무료로 확인하세요.',
    url: 'https://serenkit.com/cal/zodiac/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '띠/별자리 계산기 | serenKit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '띠/별자리 계산기',
  url: 'https://serenkit.com/cal/zodiac/',
  description: '생년월일로 띠와 별자리를 계산하는 무료 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '띠/별자리 계산기', item: 'https://serenkit.com/cal/zodiac/' },
    ],
  },
}

const faqs = [
  { q: '띠는 어떻게 계산되나요?', a: '띠는 음력 설날(입춘, 매년 2월 4일경)을 기준으로 바뀝니다. 1월~2월 초에 태어난 분은 전년도 띠로 계산될 수 있어요. 예를 들어 2000년 2월 1일생은 1999년 토끼띠입니다.' },
  { q: '별자리는 어떻게 계산되나요?', a: '서양 별자리는 태양의 위치를 기준으로 한 양력 생일로 계산합니다. 각 별자리는 약 30일 주기로 바뀌며, 경계 날짜에 태어난 경우 출생 시간에 따라 달라질 수 있어요.' },
  { q: '오행이란 무엇인가요?', a: '오행은 목(木)·화(火)·토(土)·금(金)·수(水) 다섯 가지 기운으로, 동양 철학에서 자연과 사람의 특성을 설명하는 개념입니다. 각 띠마다 고유한 오행 기운을 가지고 있어요.' },
  { q: '띠 궁합이 안 좋으면 실제로 안 맞나요?', a: '띠 궁합은 동양 전통 문화에서 유래한 참고 지표일 뿐, 과학적으로 검증된 사실이 아닙니다. 재미로 참고하되 실제 관계에 너무 의미를 두지 않는 것을 추천해요.' },
  { q: '12간지 순서가 어떻게 되나요?', a: '쥐-소-호랑이-토끼-용-뱀-말-양-원숭이-닭-개-돼지 순서로 12년 주기로 반복됩니다. 2024년은 용띠해, 2025년은 뱀띠해입니다.' },
]

export default function Page() {
  return (
    <CalcLayout title="🐾 띠/별자리 계산기" desc="생년월일로 나의 띠와 별자리를 확인해요" currentUrl="/cal/zodiac" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ZodiacCalc />
    </CalcLayout>
  )
}
