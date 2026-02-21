-- Additional Famous Temples for Temple Finder App
-- Run this SQL in your Supabase SQL Editor

-- Insert additional famous temples from across India
INSERT INTO public.temples (
    name, deity, description, history, significance, architecture, legends,
    address, city, state, country, locality, latitude, longitude,
    contact_phone, website, capacity, current_occupancy, rating, review_count
) VALUES
-- North India Temples
(
    'Golden Temple (Harmandir Sahib)',
    'Guru Granth Sahib',
    'The holiest Gurdwara of Sikhism, located in Amritsar, Punjab.',
    'Built in 1604 by Guru Arjan Dev, the fifth Sikh Guru.',
    'The spiritual and cultural center of Sikhism, known for its community kitchen (langar).',
    'Mughal and Sikh architectural styles with gold-plated dome and marble structure.',
    ARRAY['The temple was built to be open from all four sides', 'The langar serves free meals to all visitors regardless of religion'],
    'Golden Temple Road, Amritsar, Punjab 143006',
    'Amritsar',
    'Punjab',
    'India',
    'Golden Temple Complex',
    31.6199,
    74.8765,
    '+91-183-2553954',
    'https://www.goldentempleamritsar.org',
    2000,
    1500,
    4.9,
    3200
),
(
    'Akshardham Temple',
    'Swaminarayan',
    'A Hindu temple complex dedicated to Bhagwan Swaminarayan in Delhi.',
    'Opened in 2005, built by the BAPS organization.',
    'One of the largest Hindu temple complexes in the world, showcasing Indian culture and spirituality.',
    'Traditional Indian architecture with intricate stone carvings and modern technology.',
    ARRAY['The temple was built using ancient architectural principles', 'It houses the largest indoor prayer hall in India'],
    'Noida Mor, Pandav Nagar, New Delhi, Delhi 110092',
    'New Delhi',
    'Delhi',
    'India',
    'Akshardham',
    28.6129,
    77.2773,
    '+91-11-43593333',
    'https://www.akshardham.com',
    3000,
    2000,
    4.8,
    2800
),
(
    'Lotus Temple',
    'Baháʼu''lláh',
    'A Baháʼí House of Worship in New Delhi, known for its lotus flower architecture.',
    'Completed in 1986, designed by Iranian architect Fariborz Sahba.',
    'A symbol of unity and peace, open to people of all religions.',
    'Modern architecture inspired by the lotus flower, built with white marble.',
    ARRAY['The temple has no idols or religious symbols', 'It is designed to represent the unity of all religions'],
    'Bahapur, Kalkaji, New Delhi, Delhi 110019',
    'New Delhi',
    'Delhi',
    'India',
    'Kalkaji',
    28.5535,
    77.2588,
    '+91-11-26444029',
    'https://www.bahaihouseofworship.in',
    800,
    400,
    4.6,
    1500
),

