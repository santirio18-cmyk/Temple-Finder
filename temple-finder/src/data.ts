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
    description: 'Ancient temple dedicated to Goddess Kalikambal, located in the heart of Chennai.',
    address: 'George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0897,
    longitude: 80.2851,
    rating: 4.7
  },
  {
    id: '12',
    name: 'Sri Kandaswamy Temple',
    deity: 'Murugan',
    description: 'Historic temple dedicated to Lord Murugan, known for its chariot festival.',
    address: 'Kandanchavadi, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9728,
    longitude: 80.2417,
    rating: 4.6
  },
  {
    id: '13',
    name: 'Mundakakanni Amman Temple',
    deity: 'Devi',
    description: 'Popular temple dedicated to Goddess Mundakakanni, visited by many devotees.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0358,
    longitude: 80.2686,
    rating: 4.7
  },
  {
    id: '14',
    name: 'Nageswara Rao Park Hanuman Temple',
    deity: 'Hanuman',
    description: 'Beautiful Hanuman temple in a peaceful park setting.',
    address: 'Nungambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0569,
    longitude: 80.2453,
    rating: 4.5
  },
  {
    id: '15',
    name: 'Thiruvottiyur Thyagaraja Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple, one of the oldest in Chennai.',
    address: 'Thiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1573,
    longitude: 80.3014,
    rating: 4.7
  },
  {
    id: '16',
    name: 'Kotturpuram Kandaswamy Temple',
    deity: 'Murugan',
    description: 'Well-known Murugan temple in South Chennai.',
    address: 'Kotturpuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0089,
    longitude: 80.2475,
    rating: 4.6
  },
  {
    id: '17',
    name: 'Velleeswarar Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple with beautiful architecture.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0356,
    longitude: 80.2678,
    rating: 4.5
  },
  {
    id: '18',
    name: 'Tiruvallikkeni Parthasarathy Temple',
    deity: 'Vishnu',
    description: 'Famous Vishnu temple, one of the 108 Divya Desams.',
    address: 'Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0567,
    longitude: 80.2778,
    rating: 4.8
  },
  {
    id: '19',
    name: 'Narayanan Temple',
    deity: 'Vishnu',
    description: 'Beautiful temple dedicated to Lord Narayanan.',
    address: 'Nerkundram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0458,
    longitude: 80.1836,
    rating: 4.5
  },
  {
    id: '20',
    name: 'Karaneeswarar Temple',
    deity: 'Shiva',
    description: 'Ancient temple dedicated to Lord Shiva.',
    address: 'Saidapet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0211,
    longitude: 80.2244,
    rating: 4.6
  },
  {
    id: '21',
    name: 'Thiruverkadu Karumariamman Temple',
    deity: 'Devi',
    description: 'Famous temple dedicated to Goddess Karumariamman.',
    address: 'Thiruverkadu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1233,
    longitude: 80.1844,
    rating: 4.8
  },
  {
    id: '22',
    name: 'Nanganallur Anjaneyar Temple',
    deity: 'Hanuman',
    description: 'Tallest Hanuman idol in South India, very famous.',
    address: 'Nanganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9786,
    longitude: 80.1992,
    rating: 4.9
  },
  {
    id: '23',
    name: 'Tiruporur Murugan Temple',
    deity: 'Murugan',
    description: 'Ancient temple dedicated to Lord Murugan.',
    address: 'Tiruporur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.7617,
    longitude: 80.1719,
    rating: 4.7
  },
  {
    id: '24',
    name: 'Sri Lakshmi Narasimha Perumal Temple',
    deity: 'Vishnu',
    description: 'Beautiful temple dedicated to Lord Narasimha.',
    address: 'Adambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9886,
    longitude: 80.2014,
    rating: 4.6
  },
  {
    id: '25',
    name: 'Thirumayilai Mundagakanni Amman Temple',
    deity: 'Devi',
    description: 'Famous Amman temple in Mylapore.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0342,
    longitude: 80.2689,
    rating: 4.7
  },
  {
    id: '26',
    name: 'Periya Palayathamman Temple',
    deity: 'Devi',
    description: 'Ancient goddess temple with grand celebrations.',
    address: 'Periyapalayam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1045,
    longitude: 80.2856,
    rating: 4.5
  },
  {
    id: '27',
    name: 'Annai Velankanni Church',
    deity: 'Other',
    description: 'Beautiful basilica dedicated to Our Lady of Health.',
    address: 'Besant Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0050,
    longitude: 80.2707,
    rating: 4.8
  },
  {
    id: '28',
    name: 'Kapaleeswara Vilakam',
    deity: 'Shiva',
    description: 'Sacred shrine near Kapaleeshwarar temple.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0336,
    longitude: 80.2698,
    rating: 4.6
  },
  {
    id: '29',
    name: 'Adhi Kesava Perumal Temple',
    deity: 'Vishnu',
    description: 'Ancient Vishnu temple with historical significance.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0328,
    longitude: 80.2711,
    rating: 4.7
  },
  {
    id: '30',
    name: 'Mundakakanni Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Popular Ganesh temple visited by students.',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0347,
    longitude: 80.2683,
    rating: 4.6
  },
  {
    id: '31',
    name: 'Sri Jagannath Temple',
    deity: 'Vishnu',
    description: 'Beautiful temple dedicated to Lord Jagannath.',
    address: 'Neelankarai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9512,
    longitude: 80.2608,
    rating: 4.7
  },
  {
    id: '32',
    name: 'Kottai Mariamman Temple',
    deity: 'Devi',
    description: 'Ancient temple dedicated to Goddess Mariamman.',
    address: 'Parrys, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0921,
    longitude: 80.2843,
    rating: 4.6
  },
  {
    id: '33',
    name: 'Dhakshinamurthi Temple',
    deity: 'Shiva',
    description: 'Temple dedicated to Lord Shiva as Dhakshinamurthi.',
    address: 'Thiruvanmiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9825,
    longitude: 80.2625,
    rating: 4.5
  },
  {
    id: '34',
    name: 'Arulmigu Karpagambal Temple',
    deity: 'Devi',
    description: 'Temple dedicated to Goddess Karpagambal.',
    address: 'Nungambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0575,
    longitude: 80.2431,
    rating: 4.6
  },
  {
    id: '35',
    name: 'Tiruttani Murugan Temple',
    deity: 'Murugan',
    description: 'Hill temple dedicated to Lord Murugan.',
    address: 'Tiruttani, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1765,
    longitude: 79.6231,
    rating: 4.8
  },
  {
    id: '36',
    name: 'Kandhakottam Temple',
    deity: 'Murugan',
    description: 'Historic Murugan temple in North Chennai.',
    address: 'George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0893,
    longitude: 80.2867,
    rating: 4.7
  },
  {
    id: '37',
    name: 'Sri Prasanna Venkatesa Perumal Temple',
    deity: 'Vishnu',
    description: 'Beautiful temple dedicated to Lord Venkateswara.',
    address: 'T. Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0417,
    longitude: 80.2339,
    rating: 4.6
  },
  {
    id: '38',
    name: 'Maha Ganapathy Temple',
    deity: 'Ganesh',
    description: 'Grand temple dedicated to Lord Ganesha.',
    address: 'Vadapalani, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0506,
    longitude: 80.2142,
    rating: 4.7
  },
  {
    id: '39',
    name: 'Besant Nagar Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Seaside Ganesh temple in Besant Nagar.',
    address: 'Besant Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0011,
    longitude: 80.2689,
    rating: 4.6
  },
  {
    id: '40',
    name: 'Thirumullaivoyal Mahalakshmi Temple',
    deity: 'Lakshmi',
    description: 'Famous temple dedicated to Goddess Mahalakshmi.',
    address: 'Thirumullaivoyal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1250,
    longitude: 80.1467,
    rating: 4.7
  },
  {
    id: '41',
    name: 'Ekambareswarar Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple with historical importance.',
    address: 'Kanchipuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8342,
    longitude: 79.7022,
    rating: 4.8
  },
  {
    id: '42',
    name: 'Thiruneermalai Ranganatha Temple',
    deity: 'Vishnu',
    description: 'Hill temple dedicated to Lord Ranganatha.',
    address: 'Chrompet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9489,
    longitude: 80.1394,
    rating: 4.7
  },
  {
    id: '43',
    name: 'Perambur Sivan Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Perambur.',
    address: 'Perambur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1128,
    longitude: 80.2389,
    rating: 4.5
  },
  {
    id: '44',
    name: 'Palavanthangal Murugan Temple',
    deity: 'Murugan',
    description: 'Popular Murugan temple in South Chennai.',
    address: 'Palavanthangal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9842,
    longitude: 80.1878,
    rating: 4.6
  },
  {
    id: '45',
    name: 'Ayyappan Temple',
    deity: 'Other',
    description: 'Beautiful temple dedicated to Lord Ayyappan.',
    address: 'Nungambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0581,
    longitude: 80.2425,
    rating: 4.7
  },
  {
    id: '46',
    name: 'Thirunindravur Temple',
    deity: 'Vishnu',
    description: 'Ancient Vishnu temple, one of the Divya Desams.',
    address: 'Thirunindravur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0481,
    longitude: 80.0292,
    rating: 4.7
  },
  {
    id: '47',
    name: 'Kodambakkam Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Well-known Ganesh temple in Kodambakkam.',
    address: 'Kodambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0514,
    longitude: 80.2269,
    rating: 4.5
  },
  {
    id: '48',
    name: 'Sri Vaidya Vruddheswarar Temple',
    deity: 'Shiva',
    description: 'Ancient temple dedicated to Lord Shiva.',
    address: 'Santhome, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0328,
    longitude: 80.2786,
    rating: 4.6
  },
  {
    id: '49',
    name: 'Selaiyur Amman Temple',
    deity: 'Devi',
    description: 'Famous Amman temple in South Chennai.',
    address: 'Selaiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9008,
    longitude: 80.1456,
    rating: 4.6
  },
  {
    id: '50',
    name: 'Madras War Cemetery Temple',
    deity: 'Other',
    description: 'Memorial site with religious significance.',
    address: 'Nandanam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0253,
    longitude: 80.2444,
    rating: 4.4
  },
  {
    id: '51',
    name: 'Venkatesaperumal Temple',
    deity: 'Vishnu',
    description: 'Popular Vishnu temple in Chennai.',
    address: 'Virugambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0581,
    longitude: 80.2089,
    rating: 4.6
  },
  {
    id: '52',
    name: 'Korattur Hanuman Temple',
    deity: 'Hanuman',
    description: 'Famous Hanuman temple in North Chennai.',
    address: 'Korattur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1367,
    longitude: 80.2003,
    rating: 4.7
  },
  {
    id: '53',
    name: 'Annai Indira Gandhi Temple',
    deity: 'Devi',
    description: 'Modern temple dedicated to Goddess.',
    address: 'Medavakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9189,
    longitude: 80.1906,
    rating: 4.5
  },
  {
    id: '54',
    name: 'Mannady Chinthadiripet Hanuman Temple',
    deity: 'Hanuman',
    description: 'Historic Hanuman temple in Central Chennai.',
    address: 'Chintadripet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0436,
    longitude: 80.2669,
    rating: 4.6
  },
  {
    id: '55',
    name: 'Royapuram Annamalai Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Royapuram.',
    address: 'Royapuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1117,
    longitude: 80.2972,
    rating: 4.5
  },
  {
    id: '56',
    name: 'Pudupet Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Beautiful Ganesh temple near beach.',
    address: 'Pudupet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0706,
    longitude: 80.2881,
    rating: 4.5
  },
  {
    id: '57',
    name: 'Koyambedu Rajarajeswari Temple',
    deity: 'Devi',
    description: 'Famous Goddess temple in Koyambedu.',
    address: 'Koyambedu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0733,
    longitude: 80.1981,
    rating: 4.7
  },
  {
    id: '58',
    name: 'Arumbakkam Pachaiamman Temple',
    deity: 'Devi',
    description: 'Ancient temple dedicated to Goddess Pachaiamman.',
    address: 'Arumbakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0708,
    longitude: 80.2111,
    rating: 4.5
  },
  {
    id: '59',
    name: 'Sri Agatheeswarar Temple',
    deity: 'Shiva',
    description: 'Historic Shiva temple with beautiful architecture.',
    address: 'Villivakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1178,
    longitude: 80.2181,
    rating: 4.6
  },
  {
    id: '60',
    name: 'Pammal Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Popular Ganesh temple in South Chennai.',
    address: 'Pammal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9711,
    longitude: 80.1256,
    rating: 4.5
  },
  {
    id: '61',
    name: 'Mudichur Kaliamman Temple',
    deity: 'Devi',
    description: 'Powerful Kaliamman temple near Chennai.',
    address: 'Mudichur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9081,
    longitude: 80.0728,
    rating: 4.7
  },
  {
    id: '62',
    name: 'Tambaram Periamman Temple',
    deity: 'Devi',
    description: 'Ancient Amman temple in Tambaram.',
    address: 'Tambaram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9229,
    longitude: 80.1275,
    rating: 4.6
  },
  {
    id: '63',
    name: 'Poonamallee Hanuman Temple',
    deity: 'Hanuman',
    description: 'Famous Hanuman temple in western Chennai.',
    address: 'Poonamallee, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0464,
    longitude: 80.0931,
    rating: 4.6
  },
  {
    id: '64',
    name: 'Avadi Murugan Temple',
    deity: 'Murugan',
    description: 'Beautiful Murugan temple in Avadi.',
    address: 'Avadi, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1156,
    longitude: 80.1103,
    rating: 4.6
  },
  {
    id: '65',
    name: 'Ambattur Sri Venkateswara Temple',
    deity: 'Vishnu',
    description: 'Grand Vishnu temple in Ambattur.',
    address: 'Ambattur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1143,
    longitude: 80.1548,
    rating: 4.7
  },
  {
    id: '66',
    name: 'Maduravoyal Mariamman Temple',
    deity: 'Devi',
    description: 'Ancient Mariamman temple in Maduravoyal.',
    address: 'Maduravoyal, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0692,
    longitude: 80.1653,
    rating: 4.5
  },
  {
    id: '67',
    name: 'Porur Kumarankuzhi Temple',
    deity: 'Murugan',
    description: 'Historic Murugan temple in Porur.',
    address: 'Porur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0358,
    longitude: 80.1561,
    rating: 4.6
  },
  {
    id: '68',
    name: 'Chitlapakkam Amman Temple',
    deity: 'Devi',
    description: 'Popular Amman temple in South Chennai.',
    address: 'Chitlapakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9656,
    longitude: 80.1403,
    rating: 4.5
  },
  {
    id: '69',
    name: 'Madipakkam Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Well-known Ganesh temple in Madipakkam.',
    address: 'Madipakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9619,
    longitude: 80.1986,
    rating: 4.6
  },
  {
    id: '70',
    name: 'Velachery Murugan Temple',
    deity: 'Murugan',
    description: 'Famous Murugan temple in Velachery.',
    address: 'Velachery, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9758,
    longitude: 80.2211,
    rating: 4.7
  },
  {
    id: '71',
    name: 'Pallikaranai Murugan Temple',
    deity: 'Murugan',
    description: 'Beautiful temple dedicated to Lord Murugan.',
    address: 'Pallikaranai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9453,
    longitude: 80.2039,
    rating: 4.5
  },
  {
    id: '72',
    name: 'Sholinganallur Murugan Temple',
    deity: 'Murugan',
    description: 'Popular Murugan temple in IT corridor.',
    address: 'Sholinganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9008,
    longitude: 80.2272,
    rating: 4.6
  },
  {
    id: '73',
    name: 'Perumbakkam Kaliamman Temple',
    deity: 'Devi',
    description: 'Ancient Kaliamman temple in Perumbakkam.',
    address: 'Perumbakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9078,
    longitude: 80.2408,
    rating: 4.6
  },
  {
    id: '74',
    name: 'Madambakkam Temple',
    deity: 'Vishnu',
    description: 'Historic Vishnu temple in Madambakkam.',
    address: 'Madambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8544,
    longitude: 80.0478,
    rating: 4.5
  },
  {
    id: '75',
    name: 'Kelambakkam Shiva Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple near ECR.',
    address: 'Kelambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.7797,
    longitude: 80.2089,
    rating: 4.6
  },
  {
    id: '76',
    name: 'Injambakkam Perumal Temple',
    deity: 'Vishnu',
    description: 'Coastal Vishnu temple in Injambakkam.',
    address: 'Injambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9186,
    longitude: 80.2506,
    rating: 4.5
  },
  {
    id: '77',
    name: 'Uthandi Kalikambal Temple',
    deity: 'Devi',
    description: 'Seaside goddess temple in Uthandi.',
    address: 'Uthandi, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8692,
    longitude: 80.2517,
    rating: 4.6
  },
  {
    id: '78',
    name: 'Neelankarai Murugan Temple',
    deity: 'Murugan',
    description: 'Popular Murugan temple near beach.',
    address: 'Neelankarai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9497,
    longitude: 80.2611,
    rating: 4.7
  },
  {
    id: '79',
    name: 'Kottivakkam Karaneeswarar Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Kottivakkam.',
    address: 'Kottivakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9508,
    longitude: 80.2492,
    rating: 4.5
  },
  {
    id: '80',
    name: 'Taramani Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Famous Ganesh temple in Taramani.',
    address: 'Taramani, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9906,
    longitude: 80.2436,
    rating: 4.6
  },
  {
    id: '81',
    name: 'Perungudi Murugan Temple',
    deity: 'Murugan',
    description: 'Popular temple in IT hub area.',
    address: 'Perungudi, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9611,
    longitude: 80.2400,
    rating: 4.6
  },
  {
    id: '82',
    name: 'Thoraipakkam Shiva Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Thoraipakkam.',
    address: 'Thoraipakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9367,
    longitude: 80.2322,
    rating: 4.5
  },
  {
    id: '83',
    name: 'Medavakkam Lakshmi Temple',
    deity: 'Lakshmi',
    description: 'Beautiful temple dedicated to Goddess Lakshmi.',
    address: 'Medavakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9197,
    longitude: 80.1917,
    rating: 4.6
  },
  {
    id: '84',
    name: 'Perungalathur Mariamman Temple',
    deity: 'Devi',
    description: 'Famous Mariamman temple in South Chennai.',
    address: 'Perungalathur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8997,
    longitude: 80.0942,
    rating: 4.7
  },
  {
    id: '85',
    name: 'Vandalur Murugan Temple',
    deity: 'Murugan',
    description: 'Historic Murugan temple near zoo.',
    address: 'Vandalur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8925,
    longitude: 80.0808,
    rating: 4.6
  },
  {
    id: '86',
    name: 'Urapakkam Periamman Temple',
    deity: 'Devi',
    description: 'Ancient Amman temple in Urapakkam.',
    address: 'Urapakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8886,
    longitude: 80.0772,
    rating: 4.5
  },
  {
    id: '87',
    name: 'Guduvanchery Shiva Temple',
    deity: 'Shiva',
    description: 'Historic Shiva temple in Guduvanchery.',
    address: 'Guduvanchery, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8456,
    longitude: 80.0644,
    rating: 4.6
  },
  {
    id: '88',
    name: 'Maraimalai Nagar Temple',
    deity: 'Vishnu',
    description: 'Beautiful Vishnu temple in Maraimalai Nagar.',
    address: 'Maraimalai Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.7931,
    longitude: 80.0281,
    rating: 4.5
  },
  {
    id: '89',
    name: 'Chengalpattu Perumal Temple',
    deity: 'Vishnu',
    description: 'Ancient Vishnu temple near Chennai.',
    address: 'Chengalpattu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.6917,
    longitude: 79.9756,
    rating: 4.7
  },
  {
    id: '90',
    name: 'Kilpauk Medical College Temple',
    deity: 'Devi',
    description: 'Temple within medical campus premises.',
    address: 'Kilpauk, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0806,
    longitude: 80.2372,
    rating: 4.4
  },
  {
    id: '91',
    name: 'Anna Nagar Hanuman Temple',
    deity: 'Hanuman',
    description: 'Popular Hanuman temple in Anna Nagar.',
    address: 'Anna Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0853,
    longitude: 80.2089,
    rating: 4.7
  },
  {
    id: '92',
    name: 'Mogappair Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Well-known Ganesh temple in Mogappair.',
    address: 'Mogappair, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0856,
    longitude: 80.1833,
    rating: 4.6
  },
  {
    id: '93',
    name: 'Madanandapuram Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Adyar.',
    address: 'Adyar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0111,
    longitude: 80.2564,
    rating: 4.5
  },
  {
    id: '94',
    name: 'Saidapet Amman Temple',
    deity: 'Devi',
    description: 'Famous Amman temple in Saidapet.',
    address: 'Saidapet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0219,
    longitude: 80.2236,
    rating: 4.6
  },
  {
    id: '95',
    name: 'Guindy Murugan Temple',
    deity: 'Murugan',
    description: 'Beautiful Murugan temple near park.',
    address: 'Guindy, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0103,
    longitude: 80.2206,
    rating: 4.6
  },
  {
    id: '96',
    name: 'Ashok Nagar Vinayagar Temple',
    deity: 'Ganesh',
    description: 'Popular Ganesh temple in Ashok Nagar.',
    address: 'Ashok Nagar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0364,
    longitude: 80.2106,
    rating: 4.5
  },
  {
    id: '97',
    name: 'Ramapuram Shiva Temple',
    deity: 'Shiva',
    description: 'Ancient Shiva temple in Ramapuram.',
    address: 'Ramapuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0253,
    longitude: 80.1647,
    rating: 4.5
  },
  {
    id: '98',
    name: 'Mangadu Kamakshi Amman Temple',
    deity: 'Devi',
    description: 'Famous Kamakshi temple in Mangadu.',
    address: 'Mangadu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0306,
    longitude: 80.1078,
    rating: 4.8
  },
  {
    id: '99',
    name: 'Kundrathur Murugan Temple',
    deity: 'Murugan',
    description: 'Hill temple dedicated to Lord Murugan.',
    address: 'Kundrathur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0036,
    longitude: 80.0967,
    rating: 4.7
  },
  {
    id: '100',
    name: 'Sriperumbudur Ranganathar Temple',
    deity: 'Vishnu',
    description: 'Historic Vishnu temple, birthplace of Ramanuja.',
    address: 'Sriperumbudur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9694,
    longitude: 79.9456,
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
