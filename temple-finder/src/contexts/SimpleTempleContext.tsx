// Simple Temple Context - Offline-First Implementation
// This context provides all temple functionality using mock data and local AI

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Temple, SearchFilters, DeityCategory, PoojaTiming, Review } from '../types'
import { LocalAIService, TempleSearchResult } from '../services/localAIService'
import { mockDataService } from '../services/mockDataService'

interface SimpleTempleContextType {
  temples: Temple[]
  categories: DeityCategory[]
  searchTemples: (filters: SearchFilters) => Promise<Temple[]>
  searchWithAI: (query: string, location?: string) => Promise<TempleSearchResult>
  getTempleById: (id: string) => Promise<Temple | null>
  getTempleTimings: (templeId: string) => Promise<PoojaTiming[]>
  getTempleReviews: (templeId: string) => Promise<Review[]>
  addToFavorites: (templeId: string) => Promise<void>
  removeFromFavorites: (templeId: string) => Promise<void>
  getFavorites: () => Promise<Temple[]>
  addReview: (templeId: string, rating: number, comment: string) => Promise<void>
  loading: boolean
  aiEnabled: boolean
}

const SimpleTempleContext = createContext<SimpleTempleContextType | undefined>(undefined)

export const useSimpleTemple = () => {
  const context = useContext(SimpleTempleContext)
  if (!context) {
    throw new Error('useSimpleTemple must be used within a SimpleTempleProvider')
  }
  return context
}

export const SimpleTempleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temples, setTemples] = useState<Temple[]>([])
  const [categories, setCategories] = useState<DeityCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [aiService] = useState(LocalAIService.getInstance())
  const [aiEnabled] = useState(true) // Local AI is always available

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [templesData, categoriesData] = await Promise.all([
          mockDataService.getTemples({ limit: 50 }),
          mockDataService.getDeityCategories()
        ])
        setTemples(templesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading initial data:', error)
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
        return await mockDataService.searchTemples(filters.query, filters)
      } else {
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

  const searchWithAI = async (query: string, location?: string): Promise<TempleSearchResult> => {
    setLoading(true)
    try {
      return await aiService.searchTemplesAI(query, location)
    } catch (error) {
      console.error('AI search failed:', error)
      // Fallback to regular search
      const temples = await mockDataService.searchTemples(query, { query })
      return {
        temples,
        totalFound: temples.length,
        searchQuery: query,
        source: 'local-ai',
        message: 'AI search unavailable, showing regular results'
      }
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
    searchWithAI,
    getTempleById,
    getTempleTimings,
    getTempleReviews,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    addReview,
    loading,
    aiEnabled
  }

  return (
    <SimpleTempleContext.Provider value={value}>
      {children}
    </SimpleTempleContext.Provider>
  )
}









