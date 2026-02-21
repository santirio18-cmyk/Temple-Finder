import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Users, Navigation, RefreshCw, AlertCircle } from 'lucide-react'
import { useSimpleTemple } from '../contexts/SimpleTempleContext'
import { Temple } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'

interface NearbyTemple extends Temple {
  distance: number
}

const NearbyDebug: React.FC = () => {
  const navigate = useNavigate()
  const { temples } = useSimpleTemple()
  const [nearbyTemples, setNearbyTemples] = useState<NearbyTemple[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading and always show some temples
    setTimeout(() => {
      if (temples && temples.length > 0) {
        const mockNearby: NearbyTemple[] = temples.slice(0, 5).map(temple => ({
          ...temple,
          distance: Math.random() * 10 + 1 // Mock distance 1-11 km
        }))
        setNearbyTemples(mockNearby)
        setLoading(false)
        console.log('Debug: Showing', mockNearby.length, 'nearby temples')
      } else {
        setError('No temples available')
        setLoading(false)
      }
    }, 1000)
  }, [temples])

  const getCrowdLevel = (temple: Temple) => {
    const percentage = (temple.current_occupancy / temple.capacity) * 100
    if (percentage < 30) return { level: 'Low Crowd', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage < 70) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'High Crowd', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const handleDirections = (temple: NearbyTemple) => {
    // Mock directions
    alert(`Directions to ${temple.name} would open here`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-900 dark:text-neutral-100">
                Nearby Temples (Debug)
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Debug version - showing mock nearby temples
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="btn-outline flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Debug Info */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Debug Mode Active
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Total temples available: {temples?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Finding nearby temples..." />
          </div>
        ) : nearbyTemples.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              No temples found nearby
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Try refreshing the page or check your location settings
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {nearbyTemples.map((temple) => {
              const crowdInfo = getCrowdLevel(temple)
              return (
                <div
                  key={temple.id}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🕉️</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-neutral-100 truncate">
                          {temple.name}
                        </h3>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary-600">
                            {temple.distance.toFixed(1)} km away
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 dark:text-neutral-400 mb-2">{temple.deity}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
                        {temple.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{temple.rating}</span>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">({temple.review_count})</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className={`text-sm font-medium ${crowdInfo.color}`}>
                              {crowdInfo.level}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-neutral-500 dark:text-neutral-400">
                          <MapPin className="w-4 h-4" />
                          <span>{temple.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleDirections(temple)}
                      className="flex-1 btn-outline text-sm flex items-center justify-center space-x-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={() => navigate(`/temple/${temple.id}`)}
                      className="flex-1 btn-primary text-sm"
                    >
                      View Details
                    </button>
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

export default NearbyDebug
