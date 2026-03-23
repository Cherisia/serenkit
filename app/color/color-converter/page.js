import ToolLayout from '@/components/color/ToolLayout'
import ColorConverter from '@/components/color/ColorConverter'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 포맷 변환기 — HEX·RGB·HSL·CMYK·Tailwind 즉시 변환',
  description: 'HEX, RGB, RGBA, HSL, HSLA, HSB, CMYK, Tailwind 등 모든 색상 포맷을 한 번에 변환. 색상 코드 복사 기능 포함.',
  keywords: ['색상 변환기', 'HEX RGB 변환', 'HSL 변환', 'CMYK 변환', 'Tailwind 색상 변환', 'color converter', '색상 포맷 변환', 'HEX HSL 변환', 'RGB CMYK 변환', '색상 코드 변환기'],
  alternates: { canonical: `${BASE_URL}/color/color-converter/` },
  openGraph: {
    title: '색상 포맷 변환기 — HEX·RGB·HSL·CMYK·Tailwind 즉시 변환 | serenkit',
    description: 'HEX, RGB, HSL, CMYK, Tailwind 모든 색상 포맷 즉시 변환. 색상 코드 원클릭 복사.',
    url: `${BASE_URL}/color/color-converter/`,
  },
}

const faqs = [
  { q: 'HEX 코드는 무엇인가요?', a: 'HEX는 16진수(Hexadecimal)를 의미하며, 색상을 6자리 16진수로 표현합니다. 예: #6366f1은 인디고 계열 색상입니다. 각 2자리가 R, G, B 값을 나타냅니다.' },
  { q: 'RGB와 RGBA의 차이는?', a: 'RGB는 Red, Green, Blue 세 가지 색상 채널(각 0-255)로 색상을 표현합니다. RGBA는 여기에 투명도(Alpha, 0-1)를 추가한 것입니다.' },
  { q: 'HSL이란 무엇인가요?', a: 'HSL은 Hue(색상, 0-360°), Saturation(채도, 0-100%), Lightness(명도, 0-100%)로 색상을 표현합니다. 직관적으로 색상을 조정할 수 있어 디자이너에게 유용합니다.' },
  { q: 'Tailwind 색상을 어떻게 변환하나요?', a: 'HEX, RGB, HSL 등 어떤 포맷으로 입력해도 가장 가까운 Tailwind CSS 색상 클래스명(예: emerald-500)을 자동으로 찾아드립니다.' },
]

export default function ColorConverterPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '색상 포맷 변환기',
    description: 'HEX, RGB, HSL, CMYK, Tailwind 등 모든 색상 포맷을 변환하는 무료 온라인 도구',
    url: `${BASE_URL}/color/color-converter/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="color-converter" faqs={faqs}>
        <ColorConverter />
      </ToolLayout>
    </>
  )
}
