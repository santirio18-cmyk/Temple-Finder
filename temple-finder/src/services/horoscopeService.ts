import { getPanchangForDate, DEFAULT_LAT, DEFAULT_LNG } from './panchangService'

export interface ZodiacSign {
  name: string
  sanskrit: string
  symbol: string
  dateRange: string
  element: string
  rulingPlanet: string
  luckyColor: string
}

export interface DailyHoroscope {
  sign: string
  date: string
  prediction: string
  luckyNumber: number
  luckyTime: string
  advice: string
  compatibility: string[]
  challenges: string
  opportunities: string
  planetaryInfluence: string
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    sanskrit: 'मेष (Mesha)',
    symbol: '♈',
    dateRange: 'Mar 21 - Apr 19',
    element: 'Fire',
    rulingPlanet: 'Mars',
    luckyColor: 'Red',
  },
  {
    name: 'Taurus',
    sanskrit: 'वृषभ (Vrishabha)',
    symbol: '♉',
    dateRange: 'Apr 20 - May 20',
    element: 'Earth',
    rulingPlanet: 'Venus',
    luckyColor: 'Green',
  },
  {
    name: 'Gemini',
    sanskrit: 'मिथुन (Mithuna)',
    symbol: '♊',
    dateRange: 'May 21 - Jun 20',
    element: 'Air',
    rulingPlanet: 'Mercury',
    luckyColor: 'Yellow',
  },
  {
    name: 'Cancer',
    sanskrit: 'कर्क (Karka)',
    symbol: '♋',
    dateRange: 'Jun 21 - Jul 22',
    element: 'Water',
    rulingPlanet: 'Moon',
    luckyColor: 'Silver',
  },
  {
    name: 'Leo',
    sanskrit: 'सिंह (Simha)',
    symbol: '♌',
    dateRange: 'Jul 23 - Aug 22',
    element: 'Fire',
    rulingPlanet: 'Sun',
    luckyColor: 'Gold',
  },
  {
    name: 'Virgo',
    sanskrit: 'कन्या (Kanya)',
    symbol: '♍',
    dateRange: 'Aug 23 - Sep 22',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    luckyColor: 'Navy Blue',
  },
  {
    name: 'Libra',
    sanskrit: 'तुला (Tula)',
    symbol: '♎',
    dateRange: 'Sep 23 - Oct 22',
    element: 'Air',
    rulingPlanet: 'Venus',
    luckyColor: 'Pink',
  },
  {
    name: 'Scorpio',
    sanskrit: 'वृश्चिक (Vrishchika)',
    symbol: '♏',
    dateRange: 'Oct 23 - Nov 21',
    element: 'Water',
    rulingPlanet: 'Mars',
    luckyColor: 'Maroon',
  },
  {
    name: 'Sagittarius',
    sanskrit: 'धनु (Dhanu)',
    symbol: '♐',
    dateRange: 'Nov 22 - Dec 21',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    luckyColor: 'Purple',
  },
  {
    name: 'Capricorn',
    sanskrit: 'मकर (Makara)',
    symbol: '♑',
    dateRange: 'Dec 22 - Jan 19',
    element: 'Earth',
    rulingPlanet: 'Saturn',
    luckyColor: 'Black',
  },
  {
    name: 'Aquarius',
    sanskrit: 'कुम्भ (Kumbha)',
    symbol: '♒',
    dateRange: 'Jan 20 - Feb 18',
    element: 'Air',
    rulingPlanet: 'Saturn',
    luckyColor: 'Blue',
  },
  {
    name: 'Pisces',
    sanskrit: 'मीन (Meena)',
    symbol: '♓',
    dateRange: 'Feb 19 - Mar 20',
    element: 'Water',
    rulingPlanet: 'Jupiter',
    luckyColor: 'Sea Green',
  },
]

