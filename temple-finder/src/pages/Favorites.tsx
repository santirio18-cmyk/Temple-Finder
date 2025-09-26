import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Star, MapPin, Users, Search } from 'lucide-react'
import { useTemple } from '../contexts/TempleContext'
import { Temple } from '../types'

const Favorites: React.FC = () => {
  const navigate = useNavigate()
  const { getFavorites, removeFromFavorites } = useTemple()
  const [favorites, setFavorites] = useState<Temple[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setLoading(true)
    try {
      const favs = await getFavorites()
      setFavorites(favs)
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (templeId: string) => {
    try {
      await removeFromFavorites(templeId)
      setFavorites(favorites.filter(temple => temple.id !== templeId))
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }

  const filteredFavorites = favorites.filter(temple =>
    temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temple.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temple.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCrowdLevel = (temple: Temple) => {
    const percentage = (temple.current_occupancy / temple.capacity) * 100
    if (percentage < 30) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage < 70) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading favorites...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
            My Favorite Temples
          </h1>
          <p className="text-neutral-600 mb-6">
            Your saved temples for easy access and visit planning
          </p>
          
          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search favorites..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-neutral-600 mb-6">
              Start exploring temples and add them to your favorites
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Explore Temples
            </button>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No matching favorites
            </h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your search terms
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-primary"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((temple) => {
              const crowdLevel = getCrowdLevel(temple)
              return (
                <div
                  key={temple.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <span className="text-6xl">🕉️</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-lg text-neutral-900 mb-1 truncate">
                          {temple.name}
                        </h3>
                        <p className="text-primary-600 font-medium mb-2">{temple.deity}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(temple.id)}
                        className="p-1 text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {temple.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{temple.rating}</span>
                          <span className="text-sm text-neutral-500">({temple.review_count})</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${crowdLevel.bg} ${crowdLevel.color}`}>
                          {crowdLevel.level} crowd
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-neutral-500">
                        <MapPin className="w-4 h-4" />
                        <span>{temple.city}, {temple.state}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigate(`/temple/${temple.id}`)}
                        className="flex-1 btn-primary text-sm"
                      >
                        View Details
                      </button>
                      <button className="btn-outline text-sm px-3">
                        Plan Visit
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
