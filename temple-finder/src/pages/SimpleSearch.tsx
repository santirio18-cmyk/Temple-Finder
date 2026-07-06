import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, MapPin, Star, Sparkles } from 'lucide-react'
import {
  getUniqueTemples,
  getTopTemples,
  searchUniqueTemples,
  getUniqueTemplesByDeity,
  isTopTemple,
} from '../data/templeUtils'
import PageHeader from '../components/PageHeader'
import ProfileModal from '../components/ProfileModal'

const TEMPLE_IMAGE =
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop'

type TempleTab = 'all' | 'top'

const SimpleSearch: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [deityFilter] = useState(searchParams.get('deity') || '')
  const [activeTab, setActiveTab] = useState<TempleTab>('all')
  const [showProfile, setShowProfile] = useState(false)

  const allTemples = useMemo(() => getUniqueTemples(), [])
  const topTemples = useMemo(() => getTopTemples(), [])

  const [results, setResults] = useState(allTemples)

  useEffect(() => {
    let list = activeTab === 'top' ? topTemples : allTemples

    if (deityFilter) {
      list = getUniqueTemplesByDeity(deityFilter).filter((t) =>
        activeTab === 'top' ? isTopTemple(t) : true
      )
    } else if (query) {
      list = searchUniqueTemples(query).filter((t) =>
        activeTab === 'top' ? isTopTemple(t) : true
      )
    }

    setResults(list)
  }, [query, deityFilter, activeTab, allTemples, topTemples])

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
        <form onSubmit={handleSearch} className="mb-4">
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

        {!deityFilter && !query && (
          <div className="flex gap-2 mb-5 p-1 bg-white rounded-xl shadow-sm border border-neutral-100">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-darshanam-orange text-white shadow-sm'
                  : 'text-darshanam-brown-light hover:bg-neutral-50'
              }`}
            >
              All Temples ({allTemples.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('top')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'top'
                  ? 'bg-darshanam-orange text-white shadow-sm'
                  : 'text-darshanam-brown-light hover:bg-neutral-50'
              }`}
            >
              Top Temples ({topTemples.length})
            </button>
          </div>
        )}

        <h2 className="text-lg font-bold text-darshanam-brown mb-4">
          {results.length} {results.length === 1 ? 'Temple' : 'Temples'} Found
          {activeTab === 'top' && !deityFilter && !query && (
            <span className="block text-sm font-normal text-darshanam-brown-light mt-0.5">
              Featured temples with full details, timings & festivals
            </span>
          )}
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
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={temple.image || TEMPLE_IMAGE}
                    alt={temple.name}
                    className="w-full h-full object-cover"
                  />
                  {isTopTemple(temple) && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-darshanam-orange text-white text-[10px] font-bold uppercase tracking-wide">
                      <Sparkles className="w-3 h-3" />
                      Top
                    </span>
                  )}
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
