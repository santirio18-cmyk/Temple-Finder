import { MhahPanchang } from 'mhah-panchang'

const engine = new MhahPanchang()

export interface Festival {
  name: string
  description: string
  date: string
  fullDate: Date
  icon: string
  daysLeft: number
}

interface TithiInfo {
  name: string
  number: number
}

/**
 * Extract tithi name and approximate number from the panchang calculation.
 * Tithi names are like "Shukla Ekadashi" (11), "Krishna Trayodashi" (13), etc.
 */
function parseTithi(tithiName: string): TithiInfo | null {
  const tithiMap: Record<string, number> = {
    'Prathama': 1, 'Pratipada': 1,
    'Dwitiya': 2, 'Dvitiya': 2,
    'Tritiya': 3, 'Trutiya': 3,
    'Chaturthi': 4,
    'Panchami': 5,
    'Shashthi': 6, 'Shashti': 6, 'Shasti': 6, 'Sashti': 6,
    'Saptami': 7, 'Sapthami': 7,
    'Ashtami': 8,
    'Navami': 9,
    'Dashami': 10,
    'Ekadashi': 11,
    'Dwadashi': 12, 'Dvadashi': 12,
    'Trayodashi': 13, 'Trayodasi': 13,
    'Chaturdashi': 14,
    'Purnima': 15, 'Poornima': 15, 'Pournami': 15, 'Punnami': 15,
    'Amavasya': 30, 'Amavasai': 30
  }

  for (const [key, num] of Object.entries(tithiMap)) {
    if (tithiName.toLowerCase().includes(key.toLowerCase())) {
      return { name: tithiName, number: num }
    }
  }
  return null
}

/**
 * Find the next occurrence of a specific tithi number within the next 30 days.
 */
function findNextTithi(targetTithi: number, fromDate: Date): Date | null {
  const searchDate = new Date(fromDate)
  searchDate.setHours(12, 0, 0, 0)

  for (let i = 0; i <= 30; i++) {
    const testDate = new Date(searchDate)
    testDate.setDate(searchDate.getDate() + i)
    
    const calc = engine.calculate(testDate)
    const tithiName = calc.Tithi?.name_en_IN ?? ''
    const tithiInfo = parseTithi(tithiName)
    
    if (tithiInfo && tithiInfo.number === targetTithi && i > 0) {
      return testDate
    }
  }
  return null
}

/**
 * Calculate days between two dates (ignoring time).
 */
