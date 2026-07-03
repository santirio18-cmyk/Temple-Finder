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

export function calculateBirthChart(details: BirthDetails): BirthChart {
  const { dateOfBirth, timeOfBirth, longitude, name, locationName } = details
  
  // Combine date and time
  const [hours, minutes] = timeOfBirth.split(':').map(Number)
  const birthDateTime = new Date(dateOfBirth)
  birthDateTime.setHours(hours, minutes, 0, 0)
  
  // Calculate panchang at birth time
  const calc = engine.calculate(birthDateTime)
  
  // Get planetary positions from Raasi (zodiac) data
  // mhah-panchang provides zodiac positions in Raasi field
  const moonLon = (calc.Raasi?.number ?? 1) * 30 - 15 // Approximate center of sign
  const sunLon = moonLon + 180 // Simplified: Sun is opposite Moon (approximate)
  
  // Calculate Ascendant (simplified - using sunrise method)
  // In real Vedic astrology, this requires more complex calculations
  const localSiderealTime = (birthDateTime.getTime() / 3600000 + longitude / 15) % 24
  const ascendantLon = (localSiderealTime * 15) % 360
  const ascendant = getLongitudeToSign(ascendantLon)
  
  // Get Moon's Nakshatra for Dasha calculation
  const moonNakshatra = getLongitudeToNakshatra(moonLon)
  const moonSign = getLongitudeToSign(moonLon)
  const sunSign = getLongitudeToSign(sunLon)
  
  // Calculate houses (Equal house system - each house is 30 degrees from Ascendant)
  const houses: { [key: number]: string } = {}
  for (let i = 1; i <= 12; i++) {
    const houseLon = (ascendantLon + (i - 1) * 30) % 360
    const houseSign = getLongitudeToSign(houseLon)
    houses[i] = houseSign.sign
  }
  
  // Simplified planetary positions (using Sun and Moon, approximating others)
  const planets: Planet[] = [
    {
      name: 'Sun',
      sign: sunSign.sign,
      signNumber: sunSign.signNumber,
      house: Math.floor(((sunLon - ascendantLon + 360) % 360) / 30) + 1,
      degree: sunSign.degree,
      retrograde: false,
      nakshatra: getLongitudeToNakshatra(sunLon).name,
      pada: getLongitudeToNakshatra(sunLon).pada
    },
    {
      name: 'Moon',
      sign: moonSign.sign,
      signNumber: moonSign.signNumber,
      house: Math.floor(((moonLon - ascendantLon + 360) % 360) / 30) + 1,
      degree: moonSign.degree,
      retrograde: false,
      nakshatra: moonNakshatra.name,
      pada: moonNakshatra.pada
    }
  ]
  
  // Calculate Vimshottari Dasha
  const moonDegreeInNakshatra = moonLon % 13.333333333333334
  const dasha = calculateVimshottariDasha(moonNakshatra.name, moonDegreeInNakshatra, birthDateTime)
  
  return {
    name,
    birthDateTime,
    location: locationName,
    ascendant: {
      sign: ascendant.sign,
      degree: ascendant.degree
    },
    moonSign: moonSign.sign,
    sunSign: sunSign.sign,
    nakshatra: moonNakshatra,
    planets,
    houses,
    dasha
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
    // Convert date strings back to Date objects
    return charts.map((chart: any) => ({
      ...chart,
      birthDateTime: new Date(chart.birthDateTime),
      dasha: {
        ...chart.dasha,
        startDate: new Date(chart.dasha.startDate),
        endDate: new Date(chart.dasha.endDate),
        subPeriods: chart.dasha.subPeriods.map((sp: any) => ({
          ...sp,
          startDate: new Date(sp.startDate),
          endDate: new Date(sp.endDate)
        }))
      }
    }))
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
