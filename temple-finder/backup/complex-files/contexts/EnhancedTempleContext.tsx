import React, { createContext, useContext, useState, useEffect } from 'react'
import { Temple, SearchFilters, DeityCategory, PoojaTiming, Review } from '../types'
import { AITempleService, AIServiceConfig, TempleSearchResult } from '../services/aiService'

interface EnhancedTempleContextType {
  temples: Temple[]
  categories: DeityCategory[]
  searchTemples: (filters: SearchFilters) => Promise<Temple[]>
  searchWithAI: (query: string, location?: string) => Promise<TempleSearchResult>
  getTempleById: (id: string) => Promise<Temple | null>
  getTempleDetails: (templeName: string, location?: string) => Promise<Temple | null>
  getRecommendations: (preferences: any) => Promise<Temple[]>
  getTempleTimings: (templeId: string) => Promise<PoojaTiming[]>
  getTempleReviews: (templeId: string) => Promise<Review[]>
  addToFavorites: (templeId: string) => Promise<void>
  removeFromFavorites: (templeId: string) => Promise<void>
  getFavorites: () => Promise<Temple[]>
  addReview: (templeId: string, rating: number, comment: string) => Promise<void>
  loading: boolean
  aiEnabled: boolean
  toggleAI: (enabled: boolean) => void
}

const EnhancedTempleContext = createContext<EnhancedTempleContextType | undefined>(undefined)

export const useEnhancedTemple = () => {
  const context = useContext(EnhancedTempleContext)
  if (context === undefined) {
    throw new Error('useEnhancedTemple must be used within an EnhancedTempleProvider')
  }
  return context
}

