import { useEffect, useRef } from 'react'
import { mapsService, MapMarker } from '../services/mapsService'

interface TempleMapProps {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: MapMarker[]
  className?: string
  height?: string
}

export default function TempleMap({ center, zoom, markers, className = '', height = '256px' }: TempleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    mapsService.initMap(mapRef.current, { center, zoom, markers })
  }, [center.lat, center.lng, zoom, markers ? JSON.stringify(markers) : ''])

  return (
    <div
      ref={mapRef}
      className={`rounded-xl overflow-hidden bg-darshanam-cream ${className}`}
      style={{ height, minHeight: height }}
    />
  )
}
