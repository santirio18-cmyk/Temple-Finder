import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, Users, Clock } from 'lucide-react'
import { useTemple } from '../contexts/TempleContext'
import { DeityCategory } from '../types'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { categories, temples } = useTemple()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const featuredTemples = temples.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Discover Sacred Places
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Find temples, explore deities, and plan your spiritual journey with AI-powered search
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search temples, deities, or locations..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-primary-500 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => navigate('/nearby')}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center"
            >
              <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <span className="font-medium text-neutral-900">Nearby Temples</span>
            </button>
            
            <button
              onClick={() => navigate('/categories')}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center"
            >
              <Star className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <span className="font-medium text-neutral-900">Deity Categories</span>
            </button>
            
            <button
              onClick={() => navigate('/favorites')}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center"
            >
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <span className="font-medium text-neutral-900">My Favorites</span>
            </button>
            
            <button
              onClick={() => navigate('/search')}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow text-center"
            >
              <Search className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <span className="font-medium text-neutral-900">Advanced Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deity Categories */}
      <div className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Explore by Deity
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/search?deity=${category.name}`)}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-orange-100"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-neutral-900 mb-1">{category.name}</h3>
                <p className="text-sm text-neutral-600">{category.temple_count} temples</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Temples */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Featured Temples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTemples.map((temple) => (
              <div
                key={temple.id}
                onClick={() => navigate(`/temple/${temple.id}`)}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <span className="text-6xl">🕉️</span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-neutral-900 mb-2">
                    {temple.name}
                  </h3>
                  <p className="text-neutral-600 mb-3">{temple.deity}</p>
                  <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                    {temple.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{temple.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-neutral-600">
                          {Math.round((temple.current_occupancy / temple.capacity) * 100)}%
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
            ))}
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="py-8 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="font-heading font-bold text-lg text-neutral-900 mb-4">
              Weather for Temple Visits
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">☀️</div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">28°C</p>
                  <p className="text-neutral-600">Perfect for temple visits</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">Best visiting hours</p>
                <p className="font-medium text-neutral-900">6:00 AM - 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
