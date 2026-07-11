/** 27 nakshatras in order — shared for Kundli, Chandrashtama, profile picker */
export const NAKSHATRA_LIST = [
  { name: 'Ashwini', tamil: 'அசுவினி' },
  { name: 'Bharani', tamil: 'பரணி' },
  { name: 'Krittika', tamil: 'கார்த்திகை' },
  { name: 'Rohini', tamil: 'ரோகிணி' },
  { name: 'Mrigashira', tamil: 'மிருகசீரிடம்' },
  { name: 'Ardra', tamil: 'திருவாதிரை' },
  { name: 'Punarvasu', tamil: 'புனர்பூசம்' },
  { name: 'Pushya', tamil: 'பூசம்' },
  { name: 'Ashlesha', tamil: 'ஆயில்யம்' },
  { name: 'Magha', tamil: 'மகம்' },
  { name: 'Purva Phalguni', tamil: 'பூரம்' },
  { name: 'Uttara Phalguni', tamil: 'உத்திரம்' },
  { name: 'Hasta', tamil: 'ஹஸ்தம்' },
  { name: 'Chitra', tamil: 'சித்திரை' },
  { name: 'Swati', tamil: 'சுவாதி' },
  { name: 'Vishakha', tamil: 'விசாகம்' },
  { name: 'Anuradha', tamil: 'அனுஷம்' },
  { name: 'Jyeshtha', tamil: 'கேட்டை' },
  { name: 'Mula', tamil: 'மூலம்' },
  { name: 'Purva Ashadha', tamil: 'பூராடம்' },
  { name: 'Uttara Ashadha', tamil: 'உத்திராடம்' },
  { name: 'Shravana', tamil: 'திருவோணம்' },
  { name: 'Dhanishta', tamil: 'அவிட்டம்' },
  { name: 'Shatabhisha', tamil: 'சதயம்' },
  { name: 'Purva Bhadrapada', tamil: 'பூரட்டாதி' },
  { name: 'Uttara Bhadrapada', tamil: 'உத்திரட்டாதி' },
  { name: 'Revati', tamil: 'ரேவதி' },
] as const

/** Moon rasi (birth rasi) for each nakshatra — TN panchang style */
const NAKSHATRA_MOON_RASI: Record<string, { roman: string; tamil: string; symbol: string }> = {
  Ashwini: { roman: 'Mesham', tamil: 'மேஷம்', symbol: '♈' },
  Bharani: { roman: 'Mesham', tamil: 'மேஷம்', symbol: '♈' },
  Krittika: { roman: 'Mesham', tamil: 'மேஷம்', symbol: '♈' },
  Rohini: { roman: 'Rishabam', tamil: 'ரிஷபம்', symbol: '♉' },
  Mrigashira: { roman: 'Rishabam', tamil: 'ரிஷபம்', symbol: '♉' },
  Ardra: { roman: 'Mithunam', tamil: 'மிதுனம்', symbol: '♊' },
  Punarvasu: { roman: 'Mithunam', tamil: 'மிதுனம்', symbol: '♊' },
  Pushya: { roman: 'Kadagam', tamil: 'கடகம்', symbol: '♋' },
  Ashlesha: { roman: 'Kadagam', tamil: 'கடகம்', symbol: '♋' },
  Magha: { roman: 'Simham', tamil: 'சிம்மம்', symbol: '♌' },
  'Purva Phalguni': { roman: 'Simham', tamil: 'சிம்மம்', symbol: '♌' },
  'Uttara Phalguni': { roman: 'Kanni', tamil: 'கன்னி', symbol: '♍' },
  Hasta: { roman: 'Kanni', tamil: 'கன்னி', symbol: '♍' },
  Chitra: { roman: 'Kanni', tamil: 'கன்னி', symbol: '♍' },
  Swati: { roman: 'Thulam', tamil: 'துலாம்', symbol: '♎' },
  Vishakha: { roman: 'Thulam', tamil: 'துலாம்', symbol: '♎' },
  Anuradha: { roman: 'Vrichigam', tamil: 'விருச்சிகம்', symbol: '♏' },
  Jyeshtha: { roman: 'Vrichigam', tamil: 'விருச்சிகம்', symbol: '♏' },
  Mula: { roman: 'Dhanusu', tamil: 'தனுசு', symbol: '♐' },
  'Purva Ashadha': { roman: 'Dhanusu', tamil: 'தனுசு', symbol: '♐' },
  'Uttara Ashadha': { roman: 'Dhanusu', tamil: 'தனுசு', symbol: '♐' },
  Shravana: { roman: 'Makaram', tamil: 'மகரம்', symbol: '♑' },
  Dhanishta: { roman: 'Makaram', tamil: 'மகரம்', symbol: '♑' },
  Shatabhisha: { roman: 'Kumbham', tamil: 'கும்பம்', symbol: '♒' },
  'Purva Bhadrapada': { roman: 'Kumbham', tamil: 'கும்பம்', symbol: '♒' },
  'Uttara Bhadrapada': { roman: 'Meenam', tamil: 'மீனம்', symbol: '♓' },
  Revati: { roman: 'Meenam', tamil: 'மீனம்', symbol: '♓' },
}

