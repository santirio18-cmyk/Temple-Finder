import { MhahPanchang } from 'mhah-panchang'

/** Default: Chennai — used until geolocation is available */
export const DEFAULT_LAT = 13.0827
export const DEFAULT_LNG = 80.2707

const engine = new MhahPanchang()

/** Approximate Sanskrit lunar month → Tamil name (regional calendars vary). */
const MASA_TO_TAMIL: Record<string, string> = {
  Chaitra: 'சித்திரை',
  Vaisakha: 'வைகாசி',
  Jyeshtha: 'ஆனி',
  Ashadha: 'ஆடி',
  Shravana: 'ஆவணி',
  Bhadrapada: 'புரட்டாசி',
  Ashwin: 'ஐப்பசி',
  Kartik: 'கார்த்திகை',
  Margashirsha: 'மார்கழி',
  Pausha: 'தை',
  Magha: 'மாசி',
  Phalguna: 'பங்குனி',
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatRange(start: Date, end: Date): string {
  return `${formatTime(start)} – ${formatTime(end)}`
}

/** 8 equal segments between sunrise and sunset; segment 1 = first after sunrise */
function daySegmentRange(sunrise: Date, sunset: Date, segment1To8: number): { start: Date; end: Date } {
  const ms = sunset.getTime() - sunrise.getTime()
  const part = ms / 8
  const i = Math.max(0, Math.min(7, segment1To8 - 1))
  const start = new Date(sunrise.getTime() + i * part)
  const end = new Date(start.getTime() + part)
  return { start, end }
}

/** Standard weekday → Rahu Kaal segment (1–8). */
const RAHU_SEGMENT: number[] = [8, 2, 7, 5, 6, 4, 3] // Sun–Sat

/** Yamaganda segment (1–8). */
const YAMA_SEGMENT: number[] = [5, 1, 6, 4, 3, 2, 7]

export interface AuspiciousTimingRow {
  name: string
  time: string
  emoji: string
}

export interface PanchangDay {
  tithi: string
  tithiEnd: string
  nakshatra: string
  nakshatraEnd: string
  sunrise: string
  sunset: string
  tamilMonthLabel: string
  mantra: string
  yoga: string
  paksha: string
  masa: string
  auspiciousTimings: AuspiciousTimingRow[]
  /** Short disclaimer for UI */
  sourceNote: string
}

function trinityMantra(trinityEn: string | undefined): string {
  const t = (trinityEn || '').toLowerCase()
  if (t.includes('vishnu')) {
    return "Chant 'Om Namo Narayanaya' — Vishnu tattva is strong today."
  }
  if (t.includes('shiva')) {
    return "Chant 'Om Namah Shivaya' — Shiva tattva is strong today."
  }
  if (t.includes('brahma')) {
    return "Chant 'Om' with focus on Gayatri — creative energy is highlighted today."
  }
  return "Chant your ishta mantra with devotion — align with today's lunar energy."
}

export function getPanchangForDate(
  date: Date,
  lat: number,
  lng: number
): PanchangDay {
  const localNoon = new Date(date)
  localNoon.setHours(12, 0, 0, 0)

  const calc = engine.calculate(localNoon)
  const cal = engine.calendar(localNoon, lat, lng)
  const sun = engine.sunTimer(localNoon, lat, lng)

  const tithi = calc.Tithi?.name_en_IN ?? '—'
  const nak = calc.Nakshatra?.name_en_IN ?? '—'
  const tEnd = calc.Tithi?.end instanceof Date ? formatTime(calc.Tithi.end) : '—'
  const nEnd = calc.Nakshatra?.end instanceof Date ? formatTime(calc.Nakshatra.end) : '—'

  const sunrise = sun.sunRise instanceof Date ? sun.sunRise : null
  const sunset = sun.sunSet instanceof Date ? sun.sunSet : null
  const solarNoon = sun.solarNoon instanceof Date ? sun.solarNoon : null

  const masaName = (cal.Masa?.name_en_UK as string) || (cal.Masa?.name_en_IN as string) || ''
  const tamilMonth = MASA_TO_TAMIL[masaName] ?? masaName

  const mantra = trinityMantra(calc.Trinity?.name_en_IN as string | undefined)

  const auspiciousTimings: AuspiciousTimingRow[] = []

  if (sunrise && sunset) {
    const wd = sunrise.getDay()
    const rahu = daySegmentRange(sunrise, sunset, RAHU_SEGMENT[wd])
    const yama = daySegmentRange(sunrise, sunset, YAMA_SEGMENT[wd])
    auspiciousTimings.push({
      name: 'Rahu Kaal',
      time: formatRange(rahu.start, rahu.end),
      emoji: '🐍',
    })
    auspiciousTimings.push({
      name: 'Yamaganda',
      time: formatRange(yama.start, yama.end),
      emoji: '🐃',
    })

    const brahmaStart = new Date(sunrise.getTime() - 96 * 60 * 1000)
    const brahmaEnd = new Date(sunrise.getTime() - 48 * 60 * 1000)
    auspiciousTimings.push({
      name: 'Brahma Muhurta',
      time: formatRange(brahmaStart, brahmaEnd),
      emoji: '🪔',
    })
  }

  if (solarNoon && sunrise && sunset) {
    const abStart = new Date(solarNoon.getTime() - 24 * 60 * 1000)
    const abEnd = new Date(solarNoon.getTime() + 24 * 60 * 1000)
    auspiciousTimings.push({
      name: 'Abhijit Muhurta',
      time: formatRange(abStart, abEnd),
      emoji: '🌻',
    })
  }

  const yogaName = (cal.Yoga?.name_en_IN as string) || '—'
  const pakshaName = (cal.Paksha?.name_en_IN as string) || '—'

  return {
    tithi,
    tithiEnd: tEnd,
    nakshatra: nak,
    nakshatraEnd: nEnd,
    sunrise: sunrise ? formatTime(sunrise) : '—',
    sunset: sunset ? formatTime(sunset) : '—',
    tamilMonthLabel: tamilMonth,
    mantra,
    yoga: yogaName,
    paksha: pakshaName,
    masa: masaName,
    auspiciousTimings,
    sourceNote:
      'Panchang is computed for your location using astronomical algorithms. Regional almanacs may differ slightly.',
  }
}

/** Today’s mantra line for Ritual / onboarding (same engine, local noon). */
export function getTodayMantra(): string {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  const calc = engine.calculate(d)
  return trinityMantra(calc.Trinity?.name_en_IN as string | undefined)
}
