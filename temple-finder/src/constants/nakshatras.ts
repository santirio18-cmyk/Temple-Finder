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

export function nakshatraIndex(name: string): number {
  const normalized = name.trim()
  const idx = NAKSHATRA_LIST.findIndex((n) => n.name.toLowerCase() === normalized.toLowerCase())
  return idx >= 0 ? idx : -1
}

/** Chandrashtama — Moon in the 8th nakshatra from birth star */
export function chandrashtamaNakshatra(birthNakshatra: string): string | null {
  const idx = nakshatraIndex(birthNakshatra)
  if (idx < 0) return null
  return NAKSHATRA_LIST[(idx + 7) % 27].name
}

/** Birth nakshatra affected when Moon transits the given nakshatra today */
export function birthNakshatraForChandrashtamaMoon(moonNakshatra: string): (typeof NAKSHATRA_LIST)[number] | null {
  const moonIdx = nakshatraIndex(moonNakshatra)
  if (moonIdx < 0) return null
  return NAKSHATRA_LIST[(moonIdx - 7 + 27) % 27]
}

export interface ChandrashtamaPeriod {
  moonNakshatra: string
  moonNakshatraTamil?: string
  until: string
  birthNakshatra: string
  birthNakshatraTamil: string
}

export function getChandrashtamaPeriods(
  nakshatraPeriods: Array<{ name: string; tamil?: string; end: string }>
): ChandrashtamaPeriod[] {
  return nakshatraPeriods.map((period) => {
    const birth = birthNakshatraForChandrashtamaMoon(period.name)
    return {
      moonNakshatra: period.name,
      moonNakshatraTamil: period.tamil,
      until: period.end,
      birthNakshatra: birth?.name ?? '—',
      birthNakshatraTamil: birth?.tamil ?? '',
    }
  })
}
