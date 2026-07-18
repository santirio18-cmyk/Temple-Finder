import { MhahPanchang } from 'mhah-panchang'

const engine = new MhahPanchang()

export interface BirthDetails {
  name: string
  dateOfBirth: Date
  timeOfBirth: string // HH:mm format
  latitude: number
  longitude: number
  timezone: string
  locationName: string
}

export interface Planet {
  name: string
  sign: string
  signNumber: number // 1-12 (Aries=1, Taurus=2, etc.)
  house: number // 1-12
  degree: number
  retrograde: boolean
  nakshatra: string
  pada: number
}

/** Panchang snapshot at birth moment */
export interface BirthPanchang {
  tithi: string
  tithiRaw: string
  paksha: string
  pakshaTamil: string
  nakshatra: string
  yoga: string
  karana: string
  weekday: string
  tamilMonthRoman: string
  tamilMonthTamil: string
  specialNote?: string
}

export interface BirthChart {
  name: string
  birthDateTime: Date
  location: string
  ascendant: {
    sign: string
    degree: number
  }
  moonSign: string
  sunSign: string
  nakshatra: {
    name: string
    pada: number
    lord: string
  }
  planets: Planet[]
  houses: {
    [key: number]: string // house number -> sign
  }
  dasha: {
    current: string
    lord: string
    startDate: Date
    endDate: Date
    subPeriods: Array<{
      planet: string
      startDate: Date
      endDate: Date
    }>
  }
  birthPanchang: BirthPanchang
}

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

const SIGN_SANSKRIT = [
  'मेष (Mesha)', 'वृषभ (Vrishabha)', 'मिथुन (Mithuna)', 'कर्क (Karka)',
  'सिंह (Simha)', 'कन्या (Kanya)', 'तुला (Tula)', 'वृश्चिक (Vrishchika)',
  'धनु (Dhanu)', 'मकर (Makara)', 'कुम्भ (Kumbha)', 'मीन (Meena)'
]

const PLANETS = [
  { key: 'Sun', name: 'Sun (सूर्य)', symbol: '☉' },
  { key: 'Moon', name: 'Moon (चंद्र)', symbol: '☽' },
  { key: 'Mars', name: 'Mars (मंगल)', symbol: '♂' },
  { key: 'Mercury', name: 'Mercury (बुध)', symbol: '☿' },
  { key: 'Jupiter', name: 'Jupiter (गुरु)', symbol: '♃' },
  { key: 'Venus', name: 'Venus (शुक्र)', symbol: '♀' },
  { key: 'Saturn', name: 'Saturn (शनि)', symbol: '♄' },
  { key: 'Rahu', name: 'Rahu (राहु)', symbol: '☊' },
  { key: 'Ketu', name: 'Ketu (केतु)', symbol: '☋' },
]

const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu' },
  { name: 'Bharani', lord: 'Venus' },
  { name: 'Krittika', lord: 'Sun' },
  { name: 'Rohini', lord: 'Moon' },
  { name: 'Mrigashira', lord: 'Mars' },
  { name: 'Ardra', lord: 'Rahu' },
  { name: 'Punarvasu', lord: 'Jupiter' },
  { name: 'Pushya', lord: 'Saturn' },
  { name: 'Ashlesha', lord: 'Mercury' },
  { name: 'Magha', lord: 'Ketu' },
  { name: 'Purva Phalguni', lord: 'Venus' },
  { name: 'Uttara Phalguni', lord: 'Sun' },
  { name: 'Hasta', lord: 'Moon' },
  { name: 'Chitra', lord: 'Mars' },
  { name: 'Swati', lord: 'Rahu' },
  { name: 'Vishakha', lord: 'Jupiter' },
  { name: 'Anuradha', lord: 'Saturn' },
  { name: 'Jyeshtha', lord: 'Mercury' },
  { name: 'Mula', lord: 'Ketu' },
  { name: 'Purva Ashadha', lord: 'Venus' },
  { name: 'Uttara Ashadha', lord: 'Sun' },
  { name: 'Shravana', lord: 'Moon' },
  { name: 'Dhanishta', lord: 'Mars' },
  { name: 'Shatabhisha', lord: 'Rahu' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn' },
  { name: 'Revati', lord: 'Mercury' },
]

