import ToolLayout from '@/components/color/ToolLayout'
import TailwindPalette from '@/components/color/TailwindPalette'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '테일윈드 색상표 — Tailwind CSS 전체 색상 탐색·HEX·클래스명 복사',
  description: 'Tailwind CSS 22가지 색상 계열 전체를 한눈에 탐색. 클래스명(emerald-500)과 HEX 코드를 원클릭 복사. slate, gray, blue, indigo, violet 등 모든 팔레트.',
  keywords: ['Tailwind 색상표', 'Tailwind CSS colors', '테일윈드 색상', 'tailwind palette', 'tailwind color picker', 'Tailwind 색상 코드', 'Tailwind 클래스 색상', 'tailwind HEX 복사', '테일윈드 팔레트', 'Tailwind CSS 색상 목록'],
  alternates: { canonical: `${BASE_URL}/color/tailwind-palette/` },
  openGraph: {
    title: '테일윈드 색상표 — Tailwind CSS 전체 색상 탐색·HEX·클래스명 복사 | serenkit',
    description: 'Tailwind CSS 22가지 색상 계열 전체 탐색. 클래스명·HEX 원클릭 복사.',
    url: `${BASE_URL}/color/tailwind-palette/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '테일윈드 색상표 - serenkit' }],
  },
}

const faqs = [
  { q: 'Tailwind CSS 색상 클래스는 어떻게 사용하나요?', a: 'bg-emerald-500, text-teal-600 처럼 색상 이름과 숫자를 조합해 사용합니다. 숫자가 클수록 색상이 어두워집니다.' },
  { q: '클래스명 복사와 HEX 복사의 차이는?', a: '클래스명 복사는 emerald-500 같은 Tailwind 클래스명을, HEX 복사는 #10b981 같은 6자리 색상 코드를 클립보드에 저장합니다.' },
  { q: 'Tailwind v4에서도 동일한 색상을 사용하나요?', a: '네, 이 색상표는 Tailwind CSS v3/v4 모두에서 동일하게 사용할 수 있는 기본 팔레트를 제공합니다.' },
  { q: 'Tailwind 기본 색상은 몇 가지인가요?', a: 'slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose 등 22가지 색상 계열이 있으며, 각 계열은 50~950 단계로 구성됩니다.' },
  { q: '숫자가 높을수록 어두워지는 이유는 무엇인가요?', a: 'Tailwind의 색상 스케일은 50(가장 밝음)부터 950(가장 어두움)까지 명도 기반으로 설계됐습니다. 배경에는 밝은 계열(50~200), 텍스트에는 어두운 계열(700~900)을 주로 사용합니다.' },
  { q: '커스텀 색상을 Tailwind에 추가하려면 어떻게 하나요?', a: 'tailwind.config.js의 theme.extend.colors에 색상 이름과 HEX 값을 추가하면 됩니다. Tailwind v4에서는 CSS 변수로 @theme 블록에 직접 정의할 수 있습니다.' },
  { q: 'Tailwind 색상 중 어떤 계열이 가장 많이 쓰이나요?', a: '실무에서는 slate(어두운 회색 계열), gray, blue, emerald, violet이 자주 쓰입니다. neutral과 stone은 따뜻한 느낌의 무채색이 필요할 때, sky와 cyan은 밝고 생동감 있는 파란색 계열이 필요할 때 활용됩니다.' },
]

export default function TailwindPalettePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '테일윈드 색상표',
    description: 'Tailwind CSS 22가지 색상 계열 전체를 탐색하고 클래스명·HEX를 복사하는 온라인 도구',
    url: `${BASE_URL}/color/tailwind-palette/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="tailwind-palette" faqs={faqs}>
        <TailwindPalette />
      </ToolLayout>
    </>
  )
}
