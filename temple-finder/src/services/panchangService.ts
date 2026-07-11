import { MhahPanchang } from 'mhah-panchang'
import { chandrashtamaNakshatra } from '../constants/nakshatras'
import { computeGowriPanchangam, type GowriPanchangam } from './gowriPanchangam'
import { getMajorFestivalsForMonth } from './tamilMajorFestivals'
import { computeVarjyam, formatVarjyamRange } from './varjyamService'

/** Default: Chennai — used until geolocation is available */
export const DEFAULT_LAT = 13.0827
export const DEFAULT_LNG = 80.2707

const engine = new MhahPanchang()

/**
 * Tamil solar months follow the Sun's rashi (sidereal sign), not the Sanskrit lunar masa label.
 * e.g. Sun in Gemini (mid-Jun to mid-Jul) = Aani, not Aadi.
 */
const RAASI_TO_TAMIL_MONTH: Record<string, { tamil: string; roman: string }> = {
  Aries: { tamil: 'சித்திரை', roman: 'Chithirai' },
  Taurus: { tamil: 'வைகாசி', roman: 'Vaikasi' },
  Gemini: { tamil: 'ஆனி', roman: 'Aani' },
  Cancer: { tamil: 'ஆடி', roman: 'Aadi' },
  Leo: { tamil: 'ஆவணி', roman: 'Avani' },
  Virgo: { tamil: 'புரட்டாசி', roman: 'Purattasi' },
  Libra: { tamil: 'ஐப்பசி', roman: 'Aippasi' },
  Scorpio: { tamil: 'கார்த்திகை', roman: 'Karthigai' },
  Sagittarius: { tamil: 'மார்கழி', roman: 'Margazhi' },
  Capricorn: { tamil: 'தை', roman: 'Thai' },
  Aquarius: { tamil: 'மாசி', roman: 'Masi' },
  Pisces: { tamil: 'பங்குனி', roman: 'Panguni' },
}

const PAKSHA_TO_TAMIL: Record<string, string> = {
  Shukla: 'Valarpirai',
  Krishna: 'Theipirai',
}

function resolveTamilSolarMonth(raasiName: string): { tamil: string; roman: string; raasi: string } {
  const key = raasiName.trim()
  const mapped = RAASI_TO_TAMIL_MONTH[key]
  if (mapped) return { ...mapped, raasi: key }
  return { tamil: key, roman: key, raasi: key }
}

function resolveTamilPaksha(pakshaName: string): string {
  const trimmed = pakshaName.trim()
  for (const [key, tamil] of Object.entries(PAKSHA_TO_TAMIL)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase())) return tamil
  }
  return trimmed
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatEndTime(end: Date, dayAnchor: Date): string {
  const sameDay =
    end.getFullYear() === dayAnchor.getFullYear() &&
    end.getMonth() === dayAnchor.getMonth() &&
    end.getDate() === dayAnchor.getDate()
  if (sameDay) return formatTime(end)
  const datePart = end.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
  return `${formatTime(end)}, ${datePart}`
}

export interface LunarPeriod {
  name: string
  tamil?: string
  end: string
}

/** Library label → standard Vedic name */
const NAKSHATRA_ALIASES: Record<string, string> = {
  Dwija: 'Bharani',
  Rebati: 'Revati',
  Mrigashirsha: 'Mrigashira',
}

const NAKSHATRA_TAMIL: Record<string, string> = {
  Ashwini: 'அசுவினி',
  Bharani: 'பரணி',
  Krittika: 'கார்த்திகை',
  Rohini: 'ரோகிணி',
  Mrigashira: 'மிருகசீரிடம்',
  Ardra: 'திருவாதிரை',
  Punarvasu: 'புனர்பூசம்',
  Pushya: 'பூசம்',
  Ashlesha: 'ஆயில்யம்',
  Magha: 'மகம்',
  'Purva Phalguni': 'பூரம்',
  'Uttara Phalguni': 'உத்திரம்',
  Hasta: 'ஹஸ்தம்',
  Chitra: 'சித்திரை',
  Swati: 'சுவாதி',
  Vishakha: 'விசாகம்',
  Anuradha: 'அனுஷம்',
  Jyeshtha: 'கேட்டை',
  Mula: 'மூலம்',
  'Purva Ashadha': 'பூராடம்',
  'Uttara Ashadha': 'உத்திராடம்',
  Sravana: 'திருவோணம்',
  Dhanishta: 'அவிட்டம்',
  Shatabhisha: 'சதயம்',
  'Purva Bhadrapada': 'பூரட்டாதி',
  'Uttara Bhadrapada': 'உத்திரட்டாதி',
  Revati: 'ரேவதி',
}

