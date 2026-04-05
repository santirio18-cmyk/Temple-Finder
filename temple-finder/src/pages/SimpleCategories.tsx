import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import { categories, getTemplesByDeity } from '../data'
import PageHeader from '../components/PageHeader'
import ProfileModal from '../components/ProfileModal'

const SimpleCategories: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-darshanam-beige">
      <PageHeader
        title="Explore by Deity"
        onBack={() => navigate('/')}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="px-4 py-6">
        <p className="text-darshanam-brown-light mb-6">
          Discover temples dedicated to different deities
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deities..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white shadow-sm border border-neutral-100 text-darshanam-brown placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-darshanam-orange/50 focus:border-darshanam-orange"
          />
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const categoryTemples = getTemplesByDeity(category.name)
            return (
              <div
                key={category.id}
                onClick={() => navigate(`/search?deity=${category.name}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="text-xl font-bold text-darshanam-brown mb-2">
                        {category.name}
                      </h3>
                      <p className="text-darshanam-brown-light text-sm mb-3">
                        {category.description}
                      </p>
                      {category.mantra && (
                        <div className="bg-darshanam-cream rounded-xl p-3 mb-3">
                          <p className="text-sm font-medium text-darshanam-brown">{category.mantra}</p>
                        </div>
                      )}
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-darshanam-orange/10 text-darshanam-orange">
                        {categoryTemples.length} temples
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-darshanam-orange flex-shrink-0 ml-2" />
                  </div>

                  {/* Featured Temples */}
                  {categoryTemples.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-neutral-100">
                      <h4 className="text-sm font-medium text-darshanam-brown mb-3">
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
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-darshanam-beige transition-colors"
                          >
                            <div className="w-10 h-10 bg-darshanam-cream rounded-lg flex items-center justify-center text-xl">
                              🕉️
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-darshanam-brown truncate">
                                {temple.name}
                              </h5>
                              <p className="text-xs text-darshanam-brown-light">{temple.city}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-darshanam-orange" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-darshanam-brown mb-2">No deities found</h3>
            <p className="text-darshanam-brown-light">Try adjusting your search</p>
          </div>
        )}
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default SimpleCategories
