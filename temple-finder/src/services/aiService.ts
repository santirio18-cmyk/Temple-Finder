// AI Service Integration for Temple Finder
import { Temple, SearchFilters } from '../types'

interface AIServiceConfig {
  openaiApiKey?: string
  perplexityApiKey?: string
  geminiApiKey?: string
}

interface TempleSearchResult {
  temples: Temple[]
  totalFound: number
  searchQuery: string
  source: 'openai' | 'perplexity' | 'gemini'
}

class AITempleService {
  private config: AIServiceConfig

  constructor(config: AIServiceConfig) {
    this.config = {
      openaiApiKey: config.openaiApiKey || (import.meta as any).env.VITE_OPENAI_API_KEY,
      perplexityApiKey: config.perplexityApiKey || (import.meta as any).env.VITE_PERPLEXITY_API_KEY,
      geminiApiKey: config.geminiApiKey || (import.meta as any).env.VITE_GEMINI_API_KEY
    }
  }

  /**
   * Search temples using OpenAI GPT-4
   * Best for: Detailed descriptions, cultural context, historical information
   */
  async searchWithOpenAI(query: string, location?: string): Promise<TempleSearchResult> {
    if (!this.config.openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const prompt = `
    Find temples related to "${query}" ${location ? `in or near ${location}` : ''}.
    
    Return a JSON array of temples with the following structure:
    {
      "temples": [
        {
          "name": "Temple Name",
          "deity": "Primary Deity",
          "description": "Detailed description (2-3 sentences)",
          "history": "Historical background",
          "significance": "Religious/cultural significance",
          "architecture": "Architectural style",
          "legends": ["Legend 1", "Legend 2"],
          "city": "City Name",
          "state": "State Name",
          "country": "Country",
          "latitude": 0.0,
          "longitude": 0.0,
          "timings": "Temple timings",
          "special_events": "Major festivals/events",
          "rating": 4.5,
          "contact_phone": "Phone number if available",
          "website": "Website if available"
        }
      ],
      "totalFound": 10,
      "searchQuery": "${query}",
      "source": "openai"
    }
    
    Focus on authentic, well-known temples. Include accurate geographical coordinates.
    Limit to 10 most relevant temples.
    `

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable guide about Hindu temples and religious sites. Provide accurate, respectful information about temples.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.3
        })
      })

      const data = await response.json()
      const result = JSON.parse(data.choices[0].message.content)
      
      // Transform to our Temple interface
      const temples: Temple[] = result.temples.map((temple: any, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        name: temple.name,
        deity: temple.deity,
        description: temple.description,
        history: temple.history,
        significance: temple.significance,
        architecture: temple.architecture,
        legends: temple.legends || [],
        address: `${temple.city}, ${temple.state}, ${temple.country}`,
        city: temple.city,
        state: temple.state,
        country: temple.country || 'India',
        locality: temple.city,
        latitude: temple.latitude,
        longitude: temple.longitude,
        contact_phone: temple.contact_phone,
        website: temple.website,
        images: [], // Would need separate image search
        capacity: 500, // Default value
        current_occupancy: Math.floor(Math.random() * 500),
        rating: temple.rating || 4.5,
        review_count: Math.floor(Math.random() * 1000) + 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      return {
        temples,
        totalFound: result.totalFound,
        searchQuery: query,
        source: 'openai'
      }
    } catch (error) {
      console.error('OpenAI search failed:', error)
      throw new Error('Failed to search temples with OpenAI')
    }
  }

  /**
   * Search temples using Perplexity AI
   * Best for: Real-time information, current timings, recent updates
   */
  async searchWithPerplexity(query: string, _location?: string): Promise<TempleSearchResult> {
    if (!this.config.perplexityApiKey) {
      throw new Error('Perplexity API key not configured')
    }

    // Mock implementation for now
    return {
      temples: [],
      totalFound: 0,
      searchQuery: query,
      source: 'perplexity'
    }
  }

  /**
   * Search temples using Google Gemini
   * Best for: Multimodal search, image recognition, comprehensive results
   */
  async searchWithGemini(query: string, _location?: string): Promise<TempleSearchResult> {
    if (!this.config.geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Mock implementation for now
    return {
      temples: [],
      totalFound: 0,
      searchQuery: query,
      source: 'gemini'
    }
  }

  /**
   * Enhanced search that combines multiple AI services
   */
  async enhancedSearch(filters: SearchFilters): Promise<TempleSearchResult> {
    const query = filters.query || ''
    const location = filters.location || ''

    try {
      // Primary search with OpenAI for detailed information
      const openaiResults = await this.searchWithOpenAI(query, location as string)
      
      return {
        temples: openaiResults.temples,
        totalFound: openaiResults.totalFound,
        searchQuery: query,
        source: 'openai'
      }
    } catch (error) {
      console.error('Enhanced search failed:', error)
      throw new Error('Failed to perform enhanced search')
    }
  }

  /**
   * Get the best available AI service
   */
  getBestService(): string {
    if (this.config.openaiApiKey) return 'openai'
    if (this.config.perplexityApiKey) return 'perplexity'
    if (this.config.geminiApiKey) return 'gemini'
    return 'none'
  }

  /**
   * Check if AI services are configured
   */
  isConfigured(): boolean {
    return !!(this.config.openaiApiKey || this.config.perplexityApiKey || this.config.geminiApiKey)
  }

  /**
   * Get detailed information about a specific temple
   */
  async getTempleDetails(_templeId: string): Promise<Temple | null> {
    // Mock implementation - in real app, this would query AI for detailed info
    return null
  }

  /**
   * Get AI-powered recommendations
   */
  async getRecommendations(_userId: string, _preferences?: any): Promise<Temple[]> {
    // Mock implementation - in real app, this would use AI to recommend temples
    return []
  }
}

// Export singleton instance
export const aiService = new AITempleService({})

// Export class for custom instances
export { AITempleService, type AIServiceConfig, type TempleSearchResult }