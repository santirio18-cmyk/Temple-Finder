import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, User, ExternalLink } from 'lucide-react'
import { getTempleById } from '../data'
import ProfileModal from '../components/ProfileModal'
import { mapsService } from '../services/mapsService'
import { getPlaceDetails, type PlaceDetailsResult } from '../services/placesService'

const TEMPLE_IMAGE =
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=400&fit=crop'

const SimpleTemple: React.FC = () => {
  const { id: rawId } = useParams<{ id: string }>()
  const id = rawId ? decodeURIComponent(rawId) : ''
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = React.useState(false)
  const [place, setPlace] = useState<PlaceDetailsResult | null>(null)
  const [placeLoading, setPlaceLoading] = useState(false)
  const [placeError, setPlaceError] = useState<string | null>(null)

  const staticTemple = id ? getTempleById(id) : undefined

  useEffect(() => {
    if (staticTemple || !id) {
      setPlace(null)
      setPlaceError(null)
      setPlaceLoading(false)
      return
    }
    setPlaceLoading(true)
    setPlaceError(null)
    getPlaceDetails(id)
      .then((p) => {
        setPlace(p)
        if (!p) setPlaceError('Could not load this place. Check Places API and billing.')
        setPlaceLoading(false)
      })
      .catch(() => {
        setPlaceError('Failed to load place details.')
        setPlaceLoading(false)
      })
  }, [id, staticTemple])

  if (!id) {
    return null
  }

  if (!staticTemple && placeLoading) {
    return (
      <div className="min-h-screen bg-darshanam-beige flex items-center justify-center px-4">
        <p className="text-darshanam-brown">Loading temple…</p>
      </div>
    )
  }

  if (!staticTemple && !place && !placeLoading) {
    return (
      <div className="min-h-screen bg-darshanam-beige flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🕉️</div>
          <h2 className="text-2xl font-bold text-darshanam-brown mb-4">
            {placeError || 'Temple not found'}
          </h2>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl bg-darshanam-orange text-white font-medium hover:bg-darshanam-orange/90"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  if (staticTemple) {
    return (
      <div className="min-h-screen bg-darshanam-beige">
        <div className="sticky top-0 z-10 bg-darshanam-beige/95 backdrop-blur-sm border-b border-darshanam-brown/10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-lg hover:bg-white/50 text-darshanam-brown"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
              aria-label="Profile"
            >
              <User className="w-5 h-5 text-darshanam-brown" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-8">
          <div className="rounded-2xl overflow-hidden shadow-md -mx-4 mb-6">
            <img
              src={staticTemple.image || TEMPLE_IMAGE}
              alt={staticTemple.name}
              className="w-full h-56 object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-darshanam-brown mb-1 font-['Playfair_Display',_serif]">
            {staticTemple.name}
          </h1>
          <p className="text-darshanam-orange font-medium mb-6">{staticTemple.deity}</p>

          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span className="text-lg font-bold text-darshanam-brown">{staticTemple.rating}</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-darshanam-brown mb-3">About</h2>
            <p className="text-darshanam-brown-light leading-relaxed">{staticTemple.description}</p>
            
            {staticTemple.specialSignificance && (
              <div className="mt-4 p-3 bg-orange-50 border-l-4 border-darshanam-orange rounded-r-lg">
                <p className="text-sm font-medium text-darshanam-orange mb-1">⭐ Special Significance</p>
                <p className="text-sm text-darshanam-brown">{staticTemple.specialSignificance}</p>
              </div>
            )}
          </div>

          {(staticTemple.openingHours || staticTemple.phoneNumber || staticTemple.parking !== undefined || staticTemple.photographyAllowed !== undefined) && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-darshanam-brown mb-4">Visitor Information</h3>
              <div className="space-y-3">
                {staticTemple.openingHours && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⏰</span>
                    <div>
                      <p className="font-medium text-darshanam-brown">Opening Hours</p>
                      <p className="text-sm text-darshanam-brown-light">{staticTemple.openingHours}</p>
                    </div>
                  </div>
                )}
                
                {staticTemple.phoneNumber && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="font-medium text-darshanam-brown">Contact</p>
                      <a href={`tel:${staticTemple.phoneNumber}`} className="text-sm text-darshanam-orange hover:underline">
                        {staticTemple.phoneNumber}
                      </a>
                    </div>
                  </div>
                )}

                {staticTemple.parking !== undefined && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🚗</span>
                    <div>
                      <p className="font-medium text-darshanam-brown">Parking</p>
                      <p className="text-sm text-darshanam-brown-light">
                        {staticTemple.parking ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>
                )}

                {staticTemple.photographyAllowed !== undefined && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📸</span>
                    <div>
                      <p className="font-medium text-darshanam-brown">Photography</p>
                      <p className="text-sm text-darshanam-brown-light">
                        {staticTemple.photographyAllowed ? 'Allowed' : 'Not Allowed'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {staticTemple.festivals && staticTemple.festivals.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-darshanam-brown mb-4">🎉 Festivals Celebrated</h3>
              <div className="space-y-2">
                {staticTemple.festivals.map((festival, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-darshanam-brown-light">
                    <span className="w-2 h-2 bg-darshanam-orange rounded-full"></span>
                    <span>{festival}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-darshanam-brown mb-3">Location</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-darshanam-brown">{staticTemple.address}</p>
                <p className="text-darshanam-brown-light">{staticTemple.city}, {staticTemple.state}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-darshanam-brown mb-4">Navigation</h3>
            <div className="space-y-3">
              <a
                href={mapsService.getDirectionsUrl({ lat: staticTemple.latitude, lng: staticTemple.longitude })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 bg-darshanam-orange text-white rounded-xl hover:bg-darshanam-orange/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Get Directions</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${staticTemple.latitude},${staticTemple.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-darshanam-orange text-darshanam-orange rounded-xl hover:bg-darshanam-cream transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 5.25 7.5 14.5 8.5 15.5 1-1 8.5-10.25 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                  <span className="font-medium">View on Google Maps</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-darshanam-brown-light mt-3 text-center">
              Opens in Google Maps • Free • Works offline
            </p>
          </div>
        </div>

        <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      </div>
    )
  }

  if (!place) return null

  return (
    <div className="min-h-screen bg-darshanam-beige">
      <div className="sticky top-0 z-10 bg-darshanam-beige/95 backdrop-blur-sm border-b border-darshanam-brown/10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/50 text-darshanam-brown"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-darshanam-brown" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="rounded-2xl overflow-hidden shadow-md -mx-4 mb-6">
          <img
            src={place.photoUrl || TEMPLE_IMAGE}
            alt={place.name}
            className="w-full h-56 object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-darshanam-brown mb-1 font-['Playfair_Display',_serif]">
          {place.name}
        </h1>
        <p className="text-darshanam-orange font-medium mb-6">Hindu temple · Google Maps</p>

        {place.rating != null && (
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <span className="text-lg font-bold text-darshanam-brown">{place.rating.toFixed(1)}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-darshanam-brown mb-3">Address</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-darshanam-brown-light leading-relaxed">{place.address}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-darshanam-brown mb-4">Navigation</h3>
          <div className="space-y-3">
            <a
              href={mapsService.getDirectionsUrl({ lat: place.lat, lng: place.lng })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 bg-darshanam-orange text-white rounded-xl hover:bg-darshanam-orange/90 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Get Directions</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={place.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-darshanam-orange text-darshanam-orange rounded-xl hover:bg-darshanam-cream transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 5.25 7.5 14.5 8.5 15.5 1-1 8.5-10.25 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
                <span className="font-medium">View on Google Maps</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-darshanam-brown-light mt-3 text-center">
            Opens in Google Maps • Free • Works offline
          </p>
        </div>
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default SimpleTemple
