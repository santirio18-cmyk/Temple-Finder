// Maps Service for Temple Finder
// This service provides maps integration and route planning

export interface MapMarker {
  id: string
  position: {
    lat: number
    lng: number
  }
  title: string
  description?: string
  icon?: string
  color?: string
}

export interface RouteInfo {
  distance: string
  duration: string
  steps: RouteStep[]
}

export interface RouteStep {
  instruction: string
  distance?: string
  duration?: string
}

export interface MapConfig {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  markers: MapMarker[]
  routes?: any[]
}

export class MapsService {
  private googleMapsLoaded = false
  private googleMapsCallback: (() => void) | null = null

  constructor() {
    this.loadGoogleMaps()
  }

  /**
   * Load Google Maps API
   */
  private loadGoogleMaps(): void {
    if (this.googleMapsLoaded) {
      return
    }

    // Check if Google Maps is already loaded
    if ((window as any).google && (window as any).google.maps) {
      this.googleMapsLoaded = true
      if (this.googleMapsCallback) {
        this.googleMapsCallback()
      }
      return
    }

    // Create script element to load Google Maps
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.getGoogleMapsApiKey()}&libraries=places,directions`
    script.async = true
    script.defer = true

    script.onload = () => {
      this.googleMapsLoaded = true
      if (this.googleMapsCallback) {
        this.googleMapsCallback()
      }
    }

    script.onerror = () => {
      console.error('Failed to load Google Maps API')
    }

    document.head.appendChild(script)
  }

  /**
   * Get Google Maps API key from configuration
   */
  private getGoogleMapsApiKey(): string {
    // Try to get from window config first (for mobile app)
    const config = (window as any).TEMPLE_FINDER_CONFIG
    if (config?.ai?.googleMapsApiKey) {
      return config.ai.googleMapsApiKey
    }
    
    // Try to get from import.meta.env (for web app)
    const env = (import.meta as any).env
    if (env?.VITE_GOOGLE_MAPS_API_KEY) {
      return env.VITE_GOOGLE_MAPS_API_KEY
    }
    
    // Fallback - should not happen in production
    console.warn('Google Maps API key not found in configuration')
    return 'AIzaSyCr3No3TWC7-9MC63ZO7rcbSeljyFgfNkU'
  }

  /**
   * Wait for Google Maps to load
   */
  async waitForGoogleMaps(): Promise<void> {
    if (this.googleMapsLoaded) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this.googleMapsCallback = resolve
    })
  }

  /**
   * Create a map configuration for temples
   */
  createMapConfig(
    temples: Array<{ id: string; name: string; deity: string; latitude: number; longitude: number }>,
    centerLocation?: { lat: number; lng: number }
  ): MapConfig {
    const markers: MapMarker[] = temples.map(temple => ({
      id: temple.id,
      position: {
        lat: temple.latitude,
        lng: temple.longitude
      },
      title: temple.name,
      description: temple.deity,
      icon: this.getTempleIcon(temple.deity),
      color: this.getTempleColor(temple.deity)
    }))

    const center = centerLocation || {
      lat: temples.reduce((sum, temple) => sum + temple.latitude, 0) / temples.length,
      lng: temples.reduce((sum, temple) => sum + temple.longitude, 0) / temples.length
    }

    return {
      center,
      zoom: 12,
      markers
    }
  }

  /**
   * Get directions between two points
   */
  async getDirections(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    travelMode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING' = 'DRIVING'
  ): Promise<RouteInfo | null> {
    try {
      await this.waitForGoogleMaps()

      const directionsService = new (window as any).google.maps.DirectionsService()
      
      return new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: new (window as any).google.maps.LatLng(origin.lat, origin.lng),
            destination: new (window as any).google.maps.LatLng(destination.lat, destination.lng),
            travelMode: (window as any).google.maps.TravelMode[travelMode]
          },
          (result: any, status: any) => {
            if (status === (window as any).google.maps.DirectionsStatus.OK) {
              const route = result.routes[0]
              const leg = route.legs[0]
              
              const steps: RouteStep[] = route.legs[0].steps.map((step: any) => ({
                instruction: step.instructions,
                distance: step.distance?.text,
                duration: step.duration?.text
              }))

              resolve({
                distance: leg.distance?.text || 'Unknown',
                duration: leg.duration?.text || 'Unknown',
                steps
              })
            } else {
              reject(new Error('Directions request failed: ' + status))
            }
          }
        )
      })
    } catch (error) {
      console.error('Error getting directions:', error)
      return null
    }
  }

  /**
   * Get temple icon based on deity
   */
  private getTempleIcon(deity: string): string {
    const iconMap: { [key: string]: string } = {
      'Shiva': '🕉️',
      'Vishnu': '🕉️',
      'Murugan': '🕉️',
      'Ganpati': '🕉️',
      'Durga': '🕉️',
      'Hanuman': '🕉️',
      'Sai Baba': '🕉️'
    }
    
    const normalizedDeity = deity.toLowerCase()
    for (const [key, icon] of Object.entries(iconMap)) {
      if (normalizedDeity.includes(key.toLowerCase())) {
        return icon
      }
    }
    
    return '🕉️' // Default temple icon
  }

  /**
   * Get temple color based on deity
   */
  private getTempleColor(deity: string): string {
    const colorMap: { [key: string]: string } = {
      'Shiva': '#FF4500',
      'Vishnu': '#4169E1',
      'Murugan': '#FF9933',
      'Ganpati': '#FFD700',
      'Durga': '#DC143C',
      'Hanuman': '#FF9933',
      'Sai Baba': '#FFD700'
    }
    
    const normalizedDeity = deity.toLowerCase()
    for (const [key, color] of Object.entries(colorMap)) {
      if (normalizedDeity.includes(key.toLowerCase())) {
        return color
      }
    }
    
    return '#FF9933' // Default orange color
  }

  /**
   * Check if Google Maps is available
   */
  isGoogleMapsAvailable(): boolean {
    return this.googleMapsLoaded && !!(window as any).google?.maps
  }

  /**
   * Get fallback map URL for external maps
   */
  getFallbackMapUrl(
    destination: { lat: number; lng: number },
    origin?: { lat: number; lng: number }
  ): string {
    const dest = `${destination.lat},${destination.lng}`
    const orig = origin ? `${origin.lat},${origin.lng}` : ''
    
    // Google Maps fallback URL
    return `https://www.google.com/maps/dir/${orig}/${dest}`
  }

  /**
   * Get Apple Maps URL (for iOS devices)
   */
  getAppleMapsUrl(
    destination: { lat: number; lng: number },
    origin?: { lat: number; lng: number }
  ): string {
    const dest = `${destination.lat},${destination.lng}`
    const orig = origin ? `${origin.lat},${origin.lng}` : ''
    
    return `http://maps.apple.com/?daddr=${dest}${orig ? `&saddr=${orig}` : ''}`
  }
}

export const mapsService = new MapsService()
