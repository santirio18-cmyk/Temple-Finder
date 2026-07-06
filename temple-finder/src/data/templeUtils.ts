import { temples, type Temple } from '../data'
import { topTempleDetailsById, TOP_TEMPLE_IDS } from './topTempleDetails'

const GENERIC_DESCRIPTION = /^Hindu temple in Chennai(\. Rated by [\d,]+ visitors)?\.?$/i

function parseVisitorCount(description: string): number {
  const match = description.match(/Rated by ([\d,]+) visitors/i)
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0
}

function normalizeTempleName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(arulmigu|sri|shri|lord)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
}

function templeRank(temple: Temple): number {
  const enriched = enrichTemple(temple)
  let score = 0
  if (TOP_TEMPLE_IDS.has(temple.id)) score += 10_000
  if (isTopTemple(enriched)) score += 5_000
  score += parseVisitorCount(temple.description)
  score += Math.round(temple.rating * 100)
  return score
}

export function enrichTemple(temple: Temple): Temple {
  const extra = topTempleDetailsById[temple.id]
  if (!extra) return temple
  return { ...temple, ...extra }
}

export function hasTempleImage(temple: Temple): boolean {
  return Boolean(temple.image?.trim())
}

export function isTopTemple(temple: Temple): boolean {
  const enriched = enrichTemple(temple)
  return TOP_TEMPLE_IDS.has(enriched.id) && hasTempleImage(enriched)
}

export function hasRichDetails(temple: Temple): boolean {
  return Boolean(
    TOP_TEMPLE_IDS.has(temple.id) ||
      temple.openingHours ||
      temple.specialSignificance ||
      temple.phoneNumber ||
      (temple.festivals && temple.festivals.length > 0) ||
      !GENERIC_DESCRIPTION.test(temple.description)
  )
}

export function deduplicateTemples(list: Temple[]): Temple[] {
  const byName = new Map<string, Temple>()

  for (const temple of list) {
    const key = normalizeTempleName(temple.name)
    const existing = byName.get(key)
    if (!existing || templeRank(temple) > templeRank(existing)) {
      byName.set(key, temple)
    }
  }

  return Array.from(byName.values())
}

export function getUniqueTemples(): Temple[] {
  return deduplicateTemples(temples).map(enrichTemple)
}

export function getTopTemples(): Temple[] {
  return getUniqueTemples()
    .filter((temple) => isTopTemple(temple))
    .sort((a, b) => templeRank(b) - templeRank(a))
}

export function getTempleByIdEnriched(id: string): Temple | undefined {
  const temple = temples.find((t) => t.id === id)
  return temple ? enrichTemple(temple) : undefined
}

export function searchUniqueTemples(query: string): Temple[] {
  const lowerQuery = query.toLowerCase()
  return getUniqueTemples().filter(
    (temple) =>
      temple.name.toLowerCase().includes(lowerQuery) ||
      temple.deity.toLowerCase().includes(lowerQuery) ||
      temple.city.toLowerCase().includes(lowerQuery) ||
      temple.description.toLowerCase().includes(lowerQuery)
  )
}

export function getUniqueTemplesByDeity(deity: string): Temple[] {
  return getUniqueTemples().filter((temple) => matchesDeityFilter(temple, deity))
}

const DEITY_KEYWORDS: Record<string, string[]> = {
  Murugan: ['murugan', 'muruga', 'subramanya', 'subramaniam', 'skanda', 'kandan', 'andavar', 'palani'],
  Shiva: ['shiva', 'siva', 'eswara', 'eeswarar', 'eeswar', 'nataraja', 'lingam', 'kapaleeshwar'],
  Vishnu: ['vishnu', 'perumal', 'venkatesh', 'venkateswara', 'narayana', 'ranganath', 'krishna', 'parthasarathy', 'parthasarathi'],
  Ganesha: ['ganesha', 'ganapati', 'vinayagar', 'vinayaka', 'pillayar', 'ganapathy'],
  Devi: ['devi', 'amman', 'lakshmi', 'durga', 'parvati', 'shakti', 'kali', 'mariamman', 'mari'],
  Hanuman: ['hanuman', 'anjaneya', 'anjaneyar', 'maruti'],
}

export function matchesDeityFilter(temple: Temple, deityFilter: string): boolean {
  const filter = deityFilter.trim()
  if (!filter) return true

  const deity = temple.deity.toLowerCase()
  const name = temple.name.toLowerCase()
  const filterLower = filter.toLowerCase()

  if (deity.includes(filterLower)) return true

  const keywords = DEITY_KEYWORDS[filter] ?? [filterLower]
  return keywords.some((kw) => name.includes(kw) || deity.includes(kw))
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function getUniqueNearbyTemples(
  lat: number,
  lng: number,
  radiusKm: number = 50,
  deityFilter?: string | null
): (Temple & { distance: number })[] {
  return getUniqueTemples()
    .filter((temple) => !deityFilter || matchesDeityFilter(temple, deityFilter))
    .map((temple) => ({
      ...temple,
      distance: calculateDistance(lat, lng, temple.latitude, temple.longitude),
    }))
    .filter((temple) => temple.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

export function getTopNearbyTemples(
  lat: number,
  lng: number,
  radiusKm: number = 50,
  deityFilter?: string | null
): (Temple & { distance: number })[] {
  return getTopTemples()
    .filter((temple) => !deityFilter || matchesDeityFilter(temple, deityFilter))
    .map((temple) => ({
      ...temple,
      distance: calculateDistance(lat, lng, temple.latitude, temple.longitude),
    }))
    .filter((temple) => temple.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}
