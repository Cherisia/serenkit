import ToolLayout from '@/components/color/ToolLayout'
import ColorNames from '@/components/color/ColorNames'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 이름 찾기 - CSS 색상 이름 검색',
  description: 'HEX 코드를 입력하면 가장 가까운 CSS 색상 이름과 Tailwind 클래스를 자동으로 찾아줍니다. 140가지 CSS 표준 색상 전체 목록 제공.',
  keywords: ['CSS 색상 이름', '색상 이름 찾기', 'color name', 'CSS named colors', 'Tailwind 색상 이름'],
  alternates: { canonical: `${BASE_URL}/color/color-names/` },
  openGraph: {
    title: '색상 이름 찾기 - serenkit',
    description: 'HEX 코드 → 가장 가까운 CSS 색상 이름 & Tailwind 클래스 자동 검색',
    url: `${BASE_URL}/color/color-names/`,
  },
}

const faqs = [
  { q: 'CSS 색상 이름이란?', a: 'CSS에서 색상을 HEX나 RGB 대신 영어 이름으로 표현할 수 있습니다. red, blue, tomato, cornflowerblue 등 140가지 표준 색상 이름이 있습니다.' },
  { q: '완전히 일치하지 않아도 되나요?', a: '네, 입력한 HEX 코드와 가장 가까운(RGB 색상 거리가 최소인) 이름을 찾아드립니다. 정확히 일치하면 "완전 일치" 뱃지가 표시됩니다.' },
  { q: '어떤 색상 이름이 많이 쓰이나요?', a: '개발에서는 white, black, transparent가 자주 쓰이고, 디자인에서는 tomato, coral, steelblue, goldenrod 같은 이름도 많이 활용됩니다.' },
]

export default function ColorNamesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '색상 이름 찾기',
    description: 'HEX 코드로 가장 가까운 CSS 색상 이름과 Tailwind 클래스를 찾는 무료 온라인 도구',
    url: `${BASE_URL}/color/color-names/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="color-names" faqs={faqs}>
        <ColorNames />
      </ToolLayout>
    </>
  )
}
