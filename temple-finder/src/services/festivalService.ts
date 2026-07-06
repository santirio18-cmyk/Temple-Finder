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
    'Purnima': 15, 'Poornima': 15,
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
 */
export type TithiDeityKey = 'vishnu' | 'shiva' | 'murugan' | 'ganesha' | 'devi' | 'divine'

function getTithiDeityKey(tithiNumber: number): TithiDeityKey {
  switch (tithiNumber) {
    case 11:
      return 'vishnu'
    case 13:
      return 'shiva'
    case 6:
      return 'murugan'
    case 4:
      return 'ganesha'
    case 8:
      return 'devi'
    default:
      return 'divine'
  }
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
  
  // Find next Ekadashi
  const nextEkadashiDate = findNextTithi(11, today)
  const daysToEkadashi = nextEkadashiDate ? daysBetween(today, nextEkadashiDate) : 15
  
  // Provide appropriate description based on current tithi
  let description = 'A sacred day to connect with the Divine'
  
  if (tithiInfo) {
    switch (tithiInfo.number) {
      case 11:
        description = 'A sacred day to connect with Lord Vishnu'
        break
      case 13:
        description = 'Sacred evening for Lord Shiva worship'
        break
      case 30:
        description = 'Day for ancestral prayers and offerings'
        break
      case 15:
        description = 'Full moon - auspicious for all worship'
        break
      case 8:
        description = 'Auspicious for Lord Krishna or Ganesha'
        break
      case 4:
        description = 'Sacred for Lord Ganesha worship'
        break
      case 6:
        description = 'Sacred day for Lord Murugan worship'
        break
      default:
        description = 'A sacred day to connect with the Divine'
    }
  }
  
  return {
    tithi: tithiName,
    description,
    nextEkadashi: daysToEkadashi,
    deityKey: tithiInfo ? getTithiDeityKey(tithiInfo.number) : 'divine'
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
