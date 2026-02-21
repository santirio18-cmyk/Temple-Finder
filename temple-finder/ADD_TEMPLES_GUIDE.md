# Guide: How to Add More Temples

This guide shows you how to add local temples like "Seniamman Koil Royapuram" to the Temple Finder app.

## 📍 Step 1: Find Temple Coordinates

You need the **latitude** and **longitude** of the temple. Here are ways to get them:

### Method 1: Google Maps
1. Open Google Maps
2. Search for the temple name (e.g., "Seniamman Koil Royapuram")
3. Right-click on the location marker
4. Click on the coordinates that appear (they'll be copied)
5. The format is: `13.1000, 80.2800` (latitude, longitude)

### Method 2: Google Search
Search for: `"[Temple Name] coordinates"` or `"[Temple Name] latitude longitude"`

### Method 3: Use Approximate Location
If you know the area:
- **Royapuram, Chennai**: approximately `13.1000, 80.2800`
- **T. Nagar, Chennai**: approximately `13.0400, 80.2400`
- **Anna Nagar, Chennai**: approximately `13.0900, 80.2100`

## 📝 Step 2: Add Temple to Mock Data

1. Open the file: `temple-finder/src/services/mockDataService.ts`

2. Find the `mockTemples` array (around line 144)

3. Before the closing `]` bracket, add a new temple object. Use this template:

```typescript
{
  id: 'temple-XX',  // Use the next number (e.g., temple-28, temple-29)
  name: 'Temple Name',
  deity: 'Deity Name',
  description: 'A brief description of the temple...',
  history: 'Historical background of the temple...',
  significance: 'Why this temple is important...',
  architecture: 'Architectural style and features...',
  legends: [
    'Legend or story 1',
    'Legend or story 2'
  ],
  festivals: ['Festival 1', 'Festival 2', 'Festival 3'],
  address: 'Full address of the temple',
  city: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  locality: 'Area/Locality name',
  latitude: 13.1000,  // Replace with actual latitude
  longitude: 80.2800,  // Replace with actual longitude
  contact_phone: '+91-XX-XXXXXXXX',  // Optional
  website: 'https://...',  // Optional, leave empty string if none
  images: ['temple-1.jpg', 'temple-2.jpg'],  // Optional
  capacity: 500,  // Approximate capacity
  current_occupancy: 250,  // Current occupancy (mock data)
  rating: 4.5,  // Rating out of 5
  review_count: 800,  // Number of reviews
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
},
```

## 🎯 Example: Adding Seniamman Koil Royapuram

Here's the exact entry I added:

```typescript
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
}
```

## ✅ Step 3: Verify Your Changes

1. Save the file
2. The dev server should auto-reload
3. Go to the "Nearby" page
4. Your new temple should appear if it's within the search radius

## 🔍 Quick Reference: Chennai Area Coordinates

| Area | Latitude | Longitude |
|------|----------|-----------|
| Royapuram | 13.1000 | 80.2800 |
| T. Nagar | 13.0400 | 80.2400 |
| Anna Nagar | 13.0900 | 80.2100 |
| Mylapore | 13.0339 | 80.2628 |
| Triplicane | 13.0567 | 80.2778 |
| Vadapalani | 13.0500 | 80.2100 |
| Besant Nagar | 12.9980 | 80.2700 |
| Thiruvanmiyur | 12.9494 | 80.2606 |

## 💡 Tips

1. **Use unique IDs**: Always increment the temple ID (temple-27, temple-28, etc.)
2. **Accurate coordinates**: More accurate coordinates = better distance calculations
3. **Complete information**: Fill in as much detail as possible for better user experience
4. **Test locally**: After adding, test on the Nearby page to see if it appears

## 🚀 After Adding Temples

1. **For Web App**: Changes appear immediately (hot reload)
2. **For Android App**: Rebuild the app:
   ```bash
   cd /Users/santhoshpremkumar/AndroidStudioProjects/Base
   ./build-android.sh
   ```

## 📚 Common Deity Names

- **Shiva**: Shiva, Kapaleeshwarar, Marundeeswarar, Ekambareswarar
- **Vishnu**: Vishnu, Parthasarathy, Venkateswara
- **Murugan**: Murugan, Subramanya, Kartikeya
- **Ganpati**: Ganesha, Ganpati, Vinayaka
- **Mariamman**: Mariamman, Seniamman, Amman
- **Lakshmi**: Lakshmi, Ashtalakshmi
- **Durga**: Durga, Amman

## 🎯 Need Help?

If you need help finding coordinates or adding temples, you can:
1. Use Google Maps to find exact locations
2. Search online for temple information
3. Ask for help adding specific temples

Happy temple hunting! 🕉️
