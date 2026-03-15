# serenkit — Claude 작업 가이드

## 프로젝트 개요

한국어 생활 계산기 + 색상 도구 + 개발자 도구 모음 사이트. Next.js App Router 기반 정적 사이트(Cloudflare Workers 배포).
URL: `https://serenkit.com`

## 기술 스택

- **Next.js 16** (App Router, `output: 'export'`, `trailingSlash: true`)
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
  dev/page.js               # 개발자도구 목록 페이지
  dev/[tool]/page.js        # 개발자도구 페이지 (메타데이터 + DevLayout 래핑)
  about/, privacy/, terms/

components/calculator/
  CalcLayout.js             # 계산기 공통 레이아웃 (배너 + 사이드바 + FAQ)
  FaqSection.js             # FAQ + JSON-LD FAQPage 스키마 (collapsible details/summary)
  [Feature]Calc.js          # 계산기 로직+UI ('use client')

components/color/
  ToolLayout.js             # 색상도구 공통 레이아웃 (배너 + 관련도구 + FAQ)
  [Feature].js              # 색상도구 로직+UI ('use client')

components/dev/
  DevLayout.js              # 개발자도구 공통 레이아웃 (배너 + 관련도구 + FAQ)
  [Feature].js              # 개발자도구 로직+UI ('use client')

components/share/
  FavoritesProvider.js      # 즐겨찾기 Context+Provider (localStorage: 'serenkit_favorites', slug 배열)
  FavoriteButton.js         # HeartIcon(named export), FavoriteCardButton, FavoriteBannerButton
  ShareResultButton.js      # 결과 공유 버튼 3종 (클립보드·이미지저장·SNS), html-to-image 사용
  AdUnit.js                 # AdSense 광고 유닛 (5슬롯 export, fullWidth prop, StrictMode 가드)
  Navbar.js                 # 상단 네비게이션
  Footer.js                 # 하단 푸터 (카테고리 링크 + 색상도구 + 개발자도구 링크)
  CookieBanner.js           # 쿠키/개인정보 동의 배너

lib/
  categories.js             # 단일 소스: 전체 카테고리·계산기 목록 (CalcLayout/Footer/page.js 공유)
  colorTools.js             # 색상도구 목록(COLOR_TOOLS), COLOR_INPUT_CLS, COLOR_HERO_PATTERN, CSS_COLOR_NAMES
  colorUtils.js             # 색상 변환 순수 함수
  tailwindColors.js         # Tailwind 색상표 데이터
  constants.js              # 공유 상수: INPUT_CLS, CALC_HERO_PATTERN (계산기용)
  urlParams.js              # URL 파라미터 읽기/쓰기 유틸리티 (pushParams, readParams)
