# serenkit — 생활 계산기 · 색상 도구 모음

> 날짜, 건강, 금융, 운세, 색상까지 — 일상에 필요한 작업을 한곳에서

🌐 **[serenkit.com](https://serenkit.com)** 에서 바로 사용해보세요!

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 15 (App Router, `output: 'export'`) |
| UI | React 19 + Tailwind CSS v4 |
| 배포 | Cloudflare Workers |
| 특수 라이브러리 | `korean-lunar-calendar` (음력 변환) |

---

## 계산기 목록 (총 22개)

### 날짜·시간 (7개)

| 계산기 | 경로 |
|--------|------|
| D-day 계산기 | `/cal/dday/` |
| 날짜 차이 계산기 | `/cal/date-diff/` |
| 날짜 더하기/빼기 | `/cal/date-add/` |
| 영업일 계산기 | `/cal/business-days/` |
| 만 나이 계산기 | `/cal/age/` |
| 기념일 계산기 | `/cal/anniversary/` |
| 음력 변환기 | `/cal/lunar/` |

### 건강·신체 (3개)

| 계산기 | 경로 |
|--------|------|
| 적정 체중 계산기 | `/cal/weight/` |
| 기초대사량 계산기 | `/cal/calorie/` |
| 생리주기 계산기 | `/cal/period/` |

### 금융·급여 (7개)

| 계산기 | 경로 |
|--------|------|
| 월급 실수령액 계산기 | `/cal/salary/` |
| 퇴직금 계산기 | `/cal/severance/` |
| 실업급여 계산기 | `/cal/unemployment/` |
| 시급 계산기 | `/cal/hourly/` |
| 대출 이자 계산기 | `/cal/loan/` |
| 부가세 계산기 | `/cal/vat/` |
| 종합소득세 계산기 | `/cal/income-tax/` |

### 운세·라이프 (2개)

| 계산기 | 경로 |
|--------|------|
| 띠/별자리 계산기 | `/cal/zodiac/` |
| MBTI 궁합 | `/cal/mbti/` |

### 유틸리티 (3개)

| 계산기 | 경로 |
|--------|------|
| 글자수 세기 | `/cal/char-count/` |
| 평수 계산기 | `/cal/pyeong/` |
| 단위 변환기 | `/cal/unit/` |

---

## 색상 도구 목록 (총 8개)

| 도구 | 경로 |
|------|------|
| 이미지 색상 추출 | `/color/color-extractor/` |
| 색상 포맷 변환기 | `/color/color-converter/` |
| 색상 피커 | `/color/color-picker/` |
| Tailwind 색상표 | `/color/tailwind-palette/` |
| 그라디언트 생성기 | `/color/gradient-generator/` |
| 명도 대비 검사기 | `/color/contrast-checker/` |
| 색상 팔레트 생성기 | `/color/palette-generator/` |
| 색상 이름 찾기 | `/color/color-names/` |

---

## 개발 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드 (정적 파일 → /out)
npm run build

# Cloudflare Workers 배포
npx wrangler deploy
```

---

## 프로젝트 구조

```
app/
  page.js                    # 홈 (계산기·색상도구 허브 카드)
  layout.js                  # 루트 레이아웃 (Navbar, Footer)
  cal/page.js                # 계산기 목록 페이지
  cal/[calculator]/page.js   # 계산기 페이지
  color/page.js              # 색상도구 목록 페이지
  color/[tool]/page.js       # 색상도구 페이지

components/calculator/
  CalcLayout.js              # 계산기 공통 레이아웃 (배너 + 사이드바 + FAQ)
  FaqSection.js              # FAQ + JSON-LD FAQPage 스키마 (collapsible)
  [Feature]Calc.js           # 계산기 로직·UI ('use client')

components/color/
  ToolLayout.js              # 색상도구 공통 레이아웃 (배너 + 관련도구 + FAQ)
  [Feature].js               # 색상도구 로직·UI ('use client')

components/share/
  FavoritesProvider.js       # 즐겨찾기 Context (localStorage)
  FavoriteButton.js          # HeartIcon(named), FavoriteCardButton, FavoriteBannerButton
  Navbar.js                  # 상단 네비게이션

lib/
  categories.js              # 전체 카테고리·계산기 단일 소스
  colorTools.js              # 색상도구 목록, COLOR_INPUT_CLS, COLOR_HERO_PATTERN
  colorUtils.js              # 색상 변환 순수 함수
  tailwindColors.js          # Tailwind 색상표 데이터
  constants.js               # 공유 상수 (INPUT_CLS, CALC_HERO_PATTERN)
```

---

## 새 계산기 추가하기

1. `components/calculator/[Feature]Calc.js` — 계산기 컴포넌트 작성
2. `app/cal/[slug]/page.js` — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ)
3. `lib/categories.js` — `CATEGORIES` 배열에 항목 추가
4. `public/sitemap.xml` — 신규 URL 추가
5. `CLAUDE.md` — 계산기 목록 갱신

## 새 색상 도구 추가하기

1. `components/color/[Feature].js` — 색상도구 컴포넌트 작성
2. `app/color/[slug]/page.js` — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ)
3. `lib/colorTools.js` — `COLOR_TOOLS` 배열에 항목 추가
4. `public/sitemap.xml` — 신규 URL 추가
5. `CLAUDE.md` — 색상도구 목록 갱신
