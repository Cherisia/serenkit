# 🧮 serenkit — 무료 생활 계산기 모음

> 날짜, 건강, 금융, 운세까지 — 일상에 필요한 계산을 한곳에서

🌐 **[serenkit.com](https://serenkit.com)** 에서 바로 사용해보세요!

---

## 📦 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 15 (App Router, `output: 'export'`) |
| UI | React 19 + Tailwind CSS v4 |
| 배포 | Cloudflare Workers |
| 특수 라이브러리 | `korean-lunar-calendar` (음력 변환) |

---

## 🗂️ 계산기 목록 (총 22개)

### 📅 날짜·시간 (7개)

| 계산기 | 경로 |
|--------|------|
| D-day 계산기 | `/cal/dday/` |
| 날짜 차이 계산기 | `/cal/date-diff/` |
| 날짜 더하기/빼기 | `/cal/date-add/` |
| 영업일 계산기 | `/cal/business-days/` |
| 만 나이 계산기 | `/cal/age/` |
| 기념일 계산기 | `/cal/anniversary/` |
| 음력 변환기 | `/cal/lunar/` |

### 💚 건강·신체 (3개)

| 계산기 | 경로 |
|--------|------|
| 표준 체중 계산기 | `/cal/weight/` |
| 칼로리 계산기 | `/cal/calorie/` |
| 생리 주기 계산기 | `/cal/period/` |

### 💰 금융·급여 (7개)

| 계산기 | 경로 |
|--------|------|
| 급여 실수령액 계산기 | `/cal/salary/` |
| 퇴직금 계산기 | `/cal/severance/` |
| 실업급여 계산기 | `/cal/unemployment/` |
| 시급 계산기 | `/cal/hourly/` |
| 대출 이자 계산기 | `/cal/loan/` |
| 부가세 계산기 | `/cal/vat/` |
| 종합소득세 계산기 | `/cal/income-tax/` |

### 🔮 운세·라이프 (2개)

| 계산기 | 경로 |
|--------|------|
| 별자리 계산기 | `/cal/zodiac/` |
| MBTI 궁합 | `/cal/mbti/` |

### 🛠️ 유틸리티 (3개)

| 계산기 | 경로 |
|--------|------|
| 글자 수 계산기 | `/cal/char-count/` |
| 평수 변환기 | `/cal/pyeong/` |
| 단위 변환기 | `/cal/unit/` |

---

## 🚀 개발 시작하기

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

## 📁 프로젝트 구조

```
app/
  page.js                    # 홈 (카테고리 카드 그리드)
  layout.js                  # 루트 레이아웃 (Navbar, Footer, 메타데이터)
  cal/[calculator]/page.js   # 계산기 페이지

components/calculator/
  CalcLayout.js              # 공통 레이아웃 (배너 + 사이드바 + FAQ)
  FaqSection.js              # FAQ + JSON-LD FAQPage 스키마
  [Feature]Calc.js           # 계산기 로직·UI ('use client')

components/share/
  FavoritesProvider.js       # 즐겨찾기 Context (localStorage)
  FavoriteButton.js          # 즐겨찾기 버튼 컴포넌트

lib/
  categories.js              # 전체 카테고리·계산기 단일 소스
  constants.js               # 공유 상수 (INPUT_CLS, HERO_PATTERN)
```

---

## ➕ 새 계산기 추가하기

1. `components/calculator/[Feature]Calc.js` — 계산기 컴포넌트 작성
2. `app/cal/[slug]/page.js` — 페이지 파일 작성 (메타데이터, JSON-LD, FAQ)
3. `lib/categories.js` — `CATEGORIES` 배열에 항목 추가
4. `public/sitemap.xml` — 신규 URL 추가
5. `CLAUDE.md` — 계산기 목록 갱신
