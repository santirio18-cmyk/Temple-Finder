/**
 * Tamil names for Vedic astrology terms
 */

// 12 Rasi (Zodiac Signs) with English and Tamil names
export const RASI_NAMES = [
  { english: 'Aries', tamil: 'மேஷம்', roman: 'Mesham' },
  { english: 'Taurus', tamil: 'ரிஷபம்', roman: 'Rishabam' },
  { english: 'Gemini', tamil: 'மிதுனம்', roman: 'Mithunam' },
  { english: 'Cancer', tamil: 'கடகம்', roman: 'Kadagam' },
  { english: 'Leo', tamil: 'சிம்மம்', roman: 'Simmam' },
  { english: 'Virgo', tamil: 'கன்னி', roman: 'Kanni' },
  { english: 'Libra', tamil: 'துலாம்', roman: 'Thulam' },
  { english: 'Scorpio', tamil: 'விருச்சிகம்', roman: 'Viruchigam' },
  { english: 'Sagittarius', tamil: 'தனுசு', roman: 'Dhanusu' },
  { english: 'Capricorn', tamil: 'மகரம்', roman: 'Magaram' },
  { english: 'Aquarius', tamil: 'கும்பம்', roman: 'Kumbam' },
  { english: 'Pisces', tamil: 'மீனம்', roman: 'Meenam' }
]

// 27 Nakshatra (Birth Stars) with English and Tamil names
export const NAKSHATRA_NAMES = [
  { english: 'Ashwini', tamil: 'அஸ்வினி', roman: 'Aswini' },
  { english: 'Bharani', tamil: 'பரணி', roman: 'Bharani' },
  { english: 'Krittika', tamil: 'கார்த்திகை', roman: 'Karthigai' },
  { english: 'Rohini', tamil: 'ரோகிணி', roman: 'Rohini' },
  { english: 'Mrigashira', tamil: 'மிருகசீரிடம்', roman: 'Mrigasheeridam' },
  { english: 'Ardra', tamil: 'திருவாதிரை', roman: 'Thiruvathirai' },
  { english: 'Punarvasu', tamil: 'புனர்பூசம்', roman: 'Punarpoosam' },
  { english: 'Pushya', tamil: 'பூசம்', roman: 'Poosam' },
  { english: 'Ashlesha', tamil: 'ஆயில்யம்', roman: 'Ayilyam' },
  { english: 'Magha', tamil: 'மகம்', roman: 'Magam' },
  { english: 'Purva Phalguni', tamil: 'பூரம்', roman: 'Pooram' },
  { english: 'Uttara Phalguni', tamil: 'உத்திரம்', roman: 'Uthiram' },
  { english: 'Hasta', tamil: 'அஸ்தம்', roman: 'Astam' },
  { english: 'Chitra', tamil: 'சித்திரை', roman: 'Chittirai' },
  { english: 'Swati', tamil: 'சுவாதி', roman: 'Swathi' },
  { english: 'Vishakha', tamil: 'விசாகம்', roman: 'Visakam' },
  { english: 'Anuradha', tamil: 'அனுஷம்', roman: 'Anusham' },
  { english: 'Jyeshtha', tamil: 'கேட்டை', roman: 'Kettai' },
  { english: 'Mula', tamil: 'மூலம்', roman: 'Moolam' },
  { english: 'Purva Ashadha', tamil: 'பூராடம்', roman: 'Pooradam' },
  { english: 'Uttara Ashadha', tamil: 'உத்திராடம்', roman: 'Uthiradam' },
  { english: 'Shravana', tamil: 'திருவோணம்', roman: 'Thiruvonam' },
  { english: 'Dhanishta', tamil: 'அவிட்டம்', roman: 'Avittam' },
  { english: 'Shatabhisha', tamil: 'சதயம்', roman: 'Sathayam' },
  { english: 'Purva Bhadrapada', tamil: 'பூரட்டாதி', roman: 'Poorattathi' },
  { english: 'Uttara Bhadrapada', tamil: 'உத்திரட்டாதி', roman: 'Uthirattathi' },
  { english: 'Revati', tamil: 'ரேவதி', roman: 'Revathi' }
]

export function getRasiWithTamil(englishName: string): string {
  const rasi = RASI_NAMES.find(r => r.english.toLowerCase() === englishName.toLowerCase())
  if (!rasi) return englishName
  return `${rasi.tamil} (${rasi.roman})`
}

export function getNakshatraWithTamil(englishName: string): string {
  const nakshatra = NAKSHATRA_NAMES.find(n => n.english.toLowerCase() === englishName.toLowerCase())
  if (!nakshatra) return englishName
  return `${nakshatra.tamil} (${nakshatra.roman})`
}

export function getTamilRasi(englishName: string): string {
  const rasi = RASI_NAMES.find(r => r.english.toLowerCase() === englishName.toLowerCase())
  return rasi?.tamil || englishName
}

export function getTamilNakshatra(englishName: string): string {
  const nakshatra = NAKSHATRA_NAMES.find(n => n.english.toLowerCase() === englishName.toLowerCase())
  return nakshatra?.tamil || englishName
}

export function getRomanRasi(englishName: string): string {
  const rasi = RASI_NAMES.find(r => r.english.toLowerCase() === englishName.toLowerCase())
  return rasi?.roman || englishName
}

export function getRomanNakshatra(englishName: string): string {
  const nakshatra = NAKSHATRA_NAMES.find(n => n.english.toLowerCase() === englishName.toLowerCase())
  return nakshatra?.roman || englishName
}