```

## 새 계산기 추가 체크리스트

1. **`components/calculator/[Feature]Calc.js`** — 계산기 컴포넌트 작성 (URL 파라미터 패턴 포함)
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
import { useState, useEffect } from 'react'
import { INPUT_CLS } from '@/lib/constants'
import { pushParams, readParams } from '@/lib/urlParams'

// 1. 순수 계산 함수 (컴포넌트 외부)
function calcFeature(input1, input2) { /* ... */ return result }

// 2. 기타 상수
const fmt = (n) => Math.floor(n).toLocaleString('ko-KR') + '원'

// 3. 컴포넌트
export default function FeatureCalc() {
  const [input1, setInput1] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  // URL 파라미터 복원 (페이지 진입 시 1회)
  useEffect(() => {
    const p = readParams()
    if (p.input1) {
      setInput1(p.input1)
      setResult(calcFeature(p.input1))
    }
  }, [])

  const calculate = () => {
    setError('')
    if (!input1) { setError('값을 입력해주세요.'); return }
    pushParams({ input1 })          // URL에 입력값 반영
    setResult(calcFeature(input1))
  }

  return (
    <div className="space-y-4">
      <section className="bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-sm font-black text-stone-800 mb-5 pb-3 border-b-2 border-amber-400">조건 입력</h2>
        <input className={INPUT_CLS} value={input1} onChange={e => setInput1(e.target.value)} />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        <button onClick={calculate}
          className="w-full mt-5 bg-amber-400 hover:bg-amber-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
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
        <button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-xl py-3.5 text-sm transition-colors">
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
| 기본 버튼 | `bg-amber-400 hover:bg-amber-500 text-white font-black rounded-xl py-3.5` | `bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-xl py-3.5` |
| 메인 결과 박스 | `bg-gradient-to-br from-[색]-400 to-[색]-500 rounded-2xl p-5 text-white text-center` | 동일 |
| 안내 박스 | `bg-amber-50 border border-amber-100 rounded-2xl p-5 text-xs text-stone-500` | `bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-xs text-slate-500` |
| 오류 텍스트 | `text-xs text-red-500` | 동일 |

## 카테고리 색상

| 카테고리 | 색상 |
|---------|------|
| 날짜·시간 | amber/orange |
| 건강·신체 | emerald/teal |
| 금융·급여 | green/emerald |
| 운세·라이프 | violet/purple |
| 유틸리티 | sky/blue |
| 색상 도구 | indigo/violet/purple |

## 공유 상수

- `CALC_HERO_PATTERN` — 계산기 배너용 별/플러스 SVG 패턴 (`lib/constants.js`)
- `COLOR_HERO_PATTERN` — 색상도구 배너용 점 SVG 패턴 (`lib/colorTools.js`)
- `INPUT_CLS` — 계산기 입력 필드 클래스 (`lib/constants.js`, amber focus)
- `COLOR_INPUT_CLS` — 색상도구 입력 필드 클래스 (`lib/colorTools.js`, indigo focus)
- `HeartIcon` — named export from `components/share/FavoriteButton.js`

## 광고 배치 시스템 (AdUnit.js)

`components/share/AdUnit.js` — Google AdSense 수동 배치 컴포넌트. 자동 광고는 사용하지 않음.

### 슬롯 ID

| export 상수 | 슬롯 ID | 배치 위치 |
|------------|---------|---------|
| `AD_SLOT_TOP` | `4137164165` | 배너 직후 (모바일·태블릿만, `xl:hidden`) |
| `AD_SLOT_MIDDLE` | `5883193399` | 도구/계산기 아래 (전체 디바이스) |
| `AD_SLOT_BOTTOM` | `4570111729` | FAQ 위 (태블릿+ `hidden md:block`) |
| `AD_SLOT_SIDEBAR_L` | `7996518124` | 좌측 사이드바 (데스크탑 `xl+` 전용) |
| `AD_SLOT_SIDEBAR_R` | `7746939400` | 우측 사이드바 (데스크탑 `xl+` 전용) |

### AdUnit props

```jsx
import AdUnit, { AD_SLOT_TOP, AD_SLOT_SIDEBAR_L } from '@/components/share/AdUnit'

<AdUnit slot={AD_SLOT_TOP} />                      // 인라인 (반응형)
<AdUnit slot={AD_SLOT_SIDEBAR_L} fullWidth={false} /> // 사이드바 (고정 컨테이너)
<AdUnit slot={AD_SLOT_TOP} className="my-2" />     // 추가 클래스
```

- `fullWidth={true}` (기본): `data-full-width-responsive="true"` 포함 → 인라인 반응형
- `fullWidth={false}`: 해당 속성 생략 → 사이드바 등 고정 너비 컨테이너용
- React StrictMode 이중 push 방지: `useRef(false)` 가드 내장

### 데스크탑 3-컬럼 사이드바 레이아웃 패턴

모든 레이아웃(CalcLayout, ToolLayout, DevLayout)과 목록 페이지(홈, /cal, /color, /dev)에 적용:

```jsx
{/* 도구 페이지: 중앙 콘텐츠 고정 너비 */}
<div className="xl:grid xl:grid-cols-[1fr_560px_1fr] xl:items-start">
  <div className="hidden xl:flex justify-center pt-6">
    <div className="sticky top-24 w-[300px]">
      <AdUnit slot={AD_SLOT_SIDEBAR_L} fullWidth={false} />
    </div>
  </div>
  <div>{/* 중앙 콘텐츠 */}</div>
  <div className="hidden xl:flex justify-center pt-6">
    <div className="sticky top-24 w-[300px]">
      <AdUnit slot={AD_SLOT_SIDEBAR_R} fullWidth={false} />
    </div>
  </div>
</div>

{/* 목록 페이지: 사이드바 1fr, 중앙 고정 너비 */}
<div className="xl:grid xl:grid-cols-[1fr_minmax(0,860px)_1fr] xl:items-start">
  <div className="hidden xl:flex justify-center pt-10">
    <div className="sticky top-24 w-[200px] 2xl:w-[300px]">
      <AdUnit slot={AD_SLOT_SIDEBAR_L} fullWidth={false} />
    </div>
  </div>
  <div>{/* 중앙 콘텐츠 (xl:w-full 사용, xl:w-10/12 금지) */}</div>
  <div className="hidden xl:flex justify-center pt-10">
    <div className="sticky top-24 w-[200px] 2xl:w-[300px]">
      <AdUnit slot={AD_SLOT_SIDEBAR_R} fullWidth={false} />
    </div>
  </div>
