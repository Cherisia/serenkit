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
  },
}

const faqs = [
  { q: '보색과 유사색의 차이는 무엇인가요?', a: '보색은 색상환에서 정반대(180°)에 위치한 색으로 강한 대비를 만들고, 유사색은 인접(30° 내외)한 색으로 자연스럽고 조화로운 느낌을 줍니다.' },
  { q: '삼각배색(Triadic)이란?', a: '색상환에서 120° 간격으로 배치된 3가지 색을 사용하는 배색 방식입니다. 균형 잡힌 대비와 풍부한 색감을 제공합니다.' },
  { q: '생성된 팔레트를 어떻게 저장하나요?', a: '각 색상 카드를 클릭하면 HEX 코드가 복사됩니다. 전체 복사 버튼으로 모든 색상을 쉼표로 구분해 한 번에 복사할 수 있습니다.' },
]

export default function PaletteGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '색상 팔레트 생성기',
    description: '기준 색상에서 조화로운 색상 팔레트를 자동으로 생성하는 무료 온라인 도구',
    url: `${BASE_URL}/color/palette-generator/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
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
