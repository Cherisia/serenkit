import ToolLayout from '@/components/color/ToolLayout'
import TailwindPalette from '@/components/color/TailwindPalette'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '테일윈드 색상표 - Tailwind CSS 모든 색상',
  description: 'Tailwind CSS의 모든 색상을 한눈에 탐색하고 클래스명 또는 HEX 코드를 복사합니다. slate, gray, emerald, teal 등 22가지 색상 계열.',
  keywords: ['Tailwind 색상표', 'Tailwind CSS colors', '테일윈드 색상', 'tailwind palette', 'tailwind color picker'],
  alternates: { canonical: `${BASE_URL}/color/tailwind-palette/` },
  openGraph: {
    title: '테일윈드 색상표 - serenkit',
    description: 'Tailwind CSS 모든 색상 한눈에 탐색, 클래스명·HEX 복사',
    url: `${BASE_URL}/color/tailwind-palette/`,
  },
}

const faqs = [
  { q: 'Tailwind CSS 색상 클래스는 어떻게 사용하나요?', a: 'bg-emerald-500, text-teal-600 처럼 색상 이름과 숫자를 조합해 사용합니다. 숫자가 클수록 색상이 어두워집니다.' },
  { q: '클래스명 복사와 HEX 복사의 차이는?', a: '클래스명 복사는 emerald-500 같은 Tailwind 클래스명을, HEX 복사는 #10b981 같은 6자리 색상 코드를 클립보드에 저장합니다.' },
  { q: 'Tailwind v4에서도 동일한 색상을 사용하나요?', a: '네, 이 색상표는 Tailwind CSS v3/v4 모두에서 동일하게 사용할 수 있는 기본 팔레트를 제공합니다.' },
]

export default function TailwindPalettePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '테일윈드 색상표',
    description: 'Tailwind CSS 모든 색상을 탐색하고 클래스명 또는 HEX를 복사하는 무료 온라인 도구',
    url: `${BASE_URL}/color/tailwind-palette/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
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
