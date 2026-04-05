import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Star, User, ExternalLink } from 'lucide-react'
import { getTempleById } from '../data'
import ProfileModal from '../components/ProfileModal'
import TempleMap from '../components/TempleMap'
import { mapsService } from '../services/mapsService'

const TEMPLE_IMAGE =
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=400&fit=crop'

const SimpleTemple: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = React.useState(false)
  const temple = id ? getTempleById(id) : undefined

  if (!temple) {
    return (
      <div className="min-h-screen bg-darshanam-beige flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🕉️</div>
          <h2 className="text-2xl font-bold text-darshanam-brown mb-4">Temple not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl bg-darshanam-orange text-white font-medium hover:bg-darshanam-orange/90"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-darshanam-beige">
      <div className="sticky top-0 z-10 bg-darshanam-beige/95 backdrop-blur-sm border-b border-darshanam-brown/10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-white/50 text-darshanam-brown"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-darshanam-brown" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-md -mx-4 mb-6">
          <img
            src={temple.image || TEMPLE_IMAGE}
            alt={temple.name}
            className="w-full h-56 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-darshanam-brown mb-1 font-['Playfair_Display',_serif]">
          {temple.name}
        </h1>
        <p className="text-darshanam-orange font-medium mb-6">{temple.deity}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-amber-500 fill-current" />
          <span className="text-lg font-bold text-darshanam-brown">{temple.rating}</span>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-darshanam-brown mb-3">About</h2>
          <p className="text-darshanam-brown-light leading-relaxed">{temple.description}</p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-darshanam-brown mb-3">Location</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-darshanam-brown">{temple.address}</p>
              <p className="text-darshanam-brown-light">{temple.city}, {temple.state}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-darshanam-brown">Map</h3>
            <a
              href={mapsService.getDirectionsUrl({ lat: temple.latitude, lng: temple.longitude })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-darshanam-orange hover:underline"
            >
              Get Directions
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <TempleMap
            center={{ lat: temple.latitude, lng: temple.longitude }}
            zoom={15}
            markers={[{ id: temple.id, lat: temple.latitude, lng: temple.longitude, title: temple.name }]}
            height="256px"
          />
        </div>
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default SimpleTemple