// Vimshottari Dasha periods in years
const DASHA_PERIODS: Record<string, number> = {
  'Ketu': 7,
  'Venus': 20,
  'Sun': 6,
  'Moon': 10,
  'Mars': 7,
  'Rahu': 18,
  'Jupiter': 16,
  'Saturn': 19,
  'Mercury': 17,
}

const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury']

function getLongitudeToSign(longitude: number): { sign: string; signNumber: number; degree: number } {
  const adjustedLon = ((longitude % 360) + 360) % 360
  const signNumber = Math.floor(adjustedLon / 30) + 1
  const degree = adjustedLon % 30
  const sign = SIGNS[signNumber - 1]
  return { sign, signNumber, degree }
}

function getLongitudeToNakshatra(longitude: number): { name: string; pada: number; lord: string } {
  const adjustedLon = ((longitude % 360) + 360) % 360
  const nakshatraIndex = Math.floor(adjustedLon / 13.333333333333334)
  const nakshatraProgress = (adjustedLon % 13.333333333333334) / 13.333333333333334
  const pada = Math.floor(nakshatraProgress * 4) + 1
  
  const nakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0]
  return {
    name: nakshatra.name,
    pada,
    lord: nakshatra.lord
  }
}

function calculateVimshottariDasha(moonNakshatra: string, moonDegreeInNakshatra: number, birthDate: Date) {
  const nakshatraIndex = NAKSHATRAS.findIndex(n => n.name === moonNakshatra)
  const nakshatraLord = NAKSHATRAS[nakshatraIndex]?.lord || 'Moon'
  
  // Calculate balance of Maha Dasha at birth
  const nakshatraDuration = 13.333333333333334 // degrees
  const progressPercent = moonDegreeInNakshatra / nakshatraDuration
  const mahaperiodYears = DASHA_PERIODS[nakshatraLord] || 10
  const balanceYears = mahaperiodYears * (1 - progressPercent)
  
  // Calculate start date of current Maha Dasha
  const currentDashaStart = new Date(birthDate)
  currentDashaStart.setFullYear(currentDashaStart.getFullYear() - (mahaperiodYears - balanceYears))
  
  const currentDashaEnd = new Date(currentDashaStart)
  currentDashaEnd.setFullYear(currentDashaEnd.getFullYear() + mahaperiodYears)
  
  // Find current Maha Dasha based on today's date
  const now = new Date()
  const lordIndex = DASHA_ORDER.indexOf(nakshatraLord)
  
  let currentLord = nakshatraLord
  let dashaStart = currentDashaStart
  let dashaEnd = currentDashaEnd
  
  // If birth dasha has ended, calculate which dasha we're in now
  if (now > dashaEnd) {
    let checkDate = dashaEnd
    let checkLordIndex = (lordIndex + 1) % DASHA_ORDER.length
    
    while (checkDate < now) {
      const checkLord = DASHA_ORDER[checkLordIndex]
      const periodYears = DASHA_PERIODS[checkLord]
      const nextEnd = new Date(checkDate)
      nextEnd.setFullYear(nextEnd.getFullYear() + periodYears)
      
      if (now >= checkDate && now < nextEnd) {
        currentLord = checkLord
        dashaStart = checkDate
        dashaEnd = nextEnd
        break
      }
      
      checkDate = nextEnd
      checkLordIndex = (checkLordIndex + 1) % DASHA_ORDER.length
    }
  }
  
  // Calculate Antar Dasha (sub-periods)
  const subPeriods: Array<{ planet: string; startDate: Date; endDate: Date }> = []
  const mahaYears = DASHA_PERIODS[currentLord]
  let subStart = dashaStart
  
  const startLordIndex = DASHA_ORDER.indexOf(currentLord)
  for (let i = 0; i < DASHA_ORDER.length; i++) {
    const subLord = DASHA_ORDER[(startLordIndex + i) % DASHA_ORDER.length]
    const subYears = (DASHA_PERIODS[subLord] * mahaYears) / 120
    const subEnd = new Date(subStart)
    subEnd.setFullYear(subEnd.getFullYear() + Math.floor(subYears))
    subEnd.setMonth(subEnd.getMonth() + Math.round((subYears % 1) * 12))
    
    subPeriods.push({
      planet: subLord,
      startDate: subStart,
      endDate: subEnd
    })
    
    subStart = subEnd
  }
  
  return {
    current: currentLord,
    lord: currentLord,
    startDate: dashaStart,
    endDate: dashaEnd,
    subPeriods: subPeriods.slice(0, 3) // First 3 sub-periods for display
  }
}

