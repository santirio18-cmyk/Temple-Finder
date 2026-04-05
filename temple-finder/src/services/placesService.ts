import { mapsService } from './mapsService'

export interface NearbyPlaceTemple {
  id: string
  name: string
  lat: number
  lng: number
  rating?: number
  userRatingsTotal?: number
  vicinity?: string
  photoUrl?: string
  distanceKm: number
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

function getApiKey(): string {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
}

/**
 * Nearby Hindu temples via Google Places (requires Maps JavaScript API + Places API enabled).
 */
export async function searchNearbyTemples(
  lat: number,
  lng: number,
  radiusKm: number
): Promise<NearbyPlaceTemple[]> {
  const key = getApiKey()
  if (!key) return []

  try {
    await mapsService.ensureMapsLoaded()
  } catch {
    return []
  }

  const g = window.google?.maps
  if (!g?.places) return []

  const div = document.createElement('div')
  const service = new g.places.PlacesService(div)

  const radiusM = Math.min(Math.max(radiusKm, 1), 50) * 1000

  return new Promise((resolve) => {
    const req: google.maps.places.PlaceSearchRequest = {
      location: new g.LatLng(lat, lng),
      radius: radiusM,
      type: 'hindu_temple',
    }

    service.nearbySearch(req, (results, status) => {
      if (status !== g.places.PlacesServiceStatus.OK || !results?.length) {
        resolve([])
        return
      }

      const mapped: NearbyPlaceTemple[] = results.map((p) => {
        const loc = p.geometry?.location
        const plat = loc?.lat() ?? lat
        const plng = loc?.lng() ?? lng
        let photoUrl: string | undefined
        if (p.photos?.[0]) {
          photoUrl = p.photos[0].getUrl({ maxWidth: 480 })
        }
        return {
          id: p.place_id!,
          name: p.name ?? 'Temple',
          lat: plat,
          lng: plng,
          rating: p.rating,
          userRatingsTotal: p.user_ratings_total,
          vicinity: p.vicinity,
          photoUrl,
          distanceKm: haversineKm(lat, lng, plat, plng),
        }
      })

      mapped.sort((a, b) => a.distanceKm - b.distanceKm)
      resolve(mapped)
    })
  })
}

export interface PlaceDetailsResult {
  name: string
  address: string
  lat: number
  lng: number
  rating?: number
  photoUrl?: string
  googleMapsUrl?: string
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetailsResult | null> {
  const key = getApiKey()
  if (!key) return null

  try {
    await mapsService.ensureMapsLoaded()
  } catch {
    return null
  }

  const g = window.google?.maps
  if (!g?.places) return null

  const div = document.createElement('div')
  const service = new g.places.PlacesService(div)

  return new Promise((resolve) => {
    service.getDetails(
      {
        placeId,
        fields: ['name', 'formatted_address', 'geometry', 'rating', 'photos', 'url'],
      },
      (place, status) => {
        if (status !== g.places.PlacesServiceStatus.OK || !place?.geometry?.location) {
          resolve(null)
          return
        }
        const loc = place.geometry.location
        let photoUrl: string | undefined
        if (place.photos?.[0]) {
          photoUrl = place.photos[0].getUrl({ maxWidth: 960 })
        }
        resolve({
          name: place.name ?? 'Temple',
          address: place.formatted_address ?? '',
          lat: loc.lat(),
          lng: loc.lng(),
          rating: place.rating,
          photoUrl,
          googleMapsUrl: place.url,
        })
      }
    )
  })
}
