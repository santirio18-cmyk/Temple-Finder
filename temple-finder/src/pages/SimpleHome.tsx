import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Star } from 'lucide-react'
import { temples, categories } from '../data'

const SimpleHome: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const featuredTemples = temples.slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">🕉️ Temple Finder</h1>
          <p className="text-xl mb-6">Discover Sacred Places</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search temples, deities, or locations..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate('/nearby')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <span className="font-medium">Nearby</span>
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <Star className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <span className="font-medium">Deities</span>
          </button>
          <button
            onClick={() => navigate('/search')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <Search className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <span className="font-medium">Search</span>
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">🕉️</span>
            <span className="font-medium">All Temples</span>
          </button>
        </div>

        {/* Deity Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Explore by Deity</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/search?deity=${category.name}`)}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-orange-100"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
                {category.mantra && (
                  <p className="text-xs text-gray-600 mt-1">{category.mantra}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Temples */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Temples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTemples.map((temple) => (
              <div
                key={temple.id}
                onClick={() => navigate(`/temple/${temple.id}`)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <span className="text-6xl">🕉️</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{temple.name}</h3>
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
      </div>
    </div>
  )
}

export default SimpleHome
