import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, Filter, MapPin, Star, Users, Heart } from 'lucide-react'
import { useSimpleTemple } from '../contexts/SimpleTempleContext'
import { Temple, SearchFilters } from '../types'

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { searchTemples, loading } = useSimpleTemple()
  
  const [temples, setTemples] = useState<Temple[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    deity: searchParams.get('deity') || '',
    rating_min: 0,
    crowd_level: undefined
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    performSearch()
  }, [filters])

  const performSearch = async () => {
    const results = await searchTemples(filters)
    setTemples(results)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const getCrowdLevel = (temple: Temple) => {
    const percentage = (temple.current_occupancy / temple.capacity) * 100
    if (percentage < 30) return { level: 'low', color: 'text-green-500', bg: 'bg-green-100' }
    if (percentage < 70) return { level: 'medium', color: 'text-yellow-500', bg: 'bg-yellow-100' }
    return { level: 'high', color: 'text-red-500', bg: 'bg-red-100' }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.query || ''}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  placeholder="Search temples, deities, or locations..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Deity
                  </label>
                  <select
                    value={filters.deity || ''}
                    onChange={(e) => handleFilterChange('deity', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Deities</option>
                    <option value="Shiva">Shiva</option>
                    <option value="Vishnu">Vishnu</option>
                    <option value="Ganpati">Ganpati</option>
                    <option value="Murugan">Murugan</option>
                    <option value="Devi">Devi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Min Rating
                  </label>
                  <select
                    value={filters.rating_min || 0}
                    onChange={(e) => handleFilterChange('rating_min', Number(e.target.value))}
                    className="input-field"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Crowd Level
                  </label>
                  <select
                    value={filters.crowd_level || ''}
                    onChange={(e) => handleFilterChange('crowd_level', e.target.value || undefined)}
                    className="input-field"
                  >
                    <option value="">Any Level</option>
                    <option value="low">Low Crowd</option>
                    <option value="medium">Medium Crowd</option>
                    <option value="high">High Crowd</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({})}
                    className="btn-outline w-full"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Results List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-neutral-900">
                {temples.length} Temples Found
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-600">Sort by:</span>
                <select className="text-sm border border-neutral-300 rounded px-2 py-1">
                  <option>Distance</option>
                  <option>Rating</option>
                  <option>Name</option>
                </select>
              </div>
            </div>

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
            ) : temples.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                  No temples found
                </h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search criteria or browse by categories
                </p>
                <button
                  onClick={() => navigate('/categories')}
                  className="btn-primary"
                >
                  Browse Categories
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {temples.map((temple) => {
                  const crowdLevel = getCrowdLevel(temple)
                  return (
                    <div
                      key={temple.id}
                      onClick={() => navigate(`/temple/${temple.id}`)}
                      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer"
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
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle favorite toggle
                              }}
                              className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
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
                              <span>{temple.city}, {temple.state}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Map View Toggle */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 sticky top-6">
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
      </div>
    </div>
  )
}

export default SearchPage
