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

/** Gulikai segment (1–8). */
const GULIKAI_SEGMENT: number[] = [7, 6, 5, 4, 3, 2, 1]

/** Nalla Neram segments (1–8) - multiple auspicious periods per day */
const NALLA_NERAM_SEGMENTS: Record<number, number[]> = {
  0: [3, 6], // Sunday
  1: [1, 4, 7], // Monday
  2: [2, 5, 8], // Tuesday
  3: [3, 6], // Wednesday
  4: [1, 4, 7], // Thursday
  5: [2, 5], // Friday
  6: [3, 6], // Saturday
}

export interface TimingRow {
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
  auspiciousTimings: TimingRow[]
  inauspiciousTimings: TimingRow[]
  auspiciousDays: string[]  // Special days like Shashti, Ekadashi
  /** Short disclaimer for UI */
  sourceNote: string
}

/**
 * One-line suggestions keyed by mhah-panchang `Nakshatra.name_en_IN`.
 * Trinity alone repeats for 9 days in a row (library buckets 27 nakshatras into 3×9),
 * so we key on nakshatra for daily variety.
 */
const NAKSHATRA_MANTRA: Record<string, string> = {
  Ashwini: "Chant 'Om Gham' or pray to Ashwini Kumaras — vitality and healing.",
  Dwija: "Chant 'Om Kleem' or honor Agni — clarity and new beginnings.",
  Krittika: "Chant 'Om Saravanabhavaya Namah' — Muruga / Agni kula.",
  Rohini: "Chant 'Om Namo Bhagavate Vasudevaya' — Krishna’s nakshatra.",
  Mrigashirsha: "Chant 'Om Chandraya Namah' — Soma / gentle growth.",
  Ardra: "Chant 'Om Namah Shivaya' — Rudra’s transformative energy.",
  Punarvasu: "Chant 'Om Namo Narayanaya' — Aditi’s children, renewal.",
  Pushya: "Chant 'Om Gurave Namah' — Brihaspati, nourishment.",
  Ashlesha: "Chant 'Om Nagadevaya Namah' — serpent wisdom, introspection.",
  Magha: "Chant 'Om Pitru Devaya Namah' — ancestors and lineage.",
  'Purva Phalguni': "Chant 'Om Namah Shivaya' or honor Bhaga — creativity.",
  'Uttara Phalguni': "Chant 'Om Namo Narayanaya' — Aryaman, vows, union.",
  Hasta: "Chant 'Om Savitre Namah' — Savitur / skillful action.",
  Chitra: "Chant 'Om Vishwakarmane Namah' — divine architect, beauty.",
  Swati: "Chant 'Om Vayave Namah' — Vayu, independence, movement.",
  Vishakha: "Chant 'Om Indragnibhyam Namah' — Indra–Agni, purpose.",
  Anuradha: "Chant 'Om Mitraya Namah' — friendship, devotion.",
  Jyeshtha: "Chant 'Om Indraya Namah' — Indra, protection, courage.",
  Mula: "Chant 'Om Ketave Namah' or 'Om Namah Shivaya' — root, Ketu.",
  'Purva Ashadha': "Chant 'Om Apasve Namah' — invincibility, waters.",
  'Uttara Ashadha': "Chant 'Om Vishve Devaya Namah' — victory, tenacity.",
  Sravana: "Chant 'Om Vishnu Namah' — Vishnu’s hearing, wisdom.",
  Dhanishta: "Chant 'Om Vasubhyo Namah' — the Vasus, rhythm.",
  Shatabhisha: "Chant 'Om Varunaya Namah' — Varuna, healing.",
  'Purva Bhadrapada': "Chant 'Om Namah Shivaya' — Aja Ekapada, fire.",
  'Uttara Bhadrapada': "Chant 'Om Ahirbudhnyaya Namah' — deep waters, Saturn.",
  Rebati: "Chant 'Om Pushne Namah' — Pushan, safe journey, completion.",
}

function mantraForNakshatra(nakName: string | undefined): string {
  const key = (nakName || '').trim()
  if (key && NAKSHATRA_MANTRA[key]) return NAKSHATRA_MANTRA[key]
  const lower = key.toLowerCase()
  const found = Object.keys(NAKSHATRA_MANTRA).find((k) => k.toLowerCase() === lower)
  if (found) return NAKSHATRA_MANTRA[found]
  return ''
}

/** Fallback when nakshatra name is unknown — use Trinity bucket (0–2). */
function trinityMantraByIno(ino: number | undefined): string {
  if (ino === 0) return "Chant 'Om' with Gayatri — Brahma tattva is highlighted today."
  if (ino === 1) return "Chant 'Om Namo Narayanaya' — Vishnu tattva is highlighted today."
  if (ino === 2) return "Chant 'Om Namah Shivaya' — Shiva tattva is highlighted today."
  return "Chant your ishta mantra with devotion — align with today's lunar energy."
}