</div>
```

> **주의**: 그리드 셀 내부에서 `xl:w-10/12` 등 퍼센트 너비 사용 금지.
> 퍼센트는 뷰포트가 아닌 그리드 셀 기준으로 계산되어 레이아웃이 좁아짐.
> 대신 `xl:w-full` 사용.

### 브레이크포인트별 광고 노출

| 디바이스 | TOP | MIDDLE | BOTTOM | SIDEBAR |
|---------|-----|--------|--------|---------|
| 모바일 (`< md`) | ✅ | ✅ | ❌ | ❌ |
| 태블릿 (`md ~ xl`) | ✅ | ✅ | ✅ | ❌ |
| 데스크탑 (`xl+`) | ❌ | ✅ | ✅ | ✅ (좌+우) |

## URL 파라미터 & 결과 공유

모든 계산기는 계산 결과를 URL 쿼리 파라미터로 인코딩하여 링크 공유를 지원한다.
`CalcLayout`은 결과 섹션 하단에 공유 버튼 3종을 자동으로 렌더링한다.

### lib/urlParams.js

```js
import { pushParams, readParams } from '@/lib/urlParams'

pushParams({ key: value })   // history.replaceState로 URL 갱신 (페이지 이동 없음)
readParams()                 // 현재 URL 쿼리 파라미터를 { key: string } 객체로 반환
```

- 빈 값(`''`, `null`, `undefined`)은 자동으로 제외
- 서버 사이드에서는 빈 객체 반환 (`typeof window === 'undefined'` 가드)
- 포맷된 금액 필드(`"1,000,000"`)는 URL에 raw 숫자로 저장, 복원 시 재포맷

### URL 파라미터 패턴별 가이드

**버튼 계산기** (계산 버튼 클릭 후 결과 표시):
```js
// 복원: useEffect([], []) — 마운트 1회
useEffect(() => {
  const p = readParams()
  if (p.input1) { setInput1(p.input1); setResult(calc(p.input1)) }
}, [])
// 저장: calculate() 내부에서 pushParams 호출
const calculate = () => { pushParams({ input1 }); setResult(calc(input1)) }
```

**실시간 계산기** (입력 즉시 결과):
```js
useEffect(() => { const p = readParams(); if (p.text) setText(p.text) }, [])
useEffect(() => { pushParams(text ? { text } : {}) }, [text])
```

**선택형 계산기** (MbtiCalc 등):
```js
useEffect(() => { if (typeA && typeB) pushParams({ typeA: typeA.code, typeB: typeB.code }) }, [typeA, typeB])
```

**Boolean 파라미터**: 문자열 `'1'`/`'0'`으로 인코딩
`pushParams({ flag: val ? '1' : '0' })` → 복원: `p.flag === '1'`

### ShareResultButton.js

CalcLayout이 자동으로 포함. 직접 사용 시:

```jsx
import ShareButtons from '@/components/share/ShareResultButton'
const ref = useRef(null)

<div ref={ref}>{/* 캡처할 영역 */}</div>
<ShareButtons targetRef={ref} />
```

- 📋 **클립보드 복사** — 현재 URL을 클립보드에 복사
- 💾 **이미지 저장** — `html-to-image` toPng (pixelRatio: 2) + `serenkit.com` 워터마크
- 🔗 **SNS 공유** — 모바일: `navigator.share` API / 데스크탑: URL 클립보드 복사

`data-share-ignore` 속성: 이미지 캡처 시 해당 요소를 일시 숨김 처리
(공유 버튼 영역, 힌트 텍스트 등에 사용)

## SEO 가이드

### 메타데이터 작성 규칙

| 필드 | 규칙 |
|------|------|
| `title` | 40자 이내. `[계산기명] - [핵심 키워드]` 형태. "무료" 문구 금지 |
| `description` | 80~120자. 계산기가 해결하는 문제 + 주요 기능 2~3가지 명시 |
| `keywords` | 5~10개. 도구명(정확), 관련 검색어, 상위 카테고리 포함 |
| `canonical` | 반드시 trailing slash 포함: `https://serenkit.com/cal/salary/` |
| OG `title` | `[계산기명] | serenkit` (파이프 구분) |
| OG `image` | `/og-image.png?v=2` 고정 |

### HTML 헤딩 계층

```
h1 — 배너 타이틀 (CalcLayout/ToolLayout이 렌더, 페이지당 1개)
h2 — 카드 섹션 제목 ("조건 입력", "계산 결과", "다른 계산기", "FAQ")
h3 — FAQ 개별 질문, 결과 세부 항목
```
- `h1`에 반드시 핵심 키워드 포함 (예: "월급 실수령액 계산기")
- 계산기 컴포넌트 내부는 `h2`부터 시작 (h1은 CalcLayout 배너가 담당)

### JSON-LD 스키마 타입