function daysBetween(date1: Date, date2: Date): number {
  const d1 = new Date(date1)
  d1.setHours(0, 0, 0, 0)
  const d2 = new Date(date2)
  d2.setHours(0, 0, 0, 0)
  const diffMs = d2.getTime() - d1.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Get current tithi information for "Sacred Today" display.
 * Every tithi maps to a distinct deity so the home card image changes daily.
 */
export type TithiDeityKey =
  | 'vishnu'
  | 'shiva'
  | 'murugan'
  | 'ganesha'
  | 'devi'
  | 'surya'
  | 'lakshmi'
  | 'hanuman'
  | 'rama'

function getTithiDeityKey(tithiNumber: number): TithiDeityKey {
  switch (tithiNumber) {
    case 1:
      return 'ganesha' // beginnings
    case 2:
      return 'hanuman'
    case 3:
      return 'lakshmi' // Gauri / Lakshmi
    case 4:
      return 'ganesha' // Chaturthi
    case 5:
      return 'lakshmi' // Panchami — Saraswati / prosperity
    case 6:
      return 'murugan' // Shashti
    case 7:
      return 'surya' // Saptami
    case 8:
      return 'devi' // Ashtami
    case 9:
      return 'rama' // Navami
    case 10:
      return 'devi' // Dashami / Vijaya
    case 11:
      return 'vishnu' // Ekadashi
    case 12:
      return 'vishnu' // Dwadashi
    case 13:
      return 'shiva' // Pradosham
    case 14:
      return 'shiva' // Chaturdashi
    case 15:
      return 'lakshmi' // Pournami
    case 30:
      return 'hanuman' // Amavasya — strength / ancestral day
    default:
      return 'vishnu'
  }
}

function getTithiDescription(tithiNumber: number): string {
  switch (tithiNumber) {
    case 1:
      return 'A sacred day to begin with Lord Ganesha'
    case 2:
      return 'A sacred day for Hanuman’s blessings and courage'
    case 3:
      return 'Auspicious for Goddess Lakshmi and prosperity'
    case 4:
      return 'Sacred for Lord Ganesha worship'
    case 5:
      return 'Sacred for Goddess Lakshmi and learning'
    case 6:
      return 'Sacred day for Lord Murugan worship'
    case 7:
      return 'A sacred day to worship Lord Surya, the Sun God'
    case 8:
      return 'Auspicious for Goddess Durga and Devi worship'
    case 9:
      return 'Sacred day for Lord Rama’s blessings'
    case 10:
      return 'A day of victory — honor the Goddess'
    case 11:
      return 'A sacred day to connect with Lord Vishnu'
    case 12:
      return 'Auspicious for Lord Vishnu worship'
    case 13:
      return 'Sacred evening for Lord Shiva worship'
    case 14:
      return 'A sacred day for Lord Shiva and deep prayer'
    case 15:
      return 'Full moon — auspicious for Lakshmi and all worship'
    case 30:
      return 'New moon — ancestral prayers and Hanuman’s protection'
    default:
      return 'A sacred day to connect with the Divine'
  }
}

/** Short display label: "Shukla Panchami" → "Panchami" */
function displayTithiName(raw: string, info: TithiInfo | null): string {
  if (!info) return raw || 'Tithi'
  const labels: Record<number, string> = {
    1: 'Prathama',
    2: 'Dwitiya',
    3: 'Tritiya',
    4: 'Chaturthi',
    5: 'Panchami',
    6: 'Shashti',
    7: 'Saptami',
    8: 'Ashtami',
    9: 'Navami',
    10: 'Dashami',
    11: 'Ekadashi',
    12: 'Dwadashi',
    13: 'Trayodashi',
    14: 'Chaturdashi',
    15: 'Pournami',
    30: 'Amavasya',
  }
  return labels[info.number] ?? raw
}

export function getTithiDeityFilterParam(deityKey: TithiDeityKey): string | null {
  const map: Record<TithiDeityKey, string | null> = {
    vishnu: 'Vishnu',
    shiva: 'Shiva',
    murugan: 'Murugan',
    ganesha: 'Ganesha',
    devi: 'Devi',
    surya: 'Surya',
    lakshmi: 'Lakshmi',
    hanuman: 'Hanuman',
    rama: 'Rama',
  }
  return map[deityKey]
}

export function getCurrentTithi(): {
  tithi: string
  description: string
  nextEkadashi: number
  deityKey: TithiDeityKey
} {
  const today = new Date()
  today.setHours(12, 0, 0, 0)

  const calc = engine.calculate(today)
  const tithiName = calc.Tithi?.name_en_IN ?? 'Unknown'
  const tithiInfo = parseTithi(tithiName)

  const nextEkadashiDate = findNextTithi(11, today)
  const daysToEkadashi = nextEkadashiDate ? daysBetween(today, nextEkadashiDate) : 15

  const deityKey = tithiInfo ? getTithiDeityKey(tithiInfo.number) : 'vishnu'
  const description = tithiInfo
    ? getTithiDescription(tithiInfo.number)
    : 'A sacred day to connect with the Divine'

  return {
    tithi: displayTithiName(tithiName, tithiInfo),
    description,
    nextEkadashi: daysToEkadashi,
    deityKey,
  }
}

/**
 * Get the next 3 upcoming sacred festivals/tithis.
 */
export function getUpcomingFestivals(): Festival[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const festivals: Festival[] = []
  
  // Find next Ekadashi (11th tithi)
  const nextEkadashi = findNextTithi(11, today)
  if (nextEkadashi) {
    const daysLeft = daysBetween(today, nextEkadashi)
    festivals.push({
      name: 'Ekadashi',
      description: 'Seek the blessings of Lord Vishnu',
      date: nextEkadashi.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: nextEkadashi,
      icon: '🪔',
      daysLeft: daysLeft
    })
  }
  
  // Find next Pradosham (13th tithi - Trayodashi)
  const nextPradosham = findNextTithi(13, today)
  if (nextPradosham) {
    const daysLeft = daysBetween(today, nextPradosham)
    festivals.push({
      name: 'Pradosham',
      description: 'Sacred evening for Lord Shiva',
      date: nextPradosham.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: nextPradosham,
      icon: '🔱',
      daysLeft: daysLeft
    })
  }
  
  // Find next Amavasya (New Moon - 30th tithi)
  const nextAmavasya = findNextTithi(30, today)
  if (nextAmavasya) {
    const daysLeft = daysBetween(today, nextAmavasya)
    festivals.push({
      name: 'Amavasya',
      description: 'Day for ancestral prayers',
      date: nextAmavasya.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: nextAmavasya,
      icon: '🌙',
      daysLeft: daysLeft
    })
  }
  
  // Sort by date and take the next 3
  festivals.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime())
  return festivals.slice(0, 3)
}
