import { MhahPanchang } from 'mhah-panchang'

const DEFAULT_LAT = 13.0827
const DEFAULT_LNG = 80.2707

const engine = new MhahPanchang()

const RAASI_TO_TAMIL_MONTH: Record<string, string> = {
  Aries: 'Chithirai',
  Taurus: 'Vaikasi',
  Gemini: 'Aani',
  Cancer: 'Aadi',
  Leo: 'Avani',
  Virgo: 'Purattasi',
  Libra: 'Aippasi',
  Scorpio: 'Karthigai',
  Sagittarius: 'Margazhi',
  Capricorn: 'Thai',
  Aquarius: 'Masi',
  Pisces: 'Panguni',
}

export interface TamilFestival {
  id: string
  name: string
  tamil: string
  description: string
  date: Date
  dateLabel: string
}

function parseTithiNumber(tithiName: string): number {
  const lower = tithiName.toLowerCase()
  const map: Record<string, number> = {
    prathama: 1,
    pratipada: 1,
    padyami: 1,
    dwitiya: 2,
    vidhiya: 2,
    tritiya: 3,
    chaturthi: 4,
    panchami: 5,
    shashthi: 6,
    shashti: 6,
    saptami: 7,
    sapthami: 7,
    ashtami: 8,
    navami: 9,
    dashami: 10,
    ekadashi: 11,
    ekadasi: 11,
    dwadashi: 12,
    dvadasi: 12,
    trayodashi: 13,
    chaturdashi: 14,
    chaturdasi: 14,
    purnima: 15,
    poornima: 15,
    pournami: 15,
    punnami: 15,
    amavasya: 30,
    amavasai: 30,
  }
  for (const [key, num] of Object.entries(map)) {
    if (lower.includes(key)) return num
  }
  return 0
}

function formatDateLabel(d: Date): string {
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function sunriseTithi(date: Date, lat: number, lng: number): string {
  const noon = new Date(date)
  noon.setHours(12, 0, 0, 0)
  const sun = engine.sunTimer(noon, lat, lng)
  const sunrise = sun.sunRise instanceof Date ? sun.sunRise : noon
  const calc = engine.calculate(sunrise)
  return calc.Tithi?.name_en_IN ?? ''
}

function tamilSolarMonthRoman(date: Date, lat: number, lng: number): string {
  const noon = new Date(date)
  noon.setHours(12, 0, 0, 0)
  const sun = engine.sunTimer(noon, lat, lng)
  const sunrise = sun.sunRise instanceof Date ? sun.sunRise : noon
  const cal = engine.calendar(sunrise, lat, lng)
  const raasi = (cal.Raasi?.name_en_UK as string) || ''
  return RAASI_TO_TAMIL_MONTH[raasi.trim()] ?? raasi
}

/** Panguni Uthiram — Poornami in Panguni (Tamil solar month) */
function findPanguniUthiram(year: number, lat: number, lng: number): Date | null {
  for (let m = 2; m <= 4; m++) {
    for (let d = 1; d <= 31; d++) {
      const date = new Date(year, m, d)
      if (date.getMonth() !== m) continue
      if (tamilSolarMonthRoman(date, lat, lng) !== 'Panguni') continue
      const tithi = sunriseTithi(date, lat, lng)
      if (parseTithiNumber(tithi) !== 15) continue
      return date
    }
  }
  return null
}

/** Aadi Perukku — 18th day of Tamil solar month Aadi */
function findAadiPerukku(year: number, lat: number, lng: number): Date | null {
  let aadiStart: Date | null = null
  const scanStart = new Date(year, 6, 1)
  const scanEnd = new Date(year, 7, 20)

  for (let d = new Date(scanStart); d <= scanEnd; d.setDate(d.getDate() + 1)) {
    const month = tamilSolarMonthRoman(d, lat, lng)
    if (month === 'Aadi' && !aadiStart) aadiStart = new Date(d)
    if (aadiStart && month !== 'Aadi') break
  }

  if (!aadiStart) return null
  const festival = new Date(aadiStart)
  festival.setDate(aadiStart.getDate() + 17)
  if (tamilSolarMonthRoman(festival, lat, lng) === 'Aadi') return festival
  return null
}

/** Karthigai Deepam — Poornami in Karthigai month */
function findKarthigaiDeepam(year: number, lat: number, lng: number): Date | null {
  for (let m = 10; m <= 11; m++) {
    for (let d = 1; d <= 31; d++) {
      const date = new Date(year, m, d)
      if (date.getMonth() !== m) continue
      if (tamilSolarMonthRoman(date, lat, lng) !== 'Karthigai') continue
      const tithi = sunriseTithi(date, lat, lng)
      if (parseTithiNumber(tithi) === 15) return date
    }
  }
  return null
}

const festivalYearCache = new Map<string, TamilFestival[]>()

function festivalCacheKey(year: number, lat: number, lng: number): string {
  return `${year}:${lat.toFixed(2)}:${lng.toFixed(2)}`
}

export function getMajorTamilFestivals(
  year: number,
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG
): TamilFestival[] {
  const key = festivalCacheKey(year, lat, lng)
  const cached = festivalYearCache.get(key)
  if (cached) return cached

  const items: Array<TamilFestival | null> = [
    (() => {
      const date = findPanguniUthiram(year, lat, lng)
      return date
        ? {
            id: 'panguni-uthiram',
            name: 'Panguni Uthiram',
            tamil: 'பங்குனி உத்திரம்',
            description: 'Sacred to Murugan & divine unions — Poornami in Panguni with Uttara nakshatra',
            date,
            dateLabel: formatDateLabel(date),
          }
        : null
    })(),
    (() => {
      const date = findAadiPerukku(year, lat, lng)
      return date
        ? {
            id: 'aadi-perukku',
            name: 'Aadi Perukku',
            tamil: 'ஆடி பெருக்கு',
            description: 'Worship of rivers & nature on the 18th day of Aadi',
            date,
            dateLabel: formatDateLabel(date),
          }
        : null
    })(),
    (() => {
      const date = findKarthigaiDeepam(year, lat, lng)
      return date
        ? {
            id: 'karthigai-deepam',
            name: 'Karthigai Deepam',
            tamil: 'கார்த்திகை தீபம்',
            description: 'Festival of lights — Poornami in Karthigai (Thiruvannamalai Deepam)',
            date,
            dateLabel: formatDateLabel(date),
          }
        : null
    })(),
  ]

  const result = items.filter((f): f is TamilFestival => f !== null).sort((a, b) => a.date.getTime() - b.date.getTime())
  festivalYearCache.set(key, result)
  return result
}

export function getMajorFestivalsForMonth(
  year: number,
  month: number,
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG
): TamilFestival[] {
  return getMajorTamilFestivals(year, lat, lng).filter(
    (f) => f.date.getFullYear() === year && f.date.getMonth() === month
  )
}

export function getUpcomingMajorFestivals(
  fromDate = new Date(),
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  limit = 5
): TamilFestival[] {
  const year = fromDate.getFullYear()
  const all = [...getMajorTamilFestivals(year, lat, lng), ...getMajorTamilFestivals(year + 1, lat, lng)]
  const today = new Date(fromDate)
  today.setHours(0, 0, 0, 0)
  return all
    .filter((f) => {
      const d = new Date(f.date)
      d.setHours(0, 0, 0, 0)
      return d >= today
    })
    .slice(0, limit)
}
