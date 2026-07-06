/** Tamil Gowri Panchangam — 8 periods from sunrise→sunset (day) and sunset→next sunrise (night). */

export interface GowriPeriod {
  name: string
  tamil: string
  time: string
  auspicious: boolean
  spansNextDay?: boolean
}

export interface NallaNeramSummary {
  morning: string
  evening: string
  gowriDay: string
  gowriNight: string
}

export interface GowriPanchangam {
  day: GowriPeriod[]
  night: GowriPeriod[]
  nallaNeram: NallaNeramSummary
}

const GOWRI_CYCLE = [
  { name: 'Rogam', tamil: 'ரோகம்', auspicious: false },
  { name: 'Labam', tamil: 'லாபம்', auspicious: true },
  { name: 'Dhanam', tamil: 'தனம்', auspicious: true },
  { name: 'Sugam', tamil: 'சுகம்', auspicious: true },
  { name: 'Soram', tamil: 'சோரம்', auspicious: false },
  { name: 'Uthi', tamil: 'உத்தி', auspicious: true },
  { name: 'Visham', tamil: 'விஷம்', auspicious: false },
  { name: 'Amridha', tamil: 'அமிர்தம்', auspicious: true },
] as const

/** Day Gowri starting index by weekday (Sun=0 … Sat=6). */
const DAY_GOWRI_START: number[] = [5, 7, 0, 1, 2, 3, 4]

/** Night Gowri starting index by weekday. */
const NIGHT_GOWRI_START: number[] = [2, 3, 4, 0, 1, 6, 5]

function formatGowriTime(d: Date): string {
  const h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const hour12 = h % 12 || 12
  const ampm = h < 12 ? 'am' : 'pm'
  return `${hour12}:${m} ${ampm}`
}

function formatGowriRange(start: Date, end: Date, spansNextDay = false): string {
  const suffix = spansNextDay ? ' *' : ''
  return `${formatGowriTime(start)} - ${formatGowriTime(end)}${suffix}`
}

function buildGowriPeriods(
  periodStart: Date,
  periodEnd: Date,
  startIndex: number,
  night = false
): GowriPeriod[] {
  const ms = periodEnd.getTime() - periodStart.getTime()
  const slot = ms / 8

  return Array.from({ length: 8 }, (_, i) => {
    const start = new Date(periodStart.getTime() + i * slot)
    const end = new Date(periodStart.getTime() + (i + 1) * slot)
    const gowri = GOWRI_CYCLE[(startIndex + i) % 8]
    const spansNextDay = night && end.getDate() !== periodStart.getDate()

    return {
      name: gowri.name,
      tamil: gowri.tamil,
      time: formatGowriRange(start, end, spansNextDay),
      auspicious: gowri.auspicious,
      spansNextDay,
    }
  })
}

function centerHourRange(start: Date, end: Date): { start: Date; end: Date } {
  const mid = (start.getTime() + end.getTime()) / 2
  return {
    start: new Date(mid - 30 * 60 * 1000),
    end: new Date(mid + 30 * 60 * 1000),
  }
}

function periodBounds(
  periodStart: Date,
  periodEnd: Date,
  slotIndex: number
): { start: Date; end: Date } {
  const ms = periodEnd.getTime() - periodStart.getTime()
  const slot = ms / 8
  return {
    start: new Date(periodStart.getTime() + slotIndex * slot),
    end: new Date(periodStart.getTime() + (slotIndex + 1) * slot),
  }
}

function pickNallaNeram(
  dayPeriods: GowriPeriod[],
  nightPeriods: GowriPeriod[],
  sunrise: Date,
  sunset: Date
): NallaNeramSummary {
  const nextSunrise = new Date(sunrise.getTime() + 24 * 60 * 60 * 1000)

  const dayAuspiciousSlots = dayPeriods
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.auspicious)

  const nightAuspiciousSlots = nightPeriods
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.auspicious)

  const morningSlot = dayAuspiciousSlots[0]
  const eveningSlot = dayAuspiciousSlots[dayAuspiciousSlots.length - 1]

  const afternoonSlot =
    dayAuspiciousSlots.find(({ i }) => {
      const { start } = periodBounds(sunrise, sunset, i)
      return start.getHours() >= 12
    }) ?? dayAuspiciousSlots[Math.min(2, dayAuspiciousSlots.length - 1)]

  const nightSlot = nightAuspiciousSlots[0]

  const bounds = (from: Date, to: Date, i: number) => {
    const b = periodBounds(from, to, i)
    return centerHourRange(b.start, b.end)
  }

  const morning = morningSlot ? bounds(sunrise, sunset, morningSlot.i) : null
  const evening = eveningSlot ? bounds(sunrise, sunset, eveningSlot.i) : null
  const gowriDay = afternoonSlot ? bounds(sunrise, sunset, afternoonSlot.i) : null
  const gowriNight = nightSlot ? bounds(sunset, nextSunrise, nightSlot.i) : null

  const fallback = '—'
  return {
    morning: morning ? formatGowriRange(morning.start, morning.end) : fallback,
    evening: evening ? formatGowriRange(evening.start, evening.end) : fallback,
    gowriDay: gowriDay ? formatGowriRange(gowriDay.start, gowriDay.end) : fallback,
    gowriNight: gowriNight ? formatGowriRange(gowriNight.start, gowriNight.end) : fallback,
  }
}

export function computeGowriPanchangam(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekday: number
): GowriPanchangam {
  const day = buildGowriPeriods(sunrise, sunset, DAY_GOWRI_START[weekday])
  const night = buildGowriPeriods(sunset, nextSunrise, NIGHT_GOWRI_START[weekday], true)
  const nallaNeram = pickNallaNeram(day, night, sunrise, sunset)

  return { day, night, nallaNeram }
}