| 페이지 유형 | 스키마 타입 | 비고 |
|------------|------------|------|
| 계산기 개별 | `WebApplication` | `applicationCategory: 'FinanceApplication'` 등 |
| 색상도구 개별 | `WebApplication` | `applicationCategory: 'DesignApplication'` |
| FAQ (`FaqSection`) | `FAQPage` | FaqSection이 자동 생성 — 별도 작성 불필요 |
| 목록 페이지 (`/cal/`, `/color/`) | `ItemList` | `ListItem`으로 하위 도구 열거 |
| 홈 | `WebSite` | `name`, `url`, `description` |

WebApplication 필수 필드:
```js
{
  '@type': 'WebApplication',
  name: '계산기 이름',
  url: 'https://serenkit.com/cal/[slug]/',
  description: '한 줄 설명',
  applicationCategory: 'FinanceApplication', // 또는 UtilityApplication, HealthApplication
  operatingSystem: 'Web',
  inLanguage: 'ko-KR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
}
```

### FAQ 작성 기준

- 최소 4개, 권장 5~7개
- 실제 사용자 검색 의도를 반영한 질문 (예: "퇴직금 어떻게 계산하나요?")
- 질문은 `?`로 끝내고, 답변은 2~3문장 이내로 구체적으로 작성
- FaqSection이 FAQPage JSON-LD를 자동 생성하므로 `faqs` 배열만 작성

### sitemap.xml 업데이트 규칙

- 새 페이지 추가 시 반드시 `public/sitemap.xml`에 URL 추가
- `lastmod`: 페이지 콘텐츠/로직 수정 시 해당 날짜로 갱신 (YYYY-MM-DD)
- `priority`: 홈 `1.0` → 목록 `0.95` → 계산기 `0.9` → 색상도구 `0.8` → 법적 페이지 `0.3~0.4`
- `changefreq`: 계산기/도구 `monthly`, 법령 연동 페이지(hourly, income-tax) `yearly`

### 콘텐츠 품질 (애드센스 기준)

- 각 페이지에 고유한 본문 콘텐츠 확보 (CalcLayout의 "다른 계산기" 섹션이 내부 링크 역할)
- 계산 결과 섹션에 수식·기준 설명 추가 (결과만 출력하지 말 것)
- "💡 계산 기준" aside 박스에 법적 근거·기준 연도 명시
- 광고 친화적 레이아웃: 콘텐츠 위주, 팝업·자동재생 없음

## 주의사항

- `output: 'export'` → API Route, Server Actions, 이미지 최적화 사용 불가
- 계산기 URL은 trailing slash 포함: `/cal/salary/`
- 색상도구 URL도 trailing slash 포함: `/color/color-picker/`
- `@/` = 프로젝트 루트 (`jsconfig.json`)
- 폰트: `font-black` = NanumSquareEB, `font-bold` = NanumSquareB (globals.css)
- 기존 계산기 로직 수정 시 관련 법령·기준 연도 확인 (급여 세율, 최저임금 등)
- 모든 기능은 2026년 규정 기준으로 구현
- 구글 애드센스 승인을 목표로 품질 유지

## 현재 계산기 목록 (23개)

날짜(7): dday, date-diff, date-add, business-days, age, anniversary, lunar
건강(3): weight, calorie, period
금융(7): salary, severance, unemployment, hourly, loan, vat, income-tax
라이프(3): zodiac, mbti, lotto
유틸리티(3): char-count, pyeong, unit

## 현재 색상 도구 목록 (8개)

color-extractor, color-converter, color-picker, tailwind-palette,
gradient-generator, contrast-checker, palette-generator, color-names

## 현재 개발자 도구 목록 (5개)

timestamp, base64, url-encoder, uuid, regex-tester

## 새 개발자 도구 추가 체크리스트

1. **`components/dev/[Feature].js`** — 도구 컴포넌트 작성 (`'use client'`, `DEV_INPUT_CLS` 사용)
2. **`app/dev/[slug]/page.js`** — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ, DevLayout 래핑)
3. **`lib/devTools.js`** — `DEV_TOOLS` 배열에 항목 추가 (DevLayout·개발자도구홈 자동 반영)
4. **`public/sitemap.xml`** — 신규 URL 추가
5. **`CLAUDE.md`** — 개발자 도구 목록 갱신

## 개발자 도구 색상 체계

- 카테고리 전체: `slate/zinc` 다크 계열 (DevLayout 배너)
- `DEV_INPUT_CLS`: slate 배경 + slate focus + `font-mono`
- 도구별 강조 색상: timestamp(sky), base64(emerald), url-encoder(violet), uuid(indigo), regex-tester(rose)

# currentDate
Today's date is 2026-03-15.
