import ToolLayout from '@/components/color/ToolLayout'
import GradientGenerator from '@/components/color/GradientGenerator'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '그라디언트 생성기 - CSS 그라디언트 코드 생성',
  description: '색상과 방향을 선택해 CSS 선형·방사형·원뿔형 그라디언트 코드를 시각적으로 생성합니다. Tailwind 클래스명도 함께 제공합니다.',
  keywords: ['CSS 그라디언트', '그라디언트 생성기', 'gradient generator', 'linear-gradient', 'Tailwind gradient'],
  alternates: { canonical: `${BASE_URL}/color/gradient-generator/` },
  openGraph: {
    title: '그라디언트 생성기 - serenkit',
    description: 'CSS 선형·방사형·원뿔형 그라디언트 코드를 시각적으로 생성',
    url: `${BASE_URL}/color/gradient-generator/`,
  },
}

const faqs = [
  { q: '선형·방사형·원뿔형 그라디언트 차이는?', a: '선형(linear)은 직선 방향으로 색상이 변하고, 방사형(radial)은 원 중심에서 바깥쪽으로 변하며, 원뿔형(conic)은 원을 따라 회전하며 색상이 변합니다.' },
  { q: '색상 포인트를 몇 개까지 추가할 수 있나요?', a: '최대 5개까지 색상 포인트를 추가할 수 있습니다. 각 포인트의 색상을 색상 선택기 또는 HEX 코드로 지정할 수 있습니다.' },
  { q: '생성된 CSS를 어떻게 사용하나요?', a: '복사 버튼을 눌러 CSS 코드를 복사한 후 CSS 파일의 background 또는 background-image 속성에 붙여넣으면 됩니다.' },
]

export default function GradientGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '그라디언트 생성기',
    description: 'CSS 그라디언트 코드를 시각적으로 생성하는 무료 온라인 도구',
    url: `${BASE_URL}/color/gradient-generator/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ToolLayout toolKey="gradient-generator" faqs={faqs}>
        <GradientGenerator />
      </ToolLayout>
    </>
  )
}
