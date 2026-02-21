// Mock Data Service for Temple Finder
// This service provides comprehensive mock data for offline development

import { Temple, DeityCategory, PoojaTiming, Review, User, SearchFilters } from '../types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'dev@templefinder.com',
    name: 'Dev User',
    avatar_url: undefined,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Mock Deity Categories
export const mockCategories: DeityCategory[] = [
  {
    id: 'cat-1',
    name: 'Shiva',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Shiva, the destroyer and transformer',
    temple_count: 15,
    color: '#FF9933',
    mantra: 'Om Namah Shivaya (ॐ नमः शिवाय)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-2',
    name: 'Vishnu',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Vishnu, the preserver',
    temple_count: 12,
    color: '#DC143C',
    mantra: 'Om Namo Bhagavate Vasudevaya (ॐ नमो भगवते वासुदेवाय)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-3',
    name: 'Ganpati',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Ganesha, the remover of obstacles',
    temple_count: 8,
    color: '#FF9933',
    mantra: 'Om Gam Ganapataye Namaha (ॐ गं गणपतये नमः)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-4',
    name: 'Murugan',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Murugan, the god of war and victory',
    temple_count: 6,
    color: '#DC143C',
    mantra: 'Om Saravana Bhava (ॐ सरवण भव)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-5',
    name: 'Devi',
    icon: '🕉️',
    description: 'Temples dedicated to various forms of the Divine Mother',
    temple_count: 10,
    color: '#FF9933',
    mantra: 'Om Dum Durgayei Namaha (ॐ दुं दुर्गायै नमः)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-6',
    name: 'Rama',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Rama, the seventh avatar of Vishnu',
    temple_count: 7,
    color: '#DC143C',
    mantra: 'Shri Rama Jaya Rama Jaya Jaya Rama',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-7',
    name: 'Krishna',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Krishna, the eighth avatar of Vishnu',
    temple_count: 9,
    color: '#DC143C',
    mantra: 'Om Namo Bhagavate Vasudevaya (ॐ नमो भगवते वासुदेवाय)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-8',
    name: 'Hanuman',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Hanuman, the devoted servant of Rama and embodiment of devotion',
    temple_count: 5,
    color: '#FF9933',
    mantra: 'Om Han Hanumate Namaha (ॐ हं हनुमते नमः)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-9',
    name: 'Sai Baba',
    icon: '🕉️',
    description: 'Temples dedicated to Sai Baba of Shirdi, the universal saint',
    temple_count: 1,
    color: '#FFD700',
    mantra: 'Om Sai Ram (ॐ साई राम)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-10',
    name: 'Durga',
    icon: '🕉️',
    description: 'Temples dedicated to Goddess Durga in various forms',
    temple_count: 3,
    color: '#DC143C',
    mantra: 'Om Dum Durgayei Namaha (ॐ दुं दुर्गायै नमः)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-11',
    name: 'Jyotirlinga',
    icon: '🕉️',
    description: 'The twelve sacred Jyotirlinga shrines of Lord Shiva',
    temple_count: 6,
    color: '#FF4500',
    mantra: 'Om Namah Shivaya (ॐ नमः शिवाय)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'cat-12',
    name: 'Char Dham',
    icon: '🕉️',
    description: 'The four sacred pilgrimage sites of Hinduism',
    temple_count: 4,
    color: '#4169E1',
    mantra: 'Om Namo Bhagavate Vasudevaya (ॐ नमो भगवते वासुदेवाय)',
    image: '', // Add deity image path here (e.g., '/images/deities/shiva.jpg')
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Mock Temples
export const mockTemples: Temple[] = [
  {
    id: 'temple-1',
    name: 'Meenakshi Amman Temple',
    deity: 'Meenakshi (Parvati)',
    description: 'A historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu. Known for its magnificent architecture and spiritual significance.',
    history: 'The temple was built by the Pandya dynasty in the 6th century CE and later expanded by the Nayak dynasty. It has been a center of worship for over 1500 years.',
    significance: 'One of the most important temples dedicated to Goddess Meenakshi, the consort of Lord Sundareswarar (Shiva). It is one of the 51 Shakti Peethas.',
    architecture: 'Dravidian architecture with towering gopurams, intricate carvings, and a golden lotus tank. The temple complex spans 14 acres.',
    legends: [
      'The temple is said to be where Meenakshi and Sundareswarar were married',
      'The golden lotus tank is believed to have been created by Lord Shiva',
      'The temple was once covered in gold and precious gems'
    ],
    address: 'Madurai Main, Madurai, Tamil Nadu 625001',
    city: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Madurai Main',
    latitude: 9.9197,
    longitude: 78.1194,
    contact_phone: '+91-452-2344360',
    website: 'https://www.maduraimeenakshi.org',
    images: ['meenakshi-1.jpg', 'meenakshi-2.jpg'],
    capacity: 1000,
    current_occupancy: 250,
    rating: 4.8,
    review_count: 1250,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-2',
    name: 'Tirumala Venkateswara Temple',
    deity: 'Venkateswara (Vishnu)',
    description: 'A famous Hindu temple dedicated to Lord Venkateswara, located in Tirumala, Andhra Pradesh. One of the most visited pilgrimage sites in the world.',
    history: 'The temple has been in existence for over 2000 years and is mentioned in ancient texts. It was patronized by various dynasties.',
    significance: 'One of the most visited pilgrimage sites in the world, known as the "Temple of Seven Hills". It is one of the 108 Divya Desams.',
    architecture: 'Dravidian architecture with a golden dome and intricate carvings. The temple is built on seven hills representing the seven chakras.',
    legends: [
      'Lord Venkateswara is said to have appeared here to save humanity',
      'The temple is built on seven hills representing the seven chakras',
      'The deity is said to grant all wishes to devotees'
    ],
    address: 'Tirumala, Tirupati, Andhra Pradesh 517504',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    locality: 'Tirumala',
    latitude: 13.6777,
    longitude: 79.3476,
    contact_phone: '+91-877-2277777',
    website: 'https://www.tirumala.org',
    images: ['tirumala-1.jpg', 'tirumala-2.jpg'],
    capacity: 2000,
    current_occupancy: 1800,
    rating: 4.9,
    review_count: 2500,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-3',
    name: 'Kashi Vishwanath Temple',
    deity: 'Shiva',
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in Varanasi, Uttar Pradesh. Considered one of the holiest places for Hindus.',
    history: 'The original temple was destroyed and rebuilt several times, with the current structure dating to the 18th century.',
    significance: 'Considered one of the twelve Jyotirlinga shrines and one of the holiest places for Hindus. It grants liberation (moksha) to devotees.',
    architecture: 'North Indian Nagara style architecture with a golden spire. The temple is located on the banks of the Ganges.',
    legends: [
      'Lord Shiva is said to have appeared as a column of light here',
      'The temple is believed to grant liberation (moksha) to devotees',
      'It is one of the 12 Jyotirlinga shrines'
    ],
    address: 'Vishwanath Gali, Varanasi, Uttar Pradesh 221001',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    locality: 'Vishwanath Gali',
    latitude: 25.3176,
    longitude: 82.9739,
    contact_phone: '+91-542-2392629',
    website: 'https://www.shrikashivishwanath.org',
    images: ['kashi-1.jpg', 'kashi-2.jpg'],
    capacity: 500,
    current_occupancy: 300,
    rating: 4.7,
    review_count: 1800,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-4',
    name: 'Golden Temple (Harmandir Sahib)',
    deity: 'Guru Granth Sahib',
    description: 'The holiest Gurdwara of Sikhism, located in Amritsar, Punjab. Known for its golden dome and spiritual significance.',
    history: 'The temple was built in the 16th century by Guru Arjan Dev and completed by Guru Hargobind. It has been rebuilt several times.',
    significance: 'The holiest shrine of Sikhism, representing the concept of universal brotherhood and equality.',
    architecture: 'A blend of Islamic and Hindu architectural styles with a golden dome. The temple is surrounded by a sacred pool.',
    legends: [
      'The temple was built on land donated by Emperor Akbar',
      'The golden dome represents the spiritual and temporal aspects of life',
      'The temple is open to people of all faiths'
    ],
    address: 'Golden Temple Road, Amritsar, Punjab 143006',
    city: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    locality: 'Golden Temple Road',
    latitude: 31.6199,
    longitude: 74.8765,
    contact_phone: '+91-183-2553957',
    website: 'https://www.goldentempleamritsar.org',
    images: ['golden-1.jpg', 'golden-2.jpg'],
    capacity: 2000,
    current_occupancy: 1500,
    rating: 4.9,
    review_count: 3200,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-5',
    name: 'Akshardham Temple',
    deity: 'Swaminarayan',
    description: 'A Hindu temple complex dedicated to Bhagwan Swaminarayan in Delhi. Known for its modern architecture and cultural exhibits.',
    history: 'Built in 2005, the temple represents a blend of traditional Hindu architecture with modern technology.',
    significance: 'A modern temple complex showcasing Indian culture, spirituality, and architectural excellence.',
    architecture: 'Traditional Hindu architecture with modern materials and technology. Features intricate carvings and cultural exhibits.',
    legends: [
      'The temple was built without steel, using traditional architectural techniques',
      'It houses the world\'s largest comprehensive Hindu temple',
      'The temple complex includes cultural exhibits and boat rides'
    ],
    address: 'Noida Mor, Pandav Nagar, New Delhi, Delhi 110092',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    locality: 'Pandav Nagar',
    latitude: 28.6129,
    longitude: 77.2773,
    contact_phone: '+91-11-43442300',
    website: 'https://www.akshardham.com',
    images: ['akshardham-1.jpg', 'akshardham-2.jpg'],
    capacity: 3000,
    current_occupancy: 2000,
    rating: 4.8,
    review_count: 2800,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-6',
    name: 'Somnath Temple',
    deity: 'Shiva',
    description: 'The first among the twelve Jyotirlinga shrines of Lord Shiva, located in Prabhas Patan, Gujarat.',
    history: 'The temple has been destroyed and rebuilt several times throughout history, with the current structure built in 1951.',
    significance: 'One of the most sacred pilgrimage sites for Hindus, mentioned in ancient texts as the first Jyotirlinga.',
    architecture: 'Chalukya style architecture with intricate carvings and a tall shikhara. The temple faces the Arabian Sea.',
    legends: [
      'The temple was attacked by Mahmud of Ghazni seventeen times',
      'The moon god is said to have worshipped Shiva here to regain his lustre',
      'It is the first of the 12 Jyotirlinga shrines'
    ],
    address: 'Somnath, Gujarat 362268',
    city: 'Prabhas Patan',
    state: 'Gujarat',
    country: 'India',
    locality: 'Somnath',
    latitude: 20.8884,
    longitude: 70.4020,
    contact_phone: '+91-2876-233001',
    website: 'https://www.somnath.org',
    images: ['somnath-1.jpg', 'somnath-2.jpg'],
    capacity: 800,
    current_occupancy: 400,
    rating: 4.6,
    review_count: 950,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-7',
    name: 'Dwarkadhish Temple',
    deity: 'Krishna',
    description: 'A famous Hindu temple dedicated to Lord Krishna, located in Dwarka, Gujarat. One of the four major pilgrimage sites.',
    history: 'The temple was built around 2000 years ago and has been renovated several times. It is mentioned in ancient texts.',
    significance: 'One of the four major pilgrimage sites (Char Dham) and one of the 108 Divya Desams. The ancient capital of Krishna.',
    architecture: 'North Indian architectural style with a tall shikhara and intricate carvings. The temple is located on the banks of the Gomti River.',
    legends: [
      'Lord Krishna is said to have established his kingdom here',
      'The temple is believed to be built over Krishna\'s residential palace',
      'It is one of the Char Dham pilgrimage sites'
    ],
    address: 'Dwarkadhish Temple, Dwarka, Gujarat 361335',
    city: 'Dwarka',
    state: 'Gujarat',
    country: 'India',
    locality: 'Dwarka',
    latitude: 22.2403,
    longitude: 68.9686,
    contact_phone: '+91-2892-234080',
    website: 'https://www.dwarkadhish.org',
    images: ['dwarka-1.jpg', 'dwarka-2.jpg'],
    capacity: 600,
    current_occupancy: 350,
    rating: 4.5,
    review_count: 750,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-8',
    name: 'Jagannath Temple',
    deity: 'Jagannath (Krishna)',
    description: 'A famous Hindu temple dedicated to Lord Jagannath, located in Puri, Odisha. Known for the annual Rath Yatra festival.',
    history: 'The temple was built in the 12th century by King Anantavarman Chodaganga Deva. It has been a major pilgrimage site for centuries.',
    significance: 'One of the four major pilgrimage sites (Char Dham) and famous for the annual Rath Yatra festival.',
    architecture: 'Kalinga architecture with a tall shikhara and intricate carvings. The temple complex includes several smaller shrines.',
    legends: [
      'The temple is famous for the annual Rath Yatra festival',
      'Lord Jagannath is said to be the Lord of the Universe',
      'The temple is one of the Char Dham pilgrimage sites'
    ],
    address: 'Grand Road, Puri, Odisha 752001',
    city: 'Puri',
    state: 'Odisha',
    country: 'India',
    locality: 'Grand Road',
    latitude: 19.8138,
    longitude: 85.8315,
    contact_phone: '+91-6752-222002',
    website: 'https://www.jagannathtemplepuri.com',
    images: ['jagannath-1.jpg', 'jagannath-2.jpg'],
    capacity: 1200,
    current_occupancy: 800,
    rating: 4.7,
    review_count: 1500,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-9',
    name: 'Palani Murugan Temple',
    deity: 'Murugan (Kartikeya)',
    description: 'One of the most famous Murugan temples in Tamil Nadu, located on Palani Hill. Known as one of the Six Abodes of Murugan.',
    history: 'The temple was built in the 9th century and is mentioned in ancient Tamil literature. It has been a major pilgrimage site for centuries.',
    significance: 'One of the Six Abodes of Murugan (Arupadaiveedu). The temple is famous for its unique idol made of Navapashanam.',
    architecture: 'Traditional Tamil architecture with a hilltop location. The temple is accessible by ropeway or steps.',
    legends: [
      'The temple is one of the Six Abodes of Murugan',
      'The idol is made of Navapashanam, a mixture of nine poisonous substances',
      'Lord Murugan is said to have meditated here'
    ],
    festivals: ['Skanda Sashti', 'Thai Poosam'],
    address: 'Palani, Dindigul District, Tamil Nadu 624601',
    city: 'Palani',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Palani Hill',
    latitude: 10.4566,
    longitude: 77.5158,
    contact_phone: '+91-4545-241251',
    website: 'https://www.palanimurugan.org',
    images: ['palani-1.jpg', 'palani-2.jpg'],
    capacity: 800,
    current_occupancy: 500,
    rating: 4.6,
    review_count: 1200,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-10',
    name: 'Thirupparankundram Murugan Temple',
    deity: 'Murugan (Kartikeya)',
    description: 'Another famous Murugan temple in Tamil Nadu, known for its rock-cut architecture and ancient history.',
    history: 'The temple dates back to the 8th century and features rock-cut architecture. It is one of the Six Abodes of Murugan.',
    significance: 'One of the Six Abodes of Murugan. The temple is carved into a rock and features ancient Tamil architecture.',
    architecture: 'Rock-cut architecture with ancient Tamil design. The temple is carved into a massive rock formation.',
    legends: [
      'The temple is one of the Six Abodes of Murugan',
      'Lord Murugan is said to have married Devasena here',
      'The temple features ancient rock-cut architecture'
    ],
    festivals: ['Skanda Sashti', 'Thai Poosam'],
    address: 'Thirupparankundram, Madurai District, Tamil Nadu 625005',
    city: 'Thirupparankundram',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Thirupparankundram',
    latitude: 9.8667,
    longitude: 78.0667,
    contact_phone: '+91-452-2482927',
    website: 'https://www.thirupparankundram.org',
    images: ['thirupparankundram-1.jpg', 'thirupparankundram-2.jpg'],
    capacity: 600,
    current_occupancy: 300,
    rating: 4.5,
    review_count: 800,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-11',
    name: 'Kedarnath Temple',
    deity: 'Shiva',
    description: 'One of the most sacred Hindu temples dedicated to Lord Shiva, located in the Garhwal Himalayan range in Uttarakhand.',
    history: 'The temple was built by Adi Shankara in the 8th century and is one of the twelve Jyotirlinga shrines.',
    significance: 'One of the Char Dham pilgrimage sites and one of the twelve Jyotirlinga shrines of Lord Shiva.',
    architecture: 'Stone architecture with a conical lingam. The temple is built of large, evenly cut grey stones.',
    legends: [
      'The temple is one of the twelve Jyotirlinga shrines',
      'Lord Shiva is said to have appeared here to save the Pandavas',
      'The temple is part of the Char Dham pilgrimage circuit'
    ],
    festivals: ['Mahashivratri', 'Shravan Month'],
    address: 'Kedarnath, Rudraprayag District, Uttarakhand 246445',
    city: 'Kedarnath',
    state: 'Uttarakhand',
    country: 'India',
    locality: 'Garhwal Himalayas',
    latitude: 30.7346,
    longitude: 79.0669,
    contact_phone: '+91-1372-274160',
    website: 'https://www.badrinath-kedarnath.gov.in',
    images: ['kedarnath-1.jpg', 'kedarnath-2.jpg'],
    capacity: 500,
    current_occupancy: 200,
    rating: 4.8,
    review_count: 1800,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-12',
    name: 'Badrinath Temple',
    deity: 'Vishnu (Badrinath)',
    description: 'A famous Hindu temple dedicated to Lord Vishnu, located in Badrinath, Uttarakhand. One of the Char Dham pilgrimage sites.',
    history: 'The temple was established by Adi Shankara in the 8th century and has been rebuilt several times.',
    significance: 'One of the four Char Dham pilgrimage sites and one of the 108 Divya Desams of Lord Vishnu.',
    architecture: 'Traditional North Indian architecture with a tall shikhara and golden roof.',
    legends: [
      'The temple is one of the Char Dham pilgrimage sites',
      'Lord Vishnu is said to have meditated here',
      'The temple is one of the 108 Divya Desams'
    ],
    festivals: ['Vaikuntha Ekadashi', 'Badri Kedar Festival'],
    address: 'Badrinath, Chamoli District, Uttarakhand 246422',
    city: 'Badrinath',
    state: 'Uttarakhand',
    country: 'India',
    locality: 'Garhwal Himalayas',
    latitude: 30.7448,
    longitude: 79.4946,
    contact_phone: '+91-1372-274160',
    website: 'https://www.badrinath-kedarnath.gov.in',
    images: ['badrinath-1.jpg', 'badrinath-2.jpg'],
    capacity: 600,
    current_occupancy: 300,
    rating: 4.7,
    review_count: 1600,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-13',
    name: 'Rameswaram Ramanathaswamy Temple',
    deity: 'Shiva (Ramanathaswamy)',
    description: 'A famous Hindu temple dedicated to Lord Shiva, located in Rameswaram, Tamil Nadu. One of the twelve Jyotirlinga shrines.',
    history: 'The temple was built by the Pandya dynasty and expanded by various rulers over centuries.',
    significance: 'One of the twelve Jyotirlinga shrines and one of the four Char Dham pilgrimage sites.',
    architecture: 'Dravidian architecture with the longest temple corridor in India.',
    legends: [
      'The temple is one of the twelve Jyotirlinga shrines',
      'Lord Rama is said to have worshipped Shiva here',
      'The temple is one of the Char Dham pilgrimage sites'
    ],
    festivals: ['Mahashivratri', 'Ramanathaswamy Festival'],
    address: 'Rameswaram, Ramanathapuram District, Tamil Nadu 623526',
    city: 'Rameswaram',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Rameswaram Island',
    latitude: 9.2881,
    longitude: 79.3127,
    contact_phone: '+91-4573-221223',
    website: 'https://www.rameswaramtemple.org',
    images: ['rameswaram-1.jpg', 'rameswaram-2.jpg'],
    capacity: 1000,
    current_occupancy: 600,
    rating: 4.6,
    review_count: 1400,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-14',
    name: 'Ujjain Mahakaleshwar Temple',
    deity: 'Shiva (Mahakaleshwar)',
    description: 'A famous Hindu temple dedicated to Lord Shiva, located in Ujjain, Madhya Pradesh. One of the twelve Jyotirlinga shrines.',
    history: 'The temple has ancient origins and was rebuilt in the 18th century by the Maratha rulers.',
    significance: 'One of the twelve Jyotirlinga shrines and an important pilgrimage site for Hindus.',
    architecture: 'Traditional North Indian architecture with a tall shikhara and intricate carvings.',
    legends: [
      'The temple is one of the twelve Jyotirlinga shrines',
      'Lord Shiva is said to have appeared here as Mahakal',
      'The temple is famous for its Bhasma Aarti ceremony'
    ],
    festivals: ['Mahashivratri', 'Kumbh Mela'],
    address: 'Mahakal Temple, Ujjain, Madhya Pradesh 456006',
    city: 'Ujjain',
    state: 'Madhya Pradesh',
    country: 'India',
    locality: 'Mahakal Temple Area',
    latitude: 23.1828,
    longitude: 75.7772,
    contact_phone: '+91-734-2552043',
    website: 'https://www.mahakaleshwar.nic.in',
    images: ['mahakaleshwar-1.jpg', 'mahakaleshwar-2.jpg'],
    capacity: 800,
    current_occupancy: 400,
    rating: 4.7,
    review_count: 1200,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-15',
    name: 'Siddhivinayak Temple',
    deity: 'Ganpati (Ganesha)',
    description: 'A famous Hindu temple dedicated to Lord Ganesha, located in Mumbai, Maharashtra. One of the most visited temples in India.',
    history: 'The temple was built in 1801 and has been renovated several times. It is managed by a trust.',
    significance: 'One of the most popular Ganesha temples in India, visited by millions of devotees annually.',
    architecture: 'Traditional Marathi architecture with a golden dome and intricate carvings.',
    legends: [
      'The temple is famous for fulfilling devotees\' wishes',
      'Lord Ganesha is said to have appeared here',
      'The temple is visited by many Bollywood celebrities'
    ],
    festivals: ['Ganesh Chaturthi', 'Angarki Chaturthi'],
    address: 'Siddhivinayak Temple, Prabhadevi, Mumbai, Maharashtra 400025',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    locality: 'Prabhadevi',
    latitude: 19.0176,
    longitude: 72.8562,
    contact_phone: '+91-22-24372969',
    website: 'https://www.siddhivinayak.org',
    images: ['siddhivinayak-1.jpg', 'siddhivinayak-2.jpg'],
    capacity: 2000,
    current_occupancy: 1500,
    rating: 4.8,
    review_count: 3000,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-16',
    name: 'Shirdi Sai Baba Temple',
    deity: 'Sai Baba',
    description: 'A famous temple dedicated to Sai Baba of Shirdi, located in Shirdi, Maharashtra. One of the most visited pilgrimage sites in India.',
    history: 'The temple was built at the site where Sai Baba lived and preached. It has been expanded over the years.',
    significance: 'One of the most visited pilgrimage sites in India, attracting devotees from all religions.',
    architecture: 'Modern architecture with traditional elements. The temple complex includes the samadhi of Sai Baba.',
    legends: [
      'Sai Baba is said to have lived here for 60 years',
      'The temple is visited by devotees of all religions',
      'Sai Baba is believed to grant wishes to devotees'
    ],
    festivals: ['Guru Purnima', 'Ram Navami'],
    address: 'Shirdi Sai Baba Temple, Shirdi, Ahmednagar District, Maharashtra 423109',
    city: 'Shirdi',
    state: 'Maharashtra',
    country: 'India',
    locality: 'Shirdi Temple Complex',
    latitude: 19.7604,
    longitude: 74.4776,
    contact_phone: '+91-2423-255077',
    website: 'https://www.shrisaibabasansthan.org',
    images: ['shirdi-1.jpg', 'shirdi-2.jpg'],
    capacity: 5000,
    current_occupancy: 3000,
    rating: 4.9,
    review_count: 5000,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-17',
    name: 'Tirupati Balaji Temple',
    deity: 'Venkateswara (Vishnu)',
    description: 'A famous Hindu temple dedicated to Lord Venkateswara, located in Tirupati, Andhra Pradesh. One of the richest temples in the world.',
    history: 'The temple has ancient origins and has been patronized by various dynasties over centuries.',
    significance: 'One of the most visited pilgrimage sites in the world and one of the richest temples.',
    architecture: 'Dravidian architecture with a golden dome and intricate carvings.',
    legends: [
      'Lord Venkateswara is said to have appeared here',
      'The temple is one of the richest in the world',
      'Devotees believe the deity grants all wishes'
    ],
    festivals: ['Vaikuntha Ekadashi', 'Brahmotsavam'],
    address: 'Tirumala, Tirupati, Andhra Pradesh 517504',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    locality: 'Tirumala',
    latitude: 13.6777,
    longitude: 79.3476,
    contact_phone: '+91-877-2277777',
    website: 'https://www.tirumala.org',
    images: ['tirupati-1.jpg', 'tirupati-2.jpg'],
    capacity: 3000,
    current_occupancy: 2500,
    rating: 4.9,
    review_count: 4000,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-18',
    name: 'Vaishno Devi Temple',
    deity: 'Vaishno Devi (Durga)',
    description: 'A famous Hindu temple dedicated to Goddess Vaishno Devi, located in Katra, Jammu and Kashmir. One of the most visited pilgrimage sites in India.',
    history: 'The temple has ancient origins and is mentioned in various Hindu texts. It is located in a cave.',
    significance: 'One of the most visited pilgrimage sites in India, located in a cave in the Trikuta Mountains.',
    architecture: 'The temple is located in a natural cave with three pindis representing different forms of the goddess.',
    legends: [
      'The temple is located in a cave where the goddess meditated',
      'The goddess is said to have appeared here to save devotees',
      'The temple is visited by millions of devotees annually'
    ],
    festivals: ['Navaratri', 'Diwali'],
    address: 'Vaishno Devi Temple, Katra, Reasi District, Jammu and Kashmir 182320',
    city: 'Katra',
    state: 'Jammu and Kashmir',
    country: 'India',
    locality: 'Trikuta Mountains',
    latitude: 33.0288,
    longitude: 74.9480,
    contact_phone: '+91-1991-234053',
    website: 'https://www.maavaishnodevi.org',
    images: ['vaishnodevi-1.jpg', 'vaishnodevi-2.jpg'],
    capacity: 2000,
    current_occupancy: 1500,
    rating: 4.8,
    review_count: 3500,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-19',
    name: 'Kamakhya Temple',
    deity: 'Kamakhya (Durga)',
    description: 'A famous Hindu temple dedicated to Goddess Kamakhya, located in Guwahati, Assam. One of the 51 Shakti Peethas.',
    history: 'The temple has ancient origins and was rebuilt in the 16th century by the Koch dynasty.',
    significance: 'One of the 51 Shakti Peethas and an important center of Tantric worship.',
    architecture: 'Traditional Assamese architecture with a unique beehive-shaped dome.',
    legends: [
      'The temple is one of the 51 Shakti Peethas',
      'The goddess is said to have appeared here',
      'The temple is famous for the Ambubachi Mela festival'
    ],
    festivals: ['Ambubachi Mela', 'Navaratri'],
    address: 'Kamakhya Temple, Kamakhya, Guwahati, Assam 781010',
    city: 'Guwahati',
    state: 'Assam',
    country: 'India',
    locality: 'Kamakhya Hill',
    latitude: 26.1664,
    longitude: 91.7053,
    contact_phone: '+91-361-2734634',
    website: 'https://www.kamakhyatemple.org',
    images: ['kamakhya-1.jpg', 'kamakhya-2.jpg'],
    capacity: 800,
    current_occupancy: 400,
    rating: 4.6,
    review_count: 1000,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-20',
    name: 'Kanchipuram Ekambareswarar Temple',
    deity: 'Shiva (Ekambareswarar)',
    description: 'A famous Hindu temple dedicated to Lord Shiva, located in Kanchipuram, Tamil Nadu. One of the Pancha Bhoota Stalas.',
    history: 'The temple has ancient origins and was built by the Pallava dynasty. It has been expanded by various rulers.',
    significance: 'One of the Pancha Bhoota Stalas representing the element of Earth and one of the five major Shiva temples.',
    architecture: 'Dravidian architecture with a tall gopuram and a mango tree that is said to be 3500 years old.',
    legends: [
      'The temple represents the element of Earth',
      'The mango tree in the temple is said to be 3500 years old',
      'The temple is one of the five major Shiva temples'
    ],
    festivals: ['Mahashivratri', 'Mango Festival'],
    address: 'Ekambareswarar Temple, Kanchipuram, Tamil Nadu 631502',
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Ekambareswarar Temple Complex',
    latitude: 12.8343,
    longitude: 79.7036,
    contact_phone: '+91-44-27222380',
    website: 'https://www.ekambareswarar.org',
    images: ['ekambareswarar-1.jpg', 'ekambareswarar-2.jpg'],
    capacity: 600,
    current_occupancy: 300,
    rating: 4.5,
    review_count: 800,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-21',
    name: 'Kapaleeshwarar Temple',
    deity: 'Shiva (Kapaleeshwarar)',
    description: 'A famous Hindu temple dedicated to Lord Shiva, located in Mylapore, Chennai, Tamil Nadu. One of the most important Shiva temples in Chennai.',
    history: 'The temple was built by the Pallava dynasty in the 7th century CE. The current structure was rebuilt by the Vijayanagara rulers.',
    significance: 'One of the most important Shiva temples in Chennai, known for its beautiful architecture and spiritual significance.',
    architecture: 'Dravidian architecture with a 37-meter tall gopuram. The temple features intricate carvings and a large tank.',
    legends: [
      'Goddess Parvati is said to have worshipped Lord Shiva here in the form of a peacock',
      'The temple is one of the 275 Paadal Petra Sthalams',
      'The temple tank is said to have been created by Lord Shiva himself'
    ],
    festivals: ['Mahashivratri', 'Arupathimoovar Festival', 'Brahmotsavam'],
    address: 'Kapaleeshwarar Temple, Mylapore, Chennai, Tamil Nadu 600004',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Mylapore',
    latitude: 13.0339,
    longitude: 80.2628,
    contact_phone: '+91-44-24941020',
    website: 'https://www.kapaleeshwarartemple.org',
    images: ['kapaleeshwarar-1.jpg', 'kapaleeshwarar-2.jpg'],
    capacity: 800,
    current_occupancy: 400,
    rating: 4.7,
    review_count: 1200,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-22',
    name: 'Parthasarathy Temple',
    deity: 'Vishnu (Krishna)',
    description: 'A famous Hindu temple dedicated to Lord Krishna, located in Triplicane, Chennai, Tamil Nadu. One of the 108 Divya Desams.',
    history: 'The temple was built by the Pallava dynasty in the 8th century CE. It is one of the oldest temples in Chennai.',
    significance: 'One of the 108 Divya Desams dedicated to Lord Vishnu. The temple is known for its unique iconography showing Krishna as a charioteer.',
    architecture: 'Dravidian architecture with beautiful sculptures and carvings. The temple has five shrines dedicated to different forms of Vishnu.',
    legends: [
      'The temple is one of the 108 Divya Desams',
      'Lord Krishna is worshipped here as Parthasarathy (charioteer of Arjuna)',
      'The temple is mentioned in the works of the Alwars'
    ],
    festivals: ['Vaikunta Ekadashi', 'Brahmotsavam', 'Krishna Janmashtami'],
    address: 'Parthasarathy Temple, Triplicane, Chennai, Tamil Nadu 600005',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Triplicane',
    latitude: 13.0567,
    longitude: 80.2778,
    contact_phone: '+91-44-28543421',
    website: 'https://www.parthasarathytemple.org',
    images: ['parthasarathy-1.jpg', 'parthasarathy-2.jpg'],
    capacity: 600,
    current_occupancy: 300,
    rating: 4.6,
    review_count: 950,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-23',
    name: 'Marundeeswarar Temple',
    deity: 'Shiva',
    description: 'A famous Hindu temple dedicated to Lord Shiva, located in Thiruvanmiyur, Chennai, Tamil Nadu. Known for its healing powers.',
    history: 'The temple dates back to the Chola period and is one of the 275 Paadal Petra Sthalams.',
    significance: 'The temple is believed to have healing powers, especially for diseases. Devotees come here seeking relief from ailments.',
    architecture: 'Dravidian architecture with beautiful sculptures. The temple has a large tank and several shrines.',
    legends: [
      'Lord Shiva is said to have cured Sage Valmiki here',
      'The temple is known for its healing powers',
      'The temple is one of the 275 Paadal Petra Sthalams'
    ],
    festivals: ['Mahashivratri', 'Panguni Uthiram'],
    address: 'Marundeeswarar Temple, Thiruvanmiyur, Chennai, Tamil Nadu 600041',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Thiruvanmiyur',
    latitude: 12.9494,
    longitude: 80.2606,
    contact_phone: '+91-44-24410720',
    website: 'https://www.marundeeswarartemple.org',
    images: ['marundeeswarar-1.jpg', 'marundeeswarar-2.jpg'],
    capacity: 500,
    current_occupancy: 200,
    rating: 4.5,
    review_count: 650,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-24',
    name: 'Vadapalani Murugan Temple',
    deity: 'Murugan',
    description: 'A famous Hindu temple dedicated to Lord Murugan, located in Vadapalani, Chennai, Tamil Nadu. One of the most popular temples in Chennai.',
    history: 'The temple was established in the late 19th century and has become one of the most visited temples in Chennai.',
    significance: 'The temple is known for fulfilling wishes of devotees. It is especially popular among students and those seeking success.',
    architecture: 'Modern Dravidian architecture with a tall gopuram. The temple is well-maintained and spacious.',
    legends: [
      'The temple is known for fulfilling wishes',
      'Devotees tie yellow threads around the temple tree for wishes',
      'The temple is especially popular among students'
    ],
    festivals: ['Thai Poosam', 'Skanda Shashti', 'Vaikasi Visakam'],
    address: 'Vadapalani Murugan Temple, Vadapalani, Chennai, Tamil Nadu 600026',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Vadapalani',
    latitude: 13.0500,
    longitude: 80.2100,
    contact_phone: '+91-44-24891234',
    website: 'https://www.vadapalanimurugantemple.org',
    images: ['vadapalani-1.jpg', 'vadapalani-2.jpg'],
    capacity: 1000,
    current_occupancy: 600,
    rating: 4.6,
    review_count: 1500,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-25',
    name: 'Ashtalakshmi Temple',
    deity: 'Lakshmi',
    description: 'A beautiful temple dedicated to Goddess Lakshmi in her eight forms, located in Besant Nagar, Chennai, Tamil Nadu.',
    history: 'The temple was built in 1976 and is located on the beach. It is a modern temple with beautiful architecture.',
    significance: 'The temple is dedicated to the eight forms of Goddess Lakshmi. It is located on the beach and offers beautiful views.',
    architecture: 'Modern architecture with eight shrines for the eight forms of Lakshmi. The temple is built on the beach.',
    legends: [
      'The temple represents the eight forms of Goddess Lakshmi',
      'The temple is located on the beach offering beautiful views',
      'Devotees come here seeking prosperity and wealth'
    ],
    festivals: ['Lakshmi Puja', 'Diwali', 'Varalakshmi Vratam'],
    address: 'Ashtalakshmi Temple, Besant Nagar Beach, Chennai, Tamil Nadu 600090',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Besant Nagar',
    latitude: 12.9980,
    longitude: 80.2700,
    contact_phone: '+91-44-24912345',
    website: 'https://www.ashtalakshmitemple.org',
    images: ['ashtalakshmi-1.jpg', 'ashtalakshmi-2.jpg'],
    capacity: 800,
    current_occupancy: 400,
    rating: 4.7,
    review_count: 1100,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-26',
    name: 'Thiruvallikeni Parthasarathy Temple',
    deity: 'Vishnu',
    description: 'An ancient temple dedicated to Lord Vishnu, located in Triplicane, Chennai. One of the oldest temples in Chennai.',
    history: 'The temple dates back to the 8th century CE and was built by the Pallava dynasty.',
    significance: 'The temple is one of the 108 Divya Desams and is known for its ancient architecture.',
    architecture: 'Ancient Dravidian architecture with beautiful carvings and sculptures.',
    legends: [
      'The temple is one of the 108 Divya Desams',
      'The temple has ancient origins dating back to the Pallava period',
      'Lord Vishnu is worshipped here in various forms'
    ],
    festivals: ['Vaikunta Ekadashi', 'Brahmotsavam'],
    address: 'Parthasarathy Temple, Triplicane, Chennai, Tamil Nadu 600005',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Triplicane',
    latitude: 13.0600,
    longitude: 80.2800,
    contact_phone: '+91-44-28543421',
    website: 'https://www.parthasarathytemple.org',
    images: ['parthasarathy-1.jpg', 'parthasarathy-2.jpg'],
    capacity: 600,
    current_occupancy: 350,
    rating: 4.6,
    review_count: 900,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-27',
    name: 'Seniamman Koil',
    deity: 'Mariamman (Seniamman)',
    description: 'A popular local temple dedicated to Goddess Mariamman (Seniamman), located in Royapuram, Chennai, Tamil Nadu. Known for its local significance and community worship.',
    history: 'The temple has been a focal point of the Royapuram community for generations. It serves as a center for local festivals and community gatherings.',
    significance: 'Goddess Mariamman is worshipped as the protector of the community. The temple is especially important during local festivals and community events.',
    architecture: 'Traditional South Indian temple architecture with a gopuram. The temple has a main sanctum and several smaller shrines.',
    legends: [
      'Goddess Mariamman is believed to protect the local community',
      'The temple is a center for community festivals and celebrations',
      'Devotees come here seeking protection and blessings'
    ],
    festivals: ['Mariamman Festival', 'Pongal', 'Navaratri'],
    address: 'Seniamman Koil, Royapuram, Chennai, Tamil Nadu 600013',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Royapuram',
    latitude: 13.1000,
    longitude: 80.2800,
    contact_phone: '+91-44-25941234',
    website: '',
    images: ['seniamman-1.jpg', 'seniamman-2.jpg'],
    capacity: 300,
    current_occupancy: 150,
    rating: 4.4,
    review_count: 450,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-28',
    name: 'Kalikambal Temple',
    deity: 'Kalikambal (Kamakshi)',
    description: 'Dedicated to Shri Kaligambal and Lord Kamadeswarar, one of the oldest temples in Tamil Nadu, built in 1640 AD. Located in Georgetown.',
    history: 'The temple was relocated in 1640 AD from near the seashore. The great Maratha ruler Shivaji worshipped here in 1667.',
    significance: 'One of the oldest temples in Chennai, known for its historical significance and spiritual importance.',
    architecture: 'Traditional Dravidian architecture with beautiful sculptures and carvings.',
    legends: [
      'The temple was originally located close to the seashore',
      'Shivaji Maharaj visited this temple in 1667',
      'The temple is known for its powerful deity'
    ],
    festivals: ['Navaratri', 'Pongal', 'Diwali'],
    address: 'Thambu Chetty Street, Georgetown, Chennai, Tamil Nadu 600001',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Georgetown',
    latitude: 13.0900,
    longitude: 80.2900,
    contact_phone: '+91-44-25341234',
    website: '',
    images: ['kalikambal-1.jpg', 'kalikambal-2.jpg'],
    capacity: 400,
    current_occupancy: 200,
    rating: 4.5,
    review_count: 600,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-29',
    name: 'Sri Anjaneyar Temple',
    deity: 'Hanuman',
    description: 'A famous temple dedicated to Lord Hanuman, located in Nanganallur. Known for its 32-feet tall idol of Anjaneyar moulded from a single rock.',
    history: 'The temple is famous for its massive Hanuman idol, one of the tallest in Chennai.',
    significance: 'The 32-feet tall idol of Anjaneyar is moulded from a single rock, making it unique.',
    architecture: 'Modern temple architecture with a massive idol of Lord Hanuman.',
    legends: [
      'The 32-feet idol is moulded from a single rock',
      'Devotees believe prayers here are especially powerful',
      'The temple is known for fulfilling wishes'
    ],
    festivals: ['Hanuman Jayanti', 'Saturdays'],
    address: 'Nanganallur, Chennai, Tamil Nadu 600061',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Nanganallur',
    latitude: 12.9800,
    longitude: 80.2000,
    contact_phone: '+91-44-22261234',
    website: '',
    images: ['anjaneyar-1.jpg', 'anjaneyar-2.jpg'],
    capacity: 500,
    current_occupancy: 300,
    rating: 4.6,
    review_count: 850,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-30',
    name: 'Sringeri Sharadamba Temple',
    deity: 'Sharadamba',
    description: 'A temple built by Sri Sringeri Mutt, dedicated to Goddess Sharadamba. Located in T. Nagar.',
    history: 'Built by Sri Mahasannidhanam nearly 40 years ago by His Holiness Jagadguru Sri Bharathi Theertha Mahaswamigal.',
    significance: 'Part of the Sringeri Mutt tradition, known for its peaceful atmosphere and spiritual teachings.',
    architecture: 'Traditional South Indian temple architecture.',
    legends: [
      'Built by the Sringeri Mutt',
      'Known for its peaceful and spiritual atmosphere',
      'Center for learning and devotion'
    ],
    festivals: ['Navaratri', 'Sharadamba Jayanti'],
    address: 'Thyagaraya Nagar (T.Nagar), Chennai, Tamil Nadu 600017',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'T. Nagar',
    latitude: 13.0400,
    longitude: 80.2400,
    contact_phone: '+91-44-28151234',
    website: '',
    images: ['sharadamba-1.jpg', 'sharadamba-2.jpg'],
    capacity: 300,
    current_occupancy: 150,
    rating: 4.4,
    review_count: 500,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-31',
    name: 'Sree Ayyappan-Guruvayurappan Temple',
    deity: 'Ayyappan, Guruvayurappan',
    description: 'The first Ayyappan temple in Chennai, built in Mahalingapuram. Also houses shrines for Lord Muruga and Lord Vinayaka.',
    history: 'Built 30 years ago by Sree Ayyappa Bhaktha Sabha. The first temple dedicated to Lord Ayyappan in Chennai.',
    significance: 'First Ayyappan temple in Chennai, built in Tamil-Kerala architectural blend.',
    architecture: 'Blend of Tamil and Kerala architectural styles.',
    legends: [
      'First Ayyappan temple in Chennai',
      'Built by Ayyappan devotees',
      'Known for Kerala-style poojas and rituals'
    ],
    festivals: ['Makaravilakku', 'Karthigai', 'Mandala Pooja'],
    address: 'Mahalingapuram, Nungambakkam, Chennai, Tamil Nadu 600034',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Mahalingapuram',
    latitude: 13.0600,
    longitude: 80.2400,
    contact_phone: '+91-44-28231234',
    website: '',
    images: ['ayyappan-1.jpg', 'ayyappan-2.jpg'],
    capacity: 400,
    current_occupancy: 250,
    rating: 4.5,
    review_count: 700,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-32',
    name: 'Vedapureeswarar Temple',
    deity: 'Shiva',
    description: 'One of the 276 Devara Paadal Petra Shiva Sthalams, dedicated to Lord Shiva. Located in Thiruverkadu.',
    history: 'Believed to be 1300 years old, praised by the eminent poet Thirugnanasambanthar. Birthplace of Saint Moorka Nayanar.',
    significance: '23rd Shiva Sthalam in Thondai Nadu. The presiding deity is a Swayambu Lingam.',
    architecture: 'Unique Gaja Brishtam style Vimana. Ancient architecture dating back 1300 years.',
    legends: [
      'Birthplace of Saint Moorka Nayanar, one of the 63 Nayanmars',
      'The presiding deity is a Swayambu Lingam',
      'Praised by Thirugnanasambanthar in his hymns'
    ],
    festivals: ['Brahmotsavam', 'Mahashivratri', 'Pradhosham'],
    address: 'Thiruverkadu, Chennai, Tamil Nadu 600077',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Thiruverkadu',
    latitude: 13.1500,
    longitude: 80.1500,
    contact_phone: '+91-44-26801234',
    website: '',
    images: ['vedapureeswarar-1.jpg', 'vedapureeswarar-2.jpg'],
    capacity: 600,
    current_occupancy: 350,
    rating: 4.6,
    review_count: 900,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-33',
    name: 'Arupadai Veedu Murugan Temple',
    deity: 'Murugan',
    description: 'A unique temple housing all six army camps of Lord Muruga under one roof. Located in Besant Nagar.',
    history: 'Construction started in 1995 and was completed by 2002. Houses all six forms of Lord Muruga.',
    significance: 'The only temple in Chennai that houses all six forms of Lord Muruga under one roof.',
    architecture: 'Modern Dravidian architecture with separate shrines for each form of Muruga.',
    legends: [
      'Houses all six forms of Lord Muruga',
      'Known as Arupadai Veedu (Six Abodes)',
      'Popular during Thai Poosam and Kavadi festivals'
    ],
    festivals: ['Thai Poosam', 'Skanda Shashti', 'Vaikasi Visakam'],
    address: 'Besant Nagar, Chennai, Tamil Nadu 600090',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Besant Nagar',
    latitude: 12.9980,
    longitude: 80.2700,
    contact_phone: '+91-44-24912345',
    website: '',
    images: ['arupadai-1.jpg', 'arupadai-2.jpg'],
    capacity: 800,
    current_occupancy: 500,
    rating: 4.7,
    review_count: 1200,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-34',
    name: 'Sri Anantha Padmanabha Swamy Temple',
    deity: 'Vishnu',
    description: 'A temple built in 1962, resembling the Sri Ananthapadmanabha Swamy temple in Trivandrum, Kerala.',
    history: 'Built in 1962 as a replica of the famous temple in Trivandrum.',
    significance: 'Replica of the famous Ananthapadmanabha Swamy temple, bringing Kerala temple culture to Chennai.',
    architecture: 'Kerala-style architecture with beautiful carvings.',
    legends: [
      'Replica of the famous Trivandrum temple',
      'Known for its peaceful atmosphere',
      'Devotees come here seeking blessings of Lord Padmanabha'
    ],
    festivals: ['Vaikunta Ekadashi', 'Brahmotsavam'],
    address: 'Adyar, Chennai, Tamil Nadu 600020',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Adyar',
    latitude: 13.0100,
    longitude: 80.2600,
    contact_phone: '+91-44-24411234',
    website: '',
    images: ['padmanabha-1.jpg', 'padmanabha-2.jpg'],
    capacity: 500,
    current_occupancy: 300,
    rating: 4.5,
    review_count: 650,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-35',
    name: 'Mathyakailash Temple',
    deity: 'Ganesha',
    description: 'Also known as Nadukailai, one of the most visited temples in Chennai. Lord Ganesha sits in the centre.',
    history: 'A popular temple known for its unique architecture with Lord Ganesha in the center.',
    significance: 'One of the most visited temples in Chennai, known for its powerful Ganesha deity.',
    architecture: 'Unique architecture with Lord Ganesha in the center, surrounded by other deities.',
    legends: [
      'Lord Ganesha sits in the center',
      'Known as Nadukailai',
      'One of the most visited temples in Chennai'
    ],
    festivals: ['Vinayaka Chaturthi', 'Ganesh Chaturthi'],
    address: 'Sardar Patel Road, Adyar, Chennai, Tamil Nadu 600020',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Adyar',
    latitude: 13.0100,
    longitude: 80.2600,
    contact_phone: '+91-44-24411234',
    website: '',
    images: ['mathyakailash-1.jpg', 'mathyakailash-2.jpg'],
    capacity: 600,
    current_occupancy: 400,
    rating: 4.6,
    review_count: 1100,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-36',
    name: 'Shirdi Sai Baba Temple',
    deity: 'Sai Baba',
    description: 'One of the prominent Sai Baba temples in Chennai, located in Mylapore.',
    history: 'Built in memory of the revered saint Sai Baba of Shirdi.',
    significance: 'One of the important Sai Baba temples in Chennai, visited by devotees seeking peace and blessings.',
    architecture: 'Modern temple architecture dedicated to Sai Baba.',
    legends: [
      'Dedicated to Sai Baba of Shirdi',
      'Known for its peaceful atmosphere',
      'Devotees come here seeking blessings'
    ],
    festivals: ['Guru Purnima', 'Rama Navami', 'Dussehra'],
    address: 'Venkatesa Agraharam, Mylapore, Chennai, Tamil Nadu 600004',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Mylapore',
    latitude: 13.0339,
    longitude: 80.2628,
    contact_phone: '+91-44-24941234',
    website: '',
    images: ['saibaba-1.jpg', 'saibaba-2.jpg'],
    capacity: 500,
    current_occupancy: 300,
    rating: 4.5,
    review_count: 800,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-37',
    name: 'Thirumalai Thirupathi Devasthanam Temple',
    deity: 'Venkateswara',
    description: 'A branch temple of the famous Tirumala Tirupati Devasthanam, located in T. Nagar.',
    history: 'Branch temple of the world-renowned Tirumala Tirupati temple.',
    significance: 'Allows devotees to worship Lord Venkateswara without traveling to Tirumala.',
    architecture: 'Replica architecture of the Tirumala temple.',
    legends: [
      'Branch of the famous Tirumala temple',
      'Devotees can worship here without going to Tirumala',
      'Known for fulfilling wishes'
    ],
    festivals: ['Brahmotsavam', 'Vaikunta Ekadashi'],
    address: 'Venkata Narayana Road, T.Nagar, Chennai, Tamil Nadu 600017',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'T. Nagar',
    latitude: 13.0400,
    longitude: 80.2400,
    contact_phone: '+91-44-28151234',
    website: '',
    images: ['tirupati-1.jpg', 'tirupati-2.jpg'],
    capacity: 1000,
    current_occupancy: 700,
    rating: 4.7,
    review_count: 1500,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'temple-38',
    name: 'Mangadu Kamakshiamman Temple',
    deity: 'Kamakshi Amman',
    description: 'A famous temple dedicated to Goddess Kamakshi Amman, known for its spiritual significance.',
    history: 'Ancient temple dedicated to the Divine Mother Shakti as Kamakshi Amman.',
    significance: 'Known for its powerful deity and spiritual significance.',
    architecture: 'Traditional South Indian temple architecture.',
    legends: [
      'Dedicated to Goddess Kamakshi',
      'Known for fulfilling wishes',
      'Popular among devotees seeking blessings'
    ],
    festivals: ['Navaratri', 'Pongal', 'Diwali'],
    address: 'Mangadu, Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    locality: 'Mangadu',
    latitude: 13.0800,
    longitude: 80.1000,
    contact_phone: '+91-44-26801234',
    website: '',
    images: ['kamakshi-1.jpg', 'kamakshi-2.jpg'],
    capacity: 600,
    current_occupancy: 400,
    rating: 4.6,
    review_count: 950,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Mock Pooja Timings
export const mockPoojaTimings: PoojaTiming[] = [
  {
    id: 'timing-1',
    temple_id: 'temple-1',
    name: 'Suprabhatam',
    start_time: '05:00',
    end_time: '05:30',
    description: 'Morning awakening ceremony',
    is_special: false,
    day_of_week: [0, 1, 2, 3, 4, 5, 6],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'timing-2',
    temple_id: 'temple-1',
    name: 'Abhishekam',
    start_time: '06:00',
    end_time: '07:00',
    description: 'Sacred bath ceremony',
    is_special: false,
    day_of_week: [0, 1, 2, 3, 4, 5, 6],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'timing-3',
    temple_id: 'temple-1',
    name: 'Morning Darshan',
    start_time: '08:00',
    end_time: '12:00',
    description: 'Morning temple visit',
    is_special: false,
    day_of_week: [0, 1, 2, 3, 4, 5, 6],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'timing-4',
    temple_id: 'temple-1',
    name: 'Evening Darshan',
    start_time: '16:00',
    end_time: '20:00',
    description: 'Evening temple visit',
    is_special: false,
    day_of_week: [0, 1, 2, 3, 4, 5, 6],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'timing-5',
    temple_id: 'temple-1',
    name: 'Arti',
    start_time: '20:00',
    end_time: '20:30',
    description: 'Evening prayer ceremony',
    is_special: false,
    day_of_week: [0, 1, 2, 3, 4, 5, 6],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    temple_id: 'temple-1',
    user_id: 'user-1',
    rating: 5,
    comment: 'Amazing temple with beautiful architecture. The spiritual atmosphere is incredible.',
    visit_date: '2024-01-15',
    images: [],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    user_name: 'Dev User',
      user_avatar: undefined
  },
  {
    id: 'review-2',
    temple_id: 'temple-1',
    user_id: 'user-1',
    rating: 4,
    comment: 'Very peaceful place. The temple timings are well organized.',
    visit_date: '2024-01-20',
    images: [],
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    user_name: 'Dev User',
      user_avatar: undefined
  },
  {
    id: 'review-3',
    temple_id: 'temple-2',
    user_id: 'user-1',
    rating: 5,
    comment: 'One of the most sacred places I have visited. The darshan was divine.',
    visit_date: '2024-02-01',
    images: [],
    created_at: '2024-02-01T08:00:00Z',
    updated_at: '2024-02-01T08:00:00Z',
    user_name: 'Dev User',
      user_avatar: undefined
  }
]

// Mock Data Service
export class MockDataService {
  private static instance: MockDataService
  private favorites: Set<string> = new Set()
  private currentUser: User = mockUsers[0]

  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService()
    }
    return MockDataService.instance
  }

  // Auth functions
  async signIn(_email: string, _password: string) {
    // Mock authentication - always succeeds for demo
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { user: this.currentUser, error: null }
  }

  async signUp(email: string, _password: string, name: string) {
    // Mock registration - always succeeds for demo
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newUser = { ...this.currentUser, email, name }
    return { user: newUser, error: null }
  }

  async signOut() {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { error: null }
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser
  }

  // Temple functions
  async getTemples(filters?: { deity?: string; state?: string; city?: string; rating_min?: number; limit?: number }): Promise<Temple[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let filteredTemples = [...mockTemples]
    
    if (filters?.deity) {
      filteredTemples = filteredTemples.filter(temple => 
        temple.deity.toLowerCase().includes(filters.deity!.toLowerCase())
      )
    }
    
    if (filters?.state) {
      filteredTemples = filteredTemples.filter(temple => 
        temple.state.toLowerCase().includes(filters.state!.toLowerCase())
      )
    }
    
    if (filters?.city) {
      filteredTemples = filteredTemples.filter(temple => 
        temple.city.toLowerCase().includes(filters.city!.toLowerCase())
      )
    }
    
    if (filters?.rating_min) {
      filteredTemples = filteredTemples.filter(temple => 
        temple.rating >= filters.rating_min!
      )
    }
    
    if (filters?.limit) {
      filteredTemples = filteredTemples.slice(0, filters.limit)
    }
    
    return filteredTemples
  }

  async getTempleById(id: string): Promise<Temple | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockTemples.find(temple => temple.id === id) || null
  }

  async searchTemples(query: string, filters?: SearchFilters): Promise<Temple[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const searchTerms = query.toLowerCase().split(' ')
    let results = mockTemples.filter(temple => {
      const searchableText = `${temple.name} ${temple.deity} ${temple.city} ${temple.state} ${temple.description}`.toLowerCase()
      return searchTerms.some(term => searchableText.includes(term))
    })
    
    // Apply additional filters
    if (filters?.deity) {
      results = results.filter(temple => 
        temple.deity.toLowerCase().includes(filters.deity!.toLowerCase())
      )
    }
    
    if (filters?.location?.state) {
      results = results.filter(temple => 
        temple.state.toLowerCase().includes(filters.location!.state!.toLowerCase())
      )
    }
    
    if (filters?.location?.city) {
      results = results.filter(temple => 
        temple.city.toLowerCase().includes(filters.location!.city!.toLowerCase())
      )
    }
    
    if (filters?.rating_min) {
      results = results.filter(temple => temple.rating >= filters.rating_min!)
    }
    
    return results
  }

  // Category functions
  async getDeityCategories(): Promise<DeityCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockCategories
  }

  // Pooja Timings
  async getTempleTimings(templeId: string): Promise<PoojaTiming[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockPoojaTimings.filter(timing => timing.temple_id === templeId)
  }

  // Reviews
  async getTempleReviews(templeId: string): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockReviews.filter(review => review.temple_id === templeId)
  }

  async addReview(templeId: string, userId: string, rating: number, comment: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newReview: Review = {
      id: `review-${Date.now()}`,
      temple_id: templeId,
      user_id: userId,
      rating,
      comment,
      visit_date: new Date().toISOString().split('T')[0],
      images: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_name: this.currentUser.name,
      user_avatar: this.currentUser.avatar_url || undefined
    }
    
    mockReviews.push(newReview)
    
    // Update temple rating
    const temple = mockTemples.find(t => t.id === templeId)
    if (temple) {
      const templeReviews = mockReviews.filter(r => r.temple_id === templeId)
      const avgRating = templeReviews.reduce((sum, r) => sum + r.rating, 0) / templeReviews.length
      temple.rating = Math.round(avgRating * 10) / 10
      temple.review_count = templeReviews.length
    }
  }

  // Favorites
  async toggleFavorite(_userId: string, templeId: string, isFavorite: boolean): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (isFavorite) {
      this.favorites.add(templeId)
    } else {
      this.favorites.delete(templeId)
    }
  }

  async getUserFavorites(_userId: string): Promise<Temple[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockTemples.filter(temple => this.favorites.has(temple.id))
  }

  async checkIsFavorite(_userId: string, templeId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.favorites.has(templeId)
  }
}

// Export singleton instance
export const mockDataService = MockDataService.getInstance()
