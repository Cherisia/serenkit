import ToolLayout from '@/components/color/ToolLayout'
import GradientGenerator from '@/components/color/GradientGenerator'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '그라디언트 생성기 — CSS·Tailwind 그라디언트 코드 즉시 복사',
  description: '색상과 방향을 선택해 CSS linear-gradient·radial-gradient 코드를 시각적으로 생성. Tailwind 그라디언트 클래스도 즉시 복사.',
  keywords: ['그라디언트 생성기', 'CSS 그라디언트', 'gradient generator', 'linear-gradient 생성', 'Tailwind gradient', 'CSS 그라디언트 코드', '그라디언트 배경 코드', '선형 그라디언트', '방사형 그라디언트', 'CSS gradient maker'],
  alternates: { canonical: `${BASE_URL}/color/gradient-generator/` },
  openGraph: {
    title: '그라디언트 생성기 — CSS·Tailwind 그라디언트 코드 즉시 복사 | serenkit',
    description: 'CSS linear-gradient·radial-gradient 코드를 시각적으로 생성 후 즉시 복사.',
    url: `${BASE_URL}/color/gradient-generator/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: '그라디언트 생성기 - serenkit' }],
  },
}

const faqs = [
  { q: '선형·방사형·원뿔형 그라디언트 차이는?', a: '선형(linear)은 직선 방향으로 색상이 변하고, 방사형(radial)은 원 중심에서 바깥쪽으로 변하며, 원뿔형(conic)은 원을 따라 회전하며 색상이 변합니다.' },
  { q: '색상 포인트를 몇 개까지 추가할 수 있나요?', a: '최대 5개까지 색상 포인트를 추가할 수 있습니다. 각 포인트의 색상을 색상 선택기 또는 HEX 코드로 지정할 수 있습니다.' },
  { q: '생성된 CSS를 어떻게 사용하나요?', a: '복사 버튼을 눌러 CSS 코드를 복사한 후 CSS 파일의 background 또는 background-image 속성에 붙여넣으면 됩니다.' },
  { q: 'Tailwind CSS에서 그라디언트를 사용하는 방법은?', a: 'Tailwind에서는 bg-gradient-to-r from-blue-500 to-emerald-500 처럼 방향(to-r/to-br 등)과 from/via/to 색상 클래스를 조합합니다. 이 도구에서 생성된 Tailwind 클래스를 복사해 바로 적용할 수 있습니다.' },
  { q: '텍스트에 그라디언트를 적용하려면 어떻게 하나요?', a: 'CSS에서 텍스트 그라디언트는 background: linear-gradient(...)를 설정한 후 -webkit-background-clip: text와 -webkit-text-fill-color: transparent를 함께 적용합니다. Tailwind에서는 bg-clip-text text-transparent 클래스를 사용합니다.' },
  { q: '원뿔형(conic) 그라디언트는 어디에 활용하나요?', a: '원뿔형 그라디언트는 파이 차트, 색상환, 레이더 차트 배경, 로딩 스피너 등에 활용됩니다. CSS conic-gradient()로 생성하며, 현대 브라우저(Chrome 69+, Firefox 83+, Safari 12.1+)에서 모두 지원합니다.' },
  { q: '그라디언트 방향을 각도로 설정할 수 있나요?', a: '네, 선형 그라디언트의 방향은 0deg(아래→위), 90deg(왼쪽→오른쪽), 135deg(우상→좌하) 등 각도로 설정할 수 있습니다. to right, to bottom right 같은 키워드로도 표현 가능합니다.' },
]

export default function GradientGeneratorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '그라디언트 생성기',
    description: 'CSS·Tailwind 그라디언트 코드를 시각적으로 생성하는 온라인 도구',
    url: `${BASE_URL}/color/gradient-generator/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
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
