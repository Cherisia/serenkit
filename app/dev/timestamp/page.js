import DevLayout from '@/components/dev/DevLayout'
import TimestampConverter from '@/components/dev/TimestampConverter'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '타임스탬프 변환기 — Unix 타임스탬프 ↔ 날짜시간 · UTC·KST 변환',
  description: 'Unix 타임스탬프(초·밀리초)를 날짜시간으로, 날짜를 타임스탬프로 즉시 변환. UTC·KST 동시 표시, 현재 타임스탬프 자동 갱신.',
  keywords: ['타임스탬프 변환기', 'Unix timestamp 변환', '유닉스 타임스탬프', 'epoch 변환기', 'UTC KST 변환', '밀리초 변환', 'timestamp to date', '타임스탬프 계산기', '현재 타임스탬프', 'epoch time 변환'],
  alternates: { canonical: `${BASE_URL}/dev/timestamp/` },
  openGraph: {
    title: '타임스탬프 변환기 | serenkit',
    description: 'Unix 타임스탬프(초/밀리초)를 날짜시간으로, 날짜를 타임스탬프로 양방향 변환합니다.',
    url: `${BASE_URL}/dev/timestamp/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '타임스탬프 변환기',
  url: `${BASE_URL}/dev/timestamp/`,
  description: 'Unix 타임스탬프(초/밀리초)를 날짜시간으로, 날짜를 타임스탬프로 양방향 변환합니다.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqs = [
  { q: 'Unix 타임스탬프란 무엇인가요?', a: 'Unix 타임스탬프는 1970년 1월 1일 00:00:00 UTC부터 경과한 시간을 초 단위로 나타낸 숫자입니다. 프로그래밍에서 날짜·시간을 저장하고 비교하는 데 가장 널리 쓰입니다.' },
  { q: '초(s)와 밀리초(ms) 타임스탬프는 어떻게 구분하나요?', a: '13자리 이상이면 밀리초(ms), 10자리면 초(s)로 자동 인식됩니다. 초 타임스탬프는 약 10자리(1709280000), 밀리초는 약 13자리(1709280000000)입니다.' },
  { q: 'KST와 UTC의 차이는 무엇인가요?', a: 'KST(한국 표준시)는 UTC(협정 세계시)보다 9시간 앞서 있습니다(UTC+9). 같은 타임스탬프를 KST로 표시하면 UTC보다 9시간 더 늦은 시각이 표시됩니다.' },
  { q: '날짜 입력 시 어떤 시간대가 적용되나요?', a: '날짜/시간 문자열 입력 시 브라우저(운영체제) 로컬 시간대를 기준으로 처리됩니다. 시간대를 명시하려면 ISO 8601 형식(2026-03-01T12:00:00+09:00)을 사용하세요.' },
  { q: '"현재 시각" 버튼은 무엇인가요?', a: '클릭하면 현재 시간의 밀리초 타임스탬프를 자동으로 입력하고 변환합니다. 지금 이 순간의 타임스탬프를 빠르게 확인할 때 유용합니다.' },
]

export default function Page() {
  return (
    <DevLayout toolKey="timestamp" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TimestampConverter />
    </DevLayout>
  )
}
