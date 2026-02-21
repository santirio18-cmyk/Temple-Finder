import React, { createContext, useContext, useState, useEffect } from 'react'
import { Temple, SearchFilters, DeityCategory, PoojaTiming, Review } from '../types'
import { mockDataService } from '../services/mockDataService'

interface TempleContextType {
  temples: Temple[]
  categories: DeityCategory[]
  searchTemples: (filters: SearchFilters) => Promise<Temple[]>
  getTempleById: (id: string) => Promise<Temple | null>
  getTempleTimings: (templeId: string) => Promise<PoojaTiming[]>
  getTempleReviews: (templeId: string) => Promise<Review[]>
  addToFavorites: (templeId: string) => Promise<void>
  removeFromFavorites: (templeId: string) => Promise<void>
  getFavorites: () => Promise<Temple[]>
  addReview: (templeId: string, rating: number, comment: string) => Promise<void>
  loading: boolean
}

const TempleContext = createContext<TempleContextType | undefined>(undefined)

export const useTemple = () => {
  const context = useContext(TempleContext)
  if (context === undefined) {
    throw new Error('useTemple must be used within a TempleProvider')
  }
  return context
}

export const TempleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temples, setTemples] = useState<Temple[]>([])
  const [categories, setCategories] = useState<DeityCategory[]>([])
  const [loading, setLoading] = useState(false)

  // Load initial data from Mock Data Service
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        
        // Load temples and categories in parallel
        const [templesData, categoriesData] = await Promise.all([
          mockDataService.getTemples({ limit: 50 }),
          mockDataService.getDeityCategories()
        ])
        
        setTemples(templesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading initial data:', error)
        // Fallback to empty arrays on error
        setTemples([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const searchTemples = async (filters: SearchFilters): Promise<Temple[]> => {
    setLoading(true)
    try {
      if (filters.query) {
        // Use Mock Data search
        return await mockDataService.searchTemples(filters.query, filters)
      } else {
        // Use Mock Data getTemples with filters
        return await mockDataService.getTemples({
          deity: filters.deity,
          state: filters.location?.state,
          city: filters.location?.city,
          rating_min: filters.rating_min
        })
      }
    } catch (error) {
      console.error('Search failed:', error)
      return []
    } finally {
      setLoading(false)
    }
  }

  const getTempleById = async (id: string): Promise<Temple | null> => {
    setLoading(true)
    try {
      return await mockDataService.getTempleById(id)
    } catch (error) {
      console.error('Failed to get temple:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTempleTimings = async (templeId: string): Promise<PoojaTiming[]> => {
    try {
      return await mockDataService.getTempleTimings(templeId)
    } catch (error) {
      console.error('Failed to get temple timings:', error)
      return []
    }
  }

  const getTempleReviews = async (templeId: string): Promise<Review[]> => {
    try {
      return await mockDataService.getTempleReviews(templeId)
    } catch (error) {
      console.error('Failed to get temple reviews:', error)
      return []
    }
  }

  const addToFavorites = async (templeId: string): Promise<void> => {
    try {
      const user = await mockDataService.getCurrentUser()
      if (user) {
        await mockDataService.toggleFavorite(user.id, templeId, true)
      }
    } catch (error) {
      console.error('Failed to add to favorites:', error)
      throw error
    }
  }

  const removeFromFavorites = async (templeId: string): Promise<void> => {
    try {
      const user = await mockDataService.getCurrentUser()
      if (user) {
        await mockDataService.toggleFavorite(user.id, templeId, false)
      }
    } catch (error) {
      console.error('Failed to remove from favorites:', error)
      throw error
    }
  }

  const getFavorites = async (): Promise<Temple[]> => {
    try {
      const user = await mockDataService.getCurrentUser()
      if (user) {
        return await mockDataService.getUserFavorites(user.id)
      }
      return []
    } catch (error) {
      console.error('Failed to get favorites:', error)
      return []
    }
  }

  const addReview = async (templeId: string, rating: number, comment: string): Promise<void> => {
    try {
      const user = await mockDataService.getCurrentUser()
      if (user) {
        await mockDataService.addReview(templeId, user.id, rating, comment)
      } else {
        throw new Error('User must be logged in to add reviews')
      }
    } catch (error) {
      console.error('Failed to add review:', error)
      throw error
    }
  }

  const value = {
    temples,
    categories,
    searchTemples,
    getTempleById,
    getTempleTimings,
    getTempleReviews,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    addReview,
    loading
  }

  return (
    <TempleContext.Provider value={value}>
      {children}
    </TempleContext.Provider>
  )
}
