<div align="center">

# serenkit

**숫자가 필요한 순간, 바로 여기서**

생활 계산기 · 색상 도구 · 개발자 도구를 한곳에 모은 무료 웹 서비스

[![Live](https://img.shields.io/badge/🌐_serenkit.com-바로가기-4F46E5?style=for-the-badge)](https://serenkit.com)
[![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-배포중-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://serenkit.com)

**36개 도구** · **SEO 최적화** · **광고 수익화** · **서버리스 배포**

</div>

---

## 서비스 소개

serenkit은 흩어져 있는 생활 도구들을 하나의 브랜드 아래 모은 **멀티 툴 웹 서비스**입니다.

D-day, 월급 실수령액, 음력 변환처럼 검색량이 높지만 기존 서비스의 UX가 불편한 도구들을 직접 만들어 배포했습니다. 기획부터 디자인, 개발, SEO, 광고 수익화, 배포까지 혼자서 전 과정을 운영하고 있습니다.

---

## 제공 도구 (총 36개)

### 계산기 23개

| 카테고리 | 도구 |
|----------|------|
| **날짜·시간** | [D-day](https://serenkit.com/cal/dday/) · [날짜 차이](https://serenkit.com/cal/date-diff/) · [날짜 더하기/빼기](https://serenkit.com/cal/date-add/) · [영업일](https://serenkit.com/cal/business-days/) · [만 나이](https://serenkit.com/cal/age/) · [기념일](https://serenkit.com/cal/anniversary/) · [음력 변환](https://serenkit.com/cal/lunar/) |
| **금융·급여** | [월급 실수령액](https://serenkit.com/cal/salary/) · [퇴직금](https://serenkit.com/cal/severance/) · [실업급여](https://serenkit.com/cal/unemployment/) · [시급](https://serenkit.com/cal/hourly/) · [대출 이자](https://serenkit.com/cal/loan/) · [부가세](https://serenkit.com/cal/vat/) · [종합소득세](https://serenkit.com/cal/income-tax/) |
| **건강·신체** | [적정 체중](https://serenkit.com/cal/weight/) · [기초대사량](https://serenkit.com/cal/calorie/) · [생리주기](https://serenkit.com/cal/period/) |
| **운세·라이프** | [띠/별자리](https://serenkit.com/cal/zodiac/) · [MBTI 궁합](https://serenkit.com/cal/mbti/) · [로또 추첨](https://serenkit.com/cal/lotto/) |
| **유틸리티** | [글자수 세기](https://serenkit.com/cal/char-count/) · [평수](https://serenkit.com/cal/pyeong/) · [단위 변환](https://serenkit.com/cal/unit/) |

### 색상 도구 8개

[이미지 색상 추출](https://serenkit.com/color/color-extractor/) · [색상 포맷 변환](https://serenkit.com/color/color-converter/) · [색상 피커](https://serenkit.com/color/color-picker/) · [Tailwind 색상표](https://serenkit.com/color/tailwind-palette/) · [그라디언트 생성](https://serenkit.com/color/gradient-generator/) · [명도 대비 검사](https://serenkit.com/color/contrast-checker/) · [팔레트 생성](https://serenkit.com/color/palette-generator/) · [색상 이름 찾기](https://serenkit.com/color/color-names/)

### 개발자 도구 5개

[타임스탬프 변환](https://serenkit.com/dev/timestamp/) · [Base64](https://serenkit.com/dev/base64/) · [URL 인코더](https://serenkit.com/dev/url-encoder/) · [UUID 생성](https://serenkit.com/dev/uuid/) · [정규식 테스터](https://serenkit.com/dev/regex-tester/)

---

## 기술 스택

| 분류 | 선택 | 이유 |
|------|------|------|
| **Framework** | Next.js 16 (App Router) | 파일 기반 라우팅, 정적 내보내기(`output: 'export'`) |
| **UI** | React 19 + Tailwind CSS v4 | 빠른 스타일링, 반응형 레이아웃 |
| **배포** | Cloudflare Workers | 전 세계 엣지 배포, 무료 티어로 운영 |
| **SEO** | Next.js Metadata API + JSON-LD | 페이지별 메타태그 자동화, 구조화 데이터 |
| **수익화** | Google AdSense | 반응형 광고 슬롯 5종, 사이드바·인라인 배치 |

---

## 주요 구현 포인트

### 정적 배포 환경에서의 SEO 최적화
`output: 'export'`로 순수 정적 파일만 생성하면서도 페이지마다 고유한 `title`, `description`, `canonical`, Open Graph, JSON-LD 구조화 데이터를 적용했습니다. FAQPage 스키마는 FAQ 배열을 받아 자동 생성하는 공통 컴포넌트로 구현해 코드 중복을 없앴습니다.

### URL 파라미터 기반 결과 공유
모든 계산기의 입력값을 URL 쿼리 파라미터로 동기화합니다. 결과 페이지 링크만 공유해도 수신자가 동일한 계산 결과를 바로 확인할 수 있습니다. `history.replaceState`를 활용해 페이지 이동 없이 URL을 갱신합니다.

### 광고 성능 최적화
AdSense 스크립트를 `<Script strategy="lazyOnload">`로 지연 로드해 초기 페이지 TBT(Total Blocking Time)를 대폭 줄였습니다. 디바이스 크기별로 노출 슬롯을 다르게 구성해(모바일·태블릿·데스크탑) 광고 수익과 UX를 동시에 고려했습니다.

### 공통 레이아웃 시스템
계산기(`CalcLayout`) · 색상도구(`ToolLayout`) · 개발자도구(`DevLayout`) 각각의 공통 레이아웃 컴포넌트를 설계해, 새 도구 추가 시 레이아웃·광고·FAQ·관련도구 섹션이 자동으로 포함됩니다. 도구 목록은 단일 소스(`categories.js`, `colorTools.js`, `devTools.js`)로 관리해 홈·목록·푸터에 자동 반영됩니다.

---

## 서비스 운영

- Google Search Console로 색인 상태 및 검색 성능 모니터링
- sitemap.xml 직접 관리, Cloudflare trailing slash 리디렉션 설정
- 구조화 데이터(FAQPage, BreadcrumbList, WebApplication) 전 페이지 적용
- Google AdSense 승인 완료, 광고 슬롯 5종 운영 중