// Prediction templates based on planetary influences
const planetaryPredictions: Record<string, {
  positive: string[]
  challenges: string[]
  opportunities: string[]
}> = {
  Sun: {
    positive: [
      'Your confidence and vitality are at their peak. Leadership opportunities await.',
      'Solar energy brings clarity to your goals. Authority figures may support you.',
      'Your inner strength shines brightly. Recognition and success are favored.',
    ],
    challenges: [
      'Avoid ego conflicts. Pride might create unnecessary obstacles.',
      'Don\'t overexert yourself. Balance activity with rest.',
    ],
    opportunities: [
      'Excellent day for career initiatives and public presentations.',
      'Creative projects receive positive attention.',
    ],
  },
  Moon: {
    positive: [
      'Your intuition is heightened. Emotional connections deepen.',
      'Nurturing relationships bring joy. Family matters are favored.',
      'Inner peace and mental clarity guide your decisions.',
    ],
    challenges: [
      'Emotional sensitivity may be high. Practice mindfulness.',
      'Avoid making important decisions when feeling overwhelmed.',
    ],
    opportunities: [
      'Perfect time for self-care and connecting with loved ones.',
      'Artistic and creative pursuits flow naturally.',
    ],
  },
  Mars: {
    positive: [
      'Dynamic energy propels you forward. Courage and determination are strong.',
      'Physical vitality and competitive spirit are enhanced.',
      'Action-oriented approach yields results. Initiative is rewarded.',
    ],
    challenges: [
      'Manage impulsiveness and anger. Think before reacting.',
      'Avoid confrontations. Channel energy constructively.',
    ],
    opportunities: [
      'Excellent for sports, physical activities, and assertive actions.',
      'Business ventures and negotiations favor bold moves.',
    ],
  },
  Mercury: {
    positive: [
      'Communication skills are sharp. Ideas flow freely and clearly.',
      'Learning and teaching bring satisfaction. Mental agility is enhanced.',
      'Business dealings and negotiations favor logical approaches.',
    ],
    challenges: [
      'Avoid overthinking. Trust your first instinct occasionally.',
      'Be clear in communication to prevent misunderstandings.',
    ],
    opportunities: [
      'Perfect for contracts, writing, and intellectual pursuits.',
      'Networking and social connections expand.',
    ],
  },
  Jupiter: {
    positive: [
      'Wisdom and optimism guide your path. Expansion and growth are favored.',
      'Spiritual insights and higher learning bring fulfillment.',
      'Good fortune and blessings flow naturally. Generosity is rewarded.',
    ],
    challenges: [
      'Avoid overindulgence or overcommitment.',
      'Keep realistic expectations despite optimistic energy.',
    ],
    opportunities: [
      'Excellent for education, travel, and spiritual practices.',
      'Financial growth and prosperity are indicated.',
    ],
  },
  Venus: {
    positive: [
      'Love, beauty, and harmony surround you. Relationships flourish.',
      'Artistic expression and aesthetic pursuits bring joy.',
      'Social gatherings and romantic moments are especially pleasant.',
    ],
    challenges: [
      'Avoid excessive spending on luxuries.',
      'Balance pleasure with responsibilities.',
    ],
    opportunities: [
      'Perfect for romantic dates, creative projects, and beautification.',
      'Collaborations and partnerships prosper.',
    ],
  },
  Saturn: {
    positive: [
      'Discipline and structure bring lasting results. Patience is rewarded.',
      'Hard work and responsibility lead to recognition.',
      'Wisdom from experience guides important decisions.',
    ],
    challenges: [
      'Delays may occur. Maintain patience and persistence.',
      'Avoid pessimism. Focus on long-term goals.',
    ],
    opportunities: [
      'Excellent for planning, organizing, and building foundations.',
      'Karmic lessons learned bring spiritual growth.',
    ],
  },
}

// Nakshatra-based spiritual advice
const nakshatraAdvice: Record<string, string> = {
  'Ashwini': 'Swift action and healing energies are available. Trust your ability to begin anew.',
  'Bharani': 'Transformation and letting go are themes. Release what no longer serves you.',
  'Krittika': 'Purification and determination guide you. Cut through illusions with clarity.',
  'Rohini': 'Growth and nurturing are favored. Plant seeds for future abundance.',
  'Mrigashira': 'Curiosity and gentle exploration bring discoveries. Follow your interests.',
  'Ardra': 'Deep emotions and transformation surface. Embrace change with courage.',
  'Punarvasu': 'Renewal and return to basics bring peace. Simplicity is powerful.',
  'Pushya': 'Nourishment and protection surround you. Care for yourself and others.',
  'Ashlesha': 'Wisdom and introspection deepen understanding. Look within for answers.',
  'Magha': 'Honor your lineage and authority. Tradition and dignity are important.',
  'Purva Phalguni': 'Joy, creativity, and pleasure are highlighted. Enjoy life\'s gifts.',
  'Uttara Phalguni': 'Contracts and commitments are favored. Build lasting foundations.',
  'Hasta': 'Skill and craftsmanship bring success. Your talents are recognized.',
  'Chitra': 'Beauty and creativity shine. Artistic expression is blessed.',
  'Swati': 'Independence and freedom are themes. Move with the wind.',
  'Vishakha': 'Purpose and determination drive success. Stay focused on goals.',
  'Anuradha': 'Friendship and devotion bring blessings. Loyalty is rewarded.',
  'Jyeshtha': 'Leadership and protection are your strengths. Protect what matters.',
  'Mula': 'Root causes and foundations matter. Go deep to find truth.',
  'Purva Ashadha': 'Victory and invincibility are themes. You cannot be defeated.',
  'Uttara Ashadha': 'Ultimate victory comes through perseverance. Stay the course.',
  'Shravana': 'Listen carefully. Important messages come through hearing.',
  'Dhanishta': 'Wealth and prosperity are indicated. Share your abundance.',
  'Shatabhisha': 'Healing and innovation bring breakthroughs. Think differently.',
  'Purva Bhadrapada': 'Transformation through fire. Purification leads to enlightenment.',
  'Uttara Bhadrapada': 'Deep wisdom and cosmic connection. Trust the universe.',
  'Revati': 'Journey\'s end brings new beginnings. Completion and fulfillment.',
}