-- South India Temples
(
    'Ramanathaswamy Temple',
    'Shiva (Ramanathaswamy)',
    'One of the twelve Jyotirlinga temples, located on Rameswaram Island.',
    'Built by the Pandya dynasty in the 12th century, later expanded by various rulers.',
    'One of the holiest pilgrimage sites for Hindus, part of the Char Dham.',
    'Dravidian architecture with the longest temple corridor in India.',
    ARRAY['Lord Rama is said to have worshipped Shiva here', 'The temple has 22 sacred wells with different tastes'],
    'Rameswaram, Tamil Nadu 623526',
    'Rameswaram',
    'Tamil Nadu',
    'India',
    'Rameswaram',
    9.2881,
    79.3127,
    '+91-4573-221223',
    'https://www.rameswaramtemple.tn.gov.in',
    1500,
    800,
    4.7,
    2100
),
(
    'Sri Venkateswara Temple, Tirupati',
    'Venkateswara (Vishnu)',
    'A famous Hindu temple dedicated to Lord Venkateswara in Tirupati, Andhra Pradesh.',
    'The temple has been in existence for over 2000 years, mentioned in ancient texts.',
    'One of the richest temples in the world and most visited pilgrimage sites.',
    'Dravidian architecture with a golden dome and intricate carvings.',
    ARRAY['The temple is built on seven hills representing the seven chakras', 'Lord Venkateswara is said to have appeared here to save humanity'],
    'Tirumala, Tirupati, Andhra Pradesh 517504',
    'Tirupati',
    'Andhra Pradesh',
    'India',
    'Tirumala',
    13.6777,
    79.3476,
    '+91-877-2277777',
    'https://www.tirumala.org',
    2500,
    2200,
    4.9,
    3500
),
(
    'Guruvayur Temple',
    'Krishna (Guruvayurappan)',
    'A famous Hindu temple dedicated to Lord Krishna in Guruvayur, Kerala.',
    'The temple has been in existence for over 5000 years, mentioned in ancient texts.',
    'Known as the "Dwaraka of the South" and one of the most important Krishna temples.',
    'Traditional Kerala architecture with a copper-plated roof and gold-plated flagstaff.',
    ARRAY['The temple is said to have been established by Guru and Vayu', 'Lord Krishna is worshipped here in his child form'],
    'Guruvayur, Kerala 680101',
    'Guruvayur',
    'Kerala',
    'India',
    'Guruvayur',
    10.5943,
    76.0411,
    '+91-487-2556330',
    'https://www.guruvayurdevaswom.org',
    1200,
    900,
    4.8,
    1800
),
(
    'Sabarimala Temple',
    'Ayyappan',
    'A famous Hindu temple dedicated to Lord Ayyappan in the Periyar Tiger Reserve, Kerala.',
    'The temple has been in existence for over 800 years, built by the Pandalam dynasty.',
    'One of the most visited pilgrimage sites in India, known for its strict pilgrimage rules.',
    'Traditional Kerala architecture with a golden dome and flagstaff.',
    ARRAY['Lord Ayyappan is said to be the son of Shiva and Mohini', 'The temple is open only during specific pilgrimage seasons'],
    'Sabarimala, Kerala 689662',
    'Pathanamthitta',
    'Kerala',
    'India',
    'Sabarimala',
    9.4356,
    77.0819,
    '+91-473-2222000',
    'https://www.sabarimala.org',
    1000,
    800,
    4.7,
    2500
),

-- East India Temples
(
    'Jagannath Temple, Puri',
    'Jagannath (Krishna)',
    'A famous Hindu temple dedicated to Lord Jagannath in Puri, Odisha.',
    'Built in the 12th century by King Anantavarman Chodaganga Deva.',
    'One of the four major pilgrimage sites (Char Dham) and part of the Jagannath cult.',
    'Kalinga architecture with a tall shikhara and intricate carvings.',
    ARRAY['Lord Jagannath is worshipped along with his siblings Balabhadra and Subhadra', 'The temple is famous for its annual Rath Yatra festival'],
    'Grand Road, Puri, Odisha 752001',
    'Puri',
    'Odisha',
    'India',
    'Puri',
    19.8065,
    85.8172,
    '+91-675-2220022',
    'https://www.jagannathtemplepuri.com',
    2000,
    1500,
    4.8,
    2800
),
(
    'Kamakhya Temple',
    'Kamakhya (Shakti)',
    'A famous Hindu temple dedicated to Goddess Kamakhya in Guwahati, Assam.',
    'Built in the 8th century, rebuilt in the 17th century by the Koch dynasty.',
    'One of the 51 Shakti Peethas and the most important center of Tantric worship.',
    'Assamese architecture with a unique beehive-shaped dome.',
    ARRAY['The temple is built on the spot where Sati''s yoni fell', 'The goddess is worshipped in her yoni form'],
    'Kamakhya, Guwahati, Assam 781010',
    'Guwahati',
    'Assam',
    'India',
    'Kamakhya',
    26.1664,
    91.7056,
    '+91-361-2734634',
    'https://www.kamakhyatemple.org',
    800,
    600,
    4.6,
    1200
),

