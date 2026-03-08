/** Input field class for dev tools (slate bg + slate focus + font-mono) */
export const DEV_INPUT_CLS = 'w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition-colors font-mono'

/** Hero/banner section SVG pattern background (dev tool theme) */
export const DEV_HERO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Crect x='20' y='28' width='20' height='4' rx='2'/%3E%3Crect x='28' y='20' width='4' height='20' rx='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

export const DEV_TOOLS = [
  {
    key: 'timestamp',
    name: '타임스탬프 변환기',
    shortName: '타임스탬프',
    desc: 'Unix 타임스탬프(초/밀리초)와 날짜시간 문자열을 UTC·KST로 양방향 변환합니다',
    icon: '⏱️',
    url: '/dev/timestamp',
    color: 'from-sky-400 to-cyan-500',
    labelColor: 'text-sky-600',
    border: 'border-sky-200',
    bg: 'bg-sky-50',
  },
  {
    key: 'base64',
    name: 'Base64 인코더/디코더',
    shortName: 'Base64',
    desc: '텍스트를 Base64로 인코딩하거나 Base64 문자열을 원문으로 디코딩합니다',
    icon: '🔐',
    url: '/dev/base64',
    color: 'from-emerald-400 to-teal-500',
    labelColor: 'text-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
  },
  {
    key: 'url-encoder',
    name: 'URL 인코더/디코더',
    shortName: 'URL 인코딩',
    desc: 'URL에 포함된 특수문자를 percent-encoding으로 인코딩하거나 디코딩합니다',
    icon: '🔗',
    url: '/dev/url-encoder',
    color: 'from-violet-400 to-purple-500',
    labelColor: 'text-violet-600',
    border: 'border-violet-200',
    bg: 'bg-violet-50',
  },
  {
    key: 'uuid',
    name: 'UUID 생성기',
    shortName: 'UUID',
    desc: '암호학적으로 안전한 UUID v4를 최대 10개까지 즉시 생성합니다',
    icon: '🆔',
    url: '/dev/uuid',
    color: 'from-indigo-400 to-blue-500',
    labelColor: 'text-indigo-600',
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
  },
  {
    key: 'regex-tester',
    name: '정규식 테스터',
    shortName: '정규식',
    desc: '정규식 패턴을 입력하고 테스트 문자열에서 실시간으로 매치를 확인합니다. 캡처 그룹 파싱과 예제 패턴을 제공합니다',
    icon: '🔍',
    url: '/dev/regex-tester',
    color: 'from-rose-400 to-pink-500',
    labelColor: 'text-rose-600',
    border: 'border-rose-200',
    bg: 'bg-rose-50',
  },
]

export function getDevToolByKey(key) {
  return DEV_TOOLS.find(t => t.key === key)
}
