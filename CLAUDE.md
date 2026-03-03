# serenkit — Claude 작업 가이드

## 프로젝트 개요

한국어 생활 계산기 + 색상 도구 모음 사이트. Next.js App Router 기반 정적 사이트(Cloudflare Workers 배포).
URL: `https://serenkit.com`

## 기술 스택

- **Next.js 15** (App Router, `output: 'export'`, `trailingSlash: true`)
- **React 19** · **Tailwind CSS v4** (`@tailwindcss/postcss`, `tailwind.config.js` 없음)
- **배포:** `npx wrangler deploy` → Cloudflare Workers (`./out`)
- **특수 라이브러리:** `korean-lunar-calendar` (음력 변환)

## 프로젝트 구조

```
app/
  page.js                   # 홈 (계산기·색상도구 허브 카드 + JSON-LD)
  layout.js                 # 루트 레이아웃 (Navbar, Footer, 메타데이터)
  cal/page.js               # 계산기 목록 페이지
  cal/[calculator]/page.js  # 계산기 페이지 (메타데이터 + CalcLayout 래핑)
  color/page.js             # 색상도구 목록 페이지
  color/[tool]/page.js      # 색상도구 페이지 (메타데이터 + ToolLayout 래핑)
  about/, privacy/, terms/

components/calculator/
  CalcLayout.js             # 계산기 공통 레이아웃 (배너 + 사이드바 + FAQ)
  FaqSection.js             # FAQ + JSON-LD FAQPage 스키마 (collapsible details/summary)
  [Feature]Calc.js          # 계산기 로직+UI ('use client')

components/color/
  ToolLayout.js             # 색상도구 공통 레이아웃 (배너 + 관련도구 + FAQ)
  [Feature].js              # 색상도구 로직+UI ('use client')

components/share/
  FavoritesProvider.js      # 즐겨찾기 Context+Provider (localStorage: 'serenkit_favorites', slug 배열)
  FavoriteButton.js         # HeartIcon(named export), FavoriteCardButton, FavoriteBannerButton
  Navbar.js                 # 상단 네비게이션

lib/
  categories.js             # 단일 소스: 전체 카테고리·계산기 목록 (CalcLayout/Footer/page.js 공유)
  colorTools.js             # 색상도구 목록(COLOR_TOOLS), COLOR_INPUT_CLS, COLOR_HERO_PATTERN, CSS_COLOR_NAMES
  colorUtils.js             # 색상 변환 순수 함수
  tailwindColors.js         # Tailwind 색상표 데이터
  constants.js              # 공유 상수: INPUT_CLS, CALC_HERO_PATTERN (계산기용)
```

## 새 계산기 추가 체크리스트

1. **`components/calculator/[Feature]Calc.js`** — 계산기 컴포넌트 작성
2. **`app/cal/[slug]/page.js`** — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ, CalcLayout 래핑)
3. **`lib/categories.js`** — `CATEGORIES` 배열에 항목 추가 (CalcLayout·Footer·홈 자동 반영)
4. **`public/sitemap.xml`** — 신규 URL 추가
5. **`CLAUDE.md`** — 계산기 목록 갱신

## 새 색상 도구 추가 체크리스트

1. **`components/color/[Feature].js`** — 색상도구 컴포넌트 작성 (`'use client'`, `COLOR_INPUT_CLS` 사용)
2. **`app/color/[slug]/page.js`** — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ, ToolLayout 래핑)
3. **`lib/colorTools.js`** — `COLOR_TOOLS` 배열에 항목 추가 (ToolLayout·색상도구홈 자동 반영)
4. **`public/sitemap.xml`** — 신규 URL 추가
5. **`CLAUDE.md`** — 색상도구 목록 갱신

## 계산기 컴포넌트 패턴

```js
'use client'
import { useState } from 'react'
import { INPUT_CLS } from '@/lib/constants'

// 1. 순수 계산 함수 (컴포넌트 외부)
function calcFeature({ input1, input2 }) { /* ... */ return result }

// 2. 기타 상수
const fmt = (n) => Math.floor(n).toLocaleString('ko-KR') + '원'

// 3. 컴포넌트
export default function FeatureCalc() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">조건 입력</h2>
        <input className={INPUT_CLS} />
        <button className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          계산하기
        </button>
      </section>

      {result && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-orange-400">계산 결과</h2>
          {/* 메인: 그라데이션 박스 → 상세 table */}
        </section>
      )}

      <aside className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500 leading-relaxed">
        <h3 className="font-bold text-stone-600 mb-1.5">💡 계산 기준</h3>
      </aside>
    </div>
  )
}
```

