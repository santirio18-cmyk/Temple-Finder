import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapPin, Sparkles } from 'lucide-react'
import {
  getUniqueNearbyTemples,
  getTopNearbyTemples,
  getUniqueTemples,
  getTopTemples,
  getUniqueTemplesByDeity,
  isTopTemple,
} from '../data/templeUtils'
import type { Temple } from '../data'
import PageHeader from '../components/PageHeader'
import ProfileModal from '../components/ProfileModal'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop'

type TempleTab = 'all' | 'top'

interface Location {
  latitude: number
  longitude: number
}

const SimpleNearby: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const deityFilter = searchParams.get('deity') || ''

  const [location, setLocation] = useState<Location | null>(null)
  const [radius, setRadius] = useState(50)
  const [activeTab, setActiveTab] = useState<TempleTab>('all')
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
          longitude: position.coords.longitude,
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

  const allTempleCount = useMemo(() => {
    if (deityFilter) return getUniqueTemplesByDeity(deityFilter).length
    return getUniqueTemples().length
  }, [deityFilter])

  const topTempleCount = useMemo(() => {
    if (deityFilter) {
      return getUniqueTemplesByDeity(deityFilter).filter((t) => isTopTemple(t)).length
    }
    return getTopTemples().length
  }, [deityFilter])

  const nearbyTemples = useMemo(() => {
    if (!location) return [] as (Temple & { distance: number })[]
    if (activeTab === 'top') {
      return getTopNearbyTemples(location.latitude, location.longitude, radius, deityFilter || null)
    }
    return getUniqueNearbyTemples(location.latitude, location.longitude, radius, deityFilter || null)
  }, [location, radius, activeTab, deityFilter])

  const listReady = !loading && location && nearbyTemples.length > 0
  const pageTitle = deityFilter ? `${deityFilter} Temples Nearby` : 'Nearby Temples'

  return (
    <div className="min-h-screen bg-darshanam-beige">
      <PageHeader
        title={pageTitle}
        onBack={() => navigate('/')}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="px-4 py-6">
        {deityFilter && (
          <p className="text-sm text-darshanam-brown bg-white rounded-xl shadow-sm border border-neutral-100 px-4 py-3 mb-4">
            Showing temples for today&apos;s sacred tithi — <span className="font-semibold text-darshanam-orange">{deityFilter}</span>
          </p>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          {loading ? (
            <p className="text-darshanam-brown-light">Getting your location...</p>
          ) : error ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-medium">{error}</p>
              <p className="text-sm text-amber-600 mt-2">Showing temples near Chennai</p>
            </div>
          ) : location ? (
            <div>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-4 py-2 rounded-xl bg-darshanam-orange text-white font-medium hover:bg-darshanam-orange/90"
              >
                Refresh Location
              </button>
            </div>
          ) : null}
        </div>

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

        <div className="flex gap-2 mb-5 p-1 bg-white rounded-xl shadow-sm border border-neutral-100">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-darshanam-orange text-white shadow-sm'
                : 'text-darshanam-brown-light hover:bg-neutral-50'
            }`}
          >
            All Temples ({allTempleCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('top')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'top'
                ? 'bg-darshanam-orange text-white shadow-sm'
                : 'text-darshanam-brown-light hover:bg-neutral-50'
            }`}
          >
            Top Temples ({topTempleCount})
          </button>
        </div>

        {!listReady ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-darshanam-brown mb-2">No temples found nearby</h3>
            <p className="text-darshanam-brown-light">
              {deityFilter
                ? `Try increasing the radius to find more ${deityFilter} temples`
                : 'Try increasing the search radius'}
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold text-darshanam-brown mb-4">
              {nearbyTemples.length} {nearbyTemples.length === 1 ? 'Temple' : 'Temples'} Found
              {activeTab === 'top' && (
                <span className="block text-sm font-normal text-darshanam-brown-light mt-0.5">
                  Featured temples with full details, timings & festivals
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearbyTemples.map((temple) => (
                <div
                  key={temple.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/temple/${temple.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') navigate(`/temple/${temple.id}`)
                  }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={temple.image || FALLBACK_IMAGE}
                      alt={temple.name}
                      className="w-full h-full object-cover"
                    />
                    {isTopTemple(temple) && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-darshanam-orange text-white text-[10px] font-bold uppercase tracking-wide">
                        <Sparkles className="w-3 h-3" />
                        Top
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-darshanam-brown flex-1">{temple.name}</h3>
                      <span className="text-sm font-medium text-darshanam-orange flex-shrink-0 ml-2">
                        {temple.distance.toFixed(1)} km
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
