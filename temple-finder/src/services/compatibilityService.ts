import { MhahPanchang } from 'mhah-panchang'

const engine = new MhahPanchang()

export interface PersonDetails {
  date: string // YYYY-MM-DD
  time: string // HH:mm
  place: string
  latitude?: number
  longitude?: number
}

export interface AstroProfile {
  moonSign: string // Rasi
  moonSignNumber: number // 1-12
  nakshatra: string
  nakshatraNumber: number // 1-27
  pada: number // 1-4
}

export interface GunaScore {
  name: string
  score: number
  max: number
  description: string
}

export interface CompatibilityResult {
  male: AstroProfile
  female: AstroProfile
  gunas: GunaScore[]
  totalScore: number
  maxScore: number
  percentage: number
  recommendation: string
  source: string
}

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
]

// Nakshatra Lord mapping for Gana
const NAKSHATRA_GANA: Record<number, string> = {
  1: 'Deva', 2: 'Manushya', 3: 'Rakshasa', 4: 'Manushya', 5: 'Deva', 6: 'Manushya',
  7: 'Deva', 8: 'Rakshasa', 9: 'Rakshasa', 10: 'Rakshasa', 11: 'Manushya', 12: 'Manushya',
  13: 'Deva', 14: 'Rakshasa', 15: 'Deva', 16: 'Rakshasa', 17: 'Manushya', 18: 'Rakshasa',
  19: 'Rakshasa', 20: 'Manushya', 21: 'Manushya', 22: 'Deva', 23: 'Rakshasa', 24: 'Rakshasa',
  25: 'Manushya', 26: 'Manushya', 27: 'Deva'
}

// Nakshatra to Nadi mapping
const NAKSHATRA_NADI: Record<number, string> = {
  1: 'Adi', 2: 'Madhya', 3: 'Antya', 4: 'Adi', 5: 'Madhya', 6: 'Antya',
  7: 'Adi', 8: 'Madhya', 9: 'Antya', 10: 'Adi', 11: 'Madhya', 12: 'Antya',
  13: 'Adi', 14: 'Madhya', 15: 'Antya', 16: 'Adi', 17: 'Madhya', 18: 'Antya',
  19: 'Adi', 20: 'Madhya', 21: 'Antya', 22: 'Adi', 23: 'Madhya', 24: 'Antya',
  25: 'Adi', 26: 'Madhya', 27: 'Antya'
}

// Yoni (Animal nature) for each Nakshatra
const NAKSHATRA_YONI: Record<number, string> = {
  1: 'Horse', 2: 'Elephant', 3: 'Goat', 4: 'Serpent', 5: 'Dog', 6: 'Cat',
  7: 'Rat', 8: 'Buffalo', 9: 'Cat', 10: 'Rat', 11: 'Rat', 12: 'Cow',
  13: 'Buffalo', 14: 'Tiger', 15: 'Buffalo', 16: 'Tiger', 17: 'Deer',
  18: 'Deer', 19: 'Dog', 20: 'Horse', 21: 'Mongoose', 22: 'Monkey',
  23: 'Lion', 24: 'Horse', 25: 'Lion', 26: 'Cow', 27: 'Elephant'
}

function normalizeNakshatra(name: string): string {
  const aliases: Record<string, string> = {
    'Dwija': 'Bharani',
    'Rebati': 'Revati',
    'Mrigashirsha': 'Mrigashira',
    'Sravana': 'Shravana'
  }
  return aliases[name] || name
}

