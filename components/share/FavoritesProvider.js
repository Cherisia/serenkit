'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CATEGORIES } from '@/lib/categories'

const ALL_CALCS = CATEGORIES.flatMap(cat => cat.calcs)

const FavoritesContext = createContext({
  favUrls: [],
  favCalcs: [],
  toggle: () => {},
  isFav: () => false,
})

export function FavoritesProvider({ children }) {
  const [favUrls, setFavUrls] = useState([])

  const toSlug = (url) => url.replace('/cal/', '')
  const toUrl = (slug) => `/cal/${slug}`

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('serenkit_favorites') || '[]')
      setFavUrls(Array.isArray(saved) ? saved.map(toUrl) : [])
    } catch {}
  }, [])

  const toggle = (url) => {
    setFavUrls(prev => {
      const next = prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
      localStorage.setItem('serenkit_favorites', JSON.stringify(next.map(toSlug)))
      return next
    })
  }

  const isFav = (url) => favUrls.includes(url)

  // 저장 순서 유지
  const favCalcs = favUrls.flatMap(url => ALL_CALCS.filter(c => c.url === url))

  return (
    <FavoritesContext.Provider value={{ favUrls, favCalcs, toggle, isFav }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
