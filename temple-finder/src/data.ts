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

export interface Festival {
  id: string
  name: string
  dateLabel: string
  description: string
}

export const upcomingFestivals: Festival[] = [
  {
    id: 'f1',
    name: 'Panguni Uthiram',
    dateLabel: 'Mar–Apr',
    description: 'Celebration of divine marriages; Murugan temples across Tamil Nadu.',
  },
  {
    id: 'f2',
    name: 'Chithirai Brahmotsavam',
    dateLabel: 'Apr–May',
    description: 'Meenakshi–Sundareswarar festival in Madurai.',
  },
  {
    id: 'f3',
    name: 'Karthigai Deepam',
    dateLabel: 'Nov–Dec',
    description: 'Lamps and lamps on sacred hills; Thiruvannamalai and temples statewide.',
  },
]

// All Temples Data - 100+ Chennai Temples
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
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/MylaporeKapaleeshwararTemple.jpg'
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
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Parthasarathy-Temple-Triplicane-Chennai-1.JPG'
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
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Arulmigu_Marundeeswarar_Temple_tower%2C_Tiruvanmiyur.jpg'
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
    rating: 4.9,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Vadapalani_Murugan_Temple.jpg'
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
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Ashtalakshmi_Temple_Kothapet.jpg'
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
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Parthasarathy-Temple-Triplicane-Chennai-1.JPG'
  },
  {
    id: '11',
    name: 'Kalikambal Temple',
    deity: 'Devi',
    description: 'Historic temple dedicated to Goddess Kalikambal, established in 1640, located in George Town.',
    address: 'Thambu Chetty Street, George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0946,
    longitude: 80.2891,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kalikambal_Temple_Chennai.jpg/800px-Kalikambal_Temple_Chennai.jpg'
  },
  {
    id: '12',
    name: 'ISKCON Chennai',
    deity: 'Krishna',
    description: 'Sri Sri Radha Krishna Temple, a modern ISKCON temple inaugurated in 2012, featuring beautiful architecture.',
    address: 'Sholinganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9061,
    longitude: 80.2417,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/ISKCON_Temple_Chennai.jpg/800px-ISKCON_Temple_Chennai.jpg'
  },
  {
    id: '13',
    name: 'Mundakakanni Amman Temple',
    deity: 'Devi',
    description: 'Popular Mariamman temple in Mylapore, known for its powerful deity and visited by many devotees.',
    address: 'R.K. Mutt Road, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0358,
    longitude: 80.2686,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Mundakakanni_Amman_Temple.jpg/800px-Mundakakanni_Amman_Temple.jpg'
  },
  {
    id: '14',
    name: 'Thiruvottiyur Thyagaraja Swamy Temple',
    deity: 'Shiva',
    description: 'One of the most ancient Shiva temples in Chennai, located in Thiruvottiyur near the coast.',
    address: 'Thiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1573,
    longitude: 80.3014,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Thiruvottiyur_Temple_Tower.jpg/800px-Thiruvottiyur_Temple_Tower.jpg'
  },
  {
    id: '15',
    name: 'Velleeswarar Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Mylapore, one of the 275 Paadal Petra Sthalams sung by Tamil saints.',
    address: 'Srinivasa Pillai Street, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0356,
    longitude: 80.2678,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Velleeswarar_Temple_Mylapore.jpg/800px-Velleeswarar_Temple_Mylapore.jpg'
  },
  {
    id: '16',
    name: 'Nanganallur Hanuman Temple',
    deity: 'Hanuman',
    description: 'Famous for its 32-foot tall Hanuman statue, one of the tallest Hanuman idols in South India.',
    address: 'Meenakshi Amman Koil Street, Nanganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9789,
    longitude: 80.1933,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Nanganallur_Hanuman_Temple.jpg/800px-Nanganallur_Hanuman_Temple.jpg'
  },
  {
    id: '17',
    name: 'Santhome Cathedral Basilica',
    deity: 'Other',
    description: 'Historic Roman Catholic basilica built over the tomb of St. Thomas the Apostle.',
    address: 'Santhome High Road, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0333,
    longitude: 80.2778,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Santhome_Cathedral_Basilica.jpg/800px-Santhome_Cathedral_Basilica.jpg'
  },
  {
    id: '18',
    name: 'Ramakrishna Math Chennai',
    deity: 'Other',
    description: 'Famous spiritual center and temple dedicated to Sri Ramakrishna Paramahamsa, a landmark in Mylapore.',
    address: 'Ramakrishna Mutt Road, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0344,
    longitude: 80.2686,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Ramakrishna_Math_Chennai.jpg/800px-Ramakrishna_Math_Chennai.jpg'
  },
  {
    id: '19',
    name: 'Palavanthangal Sivan Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple known for its beautiful architecture and peaceful atmosphere.',
    address: 'Palavanthangal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0528,
    longitude: 80.1739,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Palavanthangal_Temple.jpg/800px-Palavanthangal_Temple.jpg'
  },
  {
    id: '20',
    name: 'Karaneeswarar Temple',
    deity: 'Shiva',
    description: 'Historic Shiva temple in Saidapet, known for its architectural beauty.',
    address: 'Saidapet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0217,
    longitude: 80.2242,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Chennai_karaneswarar_temple.jpg/800px-Chennai_karaneswarar_temple.jpg'
  },
  {
    id: '21',
    name: 'Mallikeswarar Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Mylapore, known for its architectural significance and peaceful atmosphere.',
    address: 'Kamarajapuram, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0336,
    longitude: 80.2697,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mallikeswarar_Temple.jpg/800px-Mallikeswarar_Temple.jpg'
  },
  {
    id: '22',
    name: 'Kachchaleeswarar Temple',
    deity: 'Shiva',
    description: 'Historic Shiva temple known for its connection to the legend of Kamakshi.',
    address: 'Poonamallee, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0467,
    longitude: 80.0928,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Kachchaleswarar_Temple.jpg/800px-Kachchaleswarar_Temple.jpg'
  },
  {
    id: '23',
    name: 'Kandaswamy Temple Kandhan Kott',
    deity: 'Murugan',
    description: 'Popular Murugan temple known for its grand chariot festival and beautiful architecture.',
    address: 'Kandhan Kottam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0881,
    longitude: 80.2636,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Kandaswamy_Temple_Kandhan_Kottam.jpg/800px-Kandaswamy_Temple_Kandhan_Kottam.jpg'
  },
  {
    id: '24',
    name: 'Agatheeswarar Temple',
    deity: 'Shiva',
    description: 'Ancient temple dedicated to Lord Shiva, associated with Sage Agasthya.',
    address: 'Puzhal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.2033,
    longitude: 80.1600,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Agatheeswarar_Temple.jpg/800px-Agatheeswarar_Temple.jpg'
  },
  {
    id: '25',
    name: 'Mangadu Kamakshi Amman Temple',
    deity: 'Devi',
    description: 'Famous Goddess Kamakshi temple, one of the Shakti Peethas near Chennai.',
    address: 'Mangadu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0314,
    longitude: 80.1081,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Mangadu_Kamakshi_Temple.jpg/800px-Mangadu_Kamakshi_Temple.jpg'
  },
  {
    id: '26',
    name: 'Narayanapuram Mariamman Temple',
    deity: 'Devi',
    description: 'Popular Mariamman temple known for its annual festival and devotees from across the city.',
    address: 'Narayanapuram, Pallikaranai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9142,
    longitude: 80.1586,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mariamman_Temple_Chennai.jpg/800px-Mariamman_Temple_Chennai.jpg'
  },
  {
    id: '27',
    name: 'Thirumullavoyal Murugan Temple',
    deity: 'Murugan',
    description: 'Historic Murugan temple near the lake, known for its serene setting.',
    address: 'Thirumullavoyal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1264,
    longitude: 80.1456,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Thirumullavoyal_Temple.jpg/800px-Thirumullavoyal_Temple.jpg'
  },
  {
    id: '28',
    name: 'Ekambaranathar Temple Thiruvottr',
    deity: 'Shiva',
    description: 'Ancient Shiva temple, one of the Pancha Bhoota Sthalams representing earth element.',
    address: 'Thiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1569,
    longitude: 80.3011,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Thiruvottiyur_Ekambaranathar.jpg/800px-Thiruvottiyur_Ekambaranathar.jpg'
  },
  {
    id: '29',
    name: 'Thiruvotriyur Vadivudaiamman',
    deity: 'Devi',
    description: 'Powerful Amman temple near the coast, one of the most revered Devi temples in Chennai.',
    address: 'Thiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1575,
    longitude: 80.3017,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vadivudaiamman_Temple.jpg/800px-Vadivudaiamman_Temple.jpg'
  },
  {
    id: '30',
    name: 'Thiruvallikkeni Parthasarathy',
    deity: 'Vishnu',
    description: 'Historic 8th-century Vishnu temple, one of the 108 Divya Desams.',
    address: 'Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0567,
    longitude: 80.2778,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Parthasarathy_Temple_Gopuram.jpg/800px-Parthasarathy_Temple_Gopuram.jpg'
  },
  {
    id: '31',
    name: 'Tiruvalluvar Temple',
    deity: 'Other',
    description: 'Modern temple dedicated to the great Tamil poet-saint Thiruvalluvar.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0350,
    longitude: 80.2683,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Thiruvalluvar_Temple.jpg/800px-Thiruvalluvar_Temple.jpg'
  },
  {
    id: '32',
    name: 'Kotturpuram Kandaswamy Temple',
    deity: 'Murugan',
    description: 'Well-known Murugan temple in South Chennai, popular among devotees.',
    address: 'Kotturpuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0089,
    longitude: 80.2475,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kotturpuram_Temple.jpg/800px-Kotturpuram_Temple.jpg'
  },
  {
    id: '33',
    name: 'Adyar Anantha Padmanabha Swamy',
    deity: 'Vishnu',
    description: 'Beautiful Vishnu temple in Adyar, dedicated to Lord Padmanabha in reclining posture.',
    address: 'Adyar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0122,
    longitude: 80.2567,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Adyar_Anantha_Padmanabhaswamy.jpg/800px-Adyar_Anantha_Padmanabhaswamy.jpg'
  },
  {
    id: '34',
    name: 'Kalikambal Kameswarar Temple',
    deity: 'Devi',
    description: 'Twin temple dedicated to Goddess Kalikambal and Lord Kameswara.',
    address: 'Sowcarpet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0892,
    longitude: 80.2819,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Kalikambal_Kameswara_Temple.jpg/800px-Kalikambal_Kameswara_Temple.jpg'
  },
  {
    id: '35',
    name: 'Singaperumal Koil',
    deity: 'Vishnu',
    description: 'Historic Vishnu temple near Chennai, dedicated to Narasimha avatar.',
    address: 'Singaperumal Koil, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.7492,
    longitude: 80.0072,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Singaperumalkoil_Temple.jpg/800px-Singaperumalkoil_Temple.jpg'
  },
  {
    id: '36',
    name: 'Porur Murugan Temple',
    deity: 'Murugan',
    description: 'Famous Murugan temple in West Chennai, known for its grand festivals.',
    address: 'Porur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0361,
    longitude: 80.1558,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Porur_Murugan_Temple.jpg/800px-Porur_Murugan_Temple.jpg'
  },
  {
    id: '37',
    name: 'Tiruvotriyur Aadhipureeswarar',
    deity: 'Shiva',
    description: 'Ancient Shiva temple, revered as one of the most sacred temples in Chennai.',
    address: 'Thiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1572,
    longitude: 80.3012,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Aadhipureeswarar_Temple.jpg/800px-Aadhipureeswarar_Temple.jpg'
  },
  {
    id: '38',
    name: 'Nochikuppam Maariamman Temple',
    deity: 'Devi',
    description: 'Ancient Mariamman temple in the fishing village of Nochikuppam.',
    address: 'Nochikuppam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0672,
    longitude: 80.2881,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nochikuppam_Temple.jpg/800px-Nochikuppam_Temple.jpg'
  },
  {
    id: '39',
    name: 'Ambattur Ekambareswarar Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Ambattur, known for its historical significance.',
    address: 'Ambattur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1133,
    longitude: 80.1550,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ambattur_Ekambareswarar.jpg/800px-Ambattur_Ekambareswarar.jpg'
  },
  {
    id: '40',
    name: 'Velankanni Church Chennai',
    deity: 'Other',
    description: 'Famous Catholic shrine dedicated to Our Lady of Health, replica of Velankanni Basilica.',
    address: 'Besant Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0022,
    longitude: 80.2689,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Velankanni_Church_Chennai.jpg/800px-Velankanni_Church_Chennai.jpg'
  },
  {
    id: '41',
    name: 'Palabakkam Murugan Temple',
    deity: 'Murugan',
    description: 'Ancient hilltop Murugan temple near ECR, known for its scenic beauty.',
    address: 'Palabakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.7581,
    longitude: 80.2214,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Palabakkam_Murugan_Temple.jpg/800px-Palabakkam_Murugan_Temple.jpg'
  },
  {
    id: '42',
    name: 'Nageshwara Rao Park Hanuman',
    deity: 'Hanuman',
    description: 'Popular Hanuman temple in a park setting, visited by many devotees daily.',
    address: 'Nungambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0569,
    longitude: 80.2453,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nageswara_Rao_Park_Hanuman.jpg/800px-Nageswara_Rao_Park_Hanuman.jpg'
  },
  {
    id: '43',
    name: 'Veeraraghava Swamy Temple',
    deity: 'Vishnu',
    description: 'Ancient Vishnu temple, one of the 108 Divya Desams sung by Alwars.',
    address: 'Tiruvallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1444,
    longitude: 79.9122,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Veeraraghava_Swamy_Temple.jpg/800px-Veeraraghava_Swamy_Temple.jpg'
  },
  {
    id: '44',
    name: 'Arasaleeswarar Temple',
    deity: 'Shiva',
    description: 'Historic Shiva temple known for its sacred Peepal tree.',
    address: 'Ennore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1333,
    longitude: 80.3058,
    rating: 4.5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Arasaleeswarar_Temple.jpg/800px-Arasaleeswarar_Temple.jpg'
  },
  {
    id: '45',
    name: 'Thirumayilai Mundaka Kanni Amman',
    deity: 'Devi',
    description: 'Powerful Devi temple in Mylapore, sister temple of Kapaleeswarar.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0356,
    longitude: 80.2683,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mundakanni_Amman_Mylapore.jpg/800px-Mundakanni_Amman_Mylapore.jpg'
  },
  {
    id: '46',
    name: 'Thirumazhisai Veeraraghava Temple',
    deity: 'Vishnu',
    description: 'One of the 108 Divya Desams, birthplace of Alwar saint Thirumazhisai Alwar.',
    address: 'Thirumazhisai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1433,
    longitude: 80.0169,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Thirumazhisai_Temple.jpg/800px-Thirumazhisai_Temple.jpg'
  },
  {
    id: '47',
    name: 'Sri Parthasarathy Swamy Temple',
    deity: 'Vishnu',
    description: 'Historic Pallava-era temple dedicated to Krishna as charioteer of Arjuna.',
    address: 'Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0567,
    longitude: 80.2778,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Parthasarathy_Swamy_Temple.jpg/800px-Parthasarathy_Swamy_Temple.jpg'
  },
  {
    id: '48',
    name: 'Karumariamman Temple Thiruverkadu',
    deity: 'Devi',
    description: 'Powerful Mariamman temple, one of the most famous Devi temples in Chennai.',
    address: 'Thiruverkadu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1239,
    longitude: 80.1847,
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Karumariamman_Thiruverkadu.jpg/800px-Karumariamman_Thiruverkadu.jpg'
  },
  {
    id: '49',
    name: 'Kandaswamy Temple Perambur',
    deity: 'Murugan',
    description: 'Popular Murugan temple in North Chennai, known for its vibrant festivals.',
    address: 'Perambur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1119,
    longitude: 80.2383,
    rating: 4.6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Perambur_Kandaswamy.jpg/800px-Perambur_Kandaswamy.jpg'
  },
  {
    id: '50',
    name: 'Thiruvallur Veeraraghava Perumal',
    deity: 'Vishnu',
    description: 'Ancient Vishnu temple and Divya Desam, known for its architectural beauty.',
    address: 'Thiruvallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1444,
    longitude: 79.9122,
    rating: 4.7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thiruvallur_Veeraraghava.jpg/800px-Thiruvallur_Veeraraghava.jpg'
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
    rating: 4.9,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Meenakshi_Amman_Temple%2C_Madurai.JPG'
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
    rating: 5.0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Brihadisvara_Temple%2C_Thanjavur%2C_Tamil_Nadu%2C_India.jpg'
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
    rating: 4.8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Ramanathaswamy_temple7.JPG'
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
    rating: 4.9,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/India_Tamil_Nadu_Palani_Murugan_Hill_Temple_evening.JPG'
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

export function getNearbyTemples(lat: number, lng: number, radiusKm: number = 50): (Temple & { distance: number })[] {
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