const NAKSHATRA_ALIASES: Record<string, string> = {
  Dwija: 'Bharani',
  Rebati: 'Revati',
  Mrigashirsha: 'Mrigashira',
  Sravana: 'Shravana',
}

function normalizeNakshatra(raw: string): string {
  const trimmed = (raw || '').trim()
  return NAKSHATRA_ALIASES[trimmed] ?? trimmed
}

function signMeta(signName: string): { sign: string; signNumber: number; degree: number } {
  const idx = SIGNS.findIndex((s) => s.toLowerCase() === signName.trim().toLowerCase())
  const signNumber = idx >= 0 ? idx + 1 : 1
  return { sign: SIGNS[signNumber - 1], signNumber, degree: 15 }
}

function nakshatraPada(birthDateTime: Date, nakStart?: Date, nakEnd?: Date): number {
  if (!(nakStart instanceof Date) || !(nakEnd instanceof Date)) return 1
  const span = nakEnd.getTime() - nakStart.getTime()
  if (span <= 0) return 1
  const progress = (birthDateTime.getTime() - nakStart.getTime()) / span
  return Math.min(4, Math.max(1, Math.floor(progress * 4) + 1))
}

function houseFromSigns(planetSignNumber: number, ascSignNumber: number): number {
  return ((planetSignNumber - ascSignNumber + 12) % 12) + 1
}

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

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function displayTithiName(raw: string): string {
  const lower = raw.toLowerCase()
  const map: Array<[string, string]> = [
    ['punnami', 'Pournami'],
    ['pournami', 'Pournami'],
    ['purnima', 'Pournami'],
    ['poornima', 'Pournami'],
    ['amavasya', 'Amavasya'],
    ['amavasai', 'Amavasya'],
    ['prathama', 'Prathama'],
    ['pratipada', 'Prathama'],
    ['padyami', 'Prathama'],
    ['dwitiya', 'Dwitiya'],
    ['vidhiya', 'Dwitiya'],
    ['tritiya', 'Tritiya'],
    ['chaturthi', 'Chaturthi'],
    ['panchami', 'Panchami'],
    ['shashthi', 'Shashti'],
    ['shashti', 'Shashti'],
    ['saptami', 'Saptami'],
    ['sapthami', 'Saptami'],
    ['ashtami', 'Ashtami'],
    ['navami', 'Navami'],
    ['dashami', 'Dashami'],
    ['dasami', 'Dashami'],
    ['ekadashi', 'Ekadashi'],
    ['ekadasi', 'Ekadashi'],
    ['dwadashi', 'Dwadashi'],
    ['dvadasi', 'Dwadashi'],
    ['trayodashi', 'Trayodashi'],
    ['chaturdashi', 'Chaturdashi'],
    ['chaturdasi', 'Chaturdashi'],
  ]
  for (const [key, label] of map) {
    if (lower.includes(key)) return label
  }
  return raw.trim() || '—'
}

function resolveTamilPaksha(pakshaName: string): string {
  const t = pakshaName.toLowerCase()
  if (t.includes('shukla')) return 'Valarpirai'
  if (t.includes('krishna')) return 'Theipirai'
  return pakshaName.trim() || '—'
}

function specialTithiNote(tithi: string, paksha: string): string | undefined {
  const t = tithi.toLowerCase()
  if (t.includes('ekadashi')) return 'Ekadashi — sacred fasting day for Vishnu'
  if (t.includes('pournami') || t.includes('purnima')) return 'Pournami — full moon, very auspicious'
  if (t.includes('amavasya')) return 'Amavasya — ancestral day'
  if (t.includes('shashti')) return 'Shashti — sacred to Lord Murugan'
  if (t.includes('chaturthi')) return 'Chaturthi — sacred to Lord Ganesha'
  if (t.includes('ashtami')) return 'Ashtami — sacred to Devi / Krishna'
  if (t.includes('navami')) return 'Navami — sacred to Rama / Devi'
  if (t.includes('trayodashi') || t.includes('pradosham')) return 'Trayodashi — Pradosham for Shiva'
  if (t.includes('saptami') && paksha.toLowerCase().includes('shukla')) {
    return 'Saptami — auspicious for Surya'
  }
  return undefined
}

