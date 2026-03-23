import DevLayout from '@/components/dev/DevLayout'
import UuidGenerator from '@/components/dev/UuidGenerator'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: 'UUID 생성기 — UUID v4·GUID 랜덤 생성 · 최대 10개 한번에',
  description: '암호학적으로 안전한 UUID v4를 최대 10개까지 즉시 생성. 개별·전체 복사 지원. DB PK, API 추적 ID, 세션 토큰 생성에 활용.',
  keywords: ['UUID 생성기', 'UUID v4', 'GUID 생성', 'UUID 생성', 'randomUUID', '고유 식별자 생성', 'UUID 온라인', 'UUID 생성 사이트', 'UUID generator', 'GUID generator'],
  alternates: { canonical: `${BASE_URL}/dev/uuid/` },
  openGraph: {
    title: 'UUID 생성기 — UUID v4·GUID 랜덤 생성 · 최대 10개 한번에 | serenkit',
    description: 'UUID v4를 최대 10개 즉시 생성. 개별·전체 복사. DB PK, API ID, 세션 토큰 생성.',
    url: `${BASE_URL}/dev/uuid/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UUID 생성기',
  url: `${BASE_URL}/dev/uuid/`,
  description: '암호학적으로 안전한 UUID v4를 최대 10개까지 즉시 생성합니다.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqs = [
  { q: 'UUID란 무엇인가요?', a: 'UUID(Universally Unique Identifier)는 전세계적으로 고유한 128비트 식별자입니다. 8-4-4-4-12 자리의 16진수를 하이픈으로 구분한 형식(예: 550e8400-e29b-41d4-a716-446655440000)으로 표현됩니다.' },
  { q: 'UUID v4는 무엇이 다른가요?', a: 'UUID에는 v1(타임스탬프 기반), v3/v5(이름 기반), v4(난수 기반) 등 버전이 있습니다. v4는 암호학적으로 안전한 난수(crypto.randomUUID)로 생성되어 예측이 불가능하고 가장 범용적으로 사용됩니다.' },
  { q: '같은 UUID가 중복 생성될 수 있나요?', a: '이론적으로는 가능하지만 확률이 천문학적으로 낮습니다. 10억 개를 생성했을 때 충돌 확률이 약 10억 분의 1 수준이므로 실무에서는 고유하다고 봐도 무방합니다.' },
  { q: 'UUID는 어디에 사용하나요?', a: '데이터베이스 기본키(PK), API 요청 추적 ID, 세션 토큰, 파일명 충돌 방지, 분산 시스템의 객체 식별자 등에 활용됩니다. 중앙 서버 없이 고유 ID를 생성할 수 있어 분산 환경에서 특히 유용합니다.' },
  { q: 'GUID와 UUID는 같은 건가요?', a: 'GUID(Globally Unique Identifier)는 Microsoft에서 사용하는 용어로, UUID와 동일한 개념입니다. 형식도 동일하며(8-4-4-4-12), 마이크로소프트 환경에서는 GUID, 그 외에서는 UUID로 부르는 경향이 있습니다.' },
]

export default function Page() {
  return (
    <DevLayout toolKey="uuid" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UuidGenerator />
    </DevLayout>
  )
}
