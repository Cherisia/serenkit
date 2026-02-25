# serenKit — 무료 날짜 계산기 모음

D-day, 날짜 차이, 날짜 더하기/빼기, 영업일, 만 나이, 기념일 계산기를 제공하는 무료 웹 서비스입니다.

## 기술 스택

- Next.js (App Router, `output: export` 정적 빌드)
- React 19
- Tailwind CSS 4

## 계산기 목록

| 계산기 | 경로 |
|---|---|
| D-day 계산기 | /cal/dday |
| 날짜 차이 계산기 | /cal/date-diff |
| 날짜 더하기/빼기 | /cal/date-add |
| 영업일 계산기 | /cal/business-days |
| 만 나이 계산기 | /cal/age |
| 기념일 계산기 | /cal/anniversary |

## 개발 서버 실행

```bash
npm run dev
```

## 빌드

```bash
npm run build
```

정적 파일은 `/out` 폴더에 생성됩니다.