let cachedPanchang: any = null
let cachedDate: string | null = null

function getTodaysPanchang() {
  const today = new Date()
  const dateStr = today.toDateString()
  
  if (cachedPanchang && cachedDate === dateStr) {
    return cachedPanchang
  }

  try {
    // Calculate panchang using our existing service
    const panchang = getPanchangForDate(today, DEFAULT_LAT, DEFAULT_LNG)
    
    cachedPanchang = panchang
    cachedDate = dateStr
    return panchang
  } catch (error) {
    console.error('Error calculating panchang:', error)
    return null
  }
}

function generatePredictionFromPanchang(
  signName: string,
  panchang: any
): DailyHoroscope {
  const today = new Date()
  const zodiac = zodiacSigns.find((z) => z.name === signName)!
  
  // Get ruling planet info
  const rulingPlanet = zodiac.rulingPlanet
  const planetInfo = planetaryPredictions[rulingPlanet] || planetaryPredictions.Sun
  
  // Use nakshatra for spiritual guidance
  const nakshatra = panchang?.nakshatra || 'Ashwini'
  const advice = nakshatraAdvice[nakshatra] || 'Trust your inner wisdom today.'
  
  // Extract tithi name and parse number (e.g., "Shukla Tritiya" -> 3)
  const tithiName = panchang?.tithi || 'Pratipada'
  const tithiMatch = tithiName.match(/(\d+|Pratipada|Dwitiya|Tritiya|Chaturthi|Panchami|Shashthi|Saptami|Ashtami|Navami|Dashami|Ekadashi|Dwadashi|Trayodashi|Chaturdashi|Purnima|Amavasya)/)
  let tithiNumber = 1
  if (tithiMatch) {
    const tithiDay = tithiMatch[0]
    const tithiNames = ['Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima']
    const idx = tithiNames.indexOf(tithiDay)
    tithiNumber = idx >= 0 ? idx + 1 : parseInt(tithiDay) || 1
  }
  
  // Calculate lucky number based on tithi and zodiac position
  const zodiacIndex = zodiacSigns.findIndex(z => z.name === signName)
  const luckyNumber = ((tithiNumber + zodiacIndex) % 9) + 1
  
  // Use auspicious muhurat times for lucky time
  const auspiciousTimings = panchang?.auspiciousTimings || []
  const abhijit = auspiciousTimings.find((t: any) => t.name === 'Abhijit Muhurta')
  const brahma = auspiciousTimings.find((t: any) => t.name === 'Brahma Muhurta')
  const luckyTime = abhijit?.time || brahma?.time || '11:00 AM - 12:00 PM'
  
  // Generate prediction based on planetary influence and date
  const predictionIdx = today.getDate() % planetInfo.positive.length
  const prediction = planetInfo.positive[predictionIdx]
  
  const challengesIdx = (today.getDate() + zodiacIndex) % planetInfo.challenges.length
  const challenges = planetInfo.challenges[challengesIdx]
  
  const opportunitiesIdx = (today.getDate() + zodiacIndex + 1) % planetInfo.opportunities.length
  const opportunities = planetInfo.opportunities[opportunitiesIdx]
  
  // Determine compatible signs based on element
  const compatibilityMap: Record<string, string[]> = {
    Fire: ['Leo', 'Sagittarius', 'Aries'],
    Earth: ['Taurus', 'Virgo', 'Capricorn'],
    Air: ['Gemini', 'Libra', 'Aquarius'],
    Water: ['Cancer', 'Scorpio', 'Pisces'],
  }
  const compatibility = compatibilityMap[zodiac.element]
    .filter(s => s !== signName)
    .slice(0, 2)
  
  // Planetary influence description based on real panchang data
  const paksha = panchang?.paksha || 'Shukla'
  const yoga = panchang?.yoga || 'Vishkumbha'
  const planetaryInfluence = `${rulingPlanet} rules your sign. Today's ${paksha} Paksha, ${nakshatra} Nakshatra, and ${yoga} Yoga create favorable energies for you.`
  
  return {
    sign: signName,
    date: today.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    prediction,
    luckyNumber,
    luckyTime,
    advice,
    compatibility,
    challenges,
    opportunities,
    planetaryInfluence,
  }
}

export function getDailyHoroscope(signName: string): DailyHoroscope {
  const panchang = getTodaysPanchang()
  return generatePredictionFromPanchang(signName, panchang)
}

export function getZodiacSignFromDate(birthDate: Date): string {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}
