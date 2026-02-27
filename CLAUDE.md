# serenkit — Claude 작업 가이드

## 프로젝트 개요

한국어 생활 계산기 모음 사이트. Next.js App Router 기반 정적 사이트(Cloudflare Workers 배포).
URL: `https://serenkit.com`

## 기술 스택

- **Next.js 15** (App Router, `output: 'export'`, `trailingSlash: true`)
- **React 19**
- **Tailwind CSS v4** (`@tailwindcss/postcss` 플러그인 방식, `tailwind.config.js` 없음)
- **배포:** `wrangler` → Cloudflare Workers (`./out` 디렉토리)
- **특수 라이브러리:** `korean-lunar-calendar` (음력 변환)

## 프로젝트 구조

```
app/
  page.js                   # 홈 (카테고리별 카드 그리드 + JSON-LD)
  layout.js                 # 루트 레이아웃 (Navbar, Footer, 기본 메타데이터)
  cal/[calculator]/page.js  # 각 계산기 페이지 (메타데이터 + CalcLayout 래핑)
  privacy/, terms/

components/calculator/
  CalcLayout.js             # 공통 계산기 레이아웃 (배너 + 사이드바 + FAQ)
  FaqSection.js             # FAQ + JSON-LD FAQPage 스키마 자동 생성
  [Feature]Calc.js          # 각 계산기 로직+UI ('use client')
```

## 새 계산기 추가 체크리스트

1. **`components/calculator/[Feature]Calc.js`** — 계산기 컴포넌트 작성
2. **`app/cal/[slug]/page.js`** — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ, CalcLayout 래핑)
3. **`components/calculator/CalcLayout.js`** — `CATEGORIES` 배열에 항목 추가
4. **`app/page.js`** — `categories` 배열 카드 추가 + `jsonLd.itemListElement` 추가

## 계산기 컴포넌트 패턴

```js
'use client'
import { useState } from 'react'

// 1. 순수 계산 함수 (컴포넌트 외부)
function calcFeature({ input1, input2 }) { /* ... */ return result }

// 2. 상수 (UPPER_SNAKE_CASE)
const RATES = { ... }
const fmt = (n) => Math.floor(n).toLocaleString('ko-KR') + '원'
const INPUT_CLS = 'w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors'

// 3. 컴포넌트
export default function FeatureCalc() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => { /* 유효성 검사 → setResult */ }

  return (
    <div className="space-y-4">
      {/* 입력 섹션 */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">조건 입력</h2>
        {/* ... */}
        <button onClick={calculate} disabled={!input}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {/* 결과 섹션 */}
      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>
          {/* 메인 결과: 그라데이션 박스 → 상세 table */}
        </section>
      )}

      {/* 안내 */}
      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
        <p>...</p>
      </aside>
    </div>
  )
}
```

## 페이지 파일 패턴

```js
import CalcLayout from '@/components/calculator/CalcLayout'
import FeatureCalc from '@/components/calculator/FeatureCalc'

export const metadata = {
  title: '계산기 이름',
  description: '...',
  keywords: ['...'],
  alternates: { canonical: 'https://serenkit.com/cal/[slug]/' },
  openGraph: { title: '계산기 이름 | serenkit', description: '...', url: '...', type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', ... }

const faqs = [{ q: '질문?', a: '답변.' }, ...]

export default function Page() {
  return (
    <CalcLayout title="이모지 계산기 이름" desc="한 줄 설명" currentUrl="/cal/[slug]" faqs={faqs}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FeatureCalc />
    </CalcLayout>
  )
}
```

## 스타일 규칙

| 요소 | 클래스 |
|------|--------|
| 카드 래퍼 | `bg-white border border-stone-200 rounded-2xl p-6` |
| 섹션 제목 | `text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400` |
| 입력 필드 | `INPUT_CLS` 상수 사용 |
| 기본 버튼 | `bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 text-white font-black rounded-xl py-3.5` |
| 메인 결과 박스 | `bg-gradient-to-br from-[색]-400 to-[색]-500 rounded-2xl p-5 text-white text-center` |
| 상세 테이블 행 | `border-b border-stone-100 last:border-none` |
| 안내 박스 | `bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500` |
| 오류 텍스트 | `text-xs text-red-500` |

## 카테고리 색상

| 카테고리 | 색상 |
|---------|------|
| 날짜·시간 | amber/orange |
| 건강·신체 | emerald/teal |
| 금융·급여 | green/emerald |
| 운세·라이프 | violet/purple |
| 단위 변환 | teal/cyan |

## 빌드 & 배포

```bash
npm run build    # ./out 정적 파일 생성
npx wrangler deploy  # Cloudflare Workers에 배포
```

## 주의사항

- `output: 'export'` → API Route, Server Actions, 이미지 최적화 사용 불가
- 모든 계산기 페이지 URL은 trailing slash 포함: `/cal/salary/`
- `@/` 경로 별칭은 프로젝트 루트를 가리킴 (`jsconfig.json`)
- 폰트: `font-black` = NanumSquareEB, `font-bold` = NanumSquareB (globals.css 오버라이드)
- 기존 계산기 로직 수정 시 관련 법령·기준 연도 확인 필요 (급여 세율, 최저임금 등)
- 신규 URL 생성시 sitemap.xml 갱신 필요
- SEO 최적화를 위한 semantic tag 사용하여 요소 구현

## 현재 계산기 목록 (15개)

날짜: dday, date-diff, date-add, business-days, age, anniversary, lunar
건강: weight, calorie, period
금융: salary, severance, unemployment
라이프: zodiac
변환: unit
