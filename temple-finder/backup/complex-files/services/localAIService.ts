// Local AI Service for Temple Finder
// This service provides intelligent search using local data and patterns

import { Temple } from '../types'
import { mockTemples } from './mockDataService'

export interface TempleSearchResult {
  temples: Temple[]
  totalFound: number
  searchQuery: string
  source: 'local-ai' | 'pattern-matching' | 'suggestion'
  message?: string
}

export class LocalAIService {
  private static instance: LocalAIService

  static getInstance(): LocalAIService {
    if (!LocalAIService.instance) {
      LocalAIService.instance = new LocalAIService()
    }
    return LocalAIService.instance
  }

  /**
   * Intelligent search using pattern matching and semantic understanding
   */
  async searchTemplesAI(query: string, location?: string): Promise<TempleSearchResult> {
    console.log('Local AI Search:', query, location)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    try {
      // Parse the query for semantic understanding
      const searchContext = this.parseQuery(query, location)
      
      // Apply intelligent filtering
      let results = await this.intelligentFilter(searchContext)
      
      // If no results, provide suggestions
      if (results.length === 0) {
        return {
          temples: [],
          totalFound: 0,
          searchQuery: query,
          source: 'suggestion',
          message: this.generateSearchSuggestions(query)
        }
      }
      
      // Enhance results with additional context
      results = this.enhanceResults(results, searchContext)
      
      return {
        temples: results,
        totalFound: results.length,
        searchQuery: query,
        source: 'local-ai',
        message: `Found ${results.length} temples matching "${query}"`
      }
      
    } catch (error) {
      console.error('Local AI search failed:', error)
      return {
        temples: [],
        totalFound: 0,
        searchQuery: query,
        source: 'suggestion',
        message: 'Search temporarily unavailable. Please try again.'
      }
    }
  }

  /**
   * Parse query for semantic understanding
   */
  private parseQuery(query: string, location?: string) {
    const lowerQuery = query.toLowerCase()
    
    return {
      originalQuery: query,
      location: location?.toLowerCase() || '',
      
      // Extract deities
      deities: this.extractDeities(lowerQuery),
      
      // Extract locations
      locations: this.extractLocations(lowerQuery),
      
      // Extract characteristics
      characteristics: this.extractCharacteristics(lowerQuery),
      
      // Extract intent
      intent: this.extractIntent(lowerQuery),
      
      // Search terms
      searchTerms: lowerQuery.split(' ').filter(term => term.length > 2)
    }
  }

  /**
   * Extract deity names from query
   */
  private extractDeities(query: string): string[] {
    const deityPatterns = [
      { pattern: /shiva|shiv|mahadev/i, deity: 'Shiva' },
      { pattern: /vishnu|narayan|krishna|rama/i, deity: 'Vishnu' },
      { pattern: /ganesh|ganpati|vinayak/i, deity: 'Ganpati' },
      { pattern: /murugan|kartikeya|subramanya/i, deity: 'Murugan' },
      { pattern: /devi|durga|kali|parvati|lakshmi/i, deity: 'Devi' },
      { pattern: /hanuman|anjani/i, deity: 'Hanuman' },
      { pattern: /meenakshi/i, deity: 'Meenakshi' },
      { pattern: /jagannath/i, deity: 'Jagannath' },
      { pattern: /swaminarayan/i, deity: 'Swaminarayan' }
    ]
    
    const foundDeities: string[] = []
    deityPatterns.forEach(({ pattern, deity }) => {
      if (pattern.test(query)) {
        foundDeities.push(deity)
      }
    })
    
    return foundDeities
  }

