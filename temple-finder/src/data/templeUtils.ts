import { temples, type Temple } from '../data'
import { topTempleDetailsById, TOP_TEMPLE_IDS } from './topTempleDetails'

const GENERIC_DESCRIPTION = /^Hindu temple in Chennai\. Rated by/i

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
  if (hasRichDetails(enriched)) score += 5_000
  score += parseVisitorCount(temple.description)
  score += Math.round(temple.rating * 100)
  return score
}

export function enrichTemple(temple: Temple): Temple {
  const extra = topTempleDetailsById[temple.id]
  if (!extra) return temple
  return { ...temple, ...extra }
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
    .filter((temple) => hasRichDetails(enrichTemple(temple)))
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
  return getUniqueTemples().filter(
    (temple) => temple.deity.toLowerCase() === deity.toLowerCase()
  )
}
