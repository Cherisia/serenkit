import DevLayout from '@/components/dev/DevLayout'
import Base64Tool from '@/components/dev/Base64Tool'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: 'Base64 인코더/디코더 - 텍스트 Base64 변환',
  description: '텍스트를 Base64로 인코딩하거나 Base64 문자열을 원문으로 디코딩합니다. 한글·이모지 유니코드 완전 지원.',
  keywords: ['Base64 인코딩', 'Base64 디코딩', 'Base64 변환기', 'base64 encode decode', 'JWT 디코딩', '데이터 인코딩'],
  alternates: { canonical: `${BASE_URL}/dev/base64/` },
  openGraph: {
    title: 'Base64 인코더/디코더 | serenkit',
    description: '텍스트를 Base64로 인코딩하거나 Base64 문자열을 원문으로 디코딩합니다.',
    url: `${BASE_URL}/dev/base64/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Base64 인코더/디코더',
  url: `${BASE_URL}/dev/base64/`,
  description: '텍스트를 Base64로 인코딩하거나 Base64 문자열을 원문으로 디코딩합니다.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqs = [
  { q: 'Base64 인코딩이란 무엇인가요?', a: 'Base64는 바이너리 데이터를 64개의 ASCII 문자(A-Z, a-z, 0-9, +, /)로 표현하는 인코딩 방식입니다. 이진 데이터를 텍스트 기반 시스템에서 안전하게 전송할 때 사용됩니다.' },
  { q: 'Base64는 어디에 사용되나요?', a: '이메일 첨부 파일(MIME), 이미지 data URI, JWT(JSON Web Token) 페이로드, HTTP 기본 인증(Authorization 헤더), Kubernetes 시크릿 등 다양한 곳에 활용됩니다.' },
  { q: '한글이나 이모지도 인코딩할 수 있나요?', a: '네, 지원됩니다. 유니코드 문자(한글, 이모지, 특수문자 등)를 UTF-8로 변환한 후 Base64 인코딩합니다. 디코딩 시에도 동일하게 처리됩니다.' },
  { q: 'Base64 인코딩 후 크기는 얼마나 늘어나나요?', a: '원본 대비 약 33% 크기가 증가합니다. 3바이트(24비트)를 4개의 Base64 문자로 표현하기 때문입니다. 끝에 패딩 문자(=)가 1~2개 붙을 수 있습니다.' },
  { q: '유효하지 않은 Base64 문자열이라고 나오는 이유는?', a: 'Base64 문자열은 A-Z, a-z, 0-9, +, / 문자만 포함해야 하며, 길이가 4의 배수여야 합니다(패딩 포함). 공백, 줄바꿈이 섞여 있거나 잘못된 형식이면 오류가 발생합니다.' },
]

export default function Page() {
  return (
    <DevLayout toolKey="base64" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Base64Tool />
    </DevLayout>
  )
}
