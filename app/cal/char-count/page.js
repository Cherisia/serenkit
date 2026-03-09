import CalcLayout from '@/components/calculator/CalcLayout'
import CharCountCalc from '@/components/calculator/CharCountCalc'

export const metadata = {
  title: '글자수 세기',
  description: '텍스트를 입력하면 공백 포함/제외 글자수, 바이트 수, 단어 수, 줄 수를 실시간으로 계산해요. 자기소개서·트위터·SMS 글자 제한도 바로 확인하세요.',
  keywords: ['글자수 세기', '글자수 계산기', '공백 포함 글자수', '공백 제외 글자수', '바이트 계산기', '자기소개서 글자수', '단어 수 세기', '문자 수 계산', '글자 수 확인', 'byte 계산'],
  alternates: { canonical: 'https://serenkit.com/cal/char-count/' },
  openGraph: {
    title: '글자수 세기 - serenkit',
    description: '텍스트를 입력하면 공백 포함/제외 글자수, 바이트 수, 단어 수를 실시간으로 계산해요. 자기소개서·트위터·SMS 글자 제한도 바로 확인하세요.',
    url: 'https://serenkit.com/cal/char-count/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '글자수 세기',
  url: 'https://serenkit.com/cal/char-count/',
  description: '텍스트를 입력하면 공백 포함/제외 글자수, 바이트 수, 단어 수, 줄 수를 실시간으로 계산합니다.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  inLanguage: 'ko-KR',
}

const faqs = [
  {
    q: '자기소개서 글자수는 공백 포함인가요?',
    a: '대부분의 채용 플랫폼(사람인, 잡코리아, 링크드인 등)은 공백 포함 글자수를 기준으로 합니다. 다만 회사나 플랫폼마다 기준이 다를 수 있으니 공고의 안내 문구를 꼭 확인하세요.',
  },
  {
    q: '바이트 수와 글자수는 왜 다른가요?',
    a: '한글·한자·특수문자는 2바이트, 영문·숫자·기호는 1바이트로 계산하기 때문입니다(EUC-KR 기준). 예를 들어 "안녕"은 2글자이지만 4바이트입니다.',
  },
  {
    q: 'SMS 단문은 몇 자까지 보낼 수 있나요?',
    a: 'SMS 단문은 90바이트 제한이 있어요. 한글은 1자당 2바이트이므로 한글만 쓸 경우 최대 45자까지 전송 가능합니다. 90바이트를 초과하면 장문(LMS, 최대 2,000바이트)으로 자동 전환됩니다.',
  },
  {
    q: '트위터/X 글자 제한은 몇 자인가요?',
    a: '트위터/X는 기본 280자 제한입니다. URL은 길이와 관계없이 23자로 고정 계산되며, 한글·일본어 등 일부 문자는 2글자로 계산될 수 있습니다. 이 계산기는 순수 글자수 기준으로 표시합니다.',
  },
  {
    q: '인스타그램 캡션 글자 제한은 얼마인가요?',
    a: '인스타그램 캡션은 최대 2,200자까지 작성 가능합니다. 단, 피드에서는 첫 125자 이후 "더 보기"로 잘려 보이므로 핵심 내용을 앞부분에 작성하는 것이 좋습니다.',
  },
]

export default function Page() {
  return (
    <CalcLayout
      title="✍️ 글자수 세기"
      desc="공백 포함/제외 · 바이트 · 단어 수 실시간 계산"
      currentUrl="/cal/char-count/"
      faqs={faqs}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CharCountCalc />
    </CalcLayout>
  )
}
