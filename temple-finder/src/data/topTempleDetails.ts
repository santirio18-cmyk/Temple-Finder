import type { Temple } from '../data'

/** Rich detail overlays for famous Chennai temples (merged by id). */
export const topTempleDetailsById: Record<string, Partial<Temple>> = {
  '156': {
    deity: 'Murugan',
    description:
      'One of Chennai\'s most visited Murugan temples, known for blessing devotees who climb the hill shrine. Famous for archanai, abhishekam, and wish-fulfilling prayers.',
    openingHours: '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    phoneNumber: '+91 044 2483 0205',
    festivals: ['Thai Poosam', 'Panguni Uthiram', 'Skanda Sashti', 'Vaikasi Visakam'],
    specialSignificance:
      'A powerful hill temple where Lord Murugan is worshipped as the remover of obstacles. Devotees often carry kavadi and offer prayers before new beginnings.',
    parking: true,
    photographyAllowed: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Vadapalani_Murugan_Temple.jpg',
  },
  '177': {
    deity: 'Vishnu',
    description:
      'Ancient Parthasarathy temple in Triplicane, one of the 108 Divya Desams. Lord Krishna is worshipped here as the charioteer of Arjuna.',
    openingHours: '5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    festivals: ['Vaikunta Ekadashi', 'Brahmotsavam', 'Ratha Sapthami', 'Krishna Jayanthi'],
    specialSignificance:
      'Among the oldest surviving temples in Chennai, with Pallava origins and deep connections to the Alwar saints.',
    parking: false,
    photographyAllowed: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Parthasarathy-Temple-Triplicane-Chennai-1.JPG',
  },
  '101': {
    deity: 'Hanuman',
    description:
      'Iconic 32-foot Hanuman temple in Nanganallur, beloved for strength, protection, and relief from planetary afflictions.',
    openingHours: '5:00 AM - 12:00 PM, 4:30 PM - 9:00 PM',
    festivals: ['Hanuman Jayanthi', 'Rama Navami', 'Deepavali'],
    specialSignificance:
      'One of the tallest Hanuman murtis in India; devotees visit for courage, health, and overcoming difficulties.',
    parking: true,
    photographyAllowed: true,
  },
  '83': {
    deity: 'Shiva',
    description:
      'Sacred Shiva temple in Thiruvanmiyur where the Lord is worshipped as the divine physician (Marundeeswarar).',
    openingHours: '5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    festivals: ['Maha Shivaratri', 'Thai Poosam', 'Arudra Darshanam'],
    specialSignificance:
      'Believed to grant healing and wellbeing; the temple tank and seaside setting make it a serene pilgrimage spot.',
    parking: true,
    photographyAllowed: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Arulmigu_Marundeeswarar_Temple_tower%2C_Tiruvanmiyur.jpg',
  },
  '33': {
    deity: 'Shiva',
    description:
      'Historic Kalikambal Kamadeswarar temple in George Town, associated with Chennai\'s mercantile heritage and Goddess Kalikambal.',
    openingHours: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    festivals: ['Navaratri', 'Aadi Pooram', 'Maha Shivaratri'],
    specialSignificance:
      'A centuries-old temple in the heart of old Chennai, revered for Shakti worship and prosperity blessings.',
    parking: false,
    photographyAllowed: false,
  },
  '293': {
    deity: 'Lakshmi',
    description:
      'Stunning seaside Ashtalakshmi temple in Besant Nagar, dedicated to Goddess Lakshmi in her eight divine forms.',
    openingHours: '6:30 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    festivals: ['Navaratri', 'Deepavali', 'Varalakshmi Vratham'],
    specialSignificance:
      'Built overlooking the Bay of Bengal, it is a favourite for prosperity prayers and evening darshan.',
    parking: true,
    photographyAllowed: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Ashtalakshmi_Temple_Kothapet.jpg',
  },
  '201': {
    deity: 'Devi',
    description:
      'Powerful Karumariamman temple at Thiruverkadu, worshipped as the mother goddess who protects families and removes afflictions.',
    openingHours: '5:00 AM - 12:30 PM, 4:00 PM - 9:00 PM',
    festivals: ['Aadi Pooram', 'Navaratri', 'Thai Poosam'],
    specialSignificance:
      'A major Amman shrine in Chennai\'s outskirts, especially visited for health, marriage, and child blessings.',
    parking: true,
    photographyAllowed: true,
  },
  '87': {
    deity: 'Shiva',
    description:
      'Thyagarajaswamy temple in Tiruvottiyur, a Paadal Petra Sthalam glorified by the Nayanmars and the Thevaram hymns.',
    openingHours: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    festivals: ['Thyagaraja Aradhana', 'Maha Shivaratri', 'Brahmotsavam'],
    specialSignificance:
      'One of Chennai\'s great Shiva sthalams with a massive temple complex and deep Saivite tradition.',
    parking: true,
    photographyAllowed: false,
  },
  '158': {
    deity: 'Murugan',
    description:
      'Beautiful Murugan temple in Besant Nagar modelled on the six abodes (Arupadai Veedu) of Lord Murugan.',
    openingHours: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    festivals: ['Skanda Sashti', 'Thai Poosam', 'Vaikasi Visakam'],
    specialSignificance:
      'A serene shrine near the beach, popular for Murugan worship and evening prayers.',
    parking: true,
    photographyAllowed: true,
  },
}

export const TOP_TEMPLE_IDS = new Set(['84', ...Object.keys(topTempleDetailsById)])
