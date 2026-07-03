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

const horoscopePredictions = {
  general: [
    'Today brings positive energy and opportunities for growth. Stay focused on your goals.',
    'The planetary alignment favors new beginnings. Trust your intuition today.',
    'A day of balance and harmony awaits you. Meditation will bring clarity.',
    'Your creative energies are heightened. Express yourself through art or communication.',
    'Financial matters look promising. However, avoid impulsive spending.',
    'Relationships take center stage today. Nurture your connections with loved ones.',
    'Hard work and dedication will pay off. Stay committed to your tasks.',
  ],
  advice: [
    'Practice gratitude and offer prayers to your chosen deity for guidance.',
    'Avoid conflicts and maintain a peaceful demeanor throughout the day.',
    'Wear your lucky color to enhance positive vibrations.',
    'Chant the Gayatri Mantra for mental clarity and spiritual strength.',
    'Help someone in need today to attract good karma.',
    'Start your day with a visit to a temple or meditation.',
    'Be mindful of your words and actions. Kindness brings blessings.',
  ],
  luckyTimes: [
    '6:00 AM - 8:00 AM',
    '11:00 AM - 1:00 PM',
    '3:00 PM - 5:00 PM',
    '7:00 PM - 9:00 PM',
    '9:00 AM - 11:00 AM',
    '2:00 PM - 4:00 PM',
    '5:00 PM - 7:00 PM',
  ],
}

function generateDailyPrediction(date: Date, signIndex: number): string {
  const seed = date.getDate() + date.getMonth() * 31 + signIndex
  const index = seed % horoscopePredictions.general.length
  return horoscopePredictions.general[index]
}

function generateAdvice(date: Date, signIndex: number): string {
  const seed = date.getDate() + date.getMonth() * 31 + signIndex + 1
  const index = seed % horoscopePredictions.advice.length
  return horoscopePredictions.advice[index]
}

function generateLuckyTime(date: Date, signIndex: number): string {
  const seed = date.getDate() + date.getMonth() * 31 + signIndex + 2
  const index = seed % horoscopePredictions.luckyTimes.length
  return horoscopePredictions.luckyTimes[index]
}

function generateLuckyNumber(date: Date, signIndex: number): number {
  const seed = date.getDate() + date.getMonth() * 31 + signIndex + 3
  return (seed % 9) + 1
}

export function getDailyHoroscope(signName: string): DailyHoroscope {
  const today = new Date()
  const signIndex = zodiacSigns.findIndex((sign) => sign.name === signName)

  return {
    sign: signName,
    date: today.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    prediction: generateDailyPrediction(today, signIndex),
    luckyNumber: generateLuckyNumber(today, signIndex),
    luckyTime: generateLuckyTime(today, signIndex),
    advice: generateAdvice(today, signIndex),
  }
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
