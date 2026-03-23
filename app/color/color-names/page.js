import ToolLayout from '@/components/color/ToolLayout'
import ColorNames from '@/components/color/ColorNames'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '색상 이름 찾기 — HEX 코드로 CSS 색상 이름·Tailwind 클래스 검색',
  description: 'HEX 코드 입력 시 가장 가까운 CSS 색상 이름(140가지)과 Tailwind 클래스를 즉시 검색. 색상 이름 전체 목록과 직접 색상 클릭으로도 확인 가능.',
  keywords: ['CSS 색상 이름', '색상 이름 찾기', 'color name 검색', 'CSS named colors', 'Tailwind 색상 이름', 'HEX 색상 이름 변환', '색상 이름 목록', 'CSS 색상 코드 이름', 'named color 검색', 'color name finder'],
  alternates: { canonical: `${BASE_URL}/color/color-names/` },
  openGraph: {
    title: '색상 이름 찾기 — HEX 코드로 CSS 색상 이름·Tailwind 클래스 검색 | serenkit',
    description: 'HEX 코드로 가장 가까운 CSS 색상 이름·Tailwind 클래스 즉시 검색. 140가지 CSS 표준 색상 전체 목록 제공.',
    url: `${BASE_URL}/color/color-names/`,
  },
}

const faqs = [
  { q: 'CSS 색상 이름이란?', a: 'CSS에서 색상을 HEX나 RGB 대신 영어 이름으로 표현할 수 있습니다. red, blue, tomato, cornflowerblue 등 140가지 표준 색상 이름이 있습니다.' },
  { q: '완전히 일치하지 않아도 되나요?', a: '네, 입력한 HEX 코드와 가장 가까운(RGB 색상 거리가 최소인) 이름을 찾아드립니다. 정확히 일치하면 "완전 일치" 뱃지가 표시됩니다.' },
  { q: '어떤 색상 이름이 많이 쓰이나요?', a: '개발에서는 white, black, transparent가 자주 쓰이고, 디자인에서는 tomato, coral, steelblue, goldenrod 같은 이름도 많이 활용됩니다.' },
  { q: 'CSS 색상 이름을 HEX 대신 사용하면 어떤 장점이 있나요?', a: 'CSS 색상 이름은 가독성이 높아 코드 리뷰 시 의도를 바로 파악할 수 있습니다. 다만 정확한 색상 제어가 어려워 디자인 시스템이나 정밀한 브랜드 색상에는 HEX를 사용하는 것이 일반적입니다.' },
  { q: 'transparent는 CSS 색상 이름인가요?', a: '네, transparent는 rgba(0,0,0,0)과 동일한 완전 투명 색상으로 CSS 표준 색상 이름입니다. 배경 제거, 호버 효과 전환 등에 자주 사용됩니다.' },
  { q: 'CSS 색상 이름과 Tailwind 색상 이름은 어떻게 다른가요?', a: 'CSS 표준 색상 이름(red, tomato, steelblue 등)은 W3C에서 정의한 140가지 고정 이름입니다. Tailwind 색상 이름(red-500, sky-400 등)은 Tailwind CSS 프레임워크 전용으로, 명도 단계별로 체계화된 팔레트입니다.' },
  { q: '색상 이름을 검색할 때 HEX 코드 형식은 어떻게 입력하나요?', a: '# 기호 포함(#ff6347) 또는 제외(ff6347) 모두 입력 가능합니다. 3자리 단축형(#f63)도 지원합니다.' },
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