  /**
   * Extract location names from query
   */
  private extractLocations(query: string): string[] {
    const locationPatterns = [
      { pattern: /tamil nadu|madurai|chennai/i, location: 'Tamil Nadu' },
      { pattern: /andhra pradesh|tirupati|hyderabad/i, location: 'Andhra Pradesh' },
      { pattern: /uttar pradesh|varanasi|kashi|allahabad/i, location: 'Uttar Pradesh' },
      { pattern: /gujarat|ahmedabad|surat|somnath|dwarka/i, location: 'Gujarat' },
      { pattern: /punjab|amritsar|chandigarh/i, location: 'Punjab' },
      { pattern: /delhi|new delhi/i, location: 'Delhi' },
      { pattern: /odisha|puri|bhubaneswar/i, location: 'Odisha' },
      { pattern: /karnataka|bangalore|mysore/i, location: 'Karnataka' },
      { pattern: /kerala|kochi|thiruvananthapuram/i, location: 'Kerala' },
      { pattern: /rajasthan|jaipur|udaipur/i, location: 'Rajasthan' },
      { pattern: /maharashtra|mumbai|pune/i, location: 'Maharashtra' }
    ]
    
    const foundLocations: string[] = []
    locationPatterns.forEach(({ pattern, location }) => {
      if (pattern.test(query)) {
        foundLocations.push(location)
      }
    })
    
    return foundLocations
  }

  /**
   * Extract characteristics from query
   */
  private extractCharacteristics(query: string): string[] {
    const characteristics: string[] = []
    
    if (/famous|popular|well.?known/i.test(query)) characteristics.push('famous')
    if (/ancient|old|historic|historical/i.test(query)) characteristics.push('ancient')
    if (/beautiful|magnificent|stunning/i.test(query)) characteristics.push('beautiful')
    if (/sacred|holy|divine/i.test(query)) characteristics.push('sacred')
    if (/large|big|huge/i.test(query)) characteristics.push('large')
    if (/small|tiny/i.test(query)) characteristics.push('small')
    if (/golden/i.test(query)) characteristics.push('golden')
    if (/dravidian/i.test(query)) characteristics.push('dravidian')
    if (/nagara/i.test(query)) characteristics.push('nagara')
    
    return characteristics
  }

  /**
   * Extract search intent
   */
  private extractIntent(query: string): string {
    if (/near|nearby|close/i.test(query)) return 'nearby'
    if (/visit|go|travel/i.test(query)) return 'visit'
    if (/pray|worship|darshan/i.test(query)) return 'prayer'
    if (/festival|celebration/i.test(query)) return 'festival'
    if (/history|historical|story/i.test(query)) return 'history'
    if (/architecture|design|structure/i.test(query)) return 'architecture'
    return 'general'
  }

  /**
   * Apply intelligent filtering based on parsed context
   */
  private async intelligentFilter(context: any): Promise<Temple[]> {
    let results = [...mockTemples]
    
    // Filter by deities
    if (context.deities.length > 0) {
      results = results.filter(temple => 
        context.deities.some((deity: string) => 
          temple.deity.toLowerCase().includes(deity.toLowerCase()) ||
          temple.name.toLowerCase().includes(deity.toLowerCase())
        )
      )
    }
    
    // Filter by locations
    if (context.locations.length > 0) {
      results = results.filter(temple => 
        context.locations.some((location: string) => 
          temple.state.toLowerCase().includes(location.toLowerCase()) ||
          temple.city.toLowerCase().includes(location.toLowerCase())
        )
      )
    }
    
    // Filter by characteristics
    if (context.characteristics.includes('famous')) {
      results = results.filter(temple => temple.rating >= 4.5)
    }
    
    if (context.characteristics.includes('ancient')) {
      results = results.filter(temple => 
        temple.name.includes('Somnath') || 
        temple.name.includes('Kashi') ||
        temple.name.includes('Meenakshi')
      )
    }
    
    if (context.characteristics.includes('golden')) {
      results = results.filter(temple => 
        temple.name.toLowerCase().includes('golden')
      )
    }
    
    // Filter by search terms
    if (context.searchTerms.length > 0) {
      results = results.filter(temple => {
        const searchableText = `${temple.name} ${temple.deity} ${temple.city} ${temple.state} ${temple.description}`.toLowerCase()
        return context.searchTerms.some((term: string) => searchableText.includes(term))
      })
    }
    
    // Sort by relevance
    results = this.sortByRelevance(results, context)
    
    return results.slice(0, 10) // Limit to 10 results
  }