export function computeBirthPanchang(
  birthDateTime: Date,
  latitude = 13.0827,
  longitude = 80.2707
): BirthPanchang {
  const calc = engine.calculate(birthDateTime)
  const cal = engine.calendar(birthDateTime, latitude, longitude)

  const tithiRaw = (calc.Tithi?.name_en_IN as string) || '—'
  const tithi = displayTithiName(tithiRaw)
  const paksha = (cal.Paksha?.name_en_IN as string) || (calc.Paksha?.name_en_IN as string) || '—'
  const pakshaTamil = resolveTamilPaksha(paksha)
  const yoga = (cal.Yoga?.name_en_IN as string) || (calc.Yoga?.name_en_IN as string) || '—'
  const karana = (calc.Karna?.name_en_IN as string) || '—'
  const nakshatra = normalizeNakshatra((calc.Nakshatra?.name_en_IN as string) || '—')
  const sunRaasi = (cal.Raasi?.name_en_UK as string) || ''
  const month = RAASI_TO_TAMIL_MONTH[sunRaasi.trim()] || { tamil: sunRaasi || '—', roman: sunRaasi || '—' }

  return {
    tithi,
    tithiRaw,
    paksha,
    pakshaTamil,
    nakshatra,
    yoga,
    karana,
    weekday: WEEKDAYS[birthDateTime.getDay()] || '—',
    tamilMonthRoman: month.roman,
    tamilMonthTamil: month.tamil,
    specialNote: specialTithiNote(tithi, paksha),
  }
}

export function calculateBirthChart(details: BirthDetails): BirthChart {
  const { dateOfBirth, timeOfBirth, latitude, longitude, name, locationName } = details

  const [hours, minutes] = timeOfBirth.split(':').map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    throw new Error('Invalid birth time. Use HH:mm format.')
  }

  const birthDateTime = new Date(dateOfBirth)
  if (Number.isNaN(birthDateTime.getTime())) {
    throw new Error('Invalid birth date.')
  }
  birthDateTime.setHours(hours, minutes, 0, 0)

  const calc = engine.calculate(birthDateTime)
  const cal = engine.calendar(birthDateTime, latitude, longitude)

  // Real library values: Moon rashi/nakshatra at birth; Sun rashi from calendar
  const moonSign = signMeta((calc.Raasi?.name_en_UK as string) || 'Aries')
  const sunSign = signMeta((cal.Raasi?.name_en_UK as string) || moonSign.sign)

  const nakRaw = normalizeNakshatra((calc.Nakshatra?.name_en_IN as string) || 'Ashwini')
  const nakIdx = NAKSHATRAS.findIndex((n) => n.name.toLowerCase() === nakRaw.toLowerCase())
  const nakEntry = NAKSHATRAS[nakIdx >= 0 ? nakIdx : 0]
  const pada = nakshatraPada(
    birthDateTime,
    calc.Nakshatra?.start instanceof Date ? calc.Nakshatra.start : undefined,
    calc.Nakshatra?.end instanceof Date ? calc.Nakshatra.end : undefined
  )
  const moonNakshatra = {
    name: nakEntry.name,
    pada,
    lord: nakEntry.lord,
  }

  // Approximate lagna (not Swiss-ephemeris grade)
  const localSiderealTime = (birthDateTime.getTime() / 3_600_000 + longitude / 15) % 24
  const ascendantLon = ((localSiderealTime * 15) % 360 + 360) % 360
  const ascendant = getLongitudeToSign(ascendantLon)

  const houses: { [key: number]: string } = {}
  for (let i = 1; i <= 12; i++) {
    const houseLon = (ascendantLon + (i - 1) * 30) % 360
    houses[i] = getLongitudeToSign(houseLon).sign
  }

  const sunNakApprox = getLongitudeToNakshatra((sunSign.signNumber - 1) * 30 + 15)
  const planets: Planet[] = [
    {
      name: 'Sun',
      sign: sunSign.sign,
      signNumber: sunSign.signNumber,
      house: houseFromSigns(sunSign.signNumber, ascendant.signNumber),
      degree: sunSign.degree,
      retrograde: false,
      nakshatra: sunNakApprox.name,
      pada: sunNakApprox.pada,
    },
    {
      name: 'Moon',
      sign: moonSign.sign,
      signNumber: moonSign.signNumber,
      house: houseFromSigns(moonSign.signNumber, ascendant.signNumber),
      degree: moonSign.degree,
      retrograde: false,
      nakshatra: moonNakshatra.name,
      pada: moonNakshatra.pada,
    },
  ]

  const nakStart = calc.Nakshatra?.start instanceof Date ? calc.Nakshatra.start : birthDateTime
  const nakEnd = calc.Nakshatra?.end instanceof Date ? calc.Nakshatra.end : birthDateTime
  const span = Math.max(1, nakEnd.getTime() - nakStart.getTime())
  const progress = Math.min(1, Math.max(0, (birthDateTime.getTime() - nakStart.getTime()) / span))
  const moonDegreeInNakshatra = progress * 13.333333333333334
  const dasha = calculateVimshottariDasha(moonNakshatra.name, moonDegreeInNakshatra, birthDateTime)
  const birthPanchang = computeBirthPanchang(birthDateTime, latitude, longitude)

  return {
    name: name.trim() || 'Chart',
    birthDateTime,
    location: locationName.trim() || 'Unknown',
    ascendant: {
      sign: ascendant.sign,
      degree: ascendant.degree,
    },
    moonSign: moonSign.sign,
    sunSign: sunSign.sign,
    nakshatra: moonNakshatra,
    planets,
    houses,
    dasha,
    birthPanchang,
  }
}

