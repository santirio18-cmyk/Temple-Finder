import React, { useState } from 'react'
import { Search, Sparkles, MapPin, Filter } from 'lucide-react'
import { useEnhancedTemple } from '../contexts/EnhancedTempleContext'
import { Temple } from '../types'

interface AISearchComponentProps {
  onResults: (temples: Temple[]) => void
  className?: string
}

const AISearchComponent: React.FC<AISearchComponentProps> = ({ onResults, className = '' }) => {
  const { searchWithAI, searchTemples, loading, aiEnabled } = useEnhancedTemple()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [useAI] = useState(aiEnabled)
  const [searchMode, setSearchMode] = useState<'basic' | 'ai' | 'enhanced'>('basic')

  const handleSearch = async () => {
    if (!query.trim()) return

    try {
      if (useAI && aiEnabled && searchMode === 'ai') {
        // Use AI search for expanded results
        const aiResults = await searchWithAI(query, location)
        onResults(aiResults.temples)
      } else if (searchMode === 'enhanced') {
        // Use enhanced search (combines local + AI)
        const results = await searchTemples({ 
          query, 
          location: location || undefined 
        } as any)
        onResults(results)
      } else {
        // Basic local search
        const results = await searchTemples({ query })
        onResults(results)
      }
    } catch (error) {
      console.error('Search failed:', error)
      // Fallback to basic search
      const results = await searchTemples({ query })
      onResults(results)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const searchExamples = [
    "Shiva temples in Tamil Nadu",
    "Ancient temples with Dravidian architecture", 
    "Temples dedicated to Goddess Durga",
    "Famous Vishnu temples in South India",
    "Temples with historical significance",
    "Pilgrimage sites in Karnataka"
  ]

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Search Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSearchMode('basic')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            searchMode === 'basic'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Search className="w-4 h-4 inline mr-1" />
          Basic
        </button>
        
        {aiEnabled && (
          <>
            <button
              onClick={() => setSearchMode('ai')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                searchMode === 'ai'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              AI Search
            </button>
            
            <button
              onClick={() => setSearchMode('enhanced')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                searchMode === 'enhanced'
                  ? 'bg-gradient-to-r from-orange-100 to-purple-100 text-orange-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-1" />
              Enhanced
            </button>
          </>
        )}
      </div>

      {/* Search Description */}
      <div className="mb-4">
        {searchMode === 'basic' && (
          <p className="text-sm text-gray-600">
            Search through our curated temple database
          </p>
        )}
        {searchMode === 'ai' && (
          <p className="text-sm text-purple-600">
            <Sparkles className="w-4 h-4 inline mr-1" />
            AI-powered search finds temples from across India with detailed information
          </p>
        )}
        {searchMode === 'enhanced' && (
          <p className="text-sm text-orange-600">
            <Filter className="w-4 h-4 inline mr-1" />
            Combines local database with AI discoveries for comprehensive results
          </p>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              searchMode === 'ai' 
                ? "Ask anything about temples... (e.g., 'Famous Shiva temples in South India')"
                : "Search temples, deities, or locations..."
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Location Input (for AI search) */}
        {(searchMode === 'ai' || searchMode === 'enhanced') && (
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Optional: Specify location (e.g., 'Tamil Nadu', 'South India')"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            searchMode === 'ai'
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
              : searchMode === 'enhanced'
              ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
              : 'bg-orange-600 hover:bg-orange-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {searchMode === 'ai' ? 'AI Searching...' : 'Searching...'}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {searchMode === 'ai' ? (
                <Sparkles className="w-5 h-5 mr-2" />
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {searchMode === 'ai' ? 'Search with AI' : 'Search Temples'}
            </div>
          )}
        </button>
      </div>

      {/* Search Examples */}
      {searchMode === 'ai' && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Try these AI search examples:</p>
          <div className="flex flex-wrap gap-2">
            {searchExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Status */}
      {aiEnabled && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                AI Enhanced Search Available
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Access to 1000+ temples
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AISearchComponent

