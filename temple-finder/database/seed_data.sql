-- Temple Finder Seed Data for Supabase
-- Run this SQL in your Supabase SQL Editor after running schema.sql

-- Insert deity categories
INSERT INTO public.deity_categories (name, icon, description, color) VALUES
('Shiva', '🕉️', 'Temples dedicated to Lord Shiva, the destroyer and transformer', '#FF9933'),
('Vishnu', '🕉️', 'Temples dedicated to Lord Vishnu, the preserver', '#DC143C'),
('Ganpati', '🐘', 'Temples dedicated to Lord Ganesha, the remover of obstacles', '#FF9933'),
('Murugan', '⚡', 'Temples dedicated to Lord Murugan, the god of war and victory', '#DC143C'),
('Devi', '🕉️', 'Temples dedicated to various forms of the Divine Mother', '#FF9933'),
('Rama', '🏹', 'Temples dedicated to Lord Rama, the seventh avatar of Vishnu', '#DC143C'),
('Krishna', '🎵', 'Temples dedicated to Lord Krishna, the eighth avatar of Vishnu', '#DC143C'),
('Hanuman', '🐒', 'Temples dedicated to Lord Hanuman, the devoted servant of Rama', '#FF9933')
ON CONFLICT (name) DO NOTHING;

-- Insert sample temples
INSERT INTO public.temples (
    name, deity, description, history, significance, architecture, legends,
    address, city, state, country, locality, latitude, longitude,
    contact_phone, website, capacity, current_occupancy, rating, review_count
) VALUES
(
    'Meenakshi Amman Temple',
    'Meenakshi (Parvati)',
    'A historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu.',
    'The temple was built by the Pandya dynasty in the 6th century CE and later expanded by the Nayak dynasty.',
    'One of the most important temples dedicated to Goddess Meenakshi, the consort of Lord Sundareswarar (Shiva).',
    'Dravidian architecture with towering gopurams, intricate carvings, and a golden lotus tank.',
    ARRAY['The temple is said to be where Meenakshi and Sundareswarar were married', 'The golden lotus tank is believed to have been created by Lord Shiva'],
    'Madurai Main, Madurai, Tamil Nadu 625001',
    'Madurai',
    'Tamil Nadu',
    'India',
    'Madurai Main',
    9.9197,
    78.1194,
    '+91-452-2344360',
    'https://www.maduraimeenakshi.org',
    1000,
    250,
    4.8,
    1250
),
(
    'Tirumala Venkateswara Temple',
    'Venkateswara (Vishnu)',
    'A famous Hindu temple dedicated to Lord Venkateswara, located in Tirumala, Andhra Pradesh.',
    'The temple has been in existence for over 2000 years and is mentioned in ancient texts.',
    'One of the most visited pilgrimage sites in the world, known as the "Temple of Seven Hills".',
    'Dravidian architecture with a golden dome and intricate carvings.',
    ARRAY['Lord Venkateswara is said to have appeared here to save humanity', 'The temple is built on seven hills representing the seven chakras'],
    'Tirumala, Tirupati, Andhra Pradesh 517504',
    'Tirupati',
    'Andhra Pradesh',
    'India',
    'Tirumala',
    13.6777,
    79.3476,
    '+91-877-2277777',
    'https://www.tirumala.org',
    2000,
    1800,
    4.9,
    2500
),
(
    'Kashi Vishwanath Temple',
    'Shiva',
    'One of the most famous Hindu temples dedicated to Lord Shiva, located in Varanasi, Uttar Pradesh.',
    'The original temple was destroyed and rebuilt several times, with the current structure dating to the 18th century.',
    'Considered one of the twelve Jyotirlinga shrines and one of the holiest places for Hindus.',
    'North Indian Nagara style architecture with a golden spire.',
    ARRAY['Lord Shiva is said to have appeared as a column of light here', 'The temple is believed to grant liberation (moksha) to devotees'],
    'Vishwanath Gali, Varanasi, Uttar Pradesh 221001',
    'Varanasi',
    'Uttar Pradesh',
    'India',
    'Vishwanath Gali',
    25.3176,
    82.9739,
    '+91-542-2392629',
    'https://www.shrikashivishwanath.org',
    500,
    300,
    4.7,
    1800
),
(
    'Somnath Temple',
    'Shiva',
    'The first among the twelve Jyotirlinga shrines of Lord Shiva, located in Prabhas Patan, Gujarat.',
    'The temple has been destroyed and rebuilt several times throughout history, with the current structure built in 1951.',
    'One of the most sacred pilgrimage sites for Hindus, mentioned in ancient texts.',
    'Chalukya style architecture with intricate carvings and a tall shikhara.',
    ARRAY['The temple was attacked by Mahmud of Ghazni seventeen times', 'The moon god is said to have worshipped Shiva here to regain his lustre'],
    'Somnath, Gujarat 362268',
    'Prabhas Patan',
    'Gujarat',
    'India',
    'Somnath',
    20.8884,
    70.4020,
    '+91-2876-233001',
    'https://www.somnath.org',
    800,
    400,
    4.6,
    950
),
(
    'Dwarkadhish Temple',
    'Krishna',
    'A famous Hindu temple dedicated to Lord Krishna, located in Dwarka, Gujarat.',
    'The temple was built around 2000 years ago and has been renovated several times.',
    'One of the four major pilgrimage sites (Char Dham) and one of the 108 Divya Desams.',
    'North Indian architectural style with a tall shikhara and intricate carvings.',
    ARRAY['Lord Krishna is said to have established his kingdom here', 'The temple is believed to be built over Krishna''s residential palace'],
    'Dwarkadhish Temple, Dwarka, Gujarat 361335',
    'Dwarka',
    'Gujarat',
    'India',
    'Dwarka',
    22.2403,
    68.9686,
    '+91-2892-234080',
    'https://www.dwarkadhish.org',
    600,
    350,
    4.5,
    750
),
(
    'Jagannath Temple',
    'Jagannath (Krishna)',
    'A famous Hindu temple dedicated to Lord Jagannath (Krishna), located in Puri, Odisha.',
    'The temple was built in the 12th century by King Anantavarman Chodaganga Deva.',
    'One of the four major pilgrimage sites (Char Dham) and famous for the annual Rath Yatra.',
    'Kalinga architectural style with a towering shikhara and intricate carvings.',
    ARRAY['The temple is famous for its annual Rath Yatra festival', 'Lord Jagannath is worshipped along with his siblings Balabhadra and Subhadra'],
    'Jagannath Temple, Puri, Odisha 752001',
    'Puri',
    'Odisha',
    'India',
    'Puri',
    19.8067,
    85.8315,
    '+91-6752-222002',
    'https://www.jagannathtemplepuri.com',
    1200,
    800,
    4.7,
    1500
),
(
    'Golden Temple (Harmandir Sahib)',
    'Waheguru (Universal God)',
    'The most sacred shrine of Sikhism, located in Amritsar, Punjab.',
    'The temple was built in the 16th century by Guru Arjan Dev, the fifth Sikh Guru.',
    'The spiritual and cultural center of Sikhism, open to people of all faiths.',
    'Sikh architectural style with a golden dome and marble structure.',
    ARRAY['The temple is built on a platform in the middle of a sacred pool', 'Guru Granth Sahib, the holy book of Sikhs, is housed here'],
    'Golden Temple Road, Amritsar, Punjab 143006',
    'Amritsar',
    'Punjab',
    'India',
    'Golden Temple',
    31.6200,
    74.8765,
    '+91-183-2553957',
    'https://www.goldentempleamritsar.org',
    2000,
    1200,
    4.8,
    2200
),
(
    'Lingaraja Temple',
    'Shiva',
    'A famous Hindu temple dedicated to Lord Shiva, located in Bhubaneswar, Odisha.',
    'The temple was built in the 11th century by King Jajati Keshari of the Somavamsi dynasty.',
    'One of the oldest and largest temples in Bhubaneswar, representing the Kalinga architectural style.',
    'Kalinga architectural style with a towering deul (shikhara) and jagamohana.',
    ARRAY['The temple is said to be built over a natural lingam', 'Lord Shiva is worshipped here as Tribhuvaneshwara, the Lord of the Three Worlds'],
    'Lingaraja Temple, Bhubaneswar, Odisha 751002',
    'Bhubaneswar',
    'Odisha',
    'India',
    'Old Town',
    20.2389,
    85.8339,
    '+91-674-2430514',
    NULL,
    400,
    200,
    4.4,
    650
),
(
    'Badrinath Temple',
    'Badrinath (Vishnu)',
    'A famous Hindu temple dedicated to Lord Badrinath (Vishnu), located in Badrinath, Uttarakhand.',
    'The temple was established by Adi Shankara in the 9th century.',
    'One of the four major pilgrimage sites (Char Dham) and one of the 108 Divya Desams.',
    'North Indian architectural style with a colorful facade and golden roof.',
    ARRAY['The temple is believed to be established by Adi Shankara', 'Lord Badrinath is worshipped here in a meditative posture'],
    'Badrinath Temple, Badrinath, Uttarakhand 246422',
    'Badrinath',
    'Uttarakhand',
    'India',
    'Badrinath',
    30.7448,
    79.4936,
    '+91-1381-222201',
    'https://www.badrinath-kedarnath.gov.in',
    300,
    150,
    4.6,
    850
),
(
    'Kedarnath Temple',
    'Shiva',
    'A famous Hindu temple dedicated to Lord Shiva, located in Kedarnath, Uttarakhand.',
    'The temple was built by Adi Shankara in the 8th century and has been renovated several times.',
    'One of the twelve Jyotirlinga shrines and one of the four major pilgrimage sites (Char Dham).',
    'North Indian architectural style with a stone structure and pyramidal shikhara.',
    ARRAY['The temple is believed to be built by the Pandavas', 'Lord Shiva is worshipped here as Kedarnath, the Lord of Kedar'],
    'Kedarnath Temple, Kedarnath, Uttarakhand 246445',
    'Kedarnath',
    'Uttarakhand',
    'India',
    'Kedarnath',
    30.7352,
    79.0669,
    NULL,
    'https://www.badrinath-kedarnath.gov.in',
    200,
    100,
    4.5,
    700
);

