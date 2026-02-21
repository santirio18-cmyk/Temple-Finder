// Festival Service for Temple Finder
// This service provides festival information for temples

export interface Festival {
  id: string
  name: string
  description: string
  date: string
  temple_ids: string[]
  significance: string
  special_events: string[]
  duration: string
  month: string
}

export const mockFestivals: Festival[] = [
  {
    id: 'festival-1',
    name: 'Mahashivratri',
    description: 'The Great Night of Shiva, celebrated with special prayers and offerings',
    date: 'March 8, 2024',
    temple_ids: ['temple-1', 'temple-3', 'temple-6', 'temple-11', 'temple-14', 'temple-20'],
    significance: 'Celebrates the divine marriage of Lord Shiva and Goddess Parvati',
    special_events: ['Rudrabhishekam', 'Special Aarti', 'Prasad Distribution'],
    duration: '1 Day',
    month: 'March'
  },
  {
    id: 'festival-2',
    name: 'Navaratri',
    description: 'Nine nights dedicated to Goddess Durga in various forms',
    date: 'October 3-12, 2024',
    temple_ids: ['temple-1', 'temple-18', 'temple-19'],
    significance: 'Celebrates the victory of good over evil',
    special_events: ['Garba Dance', 'Durga Puja', 'Vijayadashami'],
    duration: '9 Days',
    month: 'October'
  },
  {
    id: 'festival-3',
    name: 'Ganesh Chaturthi',
    description: 'Birthday celebration of Lord Ganesha',
    date: 'September 7, 2024',
    temple_ids: ['temple-15'],
    significance: 'Celebrates the birth of Lord Ganesha',
    special_events: ['Ganpati Visarjan', 'Modak Distribution', 'Special Prayers'],
    duration: '10 Days',
    month: 'September'
  },
  {
    id: 'festival-4',
    name: 'Vaikuntha Ekadashi',
    description: 'The day when the gates of Vaikuntha are opened',
    date: 'December 22, 2024',
    temple_ids: ['temple-2', 'temple-12', 'temple-17'],
    significance: 'Believed to be the day when Lord Vishnu opens the gates of heaven',
    special_events: ['Special Darshan', 'Prasad Distribution', 'Vedic Chants'],
    duration: '1 Day',
    month: 'December'
  },
  {
    id: 'festival-5',
    name: 'Skanda Sashti',
    description: 'Celebration of Lord Murugan\'s victory over evil',
    date: 'November 8, 2024',
    temple_ids: ['temple-9', 'temple-10'],
    significance: 'Celebrates Lord Murugan\'s victory over the demon Soorapadman',
    special_events: ['Kavadi Attam', 'Vel Puja', 'Special Abhishekam'],
    duration: '6 Days',
    month: 'November'
  },
  {
    id: 'festival-6',
    name: 'Rath Yatra',
    description: 'Chariot festival of Lord Jagannath',
    date: 'July 7, 2024',
    temple_ids: ['temple-8'],
    significance: 'Annual journey of Lord Jagannath, Balabhadra, and Subhadra',
    special_events: ['Chariot Pulling', 'Prasad Distribution', 'Cultural Programs'],
    duration: '9 Days',
    month: 'July'
  },
  {
    id: 'festival-7',
    name: 'Ambubachi Mela',
    description: 'Annual fertility festival at Kamakhya Temple',
    date: 'June 22-26, 2024',
    temple_ids: ['temple-19'],
    significance: 'Celebrates the annual menstruation of Goddess Kamakhya',
    special_events: ['Tantric Rituals', 'Fair and Cultural Programs'],
    duration: '4 Days',
    month: 'June'
  },
  {
    id: 'festival-8',
    name: 'Guru Purnima',
    description: 'Day dedicated to spiritual teachers and gurus',
    date: 'July 21, 2024',
    temple_ids: ['temple-16'],
    significance: 'Honors spiritual teachers and gurus',
    special_events: ['Guru Vandana', 'Special Prayers', 'Prasad Distribution'],
    duration: '1 Day',
    month: 'July'
  }
]

export class FestivalService {
  static getFestivalsForTemple(templeId: string): Festival[] {
    return mockFestivals.filter(festival => 
      festival.temple_ids.includes(templeId)
    )
  }

  static getUpcomingFestivals(): Festival[] {
    // Return festivals sorted by date
    return mockFestivals.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }

  static getFestivalsByMonth(month: string): Festival[] {
    return mockFestivals.filter(festival => 
      festival.month.toLowerCase() === month.toLowerCase()
    )
  }

  static searchFestivals(query: string): Festival[] {
    const lowerQuery = query.toLowerCase()
    return mockFestivals.filter(festival =>
      festival.name.toLowerCase().includes(lowerQuery) ||
      festival.description.toLowerCase().includes(lowerQuery) ||
      festival.significance.toLowerCase().includes(lowerQuery)
    )
  }
}
