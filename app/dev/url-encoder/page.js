import DevLayout from '@/components/dev/DevLayout'
import UrlEncoderDecoder from '@/components/dev/UrlEncoderDecoder'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: 'URL 인코더/디코더 - percent-encoding 변환',
  description: 'URL에 포함할 수 없는 한글·특수문자를 percent-encoding으로 인코딩하거나 디코딩합니다. 실시간 변환.',
  keywords: ['URL 인코딩', 'URL 디코딩', 'percent encoding', 'encodeURIComponent', 'URL 변환기', 'URL 특수문자 인코딩'],
  alternates: { canonical: `${BASE_URL}/dev/url-encoder/` },
  openGraph: {
    title: 'URL 인코더/디코더 | serenkit',
    description: 'URL에 포함할 수 없는 한글·특수문자를 percent-encoding으로 실시간 인코딩/디코딩합니다.',
    url: `${BASE_URL}/dev/url-encoder/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'URL 인코더/디코더',
  url: `${BASE_URL}/dev/url-encoder/`,
  description: 'URL에 포함할 수 없는 한글·특수문자를 percent-encoding으로 인코딩하거나 디코딩합니다.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqs = [
  { q: 'URL 인코딩이란 무엇인가요?', a: 'URL에서 사용할 수 없는 문자(한글, 공백, 특수문자 등)를 %XX 형식의 16진수로 표현하는 방식입니다. 예를 들어 공백은 %20, 한글 "안"은 %EC%95%88으로 변환됩니다.' },
  { q: 'encodeURIComponent와 encodeURI의 차이는 무엇인가요?', a: 'encodeURIComponent는 /, ?, #, & 등 URL 구조 문자도 인코딩합니다. encodeURI는 URL 전체를 인코딩할 때 사용하며 이런 구조 문자는 그대로 둡니다. 이 도구는 encodeURIComponent 방식을 사용합니다.' },
  { q: '한글 URL은 왜 인코딩이 필요한가요?', a: 'HTTP 표준에서 URL은 ASCII 문자만 허용합니다. 한글이 URL에 포함되면 브라우저나 서버에 따라 다르게 처리될 수 있으므로, percent-encoding으로 변환하여 안전하게 전송해야 합니다.' },
  { q: '실시간 변환은 어떻게 작동하나요?', a: '텍스트를 입력하는 즉시 변환 결과가 표시됩니다. 별도로 버튼을 누를 필요 없이 입력할 때마다 자동으로 인코딩 또는 디코딩이 이루어집니다.' },
  { q: '잘못된 URL 인코딩이라고 나오는 이유는?', a: '%로 시작하는 시퀀스가 유효하지 않을 때 발생합니다. 예를 들어 %뒤에 16진수 2자리가 없거나, 중간에 잘린 경우입니다. 정상적인 percent-encoding 문자열인지 확인해 주세요.' },
]

export default function Page() {
  return (
    <DevLayout toolKey="url-encoder" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UrlEncoderDecoder />
    </DevLayout>
  )
}
