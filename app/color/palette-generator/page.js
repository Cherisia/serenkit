import ToolLayout from '@/components/color/ToolLayout'
import PaletteGenerator from '@/components/color/PaletteGenerator'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 팔레트 생성기 — 보색·유사색·삼각배색 자동 생성',
  description: '기준 색상으로 보색·유사색·삼각배색·단색배색 팔레트를 자동 생성. 각 색상 HEX 코드 즉시 복사. 디자인 색상 조합 추천.',
  keywords: ['색상 팔레트 생성기', '보색 계산기', '유사색 생성기', '삼각배색', 'color palette generator', '색상 조화', '보색 찾기', '색채 배색', '팔레트 색상 추천', 'color scheme generator'],
  alternates: { canonical: `${BASE_URL}/color/palette-generator/` },
  openGraph: {
    title: '색상 팔레트 생성기 — 보색·유사색·삼각배색 자동 생성 | serenkit',
    description: '기준 색상에서 보색·유사색·삼각배색 등 조화로운 팔레트 자동 생성. HEX 코드 복사.',
    url: `${BASE_URL}/color/palette-generator/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '색상 팔레트 생성기 - serenkit' }],
  },
}

const faqs = [
  { q: '보색과 유사색의 차이는 무엇인가요?', a: '보색은 색상환에서 정반대(180°)에 위치한 색으로 강한 대비를 만들고, 유사색은 인접(30° 내외)한 색으로 자연스럽고 조화로운 느낌을 줍니다.' },
  { q: '삼각배색(Triadic)이란?', a: '색상환에서 120° 간격으로 배치된 3가지 색을 사용하는 배색 방식입니다. 균형 잡힌 대비와 풍부한 색감을 제공합니다.' },
  { q: '생성된 팔레트를 어떻게 저장하나요?', a: '각 색상 카드를 클릭하면 HEX 코드가 복사됩니다. 전체 복사 버튼으로 모든 색상을 쉼표로 구분해 한 번에 복사할 수 있습니다.' },
  { q: '단색 배색(Monochromatic)은 어떤 경우에 쓰나요?', a: '단색 배색은 하나의 색상에서 명도·채도만 달리한 팔레트로, 통일감 있고 세련된 느낌을 줍니다. 미니멀한 UI 디자인, 브랜드 서브 색상 조합, 텍스트 계층 구조 표현에 자주 활용됩니다.' },
  { q: '분열 보색(Split-Complementary)이란 무엇인가요?', a: '보색(180° 맞은편) 대신 그 양 옆의 두 색(150°, 210°)을 조합하는 방식입니다. 순수 보색보다 대비가 부드러워 사용하기 쉽고, 다양한 색감을 표현할 수 있어 초보 디자이너에게 추천되는 배색 방식입니다.' },
  { q: '브랜드 색상을 선택할 때 어떤 배색 방식을 추천하나요?', a: '브랜드 메인 컬러 1개와 그 유사색 또는 단색 계열을 서브 컬러로 조합하는 것이 안전합니다. 강한 인상을 원한다면 보색이나 삼각배색을 사용하되, 메인 컬러를 포인트로 제한하고 무채색을 보조로 활용하면 균형 잡힌 브랜드 아이덴티티를 만들 수 있습니다.' },
  { q: '사색 배색(Tetradic/Square)이란 무엇인가요?', a: '색상환에서 90° 간격으로 4가지 색을 배치하는 방식입니다. 풍부한 색감을 제공하지만 균형 잡기가 어려워 주 색상 1개, 나머지 3개를 보조로 사용하는 것이 좋습니다.' },
]

export default function PaletteGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '색상 팔레트 생성기',
    description: '기준 색상에서 보색·유사색·삼각배색 등 조화로운 팔레트를 자동으로 생성하는 온라인 도구',
    url: `${BASE_URL}/color/palette-generator/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="palette-generator" faqs={faqs}>
        <PaletteGenerator />
      </ToolLayout>
    </>
  )
}
