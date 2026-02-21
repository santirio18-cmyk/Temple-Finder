# Google Maps API Integration Guide

## Quick Setup

You have two options to add your Google Maps API key:

### Option 1: For Web App (Development)

1. Create or edit `.env.local` file in the `temple-finder` directory:
   ```bash
   cd temple-finder
   ```

2. Add your API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
   ```

3. Restart your development server

### Option 2: For Mobile App (Android)

1. Edit `app/src/main/assets/temple-finder/config.js`
2. Replace the `googleMapsApiKey` value in the `ai` section:
   ```javascript
   ai: {
     googleMapsApiKey: 'YOUR_API_KEY_HERE'
   }
   ```

### Option 3: Use the Setup Script

Run the setup script:
```bash
./setup-google-maps.sh YOUR_API_KEY_HERE
```

## Where the API Key is Used

The Google Maps API key is used in:
- **Maps Service** (`src/services/mapsService.ts`) - For loading Google Maps and getting directions
- **Temple Map Component** (`src/components/TempleMap.tsx`) - For displaying interactive maps
- **Nearby Page** (`src/pages/Nearby.tsx`) - For showing nearby temples on a map

## Required Google Maps APIs

Make sure you enable these APIs in Google Cloud Console:
- ✅ Maps JavaScript API
- ✅ Places API (for location search)
- ✅ Directions API (for route planning)
- ✅ Geocoding API (for address conversion)

## Testing

After adding your API key:
1. Start the dev server: `npm run dev`
2. Navigate to the "Nearby" page
3. Click "Show Map" - you should see an interactive Google Map

## Security Notes

- Never commit your API key to git
- Use environment variables for production
- Restrict your API key to specific domains/IPs in Google Cloud Console
- Enable billing alerts in Google Cloud Console