function getAstroProfile(details: PersonDetails): AstroProfile {
  const { date, time } = details
  const [hours, minutes] = time.split(':').map(Number)
  
  const birthDate = new Date(date)
  birthDate.setHours(hours, minutes, 0, 0)
  
  // Note: MhahPanchang calculate() uses date/time for calculations
  // Location affects rising sign (Lagna) but Moon sign is primarily time-based
  const calc = engine.calculate(birthDate)
  
  // Get Moon Sign (Rasi) from calculation - more accurate with location
  const moonSignName = (calc.Raasi?.name_en_UK as string) || 'Aries'
  const moonSignNumber = SIGNS.indexOf(moonSignName.trim()) + 1 || 1
  
  // Get Nakshatra - uses actual planetary positions
  const nakshatraRaw = normalizeNakshatra((calc.Nakshatra?.name_en_IN as string) || 'Ashwini')
  const nakshatraNumber = NAKSHATRAS.indexOf(nakshatraRaw) + 1 || 1
  
  // Calculate Pada - quarter within Nakshatra
  const nakStart = calc.Nakshatra?.start instanceof Date ? calc.Nakshatra.start : birthDate
  const nakEnd = calc.Nakshatra?.end instanceof Date ? calc.Nakshatra.end : birthDate
  const span = Math.max(1, nakEnd.getTime() - nakStart.getTime())
  const progress = Math.min(1, Math.max(0, (birthDate.getTime() - nakStart.getTime()) / span))
  const pada = Math.min(4, Math.max(1, Math.floor(progress * 4) + 1))
  
  return {
    moonSign: moonSignName,
    moonSignNumber,
    nakshatra: nakshatraRaw,
    nakshatraNumber,
    pada
  }
}

// 1. Varna (Caste/Status) - 1 point
function calculateVarna(male: AstroProfile, female: AstroProfile): number {
  const varnaMap: Record<number, number> = {
    1: 1, 2: 4, 3: 3, 4: 4, 5: 1, 6: 4, 7: 3, 8: 2, 9: 1, 10: 4, 11: 3, 12: 4
  }
  
  const maleVarna = varnaMap[male.moonSignNumber] || 1
  const femaleVarna = varnaMap[female.moonSignNumber] || 1
  
  return maleVarna >= femaleVarna ? 1 : 0
}

// 2. Vashya (Dominance/Control) - 2 points
function calculateVashya(male: AstroProfile, female: AstroProfile): number {
  const vashyaGroups: Record<number, number[]> = {
    1: [1, 5, 7, 9], // Aries
    2: [2, 6, 10], // Taurus
    3: [3, 6, 11], // Gemini
    4: [4, 8, 12], // Cancer
    5: [1, 5, 7, 9], // Leo
    6: [2, 6, 10], // Virgo
    7: [1, 5, 7, 9], // Libra
    8: [4, 8, 12], // Scorpio
    9: [1, 5, 7, 9], // Sagittarius
    10: [2, 6, 10], // Capricorn
    11: [3, 6, 11], // Aquarius
    12: [4, 8, 12] // Pisces
  }
  
  const maleGroup = vashyaGroups[male.moonSignNumber] || []
  const femaleGroup = vashyaGroups[female.moonSignNumber] || []
  
  if (maleGroup.includes(female.moonSignNumber) || femaleGroup.includes(male.moonSignNumber)) {
    return 2
  }
  if (male.moonSignNumber === female.moonSignNumber) {
    return 1
  }
  return 0
}

// 3. Tara (Birth Star) - 3 points
function calculateTara(male: AstroProfile, female: AstroProfile): number {
  // Count from male's nakshatra to female's nakshatra
  const count = ((female.nakshatraNumber - male.nakshatraNumber + 27) % 27)
  const tara = (count % 9) + 1
  
  // Janma (1), Sampat (2), Vipat (3), Kshema (4), Pratyak (5), Sadhana (6), Naidhana (7), Mitra (8), Parama Mitra (9)
  // Favorable: 1, 3, 5, 7 give full points
  if ([1, 3, 5, 7].includes(tara)) return 3
  // Neutral: 2, 4, 6, 8 give partial
  if ([2, 4, 6, 8].includes(tara)) return 1.5
  // Unfavorable: 9 (Parama Mitra is actually favorable but calculated differently)
  if (tara === 9) return 3
  return 0
}

