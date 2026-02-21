// Location Service for Temple Finder
// This service provides GPS and location-based functionality

export interface Location {
  latitude: number
  longitude: number
  accuracy?: number
  timestamp?: number
}

export interface LocationPermission {
  granted: boolean
  denied: boolean
  unavailable: boolean
}

export interface NearbyTemple extends Location {
  templeId: string
  templeName: string
  distance: number
  deity: string
  rating: number
}

export class LocationService {
  private watchId: number | null = null
  private currentLocation: Location | null = null
  private onLocationUpdateCallback: ((location: Location) => void) | null = null

  constructor() {
    this.checkLocationSupport()
  }

  private checkLocationSupport(): boolean {
    return 'geolocation' in navigator
  }

  /**
   * Request location permission and get current position
   */
  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!this.checkLocationSupport()) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          }
          this.currentLocation = location
          resolve(location)
        },
        (error) => {
          let errorMessage = 'Location access denied'
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable'
              break
            case error.TIMEOUT:
              errorMessage = 'Location request timed out'
              break
          }
          
          reject(new Error(errorMessage))
        },
        options
      )
    })
  }

  /**
   * Start watching location changes
   */
  startWatching(onLocationUpdate: (location: Location) => void): void {
    if (!this.checkLocationSupport()) {
      console.warn('Geolocation is not supported')
      return
    }

    this.onLocationUpdateCallback = onLocationUpdate

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000 // 30 seconds
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        }
        this.currentLocation = location
        if (this.onLocationUpdateCallback) {
          this.onLocationUpdateCallback(location)
        }
      },
      (error) => {
        console.error('Location watch error:', error)
      },
      options
    )
  }

  /**
   * Stop watching location changes
   */
  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
      this.onLocationUpdateCallback = null
    }
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in kilometers
    return Math.round(distance * 100) / 100 // Round to 2 decimal places
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  /**
   * Find nearby temples within a specified radius
   */
  findNearbyTemples(
    temples: Array<{ id: string; name: string; deity: string; rating: number; latitude: number; longitude: number }>,
    userLocation: Location,
    radiusKm: number = 50
  ): NearbyTemple[] {
    return temples
      .map(temple => ({
        ...userLocation,
        templeId: temple.id,
        templeName: temple.name,
        deity: temple.deity,
        rating: temple.rating,
        distance: this.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          temple.latitude,
          temple.longitude
        )
      }))
      .filter(temple => temple.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
  }

  /**
   * Get location permission status
   */
  async getPermissionStatus(): Promise<LocationPermission> {
    if (!this.checkLocationSupport()) {
      return {
        granted: false,
        denied: true,
        unavailable: true
      }
    }

    try {
      // Try to get current position to check permission
      await this.getCurrentLocation()
      return {
        granted: true,
        denied: false,
        unavailable: false
      }
    } catch (error: any) {
      if (error.message.includes('denied')) {
        return {
          granted: false,
          denied: true,
          unavailable: false
        }
      }
      return {
        granted: false,
        denied: false,
        unavailable: true
      }
    }
  }

  /**
   * Get current cached location
   */
  getCachedLocation(): Location | null {
    return this.currentLocation
  }

  /**
   * Check if location services are available
   */
  isLocationAvailable(): boolean {
    return this.checkLocationSupport()
  }
}

export const locationService = new LocationService()
