import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Users, Navigation, RefreshCw, Clock, AlertCircle, TrendingUp, Map } from 'lucide-react'
import { useSimpleTemple } from '../contexts/SimpleTempleContext'
import { Temple } from '../types'
import { locationService, Location } from '../services/locationService'
import { realtimeService, CrowdLevel } from '../services/realtimeService'
import { mapsService } from '../services/mapsService'
import LoadingSpinner from '../components/LoadingSpinner'
import TempleMap from '../components/TempleMap'

interface NearbyTemple extends Temple {
  distance: number
  crowdLevel?: CrowdLevel
}

const Nearby: React.FC = () => {
  const navigate = useNavigate()
  const { temples } = useSimpleTemple()
  const [nearbyTemples, setNearbyTemples] = useState<NearbyTemple[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<Location | null>(null)
  const [radius, setRadius] = useState(100) // km - increased default to show more temples
  const [crowdLevelsMap, setCrowdLevels] = useState<Record<string, CrowdLevel>>({})
  const [error, setError] = useState<string | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null)

  // Debug logging (remove in production)
  console.log('Nearby page - temples count:', temples?.length || 0)

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    if (location && temples && temples.length > 0) {
      findNearbyTemples(location.latitude, location.longitude)
    }
  }, [location, radius, temples])

  // Handle case where temples are loaded after location
  useEffect(() => {
    if (temples && temples.length > 0 && location && nearbyTemples.length === 0) {
      console.log('Temples loaded, finding nearby temples...')
      findNearbyTemples(location.latitude, location.longitude)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temples, location])

  const getCurrentLocation = async () => {
    setLoading(true)
    setError(null)
    console.log('Getting current location...')
    
    try {
      const userLocation = await locationService.getCurrentLocation()
      console.log('Got user location:', userLocation)
      setLocation(userLocation)
    } catch (error: any) {
      console.error('Error getting location:', error)
      setError(error.message)
      
      // Fallback to mock location (Delhi)
      const mockLocation: Location = { 
        latitude: 28.6139, 
        longitude: 77.2090,
        accuracy: 100,
        timestamp: Date.now()
      }
      console.log('Using mock location:', mockLocation)
      setLocation(mockLocation)
    }
  }

  const findNearbyTemples = async (lat: number, lng: number) => {
    setLoading(true)
    console.log('findNearbyTemples called with:', { lat, lng, templesCount: temples.length, radius })
    
    try {
      const userLocation: Location = { latitude: lat, longitude: lng }
      
      if (!temples || temples.length === 0) {
        console.log('No temples available')
        setNearbyTemples([])
        setLoading(false)
        return
      }

      const nearbyTempleData = locationService.findNearbyTemples(
        temples.map(t => ({
          id: t.id,
          name: t.name,
          deity: t.deity,
          rating: t.rating,
          latitude: t.latitude,
          longitude: t.longitude
        })),
        userLocation,
        radius
      )

      console.log('Found nearby temples:', nearbyTempleData.length)

      // Get crowd levels for nearby temples
      const templeIds = nearbyTempleData.map(t => t.templeId)
      const crowdLevelsData = await realtimeService.getCrowdLevels(templeIds)
      
      const crowdLevelsMap: Record<string, CrowdLevel> = {}
      crowdLevelsData.forEach(level => {
        crowdLevelsMap[level.templeId] = level
      })

      setCrowdLevels(crowdLevelsMap)

      // Combine temple data with distance and crowd levels
      const nearbyWithDetails: NearbyTemple[] = nearbyTempleData.map(templeData => {
        const temple = temples.find(t => t.id === templeData.templeId)
        if (!temple) return null

        return {
          ...temple,
          distance: templeData.distance,
          crowdLevel: crowdLevelsMap[temple.id]
        }
      }).filter(Boolean) as NearbyTemple[]

      console.log('Final nearby temples with details:', nearbyWithDetails.length)
      setNearbyTemples(nearbyWithDetails)
    } catch (error) {
      console.error('Error finding nearby temples:', error)
      setError('Failed to find nearby temples')
      
      // Fallback: show first few temples with mock distances
      if (temples && temples.length > 0) {
        const fallbackTemples: NearbyTemple[] = temples.slice(0, 5).map(temple => ({
          ...temple,
          distance: Math.random() * 10 + 1 // Mock distance 1-11 km
        }))
        console.log('Using fallback temples:', fallbackTemples.length)
        setNearbyTemples(fallbackTemples)
      }
    } finally {
      setLoading(false)
    }
  }

  const getCrowdLevelInfo = (crowdLevel?: CrowdLevel) => {
    if (!crowdLevel) {
      return { level: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-100', status: 'unknown' }
    }

    const status = crowdLevel.crowdStatus
    switch (status) {
      case 'low':
        return { level: 'Low Crowd', color: 'text-green-600', bg: 'bg-green-100', status }
      case 'medium':
        return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100', status }
      case 'high':
        return { level: 'High Crowd', color: 'text-orange-600', bg: 'bg-orange-100', status }
      case 'full':
        return { level: 'Very Crowded', color: 'text-red-600', bg: 'bg-red-100', status }
      default:
        return { level: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-100', status }
    }
  }

  const handleDirections = async (temple: NearbyTemple) => {
    if (!location) return

    try {
      const directions = await mapsService.getDirections(
        { lat: location.latitude, lng: location.longitude },
        { lat: temple.latitude, lng: temple.longitude }
      )

      if (directions) {
        alert(`Route: ${directions.distance}, Duration: ${directions.duration}`)
      } else {
        // Fallback to external maps
        const fallbackUrl = mapsService.getFallbackMapUrl(
          { lat: temple.latitude, lng: temple.longitude },
          { lat: location.latitude, lng: location.longitude }
        )
        window.open(fallbackUrl, '_blank')
      }
    } catch (error) {
      console.error('Error getting directions:', error)
      // Fallback to external maps
      const fallbackUrl = mapsService.getFallbackMapUrl(
        { lat: temple.latitude, lng: temple.longitude },
        { lat: location.latitude, lng: location.longitude }
      )
      window.open(fallbackUrl, '_blank')
    }
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showMap 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
              </button>
              <button
                onClick={getCurrentLocation}
                className="btn-outline flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Location Status */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium text-neutral-900">
                  {location ? 'Location detected' : 'Detecting location...'}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {location 
                    ? `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`
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
              max="200"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1 km</span>
              <span>200 km</span>
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

        {/* Interactive Map */}
        {showMap && location && (
          <div className="mb-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
              <h2 className="text-xl font-heading font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Interactive Map
              </h2>
              <TempleMap
                temples={nearbyTemples}
                userLocation={{ lat: location.latitude, lng: location.longitude }}
                selectedTemple={selectedTemple}
                onTempleSelect={setSelectedTemple}
                crowdLevels={crowdLevelsMap}
                className="h-96 w-full"
              />
              {nearbyTemples.length === 0 && (
                <p className="text-sm text-neutral-500 mt-4 text-center">
                  No temples found in this area. Try adjusting your search radius.
                </p>
              )}
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
            {nearbyTemples.map((temple: NearbyTemple) => {
              const crowdInfo = getCrowdLevelInfo(temple.crowdLevel)
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

                      {/* Real-time crowd info */}
                      {temple.crowdLevel && (
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>
                              {temple.crowdLevel.crowdPercentage}% occupied
                              {temple.crowdLevel.predictedCrowd && (
                                <span className="ml-1">
                                  (Next hour: {temple.crowdLevel.predictedCrowd.nextHour}%)
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              Updated {new Date(temple.crowdLevel.lastUpdated).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      )}
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

export default Nearby
