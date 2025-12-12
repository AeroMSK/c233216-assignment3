"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface FavoritesContextType {
  favorites: number[]
  addToFavorites: (courseId: number) => void
  removeFromFavorites: (courseId: number) => void
  isFavorite: (courseId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType)

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error("[v0] Failed to parse favorites:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (courseId: number) => {
    setFavorites((prev) => {
      if (prev.includes(courseId)) return prev
      return [...prev, courseId]
    })
  }

  const removeFromFavorites = (courseId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== courseId))
  }

  const isFavorite = (courseId: number) => {
    return favorites.includes(courseId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
