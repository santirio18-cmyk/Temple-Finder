import React, { createContext, useContext, useState, useEffect } from 'react'
import { Temple, SearchFilters, DeityCategory, PoojaTiming, Review, Favorite } from '../types'

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

  // Mock data for development
  useEffect(() => {
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
      {
        id: '2',
        name: 'Tirumala Venkateswara Temple',
        deity: 'Venkateswara (Vishnu)',
        description: 'A famous Hindu temple dedicated to Lord Venkateswara, located in Tirumala, Andhra Pradesh.',
        history: 'The temple has been in existence for over 2000 years and is mentioned in ancient texts.',
        significance: 'One of the most visited pilgrimage sites in the world, known as the "Temple of Seven Hills".',
        architecture: 'Dravidian architecture with a golden dome and intricate carvings.',
        legends: ['Lord Venkateswara is said to have appeared here to save humanity', 'The temple is built on seven hills representing the seven chakras'],
        address: 'Tirumala, Tirupati, Andhra Pradesh 517504',
        city: 'Tirupati',
        state: 'Andhra Pradesh',
        country: 'India',
        locality: 'Tirumala',
        latitude: 13.6777,
        longitude: 79.3476,
        contact_phone: '+91-877-2277777',
        website: 'https://www.tirumala.org',
        images: ['/images/tirumala-1.jpg', '/images/tirumala-2.jpg'],
        capacity: 2000,
        current_occupancy: 1800,
        rating: 4.9,
        review_count: 2500,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
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
  }, [])

  const searchTemples = async (filters: SearchFilters): Promise<Temple[]> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
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
      return []
    } finally {
      setLoading(false)
    }
  }

  const getTempleById = async (id: string): Promise<Temple | null> => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      return temples.find(temple => temple.id === id) || null
    } catch (error) {
      console.error('Failed to get temple:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getTempleTimings = async (templeId: string): Promise<PoojaTiming[]> => {
    // Mock timings
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
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('Added to favorites:', templeId)
  }

  const removeFromFavorites = async (templeId: string): Promise<void> => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('Removed from favorites:', templeId)
  }

  const getFavorites = async (): Promise<Temple[]> => {
    // Mock favorites
    return temples.slice(0, 2)
  }

  const addReview = async (templeId: string, rating: number, comment: string): Promise<void> => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Review added:', { templeId, rating, comment })
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