## 색상도구 컴포넌트 패턴

```js
'use client'
import { useState } from 'react'
import { COLOR_INPUT_CLS } from '@/lib/colorTools'

export default function FeatureTool() {
  return (
    <div className="space-y-4">
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-slate-800 mb-4 pb-3 border-b border-slate-100">입력</h2>
        <input className={COLOR_INPUT_CLS} />
        <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
          변환하기
        </button>
      </section>
    </div>
  )
}
```

색상도구 페이지 패턴:

```js
import ToolLayout from '@/components/color/ToolLayout'
import FeatureTool from '@/components/color/FeatureTool'

export const metadata = { title: '도구 이름', ... }
const faqs = [{ q: '질문?', a: '답변.' }]

export default function Page() {
  return (
    <ToolLayout toolKey="feature-key" faqs={faqs}>
      <FeatureTool />
    </ToolLayout>
  )
}
```

## 계산기 페이지 파일 패턴

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

| 요소 | 계산기 | 색상도구 |
|------|--------|---------|
| 카드 래퍼 | `bg-white border border-stone-200 rounded-2xl p-6` | `bg-white border border-slate-200 rounded-2xl p-6` |
| 섹션 제목 | `text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400` | `text-sm font-black text-slate-800 mb-4 pb-3 border-b border-slate-100` |
| 입력 필드 | `INPUT_CLS` (`@/lib/constants`) | `COLOR_INPUT_CLS` (`@/lib/colorTools`) |
| 기본 버튼 | `bg-amber-400 hover:bg-amber-500 text-white font-black rounded-xl py-3.5` | `bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl py-3.5` |
| 메인 결과 박스 | `bg-gradient-to-br from-[색]-400 to-[색]-500 rounded-2xl p-5 text-white text-center` | 동일 |
| 안내 박스 | `bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500` | `bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-xs text-slate-500` |
| 오류 텍스트 | `text-xs text-red-500` | 동일 |

## 카테고리 색상

| 카테고리 | 색상 |
|---------|------|
| 날짜·시간 | amber/orange |
| 건강·신체 | emerald/teal |
| 금융·급여 | green/emerald |
| 운세·라이프 | violet/purple |
| 유틸리티 | sky/blue |
| 색상 도구 | emerald/teal/green |

## 공유 상수

- `CALC_HERO_PATTERN` — 계산기 배너용 별/플러스 SVG 패턴 (`lib/constants.js`)
- `COLOR_HERO_PATTERN` — 색상도구 배너용 점 SVG 패턴 (`lib/colorTools.js`)
- `INPUT_CLS` — 계산기 입력 필드 클래스 (`lib/constants.js`, amber focus)
- `COLOR_INPUT_CLS` — 색상도구 입력 필드 클래스 (`lib/colorTools.js`, emerald focus)
- `HeartIcon` — named export from `components/share/FavoriteButton.js`

## 주의사항

- `output: 'export'` → API Route, Server Actions, 이미지 최적화 사용 불가
- 계산기 URL은 trailing slash 포함: `/cal/salary/`
- 색상도구 URL도 trailing slash 포함: `/color/color-picker/`
- `@/` = 프로젝트 루트 (`jsconfig.json`)
- 폰트: `font-black` = NanumSquareEB, `font-bold` = NanumSquareB (globals.css)
- 기존 계산기 로직 수정 시 관련 법령·기준 연도 확인 (급여 세율, 최저임금 등)
- SEO: semantic tag 사용, h1에 명확한 키워드 명시
- 모든 기능은 2026년 규정 기준으로 구현
- 구글 애드센스 승인을 목표로 품질 유지

## 현재 계산기 목록 (22개)

날짜(7): dday, date-diff, date-add, business-days, age, anniversary, lunar
건강(3): weight, calorie, period
금융(7): salary, severance, unemployment, hourly, loan, vat, income-tax
라이프(2): zodiac, mbti
유틸리티(3): char-count, pyeong, unit

## 현재 색상 도구 목록 (8개)

color-extractor, color-converter, color-picker, tailwind-palette,
gradient-generator, contrast-checker, palette-generator, color-names

# currentDate
Today's date is 2026-03-01.
