// Google Maps service for Temple Finder

export interface MapMarker {
  id: string
  lat: number
  lng: number
  title: string
}

export class MapsService {
  private loaded = false
  private loadPromise: Promise<void> | null = null

  private getApiKey(): string {
    return (import.meta as { env?: { VITE_GOOGLE_MAPS_API_KEY?: string } }).env?.VITE_GOOGLE_MAPS_API_KEY || ''
  }

  private loadScript(): Promise<void> {
    if (this.loaded && (window as { google?: { maps?: unknown } }).google?.maps) {
      return Promise.resolve()
    }
    if (this.loadPromise) return this.loadPromise

    const key = this.getApiKey()
    if (!key) {
      console.warn('Google Maps API key not found. Add VITE_GOOGLE_MAPS_API_KEY to .env.local')
      return Promise.reject(new Error('No API key'))
    }

    this.loadPromise = new Promise((resolve, reject) => {
      if ((window as { google?: { maps?: unknown } }).google?.maps) {
        this.loaded = true
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`
      script.async = true
      script.defer = true
      script.onload = () => {
        this.loaded = true
        resolve()
      }
      script.onerror = () => reject(new Error('Failed to load Google Maps'))
      document.head.appendChild(script)
    })

    return this.loadPromise
  }

  async initMap(
    container: HTMLElement,
    options: {
      center: { lat: number; lng: number }
      zoom?: number
      markers?: MapMarker[]
    }
  ): Promise<boolean> {
    try {
      await this.loadScript()

      const g = (window as { google?: { maps: { Map: new (el: HTMLElement, o: object) => { fitBounds: (b: object, o?: object) => void }; LatLngBounds: new () => { extend: (p: object) => void }; Marker: new (o: object) => void } } }).google?.maps
      if (!g) return false

      const map = new g.Map(container, {
        center: options.center,
        zoom: options.zoom ?? 14,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      })

      if (options.markers?.length) {
        const bounds = new g.LatLngBounds()
        options.markers.forEach((m) => {
          const pos = { lat: m.lat, lng: m.lng }
          new g.Marker({ position: pos, map, title: m.title })
          bounds.extend(pos)
        })
        if (options.markers.length > 1) {
          map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 })
        }
      }

      return true
    } catch (err) {
      console.error('Google Maps init error:', err)
      return false
    }
  }

  getDirectionsUrl(dest: { lat: number; lng: number }, origin?: { lat: number; lng: number }): string {
    const d = `${dest.lat},${dest.lng}`
    const o = origin ? `${origin.lat},${origin.lng}` : ''
    return o ? `https://www.google.com/maps/dir/${o}/${d}` : `https://www.google.com/maps?q=${d}`
  }
}

export const mapsService = new MapsService()
