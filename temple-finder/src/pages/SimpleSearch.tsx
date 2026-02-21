import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, MapPin, Star } from 'lucide-react'
import { searchTemples, getTemplesByDeity, temples } from '../data'

const SimpleSearch: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [deityFilter] = useState(searchParams.get('deity') || '')
  const [results, setResults] = useState(temples)

  useEffect(() => {
    if (deityFilter) {
      setResults(getTemplesByDeity(deityFilter))
    } else if (query) {
      setResults(searchTemples(query))
    } else {
      setResults(temples)
    }
  }, [query, deityFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search temples..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {results.length} {results.length === 1 ? 'Temple' : 'Temples'} Found
          </h2>

          {results.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No temples found</h3>
              <p className="text-gray-600">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((temple) => (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default SimpleSearch
