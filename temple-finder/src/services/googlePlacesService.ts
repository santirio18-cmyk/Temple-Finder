const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export interface GoogleTemple {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  rating: number;
  deity: string;
  description: string;
  image?: string;
  userRatingsTotal?: number;
  types?: string[];
}

interface PlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
}

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: PlacePhoto[];
  types?: string[];
}

/**
 * Fetch temples from Google Places API in a given location
 */
export async function fetchTemplesNearLocation(
  lat: number,
  lng: number,
  radiusMeters: number = 25000
): Promise<GoogleTemple[]> {
  const temples: GoogleTemple[] = [];
  
  try {
    // Use Places API Nearby Search
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusMeters}&type=hindu_temple&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data.status, data.error_message);
      return [];
    }
    
    if (!data.results || data.results.length === 0) {
      console.log('No temples found in this area');
      return [];
    }
    
    for (const place of data.results as PlaceResult[]) {
      const photoUrl = place.photos && place.photos[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=${API_KEY}`
        : undefined;
      
      temples.push({
        id: place.place_id,
        name: place.name,
        address: place.vicinity || '',
        city: 'Chennai',
        state: 'Tamil Nadu',
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        rating: place.rating || 4.5,
        deity: extractDeityFromName(place.name),
        description: `Hindu temple in Chennai. ${place.user_ratings_total ? `Based on ${place.user_ratings_total} reviews.` : ''}`,
        image: photoUrl,
        userRatingsTotal: place.user_ratings_total,
        types: place.types,
      });
    }
    
    console.log(`Fetched ${temples.length} temples from Google Places`);
    return temples;
    
  } catch (error) {
    console.error('Error fetching temples from Google Places:', error);
    return [];
  }
}

/**
 * Fetch temples from multiple locations in Chennai to get comprehensive coverage
 */
export async function fetchChennaiTemples(): Promise<GoogleTemple[]> {
  // Multiple center points to cover all of Chennai
  const locations = [
    { lat: 13.0827, lng: 80.2707, name: 'Central Chennai' },      // T Nagar
    { lat: 13.0569, lng: 80.2425, name: 'South Chennai' },        // Adyar
    { lat: 13.1067, lng: 80.2925, name: 'North Chennai' },        // Royapuram
    { lat: 13.0475, lng: 80.2824, name: 'Mylapore' },             // Mylapore
    { lat: 12.9789, lng: 80.1933, name: 'South-West Chennai' },   // Nanganallur
  ];
  
  const allTemples: GoogleTemple[] = [];
  const seenIds = new Set<string>();
  
  for (const location of locations) {
    console.log(`Fetching temples near ${location.name}...`);
    const temples = await fetchTemplesNearLocation(location.lat, location.lng, 10000);
    
    // Deduplicate by place_id
    for (const temple of temples) {
      if (!seenIds.has(temple.id)) {
        seenIds.add(temple.id);
        allTemples.push(temple);
      }
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`Total unique temples fetched: ${allTemples.length}`);
  return allTemples;
}

/**
 * Try to extract deity name from temple name
 */
function extractDeityFromName(name: string): string {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('murugan') || nameLower.includes('muruga') || nameLower.includes('subramanya')) return 'Murugan';
  if (nameLower.includes('shiva') || nameLower.includes('siva') || nameLower.includes('eswara') || nameLower.includes('nataraja')) return 'Shiva';
  if (nameLower.includes('vishnu') || nameLower.includes('perumal') || nameLower.includes('venkatesh')) return 'Vishnu';
  if (nameLower.includes('krishna') || nameLower.includes('parthasarathy')) return 'Krishna';
  if (nameLower.includes('ganesha') || nameLower.includes('ganapati') || nameLower.includes('vinayagar')) return 'Ganesha';
  if (nameLower.includes('amman') || nameLower.includes('devi') || nameLower.includes('lakshmi') || nameLower.includes('durga')) return 'Devi';
  if (nameLower.includes('hanuman') || nameLower.includes('anjaneya')) return 'Hanuman';
  if (nameLower.includes('rama') || nameLower.includes('ram')) return 'Rama';
  if (nameLower.includes('ayyappa') || nameLower.includes('sastha')) return 'Ayyappa';
  
  return 'Hindu';
}

/**
 * Format temple data for data.ts file
 */
export function formatTemplesForDataFile(temples: GoogleTemple[]): string {
  const templesArray = temples.map((temple, index) => {
    return `  {
    id: '${index + 1}',
    name: '${temple.name.replace(/'/g, "\\'")}',
    deity: '${temple.deity}',
    description: '${temple.description.replace(/'/g, "\\'")}',
    address: '${temple.address.replace(/'/g, "\\'")}',
    city: '${temple.city}',
    state: '${temple.state}',
    latitude: ${temple.latitude},
    longitude: ${temple.longitude},
    rating: ${temple.rating},${temple.image ? `\n    image: '${temple.image}'` : ''}
  }`;
  }).join(',\n');
  
  return `export const temples: Temple[] = [\n${templesArray}\n];`;
}
