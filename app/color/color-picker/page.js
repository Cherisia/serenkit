import ToolLayout from '@/components/color/ToolLayout'
import ColorPicker from '@/components/color/ColorPicker'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 피커 — HEX·RGB·HSL·CMYK·Tailwind 코드 즉시 복사',
  description: '비주얼 컬러 피커로 원하는 색상을 선택하고 HEX, RGB, HSL, CMYK, Tailwind 등 모든 포맷 코드를 한 번에 복사. 온라인 컬러 피커.',
  keywords: ['색상 피커', '컬러 피커', 'color picker', 'HEX 색상 선택', 'RGB 슬라이더', '색상 코드 복사', '색상 선택기', 'HEX 코드 복사', '색상 팔레트 피커', 'CSS 색상 선택'],
  alternates: { canonical: `${BASE_URL}/color/color-picker/` },
  openGraph: {
    title: '색상 피커 — HEX·RGB·HSL·CMYK·Tailwind 코드 즉시 복사 | serenkit',
    description: '비주얼 컬러 피커로 색상 선택 후 HEX·RGB·HSL·CMYK·Tailwind 코드 한 번에 복사.',
    url: `${BASE_URL}/color/color-picker/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '색상 피커 - serenkit' }],
  },
}

const faqs = [
  { q: '색상 피커를 어떻게 사용하나요?', a: '왼쪽 큰 색상 선택기를 클릭하거나 HEX 코드를 직접 입력해 색상을 설정하세요. 아래 빠른 선택 버튼으로 자주 쓰는 색상을 바로 선택할 수도 있습니다.' },
  { q: 'RGB 슬라이더는 무엇인가요?', a: 'Red, Green, Blue 각 채널 값을 0-255 범위에서 슬라이더로 조절해 색상을 만들 수 있습니다. 직관적인 색상 혼합이 가능합니다.' },
  { q: '복사한 색상 코드를 어디에 쓸 수 있나요?', a: 'CSS 파일, Tailwind 설정, Figma/Sketch 등 디자인 툴, 개발 코드 어디서나 바로 붙여넣기 하면 됩니다.' },
  { q: 'HEX와 RGB 중 어떤 포맷을 써야 하나요?', a: 'HEX는 웹 CSS·HTML에서 가장 널리 쓰이고, RGB는 투명도(alpha)가 필요할 때 RGBA로 활용합니다. Figma·Sketch 등 디자인 툴은 HEX와 RGB를 모두 지원하므로 상황에 맞게 선택하면 됩니다.' },
  { q: 'CMYK는 언제 사용하나요?', a: 'CMYK는 인쇄 매체(명함, 포스터, 브로슈어)에서 사용하는 색상 모델입니다. 화면(모니터)은 RGB 기반이고, 인쇄물은 CMYK 기반이므로 인쇄 디자인 시 CMYK 값을 활용하면 색상 차이를 최소화할 수 있습니다.' },
  { q: 'HSL이 HEX보다 편리한 경우는 어떤 때인가요?', a: 'HSL은 색상(Hue)·채도(Saturation)·명도(Lightness)로 직관적으로 색상을 조절할 수 있어 테마 색상의 밝기·채도를 변형할 때 유용합니다. CSS 변수로 HSL을 쓰면 다크모드 전환 등 색상 조작이 쉬워집니다.' },
  { q: 'Tailwind 색상 코드를 찾으려면 어떻게 하나요?', a: '이 도구에서 색상을 선택하면 가장 가까운 Tailwind 클래스명(예: indigo-500)을 자동으로 표시합니다. 클릭 한 번으로 클래스명을 복사해 바로 사용하세요.' },
]

export default function ColorPickerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '색상 피커',
    description: '비주얼 컬러 피커로 색상을 선택하고 모든 포맷 코드를 복사하는 온라인 도구',
    url: `${BASE_URL}/color/color-picker/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
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
