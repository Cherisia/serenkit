import './globals.css'
import Script from 'next/script'
import Navbar from '@/components/share/Navbar'
import Footer from '@/components/share/Footer'
import CookieBanner from '@/components/share/CookieBanner'
import { FavoritesProvider } from '@/components/share/FavoritesProvider'

const BASE_URL = 'https://serenkit.com'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'serenkit — 숫자가 필요한 순간',
    template: '%s | serenkit',
  },
  description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 양력 음력 변환까지 생활에 필요한 모든 계산기가 모여 있어요.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    other: {
      'naver-site-verification': 'bbad3f80de8df232b88deb29abbda71d2159c1da',
      'google-adsense-account': 'ca-pub-7505734558280029',
    },
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'serenkit — 숫자가 필요한 순간',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 양력 음력 변환까지 생활에 필요한 모든 계산기가 모여 있어요.',
    url: BASE_URL,
    type: 'website',
    siteName: 'serenkit',
    locale: 'ko_KR',
    images: [{ url: '/og-image.png?v=2', width: 1200, height: 630, alt: 'serenkit - 숫자가 필요한 순간' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'serenkit — 숫자가 필요한 순간',
    description: 'D-day, 날짜 차이, 영업일, 만 나이, 기념일, 월급 실수령액, 띠/별자리, 양력 음력 변환까지 생활에 필요한 모든 계산기가 모여 있어요.',
    images: ['/og-image.png?v=2'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'serenkit',
  url: BASE_URL,
  description: '숫자가 필요한 순간, 생활 계산기 모음 서비스',
  inLanguage: 'ko-KR',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FavoritesProvider>
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
        </FavoritesProvider>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7505734558280029"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
