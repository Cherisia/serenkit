'use client'

import { useFavorites } from '@/components/share/FavoritesProvider'

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

/** 계산기 카드 우상단 즐겨찾기 버튼 */
export function FavoriteCardButton({ url }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav(url)

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(url) }}
      aria-label={fav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
        ${fav
          ? 'bg-amber-50 text-amber-400 hover:bg-amber-100'
          : 'bg-stone-50 text-stone-300 hover:bg-amber-50 hover:text-amber-400'
        }`}
    >
      <StarIcon filled={fav} />
    </button>
  )
}

/** 계산기 배너(CalcLayout) 즐겨찾기 버튼 */
export function FavoriteBannerButton({ url }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav(url)

  return (
    <button
      onClick={() => toggle(url)}
      aria-label={fav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      className={`mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200
        ${fav
          ? 'bg-white/30 text-white hover:bg-white/40'
          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
        }`}
    >
      <StarIcon filled={fav} />
      {fav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    </button>
  )
}