-- Insert sample pooja timings for Meenakshi Amman Temple
INSERT INTO public.pooja_timings (temple_id, name, start_time, end_time, description, day_of_week) VALUES
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    'Suprabhatam',
    '05:00',
    '05:30',
    'Morning awakening ceremony',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    'Abhishekam',
    '06:00',
    '07:00',
    'Sacred bath ceremony',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    'Alankaram',
    '07:00',
    '08:00',
    'Decorative ceremony',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    'Morning Darshan',
    '08:00',
    '12:00',
    'Morning temple visit',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    'Evening Darshan',
    '16:00',
    '20:00',
    'Evening temple visit',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    'Arti',
    '20:00',
    '20:30',
    'Evening prayer ceremony',
    ARRAY[0,1,2,3,4,5,6]
);

-- Insert sample pooja timings for Tirumala Venkateswara Temple
INSERT INTO public.pooja_timings (temple_id, name, start_time, end_time, description, day_of_week) VALUES
(
    (SELECT id FROM public.temples WHERE name = 'Tirumala Venkateswara Temple'),
    'Suprabhatam',
    '03:00',
    '03:30',
    'Morning awakening ceremony',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Tirumala Venkateswara Temple'),
    'Thomala Seva',
    '03:30',
    '04:30',
    'Flower decoration ceremony',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Tirumala Venkateswara Temple'),
    'Archana',
    '04:30',
    '05:30',
    'Worship ceremony',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Tirumala Venkateswara Temple'),
    'Darshan',
    '05:30',
    '12:00',
    'Morning temple visit',
    ARRAY[0,1,2,3,4,5,6]
),
(
    (SELECT id FROM public.temples WHERE name = 'Tirumala Venkateswara Temple'),
    'Evening Darshan',
    '18:00',
    '22:00',
    'Evening temple visit',
    ARRAY[0,1,2,3,4,5,6]
);

-- Insert sample reviews
INSERT INTO public.reviews (temple_id, user_id, rating, comment, visit_date) VALUES
(
    (SELECT id FROM public.temples WHERE name = 'Meenakshi Amman Temple'),
    '00000000-0000-0000-0000-000000000001',
    5,
    'Amazing spiritual experience. The temple architecture is breathtaking and the atmosphere is truly divine.',
    '2024-01-15'
),
(
    (SELECT id FROM public.temples WHERE name = 'Tirumala Venkateswara Temple'),
    '00000000-0000-0000-0000-000000000001',
    5,
    'One of the most sacred places I have ever visited. The energy and devotion here is incredible.',
    '2024-01-20'
),
(
    (SELECT id FROM public.temples WHERE name = 'Kashi Vishwanath Temple'),
    '00000000-0000-0000-0000-000000000001',
    4,
    'Very spiritual place. The ghats and the temple create a unique atmosphere.',
    '2024-02-10'
);

-- Update deity category temple counts
UPDATE public.deity_categories 
SET temple_count = (
    SELECT COUNT(*)
    FROM public.temples 
    WHERE deity ILIKE '%' || deity_categories.name || '%'
    AND is_active = true
);
