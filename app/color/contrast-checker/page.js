import ToolLayout from '@/components/color/ToolLayout'
import ContrastChecker from '@/components/color/ContrastChecker'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '명도 대비 검사기 — WCAG AA·AAA 접근성 기준 자동 확인',
  description: '두 색상의 명도 대비 비율(Contrast Ratio)을 측정해 WCAG 2.1 AA·AAA 기준 통과 여부를 즉시 확인. 텍스트·UI 색상 접근성 검사.',
  keywords: ['명도 대비 검사기', 'WCAG 검사', '색상 접근성', 'contrast checker', 'color contrast ratio', 'WCAG AA 기준', '웹 접근성 색상', '텍스트 대비 검사', '색상 대비 비율', 'accessibility contrast'],
  alternates: { canonical: `${BASE_URL}/color/contrast-checker/` },
  openGraph: {
    title: '명도 대비 검사기 — WCAG AA·AAA 접근성 기준 자동 확인 | serenkit',
    description: 'WCAG 2.1 AA·AAA 기준으로 두 색상의 명도 대비 비율 즉시 측정. 텍스트 접근성 확인.',
    url: `${BASE_URL}/color/contrast-checker/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '명도 대비 검사기 - serenkit' }],
  },
}

const faqs = [
  { q: 'WCAG 명도 대비 기준은 무엇인가요?', a: 'WCAG 2.1 기준으로 일반 텍스트는 AA 등급을 위해 4.5:1 이상, AAA는 7:1 이상이 필요합니다. 큰 텍스트(18pt 이상)는 각각 3:1, 4.5:1 이상입니다.' },
  { q: '왜 색상 접근성이 중요한가요?', a: '색약·저시력 사용자가 텍스트를 읽을 수 있도록 충분한 명도 대비가 필요합니다. 대부분의 국가에서 웹 접근성 가이드라인을 법적으로 요구하기도 합니다.' },
  { q: '명도 대비를 높이려면 어떻게 하나요?', a: '배경색과 텍스트 색의 밝기 차이를 키우면 됩니다. 일반적으로 어두운 배경에는 밝은 텍스트, 밝은 배경에는 어두운 텍스트를 사용하면 충분한 대비를 확보할 수 있습니다.' },
  { q: 'WCAG는 어떤 기관에서 만든 기준인가요?', a: 'WCAG(Web Content Accessibility Guidelines)는 W3C(World Wide Web Consortium)에서 제정한 웹 접근성 국제 표준입니다. 현재 WCAG 2.1이 가장 널리 적용되며, 한국의 웹 접근성 지침(KWCAG)도 이를 기반으로 합니다.' },
  { q: 'AA 기준만 맞추면 충분한가요?', a: '대부분의 서비스에서는 AA 기준(일반 텍스트 4.5:1)을 목표로 합니다. AAA(7:1)는 장애인 전문 서비스나 공공기관에서 요구될 수 있습니다. 버튼·아이콘 등 UI 컴포넌트는 3:1 이상(AA Large)을 권장합니다.' },
  { q: '흰 배경에 회색 텍스트는 접근성 기준을 통과하나요?', a: '배경색 #ffffff 기준으로, 텍스트 색이 #767676(gray)보다 어두워야 AA 기준 4.5:1을 통과합니다. 자주 사용하는 text-gray-400(#9ca3af) 같은 밝은 회색은 AA를 통과하지 못하는 경우가 많으므로 검사 후 사용하는 것이 좋습니다.' },
  { q: '색약 사용자를 위한 추가 고려사항이 있나요?', a: '명도 대비만으로는 부족할 수 있습니다. 색상으로만 정보를 전달하지 않고 아이콘·패턴·텍스트를 함께 사용하세요. 빨강-초록 조합은 적록 색약 사용자에게 구분이 어렵기 때문에 특히 주의해야 합니다.' },
]

export default function ContrastCheckerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '명도 대비 검사기',
    description: 'WCAG 접근성 기준에 따라 두 색상의 명도 대비 비율을 측정하는 온라인 도구',
    url: `${BASE_URL}/color/contrast-checker/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
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
