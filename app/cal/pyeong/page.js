import CalcLayout from '@/components/calculator/CalcLayout'
import PyeongCalc from '@/components/calculator/PyeongCalc'

export const metadata = {
  title: '평수 계산기',
  description: '평↔m² 즉시 변환! 아파트 평수를 제곱미터로, 제곱미터를 평수로 실시간 계산해요. 공급면적·전용면적 기준 아파트 평형 참고표도 확인하세요.',
  keywords: ['평수 계산기', '평 m2 변환', '제곱미터 평수', '아파트 평수 계산', '평방미터 평수 변환', '평 계산기', '공급면적 전용면적', '평수 m2'],
  alternates: { canonical: 'https://serenkit.com/cal/pyeong/' },
  openGraph: {
    title: '평수 계산기 - serenkit',
    description: '평↔m² 즉시 변환! 아파트 평수를 제곱미터로, 제곱미터를 평수로 실시간 계산해요.',
    url: 'https://serenkit.com/cal/pyeong/',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '평수 계산기',
  url: 'https://serenkit.com/cal/pyeong/',
  description: '평↔m² 즉시 변환 및 아파트 평수 참고표를 제공합니다.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  inLanguage: 'ko-KR',
}

const faqs = [
  {
    q: '1평은 몇 m²인가요?',
    a: '1평은 약 3.3058m²(정확히는 400/121m²)입니다. 반대로 1m²는 약 0.3025평입니다.',
  },
  {
    q: '아파트 34평은 몇 m²인가요?',
    a: '34평은 약 112.4m²입니다. 한국에서 가장 인기 있는 평형으로, 거실·방 3개·화장실 2개 구성이 일반적입니다.',
  },
  {
    q: '공급면적과 전용면적의 차이는 무엇인가요?',
    a: '공급면적은 전용면적(실제 생활 공간)에 계단·복도 등 공용면적을 합산한 넓이입니다. 아파트 광고에 표기되는 "○○평"은 대부분 공급면적 기준이며, 실제 생활 공간인 전용면적은 공급면적보다 약 20~25% 작습니다.',
  },
  {
    q: '국민 평수는 몇 평인가요?',
    a: '흔히 25평(전용 59m²) 또는 32~34평(전용 84m²)을 국민 평수라고 부릅니다. 전용 84m²는 4인 가족이 살기에 적합한 크기로 가장 많이 공급되는 평형입니다.',
  },
  {
    q: '오피스텔 평수는 아파트와 같은 기준인가요?',
    a: '오피스텔은 전용면적과 공급면적 차이가 아파트보다 큽니다. 동일한 면적(m²)이라도 오피스텔은 공용면적 비율이 높아 실제 생활 공간이 더 좁게 느껴질 수 있어요.',
  },
]

export default function Page() {
  return (
    <CalcLayout
      title="📐 평수 계산기"
      desc="평 ↔ m² 실시간 변환 · 아파트 평형 참고표"
      currentUrl="/cal/pyeong"
      faqs={faqs}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PyeongCalc />
    </CalcLayout>
  )
}