export function nakshatraIndex(name: string): number {
  const normalized = name.trim()
  const idx = NAKSHATRA_LIST.findIndex((n) => n.name.toLowerCase() === normalized.toLowerCase())
  return idx >= 0 ? idx : -1
}

export function moonRasiForNakshatra(nakshatra: string) {
  return NAKSHATRA_MOON_RASI[nakshatra] ?? { roman: '—', tamil: '—', symbol: '☽' }
}

/** Chandrashtama — Moon in the 8th nakshatra from birth star */
export function chandrashtamaNakshatra(birthNakshatra: string): string | null {
  const idx = nakshatraIndex(birthNakshatra)
  if (idx < 0) return null
  return NAKSHATRA_LIST[(idx + 7) % 27].name
}

/** Birth nakshatra affected when Moon transits the given nakshatra */
export function birthNakshatraForChandrashtamaMoon(moonNakshatra: string): (typeof NAKSHATRA_LIST)[number] | null {
  const moonIdx = nakshatraIndex(moonNakshatra)
  if (moonIdx < 0) return null
  return NAKSHATRA_LIST[(moonIdx - 7 + 27) % 27]
}

export interface ChandrashtamaSlot {
  birthNakshatra: string
  birthNakshatraTamil: string
  rasiRoman: string
  rasiTamil: string
  rasiSymbol: string
  startAt: Date
  endAt: Date
}

export function buildChandrashtamaSlots(
  nakshatraPeriods: Array<{ name: string; startAt?: Date; endAt?: Date }>
): ChandrashtamaSlot[] {
  return nakshatraPeriods
    .filter((p) => p.startAt && p.endAt)
    .map((period) => {
      const birth = birthNakshatraForChandrashtamaMoon(period.name)
      const rasi = moonRasiForNakshatra(birth?.name ?? '')
      return {
        birthNakshatra: birth?.name ?? '—',
        birthNakshatraTamil: birth?.tamil ?? '',
        rasiRoman: rasi.roman,
        rasiTamil: rasi.tamil,
        rasiSymbol: rasi.symbol,
        startAt: period.startAt!,
        endAt: period.endAt!,
      }
    })
}

export function resolveChandrashtamaNow(
  slots: ChandrashtamaSlot[],
  at: Date
): { active: ChandrashtamaSlot | null; next: ChandrashtamaSlot | null } {
  if (!slots.length) return { active: null, next: null }

  let active: ChandrashtamaSlot | null = null
  let next: ChandrashtamaSlot | null = null

  for (const slot of slots) {
    if (at >= slot.startAt && at < slot.endAt) active = slot
    if (at < slot.startAt && !next) next = slot
  }

  if (!active && !next) {
    active = slots[slots.length - 1]
  } else if (!active && next) {
    active = slots[0]
    next = slots[1] ?? null
  } else if (active && !next) {
    const activeIdx = slots.findIndex((s) => s === active)
    next = activeIdx >= 0 ? slots[activeIdx + 1] ?? null : null
  }

  return { active, next }
}

export function formatChandrashtamaDateTime(d: Date): string {
  return d
    .toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase()
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '0m 0s'
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}h ${m}m ${s}s`
  return `${m}m ${s}s`
}