// 4. Yoni (Nature/Sexual compatibility) - 4 points
function calculateYoni(male: AstroProfile, female: AstroProfile): number {
  const maleYoni = NAKSHATRA_YONI[male.nakshatraNumber]
  const femaleYoni = NAKSHATRA_YONI[female.nakshatraNumber]
  
  // Same yoni = perfect compatibility
  if (maleYoni === femaleYoni) return 4
  
  // Natural enemies based on traditional Vedic astrology
  const enemies: Record<string, string[]> = {
    'Horse': ['Buffalo', 'Monkey'],
    'Buffalo': ['Horse', 'Tiger'],
    'Cat': ['Rat', 'Dog'],
    'Rat': ['Cat', 'Serpent'],
    'Dog': ['Cat', 'Deer'],
    'Deer': ['Dog', 'Lion'],
    'Serpent': ['Rat', 'Mongoose'],
    'Mongoose': ['Serpent'],
    'Tiger': ['Buffalo', 'Cow'],
    'Cow': ['Tiger'],
    'Lion': ['Deer', 'Elephant'],
    'Elephant': ['Lion'],
    'Monkey': ['Horse']
  }
  
  // Enemy yoni = no points
  if (enemies[maleYoni]?.includes(femaleYoni)) return 0
  
  // Friendly yoni = full points
  const friends: Record<string, string[]> = {
    'Horse': ['Horse', 'Elephant'],
    'Elephant': ['Horse', 'Goat'],
    'Goat': ['Elephant', 'Cow'],
    'Cow': ['Goat', 'Buffalo'],
    'Serpent': ['Cat'],
    'Rat': ['Buffalo'],
    'Buffalo': ['Rat', 'Cow']
  }
  
  if (friends[maleYoni]?.includes(femaleYoni)) return 4
  
  // Neutral = 2 points
  return 2
}

// 5. Graha Maitri (Planetary friendship) - 5 points
function calculateGrahaMaitri(male: AstroProfile, female: AstroProfile): number {
  // Sign lords according to Vedic astrology
  const lordMap: Record<number, string> = {
    1: 'Mars', 2: 'Venus', 3: 'Mercury', 4: 'Moon', 5: 'Sun', 6: 'Mercury',
    7: 'Venus', 8: 'Mars', 9: 'Jupiter', 10: 'Saturn', 11: 'Saturn', 12: 'Jupiter'
  }
  
  const maleLord = lordMap[male.moonSignNumber]
  const femaleLord = lordMap[female.moonSignNumber]
  
  // Same lord = excellent compatibility
  if (maleLord === femaleLord) return 5
  
  // Natural friendship based on classical texts (Brihat Parashara Hora Shastra)
  const friends: Record<string, string[]> = {
    'Sun': ['Moon', 'Mars', 'Jupiter'],
    'Moon': ['Sun', 'Mercury'],
    'Mars': ['Sun', 'Moon', 'Jupiter'],
    'Mercury': ['Sun', 'Venus'],
    'Jupiter': ['Sun', 'Moon', 'Mars'],
    'Venus': ['Mercury', 'Saturn'],
    'Saturn': ['Mercury', 'Venus']
  }
  
  // Check if both are friends with each other (mutual friendship)
  const maleFriendly = friends[maleLord]?.includes(femaleLord)
  const femaleFriendly = friends[femaleLord]?.includes(maleLord)
  
  // Both are mutual friends = 5 points
  if (maleFriendly && femaleFriendly) return 5
  
  // One-way friendship = 4 points
  if (maleFriendly || femaleFriendly) return 4
  
  // Natural enemies
  const enemies: Record<string, string[]> = {
    'Sun': ['Venus', 'Saturn'],
    'Moon': [],
    'Mars': ['Mercury'],
    'Mercury': [],
    'Jupiter': ['Mercury', 'Venus'],
    'Venus': ['Sun', 'Moon'],
    'Saturn': ['Sun', 'Moon', 'Mars']
  }
  
  const isEnemy = enemies[maleLord]?.includes(femaleLord) || enemies[femaleLord]?.includes(maleLord)
  
  if (isEnemy) return 0
  
  // Neutral = 3 points
  return 3
}

// 6. Gana (Temperament) - 6 points
function calculateGana(male: AstroProfile, female: AstroProfile): number {
  const maleGana = NAKSHATRA_GANA[male.nakshatraNumber]
  const femaleGana = NAKSHATRA_GANA[female.nakshatraNumber]
  
  if (maleGana === femaleGana) return 6
  
  if ((maleGana === 'Deva' && femaleGana === 'Manushya') ||
      (maleGana === 'Manushya' && femaleGana === 'Deva')) return 5
  
  if ((maleGana === 'Manushya' && femaleGana === 'Rakshasa') ||
      (maleGana === 'Rakshasa' && femaleGana === 'Manushya')) return 1
  
  return 0
}