export function saveBirthChart(chart: BirthChart) {
  const charts = getBirthCharts()
  charts.push(chart)
  localStorage.setItem('birthCharts', JSON.stringify(charts))
}

export function updateBirthChart(index: number, chart: BirthChart) {
  const charts = getBirthCharts()
  if (index >= 0 && index < charts.length) {
    charts[index] = chart
    localStorage.setItem('birthCharts', JSON.stringify(charts))
  }
}

export function getBirthCharts(): BirthChart[] {
  const stored = localStorage.getItem('birthCharts')
  if (!stored) return []

  try {
    const charts = JSON.parse(stored)
    if (!Array.isArray(charts)) return []

    return charts
      .map((chart: any) => {
        try {
          const subPeriods = Array.isArray(chart?.dasha?.subPeriods)
            ? chart.dasha.subPeriods.map((sp: any) => ({
                planet: sp.planet || '—',
                startDate: new Date(sp.startDate),
                endDate: new Date(sp.endDate),
              }))
            : []

          const birthDateTime = new Date(chart.birthDateTime)
          const birthPanchang: BirthPanchang =
            chart.birthPanchang?.tithi
              ? chart.birthPanchang
              : computeBirthPanchang(birthDateTime)

          return {
            ...chart,
            name: chart.name || 'Chart',
            location: chart.location || 'Unknown',
            birthDateTime,
            ascendant: chart.ascendant || { sign: 'Aries', degree: 0 },
            moonSign: chart.moonSign || '—',
            sunSign: chart.sunSign || '—',
            nakshatra: chart.nakshatra || { name: 'Ashwini', pada: 1, lord: 'Ketu' },
            planets: Array.isArray(chart.planets) ? chart.planets : [],
            houses: chart.houses || {},
            dasha: {
              current: chart?.dasha?.current || chart?.dasha?.lord || '—',
              lord: chart?.dasha?.lord || '—',
              startDate: new Date(chart?.dasha?.startDate || Date.now()),
              endDate: new Date(chart?.dasha?.endDate || Date.now()),
              subPeriods,
            },
            birthPanchang,
          } as BirthChart
        } catch {
          return null
        }
      })
      .filter((c: BirthChart | null): c is BirthChart => Boolean(c && !Number.isNaN(c.birthDateTime.getTime())))
  } catch (error) {
    console.error('Error loading birth charts:', error)
    return []
  }
}

export function deleteBirthChart(index: number) {
  const charts = getBirthCharts()
  charts.splice(index, 1)
  localStorage.setItem('birthCharts', JSON.stringify(charts))
}

export { SIGNS, SIGN_SANSKRIT, PLANETS, NAKSHATRAS }