export function getDailyMantraLine(calc: {
  Nakshatra?: { name_en_IN?: string }
  Trinity?: { ino?: number }
}): string {
  const nak = mantraForNakshatra(calc.Nakshatra?.name_en_IN as string | undefined)
  if (nak) return nak
  return trinityMantraByIno(calc.Trinity?.ino as number | undefined)
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

  const mantra = getDailyMantraLine(calc)

  const auspiciousTimings: TimingRow[] = []
  const inauspiciousTimings: TimingRow[] = []

  if (sunrise && sunset) {
    const wd = sunrise.getDay()
    const rahu = daySegmentRange(sunrise, sunset, RAHU_SEGMENT[wd])
    const yama = daySegmentRange(sunrise, sunset, YAMA_SEGMENT[wd])
    const gulikai = daySegmentRange(sunrise, sunset, GULIKAI_SEGMENT[wd])
    
    // Inauspicious timings
    inauspiciousTimings.push({
      name: 'Rahu Kaal',
      time: formatRange(rahu.start, rahu.end),
      emoji: '⚠️',
    })
    inauspiciousTimings.push({
      name: 'Yamaganda',
      time: formatRange(yama.start, yama.end),
      emoji: '🚫',
    })
    inauspiciousTimings.push({
      name: 'Gulikai',
      time: formatRange(gulikai.start, gulikai.end),
      emoji: '⛔',
    })

    // Auspicious timings
    const brahmaStart = new Date(sunrise.getTime() - 96 * 60 * 1000)
    const brahmaEnd = new Date(sunrise.getTime() - 48 * 60 * 1000)
    auspiciousTimings.push({
      name: 'Brahma Muhurta',
      time: formatRange(brahmaStart, brahmaEnd),
      emoji: '🪔',
    })
    
    // Nalla Neram (multiple good times)
    const nallaSegments = NALLA_NERAM_SEGMENTS[wd] || []
    nallaSegments.forEach((seg, idx) => {
      const period = daySegmentRange(sunrise, sunset, seg)
      auspiciousTimings.push({
        name: `Nalla Neram ${idx + 1}`,
        time: formatRange(period.start, period.end),
        emoji: '🌟',
      })
    })
  }

  if (solarNoon && sunrise && sunset) {
    const abStart = new Date(solarNoon.getTime() - 24 * 60 * 1000)
    const abEnd = new Date(solarNoon.getTime() + 24 * 60 * 1000)
    auspiciousTimings.push({
      name: 'Abhijit Muhurta',
      time: formatRange(abStart, abEnd),
      emoji: '✨',
    })
    
    // Gowri Nalla Neram (Goddess Gowri's auspicious time - after noon on specific days)
    const gowriStart = new Date(solarNoon.getTime() + 60 * 60 * 1000) // 1 hour after noon
    const gowriEnd = new Date(solarNoon.getTime() + 90 * 60 * 1000) // 1.5 hours after noon
    auspiciousTimings.push({
      name: 'Gowri Nalla Neram',
      time: formatRange(gowriStart, gowriEnd),
      emoji: '💐',
    })
  }

  const yogaName = (cal.Yoga?.name_en_IN as string) || '—'
  const pakshaName = (cal.Paksha?.name_en_IN as string) || '—'
  
  // Auspicious Days
  const auspiciousDays: string[] = []
  const tithiNum = parseInt(tithi.match(/\d+/)?.[0] || '0')
  
  if (tithiNum === 6) auspiciousDays.push('🔱 Shashti - Sacred to Lord Murugan')
  if (tithiNum === 11) auspiciousDays.push('🙏 Ekadashi - Sacred to Lord Vishnu (Fasting day)')
  if (tithiNum === 13 && pakshaName.includes('Shukla')) auspiciousDays.push('🌙 Pradosham - Auspicious for Lord Shiva')
  if (tithiNum === 13 && pakshaName.includes('Krishna')) auspiciousDays.push('🌙 Pradosham - Auspicious for Lord Shiva')
  if (tithi.includes('Purnima') || tithiNum === 15) auspiciousDays.push('🌕 Pournami (Full Moon) - Very auspicious')
  if (tithi.includes('Amavasya') || tithiNum === 30) auspiciousDays.push('🌑 Amavasya (New Moon) - Ancestral day')
  if (tithiNum === 4) auspiciousDays.push('🐘 Chaturthi - Sacred to Lord Ganesha')
  if (tithiNum === 8) auspiciousDays.push('✨ Ashtami - Sacred to Goddess Durga')

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
    inauspiciousTimings,
    auspiciousDays,
    sourceNote:
      'Panchang is computed for your location using astronomical algorithms. Regional almanacs may differ slightly.',
  }
}

/** Today’s mantra line for Ritual (nakshatra-based for variety). */
export function getTodayMantra(): string {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  const calc = engine.calculate(d)
  return getDailyMantraLine(calc)
}
