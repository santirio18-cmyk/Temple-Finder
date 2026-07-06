import type { Temple } from '../data'

/** Rich detail overlays for famous Chennai temples (merged by id). */
export const topTempleDetailsById: Record<string, Partial<Temple>> = {
  '84': {
    theertham:
      'Kapali Theertham (temple tank) at the heart of the Mylapore complex. Devotees take a dip or sprinkle the sacred water before darshan, especially during Panguni Peruvizha.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/MylaporeKapaleeshwararTemple.jpg',
  },
  '156': {
    deity: 'Lord Murugan',
    description:
      'Arulmigu Vadapalani Andavar Temple is among the most visited Murugan shrines in India. Built on a hillock in Vadapalani, the temple features a magnificent rajagopuram and a sanctum where Lord Murugan is worshipped as Palani Andavar. Thousands of devotees visit daily for archanai, abhishekam, and prayers before weddings, new jobs, and important life events. The temple atmosphere is vibrant with flower vendors, oil lamps, and the continuous chanting of "Om Saravana Bhava".',
    openingHours: '5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    phoneNumber: '+91 044 2483 0205',
    festivals: [
      'Thai Poosam (January-February) - Kavadi and paalkudam offerings on the hill',
      'Panguni Uthiram (March-April) - Grand utsavam and divine marriage celebrations',
      'Skanda Sashti (October-November) - Six-day victory festival of Lord Murugan',
      'Vaikasi Visakam (May-June) - Birth star celebration with special abhishekam',
      'Karthigai Deepam (November-December) - Hill illuminated with lamps',
    ],
    specialSignificance:
      'Devotees believe that sincere prayers here remove obstacles and fulfil vows (nadai). The hill shrine represents Lord Murugan\'s grace as the guide of souls; many offer hair tonsuring and kavadi after wishes are granted.',
    theertham:
      'Siddhar Theertham and temple tanks at the base of the hill. Devotees often circumambulate the hill (girivalam) on auspicious days before entering the main shrine.',
    parking: true,
    photographyAllowed: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Vadapalani_Murugan_Temple.jpg',
  },
  '177': {
    deity: 'Lord Vishnu',
    description:
      'Arulmigu Sri Parthasarathyswamy Temple in Triplicane is one of the 108 Divya Desams and among the oldest temples in Chennai, with origins in the Pallava period. Lord Krishna is worshipped here as Parthasarathy — the charioteer of Arjuna — with a rare depiction showing scars from Bhishma\'s arrows. The temple complex includes shrines to Ranganatha, Rama, Gajendra Varadar, and Narasimha. Its colourful gopuram, pillared mandapams, and the bustling Car Street outside make it a living centre of Vaishnavite tradition.',
    openingHours: '5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    phoneNumber: '+91 044 2844 2465',
    festivals: [
      'Vaikunta Ekadashi (December-January) - Opening of the Swarga Vasal (heaven\'s gate)',
      'Brahmotsavam (January-February) - Ten-day chariot festival through Triplicane',
      'Ratha Sapthami (January-February) - Sun god\'s chariot festival',
      'Krishna Jayanthi (August-September) - Birth celebration of Lord Krishna',
      'Ramanavami (March-April) - Rama\'s birth with special alankaram and processions',
    ],
    specialSignificance:
      'Glorified in the hymns of Peyalvar and Thirumangai Alwar, this temple is a Paadal Petra Sthalam of deep literary and spiritual importance. The annual Brahmotsavam chariot procession is one of Chennai\'s great public festivals.',
    theertham:
      'Kairaveni Pushkarini (temple tank) on the eastern side of the complex. Theerthavari during festivals is considered especially sacred.',
    parking: false,
    photographyAllowed: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Parthasarathy-Temple-Triplicane-Chennai-1.JPG',
  },
  '101': {
    deity: 'Lord Hanuman',
    description:
      'Nanganallur Anjaneyar Temple is famous for its towering 32-foot monolithic Hanuman murti, one of the tallest in India. Consecrated in 1989, the temple draws devotees from across Tamil Nadu seeking strength, protection from planetary afflictions (sevvai dosham), and relief from fear and illness. The main shrine faces Lord Rama, and the powerful Anjaneya is worshipped with sindooram, vada malai, and butter alankaram. The neighbourhood of Nanganallur has grown around this temple as a centre of bhakti.',
    openingHours: '5:00 AM - 12:00 PM, 4:30 PM - 9:00 PM',
    phoneNumber: '+91 044 2224 1234',
    festivals: [
      'Hanuman Jayanthi (April-May) - Grand abhishekam and Hanuman Chalisa recitals',
      'Rama Navami (March-April) - Celebration of Lord Rama\'s birth',
      'Deepavali (October-November) - Special alankaram and evening deepam',
      'New Year\'s Day - Lakhs of devotees for first darshan of the year',
    ],
    specialSignificance:
      'Worshipped as Veera Anjaneya, the deity is believed to grant courage, success in endeavours, and protection during Rahu-Ketu and Sevvai periods. Many devotees offer vada malai and visit on Saturdays.',
    theertham:
      'Temple has a small sacred tank used for ritual ablutions on festival days. Devotees circumambulate the tall murti before entering the inner sanctum.',
    parking: true,
    photographyAllowed: true,
  },
  '83': {
    deity: 'Lord Shiva',
    description:
      'Arulmigu Marundeeswarar Temple in Thiruvanmiyur is an ancient seaside Shiva temple where the Lord is worshipped as the Divine Physician (Marundeeswarar). Sage Valmiki is said to have worshipped here, and the temple\'s origins are traced to the Chola period with later renovations. The east-facing gopuram welcomes the sunrise over the Bay of Bengal, and the spacious corridors are ideal for peaceful darshan. Devotees pray here for healing, recovery from illness, and overall wellbeing.',
    openingHours: '5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    phoneNumber: '+91 044 2491 4547',
    festivals: [
      'Maha Shivaratri (February-March) - All-night vigil and special abhishekam',
      'Thai Poosam (January-February) - Kavadi and milk abhishekam',
      'Arudra Darshanam (December-January) - Nataraja worship on Thiruvathirai',
      'Navaratri (September-October) - Nine nights of Devi worship in the Amman shrine',
    ],
    specialSignificance:
      'The name Marundeeswarar means "Lord of Medicine". Devotees offer salt, pepper, and medicinal herbs during abhishekam, believing the Lord blesses them with health. The temple is a serene alternative to the bustle of central Chennai.',
    theertham:
      'Pancha Theertham and the temple tank near the eastern tower. Proximity to the sea adds to the temple\'s tranquil, healing atmosphere.',
    parking: true,
    photographyAllowed: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Arulmigu_Marundeeswarar_Temple_tower%2C_Tiruvanmiyur.jpg',
  },
  '33': {
    deity: 'Goddess Kalikambal & Lord Shiva',
    description:
      'Kalikambal Kamadeswarar Temple on Thambu Chetty Street is one of the oldest temples in George Town, the historic trading heart of Chennai. Goddess Kalikambal is worshipped as a fierce yet compassionate form of Shakti, and the Kamadeswarar shrine represents Lord Shiva. The temple was visited by Chhatrapati Shivaji in 1667, who is said to have prayed here in disguise. Merchants, families, and traders have sought the Goddess\'s blessings here for centuries.',
    openingHours: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    phoneNumber: '+91 044 2522 1234',
    festivals: [
      'Navaratri (September-October) - Nine nights of Kalikambal worship with alankaram',
      'Aadi Pooram (July-August) - Goddess festival with processions',
      'Maha Shivaratri (February-March) - Night-long Shiva worship',
      'Deepavali (October-November) - Special lamps and Lakshmi puja',
    ],
    specialSignificance:
      'Revered for protection, prosperity in business, and removal of enemies\' obstacles. The narrow streets of George Town leading to the temple are part of the traditional pilgrimage experience.',
    theertham:
      'Temple well and sacred water used for abhishekam. The historic setting in old Chennai adds to the spiritual ambience.',
    parking: false,
    photographyAllowed: false,
  },
  '293': {
    deity: 'Goddess Lakshmi',
    description:
      'Shri Ashtalakshmi Temple in Besant Nagar is a modern architectural marvel dedicated to Goddess Lakshmi in her eight forms — Aadi, Dhana, Dhanya, Gaja, Santana, Veera, Vijaya, and Vidya Lakshmi. Built on the shores of the Bay of Bengal, the multi-tiered temple allows devotees to worship each form of the Goddess on different levels as they ascend. The sound of waves, sea breeze, and evening lamps create a uniquely peaceful setting for prosperity prayers.',
    openingHours: '6:30 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    phoneNumber: '+91 044 2491 2345',
    festivals: [
      'Navaratri (September-October) - Nine nights honouring the divine feminine',
      'Deepavali (October-November) - Lakshmi puja with thousands of lamps',
      'Varalakshmi Vratham (July-August) - Women\'s festival for family prosperity',
      'Pongal (January) - Harvest thanksgiving with special offerings',
    ],
    specialSignificance:
      'One of the few temples in India dedicated specifically to Ashta Lakshmi. Devotees visit for wealth, education, courage, children, and victory in rightful endeavours. Sunset darshan overlooking the sea is especially popular.',
    theertham:
      'Sea-facing temple with ritual use of sacred water within the complex. Many devotees combine temple visit with a walk along Elliot\'s Beach.',
    parking: true,
    photographyAllowed: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Ashtalakshmi_Temple_Kothapet.jpg',
  },
  '201': {
    deity: 'Goddess Karumariamman',
    description:
      'Arulmigu Devi Karumariamman Temple at Thiruverkadu is one of the most powerful Amman shrines in the Chennai region. Goddess Karumariamman — a form of Parasakthi — is worshipped as the protector of families, healer of diseases, and granter of marriages and children. The sprawling temple complex includes a sacred anthill (putru) where the Goddess is believed to have appeared. Thursdays and Fridays see especially large crowds of devotees offering lemon garlands, sarees, and pongal nivedhanam.',
    openingHours: '5:00 AM - 12:30 PM, 4:00 PM - 9:00 PM',
    phoneNumber: '+91 044 2686 2222',
    festivals: [
      'Aadi Pooram (July-August) - Grand ten-day Goddess festival',
      'Navaratri (September-October) - Nine nights of Devi worship',
      'Thai Poosam (January-February) - Kavadi and paalkudam for Amman',
      'Panguni Uthiram (March-April) - Divine marriage utsavam',
      'Chithirai Pournami (April-May) - Full moon special abhishekam',
    ],
    specialSignificance:
      'Devotees believe the Goddess cures skin ailments, blesses childless couples, and removes navagraha doshas. The Thiruverkadu sthalam is mentioned in local puranic traditions as a place where the Divine Mother tested sages.',
    theertham:
      'Amman Theertham and temple tanks within the large complex. Theerthavari during Aadi month draws huge gatherings.',
    parking: true,
    photographyAllowed: true,
  },
  '87': {
    deity: 'Lord Shiva',
    description:
      'Arulmigu Thyagarajaswamy Temple in Tiruvottiyur is a vast Paadal Petra Sthalam glorified in the Thevaram hymns of Sundarar, Appar, and Sambandar. Lord Shiva is worshipped as Thyagarajaswamy with Goddess Kali as the consort. The temple covers over 10 acres with magnificent gopurams, long prakarams, and the famous Panchamuga Vadyam tradition. It is one of the heritage jewels of North Chennai and a must-visit for those exploring Saivite history.',
    openingHours: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    phoneNumber: '+91 044 2598 2345',
    festivals: [
      'Thyagaraja Aradhana (January) - Music festival honouring Saint Thyagaraja',
      'Maha Shivaratri (February-March) - All-night worship and abhishekam',
      'Brahmotsavam (March-April) - Chariot festival through Tiruvottiyur streets',
      'Arudra Darshanam (December-January) - Nataraja darshan on Thiruvathirai',
    ],
    specialSignificance:
      'One of the 275 Paadal Petra Sthalams. Sundarar received a gold coin (podhigai) here from Lord Shiva — a legend depicted in temple sculptures. The scale and antiquity of this temple rival any in Chennai.',
    theertham:
      'Kaveri Theertham, Jambu Theertham, and other sacred tanks within the prakaram. Theerthavari during Brahmotsavam is a major event.',
    parking: true,
    photographyAllowed: false,
  },
  '158': {
    deity: 'Lord Murugan',
    description:
      'Arupadai Veedu Murugan Temple in Besant Nagar is a beautiful shrine modelled on the six sacred abodes (Arupadai Veedu) of Lord Murugan in Tamil Nadu. Located near Elliot\'s Beach in a quiet residential colony, the temple offers a peaceful setting for Murugan worship away from the busiest city crowds. The architecture reflects elements of Palani, Swamimalai, Tiruttani, Pazhamudircholai, Tirupparankundram, and Tiruchendur in miniature form.',
    openingHours: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    phoneNumber: '+91 044 2491 5678',
    festivals: [
      'Skanda Sashti (October-November) - Six-day Soorasamharam and victory celebrations',
      'Thai Poosam (January-February) - Kavadi and milk abhishekam',
      'Vaikasi Visakam (May-June) - Murugan\'s birth star festival',
      'Karthigai Deepam (November-December) - Lamp festival on the hill shrine replica',
    ],
    specialSignificance:
      'Ideal for devotees who wish to honour all six Murugan padai veedu in one visit. Popular among Besant Nagar and Adyar families for daily and Saturday worship.',
    theertham:
      'Small temple tank within the premises. The beachside location makes evening girivalam and pradakshanam especially pleasant.',
    parking: true,
    photographyAllowed: true,
  },
}

export const TOP_TEMPLE_IDS = new Set(['84', ...Object.keys(topTempleDetailsById)])
