import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Users, Navigation, RefreshCw } from 'lucide-react'
import { useTemple } from '../contexts/TempleContext'
import { Temple } from '../types'

const Nearby: React.FC = () => {
  const navigate = useNavigate()
  const { temples } = useTemple()
  const [nearbyTemples, setNearbyTemples] = useState<Temple[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [radius, setRadius] = useState(10) // km

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          findNearbyTemples(latitude, longitude)
        },
        (error) => {
          console.error('Error getting location:', error)
          // Fallback to mock location (Delhi)
          const mockLocation = { lat: 28.6139, lng: 77.2090 }
          setLocation(mockLocation)
          findNearbyTemples(mockLocation.lat, mockLocation.lng)
        }
      )
    } else {
      // Fallback to mock location
      const mockLocation = { lat: 28.6139, lng: 77.2090 }
      setLocation(mockLocation)
      findNearbyTemples(mockLocation.lat, mockLocation.lng)
    }
  }

  const findNearbyTemples = (lat: number, lng: number) => {
    // Mock nearby temples - in a real app, you'd calculate distance
    const nearby = temples.slice(0, 5).map((temple, index) => ({
      ...temple,
      distance: Math.random() * radius // Mock distance
    }))
    
    setNearbyTemples(nearby)
    setLoading(false)
  }

  const getCrowdLevel = (temple: Temple) => {
    const percentage = (temple.current_occupancy / temple.capacity) * 100
    if (percentage < 30) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage < 70) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-900">
                Nearby Temples
              </h1>
              <p className="text-neutral-600">
                Discover temples close to your current location
              </p>
            </div>
            <button
              onClick={getCurrentLocation}
              className="btn-outline flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Location Status */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-neutral-900">
                  {location ? 'Location detected' : 'Detecting location...'}
                </p>
                <p className="text-sm text-neutral-600">
                  {location 
                    ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`
                    : 'Please allow location access for better results'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Radius Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Search Radius: {radius} km
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-neutral-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : nearbyTemples.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No temples found nearby
            </h3>
            <p className="text-neutral-600 mb-6">
              Try increasing your search radius or check your location settings
            </p>
            <button
              onClick={getCurrentLocation}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {nearbyTemples.map((temple) => {
              const crowdLevel = getCrowdLevel(temple)
              return (
                <div
                  key={temple.id}
                  onClick={() => navigate(`/temple/${temple.id}`)}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🕉️</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading font-bold text-lg text-neutral-900 truncate">
                          {temple.name}
                        </h3>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary-600">
                            {temple.distance?.toFixed(1)} km away
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 mb-2">{temple.deity}</p>
                      <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                        {temple.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{temple.rating}</span>
                            <span className="text-sm text-neutral-500">({temple.review_count})</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className={`text-sm font-medium ${crowdLevel.color}`}>
                              {crowdLevel.level} crowd
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-neutral-500">
                          <MapPin className="w-4 h-4" />
                          <span>{temple.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle directions
                      }}
                      className="flex-1 btn-outline text-sm flex items-center justify-center space-x-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/temple/${temple.id}`)
                      }}
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

        {/* Map View Placeholder */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="font-heading font-bold text-lg text-neutral-900 mb-4">
            Map View
          </h3>
          <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
              <p className="text-neutral-600">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nearby