// 7. Bhakoot (Rashi/Sign) - 7 points
function calculateBhakoot(male: AstroProfile, female: AstroProfile): number {
  const maleSign = male.moonSignNumber
  const femaleSign = female.moonSignNumber
  
  // Same sign = good but not full points (lack of variety)
  if (maleSign === femaleSign) return 5
  
  // Calculate position: female sign counted from male sign
  const position = ((femaleSign - maleSign + 12) % 12) || 12
  
  // Inauspicious positions (2nd, 12th, 5th, 9th from each other)
  // 2-12 (Dwi-Dwadasha): health issues
  // 5-9 (Pancha-Navama): loss of children
  // 6-8 (Shashtha-Ashtama): financial troubles
  
  if (position === 2 || position === 12) return 0 // 2-12 position
  if (position === 5 || position === 9) return 0  // 5-9 position  
  if (position === 6 || position === 8) return 0  // 6-8 position
  
  // All other positions are favorable
  return 7
}

// 8. Nadi (Health/Genes) - 8 points
function calculateNadi(male: AstroProfile, female: AstroProfile): number {
  const maleNadi = NAKSHATRA_NADI[male.nakshatraNumber]
  const femaleNadi = NAKSHATRA_NADI[female.nakshatraNumber]
  
  if (maleNadi === femaleNadi) return 0 // Same Nadi is inauspicious
  
  return 8
}

export function calculateCompatibility(male: PersonDetails, female: PersonDetails): CompatibilityResult {
  const maleProfile = getAstroProfile(male)
  const femaleProfile = getAstroProfile(female)
  
  const gunas: GunaScore[] = [
    {
      name: 'Varna (Status)',
      score: calculateVarna(maleProfile, femaleProfile),
      max: 1,
      description: 'Compatibility of spiritual and ego levels'
    },
    {
      name: 'Vashya (Dominance)',
      score: calculateVashya(maleProfile, femaleProfile),
      max: 2,
      description: 'Mutual attraction and control in relationship'
    },
    {
      name: 'Tara (Birth Star)',
      score: Math.round(calculateTara(maleProfile, femaleProfile)),
      max: 3,
      description: 'Birth star compatibility and destiny'
    },
    {
      name: 'Yoni (Nature)',
      score: calculateYoni(maleProfile, femaleProfile),
      max: 4,
      description: 'Sexual compatibility and physical intimacy'
    },
    {
      name: 'Graha Maitri (Friendship)',
      score: Math.round(calculateGrahaMaitri(maleProfile, femaleProfile)),
      max: 5,
      description: 'Mental compatibility and friendship'
    },
    {
      name: 'Gana (Temperament)',
      score: calculateGana(maleProfile, femaleProfile),
      max: 6,
      description: 'Temperament and behavior compatibility'
    },
    {
      name: 'Bhakoot (Love)',
      score: calculateBhakoot(maleProfile, femaleProfile),
      max: 7,
      description: 'Love, affection and prosperity'
    },
    {
      name: 'Nadi (Health)',
      score: calculateNadi(maleProfile, femaleProfile),
      max: 8,
      description: 'Health, genes and progeny'
    }
  ]
  
  const totalScore = gunas.reduce((sum, g) => sum + g.score, 0)
  const maxScore = 36
  const percentage = Math.round((totalScore / maxScore) * 100)
  
  let recommendation: string
  if (totalScore >= 28) {
    recommendation = 'Excellent Match'
  } else if (totalScore >= 24) {
    recommendation = 'Very Good Match'
  } else if (totalScore >= 18) {
    recommendation = 'Good Match'
  } else if (totalScore >= 12) {
    recommendation = 'Average Match'
  } else {
    recommendation = 'Not Recommended'
  }
  
  return {
    male: maleProfile,
    female: femaleProfile,
    gunas,
    totalScore,
    maxScore,
    percentage,
    recommendation,
    source: 'Vedic Astrology - Ashtakoot Guna Milan using MhahPanchang'
  }
}
