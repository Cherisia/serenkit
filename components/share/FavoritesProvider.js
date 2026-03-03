'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CATEGORIES } from '@/lib/categories'
import { COLOR_TOOLS } from '@/lib/colorTools'

const ALL_ITEMS = [...CATEGORIES.flatMap(cat => cat.calcs), ...COLOR_TOOLS]

const FavoritesContext = createContext({
  favUrls: [],
  favCalcs: [],
  toggle: () => {},
  isFav: () => false,
})

export function FavoritesProvider({ children }) {
  const [favUrls, setFavUrls] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('serenkit_favorites') || '[]')
      if (!Array.isArray(saved)) { setFavUrls([]); return }
      // 구버전 slug('date-diff') → 전체 경로('/cal/date-diff') 마이그레이션
      const migrated = saved.map(v => v.startsWith('/') ? v : `/cal/${v}`)
      setFavUrls(migrated)
    } catch {}
  }, [])

  const toggle = (url) => {
    setFavUrls(prev => {
      const next = prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
      localStorage.setItem('serenkit_favorites', JSON.stringify(next))
      return next
    })
  }

  const isFav = (url) => favUrls.includes(url)

  // 저장 순서 유지
  const favCalcs = favUrls.flatMap(url => ALL_ITEMS.filter(c => c.url === url))

  return (
    <FavoritesContext.Provider value={{ favUrls, favCalcs, toggle, isFav }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
