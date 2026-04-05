import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { getNearbyTemples } from '../data'
import PageHeader from '../components/PageHeader'
import ProfileModal from '../components/ProfileModal'
import TempleMap from '../components/TempleMap'

const TEMPLE_IMAGE =
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop'

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
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
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
      () => {
        setError('Unable to get your location')
        setLocation({ latitude: 13.0827, longitude: 80.2707 })
        setLoading(false)
      }
    )
  }

  const nearbyTemples = location
    ? getNearbyTemples(location.latitude, location.longitude, radius)
    : []

  return (
    <div className="min-h-screen bg-darshanam-beige">
      <PageHeader
        title="Nearby Temples"
        onBack={() => navigate('/')}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="px-4 py-6">
        {/* Location Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          {loading ? (
            <p className="text-darshanam-brown-light">Getting your location...</p>
          ) : error ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-medium">{error}</p>
              <p className="text-sm text-amber-600 mt-2">Showing temples near Chennai</p>
            </div>
          ) : location ? (
            <div>
              <p className="text-darshanam-brown-light text-sm mb-4">
                Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
              <button
                onClick={getCurrentLocation}
                className="px-4 py-2 rounded-xl bg-darshanam-orange text-white font-medium hover:bg-darshanam-orange/90"
              >
                Refresh Location
              </button>
            </div>
          ) : null}
        </div>

        {/* Radius Selector */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-darshanam-brown mb-2">
            Search Radius: {radius} km
          </label>
          <input
            type="range"
            min="1"
            max="200"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-darshanam-orange"
          />
          <div className="flex justify-between text-xs text-darshanam-brown-light mt-1">
            <span>1 km</span>
            <span>200 km</span>
          </div>
        </div>

        {/* Map - show when we have temples and location */}
        {nearbyTemples.length > 0 && location && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-darshanam-brown mb-4">Map View</h2>
            <TempleMap
              center={{ lat: location.latitude, lng: location.longitude }}
              zoom={12}
              markers={nearbyTemples.map((t) => ({
                id: t.id,
                lat: t.latitude,
                lng: t.longitude,
                title: t.name,
              }))}
              height="280px"
            />
          </div>
        )}

        {/* Results */}
        {nearbyTemples.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-darshanam-brown mb-2">No temples found nearby</h3>
            <p className="text-darshanam-brown-light">Try increasing the search radius</p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold text-darshanam-brown mb-4">
              {nearbyTemples.length} {nearbyTemples.length === 1 ? 'Temple' : 'Temples'} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyTemples.map((temple) => (
                <div
                  key={temple.id}
                  onClick={() => navigate(`/temple/${temple.id}`)}
                  className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={temple.image || TEMPLE_IMAGE}
                      alt={temple.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-darshanam-brown flex-1">{temple.name}</h3>
                      <span className="text-sm font-medium text-darshanam-orange flex-shrink-0 ml-2">
                        {(temple as { distance?: number }).distance?.toFixed(1) ?? '—'} km
                      </span>
                    </div>
                    <p className="text-darshanam-orange text-sm mb-2">{temple.deity}</p>
                    <div className="flex items-center gap-1.5 text-sm text-darshanam-brown-light">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{temple.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default SimpleNearby
