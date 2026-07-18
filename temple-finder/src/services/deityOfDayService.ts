/**
 * Service to determine the Deity of the Day based on Hindu tradition
 * Each day of the week is associated with a specific deity
 */

export interface DeityOfDay {
  name: string
  dayName: string
  description: string
  imageKey: string
  mantra: string
  benefits: string
  color: string
}

const deityMapping: Record<number, DeityOfDay> = {
  0: { // Sunday
    name: 'Surya',
    dayName: 'Sunday',
    description: 'Lord Surya, the Sun God, brings vitality, health, and success',
    imageKey: 'surya',
    mantra: 'Om Suryaya Namaha',
    benefits: 'Worship Surya for health, vitality, confidence, and success',
    color: 'hsl(15, 80%, 55%)'
  },
  1: { // Monday
    name: 'Shiva',
    dayName: 'Monday',
    description: 'Lord Shiva, the destroyer of evil and lord of meditation',
    imageKey: 'shiva',
    mantra: 'Om Namah Shivaya',
    benefits: 'Worship Shiva for peace, spiritual growth, and removal of obstacles',
    color: 'hsl(220, 60%, 55%)'
  },
  2: { // Tuesday
    name: 'Murugan',
    dayName: 'Tuesday',
    description: 'Lord Murugan, the god of war, victory, and divine grace',
    imageKey: 'murugan',
    mantra: 'Om Saravanabhavaya Namaha',
    benefits: 'Worship Murugan for courage, victory, and removal of obstacles',
    color: 'hsl(15, 85%, 50%)'
  },
  3: { // Wednesday
    name: 'Ganesha',
    dayName: 'Wednesday',
    description: 'Lord Ganesha, the remover of obstacles and lord of beginnings',
    imageKey: 'ganesha',
    mantra: 'Om Gam Ganapataye Namaha',
    benefits: 'Worship Ganesha for wisdom, prosperity, and success in new ventures',
    color: 'hsl(45, 75%, 50%)'
  },
  4: { // Thursday
    name: 'Sai Baba',
    dayName: 'Thursday',
    description: 'Sai Baba of Shirdi, the revered saint who embodies love, compassion, and unity',
    imageKey: 'saibaba',
    mantra: 'Om Sai Ram',
    benefits: 'Worship Sai Baba for peace, prosperity, health, and spiritual growth',
    color: 'hsl(35, 70%, 50%)'
  },
  5: { // Friday
    name: 'Lakshmi',
    dayName: 'Friday',
    description: 'Goddess Lakshmi, the goddess of wealth, fortune, and prosperity',
    imageKey: 'lakshmi',
    mantra: 'Om Shreem Mahalakshmiyei Namaha',
    benefits: 'Worship Lakshmi for wealth, abundance, and material prosperity',
    color: 'hsl(340, 70%, 55%)'
  },
  6: { // Saturday
    name: 'Vishnu',
    dayName: 'Saturday',
    description: 'Lord Vishnu, the preserver and protector of the universe',
    imageKey: 'vishnu',
    mantra: 'Om Namo Narayanaya',
    benefits: 'Worship Vishnu for wealth, prosperity, and overall well-being',
    color: 'hsl(28, 70%, 45%)' // saffron-brown — matches temple UI (was harsh blue)
  }
}

/**
 * Get the deity for today based on the day of the week
 */
export function getTodayDeity(): DeityOfDay {
  const today = new Date()
  const dayIndex = today.getDay() // 0 = Sunday, 1 = Monday, etc.
  return deityMapping[dayIndex]
}

/**
 * Get the deity for a specific day of the week
 * @param dayIndex 0-6 (Sunday = 0, Monday = 1, etc.)
 */
export function getDeityByDay(dayIndex: number): DeityOfDay {
  const index = Math.max(0, Math.min(6, dayIndex))
  return deityMapping[index]
}

/**
 * Get all deities in week order starting from Sunday
 */
export function getAllDeities(): DeityOfDay[] {
  return [0, 1, 2, 3, 4, 5, 6].map(day => deityMapping[day])
}