  /**
   * Sort results by relevance
   */
  private sortByRelevance(temples: Temple[], context: any): Temple[] {
    return temples.sort((a, b) => {
      let scoreA = 0
      let scoreB = 0
      
      // Boost score for exact name matches
      if (a.name.toLowerCase().includes(context.originalQuery.toLowerCase())) scoreA += 10
      if (b.name.toLowerCase().includes(context.originalQuery.toLowerCase())) scoreB += 10
      
      // Boost score for deity matches
      if (context.deities.some((deity: string) => a.deity.toLowerCase().includes(deity.toLowerCase()))) scoreA += 5
      if (context.deities.some((deity: string) => b.deity.toLowerCase().includes(deity.toLowerCase()))) scoreB += 5
      
      // Boost score for location matches
      if (context.locations.some((location: string) => a.state.toLowerCase().includes(location.toLowerCase()))) scoreA += 3
      if (context.locations.some((location: string) => b.state.toLowerCase().includes(location.toLowerCase()))) scoreB += 3
      
      // Boost score for high ratings
      scoreA += a.rating * 2
      scoreB += b.rating * 2
      
      return scoreB - scoreA
    })
  }

  /**
   * Enhance results with additional context
   */
  private enhanceResults(temples: Temple[], context: any): Temple[] {
    return temples.map(temple => {
      // Add search relevance score
      const enhancedTemple = { ...temple }
      
      // Add contextual information
      if (context.intent === 'history' && temple.history) {
        enhancedTemple.description = `${temple.description} (Historical significance: ${temple.history.substring(0, 100)}...)`
      }
      
      if (context.intent === 'architecture' && temple.architecture) {
        enhancedTemple.description = `${temple.description} (Architecture: ${temple.architecture.substring(0, 100)}...)`
      }
      
      return enhancedTemple
    })
  }

  /**
   * Generate intelligent search suggestions
   */
  private generateSearchSuggestions(query: string): string {
    const suggestions = [
      'Try searching for specific temple names like "Meenakshi", "Golden Temple", or "Akshardham"',
      'Search by deity: "Shiva", "Vishnu", "Ganpati", or "Krishna"',
      'Search by location: "Tamil Nadu", "Punjab", "Delhi", or "Mumbai"',
      'Try broader terms: "famous temples", "ancient temples", or "pilgrimage sites"',
      'Search by characteristics: "golden temple", "dravidian architecture", or "sacred places"'
    ]
    
    // Return contextual suggestions based on query
    if (query.toLowerCase().includes('shiva')) {
      return 'Try searching for "Kashi Vishwanath", "Somnath", or "Ujjain Mahakaleshwar" temples'
    } else if (query.toLowerCase().includes('vishnu')) {
      return 'Try searching for "Tirumala Venkateswara", "Dwarkadhish", or "Jagannath" temples'
    } else if (query.toLowerCase().includes('south')) {
      return 'Try searching for temples in "Tamil Nadu", "Karnataka", or "Kerala"'
    } else if (query.toLowerCase().includes('famous')) {
      return 'Try: "Meenakshi Amman Temple", "Golden Temple", "Akshardham Temple"'
    } else {
      return suggestions[Math.floor(Math.random() * suggestions.length)]
    }
  }

  /**
   * Get AI-powered recommendations
   */
  async getRecommendations(_preferences?: any): Promise<Temple[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Return temples sorted by rating and popularity
    return mockTemples
      .sort((a, b) => (b.rating * b.review_count) - (a.rating * a.review_count))
      .slice(0, 5)
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return true // Local AI is always available
  }
}

// Export singleton instance
export const localAIService = LocalAIService.getInstance()
