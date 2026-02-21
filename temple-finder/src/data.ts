// Simple Temple Data - All in one file
export interface Temple {
  id: string
  name: string
  deity: string
  description: string
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
  rating: number
  image?: string
}

export interface DeityCategory {
  id: string
  name: string
  icon: string
  description: string
  mantra?: string
}

// All Temples Data
export const temples: Temple[] = [
  {
    id: '1',
    name: 'Kapaleeshwarar Temple',
    deity: 'Shiva',
    description: 'Ancient temple dedicated to Lord Shiva, known for its Dravidian architecture and beautiful gopuram.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0334,
    longitude: 80.2700,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Parthasarathy Temple',
    deity: 'Vishnu',
    description: 'One of the oldest temples in Chennai, dedicated to Lord Krishna as Parthasarathy.',
    address: 'Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0567,
    longitude: 80.2778,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Marundeeswarar Temple',
    deity: 'Shiva',
    description: 'Famous temple known for healing powers, dedicated to Lord Shiva as the divine physician.',
    address: 'Thiruvanmiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9697,
    longitude: 80.2603,
    rating: 4.6
  },
  {
    id: '4',
    name: 'Vadapalani Murugan Temple',
    deity: 'Murugan',
    description: 'Popular temple dedicated to Lord Murugan, known for fulfilling wishes of devotees.',
    address: 'Vadapalani, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0500,
    longitude: 80.2167,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Ashtalakshmi Temple',
    deity: 'Lakshmi',
    description: 'Beautiful temple dedicated to Goddess Lakshmi in her eight forms, located by the sea.',
    address: 'Besant Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9994,
    longitude: 80.2750,
    rating: 4.7
  },
  {
    id: '6',
    name: 'Thiruvallikeni Parthasarathy Temple',
    deity: 'Vishnu',
    description: 'Historic temple dedicated to Lord Vishnu, one of the 108 Divya Desams.',
    address: 'Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0567,
    longitude: 80.2778,
    rating: 4.8
  },
  {
    id: '7',
    name: 'Meenakshi Amman Temple',
    deity: 'Devi',
    description: 'Magnificent temple complex dedicated to Goddess Meenakshi and Lord Sundareswarar.',
    address: 'Madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    latitude: 9.9197,
    longitude: 78.1194,
    rating: 4.9
  },
  {
    id: '8',
    name: 'Brihadeeswarar Temple',
    deity: 'Shiva',
    description: 'UNESCO World Heritage Site, one of the largest temples in India.',
    address: 'Thanjavur',
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    latitude: 10.7828,
    longitude: 79.1318,
    rating: 5.0
  },
  {
    id: '9',
    name: 'Ramanathaswamy Temple',
    deity: 'Shiva',
    description: 'One of the twelve Jyotirlinga temples, located in Rameswaram.',
    address: 'Rameswaram',
    city: 'Rameswaram',
    state: 'Tamil Nadu',
    latitude: 9.2881,
    longitude: 79.3175,
    rating: 4.8
  },
  {
    id: '10',
    name: 'Murugan Temple, Palani',
    deity: 'Murugan',
    description: 'Famous hill temple dedicated to Lord Murugan, one of the six abodes of Murugan.',
    address: 'Palani',
    city: 'Palani',
    state: 'Tamil Nadu',
    latitude: 10.4500,
    longitude: 77.5167,
    rating: 4.9
  }
]

// Deity Categories
export const categories: DeityCategory[] = [
  {
    id: 'shiva',
    name: 'Shiva',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Shiva',
    mantra: 'Om Namah Shivaya'
  },
  {
    id: 'vishnu',
    name: 'Vishnu',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Vishnu',
    mantra: 'Om Namo Bhagavate Vasudevaya'
  },
  {
    id: 'murugan',
    name: 'Murugan',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Murugan',
    mantra: 'Om Saravana Bhava'
  },
  {
    id: 'devi',
    name: 'Devi',
    icon: '🕉️',
    description: 'Temples dedicated to Goddess',
    mantra: 'Om Dum Durgayei Namaha'
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    icon: '🕉️',
    description: 'Temples dedicated to Goddess Lakshmi',
    mantra: 'Om Shreem Mahalakshmiyei Namaha'
  }
]

// Helper Functions
export function searchTemples(query: string): Temple[] {
  const lowerQuery = query.toLowerCase()
  return temples.filter(temple =>
    temple.name.toLowerCase().includes(lowerQuery) ||
    temple.deity.toLowerCase().includes(lowerQuery) ||
    temple.city.toLowerCase().includes(lowerQuery) ||
    temple.description.toLowerCase().includes(lowerQuery)
  )
}

export function getTempleById(id: string): Temple | undefined {
  return temples.find(temple => temple.id === id)
}

export function getTemplesByDeity(deity: string): Temple[] {
  return temples.filter(temple => 
    temple.deity.toLowerCase() === deity.toLowerCase()
  )
}

export function getNearbyTemples(lat: number, lng: number, radiusKm: number = 50): Temple[] {
  return temples
    .map(temple => ({
      ...temple,
      distance: calculateDistance(lat, lng, temple.latitude, temple.longitude)
    }))
    .filter(temple => temple.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
