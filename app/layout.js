import './globals.css'
import Navbar from '@/components/share/Navbar'
import Footer from '@/components/share/Footer'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'serenKit | 무료 날짜 계산기 모음',
    template: '%s | serenKit',
  },
  description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일 등 생활에 필요한 모든 날짜 계산기를 무료로 제공합니다.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'serenKit | 무료 날짜 계산기 모음',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일 등 생활에 필요한 모든 날짜 계산기를 무료로 제공합니다.',
    url: BASE_URL,
    type: 'website',
    siteName: 'serenKit',
    locale: 'ko_KR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'serenKit 무료 날짜 계산기 모음' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'serenKit | 무료 날짜 계산기 모음',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일 등 생활에 필요한 모든 날짜 계산기를 무료로 제공합니다.',
    images: ['/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'serenKit',
  url: BASE_URL,
  description: '무료 날짜 계산기 모음 서비스',
  inLanguage: 'ko-KR',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