function normalizeNakshatraName(raw: string): string {
  const trimmed = raw.trim()
  return NAKSHATRA_ALIASES[trimmed] ?? trimmed
}

function nakshatraTamil(name: string): string | undefined {
  return NAKSHATRA_TAMIL[name]
}

function buildNakshatraPeriods(sunrise: Date, nextSunrise: Date, dayAnchor: Date): LunarPeriod[] {
  const periods: LunarPeriod[] = []
  let cursor = new Date(sunrise)

  while (cursor < nextSunrise) {
    const calc = engine.calculate(cursor)
    const raw = calc.Nakshatra?.name_en_IN ?? ''
    const name = normalizeNakshatraName(raw)
    const end = calc.Nakshatra?.end instanceof Date ? calc.Nakshatra.end : null
    if (!name || !end) break

    const periodEnd = end < nextSunrise ? end : nextSunrise
    periods.push({
      name,
      tamil: nakshatraTamil(name),
      end: formatEndTime(periodEnd, dayAnchor),
    })

    if (end >= nextSunrise) break
    cursor = new Date(end.getTime() + 60_000)
  }

  return periods
}

function buildTithiPeriods(sunrise: Date, nextSunrise: Date, dayAnchor: Date): LunarPeriod[] {
  const periods: LunarPeriod[] = []
  let cursor = new Date(sunrise)

  while (cursor < nextSunrise) {
    const calc = engine.calculate(cursor)
    const name = calc.Tithi?.name_en_IN ?? ''
    const end = calc.Tithi?.end instanceof Date ? calc.Tithi.end : null
    if (!name || !end) break

    const periodEnd = end < nextSunrise ? end : nextSunrise
    periods.push({ name, end: formatEndTime(periodEnd, dayAnchor) })

    if (end >= nextSunrise) break
    cursor = new Date(end.getTime() + 60_000)
  }

  return periods
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

export interface TimingRow {
  name: string
  time: string
  emoji: string
}

export interface VarjyamRow {
  nakshatra: string
  time: string
}

export interface ChandrashtamaInfo {
  active: boolean
  birthNakshatra: string
  chandrashtamaStar: string
  until?: string
}

export interface CalendarDaySummary {
  date: Date
  day: number
  inMonth: boolean
  tithi: string
  tithiShort: string
  nakshatra: string
  nakshatraTamil?: string
  nakshatraShort: string
  festival?: string
}

export interface PanchangDay {
  tithi: string
  tithiEnd: string
  tithiPeriods: LunarPeriod[]
  nakshatra: string
  nakshatraTamil?: string
  nakshatraEnd: string
  nakshatraPeriods: LunarPeriod[]
  sunrise: string
  sunset: string
  tamilMonthLabel: string
  tamilMonthRoman: string
  tamilPaksha: string
  raasi: string
  mantra: string
  yoga: string
  paksha: string
  masa: string
  auspiciousTimings: TimingRow[]
  inauspiciousTimings: TimingRow[]
  auspiciousDays: string[]
  gowriPanchangam: GowriPanchangam | null
  varjyam: VarjyamRow[]
  chandrashtama: ChandrashtamaInfo | null
  /** Short disclaimer for UI */
  sourceNote: string
}

function shortTithi(name: string): string {
  const num = name.match(/\d+/)?.[0]
  if (num) return num
  const words = name.split(/\s+/)
  const word = words[words.length - 1] ?? name
  return word.length > 6 ? word.slice(0, 5) : word
}

function shortNakshatra(name: string, tamil?: string): string {
  if (tamil) return tamil.length > 4 ? tamil.slice(0, 4) : tamil
  return name.length > 5 ? name.slice(0, 5) : name
}

/** Lightweight sunrise-only tithi/nakshatra — for month grid (avoids full day calc). */
export function getPanchangSummaryForDate(
  date: Date,
  lat: number,
  lng: number
): { tithi: string; nakshatra: string; nakshatraTamil?: string } {
  const localNoon = new Date(date)
  localNoon.setHours(12, 0, 0, 0)
  const sun = engine.sunTimer(localNoon, lat, lng)
  const sunrise = sun.sunRise instanceof Date ? sun.sunRise : localNoon
  const calc = engine.calculate(sunrise)
  const tithi = calc.Tithi?.name_en_IN ?? '—'
  const nak = normalizeNakshatraName(calc.Nakshatra?.name_en_IN ?? '—')
  return { tithi, nakshatra: nak, nakshatraTamil: nakshatraTamil(nak) }
}

export function getChandrashtamaFromPeriods(
  nakshatraPeriods: LunarPeriod[],
  birthNakshatra: string | null | undefined
): ChandrashtamaInfo | null {
  if (!birthNakshatra?.trim()) return null
  const chStar = chandrashtamaNakshatra(birthNakshatra)
  if (!chStar) return null
  const activePeriod = nakshatraPeriods.find(
    (period) => period.name.toLowerCase() === chStar.toLowerCase()
  )
  return {
    active: Boolean(activePeriod),
    birthNakshatra: birthNakshatra.trim(),
    chandrashtamaStar: chStar,
    until: activePeriod?.end,
  }
}

export function getChandrashtamaForDate(
  date: Date,
  birthNakshatra: string | null | undefined,
  lat: number,
  lng: number
): ChandrashtamaInfo | null {
  if (!birthNakshatra?.trim()) return null
  const chStar = chandrashtamaNakshatra(birthNakshatra)
  if (!chStar) return null

  const p = getPanchangForDate(date, lat, lng)
  return getChandrashtamaFromPeriods(p.nakshatraPeriods, birthNakshatra)
}

export function getMonthCalendar(
  year: number,
  month: number,
  lat: number,
  lng: number
): CalendarDaySummary[] {
  const first = new Date(year, month, 1)
  const startPad = (first.getDay() + 6) % 7
  const gridStart = new Date(year, month, 1 - startPad)

  const festivals = getMajorFestivalsForMonth(year, month, lat, lng)
  const festivalByDay = new Map<number, string>()
  for (const f of festivals) {
    festivalByDay.set(f.date.getDate(), f.name)
  }

  const cells: CalendarDaySummary[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    const inMonth = date.getMonth() === month
    if (!inMonth) {
      cells.push({
        date,
        day: date.getDate(),
        inMonth: false,
        tithi: '',
        tithiShort: '',
        nakshatra: '',
        nakshatraShort: '',
      })
      continue
    }

    const summary = getPanchangSummaryForDate(date, lat, lng)
    cells.push({
      date,
      day: date.getDate(),
      inMonth: true,
      tithi: summary.tithi,
      tithiShort: shortTithi(summary.tithi),
      nakshatra: summary.nakshatra,
      nakshatraTamil: summary.nakshatraTamil,
      nakshatraShort: shortNakshatra(summary.nakshatra, summary.nakshatraTamil),
      festival: festivalByDay.get(date.getDate()),
    })
  }

  return cells
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
  Bharani: "Chant 'Om Yamaya Namah' — Yama's star, release and renewal.",
  Mrigashira: "Chant 'Om Chandraya Namah' — Soma / gentle growth.",
  Revati: "Chant 'Om Pushne Namah' — Pushan, safe journey, completion.",
  Sravana: "Chant 'Om Vishnu Namah' — Vishnu’s hearing, wisdom.",
  Dhanishta: "Chant 'Om Vasubhyo Namah' — the Vasus, rhythm.",
  Shatabhisha: "Chant 'Om Varunaya Namah' — Varuna, healing.",
  'Purva Bhadrapada': "Chant 'Om Namah Shivaya' — Aja Ekapada, fire.",
  'Uttara Bhadrapada': "Chant 'Om Ahirbudhnyaya Namah' — deep waters, Saturn.",
  Rebati: "Chant 'Om Pushne Namah' — Pushan, safe journey, completion.",
}

function mantraForNakshatra(nakName: string | undefined): string {
  const key = normalizeNakshatraName((nakName || '').trim())
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
  const dayAnchor = new Date(date)
  dayAnchor.setHours(0, 0, 0, 0)

  const sun = engine.sunTimer(localNoon, lat, lng)
  const sunrise = sun.sunRise instanceof Date ? sun.sunRise : null
  const sunset = sun.sunSet instanceof Date ? sun.sunSet : null
  const solarNoon = sun.solarNoon instanceof Date ? sun.solarNoon : null

  const nextDay = new Date(localNoon)
  nextDay.setDate(nextDay.getDate() + 1)
  const nextSun = engine.sunTimer(nextDay, lat, lng)
  const nextSunrise =
    nextSun.sunRise instanceof Date ? nextSun.sunRise : sunrise ? new Date(sunrise.getTime() + 24 * 60 * 60 * 1000) : null

  const calcSunrise = sunrise ? engine.calculate(sunrise) : engine.calculate(localNoon)
  const cal = engine.calendar(sunrise ?? localNoon, lat, lng)

  const tithiPeriods =
    sunrise && nextSunrise ? buildTithiPeriods(sunrise, nextSunrise, dayAnchor) : []
  const nakshatraPeriods =
    sunrise && nextSunrise ? buildNakshatraPeriods(sunrise, nextSunrise, dayAnchor) : []

  const primaryTithi = tithiPeriods[0]
  const primaryNak = nakshatraPeriods[0]

  const tithi = primaryTithi?.name ?? calcSunrise.Tithi?.name_en_IN ?? '—'
  const tEnd = primaryTithi?.end ?? '—'
  const nak = primaryNak?.name ?? normalizeNakshatraName(calcSunrise.Nakshatra?.name_en_IN ?? '—')
  const nakTamil = primaryNak?.tamil ?? nakshatraTamil(nak)
  const nEnd = primaryNak?.end ?? '—'

  const raasiName = (cal.Raasi?.name_en_UK as string) || ''
  const { tamil: tamilMonth, roman: tamilMonthRoman, raasi } = resolveTamilSolarMonth(raasiName)
  const lunarMasaName = (cal.MoonMasa?.name_en_IN as string) || ''

  const mantra = getDailyMantraLine(calcSunrise)

  const auspiciousTimings: TimingRow[] = []
  const inauspiciousTimings: TimingRow[] = []
  let gowriPanchangam: GowriPanchangam | null = null

  if (sunrise && sunset && nextSunrise) {
    const wd = sunrise.getDay()
    const rahu = daySegmentRange(sunrise, sunset, RAHU_SEGMENT[wd])
    const yama = daySegmentRange(sunrise, sunset, YAMA_SEGMENT[wd])
    const gulikai = daySegmentRange(sunrise, sunset, GULIKAI_SEGMENT[wd])

    gowriPanchangam = computeGowriPanchangam(sunrise, sunset, nextSunrise, wd)

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
  }

  if (solarNoon && sunrise && sunset) {
    const abStart = new Date(solarNoon.getTime() - 24 * 60 * 1000)
    const abEnd = new Date(solarNoon.getTime() + 24 * 60 * 1000)
    auspiciousTimings.push({
      name: 'Abhijit Muhurta',
      time: formatRange(abStart, abEnd),
      emoji: '✨',
    })
  }

  const yogaName = (cal.Yoga?.name_en_IN as string) || '—'
  const pakshaName = (cal.Paksha?.name_en_IN as string) || '—'
  const tamilPaksha = resolveTamilPaksha(pakshaName)
  
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

  const varjyamRows: VarjyamRow[] = []
  if (sunrise && nextSunrise) {
    const windows = computeVarjyam(sunrise, nextSunrise)
    for (const w of windows) {
      varjyamRows.push({
        nakshatra: w.nakshatra,
        time: formatVarjyamRange(w.start, w.end, dayAnchor),
      })
    }
  }

  return {
    tithi,
    tithiEnd: tEnd,
    tithiPeriods,
    nakshatra: nak,
    nakshatraTamil: nakTamil,
    nakshatraEnd: nEnd,
    nakshatraPeriods,
    sunrise: sunrise ? formatTime(sunrise) : '—',
    sunset: sunset ? formatTime(sunset) : '—',
    tamilMonthLabel: tamilMonth,
    tamilMonthRoman,
    tamilPaksha,
    raasi,
    mantra,
    yoga: yogaName,
    paksha: pakshaName,
    masa: lunarMasaName,
    auspiciousTimings,
    inauspiciousTimings,
    auspiciousDays,
    gowriPanchangam,
    varjyam: varjyamRows,
    chandrashtama: null,
    sourceNote:
      'Tithi and nakshatra from sunrise to next sunrise. Regional almanacs may differ slightly.',
  }
}

/** Today’s mantra line for Ritual (nakshatra at sunrise). */
export function getTodayMantra(): string {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  const sun = engine.sunTimer(d, DEFAULT_LAT, DEFAULT_LNG)
  const at = sun.sunRise instanceof Date ? sun.sunRise : d
  const calc = engine.calculate(at)
  return getDailyMantraLine(calc)
}
