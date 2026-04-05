import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, MapPin, Star } from 'lucide-react'
import { searchTemples, getTemplesByDeity, temples } from '../data'
import PageHeader from '../components/PageHeader'
import ProfileModal from '../components/ProfileModal'

const TEMPLE_IMAGE =
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop'

const SimpleSearch: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [deityFilter] = useState(searchParams.get('deity') || '')
  const [results, setResults] = useState(temples)
  const [showProfile, setShowProfile] = useState(false)

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
    <div className="min-h-screen bg-darshanam-beige">
      <PageHeader
        title="Search Temples"
        onBack={() => navigate('/')}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="px-4 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Temples, Deities, or Festivals..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white shadow-sm border border-neutral-100 text-darshanam-brown placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-darshanam-orange/50 focus:border-darshanam-orange"
            />
          </div>
        </form>

        {/* Results */}
        <h2 className="text-lg font-bold text-darshanam-brown mb-4">
          {results.length} {results.length === 1 ? 'Temple' : 'Temples'} Found
        </h2>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-darshanam-brown mb-2">No temples found</h3>
            <p className="text-darshanam-brown-light">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((temple) => (
              <div
                key={temple.id}
                onClick={() => navigate(`/temple/${temple.id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={temple.image || TEMPLE_IMAGE}
                    alt={temple.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-darshanam-brown mb-1">{temple.name}</h3>
                  <p className="text-darshanam-orange text-sm mb-2">{temple.deity}</p>
                  <p className="text-sm text-darshanam-brown-light line-clamp-2 mb-3">
                    {temple.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-sm font-medium">{temple.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-darshanam-brown-light">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{temple.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}

export default SimpleSearch