export const EnhancedTempleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temples, setTemples] = useState<Temple[]>([])
  const [categories, setCategories] = useState<DeityCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(false)
  const [aiService, setAiService] = useState<AITempleService | null>(null)

  // Initialize AI service
  useEffect(() => {
    const initAI = () => {
      const config: AIServiceConfig = {
      openaiApiKey: (import.meta as any).env.VITE_OPENAI_API_KEY,
      perplexityApiKey: (import.meta as any).env.VITE_PERPLEXITY_API_KEY,
      geminiApiKey: (import.meta as any).env.VITE_GEMINI_API_KEY
      }

      if (config.openaiApiKey || config.perplexityApiKey || config.geminiApiKey) {
        setAiService(new AITempleService(config))
        setAiEnabled(true)
      }
    }

    initAI()
  }, [])

  // Load initial temple data
  useEffect(() => {
    const loadInitialData = () => {
      // Your existing mock temples
      const mockTemples: Temple[] = [
        {
          id: '1',
          name: 'Meenakshi Amman Temple',
          deity: 'Meenakshi (Parvati)',
          description: 'A historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu.',
          history: 'The temple was built by the Pandya dynasty in the 6th century CE and later expanded by the Nayak dynasty.',
          significance: 'One of the most important temples dedicated to Goddess Meenakshi, the consort of Lord Sundareswarar (Shiva).',
          architecture: 'Dravidian architecture with towering gopurams, intricate carvings, and a golden lotus tank.',
          legends: ['The temple is said to be where Meenakshi and Sundareswarar were married', 'The golden lotus tank is believed to have been created by Lord Shiva'],
          address: 'Madurai Main, Madurai, Tamil Nadu 625001',
          city: 'Madurai',
          state: 'Tamil Nadu',
          country: 'India',
          locality: 'Madurai Main',
          latitude: 9.9197,
          longitude: 78.1194,
          contact_phone: '+91-452-2344360',
          website: 'https://www.maduraimeenakshi.org',
          images: ['/images/meenakshi-1.jpg', '/images/meenakshi-2.jpg'],
          capacity: 1000,
          current_occupancy: 250,
          rating: 4.8,
          review_count: 1250,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        // Add your other existing temples here...
      ]

      const mockCategories: DeityCategory[] = [
        {
          id: '1',
          name: 'Shiva',
          icon: '🕉️',
          description: 'Temples dedicated to Lord Shiva, the destroyer and transformer',
          temple_count: 45,
          color: '#FF9933'
        },
        {
          id: '2',
          name: 'Vishnu',
          icon: '🕉️',
          description: 'Temples dedicated to Lord Vishnu, the preserver',
          temple_count: 38,
          color: '#DC143C'
        },
        {
          id: '3',
          name: 'Ganpati',
          icon: '🐘',
          description: 'Temples dedicated to Lord Ganesha, the remover of obstacles',
          temple_count: 52,
          color: '#FF9933'
        },
        {
          id: '4',
          name: 'Murugan',
          icon: '⚡',
          description: 'Temples dedicated to Lord Murugan, the god of war and victory',
          temple_count: 28,
          color: '#DC143C'
        },
        {
          id: '5',
          name: 'Devi',
          icon: '🕉️',
          description: 'Temples dedicated to various forms of the Divine Mother',
          temple_count: 67,
          color: '#FF9933'
        }
      ]

      setTemples(mockTemples)
      setCategories(mockCategories)
    }

    loadInitialData()
  }, [])

  const searchTemples = async (filters: SearchFilters): Promise<Temple[]> => {
    setLoading(true)
    try {
      // If AI is enabled and we have a query, use AI search
      if (aiEnabled && aiService && filters.query) {
        const aiResults = await aiService.enhancedSearch(filters)
        
        // Combine AI results with existing temples
        const combinedTemples = [...temples, ...aiResults.temples]
        
        // Remove duplicates based on name and location
        const uniqueTemples = combinedTemples.filter((temple, index, self) =>
          index === self.findIndex(t => 
            t.name.toLowerCase() === temple.name.toLowerCase() && 
            t.city.toLowerCase() === temple.city.toLowerCase()
          )
        )
        
        return uniqueTemples
      }

      // Fallback to local search
      let filteredTemples = [...temples]
      
      if (filters.query) {
        filteredTemples = filteredTemples.filter(temple =>
          temple.name.toLowerCase().includes(filters.query!.toLowerCase()) ||
          temple.deity.toLowerCase().includes(filters.query!.toLowerCase()) ||
          temple.description.toLowerCase().includes(filters.query!.toLowerCase())
        )
      }
      
      if (filters.deity) {
        filteredTemples = filteredTemples.filter(temple =>
          temple.deity.toLowerCase().includes(filters.deity!.toLowerCase())
        )
      }
      
      if (filters.rating_min) {
        filteredTemples = filteredTemples.filter(temple =>
          temple.rating >= filters.rating_min!
        )
      }
      
      return filteredTemples
    } catch (error) {
      console.error('Search failed:', error)
      // Fallback to local search on AI failure
      return temples.filter(temple =>
        !filters.query || 
        temple.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        temple.deity.toLowerCase().includes(filters.query.toLowerCase())
      )
    } finally {
      setLoading(false)
    }
  }

  const searchWithAI = async (query: string, location?: string): Promise<TempleSearchResult> => {
    if (!aiService) {
      throw new Error('AI service not available')
    }
    
    setLoading(true)
    try {
      return await aiService.searchWithOpenAI(query, location)
    } finally {
      setLoading(false)
    }
  }

  const getTempleById = async (id: string): Promise<Temple | null> => {
    setLoading(true)
    try {
      // First check local temples
      const localTemple = temples.find(temple => temple.id === id)
      if (localTemple) {
        return localTemple
      }

      // If not found locally and AI is enabled, try to get more details
      if (aiService && id.startsWith('ai-')) {
        // Extract temple name from AI-generated temple
        const temple = temples.find(t => t.id === id)
        if (temple) {
          const detailedTemple = await aiService.getTempleDetails(temple.id)
          return detailedTemple || temple
        }
      }

      return null
    } catch (error) {
      console.error('Failed to get temple:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTempleDetails = async (templeName: string, _location?: string): Promise<Temple | null> => {
    if (!aiService) {
      return null
    }

    setLoading(true)
    try {
      return await aiService.getTempleDetails(templeName)
    } catch (error) {
      console.error('Failed to get temple details:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getRecommendations = async (preferences: any): Promise<Temple[]> => {
    if (!aiService) {
      return temples.slice(0, 5) // Return first 5 local temples as fallback
    }

    setLoading(true)
    try {
      return await aiService.getRecommendations('user', preferences)
    } catch (error) {
      console.error('Failed to get recommendations:', error)
      return temples.slice(0, 5)
    } finally {
      setLoading(false)
    }
  }

  const getTempleTimings = async (templeId: string): Promise<PoojaTiming[]> => {
    // Mock timings - could be enhanced with AI for real-time data
    return [
      {
        id: '1',
        temple_id: templeId,
        name: 'Suprabhatam',
        start_time: '05:00',
        end_time: '05:30',
        description: 'Morning awakening ceremony',
        is_special: false,
        day_of_week: [0, 1, 2, 3, 4, 5, 6],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        temple_id: templeId,
        name: 'Abhishekam',
        start_time: '06:00',
        end_time: '07:00',
        description: 'Sacred bath ceremony',
        is_special: false,
        day_of_week: [0, 1, 2, 3, 4, 5, 6],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  const getTempleReviews = async (templeId: string): Promise<Review[]> => {
    // Mock reviews
    return [
      {
        id: '1',
        temple_id: templeId,
        user_id: '1',
        user_name: 'Devotee User',
        rating: 5,
        comment: 'Amazing spiritual experience. The temple is beautiful and well-maintained.',
        visit_date: '2024-01-15',
        images: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  const addToFavorites = async (templeId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('Added to favorites:', templeId)
  }

  const removeFromFavorites = async (templeId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('Removed from favorites:', templeId)
  }

  const getFavorites = async (): Promise<Temple[]> => {
    return temples.slice(0, 2)
  }

  const addReview = async (templeId: string, rating: number, comment: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Review added:', { templeId, rating, comment })
  }

  const toggleAI = (enabled: boolean) => {
    setAiEnabled(enabled && aiService !== null)
  }

  const value = {
    temples,
    categories,
    searchTemples,
    searchWithAI,
    getTempleById,
    getTempleDetails,
    getRecommendations,
    getTempleTimings,
    getTempleReviews,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    addReview,
    loading,
    aiEnabled,
    toggleAI
  }

  return (
    <EnhancedTempleContext.Provider value={value}>
      {children}
    </EnhancedTempleContext.Provider>
  )
}

