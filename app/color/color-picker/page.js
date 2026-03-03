import ToolLayout from '@/components/color/ToolLayout'
import ColorPicker from '@/components/color/ColorPicker'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 피커 - 비주얼 컬러 피커',
  description: '비주얼 컬러 피커로 원하는 색상을 선택하고 HEX, RGB, HSL, CMYK, Tailwind 등 모든 포맷 코드를 복사합니다.',
  keywords: ['색상 피커', '컬러 피커', 'color picker', 'HEX 색상 선택', 'RGB 슬라이더'],
  alternates: { canonical: `${BASE_URL}/color/color-picker/` },
  openGraph: {
    title: '색상 피커 - serenkit',
    description: '비주얼 컬러 피커로 색상 선택 및 모든 포맷 코드 복사',
    url: `${BASE_URL}/color/color-picker/`,
  },
}

const faqs = [
  { q: '색상 피커를 어떻게 사용하나요?', a: '왼쪽 큰 색상 선택기를 클릭하거나 HEX 코드를 직접 입력해 색상을 설정하세요. 아래 빠른 선택 버튼으로 자주 쓰는 색상을 바로 선택할 수도 있습니다.' },
  { q: 'RGB 슬라이더는 무엇인가요?', a: 'Red, Green, Blue 각 채널 값을 0-255 범위에서 슬라이더로 조절해 색상을 만들 수 있습니다. 직관적인 색상 혼합이 가능합니다.' },
  { q: '복사한 색상 코드를 어디에 쓸 수 있나요?', a: 'CSS 파일, Tailwind 설정, Figma/Sketch 등 디자인 툴, 개발 코드 어디서나 바로 붙여넣기 하면 됩니다.' },
]

export default function ColorPickerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '색상 피커',
    description: '비주얼 컬러 피커로 색상을 선택하고 모든 포맷 코드를 복사하는 무료 온라인 도구',
    url: `${BASE_URL}/color/color-picker/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="color-picker" faqs={faqs}>
        <ColorPicker />
      </ToolLayout>
    </>
  )
}
