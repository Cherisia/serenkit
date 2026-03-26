import ToolLayout from '@/components/color/ToolLayout'
import ColorExtractor from '@/components/color/ColorExtractor'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '이미지 색상 추출기 — 사진에서 색상 추출 · HEX RGB 코드',
  description: '이미지나 사진을 업로드하면 주요 색상을 자동으로 추출해 HEX, RGB, HSL 코드로 제공합니다. 색상 이름도 함께 확인할 수 있어요. JPG, PNG, GIF, WebP 지원. 서버 전송 없이 브라우저에서 바로 처리.',
  keywords: [
    '이미지 색상 추출기', '이미지에서 색상 추출기', '이미지에서 색상 추출', '사진에서 색상',
    '사진에서 색상 선택기', '이미지에서 색상 복사', '이미지에서 색상 식별기', '이미지에서 색상 식별',
    '이미지에서 색상 이름', '이미지에서 색상 이름 찾기', '색상 팔레트 추출', '이미지 색상 찾기',
    '색 추출 사이트', '온라인 이미지 색상', 'image color picker', 'color extractor',
  ],
  alternates: { canonical: `${BASE_URL}/color/color-extractor/` },
  openGraph: {
    title: '이미지 색상 추출기 — 사진에서 색상 추출 | serenkit',
    description: '이미지나 사진을 업로드하면 주요 색상을 자동으로 추출합니다. HEX·RGB·HSL 코드와 색상 이름 제공.',
    url: `${BASE_URL}/color/color-extractor/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '이미지 색상 추출기 - serenkit' }],
  },
}

const faqs = [
  { q: '어떤 이미지 포맷을 지원하나요?', a: 'JPG, JPEG, PNG, GIF, WebP, BMP, SVG 등 브라우저에서 표시 가능한 모든 이미지 형식을 지원합니다.' },
  { q: '이미지가 서버로 전송되나요?', a: '아니요. 이미지 처리는 모두 브라우저에서 Canvas API를 통해 처리됩니다. 이미지 데이터가 서버로 전송되지 않아 개인정보가 완전히 보호됩니다.' },
  { q: '최대 몇 가지 색상을 추출할 수 있나요?', a: '기본적으로 이미지에서 최대 10가지 주요 색상을 추출합니다. 유사한 색상은 자동으로 병합됩니다.' },
  { q: '색상 코드를 어떻게 복사하나요?', a: '추출된 색상 목록에서 원하는 색상을 클릭하면 상세 정보가 표시됩니다. 각 포맷(HEX, RGB, HSL 등) 옆의 복사 버튼을 클릭하면 클립보드에 복사됩니다.' },
  { q: '사진에서 특정 색상의 이름을 알 수 있나요?', a: '네, 이미지에서 추출된 색상에는 HEX·RGB·HSL 코드와 함께 가장 가까운 색상 이름(한국어·영어)도 함께 표시됩니다. 디자인 작업이나 색상 코드를 모를 때 유용해요.' },
  { q: '이미지에서 색상을 복사해서 어디에 쓸 수 있나요?', a: '복사한 HEX 코드는 Figma, Photoshop, Illustrator, CSS 코드, 파워포인트 등 색상 코드를 입력할 수 있는 모든 곳에서 사용할 수 있습니다. RGB 코드는 CSS `rgb()` 함수에 바로 쓸 수 있어요.' },
  { q: '색상이 너무 많이 추출되거나 원하는 색이 안 나와요. 어떻게 하나요?', a: '이미지를 원하는 색상 영역만 크롭한 뒤 업로드하면 더 정확한 결과를 얻을 수 있습니다. 배경색이 넓으면 배경 색상이 상위에 표시될 수 있어요.' },
  { q: 'PNG 투명 배경 이미지도 색상 추출이 되나요?', a: '네, PNG의 투명(알파) 영역은 색상 추출에서 자동으로 제외되어 실제 색상만 추출됩니다.' },
]

export default function ColorExtractorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '이미지 색상 추출기',
    description: '이미지나 사진에서 주요 색상을 자동으로 추출하는 온라인 도구. HEX, RGB, HSL 코드와 색상 이름 제공.',
    url: `${BASE_URL}/color/color-extractor/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="color-extractor" faqs={faqs}>
        <ColorExtractor />
        <aside className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-xs text-slate-500 leading-relaxed">
          <h3 className="font-bold text-slate-600 mb-2">💡 이런 상황에 활용하세요</h3>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>웹·앱 디자인 시 참고 이미지에서 정확한 HEX 색상 코드를 뽑아야 할 때</li>
            <li>브랜드 로고나 포스터에서 사용된 색상을 그대로 재현해야 할 때</li>
            <li>사진 속 마음에 드는 색상을 CSS, Figma, Photoshop에 바로 적용하고 싶을 때</li>
            <li>제품 이미지·인테리어 사진에서 색상 팔레트를 추출해 배색 참고로 활용할 때</li>
          </ul>
          <p className="mt-3 text-slate-400">이미지 파일을 업로드하면 서버로 전송 없이 브라우저에서 즉시 처리됩니다. JPG, PNG, WebP, GIF 등 모든 이미지 형식을 지원합니다.</p>
        </aside>
      </ToolLayout>
    </>
  )
}
