// Real-time Service for Temple Finder
// This service provides real-time features like crowd levels and live updates

export interface CrowdLevel {
  templeId: string
  currentOccupancy: number
  maxCapacity: number
  crowdPercentage: number
  crowdStatus: 'low' | 'medium' | 'high' | 'full'
  lastUpdated: string
  predictedCrowd?: {
    nextHour: number
    next3Hours: number
    nextDay: number
  }
}

export interface LiveUpdate {
  id: string
  templeId: string
  type: 'crowd' | 'timing' | 'event' | 'announcement' | 'weather'
  title: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  timestamp: string
  expiresAt?: string
}

export interface TempleEvent {
  id: string
  templeId: string
  name: string
  description: string
  startTime: string
  endTime: string
  type: 'pooja' | 'festival' | 'special' | 'maintenance'
  isLive: boolean
  attendees: number
  maxAttendees?: number
}

export interface WeatherInfo {
  templeId: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  lastUpdated: string
  forecast: {
    next3Hours: string
    nextDay: string
  }
}

export class RealtimeService {
  private crowdLevels: Map<string, CrowdLevel> = new Map()
  private liveUpdates: LiveUpdate[] = []
  private templeEvents: TempleEvent[] = []
  private weatherData: Map<string, WeatherInfo> = new Map()
  private updateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeMockData()
    this.startRealtimeUpdates()
  }

  /**
   * Initialize with mock real-time data
   */
  private initializeMockData(): void {
    // Mock crowd levels for temples
    const templeIds = [
      'temple-1', 'temple-9', 'temple-10', 'temple-15', 'temple-16', 'temple-17', 'temple-18'
    ]

    templeIds.forEach(templeId => {
      const currentOccupancy = Math.floor(Math.random() * 800) + 100
      const maxCapacity = Math.floor(Math.random() * 400) + 800
      const crowdPercentage = Math.round((currentOccupancy / maxCapacity) * 100)

      let crowdStatus: 'low' | 'medium' | 'high' | 'full'
      if (crowdPercentage < 30) crowdStatus = 'low'
      else if (crowdPercentage < 70) crowdStatus = 'medium'
      else if (crowdPercentage < 95) crowdStatus = 'high'
      else crowdStatus = 'full'

      this.crowdLevels.set(templeId, {
        templeId,
        currentOccupancy,
        maxCapacity,
        crowdPercentage,
        crowdStatus,
        lastUpdated: new Date().toISOString(),
        predictedCrowd: {
          nextHour: Math.max(0, crowdPercentage + Math.floor(Math.random() * 20) - 10),
          next3Hours: Math.max(0, crowdPercentage + Math.floor(Math.random() * 30) - 15),
          nextDay: Math.max(0, crowdPercentage + Math.floor(Math.random() * 40) - 20)
        }
      })
    })

    // Mock live updates
    this.liveUpdates = [
      {
        id: 'update-1',
        templeId: 'temple-17',
        type: 'crowd',
        title: 'High Crowd Alert',
        message: 'Tirupati Balaji Temple is experiencing high crowd levels. Expected waiting time: 2-3 hours.',
        priority: 'high',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // Expires in 2 hours
      },
      {
        id: 'update-2',
        templeId: 'temple-9',
        type: 'event',
        title: 'Special Pooja Today',
        message: 'Palani Murugan Temple is conducting special Skanda Sashti pooja at 6:00 PM today.',
        priority: 'medium',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // Expires in 4 hours
      },
      {
        id: 'update-3',
        templeId: 'temple-15',
        type: 'timing',
        title: 'Extended Hours',
        message: 'Siddhivinayak Temple has extended darshan hours until 11:00 PM today.',
        priority: 'low',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // Expires in 6 hours
      }
    ]

    // Mock temple events
    this.templeEvents = [
      {
        id: 'event-1',
        templeId: 'temple-9',
        name: 'Skanda Sashti Pooja',
        description: 'Special pooja dedicated to Lord Murugan',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
        type: 'pooja',
        isLive: false,
        attendees: 45,
        maxAttendees: 100
      },
      {
        id: 'event-2',
        templeId: 'temple-17',
        name: 'Morning Aarti',
        description: 'Daily morning aarti ceremony',
        startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
        type: 'pooja',
        isLive: false,
        attendees: 120
      }
    ]

    // Mock weather data
    templeIds.forEach(templeId => {
      this.weatherData.set(templeId, {
        templeId,
        temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
        lastUpdated: new Date().toISOString(),
        forecast: {
          next3Hours: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)],
          nextDay: ['Sunny', 'Partly Cloudy', 'Light Rain'][Math.floor(Math.random() * 3)]
        }
      })
    })
  }

  /**
   * Start real-time updates
   */
  private startRealtimeUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.updateCrowdLevels()
      this.updateLiveUpdates()
    }, 30000) // Update every 30 seconds
  }

  /**
   * Stop real-time updates
   */
  stopRealtimeUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  /**
   * Get crowd level for a temple
   */
  async getCrowdLevel(templeId: string): Promise<CrowdLevel | null> {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API delay
    return this.crowdLevels.get(templeId) || null
  }

  /**
   * Get crowd levels for multiple temples
   */
  async getCrowdLevels(templeIds: string[]): Promise<CrowdLevel[]> {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay
    
    return templeIds
      .map(id => this.crowdLevels.get(id))
      .filter(level => level !== undefined) as CrowdLevel[]
  }

  /**
   * Get live updates for temples
   */
  async getLiveUpdates(templeIds?: string[], limit: number = 10): Promise<LiveUpdate[]> {
    await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API delay
    
    let updates = this.liveUpdates
    
    if (templeIds) {
      updates = updates.filter(update => templeIds.includes(update.templeId))
    }
    
    // Filter out expired updates
    const now = new Date()
    updates = updates.filter(update => 
      !update.expiresAt || new Date(update.expiresAt) > now
    )
    
    return updates
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  /**
   * Get temple events
   */
  async getTempleEvents(templeId?: string): Promise<TempleEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay
    
    let events = this.templeEvents
    
    if (templeId) {
      events = events.filter(event => event.templeId === templeId)
    }
    
    return events.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  }

  /**
   * Get weather information for a temple
   */
  async getWeatherInfo(templeId: string): Promise<WeatherInfo | null> {
    await new Promise(resolve => setTimeout(resolve, 250)) // Simulate API delay
    return this.weatherData.get(templeId) || null
  }

  /**
   * Subscribe to real-time updates
   */
  subscribeToUpdates(
    templeIds: string[],
    onUpdate: (update: LiveUpdate) => void
  ): () => void {
    const checkForUpdates = () => {
      this.getLiveUpdates(templeIds, 1).then(updates => {
        if (updates.length > 0) {
          onUpdate(updates[0])
        }
      })
    }

    const interval = setInterval(checkForUpdates, 10000) // Check every 10 seconds
    
    return () => clearInterval(interval)
  }

  /**
   * Get crowd level status color
   */
  getCrowdStatusColor(status: string): string {
    switch (status) {
      case 'low': return '#10B981' // Green
      case 'medium': return '#F59E0B' // Yellow
      case 'high': return '#EF4444' // Red
      case 'full': return '#DC2626' // Dark Red
      default: return '#6B7280' // Gray
    }
  }

  /**
   * Get crowd level status text
   */
  getCrowdStatusText(status: string): string {
    switch (status) {
      case 'low': return 'Low Crowd'
      case 'medium': return 'Moderate Crowd'
      case 'high': return 'High Crowd'
      case 'full': return 'Very Crowded'
      default: return 'Unknown'
    }
  }

  /**
   * Update crowd levels (simulate real-time changes)
   */
  private updateCrowdLevels(): void {
    this.crowdLevels.forEach((crowdLevel, templeId) => {
      // Simulate crowd level changes
      const change = Math.floor(Math.random() * 20) - 10 // -10 to +10
      const newOccupancy = Math.max(0, Math.min(
        crowdLevel.maxCapacity,
        crowdLevel.currentOccupancy + change
      ))
      
      const crowdPercentage = Math.round((newOccupancy / crowdLevel.maxCapacity) * 100)
      
      let crowdStatus: 'low' | 'medium' | 'high' | 'full'
      if (crowdPercentage < 30) crowdStatus = 'low'
      else if (crowdPercentage < 70) crowdStatus = 'medium'
      else if (crowdPercentage < 95) crowdStatus = 'high'
      else crowdStatus = 'full'

      this.crowdLevels.set(templeId, {
        ...crowdLevel,
        currentOccupancy: newOccupancy,
        crowdPercentage,
        crowdStatus,
        lastUpdated: new Date().toISOString()
      })
    })
  }

  /**
   * Update live updates (simulate new updates)
   */
  private updateLiveUpdates(): void {
    // Occasionally add new live updates
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
      const templeIds = Array.from(this.crowdLevels.keys())
      const randomTempleId = templeIds[Math.floor(Math.random() * templeIds.length)]
      
      const newUpdate: LiveUpdate = {
        id: `update-${Date.now()}`,
        templeId: randomTempleId,
        type: ['crowd', 'timing', 'event'][Math.floor(Math.random() * 3)] as any,
        title: 'Live Update',
        message: 'Real-time information about the temple',
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
      }
      
      this.liveUpdates.unshift(newUpdate)
      
      // Keep only last 50 updates
      if (this.liveUpdates.length > 50) {
        this.liveUpdates = this.liveUpdates.slice(0, 50)
      }
    }
  }
}

export const realtimeService = new RealtimeService()









