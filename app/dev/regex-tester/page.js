import DevLayout from '@/components/dev/DevLayout'
import RegexTester from '@/components/dev/RegexTester'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  title: '정규식 테스터 — 실시간 Regex 매치 확인·캡처 그룹 파싱',
  description: '정규식(Regex)을 입력해 실시간으로 매치를 하이라이트 확인. g·i·m·s·u 플래그, 캡처 그룹 파싱, 이메일·전화번호 등 예제 패턴 제공.',
  keywords: ['정규식 테스터', 'regex tester', '정규표현식', 'regexp 테스트', '정규식 검사기', '정규식 매치', '정규식 예제', '정규식 온라인', 'regex online', '정규식 캡처 그룹'],
  alternates: { canonical: `${BASE_URL}/dev/regex-tester/` },
  openGraph: {
    title: '정규식 테스터 — 실시간 Regex 매치 확인·캡처 그룹 파싱 | serenkit',
    description: '정규식 실시간 매치 확인. g·i·m 플래그, 캡처 그룹, 이메일·전화번호 예제 패턴 제공.',
    url: `${BASE_URL}/dev/regex-tester/`,
    type: 'website',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '정규식 테스터',
  url: `${BASE_URL}/dev/regex-tester/`,
  description: '정규식(Regex)을 실시간으로 테스트하고 매치 결과와 캡처 그룹을 확인합니다.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}

const faqs = [
  { q: '정규식(Regular Expression)이란 무엇인가요?', a: '정규식은 문자열에서 특정 패턴을 검색·추출·치환하기 위한 표현 언어입니다. JavaScript, Python, Java 등 대부분의 프로그래밍 언어와 텍스트 에디터에서 지원합니다.' },
  { q: 'g 플래그를 켜야 하나요?', a: 'g(global) 플래그를 켜면 문자열 전체에서 모든 매치를 찾습니다. 끄면 첫 번째 매치만 반환합니다. 대부분의 경우 g 플래그를 켠 상태로 사용하는 것이 편리합니다.' },
  { q: '캡처 그룹은 어떻게 사용하나요?', a: '패턴에서 소괄호 ()로 감싼 부분이 캡처 그룹이 됩니다. 예를 들어 (\\d{4})-(\\d{2})-(\\d{2})는 연·월·일을 각각 그룹 1, 2, 3으로 캡처합니다. 매치 결과 하단의 캡처 그룹 테이블에서 확인할 수 있습니다.' },
  { q: '한글 검색은 어떻게 하나요?', a: '[가-힣]+ 패턴으로 한글 문자를 매치할 수 있습니다. Unicode 범위를 활용하며, u 플래그와 함께 사용하면 더 정확한 Unicode 처리가 됩니다. 예제 패턴에서 "한글" 버튼을 클릭하면 자동으로 입력됩니다.' },
  { q: '이메일·전화번호 패턴은 어떻게 쓰나요?', a: '예제 패턴 버튼을 클릭하면 이메일, 한국 전화번호, 사업자등록번호, URL, 날짜, IP 주소 등 자주 쓰는 패턴이 자동으로 입력됩니다. 필요에 따라 직접 수정하여 사용하세요.' },
  { q: '정규식 오류가 발생하는 이유는?', a: '괄호·대괄호의 짝이 맞지 않거나, 수량자(*, +, ?)가 잘못 사용되거나, 특수문자 이스케이프(\\)가 누락된 경우 오류가 발생합니다. 패턴 입력란 아래에 오류 메시지가 표시됩니다.' },
]

export default function Page() {
  return (
    <DevLayout toolKey="regex-tester" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RegexTester />
    </DevLayout>
  )
}
