import ToolLayout from '@/components/color/ToolLayout'
import ColorExtractor from '@/components/color/ColorExtractor'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '이미지 색상 추출기 — 사진에서 HEX·RGB 코드 추출, Ctrl+V 붙여넣기',
  description: '이미지를 업로드하거나 Ctrl+V로 붙여넣으면 주요 색상을 HEX·RGB·HSL·CMYK 코드와 색상 이름(CSS Name)으로 즉시 추출합니다. 브라우저에서 바로 처리, 서버 전송 없음. JPG·PNG·WebP 지원.',
  keywords: [
    '이미지 색상 추출기', '이미지에서 색상 추출기', '이미지에서 색상 추출', '사진에서 색상',
    '사진에서 hex 추출', '이미지에서 rgb 추출', '사진에서 색상 코드 추출', '이미지 색상 코드',
    '이미지에서 색상 복사', '색상 팔레트 추출', '이미지 색상 찾기', '이미지에서 색상 이름',
    '색 추출 사이트', '온라인 이미지 색상', 'image color picker', 'color extractor',
    '클립보드 색상 추출', '이미지에서 색상 선택기',
  ],
  alternates: { canonical: `${BASE_URL}/color/color-extractor/` },
  openGraph: {
    title: '이미지 색상 추출기 — 사진에서 HEX·RGB 코드 즉시 추출 | serenkit',
    description: '이미지 업로드 또는 Ctrl+V 붙여넣기로 주요 색상을 HEX·RGB·HSL·CMYK 코드와 색상 이름으로 즉시 추출. 서버 전송 없음.',
    url: `${BASE_URL}/color/color-extractor/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '이미지 색상 추출기 - serenkit' }],
  },
}

const faqs = [
  { q: '이미지 없이 클립보드에서 바로 색상을 추출할 수 있나요?', a: '네. 이미지를 복사한 후 페이지에서 Ctrl+V (Mac은 Cmd+V)를 누르면 파일 선택 없이 바로 색상을 추출할 수 있습니다. 스크린샷을 찍고 바로 붙여넣기하면 가장 빠르게 사용할 수 있어요.' },
  { q: '어떤 이미지 포맷을 지원하나요?', a: 'JPG, JPEG, PNG, GIF, WebP, BMP 등 브라우저에서 표시 가능한 모든 이미지 형식을 지원합니다.' },
  { q: '이미지가 서버로 전송되나요?', a: '아니요. 이미지 처리는 모두 브라우저에서 Canvas API를 통해 처리됩니다. 이미지 데이터가 서버로 전송되지 않아 개인정보가 완전히 보호됩니다.' },
  { q: '최대 몇 가지 색상을 추출할 수 있나요?', a: '기본적으로 이미지에서 최대 10가지 주요 색상을 추출합니다. 유사한 색상은 자동으로 병합됩니다.' },
  { q: '색상 이름(CSS Name)은 어떻게 표시되나요?', a: '추출된 색상과 가장 가까운 CSS 색상 이름(예: coral, steelblue, goldenrod)을 자동으로 표시합니다. 완전히 일치하지 않을 수 있으며, 가장 유사한 표준 CSS 색상명을 근사값으로 보여줍니다.' },
  { q: '색상 코드를 어떻게 복사하나요?', a: '추출된 색상 목록에서 원하는 색상을 클릭하면 상세 정보가 표시됩니다. 각 포맷(HEX, RGB, HSL 등) 옆의 복사 버튼을 클릭하면 클립보드에 복사됩니다.' },
  { q: '사진에서 복사한 HEX 코드를 어디에 쓸 수 있나요?', a: '복사한 HEX 코드는 Figma, Photoshop, Illustrator, CSS 코드, 파워포인트 등 색상 코드를 입력할 수 있는 모든 곳에서 사용할 수 있습니다. RGB 코드는 CSS `rgb()` 함수에 바로 쓸 수 있어요.' },
  { q: '색상이 너무 많이 추출되거나 원하는 색이 안 나와요. 어떻게 하나요?', a: '이미지를 원하는 색상 영역만 크롭한 뒤 업로드하면 더 정확한 결과를 얻을 수 있습니다. 배경색이 넓으면 배경 색상이 상위에 표시될 수 있어요.' },
  { q: 'PNG 투명 배경 이미지도 색상 추출이 되나요?', a: '네, PNG의 투명(알파) 영역은 색상 추출에서 자동으로 제외되어 실제 색상만 추출됩니다.' },
]

export default function ColorExtractorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '이미지 색상 추출기',
    description: '이미지나 사진에서 주요 색상을 자동으로 추출하는 온라인 도구. Ctrl+V 붙여넣기 지원, HEX·RGB·HSL·CMYK 코드와 CSS 색상 이름 제공.',
    url: `${BASE_URL}/color/color-extractor/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: '색상 도구', item: `${BASE_URL}/color/` },
        { '@type': 'ListItem', position: 3, name: '이미지 색상 추출기', item: `${BASE_URL}/color/color-extractor/` },
      ],
    },
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
            <li>스크린샷에서 색상 코드를 빠르게 확인해야 할 때 (Ctrl+V 붙여넣기)</li>
          </ul>
          <p className="mt-3 text-slate-400">이미지 파일을 업로드하면 서버로 전송 없이 브라우저에서 즉시 처리됩니다. JPG, PNG, WebP, GIF 등 모든 이미지 형식을 지원합니다.</p>
        </aside>
      </ToolLayout>
    </>
  )
}
