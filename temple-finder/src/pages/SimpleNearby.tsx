import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import { getNearbyTemples } from '../data'

interface Location {
  latitude: number
  longitude: number
}

const SimpleNearby: React.FC = () => {
  const navigate = useNavigate()
  const [location, setLocation] = useState<Location | null>(null)
  const [radius, setRadius] = useState(50)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      // Use Chennai as default
      setLocation({ latitude: 13.0827, longitude: 80.2707 })
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setLoading(false)
      },
      (_err) => {
        setError('Unable to get your location')
        // Use Chennai as default
        setLocation({ latitude: 13.0827, longitude: 80.2707 })
        setLoading(false)
      }
    )
  }

  const nearbyTemples = location
    ? getNearbyTemples(location.latitude, location.longitude, radius)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">Nearby Temples</h1>
          
          {loading ? (
            <p className="text-gray-600">Getting your location...</p>
          ) : error ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">{error}</p>
              <p className="text-sm text-yellow-600 mt-2">Showing temples near Chennai</p>
            </div>
          ) : location ? (
            <div>
              <p className="text-gray-600 mb-4">
                Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
              <button
                onClick={getCurrentLocation}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Refresh Location
              </button>
            </div>
          ) : null}
        </div>

        {/* Radius Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            Search Radius: {radius} km
          </label>
          <input
            type="range"
            min="1"
            max="200"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 km</span>
            <span>200 km</span>
          </div>
        </div>

        {/* Results */}
        {nearbyTemples.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">No temples found nearby</h3>
            <p className="text-gray-600">Try increasing the search radius</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {nearbyTemples.length} {nearbyTemples.length === 1 ? 'Temple' : 'Temples'} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyTemples.map((temple) => (
                <div
                  key={temple.id}
                  onClick={() => navigate(`/temple/${temple.id}`)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                    <span className="text-6xl">🕉️</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{temple.name}</h3>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {(temple as any).distance.toFixed(1)} km
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{temple.deity}</p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{temple.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{temple.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{temple.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleNearby
