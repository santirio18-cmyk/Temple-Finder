import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { mapsService } from '../services/mapsService'
import { Temple } from '../types'
import { CrowdLevel } from '../services/realtimeService'

interface TempleMapProps {
  temples: Temple[]
  userLocation?: { lat: number; lng: number }
  selectedTemple?: Temple | null
  onTempleSelect?: (temple: Temple) => void
  crowdLevels?: Record<string, CrowdLevel>
  className?: string
}

const TempleMap: React.FC<TempleMapProps> = ({
  temples,
  userLocation,
  selectedTemple,
  onTempleSelect,
  crowdLevels,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [, setDirectionsService] = useState<any>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeMap()
  }, [])

  useEffect(() => {
    if (isMapLoaded && temples.length > 0) {
      updateMapMarkers()
    }
  }, [isMapLoaded, temples, crowdLevels])

  useEffect(() => {
    if (isMapLoaded && selectedTemple) {
      centerMapOnTemple(selectedTemple)
    }
  }, [isMapLoaded, selectedTemple])

  const initializeMap = async () => {
    try {
      await mapsService.waitForGoogleMaps()
      
      if (!mapRef.current) return

      const mapConfig = mapsService.createMapConfig(
        temples,
        userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : undefined
      )

      const googleMap = new (window as any).google.maps.Map(mapRef.current, {
        center: mapConfig.center,
        zoom: mapConfig.zoom,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      setMap(googleMap)
      setDirectionsService(new (window as any).google.maps.DirectionsService())
      setDirectionsRenderer(new (window as any).google.maps.DirectionsRenderer({
        draggable: false,
        suppressMarkers: true
      }))
      
      setIsMapLoaded(true)
      setError(null)
    } catch (error) {
      console.error('Error initializing map:', error)
      setError('Failed to load map. Please check your internet connection.')
    }
  }

  const updateMapMarkers = () => {
    if (!map || !directionsRenderer) return

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null))
    directionsRenderer.setMap(null)

    const newMarkers: any[] = []

    // Add user location marker if available
    if (userLocation) {
      const userMarker = new (window as any).google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map: map,
        title: 'Your Location',
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      })
      newMarkers.push(userMarker)
    }

    // Add temple markers
    temples.forEach(temple => {
      const crowdLevel = crowdLevels?.[temple.id]
      const crowdColor = getCrowdColor(crowdLevel?.crowdStatus)
      
      const marker = new (window as any).google.maps.Marker({
        position: { lat: temple.latitude, lng: temple.longitude },
        map: map,
        title: temple.name,
        icon: {
          path: (window as any).google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: crowdColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 1,
          rotation: 45
        }
      })

      // Create info window content
      const infoContent = createInfoWindowContent(temple, crowdLevel, userLocation)
      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: infoContent
      })

      marker.addListener('click', () => {
        // Close other info windows
        newMarkers.forEach(m => {
          if (m.infoWindow) {
            m.infoWindow.close()
          }
        })
        
        infoWindow.open(map, marker)
        onTempleSelect?.(temple)
      })

      marker.infoWindow = infoWindow
      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
  }

  const createInfoWindowContent = (
    temple: Temple, 
    crowdLevel?: CrowdLevel, 
    userLoc?: { lat: number; lng: number }
  ): string => {
    const distance = userLoc ? calculateDistance(
      userLoc.lat, userLoc.lng, 
      temple.latitude, temple.longitude
    ) : null

    return `
      <div class="p-3 max-w-xs">
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-semibold text-gray-900 text-sm">${temple.name}</h3>
          <div class="flex items-center text-yellow-500">
            <span class="text-xs">★</span>
            <span class="text-xs ml-1">${temple.rating.toFixed(1)}</span>
          </div>
        </div>
        <p class="text-xs text-gray-600 mb-2">${temple.deity}</p>
        <p class="text-xs text-gray-500 mb-2">${temple.city}, ${temple.state}</p>
        ${distance ? `<p class="text-xs text-blue-600 mb-2">📍 ${distance.toFixed(1)} km away</p>` : ''}
        ${crowdLevel ? `
          <div class="flex items-center mb-2">
            <span class="text-xs ${getCrowdTextColor(crowdLevel.crowdStatus)}">
              ${getCrowdIcon(crowdLevel.crowdStatus)} ${crowdLevel.crowdStatus.toUpperCase()} (${crowdLevel.crowdPercentage}%)
            </span>
          </div>
        ` : ''}
        <button 
          onclick="window.open('${mapsService.getFallbackMapUrl(
            { lat: temple.latitude, lng: temple.longitude },
            userLoc
          )}', '_blank')"
          class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Get Directions
        </button>
      </div>
    `
  }

  const centerMapOnTemple = (temple: Temple) => {
    if (!map) return
    
    map.setCenter({ lat: temple.latitude, lng: temple.longitude })
    map.setZoom(15)
  }

  const getCrowdColor = (status?: string): string => {
    switch (status) {
      case 'low': return '#10B981'    // Green
      case 'medium': return '#F59E0B' // Yellow
      case 'high': return '#EF4444'   // Red
      case 'full': return '#7C2D12'   // Dark red
      default: return '#6B7280'       // Gray
    }
  }

  const getCrowdTextColor = (status?: string): string => {
    switch (status) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      case 'full': return 'text-red-800'
      default: return 'text-gray-600'
    }
  }

  const getCrowdIcon = (status?: string): string => {
    switch (status) {
      case 'low': return '🟢'
      case 'medium': return '🟡'
      case 'high': return '🟠'
      case 'full': return '🔴'
      default: return '⚪'
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">{error}</p>
          <button 
            onClick={initializeMap}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!isMapLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {userLocation && (
          <button
            onClick={() => {
              if (map && userLocation) {
                map.setCenter({ lat: userLocation.lat, lng: userLocation.lng })
                map.setZoom(15)
              }
            }}
            className="bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
            title="Center on my location"
          >
            <Navigation className="w-5 h-5 text-blue-500" />
          </button>
        )}
        
        <button
          onClick={() => {
            if (map && temples.length > 0) {
              const bounds = new (window as any).google.maps.LatLngBounds()
              temples.forEach(temple => {
                bounds.extend({ lat: temple.latitude, lng: temple.longitude })
              })
              if (userLocation) {
                bounds.extend({ lat: userLocation.lat, lng: userLocation.lng })
              }
              map.fitBounds(bounds)
            }
          }}
          className="bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
          title="Show all temples"
        >
          <MapPin className="w-5 h-5 text-green-500" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-lg p-3 text-xs">
        <div className="font-semibold mb-2">Crowd Levels</div>
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span>Low (&lt;30%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            <span>Medium (30-60%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span>High (60-90%)</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-800 rounded-full mr-2"></span>
            <span>Full (&gt;90%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TempleMap
