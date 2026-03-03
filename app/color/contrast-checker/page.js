import ToolLayout from '@/components/color/ToolLayout'
import ContrastChecker from '@/components/color/ContrastChecker'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '명도 대비 검사기 - WCAG 접근성 검사',
  description: 'WCAG 접근성 기준에 따라 두 색상의 명도 대비 비율을 측정합니다. AA·AAA 기준 통과 여부를 자동으로 확인합니다.',
  keywords: ['명도 대비', 'WCAG 검사', '색상 접근성', 'contrast checker', 'color contrast ratio'],
  alternates: { canonical: `${BASE_URL}/color/contrast-checker/` },
  openGraph: {
    title: '명도 대비 검사기 - serenkit',
    description: 'WCAG AA/AAA 기준으로 두 색상의 명도 대비 비율 자동 측정',
    url: `${BASE_URL}/color/contrast-checker/`,
  },
}

const faqs = [
  { q: 'WCAG 명도 대비 기준은 무엇인가요?', a: 'WCAG 2.1 기준으로 일반 텍스트는 AA 등급을 위해 4.5:1 이상, AAA는 7:1 이상이 필요합니다. 큰 텍스트(18pt 이상)는 각각 3:1, 4.5:1 이상입니다.' },
  { q: '왜 색상 접근성이 중요한가요?', a: '색약·저시력 사용자가 텍스트를 읽을 수 있도록 충분한 명도 대비가 필요합니다. 대부분의 국가에서 웹 접근성 가이드라인을 법적으로 요구하기도 합니다.' },
  { q: '명도 대비를 높이려면 어떻게 하나요?', a: '배경색과 텍스트 색의 밝기 차이를 키우면 됩니다. 일반적으로 어두운 배경에는 밝은 텍스트, 밝은 배경에는 어두운 텍스트를 사용하면 충분한 대비를 확보할 수 있습니다.' },
]

export default function ContrastCheckerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '명도 대비 검사기',
    description: 'WCAG 접근성 기준에 따라 두 색상의 명도 대비 비율을 측정하는 무료 온라인 도구',
    url: `${BASE_URL}/color/contrast-checker/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="contrast-checker" faqs={faqs}>
        <ContrastChecker />
      </ToolLayout>
    </>
  )
}
