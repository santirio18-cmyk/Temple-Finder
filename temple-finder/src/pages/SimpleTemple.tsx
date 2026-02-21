import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Star } from 'lucide-react'
import { getTempleById } from '../data'

const SimpleTemple: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const temple = id ? getTempleById(id) : undefined

  if (!temple) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🕉️</div>
          <h2 className="text-2xl font-bold mb-2">Temple not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 mb-4 hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">{temple.name}</h1>
          <p className="text-xl mt-2">{temple.deity}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Image */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="h-64 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <span className="text-8xl">🕉️</span>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-lg font-bold">{temple.rating}</span>
          </div>

          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{temple.description}</p>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Location</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">{temple.address}</p>
                  <p className="text-gray-600">{temple.city}, {temple.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Map</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Map integration coming soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Coordinates: {temple.latitude.toFixed(4)}, {temple.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleTemple
