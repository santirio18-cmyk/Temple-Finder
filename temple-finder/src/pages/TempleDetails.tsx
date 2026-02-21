import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  Users, 
  Camera,
  Calendar
} from 'lucide-react'
import { useSimpleTemple } from '../contexts/SimpleTempleContext'
import { Temple, PoojaTiming, Review } from '../types'

const TempleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getTempleById, getTempleTimings, getTempleReviews, addToFavorites, removeFromFavorites } = useSimpleTemple()
  
  const [temple, setTemple] = useState<Temple | null>(null)
  const [timings, setTimings] = useState<PoojaTiming[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'timings' | 'reviews'>('overview')

  useEffect(() => {
    if (id) {
      loadTempleData()
    }
  }, [id])

  const loadTempleData = async () => {
    if (!id) return
    
    setLoading(true)
    try {
      const [templeData, timingsData, reviewsData] = await Promise.all([
        getTempleById(id),
        getTempleTimings(id),
        getTempleReviews(id)
      ])
      
      setTemple(templeData)
      setTimings(timingsData)
      setReviews(reviewsData)
    } catch (error) {
      console.error('Failed to load temple data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFavoriteToggle = async () => {
    if (!temple) return
    
    try {
      if (isFavorite) {
        await removeFromFavorites(temple.id)
      } else {
        await addToFavorites(temple.id)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

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
          <p className="text-neutral-600">Loading temple details...</p>
        </div>
      </div>
    )
  }

  if (!temple) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🕉️</div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
            Temple not found
          </h2>
          <p className="text-neutral-600 mb-6">
            The temple you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const crowdLevel = getCrowdLevel(temple)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-neutral-600 hover:text-primary-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-neutral-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 text-neutral-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Temple Header */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                    {temple.name}
                  </h1>
                  <p className="text-xl text-primary-600 font-medium mb-2">
                    {temple.deity}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-neutral-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{temple.city}, {temple.state}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{temple.rating}</span>
                      <span>({temple.review_count} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${crowdLevel.bg} ${crowdLevel.color}`}>
                    <Users className="w-4 h-4 mr-1" />
                    {crowdLevel.level} Crowd
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    {temple.current_occupancy}/{temple.capacity} visitors
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="btn-primary flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
                <button className="btn-outline flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Plan Visit</span>
                </button>
                <button className="btn-outline flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                Photos
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {temple.images.length > 0 ? (
                  temple.images.map((_image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-4xl">🕉️</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                      <p className="text-neutral-600">No photos available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="border-b border-neutral-200">
                <nav className="flex">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'timings', label: 'Timings' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-4 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-neutral-900 mb-3">
                        About This Temple
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {temple.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-heading font-bold text-neutral-900 mb-3">
                        History
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {temple.history}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-heading font-bold text-neutral-900 mb-3">
                        Significance
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {temple.significance}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-heading font-bold text-neutral-900 mb-3">
                        Architecture
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {temple.architecture}
                      </p>
                    </div>

                    {temple.legends && temple.legends.length > 0 && (
                      <div>
                        <h3 className="text-lg font-heading font-bold text-neutral-900 mb-3">
                          Legends
                        </h3>
                        <ul className="space-y-2">
                          {temple.legends.map((legend: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-primary-500 mt-1">•</span>
                              <span className="text-neutral-700">{legend}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'timings' && (
                  <div>
                    <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                      Pooja Timings
                    </h3>
                    <div className="space-y-3">
                      {timings.map((timing) => (
                        <div
                          key={timing.id}
                          className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-neutral-900">{timing.name}</h4>
                            <p className="text-sm text-neutral-600">{timing.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-neutral-900">
                              {timing.start_time} - {timing.end_time}
                            </p>
                            {timing.is_special && (
                              <span className="inline-block px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full mt-1">
                                Special
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                      Reviews ({reviews.length})
                    </h3>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-neutral-200 pb-4 last:border-b-0">
                          <div className="flex items-start space-x-3 mb-2">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-medium text-sm">
                                {review.user_name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-neutral-900">{review.user_name}</h4>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? 'text-yellow-500 fill-current' : 'text-neutral-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-neutral-600 mb-2">{review.comment}</p>
                              <p className="text-xs text-neutral-500">
                                Visited on {new Date(review.visit_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-neutral-900">{temple.address}</p>
                    <p className="text-sm text-neutral-600">{temple.city}, {temple.state} {temple.country}</p>
                  </div>
                </div>
                
                {temple.contact_phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <a
                      href={`tel:${temple.contact_phone}`}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      {temple.contact_phone}
                    </a>
                  </div>
                )}
                
                {temple.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-neutral-400" />
                    <a
                      href={temple.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Crowd Status */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                Current Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">Crowd Level</span>
                    <span className={`text-sm font-medium ${crowdLevel.color}`}>
                      {crowdLevel.level}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        crowdLevel.level === 'Low' ? 'bg-green-500' :
                        crowdLevel.level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(temple.current_occupancy / temple.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    {temple.current_occupancy} of {temple.capacity} visitors
                  </p>
                </div>
                
                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-2">Best visiting times:</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Early Morning</span>
                      <span className="text-green-600 font-medium">6:00 AM - 8:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Evening</span>
                      <span className="text-yellow-600 font-medium">6:00 PM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TempleDetails
