import ToolLayout from '@/components/color/ToolLayout'
import ColorExtractor from '@/components/color/ColorExtractor'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '이미지 색상 추출기 - 이미지에서 색상 추출',
  description: '이미지를 업로드하면 주요 색상을 자동으로 추출해 HEX, RGB, HSL 코드로 제공합니다. JPG, PNG, GIF, WebP 지원.',
  keywords: ['이미지 색상 추출', '이미지에서 색상 추출', '색상 팔레트 추출', 'image color picker', 'color extractor'],
  alternates: { canonical: `${BASE_URL}/color/color-extractor/` },
  openGraph: {
    title: '이미지 색상 추출기 - serenkit',
    description: '이미지를 업로드하면 주요 색상을 자동으로 추출합니다',
    url: `${BASE_URL}/color/color-extractor/`,
  },
}

const faqs = [
  { q: '어떤 이미지 포맷을 지원하나요?', a: 'JPG, JPEG, PNG, GIF, WebP, BMP, SVG 등 브라우저에서 표시 가능한 모든 이미지 형식을 지원합니다.' },
  { q: '이미지가 서버로 전송되나요?', a: '아니요. 이미지 처리는 모두 브라우저에서 Canvas API를 통해 처리됩니다. 이미지 데이터가 서버로 전송되지 않아 개인정보가 완전히 보호됩니다.' },
  { q: '최대 몇 가지 색상을 추출할 수 있나요?', a: '기본적으로 이미지에서 최대 10가지 주요 색상을 추출합니다. 유사한 색상은 자동으로 병합됩니다.' },
  { q: '색상 코드를 어떻게 복사하나요?', a: '추출된 색상 목록에서 원하는 색상을 클릭하면 상세 정보가 표시됩니다. 각 포맷(HEX, RGB, HSL 등) 옆의 복사 버튼을 클릭하면 클립보드에 복사됩니다.' },
]

export default function ColorExtractorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '이미지 색상 추출기',
    description: '이미지에서 주요 색상을 자동으로 추출하는 무료 온라인 도구',
    url: `${BASE_URL}/color/color-extractor/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="color-extractor" faqs={faqs}>
        <ColorExtractor />
      </ToolLayout>
    </>
  )
}
