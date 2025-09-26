import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, MapPin } from 'lucide-react'
import { useTemple } from '../contexts/TempleContext'

const Categories: React.FC = () => {
  const navigate = useNavigate()
  const { categories, temples } = useTemple()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTemplesByDeity = (deityName: string) => {
    return temples.filter(temple => 
      temple.deity.toLowerCase().includes(deityName.toLowerCase())
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
            Explore by Deity
          </h1>
          <p className="text-neutral-600 mb-6">
            Discover temples dedicated to different deities and find your spiritual path
          </p>
          
          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deities..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const categoryTemples = getTemplesByDeity(category.name)
            return (
              <div
                key={category.id}
                onClick={() => navigate(`/search?deity=${category.name}`)}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-600">
                    {category.temple_count} temples
                  </div>
                </div>

                {/* Featured Temples */}
                {categoryTemples.length > 0 && (
                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">
                      Featured Temples
                    </h4>
                    <div className="space-y-2">
                      {categoryTemples.slice(0, 3).map((temple) => (
                        <div
                          key={temple.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/temple/${temple.id}`)
                          }}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">🕉️</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-neutral-900 text-sm truncate">
                              {temple.name}
                            </h5>
                            <div className="flex items-center space-x-2 text-xs text-neutral-500">
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span>{temple.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{temple.city}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {categoryTemples.length > 3 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/search?deity=${category.name}`)
                        }}
                        className="w-full mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all {category.temple_count} temples →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
              No deities found
            </h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your search terms
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-primary"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