-- West India Temples
(
    'Shirdi Sai Baba Temple',
    'Sai Baba',
    'A famous temple dedicated to Sai Baba of Shirdi in Maharashtra.',
    'Built in 1922, the temple houses the samadhi of Sai Baba.',
    'One of the most visited pilgrimage sites in India, attracting devotees from all religions.',
    'Modern architecture with marble and gold decorations.',
    ARRAY['Sai Baba is said to have performed many miracles here', 'The temple serves free meals to all devotees'],
    'Shirdi, Maharashtra 423109',
    'Shirdi',
    'Maharashtra',
    'India',
    'Shirdi',
    19.7515,
    74.4770,
    '+91-2423-258500',
    'https://www.sai.org.in',
    3000,
    2500,
    4.8,
    4000
),
(
    'Siddhivinayak Temple',
    'Ganesha',
    'A famous Hindu temple dedicated to Lord Ganesha in Mumbai, Maharashtra.',
    'Built in 1801 by Laxman Vithu and Deubai Patil.',
    'One of the most visited Ganesha temples in India, especially popular among celebrities.',
    'Traditional Marathi architecture with a gold-plated dome.',
    ARRAY['The temple is said to fulfill the wishes of devotees', 'It is visited by millions of devotees annually'],
    'S.K. Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028',
    'Mumbai',
    'Maharashtra',
    'India',
    'Prabhadevi',
    19.0176,
    72.8562,
    '+91-22-24373800',
    'https://www.siddhivinayak.org',
    1500,
    1200,
    4.7,
    2200
),
(
    'Mahabaleshwar Temple',
    'Shiva (Mahabaleshwar)',
    'A famous Hindu temple dedicated to Lord Shiva in Gokarna, Karnataka.',
    'Built in the 4th century by the Kadamba dynasty, later renovated by various rulers.',
    'One of the seven Mukti Sthalas and an important pilgrimage site for Shaivites.',
    'Dravidian architecture with a tall gopuram and intricate carvings.',
    ARRAY['The temple is said to grant liberation (moksha) to devotees', 'Lord Shiva is worshipped here as Mahabaleshwar'],
    'Gokarna, Karnataka 581326',
    'Gokarna',
    'Karnataka',
    'India',
    'Gokarna',
    14.5478,
    74.3188,
    '+91-8386-256124',
    'https://www.gokarnamahabaleshwar.org',
    800,
    500,
    4.5,
    900
),

-- Central India Temples
(
    'Khajuraho Temples',
    'Shiva, Vishnu, Devi',
    'A group of Hindu and Jain temples in Khajuraho, Madhya Pradesh, famous for erotic sculptures.',
    'Built between 950 and 1050 CE by the Chandela dynasty.',
    'UNESCO World Heritage Site, famous for its intricate erotic sculptures and architecture.',
    'Nagara style architecture with tall shikharas and detailed carvings.',
    ARRAY['The temples were lost and rediscovered in the 19th century', 'Only 20 out of 85 temples remain today'],
    'Khajuraho, Madhya Pradesh 471606',
    'Khajuraho',
    'Madhya Pradesh',
    'India',
    'Khajuraho',
    24.8525,
    79.9225,
    '+91-7686-272349',
    'https://www.khajuraho.org',
    1000,
    600,
    4.6,
    1800
),
(
    'Ujjain Mahakaleshwar Temple',
    'Shiva (Mahakaleshwar)',
    'One of the twelve Jyotirlinga temples, located in Ujjain, Madhya Pradesh.',
    'Built in the 4th century, the current structure dates to the 18th century.',
    'One of the most important Shiva temples in India, part of the Sapta Puri.',
    'Maru-Gurjara architecture with a tall shikhara and intricate carvings.',
    ARRAY['Lord Shiva is said to have appeared here as a column of light', 'The temple is famous for its Bhasma Aarti'],
    'Mahakaleshwar Temple, Ujjain, Madhya Pradesh 456010',
    'Ujjain',
    'Madhya Pradesh',
    'India',
    'Ujjain',
    23.1765,
    75.7885,
    '+91-734-2550063',
    'https://www.mahakaleshwar.org',
    1200,
    800,
    4.7,
    1600
),

