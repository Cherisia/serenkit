import CalcLayout from '@/components/calculator/CalcLayout'
import LunarCalc from '@/components/calculator/LunarCalc'

export const metadata = {
  title: '양력 음력 변환기',
  description: '양력을 음력으로, 음력을 양력으로 즉시 변환해요. 윤달 여부, 간지(갑자) 정보까지 한번에 확인하세요.',
  keywords: ['양력 음력 변환', '음력 양력 변환', '음력 계산기', '양력 변환기', '윤달 계산', '간지 계산', '갑자 계산', '음력 날짜 변환'],
  alternates: { canonical: 'https://serenkit.com/cal/lunar/' },
  openGraph: {
    title: '양력 음력 변환기 | serenkit',
    description: '양력을 음력으로, 음력을 양력으로 즉시 변환해요.',
    url: 'https://serenkit.com/cal/lunar/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '양력 음력 변환기 | serenkit' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '양력 음력 변환기',
  url: 'https://serenkit.com/cal/lunar/',
  description: '양력과 음력을 상호 변환하는 계산기',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://serenkit.com/' },
      { '@type': 'ListItem', position: 2, name: '양력 음력 변환기', item: 'https://serenkit.com/cal/lunar/' },
    ],
  },
}

const faqs = [
  { q: '양력과 음력은 어떻게 다른가요?', a: '양력(그레고리력)은 태양의 공전주기를 기준으로 한 365일(윤년 366일) 달력이고, 음력은 달의 삭망 주기(약 29.5일)를 기준으로 한 달력이에요. 한국 음력은 태양의 움직임도 반영한 태음태양력으로, 실제 계절과 크게 어긋나지 않아요.' },
  { q: '윤달(윤월)이란 무엇인가요?', a: '음력은 1년이 약 354일로 양력보다 11일 짧아, 3년에 한 번꼴로 한 달을 추가합니다. 이 추가된 달을 윤달(閏月)이라고 해요. 윤달이 있는 해는 음력으로 13개월이 됩니다. 윤달에는 이사, 결혼, 제사 등을 금하는 전통이 있어요.' },
  { q: '간지(갑자, 干支)란 무엇인가요?', a: '간지는 10천간(甲乙丙丁戊己庚辛壬癸)과 12지지(子丑寅卯辰巳午未申酉戌亥)를 조합해 60년 주기로 해·월·일을 나타내는 동양 전통 시간 표기법이에요. 갑자, 을축, 병인... 으로 이어지며 60개 조합이 반복됩니다.' },
  { q: '음력 생일을 양력으로 바꾸면 매년 달라지나요?', a: '네, 음력 생일에 해당하는 양력 날짜는 매년 달라집니다. 음력 1년과 양력 1년의 길이가 달라 매년 약 11일씩 차이가 생기기 때문이에요. 음력→양력 변환 탭에서 연도를 바꿔가며 확인할 수 있어요.' },
  { q: '지원하는 날짜 범위는 어디까지인가요?', a: '1900년 1월 31일(음력 1900년 1월 1일)부터 2050년까지 지원합니다. 그 외 범위의 날짜는 정확한 변환이 어려울 수 있어요.' },
]

export default function Page() {
  return (
    <CalcLayout title="🌙 양력 음력 변환기" desc="양력↔음력 상호 변환 및 간지(갑자) 확인" currentUrl="/cal/lunar" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LunarCalc />
    </CalcLayout>
  )
}
