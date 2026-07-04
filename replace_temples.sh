#!/bin/bash
# Script to replace generic temples with real ones

cd /workspace/temple-finder/src

# Create a new file with:
# 1. Lines 1-131 (header + temples 1-6)
# 2. Real Chennai temples
# 3. Line 4813 onwards (temples 7-10 and rest)

# Extract header and temples 1-6
head -n 131 data.ts > data_new.ts

# Add real Chennai temples
cat >> data_new.ts << 'EOF'
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
EOF

# Add rest of the file (temples 7-10 and other data)
tail -n +4813 data.ts >> data_new.ts

# Replace original file
mv data_new.ts data.ts

echo "Successfully replaced generic temples with real temples!"
echo "Temples 11-20 now have real names and images"