-- Northeast India Temples
(
    'Manipur Temple',
    'Krishna (Govindajee)',
    'A famous Hindu temple dedicated to Lord Krishna in Imphal, Manipur.',
    'Built in the 18th century by King Bhagyachandra.',
    'One of the most important temples in Northeast India, known for its Ras Lila performances.',
    'Traditional Manipuri architecture with a unique dome structure.',
    ARRAY['The temple is famous for its Ras Lila dance performances', 'Lord Krishna is worshipped here in his Govindajee form'],
    'Imphal East, Manipur 795001',
    'Imphal',
    'Manipur',
    'India',
    'Imphal East',
    24.8170,
    93.9368,
    '+91-385-2222000',
    'https://www.manipur.gov.in',
    600,
    400,
    4.4,
    700
),

-- Union Territories
(
    'Vaishno Devi Temple',
    'Vaishno Devi (Shakti)',
    'A famous Hindu temple dedicated to Goddess Vaishno Devi in Jammu and Kashmir.',
    'The temple has been in existence for thousands of years, mentioned in ancient texts.',
    'One of the most visited pilgrimage sites in India, located in a cave at 5,200 feet.',
    'Cave temple architecture with natural rock formations.',
    ARRAY['The goddess is said to have appeared here to save her devotee', 'The temple is accessible only by foot or helicopter'],
    'Katra, Jammu and Kashmir 182301',
    'Katra',
    'Jammu and Kashmir',
    'India',
    'Katra',
    33.0379,
    74.9476,
    '+91-1991-234053',
    'https://www.maavaishnodevi.org',
    1500,
    1200,
    4.8,
    2800
);

-- Insert pooja timings for some of the new temples
-- Golden Temple timings
INSERT INTO public.pooja_timings (temple_id, name, start_time, end_time, description, day_of_week) VALUES
(
    (SELECT id FROM public.temples WHERE name = 'Golden Temple (Harmandir Sahib)'),
    'Morning Prayer',
    '06:00',
    '12:00',
    'Morning prayer and langar service',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Golden Temple (Harmandir Sahib)'),
    'Evening Prayer',
    '18:00',
    '22:00',
    'Evening prayer and langar service',
    ARRAY[0,1,2,3,4,5,6]
);

-- Akshardham Temple timings
INSERT INTO public.pooja_timings (temple_id, name, start_time, end_time, description, day_of_week) VALUES
(
    (SELECT id FROM public.temples WHERE name = 'Akshardham Temple'),
    'Morning Darshan',
    '09:30',
    '18:30',
    'Morning temple visit and exhibitions',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Akshardham Temple'),
    'Water Show',
    '19:30',
    '20:15',
    'Musical fountain and light show',
    ARRAY[0,1,2,3,4,5,6]
);

-- Siddhivinayak Temple timings
INSERT INTO public.pooja_timings (temple_id, name, start_time, end_time, description, day_of_week) VALUES
(
    (SELECT id FROM public.temples WHERE name = 'Siddhivinayak Temple'),
    'Morning Darshan',
    '05:30',
    '12:00',
    'Morning temple visit',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Siddhivinayak Temple'),
    'Afternoon Darshan',
    '13:00',
    '15:00',
    'Afternoon temple visit',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Siddhivinayak Temple'),
    'Evening Darshan',
    '15:30',
    '22:00',
    'Evening temple visit',
    ARRAY[0,1,2,3,4,5,6]
);

-- Update deity category temple counts after adding new temples
UPDATE public.deity_categories 
SET temple_count = (
    SELECT COUNT(*)
    FROM public.temples 
    WHERE deity ILIKE '%' || deity_categories.name || '%'
    AND is_active = true
);
