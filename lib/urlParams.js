/**
 * URL 파라미터 공유 유틸리티
 * - pushParams: 계산 결과를 URL 쿼리스트링에 기록 (history.replaceState 사용)
 * - readParams: 페이지 로드 시 URL 파라미터 읽기
 */

export function pushParams(params) {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) sp.set(k, String(v))
  })
  history.replaceState(null, '', `${window.location.pathname}?${sp.toString()}`)
}

export function readParams() {
  if (typeof window === 'undefined') return {}
  return Object.fromEntries(new URLSearchParams(window.location.search))
}
