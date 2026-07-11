import { MhahPanchang } from 'mhah-panchang'

const engine = new MhahPanchang()

/** Varjyam start offset (hours) for a 24-hour nakshatra cycle — standard panchangam table */
const VARJYAM_X_HOURS: Record<string, number[]> = {
  Ashwini: [20],
  Bharani: [9.6],
  Dwija: [9.6],
  Krittika: [12],
  Rohini: [16],
  Mrigashira: [5.6],
  Mrigashirsha: [5.6],
  Ardra: [8.4],
  Punarvasu: [12],
  Pushya: [8],
  Ashlesha: [12.8],
  Magha: [12],
  'Purva Phalguni': [8],
  'Uttara Phalguni': [7.2],
  Hasta: [8.4],
  Chitra: [8],
  Swati: [5.6],
  Vishakha: [5.6],
  Anuradha: [4],
  Jyeshtha: [5.6],
  Mula: [8, 22.4],
  'Purva Ashadha': [9.6],
  'Uttara Ashadha': [8],
  Shravana: [4],
  Sravana: [4],
  Dhanishta: [4],
  Shatabhisha: [7.2],
  'Purva Bhadrapada': [6.4],
  'Uttara Bhadrapada': [9.6],
  Revati: [12],
  Rebati: [12],
}

const NAKSHATRA_ALIASES: Record<string, string> = {
  Dwija: 'Bharani',
  Rebati: 'Revati',
  Mrigashirsha: 'Mrigashira',
  Sravana: 'Shravana',
}

export interface VarjyamWindow {
  nakshatra: string
  start: Date
  end: Date
}

function normalizeNakshatra(raw: string): string {
  const trimmed = raw.trim()
  return NAKSHATRA_ALIASES[trimmed] ?? trimmed
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

function buildNakshatraSpans(sunrise: Date, nextSunrise: Date): Array<{ name: string; start: Date; end: Date }> {
  const spans: Array<{ name: string; start: Date; end: Date }> = []
  let cursor = new Date(sunrise)

  while (cursor < nextSunrise) {
    const calc = engine.calculate(cursor)
    const raw = calc.Nakshatra?.name_en_IN ?? ''
    const name = normalizeNakshatra(raw)
    const end = calc.Nakshatra?.end instanceof Date ? calc.Nakshatra.end : null
    if (!name || !end) break

    const periodEnd = end < nextSunrise ? end : nextSunrise
    spans.push({ name, start: new Date(cursor), end: periodEnd })

    if (end >= nextSunrise) break
    cursor = new Date(end.getTime() + 60_000)
  }

  return spans
}

/**
 * Varjyam (வர்ஜ்யம்) — inauspicious nakshatra window(s) for the day.
 * Formula: start = nakshatraStart + (X × duration / 24), duration = duration / 15.
 */
export function computeVarjyam(sunrise: Date, nextSunrise: Date): VarjyamWindow[] {
  const windows: VarjyamWindow[] = []
  const spans = buildNakshatraSpans(sunrise, nextSunrise)

  for (const span of spans) {
    const xValues = VARJYAM_X_HOURS[span.name]
    if (!xValues?.length) continue

    const durationMs = span.end.getTime() - span.start.getTime()
    const durationHours = durationMs / (60 * 60 * 1000)
    const varjyamDurationMs = durationMs / 15

    for (const x of xValues) {
      const offsetMs = (x * durationHours / 24) * 60 * 60 * 1000
      const start = new Date(span.start.getTime() + offsetMs)
      const end = new Date(start.getTime() + varjyamDurationMs)

      if (end <= sunrise || start >= nextSunrise) continue
      const clippedStart = start < sunrise ? sunrise : start
      const clippedEnd = end > nextSunrise ? nextSunrise : end
      if (clippedStart >= clippedEnd) continue

      windows.push({ nakshatra: span.name, start: clippedStart, end: clippedEnd })
    }
  }

  return windows.sort((a, b) => a.start.getTime() - b.start.getTime())
}

export function formatVarjyamRange(start: Date, end: Date, dayAnchor: Date): string {
  const sameDayStart =
    start.getFullYear() === dayAnchor.getFullYear() &&
    start.getMonth() === dayAnchor.getMonth() &&
    start.getDate() === dayAnchor.getDate()
  const startStr = sameDayStart
    ? formatTime(start)
    : `${formatTime(start)}, ${start.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}`
  return `${startStr} – ${formatEndTime(end, dayAnchor)}`
}
