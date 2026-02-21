import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { categories, getTemplesByDeity } from '../data'

const SimpleCategories: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore by Deity</h1>
          <p className="text-gray-600 mb-6">Discover temples dedicated to different deities</p>
          
          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deities..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  {category.mantra && (
                    <div className="bg-orange-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-gray-800">{category.mantra}</p>
                    </div>
                  )}
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-600">
                    {categoryTemples.length} temples
                  </div>
                </div>

                {/* Featured Temples */}
                {categoryTemples.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Featured Temples</h4>
                    <div className="space-y-2">
                      {categoryTemples.slice(0, 3).map((temple) => (
                        <div
                          key={temple.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/temple/${temple.id}`)
                          }}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">🕉️</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">{temple.name}</h5>
                            <p className="text-xs text-gray-500">{temple.city}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No deities found</h3>
            <p className="text-gray-600">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleCategories
